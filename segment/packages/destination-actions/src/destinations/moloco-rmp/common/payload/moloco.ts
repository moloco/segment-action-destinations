// This is a generalization of a payload to be delivered to the Moloco RMP API.
// ./segment/payload should be converted into this interface after converting through ../body-builder/buildBody
export type EventPayload = {
  /**
   * Event Type. Available options are the followings
   *  SEARCH:	Represents a user searching for an item
   *  ITEM_PAGE_VIEW: Represents a user viewing an item page
   *  ADD_TO_CART: Represents a user adding an item to his cart
   *  PURCHASE:	Represents a user purchasing an item
   *  ADD_TO_WHISHLIST: Represents a user adding an item to his wishlist
   *  HOME: Represents a user visiting a home page
   *  LAND: Represents a user visiting the client’s website from an external source (ex. Google Shopping)
   * 	PAGE_VIEW: Represents a user viewing a certain page that is pertinent to sequence-based ML model training (Ex. a user browsing sneakers)
   */
  event_type: string
	/**
	 * Unique ID generated by the client to suppress duplicate events. The length should not exceed 128 characters.
	 */
	event_id?: string
	/**
	 * Timestamp that the event happened at.
	 */
	timestamp: string | number
	/**
	 * Type of channel, either APP or SITE
	 */
	channel_type: string
	/**
	 * User Identifier for the platform. Recommended to hash it before sending for anonymization. The length should not exceed 128 characters.
	 */
	user_id?: string
	/**
	 * Device information of the event
	 */
	device?: DevicePayload
	/**
	 * Identifier for tracking users regardless of sign-in status. The length should not exceed 128 characters.
	 */
	session_id?: string
	/**
	 * Track ID for the event. Track ID is generated by a call to the Decision API.
	 *   Fill in this field accordingly if the user event is to be associated with a Decision API response.
	 */
	decision_track_id?: string
	/**
	 * Item information list related to the event.
	 */
	items?: ItemPayload[]
	/**
	 * Revenue of the event
	 */
	revenue?: MoneyPayload
	/**
	 * Query string for the search.
	 */
	search_query?: string
	/**
	 * A string that can identify a context of the event,
	 *     such as "electronics", "categories/12312", "azd911d" or "/classes/foo/lectures/bar.
	 *     Any value is acceptable if it helps identifying unique pages.
	 */
	page_id?: string
	/**
	 * Similar to referer in HTTP, this value indicates from which page the user came to the current page.
	 */
	referrer_page_id?: string
	/**
	 * Shipping charge’s monetary amount in a specific currency.
	 */
	shipping_charge?: MoneyPayload
}


// Generalized payload to be passed to Moloco RMP API
// after ./segement/ItemPayload going through the conversion logic
export type ItemPayload = {
	/**
	 * Unique identifier of the Item.
	 */
	id: string
	/**
	 * Price information of the item
	 */
	price?: MoneyPayload
	/**
	 * Quantity of the item. Recommended.
	 */
	quantity?: number
	/**
	 * Unique identifier of the Item Group.
	 */
	item_group_id?: string
	/**
	 * Unique identifier of the Seller.
	 */
	seller_id?: string
}

// Generalized payload to be passed to Moloco RMP API
// after ./segement/MoneyPayload going through the conversion logic
export interface MoneyPayload {
	/**
	 * Currency information. Available options are the followings
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
	 *
	 *   Default: UNKNOWN_CURRENCY
	 */
	currency: string
	/**
	 * Amount of money. (e.g., 12.34 for $12.34 if currency is "USD")
	 */
	amount: number
}

// Generalized payload to be passed to Moloco RMP API
// after ./segement/DevicePayload going through the conversion logic
export interface DevicePayload {
	/**
	 * OS of the device. "ios" or "android" must be included for the APP channel type.
	 */
	os?: string
	/**
	 * Device OS version, which is taken from the device without manipulation or normalization. (e.g., "14.4.1")
	 */
	os_version?: string
	/**
	 * For app traffic, IDFA of iOS or ADID of android should be filled in this field. (e.g., 7acefbed-d1f6-4e4e-aa26-74e93dd017e4)
	 */
	advertising_id?: string
	/**
	 * For app traffic, a unique identifier for the device being used should be provided in this field.
	 * Clients can issue identifiers for their user devices or use their IDFV values if using iOS apps.
	 * The length of this id should not exceed 128 characters.
	 */
	unique_device_id?: string
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
