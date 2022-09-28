import { api } from 'apiClient/api'
import { CollectiveOffer } from 'core/OfferEducational'

export type PatchEducationalInstitutionAdapter = Adapter<
  {
    offerId: string
    institutionId: string | null
    isCreatingOffer: boolean
  },
  CollectiveOffer,
  null
>

export const patchEducationalInstitutionAdapter: PatchEducationalInstitutionAdapter =
  async ({ offerId, institutionId, isCreatingOffer }) => {
    try {
      const collectiveOffer =
        await api.patchCollectiveOffersEducationalInstitution(offerId, {
          // @ts-expect-error string is not assignable to type number
          educationalInstitutionId: institutionId,
          isCreatingOffer,
        })

      return {
        isOk: true,
        message:
          'Les paramètres de visibilité de votre offre ont bien été enregistrés',
        payload: { ...collectiveOffer, isTemplate: false },
      }
    } catch (e) {
      return {
        isOk: false,
        message:
          'Les paramètres de visibilité de votre offre n’ont pu être enregistrés',
        payload: null,
      }
    }
  }

export default patchEducationalInstitutionAdapter
