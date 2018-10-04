const state = {
  queries: [],
  router: {
    location: {
      pathname: '/fake',
    },
  },
  data: {
    bookings: [],
    recommendations: [
      {
        bookings: [],
        dateCreated: '2018-07-20T11:59:08.252562Z',
        dateRead: null,
        dateUpdated: '2018-07-20T11:59:08.252573Z',
        dehumanizedEventId: null,
        dehumanizedId: 2,
        dehumanizedInviteforEventOccurenceId: null,
        dehumanizedMediationId: 2,
        dehumanizedThingId: null,
        dehumanizedUserId: 3,
        eventId: null,
        id: 'A9',
        inviteforEventOccurenceId: null,
        isClicked: true,
        isFavorite: false,
        isFirst: false,
        mediation: {
          authorId: null,
          backText: null,
          dateCreated: '2018-07-20T11:56:21.801800Z',
          dateModifiedAtLastProvider: '2018-07-20T11:56:21.801787Z',
          dehumanizedAuthorId: null,
          dehumanizedEventId: null,
          dehumanizedId: 2,
          dehumanizedLastProviderId: null,
          dehumanizedOffererId: null,
          dehumanizedThingId: null,
          eventId: null,
          firstThumbDominantColor: [4, 108, 235],
          frontText: null,
          id: 'A9',
          idAtProviders: null,
          lastProviderId: null,
          modelName: 'Mediation',
          offererId: null,
          thingId: null,
          thumbCount: 2,
          tutoIndex: 1,
        },
        mediationId: 'A9',
        modelName: 'Recommendation',
        recommendationOffers: [],
        shareMedium: null,
        thingId: null,
        userId: 'AM',
        validUntilDate: '2018-08-03T11:59:08.243682Z',
        index: 0,
      },
      {
        bookings: [],
        dateCreated: '2018-07-20T12:23:40.653154Z',
        dateRead: null,
        dateUpdated: '2018-07-20T12:23:40.653171Z',
        dehumanizedEventId: 1,
        dehumanizedId: 5,
        dehumanizedInviteforEventOccurenceId: null,
        dehumanizedMediationId: 3,
        dehumanizedThingId: null,
        dehumanizedUserId: 3,
        eventId: 'AE',
        id: 'AU',
        inviteforEventOccurenceId: null,
        isClicked: true,
        isFavorite: true,
        isFirst: false,
        mediatedOccurences: [
          {
            accessibility: '\u0000',
            beginningDatetime: '2018-07-30T11:59:38.310371Z',
            dateModifiedAtLastProvider: '2018-07-20T11:59:38.311914Z',
            dehumanizedEventId: 1,
            dehumanizedId: 247,
            dehumanizedLastProviderId: null,
            dehumanizedVenueId: null,
            endDatetime: '2018-07-31T11:59:38.310371Z',
            eventId: 'AE',
            id: '64',
            idAtProviders: null,
            isActive: true,
            lastProviderId: null,
            modelName: 'EventOccurence',
            offer: [
              {
                available: 5,
                bookingLimitDatetime: '2018-07-29T11:59:38.310371Z',
                bookingRecapSent: null,
                dateModified: '2018-07-20T11:59:38.324432Z',
                dateModifiedAtLastProvider: '2018-07-20T11:59:38.324421Z',
                dehumanizedEventOccurenceId: 247,
                dehumanizedId: 588,
                dehumanizedLastProviderId: null,
                dehumanizedOffererId: 11,
                dehumanizedThingId: 11,
                dehumanizedVenueId: null,
                eventOccurence: {
                  accessibility: '\u0000',
                  beginningDatetime: '2018-07-30T11:59:38.310371Z',
                  dateModifiedAtLastProvider: '2018-07-20T11:59:38.311914Z',
                  dehumanizedEventId: 1,
                  dehumanizedId: 247,
                  dehumanizedLastProviderId: null,
                  dehumanizedVenueId: null,
                  endDatetime: '2018-07-31T11:59:38.310371Z',
                  event: {
                    accessibility: '\u0000',
                    ageMax: null,
                    ageMin: null,
                    conditions: null,
                    dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
                    dehumanizedId: 1,
                    dehumanizedLastProviderId: 3,
                    description:
                      'Les danseurs de tout style et de tout niveau, mais aussi tous les curieux, sont invités à participer à cet atelier conçu comme un moment de partage et animé par un danseur professionnel et un dj.',
                    durationMinutes: 90,
                    extraData: null,
                    firstThumbDominantColor: null,
                    id: 'AE',
                    idAtProviders: '1',
                    isActive: true,
                    isNational: true,
                    lastProviderId: 'AM',
                    mediaUrls: [
                      ' http://www.104.fr/fiche-evenement/rstyle-atelier-danses-urbaines.html',
                    ],
                    modelName: 'Event',
                    name: 'Atelier danses urbaines',
                    thumbCount: 0,
                    type: 'None',
                  },
                  eventId: 'AE',
                  id: '64',
                  idAtProviders: null,
                  isActive: true,
                  lastProviderId: null,
                  modelName: 'EventOccurence',
                  type: null,
                  venueId: null,
                },
                eventOccurenceId: '64',
                groupSize: 1,
                id: 'AJGA',
                idAtProviders: null,
                isActive: true,
                lastProviderId: null,
                modelName: 'Offer',
                offererId: 'BM',
                price: 0,
                thing: {
                  dateModifiedAtLastProvider: '2017-11-27T00:00:00Z',
                  dehumanizedId: 11,
                  dehumanizedLastProviderId: 8,
                  description: null,
                  extraData: {
                    author: 'Brin, David',
                    bookFormat: 'EBook',
                    dewey: '800',
                    prix_livre: '12.99',
                    rayon: 'Science fiction / Fantastique grand format',
                    titelive_regroup: '3546393',
                  },
                  firstThumbDominantColor: null,
                  id: 'BM',
                  idAtProviders: '9782820524737',
                  isActive: true,
                  lastProviderId: 'BA',
                  mediaUrls: [],
                  modelName: 'Thing',
                  name: 'existence',
                  thumbCount: 0,
                  type: 'Book',
                },
                thingId: 'BM',
                venueId: null,
              },
            ],
            type: null,
            venueId: null,
          },
          {
            accessibility: '\u0000',
            beginningDatetime: '2018-06-16T14:00:00Z',
            dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
            dehumanizedEventId: 1,
            dehumanizedId: 2,
            dehumanizedLastProviderId: 3,
            dehumanizedVenueId: 3,
            endDatetime: '2018-06-16T15:30:00Z',
            eventId: 'AE',
            id: 'A9',
            idAtProviders: '1_2018-06-16T16:00:00',
            isActive: true,
            lastProviderId: 'AM',
            modelName: 'EventOccurence',
            offer: [
              {
                available: 10,
                bookingLimitDatetime: '2018-06-13T23:59:00Z',
                bookingRecapSent: null,
                dateModified: '2018-07-20T11:57:41.516592Z',
                dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
                dehumanizedEventOccurenceId: 2,
                dehumanizedId: 353,
                dehumanizedLastProviderId: 3,
                dehumanizedOffererId: 3,
                dehumanizedThingId: null,
                dehumanizedVenueId: null,
                eventOccurence: {
                  accessibility: '\u0000',
                  beginningDatetime: '2018-06-16T14:00:00Z',
                  dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
                  dehumanizedEventId: 1,
                  dehumanizedId: 2,
                  dehumanizedLastProviderId: 3,
                  dehumanizedVenueId: 3,
                  endDatetime: '2018-06-16T15:30:00Z',
                  event: {
                    accessibility: '\u0000',
                    ageMax: null,
                    ageMin: null,
                    conditions: null,
                    dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
                    dehumanizedId: 1,
                    dehumanizedLastProviderId: 3,
                    description:
                      'Les danseurs de tout style et de tout niveau, mais aussi tous les curieux, sont invités à participer à cet atelier conçu comme un moment de partage et animé par un danseur professionnel et un dj.',
                    durationMinutes: 90,
                    extraData: null,
                    firstThumbDominantColor: null,
                    id: 'AE',
                    idAtProviders: '1',
                    isActive: true,
                    isNational: true,
                    lastProviderId: 'AM',
                    mediaUrls: [
                      ' http://www.104.fr/fiche-evenement/rstyle-atelier-danses-urbaines.html',
                    ],
                    modelName: 'Event',
                    name: 'Atelier danses urbaines',
                    thumbCount: 0,
                    type: 'None',
                  },
                  eventId: 'AE',
                  id: 'A9',
                  idAtProviders: '1_2018-06-16T16:00:00',
                  isActive: true,
                  lastProviderId: 'AM',
                  modelName: 'EventOccurence',
                  type: null,
                  venue: {
                    address: '5 rue Curial -',
                    bookingEmail: 'd.marcadet@104.fr',
                    city: 'Paris',
                    dateModifiedAtLastProvider: '2018-03-05T13:00:00Z',
                    dehumanizedId: 3,
                    dehumanizedLastProviderId: 5,
                    dehumanizedManagingOffererId: 3,
                    departementCode: '75',
                    firstThumbDominantColor: null,
                    id: 'AM',
                    idAtProviders: '1',
                    lastProviderId: 'AU',
                    latitude: 48.89005,
                    longitude: 2.37068,
                    managingOffererId: 'AM',
                    modelName: 'Venue',
                    name: 'LE CENTQUATRE-PARIS',
                    postalCode: '75019',
                    siret: '12345678901231',
                    thumbCount: 0,
                  },
                  venueId: 'AM',
                },
                eventOccurenceId: 'A9',
                groupSize: 1,
                id: 'AFQQ',
                idAtProviders: '1_2018-06-16T16:00:00',
                isActive: true,
                lastProviderId: 'AM',
                modelName: 'Offer',
                offererId: 'AM',
                price: 0,
                thingId: null,
                venueId: null,
              },
            ],
            type: null,
            venueId: 'AM',
          },
          {
            accessibility: '\u0000',
            beginningDatetime: '2018-05-19T14:00:00Z',
            dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
            dehumanizedEventId: 1,
            dehumanizedId: 1,
            dehumanizedLastProviderId: 3,
            dehumanizedVenueId: 3,
            endDatetime: '2018-05-19T15:30:00Z',
            eventId: 'AE',
            id: 'AE',
            idAtProviders: '1_2018-05-19T16:00:00',
            isActive: true,
            lastProviderId: 'AM',
            modelName: 'EventOccurence',
            offer: [
              {
                available: 10,
                bookingLimitDatetime: '2018-05-16T23:59:00Z',
                bookingRecapSent: null,
                dateModified: '2018-07-20T11:57:41.461397Z',
                dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
                dehumanizedEventOccurenceId: 1,
                dehumanizedId: 352,
                dehumanizedLastProviderId: 3,
                dehumanizedOffererId: 3,
                dehumanizedThingId: null,
                dehumanizedVenueId: null,
                eventOccurence: {
                  accessibility: '\u0000',
                  beginningDatetime: '2018-05-19T14:00:00Z',
                  dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
                  dehumanizedEventId: 1,
                  dehumanizedId: 1,
                  dehumanizedLastProviderId: 3,
                  dehumanizedVenueId: 3,
                  endDatetime: '2018-05-19T15:30:00Z',
                  event: {
                    accessibility: '\u0000',
                    ageMax: null,
                    ageMin: null,
                    conditions: null,
                    dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
                    dehumanizedId: 1,
                    dehumanizedLastProviderId: 3,
                    description:
                      'Les danseurs de tout style et de tout niveau, mais aussi tous les curieux, sont invités à participer à cet atelier conçu comme un moment de partage et animé par un danseur professionnel et un dj.',
                    durationMinutes: 90,
                    extraData: null,
                    firstThumbDominantColor: null,
                    id: 'AE',
                    idAtProviders: '1',
                    isActive: true,
                    isNational: true,
                    lastProviderId: 'AM',
                    mediaUrls: [
                      ' http://www.104.fr/fiche-evenement/rstyle-atelier-danses-urbaines.html',
                    ],
                    modelName: 'Event',
                    name: 'Atelier danses urbaines',
                    thumbCount: 0,
                    type: 'None',
                  },
                  eventId: 'AE',
                  id: 'AE',
                  idAtProviders: '1_2018-05-19T16:00:00',
                  isActive: true,
                  lastProviderId: 'AM',
                  modelName: 'EventOccurence',
                  type: null,
                  venue: {
                    address: '5 rue Curial -',
                    bookingEmail: 'd.marcadet@104.fr',
                    city: 'Paris',
                    dateModifiedAtLastProvider: '2018-03-05T13:00:00Z',
                    dehumanizedId: 3,
                    dehumanizedLastProviderId: 5,
                    dehumanizedManagingOffererId: 3,
                    departementCode: '75',
                    firstThumbDominantColor: null,
                    id: 'AM',
                    idAtProviders: '1',
                    lastProviderId: 'AU',
                    latitude: 48.89005,
                    longitude: 2.37068,
                    managingOffererId: 'AM',
                    modelName: 'Venue',
                    name: 'LE CENTQUATRE-PARIS',
                    postalCode: '75019',
                    siret: '12345678901231',
                    thumbCount: 0,
                  },
                  venueId: 'AM',
                },
                eventOccurenceId: 'AE',
                groupSize: 1,
                id: 'AFQA',
                idAtProviders: '1_2018-05-19T16:00:00',
                isActive: true,
                lastProviderId: 'AM',
                modelName: 'Offer',
                offererId: 'AM',
                price: 0,
                thingId: null,
                venueId: null,
              },
            ],
            type: null,
            venueId: 'AM',
          },
        ],
        mediation: {
          authorId: null,
          backText: null,
          dateCreated: '2018-07-20T11:57:41.536020Z',
          dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
          dehumanizedAuthorId: null,
          dehumanizedEventId: 1,
          dehumanizedId: 3,
          dehumanizedLastProviderId: 3,
          dehumanizedOffererId: 3,
          dehumanizedThingId: null,
          event: {
            accessibility: '\u0000',
            ageMax: null,
            ageMin: null,
            conditions: null,
            dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
            dehumanizedId: 1,
            dehumanizedLastProviderId: 3,
            description:
              'Les danseurs de tout style et de tout niveau, mais aussi tous les curieux, sont invités à participer à cet atelier conçu comme un moment de partage et animé par un danseur professionnel et un dj.',
            durationMinutes: 90,
            extraData: null,
            firstThumbDominantColor: null,
            id: 'AE',
            idAtProviders: '1',
            isActive: true,
            isNational: true,
            lastProviderId: 'AM',
            mediaUrls: [
              ' http://www.104.fr/fiche-evenement/rstyle-atelier-danses-urbaines.html',
            ],
            modelName: 'Event',
            name: 'Atelier danses urbaines',
            thumbCount: 0,
            type: 'None',
          },
          eventId: 'AE',
          firstThumbDominantColor: null,
          frontText: null,
          id: 'AM',
          idAtProviders: '1',
          lastProviderId: 'AM',
          modelName: 'Mediation',
          offererId: 'AM',
          thingId: null,
          thumbCount: 0,
          tutoIndex: null,
        },
        mediationId: 'AM',
        modelName: 'Recommendation',
        recommendationOffers: [
          {
            available: 5,
            bookingLimitDatetime: '2018-07-29T11:59:38.310371Z',
            bookingRecapSent: null,
            dateModified: '2018-07-20T11:59:38.324432Z',
            dateModifiedAtLastProvider: '2018-07-20T11:59:38.324421Z',
            dehumanizedEventOccurenceId: 247,
            dehumanizedId: 588,
            dehumanizedLastProviderId: null,
            dehumanizedOffererId: 11,
            dehumanizedThingId: 11,
            dehumanizedVenueId: null,
            eventOccurence: {
              accessibility: '\u0000',
              beginningDatetime: '2018-07-30T11:59:38.310371Z',
              dateModifiedAtLastProvider: '2018-07-20T11:59:38.311914Z',
              dehumanizedEventId: 1,
              dehumanizedId: 247,
              dehumanizedLastProviderId: null,
              dehumanizedVenueId: null,
              endDatetime: '2018-07-31T11:59:38.310371Z',
              event: {
                accessibility: '\u0000',
                ageMax: null,
                ageMin: null,
                conditions: null,
                dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
                dehumanizedId: 1,
                dehumanizedLastProviderId: 3,
                description:
                  'Les danseurs de tout style et de tout niveau, mais aussi tous les curieux, sont invités à participer à cet atelier conçu comme un moment de partage et animé par un danseur professionnel et un dj.',
                durationMinutes: 90,
                extraData: null,
                firstThumbDominantColor: null,
                id: 'AE',
                idAtProviders: '1',
                isActive: true,
                isNational: true,
                lastProviderId: 'AM',
                mediaUrls: [
                  ' http://www.104.fr/fiche-evenement/rstyle-atelier-danses-urbaines.html',
                ],
                modelName: 'Event',
                name: 'Atelier danses urbaines',
                thumbCount: 0,
                type: 'None',
              },
              eventId: 'AE',
              id: '64',
              idAtProviders: null,
              isActive: true,
              lastProviderId: null,
              modelName: 'EventOccurence',
              type: null,
              venueId: null,
            },
            eventOccurenceId: '64',
            groupSize: 1,
            id: 'AJGA',
            idAtProviders: null,
            isActive: true,
            lastProviderId: null,
            modelName: 'Offer',
            offererId: 'BM',
            price: 0,
            thingId: 'BM',
            venueId: null,
          },
          {
            available: 10,
            bookingLimitDatetime: '2018-06-13T23:59:00Z',
            bookingRecapSent: null,
            dateModified: '2018-07-20T11:57:41.516592Z',
            dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
            dehumanizedEventOccurenceId: 2,
            dehumanizedId: 353,
            dehumanizedLastProviderId: 3,
            dehumanizedOffererId: 3,
            dehumanizedThingId: null,
            dehumanizedVenueId: null,
            eventOccurence: {
              accessibility: '\u0000',
              beginningDatetime: '2018-06-16T14:00:00Z',
              dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
              dehumanizedEventId: 1,
              dehumanizedId: 2,
              dehumanizedLastProviderId: 3,
              dehumanizedVenueId: 3,
              endDatetime: '2018-06-16T15:30:00Z',
              event: {
                accessibility: '\u0000',
                ageMax: null,
                ageMin: null,
                conditions: null,
                dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
                dehumanizedId: 1,
                dehumanizedLastProviderId: 3,
                description:
                  'Les danseurs de tout style et de tout niveau, mais aussi tous les curieux, sont invités à participer à cet atelier conçu comme un moment de partage et animé par un danseur professionnel et un dj.',
                durationMinutes: 90,
                extraData: null,
                firstThumbDominantColor: null,
                id: 'AE',
                idAtProviders: '1',
                isActive: true,
                isNational: true,
                lastProviderId: 'AM',
                mediaUrls: [
                  ' http://www.104.fr/fiche-evenement/rstyle-atelier-danses-urbaines.html',
                ],
                modelName: 'Event',
                name: 'Atelier danses urbaines',
                thumbCount: 0,
                type: 'None',
              },
              eventId: 'AE',
              id: 'A9',
              idAtProviders: '1_2018-06-16T16:00:00',
              isActive: true,
              lastProviderId: 'AM',
              modelName: 'EventOccurence',
              type: null,
              venue: {
                address: '5 rue Curial -',
                bookingEmail: 'd.marcadet@104.fr',
                city: 'Paris',
                dateModifiedAtLastProvider: '2018-03-05T13:00:00Z',
                dehumanizedId: 3,
                dehumanizedLastProviderId: 5,
                dehumanizedManagingOffererId: 3,
                departementCode: '75',
                firstThumbDominantColor: null,
                id: 'AM',
                idAtProviders: '1',
                lastProviderId: 'AU',
                latitude: 48.89005,
                longitude: 2.37068,
                managingOffererId: 'AM',
                modelName: 'Venue',
                name: 'LE CENTQUATRE-PARIS',
                postalCode: '75019',
                siret: '12345678901231',
                thumbCount: 0,
              },
              venueId: 'AM',
            },
            eventOccurenceId: 'A9',
            groupSize: 1,
            id: 'AFQQ',
            idAtProviders: '1_2018-06-16T16:00:00',
            isActive: true,
            lastProviderId: 'AM',
            modelName: 'Offer',
            offererId: 'AM',
            price: 0,
            thingId: null,
            venueId: null,
          },
          {
            available: 10,
            bookingLimitDatetime: '2018-05-16T23:59:00Z',
            bookingRecapSent: null,
            dateModified: '2018-07-20T11:57:41.461397Z',
            dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
            dehumanizedEventOccurenceId: 1,
            dehumanizedId: 352,
            dehumanizedLastProviderId: 3,
            dehumanizedOffererId: 3,
            dehumanizedThingId: null,
            dehumanizedVenueId: null,
            eventOccurence: {
              accessibility: '\u0000',
              beginningDatetime: '2018-05-19T14:00:00Z',
              dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
              dehumanizedEventId: 1,
              dehumanizedId: 1,
              dehumanizedLastProviderId: 3,
              dehumanizedVenueId: 3,
              endDatetime: '2018-05-19T15:30:00Z',
              event: {
                accessibility: '\u0000',
                ageMax: null,
                ageMin: null,
                conditions: null,
                dateModifiedAtLastProvider: '2018-03-29T13:00:00Z',
                dehumanizedId: 1,
                dehumanizedLastProviderId: 3,
                description:
                  'Les danseurs de tout style et de tout niveau, mais aussi tous les curieux, sont invités à participer à cet atelier conçu comme un moment de partage et animé par un danseur professionnel et un dj.',
                durationMinutes: 90,
                extraData: null,
                firstThumbDominantColor: null,
                id: 'AE',
                idAtProviders: '1',
                isActive: true,
                isNational: true,
                lastProviderId: 'AM',
                mediaUrls: [
                  ' http://www.104.fr/fiche-evenement/rstyle-atelier-danses-urbaines.html',
                ],
                modelName: 'Event',
                name: 'Atelier danses urbaines',
                thumbCount: 0,
                type: 'None',
              },
              eventId: 'AE',
              id: 'AE',
              idAtProviders: '1_2018-05-19T16:00:00',
              isActive: true,
              lastProviderId: 'AM',
              modelName: 'EventOccurence',
              type: null,
              venue: {
                address: '5 rue Curial -',
                bookingEmail: 'd.marcadet@104.fr',
                city: 'Paris',
                dateModifiedAtLastProvider: '2018-03-05T13:00:00Z',
                dehumanizedId: 3,
                dehumanizedLastProviderId: 5,
                dehumanizedManagingOffererId: 3,
                departementCode: '75',
                firstThumbDominantColor: null,
                id: 'AM',
                idAtProviders: '1',
                lastProviderId: 'AU',
                latitude: 48.89005,
                longitude: 2.37068,
                managingOffererId: 'AM',
                modelName: 'Venue',
                name: 'LE CENTQUATRE-PARIS',
                postalCode: '75019',
                siret: '12345678901231',
                thumbCount: 0,
              },
              venueId: 'AM',
            },
            eventOccurenceId: 'AE',
            groupSize: 1,
            id: 'AFQA',
            idAtProviders: '1_2018-05-19T16:00:00',
            isActive: true,
            lastProviderId: 'AM',
            modelName: 'Offer',
            offererId: 'AM',
            price: 0,
            thingId: null,
            venueId: null,
          },
        ],
        shareMedium: null,
        thingId: null,
        userId: 'AM',
        validUntilDate: '2018-07-23T12:23:40.685843Z',
        index: 1,
      },
    ],
  },
}

export default state
