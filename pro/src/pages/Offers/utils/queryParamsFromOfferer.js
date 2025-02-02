export const queryParamsFromOfferer = location => {
  const queryParams = new URLSearchParams(location.search)
  const hasOfferer = queryParams.has('structure')
  const hasVenue = queryParams.has('lieu')
  const hasNumerique = queryParams.has('numerique')
  const hasRequest = queryParams.has('requete')

  return {
    structure: hasOfferer ? queryParams.get('structure') : '',
    lieu: hasVenue ? queryParams.get('lieu') : '',
    numerique: hasNumerique,
    requete: hasRequest ? queryParams.get('requete') : '',
  }
}
