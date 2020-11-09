from datetime import datetime
from datetime import timedelta

import pytest

from pcapi.model_creators.generic_creators import create_offerer
from pcapi.model_creators.generic_creators import create_stock
from pcapi.model_creators.generic_creators import create_venue
from pcapi.model_creators.specific_creators import create_offer_with_event_product
from pcapi.model_creators.specific_creators import create_offer_with_thing_product
from pcapi.model_creators.specific_creators import create_stock_with_event_offer
from pcapi.models import ApiErrors
from pcapi.models import VenueSQLEntity
from pcapi.repository import repository
from pcapi.repository.provider_queries import get_provider_by_local_class
from pcapi.routes.serialization import serialize
from pcapi.utils.human_ids import humanize
from pcapi.validation.routes.stocks import check_dates_are_allowed_on_existing_stock
from pcapi.validation.routes.stocks import check_only_editable_fields_will_be_updated
from pcapi.validation.routes.stocks import check_stock_is_updatable
from pcapi.validation.routes.stocks import get_only_fields_with_value_to_be_updated


class CheckDatesAreAllowedOnExistingStockTest:
    class OfferIsOnThingTest:
        def should_raise_error_with_beginning_datetime(self):
            # Given
            offer = create_offer_with_thing_product(VenueSQLEntity())
            data = {'beginningDatetime': serialize(datetime(2019, 2, 14))}

            # When
            with pytest.raises(ApiErrors) as e:
                check_dates_are_allowed_on_existing_stock(data, offer)

            # Then
            assert e.value.errors['global'] == [
                "Impossible de mettre une date de début si l'offre ne porte pas sur un événement"
            ]


        def should_not_raise_error_with_missing_booking_limit_datetime(self):
            # Given
            offer = create_offer_with_thing_product(VenueSQLEntity())
            beginningDatetime = datetime(2019, 2, 14)

            data = {
                'price': 0,
                'offerId': humanize(offer.id),
            }

            try:
                check_dates_are_allowed_on_existing_stock(data, offer)

            except ApiErrors:
                # Then
                assert pytest.fail("Should not fail with valid params")

        def should_not_raise_error_with_none_booking_limit_datetime(self):
            # Given
            offer = create_offer_with_thing_product(VenueSQLEntity())
            data = {
                'price': 0,
                'offerId': humanize(offer.id),
                'bookingLimitDatetime': None,
            }

            # Then
            try:
                check_dates_are_allowed_on_existing_stock(data, offer)

            except ApiErrors:
                # Then
                assert pytest.fail("Should not fail with valid params")

    class OfferIsOnEventTest:
        def should_raise_error_with_none_beginning_datetime(self):
            # Given
            offer = create_offer_with_event_product()
            data = {'beginningDatetime': None}

            # When
            with pytest.raises(ApiErrors) as e:
                check_dates_are_allowed_on_existing_stock(data, offer)

            # Then
            assert e.value.errors['beginningDatetime'] == [
                'Ce paramètre est obligatoire'
            ]


        def should_raise_error_with_none_booking_limit_datetime(self):
            # Given
            offer = create_offer_with_event_product()
            data = {
                'price': 0,
                'offerId': humanize(offer.id),
                'bookingLimitDatetime': None,
                'beginningDatetime': serialize(datetime(2019, 2, 14))
            }

            # When
            with pytest.raises(ApiErrors) as e:
                check_dates_are_allowed_on_existing_stock(data, offer)

            # Then
            assert e.value.errors['bookingLimitDatetime'] == [
                'Ce paramètre est obligatoire'
            ]


