using ParkMobileServer.DTO.GetItemDTO;
using ParkMobileServer.DTO.ItemDTO;

namespace ParkMobileServer.Services
{
    public interface IItemService
    {
        Task<IEnumerable<ItemDTO>> GetFilteredItemsAsync(SearchCategoryItemRequest request);
        Task<IEnumerable<ItemDTO>> GetItemsByNameAsync(GetSearchItemRequest request);
        Task<IEnumerable<PopularItemDTO>> GetPopularItemsAsync();
        Task<IEnumerable<ItemDTO>> GetNewItemsAsync(GetItemDTO request);
        Task<IEnumerable<ItemDTO>> GetItemsForAdminAsync(int skip, int take, string name);
        Task<ItemDTO> CreateItemAsync(ItemDTO itemDto);
        Task<ItemDTO> UpdateItemAsync(int id, ItemDTO itemDto);
        Task DeleteItemAsync(int id);
        Task<bool> ToggleItemVisibilityAsync(int id);
        Task<bool> ToggleItemPopularityAsync(int id);
    }
} 