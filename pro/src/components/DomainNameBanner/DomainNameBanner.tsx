import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import { setDisplayDomainBanner } from 'store/app/actions'
import { RootState } from 'store/reducers'
import { Banner } from 'ui-kit'
import { parse, stringify } from 'utils/query-string'

export const DomainNameBanner = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = parse(location.search)
  const shouldDisplayBanner = useSelector(
    (state: RootState) => state.app.displayDomainBanner
  )

  useEffect(() => {
    if (!shouldDisplayBanner && queryParams['redirect']) {
      dispatch(setDisplayDomainBanner(true))
    }
  }, [dispatch, queryParams, shouldDisplayBanner])

  const closeBanner = useCallback(() => {
    delete queryParams['redirect']
    navigate({ search: stringify(queryParams) }, { replace: true })

    dispatch(setDisplayDomainBanner(false))
  }, [dispatch, history, queryParams])

  if (!shouldDisplayBanner) {
    return null
  }

  return (
    <Banner
      className="domain-name-banner"
      closable
      handleOnClick={closeBanner}
      type="attention"
    >
      Notre nom de domaine évolue ! Vous avez été automatiquement redirigé
      vers&nbsp;
      <strong>https://passculture.pro</strong>
    </Banner>
  )
}
