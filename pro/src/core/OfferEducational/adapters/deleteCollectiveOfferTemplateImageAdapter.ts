import { api } from 'apiClient/api'

type PayloadFailure = null
type DeleteCollectiveOfferImageAdapter = Adapter<number, null, PayloadFailure>

const FAILING_RESPONSE: AdapterFailure<PayloadFailure> = {
  isOk: false,
  message:
    'Une erreur est survenue lors de la suppression de l’image de l’offre',
  payload: null,
}

const deleteCollectiveOfferTemplateImageAdapter: DeleteCollectiveOfferImageAdapter =
  async offerId => {
    try {
      await api.deleteOfferTemplateImage(offerId)

      return {
        isOk: true,
        message: '',
        payload: null,
      }
    } catch (error) {
      return FAILING_RESPONSE
    }
  }

export default deleteCollectiveOfferTemplateImageAdapter
