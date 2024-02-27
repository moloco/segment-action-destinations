// Generated file. DO NOT MODIFY IT BY HAND.

export interface Payload {
  /**
   * Unique ID generated by the client to suppress duplicate events. The length should not exceed 128 characters.
   */
  eventId?: string
  /**
   * Timestamp that the event happened at.
   */
  timestamp: string | number
  /**
   * Type of channel, either APP or SITE
   */
  channelType: string
  /**
   * User Identifier for the platform. Recommended to hash it before sending for anonymization. The length should not exceed 128 characters.
   */
  userId?: string
  /**
   * Device information of the event
   */
  device?: {
    /**
     * OS of the device. "ios" or "android" must be included for the APP channel type.
     */
    os?: string
    /**
     * Device OS version, which is taken from the device without manipulation or normalization. (e.g., "14.4.1")
     */
    osVersion?: string
    /**
     * For app traffic, IDFA of iOS or ADID of android should be filled in this field. (e.g., 7acefbed-d1f6-4e4e-aa26-74e93dd017e4)
     */
    advertisingId?: string
    /**
     * For app traffic, a unique identifier for the device being used should be provided in this field.
     *   Clients can issue identifiers for their user devices or use their IDFV values if using iOS apps.
     *   The length of this id should not exceed 128 characters.
     */
    uniqueDeviceId?: string
    /**
     * Device model, which is taken from the device without manipulation or normalization. (e.g., "iPhone 11 Pro")
     */
    model?: string
    /**
     * User Agent. (e.g., "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/111FFF")
     */
    ua?: string
    /**
     * ISO-639-1 alpha-2 language code. (e.g., "en")
     */
    language?: string
    /**
     * IP in IPv4 format. (e.g., 216.212.237.213)
     */
    ip?: string
  }
  /**
   * Identifier for tracking users regardless of sign-in status. The length should not exceed 128 characters.
   */
  sessionId?: string
  /**
   * Track ID for the event. Track ID is generated by a call to the Decision API.
   *   Fill in this field accordingly if the user event is to be associated with a Decision API response.
   */
  decisionTrackId?: string
  /**
   * The default currency value. If this is set, it will be used as a default currency value for items.
   *   Available options are the followings
   *   UNKNOWN_CURRENCY: Unknown currency.
   *   USD: US Dollar.
   *   KRW: Korean Won.
   *   JPY: Japanese Yen.
   *   EUR: EU Euro.
   *   GBP: British Pound.
   *   SEK: Swedish Krona.
   *   INR: India Rupee.
   *   THB: Thailand Baht.
   *   IDR: Indonesia Rupiah.
   *   CNY: China Yuan.
   *   CAD: Canada Dollar.
   *   RUB: Russia Ruble.
   *   BRL: Brazil Real.
   *   SGD: Singapore Dollar.
   *   HKD: Hong Kong Dollar.
   *   AUD: Autrailia Dollar.
   *   PLN: Poland Zloty.
   *   DKK: Denmark Krone.
   *   VND: Viet Nam Dong.
   *   MYR: Malaysia Ringgit.
   *   PHP: Philippines Peso.
   *   TRY: Turkey Lira.
   *   VEF: Venezuela Bolívar.
   */
  defaultCurrency?: string
  /**
   * Item information list related to the event.
   */
  items?: {
    /**
     * Unique identifier of the Item.
     */
    id: string
    price?: number
    currency?: string
    /**
     * Quantity of the item. Recommended.
     */
    quantity?: number
    /**
     * Unique identifier of the Item Group.
     */
    itemGroupId?: string
    /**
     * Unique identifier of the Seller.
     */
    sellerId?: string
  }[]
  /**
   * Revenue of the event
   */
  revenue?: {
    price: number
    currency: string
  }
  /**
   * A string that can identify a context of the event,
   *   such as "electronics", "categories/12312", "azd911d" or "/classes/foo/lectures/bar.
   *   Any value is acceptable if it helps identifying unique pages.
   */
  pageId?: string
  /**
   * Similar to referrer in HTTP, this value indicates from which page the user came to the current page.
   */
  referrerPageId?: string
}
