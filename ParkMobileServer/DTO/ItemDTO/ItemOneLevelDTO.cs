﻿namespace ParkMobileServer.DTO.ItemDTO
{
    public class ItemOneLevelDTO
    {
        public int? id { get; set; } = 0;
        public string Name { get; set; }
        public string Price { get; set; }
        public string DiscountPrice { get; set; }
        public byte[]? Image { get; set; }
        public int Stock { get; set; }
        public string? Options { get; set; }
        public bool IsPopular { get; set; } = false;
        public bool IsNewItem { get; set; } = false;
        public bool IsInvisible { get; set; } = false;

        public int CategoryId { get; set; }
        public int BrandId { get; set; }

        public string? Description { get; set; }
        public string? Article { get; set; }
    }
}