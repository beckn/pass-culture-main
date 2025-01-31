import React, { useState } from 'react'

import { PostVenueProviderBody } from 'apiClient/v1'
import ConfirmDialog from 'components/Dialog/ConfirmDialog'
import { SynchronizationEvents } from 'core/FirebaseEvents/constants'
import useAnalytics from 'hooks/useAnalytics'
import fullLinkIcon from 'icons/full-link.svg'
import { Button, ButtonLink } from 'ui-kit'
import { ButtonVariant } from 'ui-kit/Button/types'
import Spinner from 'ui-kit/Spinner/Spinner'

import styles from './StocksProviderForm.module.scss'

interface PayloadProps {
  providerId: number
  venueIdAtOfferProvider: string
  venueId: number
}

export interface StocksProviderFormProps {
  offererId: number
  providerId: number
  saveVenueProvider: (payload: PostVenueProviderBody) => void
  siret: string
  venueId: number
  hasOffererProvider: boolean
}

const StocksProviderForm = ({
  saveVenueProvider,
  providerId,
  siret,
  venueId,
  hasOffererProvider,
  offererId,
}: StocksProviderFormProps) => {
  const { logEvent } = useAnalytics()
  const [isCheckingApi, setIsCheckingApi] = useState(false)
  const [isConfirmDialogOpened, setIsConfirmDialogOpened] = useState(false)

  const handleOpenConfirmDialog = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    event.stopPropagation()
    logEvent?.(SynchronizationEvents.CLICKED_IMPORT, {
      offererId: offererId,
      venueId: venueId,
      providerId: providerId,
    })
    setIsConfirmDialogOpened(true)
  }

  const handleCloseConfirmDialog = () => {
    /* istanbul ignore next: DEBT, TO FIX */
    setIsConfirmDialogOpened(false)
  }

  const handleFormSubmit = () => {
    setIsCheckingApi(true)

    const payload: PayloadProps = {
      providerId,
      venueIdAtOfferProvider: siret,
      venueId,
    }

    saveVenueProvider(payload)
    logEvent?.(SynchronizationEvents.CLICKED_VALIDATE_IMPORT, {
      offererId: offererId,
      venueId: venueId,
      providerId: providerId,
    })
    setIsConfirmDialogOpened(false)
  }

  if (isCheckingApi) {
    return <Spinner message="Vérification de votre rattachement" />
  }

  return (
    <>
      <div className={styles['stocks-provider-form']}>
        {!hasOffererProvider && (
          <div className="account-section">
            <div className="account-label">Compte</div>
            <div className="account-value">{siret}</div>
          </div>
        )}
        <div className="provider-import-button-container">
          <Button
            variant={ButtonVariant.PRIMARY}
            onClick={handleOpenConfirmDialog}
          >
            Importer les offres
          </Button>
        </div>
      </div>
      {isConfirmDialogOpened && (
        <ConfirmDialog
          cancelText="Annuler"
          confirmText="Continuer"
          onCancel={handleCloseConfirmDialog}
          onConfirm={handleFormSubmit}
          title="Certaines offres ne seront pas synchronisées"
        >
          <p>
            Le pass Culture ne permet l’import automatique que des offres dans
            les catégories support audio et livres à l’heure actuelle. Certains
            rayons ne seront en outre pas synchronisés.
          </p>
          <ButtonLink
            className={styles['aide-stock-button']}
            icon={fullLinkIcon}
            link={{
              isExternal: true,
              to: 'https://aide.passculture.app/hc/fr/articles/4411999024401--Acteurs-Culturels-Quels-sont-les-livres-%C3%A9ligibles-au-pass-Culture-',
            }}
            variant={ButtonVariant.QUATERNARY}
          >
            Notre FAQ vous décrira les règles précisément.
          </ButtonLink>
        </ConfirmDialog>
      )}
    </>
  )
}

export default StocksProviderForm
