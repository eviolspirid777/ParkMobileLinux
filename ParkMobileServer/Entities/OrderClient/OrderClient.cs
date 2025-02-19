using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ParkMobileServer.Entities.Orders
{
    public class OrderClient
    {
        [Key]
        public int Id {get;set;}
        public string? ClientName {get;set;} = string.Empty;
        public string? Telephone {get; set;} = string.Empty;
        public string? Email {get;set;} = string.Empty;
        public string? Comment {get;set;}


        public int OrderId {get;set;}
        public Order? Order {get;set;}
    }
}