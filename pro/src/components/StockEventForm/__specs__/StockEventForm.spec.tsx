import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Form, Formik } from 'formik'
import React from 'react'

import { STOCK_EVENT_FORM_DEFAULT_VALUES } from '../constants'
import StockEventForm, { IStockEventFormProps } from '../StockEventForm'

jest.mock('utils/date', () => ({
  ...jest.requireActual('utils/date'),
  getToday: jest
    .fn()
    .mockImplementation(() => new Date('2022-12-20T00:00:00Z')),
}))

const renderStockEventForm = (
  props: IStockEventFormProps,
  initialStock = STOCK_EVENT_FORM_DEFAULT_VALUES
) => {
  return render(
    <Formik initialValues={{ stocks: [initialStock] }} onSubmit={() => {}}>
      <Form>
        <StockEventForm {...props} />
      </Form>
    </Formik>
  )
}

describe('StockEventForm', () => {
  let props: IStockEventFormProps

  beforeEach(() => {
    props = {
      today: new Date(),
      stockIndex: 0,
    }
  })

  it('render StockEventForm', () => {
    renderStockEventForm(props)

    expect(screen.getByLabelText('Date', { exact: true })).toBeInTheDocument()
    expect(screen.getByLabelText('Horaire')).toBeInTheDocument()
    expect(screen.getByLabelText('Prix')).toBeInTheDocument()
    expect(
      screen.getByLabelText('Date limite de réservation')
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Quantité')).toBeInTheDocument()

    expect(screen.getByLabelText('Date', { exact: true })).not.toBeDisabled()
    expect(screen.getByLabelText('Horaire')).not.toBeDisabled()
    expect(screen.getByLabelText('Prix')).not.toBeDisabled()
    expect(
      screen.getByLabelText('Date limite de réservation')
    ).not.toBeDisabled()
    expect(screen.getByLabelText('Quantité')).not.toBeDisabled()
  })

  it('should render disabled fields for empty form with synchronized offer in edition mode', () => {
    props.disableAllStockFields = true
    renderStockEventForm(props, {
      ...STOCK_EVENT_FORM_DEFAULT_VALUES,
    })
    expect(screen.getByLabelText('Date', { exact: true })).toBeDisabled()
    expect(screen.getByLabelText('Horaire')).toBeDisabled()
    expect(screen.getByLabelText('Prix')).toBeDisabled()
    expect(screen.getByLabelText('Date limite de réservation')).toBeDisabled()
    expect(screen.getByLabelText('Quantité')).toBeDisabled()
  })

  it('should not render disabled fields for empty form in edition mode for not synchronized offer', () => {
    renderStockEventForm(props, {
      ...STOCK_EVENT_FORM_DEFAULT_VALUES,
    })
    expect(screen.getByLabelText('Date', { exact: true })).not.toBeDisabled()
    expect(screen.getByLabelText('Horaire')).not.toBeDisabled()
    expect(screen.getByLabelText('Prix')).not.toBeDisabled()
    expect(
      screen.getByLabelText('Date limite de réservation')
    ).not.toBeDisabled()
    expect(screen.getByLabelText('Quantité')).not.toBeDisabled()
  })

  it('render disabled field in list', () => {
    renderStockEventForm(props, {
      ...STOCK_EVENT_FORM_DEFAULT_VALUES,
      readOnlyFields: [
        'beginningDate',
        'beginningTime',
        'bookingLimitDatetime',
        'price',
        'quantity',
      ],
    })

    expect(screen.getByLabelText('Date', { exact: true })).toBeDisabled()
    expect(screen.getByLabelText('Horaire')).toBeDisabled()
    expect(screen.getByLabelText('Prix')).toBeDisabled()
    expect(screen.getByLabelText('Date limite de réservation')).toBeDisabled()
    expect(screen.getByLabelText('Quantité')).toBeDisabled()
  })
  it('should set stockBookingLimitDatetime at event date if date changed before stockBookingLimitDatetime', async () => {
    const initialStock = {
      beginningDate: new Date('2022-12-31T00:00:00Z'),
      beginningTime: new Date('2022-12-31T00:00:00Z'),
      remainingQuantity: '11',
      bookingsQuantity: '1',
      quantity: 12,
      bookingLimitDatetime: new Date('2022-12-30T00:00:00Z'),
      price: 10,
      isDeletable: true,
      readOnlyFields: [],
    }

    await renderStockEventForm(props, initialStock)

    await userEvent.click(await screen.getByLabelText('Date', { exact: true }))
    await userEvent.click(await screen.getAllByText(29)[1])
    await expect(await screen.getByLabelText('Date')).toHaveValue('29/12/2022')
    await expect(
      screen.getByLabelText('Date limite de réservation')
    ).toHaveValue('29/12/2022')
  })

  const setNumberValueForPrice = [
    { value: '20', expectedNumber: 20 },
    { value: '20.37', expectedNumber: 20.37 },
    { value: 'azer', expectedNumber: null },
    { value: 'AZER', expectedNumber: null },
    { value: '2fsqjk', expectedNumber: 2 },
    { value: '2fsqm0', expectedNumber: 20 },
  ]
  it.each(setNumberValueForPrice)(
    'should only type numbers for price, quantity',
    async ({ value, expectedNumber }) => {
      renderStockEventForm(props)

      const priceInput = screen.getByLabelText('Prix', {
        exact: false,
      })
      await userEvent.type(priceInput, value)
      expect(priceInput).toHaveValue(expectedNumber)
    }
  )

  const setNumberValueForQuantity = [
    { value: '20', expectedNumber: 20 },
    { value: '20.37', expectedNumber: 2037 },
    { value: '2fsqm0', expectedNumber: 20 },
  ]
  it.each(setNumberValueForQuantity)(
    'should only type numbers for price, quantity',
    async ({ value, expectedNumber }) => {
      renderStockEventForm(props)

      const quantityInput = screen.getByLabelText('Quantité', {
        exact: false,
      })
      await userEvent.type(quantityInput, value)
      expect(quantityInput).toHaveValue(expectedNumber)
    }
  )
})
