/* istanbul ignore file: DEBT, TO FIX */
import React from 'react'

import PageTitle from 'components/PageTitle/PageTitle'
import { useOfferIndividualContext } from 'context/OfferIndividualContext'
import { IOfferIndividual } from 'core/Offers/types'
import {
  Summary as SummaryScreen,
  Template as WizardTemplate,
} from 'screens/OfferIndividual'

import { serializePropsFromOfferIndividual } from '.'

interface ISummaryProps {
  isOfferV2?: boolean
}

const Summary = ({ isOfferV2 = false }: ISummaryProps): JSX.Element | null => {
  const {
    offer: contextOffer,
    categories,
    subCategories,
  } = useOfferIndividualContext()
  // FIXME : we should not need  as IOfferIndividual cause parent route would redirect on offer loading error
  const offer = contextOffer as IOfferIndividual
  const {
    providerName,
    offer: offerData,
    stockThing,
    stockEventList,
    preview,
  } = serializePropsFromOfferIndividual(
    offer as IOfferIndividual,
    categories,
    subCategories
  )

  return (
    <WizardTemplate
      title={isOfferV2 ? null : 'Récapitulatif'}
      withStepper={!isOfferV2}
    >
      <PageTitle title="Récapitulatif" />
      <SummaryScreen
        offerId={offer.id}
        providerName={providerName}
        offer={offerData}
        stockThing={stockThing}
        stockEventList={stockEventList}
        subCategories={subCategories}
        preview={preview}
        formOfferV2={isOfferV2}
      />
    </WizardTemplate>
  )
}

export default Summary
