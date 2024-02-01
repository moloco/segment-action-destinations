import { InputField } from '@segment/actions-core/destination-kit/types'

/* Common Fields
  * The following fields are included for all event types(actions)
  */
export const EVENT_ID: InputField = {
  label: 'Event ID',
  description: 'Unique ID generated by the client to suppress duplicate events. The length should not exceed 128 characters.',
  type: 'string',
  required: false,
  default: {
    '@path': '$.messageId'
  }
}

export const TIMESTAMP: InputField = {
  label: 'Timestamp',
  description: 'Timestamp that the event happened at.',
  type: 'datetime',
  required: true,
  default: {
    '@path': '$.timestamp'
  }
}

export const CHANNEL_TYPE: InputField = {
  label: 'Channel Type',
  description: 'Type of channel, either APP or SITE',
  type: 'string',
  required: true,
  choices: [
    { label: 'App', value: 'APP' },
    { label: 'Site', value: 'SITE' }
  ]
}

export const USER_ID: InputField = {
  label: 'User ID',
  description: 'User Identifier for the platform. Recommended to hash it before sending for anonymization. The length should not exceed 128 characters.',
  type: 'string',
  required: false,
  default: {
    '@path': '$.userId'
  }
}

export const DEVICE: InputField = {
  label: 'Device',
  description: `Device information of the event`,
  type: 'object',
  required: false,
  properties: {
    // TODO: Consider different OS names such as iPadOS
    os: {
      label: 'OS',
      description: 'OS of the device. "ios" or "android" must be included for the APP channel type.',
      type: 'string',
      required: false,
      default: {
        '@path': '$.context.os.name'
      },
    },
    osVersion: {
      label: 'OS Version',
      description: 'Device OS version, which is taken from the device without manipulation or normalization. (e.g., "14.4.1")',
      type: 'string',
      required: false,
      default: {
        '@path': '$.context.os.version'
      },
    },
    advertisingId: {
      label: 'Advertising ID',
      description: 'For app traffic, IDFA of iOS or ADID of android should be filled in this field. (e.g., 7acefbed-d1f6-4e4e-aa26-74e93dd017e4)',
      type: 'string',
      required: false,
      default: {
        '@path': '$.context.device.advertisingId'
      },
    },
    uniqueDeviceId: {
      label: 'Unique Device ID',
      description: `For app traffic, a unique identifier for the device being used should be provided in this field.
  Clients can issue identifiers for their user devices or use their IDFV values if using iOS apps.
  The length of this id should not exceed 128 characters.`,
      type: 'string',
      required: false,
      default: {
        '@path': '$.context.device.id'
      },
    },
    model: {
      label: 'Model',
      description: 'Device model, which is taken from the device without manipulation or normalization. (e.g., "iPhone 11 Pro")',
      type: 'string',
      required: false,
      default: {
        '@path': '$.context.device.model'
      },
    },
    ua: {
      label: 'User Agent',
      description: 'User Agent. (e.g., "Mozilla/5.0 (iPhone; CPU iPhone OS 14_4_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/111FFF")',
      type: 'string',
      required: false,
      default: {
        '@path': '$.context.userAgent'
      },
    },
    // TODO: Could extract from context.locale
    language: {
      label: 'Language',
      description: 'ISO-639-1 alpha-2 language code. (e.g., "en")',
      type: 'string',
      required: false
    },
    ip: {
      label: 'IP Address',
      description: 'IP in IPv4 format. (e.g., 216.212.237.213)',
      type: 'string',
      required: false,
      default: {
        '@path': '$.context.ip'
      },
    }
  }
}

export const SESSION_ID: InputField = {
  label: 'Session ID',
  description: 'Identifier for tracking users regardless of sign-in status. The length should not exceed 128 characters.',
  type: 'string',
  required: false,
  default: {
    '@path': '$.anonymousId'
  }
}

