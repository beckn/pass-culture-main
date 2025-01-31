import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Formik } from 'formik'
import React from 'react'

import { REIMBURSEMENT_RULES } from 'core/Finances'
import { OffererName } from 'core/Offerers/types'
import { CATEGORY_STATUS } from 'core/Offers'
import { OfferCategory, OfferSubCategory } from 'core/Offers/types'
import { OfferIndividualVenue } from 'core/Venue/types'
import { renderWithProviders } from 'utils/renderWithProviders'

import {
  FORM_DEFAULT_VALUES,
  OfferIndividualFormValues,
  setDefaultInitialFormValues,
  validationSchema,
} from '..'
import OfferIndividualForm, {
  OfferIndividualFormProps,
} from '../OfferIndividualForm'

const renderOfferIndividualForm = ({
  initialValues,
  onSubmit = jest.fn(),
  props,
}: {
  initialValues: OfferIndividualFormValues
  onSubmit: () => void
  props: OfferIndividualFormProps
}) => {
  const storeOverrides = {
    user: { currentUser: { isAdmin: false } },
  }
  return renderWithProviders(
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <OfferIndividualForm {...props} />
    </Formik>,
    { storeOverrides }
  )
}

describe('OfferIndividualForm', () => {
  let initialValues: OfferIndividualFormValues
  const onSubmit = jest.fn()
  let props: OfferIndividualFormProps
  let categories: OfferCategory[] = []
  let subCategories: OfferSubCategory[] = []
  let offererNames: OffererName[]
  let venueList: OfferIndividualVenue[]

  beforeEach(() => {
    categories = [
      {
        id: 'A',
        proLabel: 'Catégorie',
        isSelectable: true,
      },
      {
        id: 'virtual',
        proLabel: 'Catégorie music',
        isSelectable: true,
      },
      {
        id: 'physical',
        proLabel: 'Catégorie physical',
        isSelectable: true,
      },
    ]
    subCategories = [
      {
        id: 'physical',
        categoryId: 'physical',
        proLabel: 'Sous catégorie de C',
        isEvent: false,
        conditionalFields: ['showType', 'showSubType'],
        canBeDuo: false,
        canBeEducational: false,
        canBeWithdrawable: false,
        onlineOfflinePlatform: CATEGORY_STATUS.OFFLINE,
        reimbursementRule: REIMBURSEMENT_RULES.STANDARD,
        isSelectable: true,
      },
      {
        id: 'virtual',
        categoryId: 'virtual',
        proLabel: 'Sous catégorie de C',
        isEvent: false,
        conditionalFields: ['showType', 'showSubType'],
        canBeDuo: false,
        canBeEducational: false,
        canBeWithdrawable: false,
        onlineOfflinePlatform: CATEGORY_STATUS.ONLINE,
        reimbursementRule: REIMBURSEMENT_RULES.STANDARD,
        isSelectable: true,
      },
    ]
    offererNames = [
      {
        id: 1,
        name: 'Offerer virtual and physical',
      },
    ]
    venueList = [
      {
        id: 1,
        name: 'Venue AAAA',
        managingOffererId: 1,
        isVirtual: false,
        withdrawalDetails: '',
        accessibility: {
          visual: false,
          mental: false,
          audio: false,
          motor: false,
          none: true,
        },
        hasMissingReimbursementPoint: false,
        hasCreatedOffer: true,
      },
      {
        id: 2,
        name: 'Venue AAAA',
        managingOffererId: 1,
        isVirtual: true,
        withdrawalDetails: '',
        accessibility: {
          visual: false,
          mental: false,
          audio: false,
          motor: false,
          none: true,
        },
        hasMissingReimbursementPoint: false,
        hasCreatedOffer: true,
      },
    ]
    props = {
      categories,
      subCategories,
      offererNames,
      venueList,
      readOnlyFields: [],
      onImageUpload: jest.fn(),
      onImageDelete: jest.fn(),
      offerSubtype: null,
    }
    initialValues = setDefaultInitialFormValues(
      FORM_DEFAULT_VALUES,
      offererNames,
      null,
      null,
      venueList
    )
  })

  describe('venue banner', () => {
    it('should display venue banner when subcategory is not virtual and venue is only virtual', async () => {
      const onlyVirtualVenueList = [
        {
          name: 'Venue AAAA',
          id: 3,
          managingOffererId: 1,
          isVirtual: true,
          withdrawalDetails: '',
          accessibility: {
            visual: false,
            mental: false,
            audio: false,
            motor: false,
            none: true,
          },
          hasMissingReimbursementPoint: false,
          hasCreatedOffer: true,
        },
      ]
      props = { ...props, venueList: onlyVirtualVenueList }

      renderOfferIndividualForm({
        initialValues,
        onSubmit,
        props,
      })

      const categorySelect = await screen.findByLabelText('Catégorie')
      await userEvent.selectOptions(categorySelect, 'physical')
      const subcategorySelect = await screen.findByLabelText('Sous-catégorie')
      await userEvent.selectOptions(subcategorySelect, 'physical')

      expect(screen.queryByText('+ Ajouter un lieu')).toBeInTheDocument()
    })

    it('should not display venue banner when subcategory is virtual', async () => {
      const onlyVirtualVenueList = [
        {
          name: 'Venue AAAA',
          id: 4,
          managingOffererId: 1,
          isVirtual: true,
          withdrawalDetails: '',
          accessibility: {
            visual: false,
            mental: false,
            audio: false,
            motor: false,
            none: true,
          },
          hasMissingReimbursementPoint: false,
          hasCreatedOffer: true,
        },
      ]
      props = { ...props, venueList: onlyVirtualVenueList }

      renderOfferIndividualForm({
        initialValues,
        onSubmit,
        props,
      })

      const categorySelect = await screen.findByLabelText('Catégorie')
      await userEvent.selectOptions(categorySelect, 'virtual')
      const subcategorySelect = await screen.findByLabelText('Sous-catégorie')
      await userEvent.selectOptions(subcategorySelect, 'virtual')

      expect(screen.queryByText('+ Ajouter un lieu')).not.toBeInTheDocument()
    })

    it('should not display venue banner when subcategory is not virtual but both venue type exist', async () => {
      renderOfferIndividualForm({
        initialValues,
        onSubmit,
        props,
      })

      const categorySelect = await screen.findByLabelText('Catégorie')
      await userEvent.selectOptions(categorySelect, 'physical')
      const subcategorySelect = await screen.findByLabelText('Sous-catégorie')
      await userEvent.selectOptions(subcategorySelect, 'physical')

      expect(screen.queryByText('+ Ajouter un lieu')).not.toBeInTheDocument()
    })
  })
})
