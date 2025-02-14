namespace ParkMobileServer.Entities.Cdek
{
    public class AdressesRequestQueryParams
    {
            public string? Code { get; set; }
            public string? Type { get; set; }
            public string? PostalCode { get; set; }
            public int? CityCode { get; set; }
            public string? CountryCode { get; set; }
            public int? RegionCode { get; set; }
            public bool? HaveCashless { get; set; }
            public bool? HaveCash { get; set; }
            public bool? AllowedCod { get; set; }
            public bool? IsDressingRoom { get; set; }
            public int? WeightMax { get; set; }
            public int? WeightMin { get; set; }
            public string? Lang { get; set; }
            public bool? TakeOnly { get; set; }
            public bool? IsHandout { get; set; }
            public bool? IsReception { get; set; }
            public bool? IsMarketplace { get; set; }
            public bool? IsLtl { get; set; }
            public bool? Fulfillment { get; set; }
            public string? FiasGuid { get; set; }
            public string? Size { get; set; }
            public int? Page { get; set; }
    }
}
