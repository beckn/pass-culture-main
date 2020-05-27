import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Route, Switch } from 'react-router'
import { CATEGORY_CRITERIA, GEOLOCATION_CRITERIA, SORT_CRITERIA } from './Criteria/criteriaEnums'
import { Home } from './Home/Home'
import Results from './Results/Results'
import CriteriaLocation from './CriteriaLocation/CriteriaLocation'
import CriteriaCategory from './CriteriaCategory/CriteriaCategory'
import CriteriaSort from './CriteriaSort/CriteriaSort'
import { buildPlaceLabel } from './CriteriaLocation/utils/buildPlaceLabel'

const DEFAULT_META_VIEWPORT_CONTENT =
  'width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no'

class Search extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      categoryCriterion: CATEGORY_CRITERIA.ALL,
      geolocationCriterion: {
        params: GEOLOCATION_CRITERIA.EVERYWHERE,
        place: null,
        searchAround: {
          everywhere: true,
          place: false,
          user: false,
        },
        userGeolocation: props.geolocation,
      },
      sortCriterion: SORT_CRITERIA.RELEVANCE,
    }
  }

  componentDidMount() {
    this.preventWindowResize()
  }

  componentWillUnmount() {
    this.resetWindowResize()
  }

  preventWindowResize() {
    const pageDefaultHeight = document.querySelector('body').offsetHeight
    window.onresize = () => {
      document
        .querySelector('meta[name=viewport]')
        .setAttribute('content', `height=${pageDefaultHeight}px, ${DEFAULT_META_VIEWPORT_CONTENT}`)
    }
  }

  resetWindowResize() {
    document
      .querySelector('meta[name=viewport]')
      .setAttribute('content', DEFAULT_META_VIEWPORT_CONTENT)
    window.onresize = null
  }

  handleGeolocationCriterionSelection = criterionKey => {
    const {
      geolocationCriterion: { userGeolocation },
    } = this.state
    const label = GEOLOCATION_CRITERIA[criterionKey].label

    this.setState({
      geolocationCriterion: {
        params: GEOLOCATION_CRITERIA[criterionKey],
        place: null,
        searchAround: {
          place: false,
          everywhere: label === GEOLOCATION_CRITERIA.EVERYWHERE.label,
          user: label === GEOLOCATION_CRITERIA.AROUND_ME.label,
        },
        userGeolocation,
      },
    })
    const { redirectToSearchMainPage } = this.props
    redirectToSearchMainPage()
  }

  handleOnPlaceSelection = place => {
    this.setState(prevState => {
      return {
        geolocationCriterion: {
          params: {
            label: buildPlaceLabel(place),
            icon: 'ico-there',
            requiresGeolocation: false,
          },
          place: place,
          searchAround: {
            everywhere: false,
            place: true,
            user: false,
          },
          userGeolocation: prevState.geolocationCriterion.userGeolocation,
        },
      }
    })
  }

  handleCategoryCriterionSelection = criterionKey => () => {
    this.setState({
      categoryCriterion: CATEGORY_CRITERIA[criterionKey],
    })
    const { redirectToSearchMainPage } = this.props
    redirectToSearchMainPage()
  }

  handleSortCriterionSelection = criterionKey => {
    this.setState({
      sortCriterion: SORT_CRITERIA[criterionKey],
    })
    const { redirectToSearchMainPage } = this.props
    redirectToSearchMainPage()
  }

  render() {
    const { history, match, query, redirectToSearchMainPage } = this.props
    const { categoryCriterion, geolocationCriterion, sortCriterion } = this.state
    const { place, userGeolocation } = geolocationCriterion

    return (
      <Switch>
        <Route
          exact
          path="/recherche"
        >
          <Home
            categoryCriterion={categoryCriterion}
            geolocationCriterion={geolocationCriterion}
            history={history}
            sortCriterion={sortCriterion}
            userGeolocation={userGeolocation}
          />
        </Route>
        <Route path="/recherche/resultats">
          <Results
            criteria={{
              categories: categoryCriterion.facetFilter ? [categoryCriterion.facetFilter] : [],
              searchAround: geolocationCriterion.searchAround,
              sortBy: sortCriterion.index,
            }}
            history={history}
            match={match}
            place={place}
            query={query}
            redirectToSearchMainPage={redirectToSearchMainPage}
            search={history.location.search}
            userGeolocation={userGeolocation}
          />
        </Route>
        <Route path="/recherche/criteres-localisation">
          <CriteriaLocation
            activeCriterionLabel={geolocationCriterion.params.label}
            backTo="/recherche"
            criteria={GEOLOCATION_CRITERIA}
            geolocation={userGeolocation}
            history={history}
            match={match}
            onCriterionSelection={this.handleGeolocationCriterionSelection}
            onPlaceSelection={this.handleOnPlaceSelection}
            place={place}
            title="Localisation"
          />
        </Route>
        <Route path="/recherche/criteres-categorie">
          <CriteriaCategory
            activeCriterionLabel={categoryCriterion.label}
            backTo="/recherche"
            criteria={CATEGORY_CRITERIA}
            history={history}
            match={match}
            onCriterionSelection={this.handleCategoryCriterionSelection}
            title="Catégories"
          />
        </Route>
        <Route path="/recherche/criteres-tri">
          <CriteriaSort
            activeCriterionLabel={sortCriterion.label}
            backTo="/recherche"
            criteria={SORT_CRITERIA}
            geolocation={userGeolocation}
            history={history}
            match={match}
            onCriterionSelection={this.handleSortCriterionSelection}
            title="Trier par"
          />
        </Route>
      </Switch>
    )
  }
}

Search.defaultProps = {
  geolocation: {},
}

Search.propTypes = {
  geolocation: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  history: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
  query: PropTypes.shape({
    clear: PropTypes.func,
    change: PropTypes.func,
    parse: PropTypes.func,
  }).isRequired,
  redirectToSearchMainPage: PropTypes.func.isRequired,
}

export default Search
