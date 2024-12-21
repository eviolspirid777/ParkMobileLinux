using System.ComponentModel.DataAnnotations;

namespace ParkMobileServer.Entities.Users
{
	public class User
	{
		[Key]
		public int Id { get; set; }
		public string Username { get; set; }
		public string PasswordHash { get; set; }
	}
}
