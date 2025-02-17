export enum deliveryTypes {
  InternetShop = 1,
  Delivery = 2,
}

export enum Tariffs_SDEK {
  StorageToStorage = 136,
  DoorToStorage = 138,
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

export type GetLocationsCDEKResponse = {
  city_uuid: string,
  code: number,
  full_name: string,
}

export type CdekPointType = {
  originalEvent: {
    target: {
      geometry: {
        _coordinates: number[]
      }
    }
  }
}

export type GetAdressesCDEKResponse = {
  address_comment: string,
  allowed_cod: boolean,
  code: string,
  dimensions: {
    depth: number,
    width: number,
    height: number,
  }[],
  fulfillment: boolean,
  have_cash: boolean,
  have_cashless: boolean,
  have_fast_payment_system: boolean,
  is_dressing_room: boolean,
  is_handout: boolean,
  is_ltl: boolean,
  is_reception: boolean,
  location: {
    address: string,
    address_full: string,
    city: string,
    city_code: number,
    city_uuid: string,
    country_code: string,
    fias_guid: string,
    latitude: number,
    longitude: number,
    postal_code: string,
    region: string,
    region_code: number
  },
  name: string,
  nearest_station: string,
  note: string,
  owner_code: string,
  phones: {
    number: string
  }[],
  take_only: boolean,
  type: string,
  uuid: string,
  weight_max: number,
  weight_min: number,
  work_time: string,
  work_time_list: {
    day: number,
    time: string
  }[]
}

export type GetAdressesCDEKParams = {
  code?: string,
  type?: string,
  PostalCode?: string,
  CityCode?: number,
  CountryCode?: string,
  RegionCode?: number,
  HaveCashless?: boolean,
  HaveCash?: boolean,
  AllowedCod?: boolean,
  IsDressingRoom?: boolean,
  WeightMax?: number,
  WeightMin?: number,
  Lang?: string,
  TakeOnly?: boolean,
  IsHandout?: boolean,
  IsReception?: boolean,
  IsMarketplace?: boolean,
  IsLtl?: boolean,
  Fulfillment?: boolean,
  FiasGuid?: string,
  Size?: string,
  Page?: string
}

export type GetCDEKInformationByImType = {
  cdek_number: number,
  im_number: string
}

export type ItemType = {
  name: string,
  ware_key: string,
  marking?: string,
  payment: {
    value: number,
    vat_sum?: number,
    vat_rate?: number,
  },
  weight: number,
  weight_gross?: number,
  amount: number,
  name_i18n?: string,
  brand?: string,
  country_code?: string,
  material?: string,
  wifi_gsm?: boolean,
  url?: string,
  cost: number,
  feacn_code?: string,
}

export type SdekPostTypeBase = {
  type?: deliveryTypes,
  number?: string,
  accompanying_number?: string,
  tariff_code: Tariffs_SDEK.DoorToStorage | Tariffs_SDEK.StorageToStorage,
  comment?: string,
  shipment_point?: string,
  delivery_point: string | null,
  date_invoice?: string,
  shipper_name?: string,
  shipper_address?: string,
  delivery_recipient_cost?: {
    value: number,
    vat_sum?: number,
    vat_rate?: number
  },
  delivery_recipient_cost_adv?: {
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
    phones: {
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
    phones: {
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
  to_location?: {
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
    is_client_return?: boolean,
    developer_key?: string,
  }
  services?: {
    code?: string,
    parameter?: string,
  }[],
  packages?: {
    number: string,
    weight: number,
    length: number,
    width: number,
    weight_volume?: number,
    weight_calc?: number,
    height?: number,
    comment?: string,
    package_id?: string,
    items: ItemType[]
  }[],
}