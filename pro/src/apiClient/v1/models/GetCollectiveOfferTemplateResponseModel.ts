/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CollectiveOfferOfferVenueResponseModel } from './CollectiveOfferOfferVenueResponseModel';
import type { GetCollectiveOfferVenueResponseModel } from './GetCollectiveOfferVenueResponseModel';
import type { OfferDomain } from './OfferDomain';
import type { OfferStatus } from './OfferStatus';
import type { StudentLevels } from './StudentLevels';
import type { SubcategoryIdEnum } from './SubcategoryIdEnum';

export type GetCollectiveOfferTemplateResponseModel = {
  audioDisabilityCompliant?: boolean | null;
  bookingEmails: Array<string>;
  contactEmail: string;
  contactPhone?: string | null;
  dateCreated: string;
  description: string;
  domains: Array<OfferDomain>;
  durationMinutes?: number | null;
  educationalPriceDetail?: string | null;
  hasBookingLimitDatetimesPassed: boolean;
  id: number;
  imageCredit?: string | null;
  imageUrl?: string | null;
  interventionArea: Array<string>;
  isActive: boolean;
  isCancellable: boolean;
  isEditable: boolean;
  mentalDisabilityCompliant?: boolean | null;
  motorDisabilityCompliant?: boolean | null;
  name: string;
  offerId?: number | null;
  offerVenue: CollectiveOfferOfferVenueResponseModel;
  status: OfferStatus;
  students: Array<StudentLevels>;
  subcategoryId: SubcategoryIdEnum;
  venue: GetCollectiveOfferVenueResponseModel;
  visualDisabilityCompliant?: boolean | null;
};

