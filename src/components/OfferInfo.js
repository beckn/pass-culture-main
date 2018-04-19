import get from 'lodash.get'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import Icon from './Icon'
import { navigationLink } from '../utils/geolocation'
import selectDistance from '../selectors/distance'
import selectCurrentOffer from '../selectors/currentOffer'
import selectCurrentOfferer from '../selectors/currentOfferer'
import selectCurrentSource from '../selectors/currentSource'
import selectCurrentThumbUrl from '../selectors/currentThumbUrl'
import selectVenue from '../selectors/currentVenue'
import selectCurrentUserMediation from '../selectors/currentUserMediation'

class OfferInfo extends Component {
  render() {
    const {
      distance,
      offer,
      source,
      thumbUrl,
      venue,
      userMediation,
      offerer,
    } = this.props

    const infos = {
      image: thumbUrl,
      description: get(source, 'description'),
      what: get(offer, 'eventOccurence.event.description'),
      when: get(userMediation, 'mediatedOccurences', []).map(
        o => o.beginningDatetime
      ),
      where: {
        name: get(venue, 'name'),
        address: get(venue, 'address'),
      },
    }

    return (
      <div className="offer-info">
        {offerer && (
          <div className="offerer">Ce livre vous est offert par {offerer}.</div>
        )}
        {false && <img alt="" className="offerPicture" src={infos.image} />}
        {infos.description &&
          !infos.what && (
            <div className="description">
              {infos.description
                .split('\n')
                .map((p, index) => <p key={index}>{p}</p>)}
            </div>
          )}
        {infos.what && (
          <div>
            <h3>Quoi ?</h3>
            <p>{infos.what}</p>
          </div>
        )}
        {infos.when && (
          <div>
            <h3>Quand ?</h3>
            <ul className="dates-info">
              {infos.when.map(
                (occurence, index) =>
                  index < 7 && (
                    <li key={index}>
                      <span>
                        {moment(occurence).format('dddd DD/MM/YYYY à H:mm')}
                      </span>
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
        {infos.where.name &&
          infos.where.address && (
            <div>
              <h3>Où ?</h3>
              <a
                className="distance"
                href={navigationLink(venue.latitude, venue.longitude)}
              >
                {distance}
                <Icon svg="ico-geoloc-solid2" />
              </a>
              <ul className="address-info">
                <li>{infos.where.name}</li>
                {infos.where.address
                  .split(/[,\n\r]/)
                  .map((el, index) => <li key={index}>{el}</li>)}
              </ul>
            </div>
          )}
      </div>
    )
  }
}

export default connect(state => ({
  distance: selectDistance(state),
  offer: selectCurrentOffer(state),
  offerer: selectCurrentOfferer(state),
  source: selectCurrentSource(state),
  thumbUrl: selectCurrentThumbUrl(state),
  userMediation: selectCurrentUserMediation(state),
  venue: selectVenue(state),
}))(OfferInfo)
