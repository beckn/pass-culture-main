import pytest

from pcapi.core.bookings.factories import BookingFactory
from pcapi.core.offerers.api import find_api_key
from pcapi.core.offers.factories import UserOffererFactory
from pcapi.utils.human_ids import humanize

from tests.conftest import TestClient


@pytest.mark.usefixtures("db_session")
def test_generate_api_key(client):
    booking = BookingFactory()
    user_offerer = UserOffererFactory(offerer=booking.stock.offer.venue.managingOfferer)

    response = (
        TestClient(client)
        .with_auth(user_offerer.user.email)
        .post(f"/offerers/{humanize(user_offerer.offerer.id)}/api_keys")
    )

    assert response.status_code == 200

    saved_key = find_api_key(response.json["apiKey"])
    assert saved_key.offererId == user_offerer.offerer.id

    # test generated api key grants authentication on bookings API
    response = TestClient(client).get(
        f"/v2/bookings/token/{booking.token.lower()}",
        headers={"Authorization": f"""Bearer {response.json["apiKey"]}"""},
    )
    assert response.status_code == 200
