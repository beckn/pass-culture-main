from unittest.mock import patch

import pytest

from pcapi.core.categories import categories
from pcapi.core.categories.subcategories import Subcategory
from pcapi.core.categories.subcategories_v2 import NativeCategory

from tests.routes.adage_iframe.utils_create_test_token import create_adage_valid_token_with_email


pytestmark = pytest.mark.usefixtures("db_session")


@patch(
    "pcapi.core.categories.subcategories.ALL_SUBCATEGORIES",
    (
        Subcategory(
            id="ABO_BIBLIOTHEQUE",
            category=categories.LIVRE,
            native_category=NativeCategory.BIBLIOTHEQUE,
            pro_label="Abonnement (bibliothèques, médiathèques...)",
            app_label="Abonnement (bibliothèques, médiathèques...)",
            search_group_name="LIVRE",
            homepage_label_name="LIVRE",
            is_event=False,
            conditional_fields=[],
            can_expire=True,
            can_be_duo=False,
            can_be_educational=False,
            online_offline_platform="OFFLINE",
            is_digital_deposit=False,
            is_physical_deposit=True,
            reimbursement_rule="STANDARD",
        ),
        Subcategory(
            id="CINE_PLEIN_AIR",
            category=categories.CINEMA,
            native_category=NativeCategory.SEANCES_DE_CINEMA,
            pro_label="Cinéma plein air",
            app_label="Cinéma plein air",
            search_group_name="CINEMA",
            homepage_label_name="CINEMA",
            is_event=True,
            conditional_fields=["author", "visa", "stageDirector"],
            can_expire=False,
            can_be_duo=True,
            can_be_educational=True,
            online_offline_platform="OFFLINE",
            is_digital_deposit=False,
            is_physical_deposit=False,
            reimbursement_rule="STANDARD",
        ),
    ),
)
@patch(
    "pcapi.core.categories.categories.ALL_CATEGORIES",
    (
        categories.Category(
            id="LIVRE",
            pro_label="Livre",
        ),
        categories.Category(
            id="CINEMA",
            pro_label="Cinéma",
        ),
    ),
)
class CategoriesTest:
    def test_get_categories(self, client):
        # Given
        adage_jwt_fake_valid_token = create_adage_valid_token_with_email(email="toto@mail.com", uai="12890AI")
        client.auth_header = {"Authorization": f"Bearer {adage_jwt_fake_valid_token}"}

        # When
        response = client.get("/adage-iframe/offers/categories")

        assert response.status_code == 200
        assert response.json == {
            "categories": [{"id": "CINEMA", "proLabel": "Cinéma"}],
            "subcategories": [{"id": "CINE_PLEIN_AIR", "categoryId": "CINEMA"}],
        }
