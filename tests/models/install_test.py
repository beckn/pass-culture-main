from models import Feature
from models.feature import FeatureToggle
from models.install import install_features
from tests.conftest import clean_database


class InstallFeaturesTest:
    @clean_database
    def test_creates_entries_in_feature_table_with_is_active_true(self, app):
        # Given
        Feature.query.delete()

        # When
        install_features()

        # Then
        for feature_toggle in FeatureToggle:
            feature = Feature.query.filter_by(name=feature_toggle).one()
            assert feature.description == feature_toggle.value
            assert feature.isActive