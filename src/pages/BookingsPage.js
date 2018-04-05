import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'

import TimeAgo from 'react-timeago'
import frenchStrings from 'react-timeago/lib/language-strings/fr-short'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

import withLogin from '../hocs/withLogin'
import { requestData } from '../reducers/data'
import MenuButton from '../components/layout/MenuButton'
import Icon from '../components/Icon'
import selectBookings from '../selectors/bookings'

const formatter = buildFormatter(Object.assign(frenchStrings, {
  prefixAgo: 'Il y a',
  prefixFromNow: 'Dans',
}))

class BookingsPage extends Component {

  renderBooking = b => (
    <li key={b.id}>
      <Link to={b.path}>
        <div className='thumb'>
          <img src={b.thumbUrl} alt='Thumb' />
        </div>
        <div className='infos'>
          <div className='top'>
            <h5>{b.name}</h5>
            <TimeAgo date={b.date} formatter={formatter} />
          </div>
          <div className='token'>{b.token}</div>
        </div>
        <div className='arrow'>
          <Icon svg='ico-next-S' />
        </div>
      </Link>
    </li>
  )

  render() {
    const {
      soonBookings,
      otherBookings,
    } = this.props.bookings;
    return (
      <div className='page bookings-page'>
        <header>Mes réservations</header>
        <div className='content'>
          { soonBookings.length > 0 && (
            <div>
              <h4>C'est bientôt !</h4>
              <ul className='bookings'>
                {soonBookings.map(this.renderBooking)}
              </ul>
            </div>
          )}
          {otherBookings.length > 0 && (
            <div>
              <h4>Réservations</h4>
              <ul className='bookings'>
                {otherBookings.map(this.renderBooking)}
              </ul>
            </div>
          )}
          { soonBookings.length === 0 && otherBookings.length === 0 && (
            <div>
              <p className='nothing'>
                Pas encore de réservation.
              </p>
              <p className='nothing'>
                <Link to='/decouverte' className='button button--primary'>Allez-y !</Link>
              </p>
            </div>
          )}
        </div>
        <MenuButton borderTop />
      </div>
    )
  }
}

export default compose(
  withLogin({ isRequired: true }),
  connect(
    (state) => ({
      bookings: selectBookings(state),
    }),
    { requestData }
  )
)(BookingsPage)
