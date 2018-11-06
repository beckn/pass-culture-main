from models import Thing, ThingType


def find_by_id(id):
    return Thing.query.get(id)


def find_thing_by_isbn_only_for_type_book(isbn):
    thing = Thing.query.filter((Thing.type == ThingType.LIVRE_EDITION.name) &
                               (Thing.idAtProviders == isbn)) \
                               .one_or_none()
    return thing