class CheckStockIsUpdatableTest:
    @pytest.mark.usefixtures("db_session")
    def should_fail_when_offer_is_from_titeliveprovider(self, app):
        # Given
        offerer = create_offerer()
        venue = create_venue(offerer)
        provider = get_provider_by_local_class('TiteLiveStocks')
        offer = create_offer_with_thing_product(venue, last_provider_id=provider.id, last_provider=provider)
        stock = create_stock(id_at_providers='test', offer=offer, quantity=10)

        repository.save(stock)

        # When
        with pytest.raises(ApiErrors) as error:
            check_stock_is_updatable(stock)

        # Then
        assert error.value.errors['global'] == [
            'Les offres importées ne sont pas modifiables'
        ]

    @pytest.mark.usefixtures("db_session")
    def should_fail_when_offer_is_from_librairesprovider(self, app):
        # Given
        offerer = create_offerer()
        venue = create_venue(offerer)
        provider = get_provider_by_local_class('LibrairesStocks')
        offer = create_offer_with_thing_product(venue, last_provider_id=provider.id, last_provider=provider)
        stock = create_stock(id_at_providers='test', offer=offer, quantity=10)

        repository.save(stock)

        # When
        with pytest.raises(ApiErrors) as error:
            check_stock_is_updatable(stock)

        # Then
        assert error.value.errors['global'] == [
            'Les offres importées ne sont pas modifiables'
        ]

    @pytest.mark.usefixtures("db_session")
    def should_fail_when_offer_is_from_fnacprovider(self, app):
        # Given
        offerer = create_offerer()
        venue = create_venue(offerer)
        provider = get_provider_by_local_class('FnacStocks')
        offer = create_offer_with_thing_product(venue, last_provider_id=provider.id, last_provider=provider)
        stock = create_stock(id_at_providers='test', offer=offer, quantity=10)

        repository.save(stock)

        # When
        with pytest.raises(ApiErrors) as error:
            check_stock_is_updatable(stock)

        # Then
        assert error.value.errors['global'] == [
            'Les offres importées ne sont pas modifiables'
        ]

    @pytest.mark.usefixtures("db_session")
    def should_fail_when_offer_is_from_praxielprovider(self, app):
        # Given
        offerer = create_offerer()
        venue = create_venue(offerer)
        provider = get_provider_by_local_class('PraxielStocks')
        offer = create_offer_with_thing_product(venue, last_provider_id=provider.id, last_provider=provider)
        stock = create_stock(id_at_providers='test', offer=offer, quantity=10)

        repository.save(stock)

        # When
        with pytest.raises(ApiErrors) as error:
            check_stock_is_updatable(stock)

        # Then
        assert error.value.errors['global'] == [
            'Les offres importées ne sont pas modifiables'
        ]

    @pytest.mark.usefixtures("db_session")
    def should_raise_an_error_when_event_is_expired(self, app):
        # Given
        offerer = create_offerer()
        venue = create_venue(offerer)
        provider = get_provider_by_local_class('PraxielStocks')
        offer = create_offer_with_thing_product(venue, last_provider_id=provider.id, last_provider=provider)
        three_days_ago = datetime.utcnow() + timedelta(days=-3)
        stock = create_stock_with_event_offer(offerer=offerer, venue=venue, beginning_datetime=three_days_ago, booking_limit_datetime=three_days_ago, offer_id=offer.id)

        # When
        with pytest.raises(ApiErrors) as error:
            check_stock_is_updatable(stock)

        # Then
        assert error.value.errors['global'] == [
            'Les événements passés ne sont pas modifiables'
        ]

    @pytest.mark.usefixtures("db_session")
    def should_not_raise_an_error_when_event_is_not_expired(self, app):
        # Given
        offerer = create_offerer()
        venue = create_venue(offerer)
        in_three_days = datetime.utcnow() + timedelta(days=3)
        stock = create_stock_with_event_offer(offerer=offerer, venue=venue, beginning_datetime=in_three_days, booking_limit_datetime=in_three_days)

        # When
        try:
            check_stock_is_updatable(stock)

        except ApiErrors:
            # Then
            assert pytest.fail("Stock should be updatable and not expired")

    @pytest.mark.usefixtures("db_session")
    def should_not_raise_an_error_when_offer_is_not_from_provider(self, app):
        # Given
        offerer = create_offerer()
        venue = create_venue(offerer)
        offer = create_offer_with_thing_product(venue)
        stock = create_stock(offer=offer)

        # When
        try:
            check_stock_is_updatable(stock)

        except ApiErrors:
            # Then
            assert pytest.fail("Stock should be updatable")

    @pytest.mark.usefixtures("db_session")
    def should_not_raise_an_error_when_offer_is_from_allocine_provider(self, app):
        # given
        offerer = create_offerer()
        venue = create_venue(offerer)
        provider = get_provider_by_local_class('AllocineStocks')
        offer = create_offer_with_thing_product(venue, last_provider_id=provider.id)
        stock = create_stock(id_at_providers='test', offer=offer)

        repository.save(stock)

        # When
        try:
            check_stock_is_updatable(stock)

        except ApiErrors:
            # Then
            assert pytest.fail("Stock should be updatable when offer is from allocine provider")


