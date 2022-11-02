import datetime

import attrs
from dateutil.relativedelta import relativedelta
import pytest

from pcapi.core.fraud import factories as fraud_factories
from pcapi.core.fraud import models as fraud_models
from pcapi.core.users import factories as users_factories
from pcapi.core.users import young_status


pytestmark = pytest.mark.usefixtures("db_session")


def _with_age(age):
    return datetime.datetime.utcnow() - relativedelta(years=age)


class UserStatusTest:
    class EligibleTest:
        @pytest.mark.parametrize("age", [15, 16, 17, 18])
        def test_eligible_when_age_is_between_15_and_18(self, age):
            user = users_factories.UserFactory(dateOfBirth=_with_age(age))
            assert young_status.young_status(user) == young_status.Eligible()

        def test_eligible_when_19yo_with_pending_dms_application(self):
            user = users_factories.UserFactory(dateOfBirth=_with_age(19))
            fraud_factories.BeneficiaryFraudCheckFactory(
                user=user,
                type=fraud_models.FraudCheckType.DMS,
                resultContent=fraud_factories.DMSContentFactory(
                    registration_datetime=(datetime.datetime.utcnow() - relativedelta(years=1))
                ),
            )
            assert young_status.young_status(user) == young_status.Eligible()

    def test_non_eligible_when_too_young(self):
        user = users_factories.UserFactory(dateOfBirth=_with_age(15) + relativedelta(days=1))
        assert young_status.young_status(user) == young_status.NonEligible()

    def test_non_eligible_when_too_old(self):
        user = users_factories.UserFactory(dateOfBirth=_with_age(19) - relativedelta(days=1))
        assert young_status.young_status(user) == young_status.NonEligible()

    def test_beneficiary_when_18yo_and_have_deposit(self):
        user = users_factories.BeneficiaryGrant18Factory()
        assert young_status.young_status(user) == young_status.Beneficiary()

    def test_beneficiary_when_underage_and_have_deposit(self):
        user = users_factories.UnderageBeneficiaryFactory()
        assert young_status.young_status(user) == young_status.Beneficiary()

    def test_ex_beneficiary_when_beneficiary_have_his_deposit_expired(self):
        user = users_factories.BeneficiaryGrant18Factory(
            deposit__expirationDate=datetime.datetime.utcnow() - relativedelta(days=1)
        )
        assert young_status.young_status(user) == young_status.ExBeneficiary()

    def test_suspended_when_account_is_not_active(self):
        user = users_factories.BeneficiaryGrant18Factory(isActive=False)
        assert young_status.young_status(user) == young_status.Suspended()

    def test_can_not_mutate(self):
        status = young_status.Suspended()
        with pytest.raises(attrs.exceptions.FrozenInstanceError):
            status.status_type = young_status.YoungStatusType.BENEFICIARY
