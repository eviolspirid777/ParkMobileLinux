
namespace ParkMobileServer.Entities.Cdek
{
    public class PostCDEKDeliveryRequest
    {
        public string? Uuid { get; set; }
        public int? type { get; set; }
        public string Number { get; set; }
        public string Accompanying_number { get; set; }
        public int Tariff_code { get; set; }
        public string Comment { get; set; }
        public string Shipment_point { get; set; }
        public string delivery_point { get; set; }
        public string date_invoice { get; set; }
        public string shipper_name { get; set; }
        public string shipper_address { get; set; }
        public DeliveryRecipientCost Delivery_recipient_cost { get; set; }
        public List<DeliveryRecipientCostAdv> Delivery_recipient_cost_adv { get; set; }
        public Sender Sender { get; set; }
        public SellerClass Seller { get; set; }
        public RecipientClass Recipient { get; set; }

        //  from_location ?: {
        //    code ?: number,
        //    city_uuid ?: string,
        //    city ?: string,
        //    fias_guid ?: string,
        //    country_code ?: string,
        //    country ?: string,
        //    region ?: string,
        //    region_code ?: number,
        //    fias_region_guid ?: string,
        //    sub_region ?: string,
        //    longitude ?: string,
        //    latitude ?: string,
        //    time_zone ?: string,
        //    payment_limit ?: number,
        //    address: string,
        //    postal_code?: string
        //  },
        //  to_location:
        //{
        //    code ?: number,
        //    city_uuid ?: string,
        //    city ?: string,
        //    fias_guid ?: string,
        //    country_code ?: string,
        //    country ?: string,
        //    region ?: string,
        //    region_code ?: number,
        //    fias_region_guid ?: string,
        //    sub_region ?: string,
        //    longitude ?: string,
        //    latitude ?: string,
        //    time_zone ?: string,
        //    payment_limit ?: number,
        //    address: string,
        //    postal_code?: string,
        //    services: {
        //        code ?: string,
        //      parameter ?: string,
        //    }
        //    [],
        //    packagaes:
        //    {
        //        number ?: string,
        //      weight ?: number,
        //      length ?: number,
        //      width ?: number,
        //      weight_volume ?: number,
        //      weight_calc ?: number,
        //      height ?: number,
        //      comment ?: string,
        //      package_id ?: string,
        //      items:
        //        {
        //            name ?: string,
        //        ware_key ?: string,
        //        marking ?: string,
        //        payment:
        //            {
        //            value: number,
        //          vat_sum ?: number,
        //          vat_rate ?: number,
        //        },
        //        weight ?: number,
        //        weight_gross ?: number,
        //        amount ?: number,
        //        name_i18n ?: string,
        //        brand ?: string,
        //        country_code ?: string,
        //        material ?: string,
        //        wifi_gsm ?: boolean,
        //        url ?: string,
        //        cost ?: number,
        //        feacn_code ?: string,
        //      }
        //    },
        //    is_client_return ?: boolean,
        //    developer_key ?: string,
        //  }
    }
    public class DeliveryRecipientCostAdv
    {
        public int Threshold { get; set; }
        public int Sum { get; set; }
        public int Vat_sum { get; set; }
        public int Vat_rate { get; set; }
    }
    public class DeliveryRecipientCost
    {
        public int Value { get; set; }
        public int Vat_sum { get; set; }
        public int Vat_rate { get; set; }
    }

    public class PhoneClass
    {
        public string Number { get; set; }
        public string Additional { get; set; }
    }

    public class Sender
    {
        public string Company { get; set; }
        public string Name { get; set; }
        public string Contragent_type { get; set; }
        public string Passport_series { get; set; }
        public string Passport_number { get; set; }
        public string Passport_date_of_issue { get; set; }
        public string Passport_organization { get; set; }
        public string Tin { get; set; }
        public string Passport_date_of_birth { get; set; }
        public string Email { get; set; }
        public List <PhoneClass >Phones { get; set; }

    }
    public class SellerClass
    {
        public string Name { get; set; }
        public string Inn { get; set; }
        public string Phone { get; set; }
        public string Ownership_form { get; set; }
        public string Address { get; set; }
    }
    public class RecipientClass
    {
        public string Company { get; set; }
        public string Name { get; set; }
        public string Contragent_type { get; set; }
        public string Passport_series { get; set; }
        public string Passport_number { get; set; }
        public string Passport_date_of_issue { get; set; }
        public string Passport_organization { get; set; }
        public string Tin { get; set; }
        public string Passport_date_of_birth { get; set; }
        public string Email { get; set; }
        public List<PhoneClass> Phones { get; set; }
    }

}
