import datetime

from pcapi.routes.serialization import BaseModel

# imported here to avoid import from offerers in venues blueprint
from ..offerers.serialization import BaseOffersStats  # pylint: disable=unused-import
from ..offerers.serialization import OffersStats


class LastOfferSyncStats(BaseModel):
    date: datetime.datetime | None
    provider: str | None


class VenueOffersStats(OffersStats):
    lastSync: LastOfferSyncStats


class VenueStats(BaseModel):
    stats: VenueOffersStats
    total_revenue: float


class VenueBankInformation(BaseModel):
    pricing_point_name: str | None
    pricing_point_url: str | None
    reimbursement_point_name: str | None
    reimbursement_point_url: str | None
    bic: str | None
    iban: str | None


class VenueDmsStats(BaseModel):
    status: str
    subscriptionDate: datetime.datetime
    lastChangeDate: datetime.datetime
    url: str
