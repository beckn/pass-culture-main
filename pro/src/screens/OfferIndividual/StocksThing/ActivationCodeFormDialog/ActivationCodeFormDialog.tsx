import React, { useCallback, useState } from 'react'

import DialogBox from 'components/DialogBox'
import strokeCodeIcon from 'icons/stroke-code.svg'
import { SvgIcon } from 'ui-kit/SvgIcon/SvgIcon'

import {
  checkAndParseUploadedFile,
  fileReader,
} from './ActivationCodeFileChecker'
import styles from './ActivationCodeFormDialog.module.scss'
import AddActivationCodeConfirmationForm from './AddActivationCodeConfirmationForm'
import AddActivationCodeForm from './AddActivationCodeForm'

const ACTIVATION_CODES_UPLOAD_ID = 'ACTIVATION_CODES_UPLOAD_ID'

interface ActivationCodeFormProps {
  onCancel: () => void
  onSubmit: (activationCodes: string[]) => void
  today: Date
  minExpirationDate: Date | null
}

const ActivationCodeFormDialog = ({
  onCancel,
  onSubmit,
  today,
  minExpirationDate,
}: ActivationCodeFormProps) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [unsavedActivationCodes, setUnsavedActivationCodes] =
    useState<string[]>()
  const [isFileInputDisabled, setIsFileInputDisabled] = useState(false)
  const hasNoActivationCodes =
    unsavedActivationCodes === undefined || unsavedActivationCodes.length == 0

  const submitFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsFileInputDisabled(true)

      const currentFile =
        e.currentTarget.files !== null ? e.currentTarget.files[0] : null
      if (currentFile == null) {
        setIsFileInputDisabled(false)
        return
      }

      const { errorMessage, activationCodes } = await checkAndParseUploadedFile(
        {
          fileReader,
          currentFile,
        }
      )

      if (errorMessage) {
        setErrorMessage(errorMessage)
      } else {
        if (!activationCodes) {
          setErrorMessage(
            "Aucune code d'activation n’est présent dans le fichier fourni"
          )
          return
        }
        setErrorMessage('')

        setUnsavedActivationCodes(activationCodes)
      }

      setIsFileInputDisabled(false)
    },
    [setUnsavedActivationCodes, setIsFileInputDisabled, setErrorMessage]
  )

  const dismissModal = useCallback(() => {
    onCancel()
  }, [onCancel])

  return (
    <DialogBox
      hasCloseButton
      onDismiss={dismissModal}
      labelledBy={ACTIVATION_CODES_UPLOAD_ID}
      extraClassNames={styles['activation-codes-upload']}
    >
      <h4
        className={styles['activation-codes-upload-title']}
        id={ACTIVATION_CODES_UPLOAD_ID}
      >
        Ajouter des codes d’activation
      </h4>

      <SvgIcon
        src={strokeCodeIcon}
        alt=""
        className={styles['activation-codes-upload-icon']}
      />

      {hasNoActivationCodes && (
        <AddActivationCodeForm
          submitFile={submitFile}
          errorMessage={errorMessage}
          isFileInputDisabled={isFileInputDisabled}
        />
      )}

      {!hasNoActivationCodes && (
        <AddActivationCodeConfirmationForm
          unsavedActivationCodes={unsavedActivationCodes}
          clearActivationCodes={onCancel}
          submitActivationCodes={() => onSubmit(unsavedActivationCodes)}
          today={today}
          minExpirationDate={minExpirationDate}
        />
      )}
    </DialogBox>
  )
}

export default ActivationCodeFormDialog
