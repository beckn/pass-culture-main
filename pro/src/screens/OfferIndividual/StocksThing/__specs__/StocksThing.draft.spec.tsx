import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { api } from 'apiClient/api'
import { GetIndividualOfferResponseModel } from 'apiClient/v1'
import Notification from 'components/Notification/Notification'
import { OFFER_WIZARD_STEP_IDS } from 'components/OfferIndividualBreadcrumb'
import {
  OfferIndividualContextValues,
  OfferIndividualContext,
} from 'context/OfferIndividualContext'
import { OFFER_WIZARD_MODE } from 'core/Offers'
import {
  OfferIndividual,
  OfferIndividualStock,
  OfferIndividualVenue,
} from 'core/Offers/types'
import {
  getOfferIndividualPath,
  getOfferIndividualUrl,
} from 'core/Offers/utils/getOfferIndividualUrl'
import { renderWithProviders } from 'utils/renderWithProviders'

import StocksThing, { StocksThingProps } from '../StocksThing'

jest.mock('screens/OfferIndividual/Informations/utils', () => {
  return {
    filterCategories: jest.fn(),
  }
})

jest.mock('repository/pcapi/pcapi', () => ({
  postThumbnail: jest.fn(),
}))

jest.mock('utils/date', () => ({
  ...jest.requireActual('utils/date'),
  getToday: jest
    .fn()
    .mockImplementation(() => new Date('2020-12-15T12:00:00Z')),
}))

const renderStockThingScreen = (
  props: StocksThingProps,
  contextValue: OfferIndividualContextValues
) =>
  renderWithProviders(
    <>
      <Routes>
        <Route
          path={getOfferIndividualPath({
            step: OFFER_WIZARD_STEP_IDS.STOCKS,
            mode: OFFER_WIZARD_MODE.DRAFT,
          })}
          element={
            <OfferIndividualContext.Provider value={contextValue}>
              <StocksThing {...props} />
            </OfferIndividualContext.Provider>
          }
        />
        <Route
          path={getOfferIndividualPath({
            step: OFFER_WIZARD_STEP_IDS.SUMMARY,
            mode: OFFER_WIZARD_MODE.DRAFT,
          })}
          element={<div>Next page</div>}
        />
      </Routes>
      <Notification />
    </>,
    {
      initialRouterEntries: [
        getOfferIndividualUrl({
          step: OFFER_WIZARD_STEP_IDS.STOCKS,
          mode: OFFER_WIZARD_MODE.DRAFT,
          offerId: contextValue.offer?.id || undefined,
        }),
      ],
    }
  )

describe('screens:StocksThing::draft', () => {
  let props: StocksThingProps
  let contextValue: OfferIndividualContextValues
  let offer: Partial<OfferIndividual>
  let stock: Partial<OfferIndividualStock>
  const offerId = 1

  beforeEach(() => {
    stock = {
      id: 1,
      quantity: 10,
      price: 10.01,
      remainingQuantity: 6,
      bookingsQuantity: 4,
      isEventDeletable: true,
    }
    offer = {
      id: 1,
      lastProvider: null,
      venue: {
        departmentCode: '75',
      } as OfferIndividualVenue,
      stocks: [stock as OfferIndividualStock],
    }
    props = {
      offer: offer as OfferIndividual,
    }
    contextValue = {
      offerId: offerId,
      offer: offer as OfferIndividual,
      venueList: [],
      offererNames: [],
      categories: [],
      subCategories: [],
      setOffer: () => {},
      setShouldTrack: () => {},
      shouldTrack: true,
      showVenuePopin: {},
    }
    jest
      .spyOn(api, 'getOffer')
      .mockResolvedValue({} as GetIndividualOfferResponseModel)
    jest.spyOn(api, 'upsertStocks')
  })

  it('should show a success notification if nothing has been touched', async () => {
    renderStockThingScreen(props, contextValue)

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Sauvegarder le brouillon',
      })
    )

    expect(api.upsertStocks).not.toHaveBeenCalled()
    expect(
      screen.getByText('Brouillon sauvegardé dans la liste des offres')
    ).toBeInTheDocument()
    expect(screen.getByTestId('stock-thing-form')).toBeInTheDocument()
    expect(screen.queryByText(/Next page/)).not.toBeInTheDocument()
  })

  it('should show a success notification if nothing has been touched and click on next step', async () => {
    renderStockThingScreen(props, contextValue)

    await userEvent.click(
      screen.getByRole('button', {
        name: 'Étape suivante',
      })
    )

    expect(api.upsertStocks).not.toHaveBeenCalled()
    expect(
      screen.getByText('Brouillon sauvegardé dans la liste des offres')
    ).toBeInTheDocument()
    expect(screen.queryByTestId('stock-thing-form')).not.toBeInTheDocument()
    expect(screen.queryByText(/Next page/)).toBeInTheDocument()
  })
})
