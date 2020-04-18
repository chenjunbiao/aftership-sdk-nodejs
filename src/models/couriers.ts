import { AftershipError } from '../error/error';
import { ErrorEnum } from '../error/error_enum';

/**
 * Courier Object
 */
export interface Courier {
  /**
   * Unique code of courier
   */
  slug: string;

  /**
   * Name of courier
   */
  name: string;

  /**
   * Contact phone number of courier
   */
  phone: string;

  /**
   * Other name of courier
   */
  other_name: string;

  /**
   * Website link of courier
   */
  web_url: string;

  /**
   * The extra fields need for tracking, such as `tracking_account_number`, `tracking_postal_code`,
   *  `tracking_ship_date`, `tracking_key`, `tracking_destination_country`
   */
  required_fields: string[];

  /**
   * the extra fields which are optional for tracking. Basically it's the same as required_fields,
   *  but the difference is that only some of the tracking numbers require these fields.
   */
  optional_fields: string[];

  /**
   * Default language of tracking results
   */
  default_language: string;

  /**
   * Other supported languages
   */
  support_languages: string[];

  /**
   * Country code (ISO Alpha-3) where the courier provides service
   */
  service_from_country_iso3: string[];
}

/**
 * Tracking Object
 */
export interface CourierTracking {
  /**
   * A unique identifier generated by AfterShip for the tracking.
   */
  id: string;

  /**
   * Tracking number.
   */
  tracking_number: string;

  /**
   * The postal code of receiver's address. Required by some couriers, such asdeutsch-post
   */
  tracking_postal_code: string;

  /**
   * Shipping date in YYYYMMDD format. Required by some couriers, such asdeutsch-post
   */
  tracking_ship_date: string;

  /**
   * Key of the shipment for a specific courier. Required by some couriers, such assic-teliway
   */
  tracking_key: string;

  /**
   * Origin Country of the shipment for a specific courier. Required by some couriers, such asdhl
   */
  tracking_origin_country: string;

  /**
   * Destination Country of the shipment for a specific courier. Required by some couriers, such aspostnl-3s
   */
  tracking_destination_country: string;

  /**
   * Located state of the shipment for a specific courier. Required by some couriers, such asstar-track-courier
   */
  tracking_state: string;

  /**
   * Account number of the shipper for a specific courier. Required by some couriers, such asdynamic-logistics
   */
  tracking_account_number: string;

  /**
   * Unique code of courier. Get courier slug here https://docs.aftership.com/api/4/couriers
   */
  slug: string;
}

/**
 * The response of courier list
 */
export interface CourierList {
  /**
   * Total number of couriers supported by AfterShip.
   */
  total: number;

  /**
   * Array of Hash describes the couriers information.
   */
  couriers: Courier[];
}

/**
 * The request object of couriers detect
 */
export class CourierDetectRequest {
  /**
   * Tracking Object.
   */
  public tracking: CourierDetectTracking;

  /**
   * CourierDetectRequest constructor
   * @param tracking tracking object, the tracking_number field is required.
   */
  constructor(tracking: CourierDetectTracking) {
    if (tracking === undefined || tracking.tracking_number === undefined
      || tracking.tracking_number === '') {
      // Verify tracking_number
      throw AftershipError.getSdkError(
        ErrorEnum.constructorInvalidTrackingNumber,
        tracking,
      );
    }

    this.tracking = tracking;
  }
}

/**
 * The tracking object of couriers detect
 */
export interface CourierDetectTracking {
  /**
   * Tracking number. (Required)
   */
  tracking_number: string;

  /**
   * The postal code of receiver's address. Required by some couriers, such asdeutsch-post
   */
  tracking_postal_code: string;

  /**
   * Shipping date in YYYYMMDD format. Required by some couriers, such asdeutsch-post
   */
  tracking_ship_date: string;

  /**
   * Key of the shipment for a specific courier. Required by some couriers, such assic-teliway
   */
  tracking_key: string;

  /**
   * Destination Country of the shipment for a specific courier. Required by some couriers, such aspostnl-3s
   */
  tracking_destination_country: string;

  /**
   * If not specified, Aftership will automatically detect the courier based on the tracking number format
   * and your selected couriers. Use array or comma separated to input a list of couriers for auto detect.
   */
  slug: string | string[];
}

/**
 * The response of couriers detect request
 */
export interface CourierDetectList {
  /**
   * Total number of matched couriers
   */
  total: number;

  /**
   * Hash describes the tracking information.
   */
  tracking: CourierTracking[];

  /**
   * A list of matched couriers based on tracking number format.
   */
  couriers: Courier[];
}