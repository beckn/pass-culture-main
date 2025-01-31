from datetime import datetime
from datetime import timedelta
from typing import ByteString
from typing import Optional

import jwt

from pcapi.core.users.utils import ALGORITHM_RS_256

from tests.routes.adage_iframe import INVALID_RSA_PRIVATE_KEY_PATH
from tests.routes.adage_iframe import VALID_RSA_PRIVATE_KEY_PATH


def create_adage_jwt_default_fake_valid_token(
    civility: str, lastname: str, firstname: str, email: str, uai: Optional[str]
) -> ByteString:
    return create_adage_jwt_fake_valid_token(
        civility=civility,
        lastname=lastname,
        firstname=firstname,
        email=email,
        uai=uai,
        expiration_date=datetime.utcnow() + timedelta(days=1),
    )


def create_adage_jwt_fake_valid_token(
    civility: str,
    lastname: str,
    firstname: str,
    email: str,
    uai: Optional[str],
    expiration_date: datetime,
) -> ByteString:
    with open(VALID_RSA_PRIVATE_KEY_PATH, "rb") as reader:
        authenticated_informations = {
            "civilite": civility,
            "nom": lastname,
            "prenom": firstname,
            "mail": email,
            "uai": uai,
        }
        if expiration_date:
            authenticated_informations["exp"] = expiration_date

        return jwt.encode(
            authenticated_informations,
            key=reader.read(),
            algorithm=ALGORITHM_RS_256,
        )


def create_adage_valid_token_with_email(
    email: str,
    civility: str = "Mme",
    lastname: str = "LAPROF",
    firstname: str = "Jeanne",
    uai: str = "EAU123",
) -> ByteString:
    return create_adage_jwt_fake_valid_token(
        civility=civility,
        lastname=lastname,
        firstname=firstname,
        email=email,
        uai=uai,
        expiration_date=datetime.utcnow() + timedelta(days=1),
    )


def create_adage_jwt_fake_invalid_token(
    civility: str, lastname: str, firstname: str, email: str, uai: str
) -> ByteString:
    now = datetime.utcnow()
    with open(INVALID_RSA_PRIVATE_KEY_PATH, "rb") as reader:
        return jwt.encode(
            {
                "civilite": civility,
                "nom": lastname,
                "prenom": firstname,
                "mail": email,
                "uai": uai,
                "exp": now + timedelta(days=1),
            },
            key=reader.read(),
            algorithm=ALGORITHM_RS_256,
        )
