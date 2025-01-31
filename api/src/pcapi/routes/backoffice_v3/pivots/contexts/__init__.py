import typing

from werkzeug.exceptions import NotFound

from .allocine import AllocineContext
from .base import PivotContext
from .boost import BoostContext
from .cgr import CGRContext
from .cineoffice import CineofficeContext


def get_context(provider_name: str) -> typing.Type[PivotContext]:
    context = {
        "allocine": AllocineContext,
        "boost": BoostContext,
        "cgr": CGRContext,
        "cineoffice": CineofficeContext,
    }.get(provider_name)

    if not context:
        raise NotFound()

    return context
