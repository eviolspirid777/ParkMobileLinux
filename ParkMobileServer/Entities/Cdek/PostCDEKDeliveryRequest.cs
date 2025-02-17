
namespace ParkMobileServer.Entities.Cdek
{
    public class FromLocationClass
    {
        public int Code { get; set; }
        public string City_uuid { get; set; }
        public string City { get; set; }
        public string Fias_guid { get; set; }
        public string Country_code { get; set; }
        public string Country { get; set; }
        public string Region { get; set; }
        public int Region_code { get; set; }
        public string Fias_region_guid { get; set; }
        public string Sub_region { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public string Time_zone { get; set; }
        public int Payment_limit { get; set; }
        public string Address { get; set; }
        public string Postal_code { get; set; }
    }

    public class ToLocationClass
    {
        public int Code { get; set; }
        public string City_uuid { get; set; }
        public string City { get; set; }
        public string Fias_guid { get; set; }
        public string Country_code { get; set; }
        public string Country { get; set; }
        public string Region { get; set; }
        public int Region_code { get; set; }
        public string Fias_region_guid { get; set; }
        public string Sub_region { get; set; }
        public string Longitude { get; set; }
        public string Latitude { get; set; }
        public string Time_zone { get; set; }
        public int Payment_limit { get; set; }
        public string Address { get; set; }
        public string Postal_code { get; set; }
    }

    public class ServicesClass
    {
        public string Code { get; set; }
        public string Parameter { get; set; }
        public class PaymentClass
        {
            public int Value { get; set; }
            public int MyProperty { get; set; }
        }
        public class ItemClass
        {
            public string Name { get; set; }
            public string Ware_key { get; set; }
            public string? Marking { get; set; }
            public DeliveryRecipientCost Payment { get; set; } = new();
            public int Weight { get; set; }
            public int? Weight_gross { get; set; }
            public int Amount { get; set; }
            public string? Name_i18n { get; set; }
            public string? Brand { get; set; }
            public string? Country_code { get; set; }
            public string? Material { get; set; }
            public bool? Wifi_gsm { get; set; }
            public string? Url { get; set; }
            public int? Cost { get; set; }
            public string? Feacn_code { get; set; }
        }
        public class PackageClass
        {
            public string? Number { get; set; }
            public int? Weight { get; set; }
            public int? Length { get; set; }
            public int? Width { get; set; }
            public int? Weight_volume { get; set; }
            public int? Weight_calc { get; set; }
            public int? Height { get; set; }
            public string? Comment { get; set; }
            public string? Package_id { get; set; }
            public List<ItemClass> Items { get; set; } = new();
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
            public int Value { get; set; } //Сумма включая НДС
            public int? Vat_sum { get; set; } //Сумма НДС
            public int? Vat_rate { get; set; }
        }

        public class PhoneClass
        {
            public string Number { get; set; }
            public string? Additional { get; set; }
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
            public List<PhoneClass> Phones { get; set; }

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
            public string? Company { get; set; }
            public string Name { get; set; }
            public string? Contragent_type { get; set; }
            public string? Passport_series { get; set; }
            public string? Passport_number { get; set; }
            public string? Passport_date_of_issue { get; set; }
            public string? Passport_organization { get; set; }
            public string? Tin { get; set; }
            public string? Passport_date_of_birth { get; set; }
            public string? Email { get; set; }
            public List<PhoneClass> Phones { get; set; } = new();
        }
        public class PostCDEKDeliveryRequest
        {
            public int? Type { get; set; }
            public string? Number { get; set; }
            public string? Accompanying_number { get; set; }
            public int Tariff_code { get; set; }
            public string? Comment { get; set; }
            public string? Shipment_point { get; set; }
            public string? Delivery_point { get; set; }
            public string? Date_invoice { get; set; }
            public string? Shipper_name { get; set; }
            public string? Shipper_address { get; set; }
            public DeliveryRecipientCost? Delivery_recipient_cost { get; set; }
            public List<DeliveryRecipientCostAdv>? Delivery_recipient_cost_adv { get; set; }
            public Sender? Sender { get; set; }
            public SellerClass? Seller { get; set; }
            public RecipientClass Recipient { get; set; } = new();
            public FromLocationClass? From_location { get; set; } //Обязателен, если СДЕК будет забирать напрямую из магазина Эмиля
            public List<ServicesClass>? Services { get; set; }
            public ToLocationClass? To_location { get; set; } //Обязатель, если указан заказ до двери
            public List<PackageClass> Packages { get; set; } = new();
            public bool? Is_client_return { get; set; }
            public string? Developer_key { get; set; }
        }
    }
}
