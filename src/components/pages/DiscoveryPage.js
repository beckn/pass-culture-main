import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { compose } from 'redux'

import Deck from '../Deck'
import PageWrapper from '../layout/PageWrapper'
import withLogin from '../hocs/withLogin'
import { requestData } from '../../reducers/data'
import selectCurrentRecommendation from '../../selectors/currentRecommendation'
import { getDiscoveryPath } from '../../utils/routes'

class DiscoveryPage extends Component {
  ensureRecommendation(props) {
    const { currentRecommendation, occasionId, mediationId, requestData } = props
    if (!currentRecommendation) {
        let query = 'occasionType=event'
        if (mediationId) {
          query += '&mediationId='+mediationId
        }
        query += '&occasionId='+occasionId
        requestData('PUT', 'recommendations?'+query)
    }
  }

  handleRedirectFromLoading(props) {
    const { history, mediationId, offerId, recommendations } = props
    if (!recommendations || (recommendations.length == 0) || mediationId || offerId)
      return

    const targetRecommendation = recommendations[0]
    console.log("TARGET RECO", targetRecommendation)
    // NOW CHOOSE AN OFFER AMONG THE ONES
    const recommendationOffers = targetRecommendation.recommendationOffers
    const chosenOffer =
      recommendationOffers &&
      recommendationOffers[
        Math.floor(Math.random() * recommendationOffers.length)
      ]

    // PUSH
    const path = getDiscoveryPath(chosenOffer, targetRecommendation.mediation)
    history.push(path)
  }

  componentWillMount() {
    const { offerId } = this.props
    this.handleRedirectFromLoading(this.props)
    offerId && this.ensureRecommendation(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.handleRedirectFromLoading(nextProps)
    if (nextProps.offerId && nextProps.offerId !== this.props.offerId) {
      this.ensureRecommendation(nextProps)
    }
  }

  render() {
    return (
      <PageWrapper
        name="discovery"
        noPadding
        menuButton={{ borderTop: true }}
        backButton={this.props.backButton ? { className: 'discovery' } : null}
      >
        <Deck />
      </PageWrapper>
    )
  }
}

export default compose(
  withLogin({ isRequired: true }),
  withRouter,
  connect(state => ({
    backButton: state.router.location.search.indexOf('to=verso') > -1,
    currentRecommendation: selectCurrentRecommendation(state),
    occasionId: state.router.location.hash && state.router.location.hash.substr(1),
    recommendations: state.data.recommendations,
  }), { requestData })
)(DiscoveryPage)
