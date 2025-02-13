export const enum deliveryTypes {
  "internet-shop" = 1,
  "delivery" = 2,
}

export type SdekAutorizeResponse = {
  access_token: string,
  token_type: string,
  expires_in: number,
  scope: string,
  jti: string
}

export type PostCDEKDeliveryPriceType = {
  date?: string,
  type?: deliveryTypes,
  additional_order_types?: number[],
  currency?: number,
  lang?: "rus" | "eng" | "zho",
  from_location: {
    code?: number,
    postal_code?: string,
    country_code?: string,
    city?: string,
    address?: string,
    contragent_type?: string
  },
  to_location: {
    code?: number,
    postal_code?: string,
    country_code?: string,
    city?: string,
    address?: string,
    contragent_type?: string
  },
  packages: {
    weight: number,
    length?: number,
    width?: number,
    height?: number,
  }[]
}

export type PostCDEKDeliveryTariffType = {
  date?: string,
  type?: deliveryTypes,
  additional_order_types?: number[],
  currency?: number,
  lang?: "rus" | "eng" | "zho",
  tariff_code: number,
  from_location: {
    code?: number,
    postal_code?: string,
    country_code?: string,
    city?: string,
    address?: string,
    contragent_type?: string
  },
  to_location: {
    code?: number,
    postal_code?: string,
    country_code?: string,
    city?: string,
    address?: string,
    contragent_type?: string
  },
  services: {
    code: string,
    parameter: string
  }[],
  packages: {
    weight: number,
    length?: number,
    width?: number,
    height?: number,
  }[]
}

export type GetAdressesCDEKParams = {
  code?: string,
  type?: string,
  postal_code?: string,
  city_code?: number,
  country_code?: string,
  region_code?: number,
  have_cashless?: boolean,
  have_cash?: boolean,
  allowed_cod?: boolean,
  is_dressing_room?: boolean,
  weight_max?: number,
  weight_min?: number,
  lang?: string,
  take_only?: boolean,
  is_handout?: boolean,
  is_reception?: boolean,
  is_marketplace?: boolean,
  is_ltl?: boolean,
  fulfillment?: boolean,
  fias_guid?: string,
  size?: string,
  page?: string
}

export type GetCDEKInformationByImType = {
  cdek_number: number,
  im_number: string
}

export type SdekPostTypeBase = {
  uuid: string,
  type?: deliveryTypes,
  number?: string,
  accompanying_number?: string,
  tariff_code: number,
  comment?: string,
  shipment_point?: string,
  delivery_point?: string,
  date_invoice?: string,
  shipper_name?: string,
  shipper_address?: string,
  delivery_recipient_cost: {
    value: number,
    vat_sum?: number,
    vat_rate?: number
  },
  delivery_recipient_cost_adv: {
    threshold?: number,
    sum?: number,
    vat_sum?: number,
    vat_rate?: number
  }[],
  sender?: {
    company?: string,
    name: string,
    contragent_type?: "LEGAL_ENTITY" | "INDIVIDUAL",
    passport_series?: string,
    passport_number?: string,
    passport_date_of_issue?: string,
    passport_organization?: string,
    tin?: string,
    passport_date_of_birth?: string,
    email?: string,
    phones?: {
      number: string,
      additional?: string,
    }[],
  },
  seller?: {
    name?: string,
    inn?: string,
    phone?: string,
    ownership_form?: string,
    address?: string
  },
  recipient: {
    company?: string,
    name: string,
    contragent_type?: "LEGAL_ENTITY" | "INDIVIDUAL",
    passport_series?: string,
    passport_number?: string,
    passport_date_of_issue?: string,
    passport_organization?: string,
    tin?: string,
    passport_date_of_birth?: string,
    email?: string,
    phones?: {
      number: string,
      additional?: string,
    }[]
  },
  from_location?: {
    code?: number,
    city_uuid?: string,
    city?: string,
    fias_guid?: string,
    country_code?: string,
    country?: string,
    region?: string,
    region_code?: number,
    fias_region_guid?: string,
    sub_region?: string,
    longitude?: string,
    latitude?: string,
    time_zone?: string,
    payment_limit?: number,
    address: string,
    postal_code?: string
  },
  to_location: {
    code?: number,
    city_uuid?: string,
    city?: string,
    fias_guid?: string,
    country_code?: string,
    country?: string,
    region?: string,
    region_code?: number,
    fias_region_guid?: string,
    sub_region?: string,
    longitude?: string,
    latitude?: string,
    time_zone?: string,
    payment_limit?: number,
    address: string,
    postal_code?: string,
    services: {
      code?: string,
      parameter?: string,
    }[],
    packagaes: {
      number?: string,
      weight?: number,
      length?: number,
      width?: number,
      weight_volume?: number,
      weight_calc?: number,
      height?: number,
      comment?: string,
      package_id?: string,
      items: {
        name?: string,
        ware_key?: string,
        marking?: string,
        payment: {
          value: number,
          vat_sum?: number,
          vat_rate?: number,
        },
        weight?: number,
        weight_gross?: number,
        amount?: number,
        name_i18n?: string,
        brand?: string,
        country_code?: string,
        material?: string,
        wifi_gsm?: boolean,
        url?: string,
        cost?: number,
        feacn_code?: string,
      }
    },
    is_client_return?: boolean,
    developer_key?: string,
  }
}