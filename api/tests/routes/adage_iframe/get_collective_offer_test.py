from datetime import datetime

from freezegun.api import freeze_time
import pytest

from pcapi.core.educational import factories as educational_factories
from pcapi.core.educational.models import StudentLevels
from pcapi.core.offerers import factories as offerers_factories
from pcapi.core.testing import assert_no_duplicated_queries
from pcapi.models import offer_mixin

from tests.routes.adage_iframe.utils_create_test_token import create_adage_valid_token_with_email


pytestmark = pytest.mark.usefixtures("db_session")

stock_date = datetime(2021, 5, 15)
educational_year_dates = {"start": datetime(2020, 9, 1), "end": datetime(2021, 8, 31)}


@freeze_time("2020-11-17 15:00:00")
class CollectiveOfferTest:
    def test_get_collective_offer(self, client):
        # Given
        institution = educational_factories.EducationalInstitutionFactory(institutionId="12890AI")
        stock = educational_factories.CollectiveStockFactory(
            beginningDatetime=datetime(2021, 5, 15),
            collectiveOffer__name="offer name",
            collectiveOffer__description="offer description",
            price=10,
            collectiveOffer__students=[StudentLevels.GENERAL2],
            collectiveOffer__educational_domains=[educational_factories.EducationalDomainFactory()],
            collectiveOffer__institution=institution,
            collectiveOffer__teacher=educational_factories.EducationalRedactorFactory(),
        )

        adage_jwt_fake_valid_token = create_adage_valid_token_with_email(
            email="toto@mail.com",
            uai=institution.institutionId,
        )
        client.auth_header = {"Authorization": f"Bearer {adage_jwt_fake_valid_token}"}
        offer_id = stock.collectiveOffer.id

        # When
        with assert_no_duplicated_queries():
            response = client.get(f"/adage-iframe/collective/offers/{offer_id}")

        # Then
        assert response.status_code == 200
        assert response.json == {
            "description": "offer description",
            "id": offer_id,
            "isExpired": False,
            "isSoldOut": False,
            "name": "offer name",
            "stock": {
                "beginningDatetime": "2021-05-15T00:00:00Z",
                "bookingLimitDatetime": "2021-05-14T23:00:00Z",
                "id": stock.id,
                "isBookable": True,
                "price": 1000,
                "educationalPriceDetail": stock.priceDetail,
                "numberOfTickets": stock.numberOfTickets,
            },
            "subcategoryLabel": stock.collectiveOffer.subcategory.app_label,
            "venue": {
                "address": "1 boulevard Poissonnière",
                "city": "Paris",
                "coordinates": {"latitude": 48.87004, "longitude": 2.3785},
                "id": stock.collectiveOffer.venue.id,
                "name": stock.collectiveOffer.venue.name,
                "postalCode": "75000",
                "publicName": stock.collectiveOffer.venue.publicName,
                "managingOfferer": {"name": stock.collectiveOffer.venue.managingOfferer.name},
            },
            "audioDisabilityCompliant": False,
            "mentalDisabilityCompliant": False,
            "motorDisabilityCompliant": False,
            "visualDisabilityCompliant": False,
            "durationMinutes": None,
            "contactEmail": stock.collectiveOffer.contactEmail,
            "contactPhone": stock.collectiveOffer.contactPhone,
            "offerVenue": {
                "addressType": "other",
                "address": None,
                "city": None,
                "name": None,
                "otherAddress": stock.collectiveOffer.offerVenue["otherAddress"],
                "postalCode": None,
                "publicName": None,
                "venueId": stock.collectiveOffer.offerVenue["venueId"],
            },
            "students": ["Lycée - Seconde"],
            "offerId": None,
            "educationalPriceDetail": stock.priceDetail,
            "domains": [{"id": stock.collectiveOffer.domains[0].id, "name": stock.collectiveOffer.domains[0].name}],
            "educationalInstitution": {
                "id": institution.id,
                "institutionType": institution.institutionType,
                "name": institution.name,
                "city": institution.city,
                "postalCode": institution.postalCode,
            },
            "interventionArea": ["93", "94", "95"],
            "imageCredit": None,
            "imageUrl": None,
            "teacher": {
                "email": stock.collectiveOffer.teacher.email,
                "firstName": stock.collectiveOffer.teacher.firstName,
                "lastName": stock.collectiveOffer.teacher.lastName,
                "civility": stock.collectiveOffer.teacher.civility,
            },
        }

    def test_get_collective_offer_with_offer_venue(self, client):
        # Given
        institution = educational_factories.EducationalInstitutionFactory(institutionId="pouet")
        venue = offerers_factories.VenueFactory()
        stock = educational_factories.CollectiveStockFactory(
            beginningDatetime=datetime(2021, 5, 15),
            collectiveOffer__name="offer name",
            collectiveOffer__description="offer description",
            price=10,
            collectiveOffer__students=[StudentLevels.GENERAL2],
            collectiveOffer__educational_domains=[educational_factories.EducationalDomainFactory()],
            collectiveOffer__institution=institution,
            collectiveOffer__offerVenue={
                "venueId": venue.id,
                "addressType": "offererVenue",
                "otherAddress": "",
            },
        )

        adage_jwt_fake_valid_token = create_adage_valid_token_with_email(
            email="toto@mail.com",
            uai="autre",
        )
        client.auth_header = {"Authorization": f"Bearer {adage_jwt_fake_valid_token}"}
        offer_id = stock.collectiveOffer.id

        # When
        with assert_no_duplicated_queries():
            response = client.get(f"/adage-iframe/collective/offers/{offer_id}")

        # Then
        assert response.status_code == 200
        assert response.json == {
            "description": "offer description",
            "id": offer_id,
            "isExpired": False,
            "isSoldOut": False,
            "name": "offer name",
            "stock": {
                "beginningDatetime": "2021-05-15T00:00:00Z",
                "bookingLimitDatetime": "2021-05-14T23:00:00Z",
                "id": stock.id,
                "isBookable": True,
                "price": 1000,
                "educationalPriceDetail": stock.priceDetail,
                "numberOfTickets": stock.numberOfTickets,
            },
            "subcategoryLabel": stock.collectiveOffer.subcategory.app_label,
            "venue": {
                "address": "1 boulevard Poissonnière",
                "city": "Paris",
                "coordinates": {"latitude": 48.87004, "longitude": 2.3785},
                "id": stock.collectiveOffer.venue.id,
                "name": stock.collectiveOffer.venue.name,
                "postalCode": "75000",
                "publicName": stock.collectiveOffer.venue.publicName,
                "managingOfferer": {"name": stock.collectiveOffer.venue.managingOfferer.name},
            },
            "audioDisabilityCompliant": False,
            "mentalDisabilityCompliant": False,
            "motorDisabilityCompliant": False,
            "visualDisabilityCompliant": False,
            "durationMinutes": None,
            "contactEmail": stock.collectiveOffer.contactEmail,
            "contactPhone": stock.collectiveOffer.contactPhone,
            "offerVenue": {
                "addressType": "offererVenue",
                "address": venue.address,
                "city": venue.city,
                "name": venue.name,
                "otherAddress": "",
                "postalCode": venue.postalCode,
                "publicName": venue.publicName,
                "venueId": venue.id,
            },
            "students": ["Lycée - Seconde"],
            "offerId": None,
            "educationalPriceDetail": stock.priceDetail,
            "domains": [{"id": stock.collectiveOffer.domains[0].id, "name": stock.collectiveOffer.domains[0].name}],
            "educationalInstitution": {
                "id": institution.id,
                "institutionType": institution.institutionType,
                "name": institution.name,
                "city": institution.city,
                "postalCode": institution.postalCode,
            },
            "interventionArea": ["93", "94", "95"],
            "imageCredit": None,
            "imageUrl": None,
            "teacher": None,
        }

    def test_should_return_404_when_no_collective_offer(self, client):
        # Given
        adage_jwt_fake_valid_token = create_adage_valid_token_with_email(email="toto@mail.com", uai="12890AI")
        client.auth_header = {"Authorization": f"Bearer {adage_jwt_fake_valid_token}"}

        # When
        response = client.get("/adage-iframe/collective/offers/0")

        # Then
        assert response.status_code == 404

    @pytest.mark.parametrize(
        "validation",
        [
            offer_mixin.OfferValidationStatus.DRAFT,
            offer_mixin.OfferValidationStatus.PENDING,
            offer_mixin.OfferValidationStatus.REJECTED,
        ],
    )
    def test_should_return_404_when_collective_offer_template_is_not_approved(self, client, validation):
        # Given
        offer = educational_factories.CollectiveOfferFactory(validation=validation)

        adage_jwt_fake_valid_token = create_adage_valid_token_with_email(email="toto@mail.com", uai="12890AI")
        client.auth_header = {"Authorization": f"Bearer {adage_jwt_fake_valid_token}"}

        # When
        response = client.get(f"/adage-iframe/collective/offers/{offer.id}")

        # Then
        assert response.status_code == 404
