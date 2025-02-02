import type { Hit } from 'react-instantsearch-core'

import {
  AdageFrontRoles,
  AuthenticatedResponse,
  CollectiveOfferTemplateResponseModel,
  EducationalInstitutionWithBudgetResponseModel,
  OfferAddressType,
} from 'apiClient/adage'

import { ResultType } from './types'

export const defaultCollectiveTemplateOffer: CollectiveOfferTemplateResponseModel =
  {
    audioDisabilityCompliant: false,
    visualDisabilityCompliant: false,
    mentalDisabilityCompliant: true,
    motorDisabilityCompliant: true,
    contactEmail: 'test@example.com',
    domains: [],
    id: 1,
    interventionArea: [],
    isExpired: false,
    isSoldOut: false,
    name: 'Mon offre vitrine',
    offerVenue: {
      venueId: 1,
      otherAddress: '',
      addressType: OfferAddressType.OFFERER_VENUE,
    },
    students: [],
    subcategoryLabel: 'Cinéma',
    venue: {
      id: 1,
      address: '1 boulevard Poissonnière',
      city: 'Paris',
      name: 'Mon lieu',
      postalCode: '75000',
      publicName: 'Mon lieu nom publique',
      managingOfferer: {
        name: 'Ma super structure',
      },
      coordinates: {
        latitude: 48.87004,
        longitude: 2.3785,
      },
    },
  }

export const defaultAdageUser: AuthenticatedResponse = {
  departmentCode: '75',
  email: 'test@example.com',
  institutionCity: 'Paris',
  institutionName: 'Mon établissement',
  role: AdageFrontRoles.REDACTOR,
  uai: '1234567A',
}

export const defaultAlgoliaHits: Hit<ResultType> = {
  objectID: '1',
  offer: {
    dates: [new Date().valueOf()],
    name: 'Une offre collective',
    thumbUrl: '/imageUrl',
  },
  venue: {
    name: 'Lieu collectif #1',
    publicName: 'Mon super lieu collectif',
  },
  _highlightResult: {},
  isTemplate: false,
  __queryID: 'queryId',
}

export const defaultEducationalInstitution: EducationalInstitutionWithBudgetResponseModel =
  {
    budget: 1000,
    city: 'Paris',
    id: 1,
    institutionType: 'COLLEGE',
    name: 'Mon établissement',
    phoneNumber: '0123456789',
    postalCode: '75000',
  }
