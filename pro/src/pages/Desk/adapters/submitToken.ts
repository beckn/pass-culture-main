import { apiContremarque } from 'apiClient/api'
import { ApiError } from 'apiClient/v2'
import { DeskSubmitResponse, MESSAGE_VARIANT } from 'screens/Desk'

const onSubmitFailure = (error: ApiError): DeskSubmitResponse => ({
  error: {
    message: error.body['global'],
    variant: MESSAGE_VARIANT.ERROR,
  },
})

const submitValidate = (token: string): Promise<DeskSubmitResponse> =>
  apiContremarque
    .patchBookingUseByToken(token)
    .then(() => ({}))
    .catch(onSubmitFailure)

const submitInvalidate = (token: string): Promise<DeskSubmitResponse> =>
  apiContremarque
    .patchBookingKeepByToken(token)
    .then(() => ({}))
    .catch(onSubmitFailure)

export { submitValidate, submitInvalidate }
