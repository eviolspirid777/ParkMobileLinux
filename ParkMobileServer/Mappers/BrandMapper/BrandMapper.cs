using ParkMobileServer.DTO.BrandDTO;
using ParkMobileServer.Entities.Items;

namespace ParkMobileServer.Mappers.BrandMapper
{
	public class BrandMapper
	{
		public  List<BrandDTO> MapToDTO(List<ItemBrand> list)
		{
			var newData = new List<BrandDTO>();
			foreach (var itemBrand in list)
			{
				newData.Add(new BrandDTO() 
				{ 
					Id = itemBrand.Id,
					Name = itemBrand.Name
				});
			}
			return newData;
		}
	}
}
