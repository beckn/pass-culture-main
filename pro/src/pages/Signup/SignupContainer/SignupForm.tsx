import { useFormikContext } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { BannerInvisibleSiren, BannerRGS } from 'components/Banner'
import FormLayout from 'components/FormLayout'
import LegalInfos from 'components/LegalInfos/LegalInfos'
import { getSirenDataAdapter } from 'core/Offerers/adapters'
import { useScrollToFirstErrorAfterSubmit } from 'hooks'
import useActiveFeature from 'hooks/useActiveFeature'
import CookiesFooter from 'pages/CookiesFooter/CookiesFooter'
import MaybeAppUserDialog from 'pages/Signup/SignupContainer/MaybeAppUserDialog'
import {
  Button,
  Checkbox,
  EmailSpellCheckInput,
  SubmitButton,
  TextInput,
} from 'ui-kit'
import { ButtonVariant } from 'ui-kit/Button/types'
import { PasswordInput, SirenInput } from 'ui-kit/form'
import PhoneNumberInput from 'ui-kit/form/PhoneNumberInput'

import { MAYBE_APP_USER_APE_CODE } from './constants'
import styles from './SignupContainer.module.scss'
import { SignupFormValues } from './types'

const SignupForm = (): JSX.Element => {
  const navigate = useNavigate()
  const [showAnonymousBanner, setShowAnonymousBanner] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { values, setFieldValue, setFieldError, isSubmitting } =
    useFormikContext<SignupFormValues>()

  const newOnboardingActive = useActiveFeature('WIP_ENABLE_NEW_ONBOARDING')

  useScrollToFirstErrorAfterSubmit()

  const getSirenAPIData = async (siren: string) => {
    setShowAnonymousBanner(false)
    const response = await getSirenDataAdapter(siren)
    if (response.isOk) {
      let values = undefined
      if (response.payload.values != null) {
        const { apeCode, ...rest } = response.payload.values
        values = rest
        if (MAYBE_APP_USER_APE_CODE.includes(apeCode)) {
          setIsModalOpen(true)
        }
      }

      setFieldValue('legalUnitValues', values)
    } else {
      setFieldError('siren', response.message)
      if (
        response.message ==
        'Les informations relatives à ce SIREN ou SIRET ne sont pas accessibles.'
      ) {
        setShowAnonymousBanner(true)
      }
    }
  }

  return (
    <>
      {isModalOpen && (
        <MaybeAppUserDialog onCancel={() => setIsModalOpen(false)} />
      )}

      <FormLayout className={styles['signup-page-form']}>
        <div className={styles['sign-up-form']}>
          <FormLayout.Row>
            <TextInput label="Nom" name="lastName" autoComplete="family-name" />
          </FormLayout.Row>
          <FormLayout.Row>
            <TextInput
              label="Prénom"
              name="firstName"
              autoComplete="given-name"
            />
          </FormLayout.Row>
          <FormLayout.Row>
            <EmailSpellCheckInput
              name="email"
              placeholder="email@exemple.com"
              label="Adresse email"
            />
          </FormLayout.Row>
          <FormLayout.Row>
            <PasswordInput
              name="password"
              label="Mot de passe"
              withErrorPreview={true}
              autoComplete="new-password"
            />
          </FormLayout.Row>
          <FormLayout.Row>
            <PhoneNumberInput
              name="phoneNumber"
              label={
                'Téléphone (utilisé uniquement par l’équipe du pass Culture)'
              }
            />
          </FormLayout.Row>
          {!newOnboardingActive && (
            <div className={styles['siren-field']}>
              <FormLayout.Row>
                <SirenInput
                  label="SIREN de la structure que vous représentez"
                  onValidSiren={getSirenAPIData}
                />
              </FormLayout.Row>
              <span className={styles['field-siren-value']}>
                {values.legalUnitValues.name}
              </span>
              {showAnonymousBanner && <BannerInvisibleSiren />}
            </div>
          )}
          <FormLayout.Row>
            <Checkbox
              hideFooter
              label="J’accepte d’être contacté par email pour recevoir les
                      nouveautés du pass Culture et contribuer à son
                      amélioration (facultatif)"
              name="contactOk"
            />
          </FormLayout.Row>
          <LegalInfos
            className={styles['sign-up-infos-before-signup']}
            title="Créer mon compte"
          />
        </div>
        <div className={styles['buttons-field']}>
          <Button
            onClick={() => navigate('/connexion')}
            variant={ButtonVariant.SECONDARY}
          >
            J’ai déjà un compte
          </Button>
          <SubmitButton isLoading={isSubmitting} disabled={isSubmitting}>
            Créer mon compte
          </SubmitButton>
        </div>
        <BannerRGS />
        <CookiesFooter className={styles['cookie-footer']} />
      </FormLayout>
    </>
  )
}

export default SignupForm