export const DECISION_TRACK_ID: InputField = {
  label: 'Decision Track ID',
  description: `Track ID for the event. Track ID is generated by a call to the Decision API.
  Fill in this field accordingly if the user event is to be associated with a Decision API response.`,
  type: 'string',
  required: false
}

/* Variable Fields
  * The following fields may be included/excluded or have different label/description depending on the event type(action)
  * Due to its variance, each fields are defined as a function that returns InputField
  */
function createMoneyInputField(params: { label: string; description: string; required: boolean; }): InputField {
  const { label, description, required } = params;

  return {
    label,
    description,
    type: 'object',
    required,
    properties: {
      currency: {
        label: 'Currency',
        description: `Currency information. Available options are the followings
  UNKNOWN_CURRENCY: Unknown currency.
  USD: US Dollar.
  KRW: Korean Won.
  JPY: Japanese Yen.
  EUR: EU Euro.
  GBP: British Pound.
  SEK: Swedish Krona.
  INR: India Rupee.
  THB: Thailand Baht.
  IDR: Indonesia Rupiah.
  CNY: China Yuan.
  CAD: Canada Dollar.
  RUB: Russia Ruble.
  BRL: Brazil Real.
  SGD: Singapore Dollar.
  HKD: Hong Kong Dollar.
  AUD: Autrailia Dollar.
  PLN: Poland Zloty.
  DKK: Denmark Krone.
  VND: Viet Nam Dong.
  MYR: Malaysia Ringgit.
  PHP: Philippines Peso.
  TRY: Turkey Lira.
  VEF: Venezuela Bolívar.

  Default: UNKNOWN_CURRENCY`,
        type: 'string',
        required: true,
        default: 'UNKNOWN_CURRENCY'
      },
      amount: {
        label: 'Amount',
        description: 'Amount of money. (e.g., 12.34 for $12.34 if currency is "USD")',
        type: 'number',
        required: true
      },
    }
  }
}


export function createItemsInputField(required: boolean): InputField {
  return {
    label: 'Items',
    description: 'Item information list related to the event.',
    type: 'object',
    required: required,
    multiple: true,
    properties: {
      id: {
        label: 'ID',
        description: 'Unique identifier of the Item.',
        type: 'string',
        required: true
      },
      price: createMoneyInputField({ label: 'Price', description: 'Price information of the item', required: false }),
      quantity: {
        label: 'Quantity',
        description: 'Quantity of the item. Recommended.',
        type: 'number',
        required: false
      },
      itemGroupId: {
        label: 'Item Group ID',
        description: 'Unique identifier of the Item Group.',
        type: 'string',
        required: false
      },
      sellerId: {
        label: 'Seller ID',
        description: 'Unique identifier of the Seller.',
        type: 'string',
        required: false
      }
    }
  }
}

export function createRevenueInputField(required: boolean): InputField {
  return createMoneyInputField({ label: 'Revenue', description: 'Revenue of the event', required: required })
}

export function createSearchQueryInputField(required: boolean): InputField {
  return {
    label: 'Search Query',
    description: 'Query string for the search.',
    type: 'string',
    required: required
  }
}

export function createPageIdInputField(required: boolean): InputField {
  return {
    label: 'Page ID',
    description: `A string that can identify a context of the event,
  such as "electronics", "categories/12312", "azd911d" or "/classes/foo/lectures/bar.
  Any value is acceptable if it helps identifying unique pages.`,
    type: 'string',
    required: required,
    default: {
      '@path': '$.context.page.path'
    }
  }
}

export function createReferrerPageIdInputField(required: boolean): InputField {
  return {
    label: 'Referrer Page ID',
    description: `Similar to referrer in HTTP, this value indicates from which page the user came to the current page.`,
    type: 'string',
    required: required,
    default: {
      '@path': '$.context.page.referrer'
    }
  }
}

export function createShippingChargeInputField(required: boolean): InputField {
  return createMoneyInputField({ label: 'Shipping Charge', description: 'Shipping charge’s monetary amount in a specific currency.', required: required })
}
