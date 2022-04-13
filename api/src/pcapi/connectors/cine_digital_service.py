import enum

from pcapi import settings
import pcapi.core.booking_providers.cds.exceptions as cds_exceptions
from pcapi.core.booking_providers.cds.mocked_api_calls import MockedPaymentType
from pcapi.core.booking_providers.cds.mocked_api_calls import MockedScreens
from pcapi.core.booking_providers.cds.mocked_api_calls import MockedShows
from pcapi.core.booking_providers.cds.mocked_api_calls import MockedTariffs
from pcapi.utils import requests


class ResourceCDS(enum.Enum):
    TARIFFS = "tariffs"
    SHOWS = "shows"
    PAYMENT_TYPE = "paiementtype"
    SCREENS = "screens"


MOCKS = {
    ResourceCDS.SHOWS: MockedShows,
    ResourceCDS.PAYMENT_TYPE: MockedPaymentType,
    ResourceCDS.TARIFFS: MockedTariffs,
    ResourceCDS.SCREENS: MockedScreens,
}


def get_resource(api_url: str, cinema_id: str, token: str, resource: ResourceCDS) -> object:

    if settings.IS_DEV:
        return MOCKS[resource]

    try:
        url = _build_url(api_url, cinema_id, token, resource)
        response = requests.get(url)
        response.raise_for_status()

    except requests.exceptions.RequestException as e:
        raise cds_exceptions.CineDigitalServiceAPIException(f"API CDS - url : {url} - error : {e}")

    return response.json()


def _build_url(api_url: str, cinema_id: str, token: str, resource: ResourceCDS) -> str:
    return f"https://{cinema_id}.{api_url}{resource.value}?api_token={token}"
