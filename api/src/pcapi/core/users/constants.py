import datetime
import enum


RESET_PASSWORD_TOKEN_LIFE_TIME = datetime.timedelta(hours=24)
RESET_PASSWORD_TOKEN_LIFE_TIME_EXTENDED = datetime.timedelta(days=30)
EMAIL_VALIDATION_TOKEN_LIFE_TIME = datetime.timedelta(minutes=30)
EMAIL_CHANGE_TOKEN_LIFE_TIME = datetime.timedelta(hours=24)
PHONE_VALIDATION_TOKEN_LIFE_TIME = datetime.timedelta(hours=12)

MAX_EMAIL_UPDATE_ATTEMPTS_FOR_PRO = 5
EMAIL_PRO_UPDATE_ATTEMPTS_TTL = 24 * 60 * 60  # 1 day in seconds

ELIGIBILITY_AGE_18 = 18
ELIGIBILITY_UNDERAGE_RANGE = [15, 16, 17]

ACCOUNT_CREATION_MINIMUM_AGE = 15

ACCOUNT_UNSUSPENSION_DELAY = 60  # days

TOKEN_DELETION_AFTER_EXPIRATION_DELAY = datetime.timedelta(days=7)

EDUCONNECT_SAML_REQUEST_ID_TTL = 24 * 60 * 60  # 1 day in seconds


class SuspensionReason(enum.Enum):
    def __str__(self) -> str:
        return str(self.value)

    # If you add a new reason, update `suspend_account()` to cancel
    # bookings if applicable.
    CLOSED_STRUCTURE_DEFINITIVE = "definitively closed structure"
    CLOSED_STRUCTURE_TEMP = "temporarly closed structure"
    END_OF_CONTRACT = "end of contract"
    END_OF_ELIGIBILITY = "end of eligibility"
    FRAUD_BOOKING_CANCEL = "booking cancel fraud"
    FRAUD_CREATION_PRO = "creation PRO fraud"
    FRAUD_DUPLICATE = "duplicate fraud"
    FRAUD_FAKE_DOCUMENT = "fake document fraud"
    FRAUD_HACK = "hacking fraud"
    FRAUD_RESELL_PASS = "pass resell fraud"
    FRAUD_RESELL_PRODUCT = "product resell fraud"
    FRAUD_SUSPICION = "fraud suspicion"
    FRAUD_USURPATION = "usurpating fraud"
    FRAUD_USURPATION_PRO = "usurpating PRO fraud"
    SUSPICIOUS_LOGIN_REPORTED_BY_USER = "suspicious login reported by user"
    UPON_USER_REQUEST = "upon user request"
    DELETED = "deleted"
    BLACKLISTED_DOMAIN_NAME = "nom de domaine blacklisté"


SUSPENSION_REASON_CHOICES = {
    SuspensionReason.FRAUD_FAKE_DOCUMENT: "Fraude faux document",
    SuspensionReason.FRAUD_RESELL_PRODUCT: "Fraude revente produit",
    SuspensionReason.FRAUD_RESELL_PASS: "Fraude revente pass",
    SuspensionReason.FRAUD_USURPATION: "Fraude usurpation",
    SuspensionReason.FRAUD_SUSPICION: "Fraude suspicion",
    SuspensionReason.FRAUD_DUPLICATE: "Fraude doublon",
    SuspensionReason.FRAUD_HACK: "Fraude hacking",
    SuspensionReason.FRAUD_BOOKING_CANCEL: "Fraude annulation réservation",
    SuspensionReason.END_OF_CONTRACT: "Fin de contrat",
    SuspensionReason.END_OF_ELIGIBILITY: "Fin d'éligibilité",
    SuspensionReason.SUSPICIOUS_LOGIN_REPORTED_BY_USER: "Connexion suspicieuse signalée par l'utilisateur",
    SuspensionReason.UPON_USER_REQUEST: "Demande de l'utilisateur",
    SuspensionReason.FRAUD_USURPATION_PRO: "Fraude PRO usurpation",
    SuspensionReason.FRAUD_CREATION_PRO: "Fraude PRO création",
    SuspensionReason.CLOSED_STRUCTURE_DEFINITIVE: "Structure définitivement fermée",
    SuspensionReason.CLOSED_STRUCTURE_TEMP: "Structure fermée provisoirement",
    SuspensionReason.DELETED: "Supprimé",
    SuspensionReason.BLACKLISTED_DOMAIN_NAME: "Nom de domaine blacklisté",
}

assert set(SUSPENSION_REASON_CHOICES) == set(SuspensionReason)
