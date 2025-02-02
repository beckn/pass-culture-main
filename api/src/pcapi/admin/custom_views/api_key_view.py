from flask.helpers import flash
from wtforms import Form
from wtforms import validators
from wtforms.fields import Field
from wtforms.fields import StringField
from wtforms.validators import ValidationError

from pcapi.admin.base_configuration import BaseAdminView
from pcapi.core.offerers.api import API_KEY_SEPARATOR
from pcapi.core.offerers.api import generate_offerer_api_key
from pcapi.core.offerers.models import ApiKey
from pcapi.core.offerers.repository import find_offerer_by_siren
from pcapi.models import db


def check_siren(form: Form, field: Field) -> None:
    offerer = find_offerer_by_siren(field.data)
    if not offerer:
        raise ValidationError("Aucune structure existante avec ce SIREN.")


class ApiKeyView(BaseAdminView):
    can_create = True
    column_list = ["offerer.siren", "prefix"]
    column_labels = {"offerer.siren": "Siren de la structure", "prefix": "Valeur"}
    form_columns = None
    form_excluded_columns = ["offerer", "prefix", "secret"]
    column_formatters = dict(
        prefix=lambda v, c, m, p: f"{m.prefix}{API_KEY_SEPARATOR}***" if m.prefix else None,
    )

    def get_create_form(self) -> Form:
        form = super().get_form()
        form.offererSiren = StringField(
            "SIREN",
            [
                validators.DataRequired(),
                validators.Length(9, 9, "Un SIREN contient 9 caractères"),
                check_siren,
            ],
        )
        return form

    def on_model_change(self, form: Form, model: ApiKey, is_created: bool) -> None:
        if is_created:
            with db.session.no_autoflush:
                offerer_id = find_offerer_by_siren(form.offererSiren.data).id  # type: ignore [union-attr]
                api_key, clear_api_key = generate_offerer_api_key(offerer_id)
            model.offererId = offerer_id
            model.prefix = api_key.prefix
            model.secret = api_key.secret

        flash(
            f"La Clé API ne peut être régénérée ni ré-affichée, veillez à la sauvegarder immédiatement : {clear_api_key}"
        )
        super().on_model_change(form, model, is_created)
