using ParkMobileServer.DTO.CategoryDTO;
using ParkMobileServer.Entities.Items;

namespace ParkMobileServer.Mappers.CategoryMapper
{
	public class CategoryMapper
	{
		public List<CategoryDTO> MapToDTO(List<ItemCategory> list)
		{
			var newData = new List<CategoryDTO>();
			foreach (var itemBrand in list)
			{
				newData.Add(new CategoryDTO()
				{
					Id = itemBrand.Id,
					Name = itemBrand.Name
				});
			}
			return newData;
		}
	}
}