class CheckOnlyEditableFieldsWillBeUpdatedTest:
    def should_raise_an_error_when_no_editable_fields_in_stock(self):
        # Given
        editable_fields = []

        updated_fields = ['price', 'notEditableField']

        # When
        with pytest.raises(ApiErrors) as error:
            check_only_editable_fields_will_be_updated(updated_fields, editable_fields)

        # Then
        assert error.value.errors['global'] == [
            'Pour les offres importées, certains champs ne sont pas modifiables'
        ]

    def should_raise_an_error_when_trying_to_update_a_non_editable_field_in_stock(self):
        # Given
        editable_fields = ['price', 'bookingLimitDatetime', 'available']

        updated_fields = ['price', 'notEditableField']

        # When
        with pytest.raises(ApiErrors) as error:
            check_only_editable_fields_will_be_updated(updated_fields, editable_fields)

        # Then
        assert error.value.errors['global'] == [
            'Pour les offres importées, certains champs ne sont pas modifiables'
        ]

    def should_not_raise_an_error_when_trying_to_update_an_editable_field_in_stock(self):
        # Given
        editable_fields = ['price', 'bookingLimitDatetime', 'available']

        updated_fields = ['price', 'bookingLimitDatetime']

        # When
        try:
            check_only_editable_fields_will_be_updated(updated_fields, editable_fields)

        except ApiErrors:
            # Then
            assert pytest.fail("Should not fail with valid params")

    def should_not_raise_an_error_when_there_is_no_update(self):
        # Given
        editable_fields = ['price', 'bookingLimitDatetime', 'available']

        updated_fields = []

        # When
        try:
            check_only_editable_fields_will_be_updated(updated_fields, editable_fields)

        except ApiErrors:
            # Then
            assert pytest.fail("Should not fail with valid params")


class GetOnlyFieldsWithValueToBeUpdatedTest:
    def when_new_stock_data_contains_only_modified_fields(self):
        # Given
        stock_before_update = {'available': None, 'beginningDatetime': '2020-02-08T14:30:00Z',
                               'bookingLimitDatetime': '2020-02-08T14:30:00Z',
                               'dateCreated': '2020-01-29T14:33:08.746369Z',
                               'dateModified': '2020-01-29T14:33:08.746382Z',
                               'dateModifiedAtLastProvider': '2020-01-29T14:33:07.803374Z',
                               'fieldsUpdated': [], 'id': 'AGXA',
                               'idAtProviders': 'TW92aWU6MjY1NTcy%22222222311111#LOCAL/2020-02-08T15:30:00',
                               'isSoftDeleted': False, 'lastProviderId': 'BY', 'modelName': 'Stock', 'offerId': 'QY',
                               'price': 22.0, 'remainingQuantity': 0}

        stock_data = {'bookingLimitDatetime': '2020-02-08T12:30:00Z'}

        # When
        stock_updated_fields = get_only_fields_with_value_to_be_updated(stock_before_update, stock_data)

        # Then
        assert set(stock_updated_fields) == {'bookingLimitDatetime'}

    def when_new_stock_data_contains_all_fields(self):
        # Given
        stock_before_update = {'available': None, 'beginningDatetime': '2020-02-08T14:30:00Z',
                               'bookingLimitDatetime': '2020-02-08T14:30:00Z',
                               'dateCreated': '2020-01-29T14:33:08.746369Z',
                               'dateModified': '2020-01-29T14:33:08.746382Z',
                               'dateModifiedAtLastProvider': '2020-01-29T14:33:07.803374Z',
                               'fieldsUpdated': [], 'id': 'AGXA',
                               'idAtProviders': 'TW92aWU6MjY1NTcy%22222222311111#LOCAL/2020-02-08T15:30:00',
                               'isSoftDeleted': False, 'lastProviderId': 'BY', 'modelName': 'Stock', 'offerId': 'QY',
                               'price': 22.0, 'remainingQuantity': 0}

        stock_data = {'available': None, 'bookingLimitDatetime': '2020-02-08T12:30:00Z', 'id': 'AGXA', 'offerId': 'QY',
                      'offererId': 'A4', 'price': 25, 'beginningDatetime': '2020-02-08T14:30:00Z',
                      'beginningTime': '15:30'}

        # When
        stock_updated_fields = get_only_fields_with_value_to_be_updated(stock_before_update, stock_data)

        # Then
        assert set(stock_updated_fields) == {'price', 'bookingLimitDatetime'}
