import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { api } from 'apiClient/api'
import AppLayout from 'app/AppLayout'
import PageTitle from 'components/PageTitle/PageTitle'
import useNotification from 'hooks/useNotification'
import useRedirectLoggedUser from 'hooks/useRedirectLoggedUser'
import Hero from 'ui-kit/Hero'
import Logo from 'ui-kit/Logo/Logo'
import { parse } from 'utils/query-string'
import { initReCaptchaScript } from 'utils/recaptcha'

import ChangePasswordForm from './ChangePasswordForm'
import styles from './ResetPassword.module.scss'

const ResetPassword = (): JSX.Element => {
  const [passwordChanged, setPasswordChanged] = useState(false)
  const location = useLocation()
  const { search } = location
  const { token } = parse(search)

  useRedirectLoggedUser()

  const notification = useNotification()

  useEffect(() => {
    const gcaptchaScript = initReCaptchaScript()

    return function cleanup() {
      gcaptchaScript.remove()
    }
  })

  const submitChangePassword = async (values: Record<string, string>) => {
    const { newPasswordValue } = values
    try {
      await api.postNewPassword({ newPassword: newPasswordValue, token })
      setPasswordChanged(true)
    } catch {
      notification.error(
        'Une erreur est survenue, veuillez réessayer ultérieurement.'
      )
    }
  }

  return (
    <div className={styles['reset-password']}>
      <header className={styles['logo-side']}>
        <Logo noLink signPage />
      </header>
      <AppLayout
        layoutConfig={{
          fullscreen: true,
          pageName: 'reset-password',
        }}
      >
        <PageTitle title="Mot de passe perdu" />

        <div className={styles['scrollable-content-side']}>
          <div className={styles['content']}>
            {passwordChanged && (
              <Hero
                linkLabel="Se connecter"
                linkTo="/connexion"
                text="Vous pouvez dès à présent vous connecter avec votre nouveau mot de passe"
                title="Mot de passe changé !"
              />
            )}
            {token && !passwordChanged && (
              <ChangePasswordForm onSubmit={submitChangePassword} />
            )}
          </div>
        </div>
      </AppLayout>
    </div>
  )
}

export default ResetPassword
