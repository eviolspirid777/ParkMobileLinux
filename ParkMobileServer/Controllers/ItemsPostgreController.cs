using System.Xml.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkMobileServer.DbContext;
using ParkMobileServer.DTO.ItemDTO;
using ParkMobileServer.Entities;
using ParkMobileServer.Entities.Items;
using ParkMobileServer.Entities.OrderItem;
using ParkMobileServer.Entities.Orders;
using ParkMobileServer.Entities.OrderTelegram;
using ParkMobileServer.Entities.Repair;
using ParkMobileServer.Entities.TradeIn;
using ParkMobileServer.Mappers.BrandMapper;
using ParkMobileServer.Mappers.CategoryMapper;
using ParkMobileServer.Mappers.ItemsMapper;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;
using ParkMobileServer.DTO.FilterDTO;
using ParkMobileServer.Entities.Filters;
using ParkMobileServer.DTO.GetItemDTO;
using ParkMobileServer.Functions;
using ParkMobileServer.Helpers;

namespace ParkMobileServer.Controllers
{
    [ApiController]
	[Route("api/[controller]")]
	public class ItemsPostgreController : Controller
	{
		public static DistributedCacheEntryOptions _cacheOptions = new ()
		{
			AbsoluteExpirationRelativeToNow = TimeSpan.FromDays(1)
		};

		private readonly PostgreSQLDbContext _postgreSQLDbContext;
		private readonly TelegramBot.TelegramBot _telegramBot;
        private readonly IDistributedCache _cache;
        private readonly ILogger<ItemsPostgreController> _logger;
        private readonly GetItems _getItemsService;
		private readonly CreateItems _itemService;

        public ItemsPostgreController
		(
			PostgreSQLDbContext postgreSQLDbContext,
			TelegramBot.TelegramBot telegramBot,
            IDistributedCache cache,
            ILogger<ItemsPostgreController> logger,
			GetItems getItemsService,
            CreateItems itemService
        )
		{
			_postgreSQLDbContext = postgreSQLDbContext;
			_telegramBot = telegramBot;
			_cache = cache;
			_getItemsService = getItemsService;
			_itemService = itemService;
			_logger = logger;
		}

		//[Authorize]
		//[HttpGet("ConnectData")]
		//public async Task<IActionResult> ConnectData()
		//{
		//	// Получите все записи ItemEntity
		//	var items = _postgreSQLDbContext.ItemEntities.ToList();

		//	foreach (var item in items)
		//	{
		//		// Перенесите данные в DescriptionEntity
		//		if (!string.IsNullOrEmpty(item.Description))
		//		{
		//			var description = new DescriptionEntity
		//			{
		//				Description = item.Description,
		//				ItemId = item.Id // Устанавливаем связь с ItemEntity
		//			};
		//			_postgreSQLDbContext.DescriptionEntity.Add(description);

		//			// Сохраните изменения, чтобы получить Id для DescriptionEntity
		//			_postgreSQLDbContext.SaveChanges();

		//			// Установите DescriptionId в ItemEntity
		//			item.DescriptionId = description.Id;
		//		}

		//		// Перенесите данные в ArticleEntity
		//		if (!string.IsNullOrEmpty(item.Article))
		//		{
		//			var article = new ArticleEntity
		//			{
		//				Article = item.Article,
		//				ItemId = item.Id // Устанавливаем связь с ItemEntity
		//			};
		//			_postgreSQLDbContext.ArticleEntity.Add(article);

		//			// Сохраните изменения, чтобы получить Id для ArticleEntity
		//			_postgreSQLDbContext.SaveChanges();

		//			// Установите ArticleId в ItemEntity
		//			item.ArticleId = article.Id;
		//		}
		//	}

		//	// Сохраните изменения в ItemEntity
		//	_postgreSQLDbContext.SaveChanges();
		//	return Ok();
		//}

		#region Brands&Categories
		[HttpGet("GetBrands")]
		public async Task<IActionResult> GetBrandsList()
		{
			var items = await _postgreSQLDbContext
										.ItemBrands
										.Select(br => new
										{
											br.Id,
											br.Name
										})
										.ToListAsync();
			return Ok(items);
		}

		[Authorize]
		[HttpPost("CreateBrand")]
		public async Task<IActionResult> CreateBrand([FromBody] ItemBrand brand)
		{
			if (brand == null || string.IsNullOrWhiteSpace(brand.Name))
			{
				return BadRequest("Invalid brand data");
			}

			_postgreSQLDbContext.ItemBrands.Add(brand);
			await _postgreSQLDbContext.SaveChangesAsync();

			return Ok();
		}

		[HttpGet("GetCategories")]
		public async Task<IActionResult> GetCategoriesList()
		{
			var items = await _postgreSQLDbContext
									.ItemCategories
									.Select(c => new
									{
										c.Id,
										c.Name
									})
									.ToListAsync();
			return Ok(items);
		}

		[Authorize]
		[HttpPost("CreateCategory")]
		public async Task<IActionResult> CreateCategory([FromBody] ItemCategory category)
		{
			if (category == null || string.IsNullOrWhiteSpace(category.Name))
			{
				return BadRequest("InvalidData");
			}

			_postgreSQLDbContext.ItemCategories.Add(category);
			await _postgreSQLDbContext.SaveChangesAsync();

			return Ok();
		}

		[Authorize]
		[HttpPost("CreateFilter")]
		public async Task<IActionResult> CreateFilter([FromBody] CreateFilterRequest item)
		{
			if(await _postgreSQLDbContext.Filters.AnyAsync(i => i.Name == item.Name))
			{
				_logger.LogError("В фильтрах есть уже запись с таким названием!");
				return BadRequest("В фильтрах есть уже запись с таким названием!");
			}

			_postgreSQLDbContext
					.Filters
					.Add(new() { Name = item.Name });

			await _postgreSQLDbContext
						.SaveChangesAsync();
			return Ok();
		}

		[HttpGet("GetFilters")]
		public async Task<IActionResult> GetFilters()
		{
			var filters = await _postgreSQLDbContext
										.Filters
										.Select(filt => new
										{
											filt.Id,
											filt.Name,
										})
										.ToListAsync();

			return Ok(filters);
		}
        #endregion
        #region Item
        [Authorize]
		[HttpPost("CreateItem")]
		public async Task<IActionResult> CreateItem([FromBody] ItemDTO itemDto)
		{
			try
			{
				var response = await _itemService.CreateItemAsync(itemDto);
				return Ok(response);
			}
			catch (Exception ex)
			{
				_logger.LogError("Ошибка! {message}", ex.Message);
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("GetFilteredItems")]
		public async Task<IActionResult> GetFilteredItems(SearchCategoryItemRequest searchCategoryRequest)
		{
			try
			{
				var response = await _getItemsService.GetFilteredItemsAsync(searchCategoryRequest);
				return Ok(response);
			}
			catch(Exception ex)
			{
				_logger.LogError("Ошибка! {Message}", ex.Message);
				return BadRequest(ex.Message);
			}
        }

		[HttpPost("GetSearchItemsByName")]
		public async Task<IActionResult> SearchItemsByName(GetSearchItemRequest searchRequest)
		{
			try
			{
				var response = await _getItemsService.GetSearchItemsByName(searchRequest);
				return Ok(response);
			}
			catch(Exception ex)
			{
				_logger.LogError("Ошибка! {Message}", ex.Message);
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("GetItemsByName")]
		public async Task<IActionResult> GetItemByName(GetSearchItemRequest searchRequest)
		{
			try
			{
				var response = await _getItemsService.GetItemsByNameAsync(searchRequest);
				return Ok(response);
			}
			catch (Exception ex)
			{
				_logger.LogError("Ошибка! {message}", ex.Message);
				return BadRequest(ex.Message);
			}
		}

		[HttpPost("GetItem/{id}")]
		public async Task<IActionResult> GetItem(int id)
		{
			var item = _postgreSQLDbContext
								.ItemEntities
								.Where(item => item.Id == id)
								.Select(item => new
								{
									item.Id,
									item.Name,
									item.DiscountPrice,
									item.Price,
									item.Image,
									item.Stock,
									item.IsPopular,
									item.IsNewItem,
									Category = item.Category!.Name,
									Brand = item.Brand!.Name,
									item.Article!.Article,
									item.Description!.Description
								})
								.FirstOrDefault();
			return Ok(item);
		}

		[Authorize]
		[HttpDelete("DeleteItem/{id}")]
		public async Task<IActionResult> DeleteItem (int id )
		{
			try
			{
				var response = await _itemService.DeleteItemAsync(id);
				return Ok(response);
			}
			catch (Exception ex)
			{
				_logger.LogError("Ошибка! {message}", ex.Message);
				return BadRequest(ex.Message);
			}
		}

		[Authorize]
		[HttpPost("ChangeItem")]
		public async Task<IActionResult> ChangeItem([FromBody] ItemOneLevelDTO item)
		{
			var _item = await _postgreSQLDbContext
								.ItemEntities
								.Include(i => i.Description)
								.Include(i => i.Article)
								.Include(i => i.Filters)
								.SingleOrDefaultAsync(i => i.Id == item.id);

			if (_item == null)
			{
				return BadRequest();
			}

			_item.Name = item.Name ?? _item.Name;
			_item.Price = item.Price ?? _item.Price;
			_item.DiscountPrice = item.DiscountPrice ?? _item.DiscountPrice;
			_item.Image = item.Image ?? _item.Image;
			_item.Stock = item.Stock;
			_item.CategoryId = item.CategoryId;
			_item.BrandId = item.BrandId;
			_item.IsNewItem = item.IsNewItem;
			_item.IsPopular = item.IsPopular;
			_item.isInvisible = item.IsInvisible;
            _item.Filters.Clear();

            foreach (var filter in item.Filters) {
				var existingFilter = await _postgreSQLDbContext.Filters
					.FirstOrDefaultAsync(f => f.Id == filter);

				if (existingFilter != null)
				{
					_item.Filters.Add(existingFilter);
				}
			}

			if (_item.Article == null)
			{
				_item.Article = new() { Article = item.Article };
			}
			else
			{
				_item.Article.Article = item.Article;
			}

			if (_item.Description == null)
			{
				_item.Description = new() { Description = item.Description };
			}
			else
			{
				_item.Description.Description = item.Description;
			}

			await _postgreSQLDbContext.SaveChangesAsync();

			return Ok();
		}

		[HttpGet("GetPopularItems")]
		public async Task<IActionResult> GetPopularItems()
		{
			var response = await _getItemsService.GetPopularItemsAsync();

            return Ok(response);
		}

        [HttpPost("GetItems")]
        public async Task<IActionResult> GetItems(GetItemDTO GetItemRequest)
        {
			object response;

			if(GetItemRequest.category == "New")
			{
				response = await _getItemsService.GetNewItemsAsync(GetItemRequest);
				return Ok(response);
            }

			response = await _getItemsService.GetFilteredItemsAsync(GetItemRequest);

            return Ok(response);
		}

		[HttpGet("GetItemsForAdmin")]
		public async Task<IActionResult> GetItemsForAdmin(int skip, int take, string name = "") {

			var response = await _getItemsService.GetItemsForAdmin(skip,take,name);

            return Ok(response);
		}
        #endregion
        #region TelegrammAlerts
        [HttpPost("orderData")]
		public async Task<IActionResult> PlaceOrder([FromBody] OrderTelegram order)
		{
			var newOrderTelegram = new OrderTelegram()
			{
				city = order.city,
				deliveryType = order.deliveryType,
				description = order.description,
				email = order.email,
				paymentType = order.paymentType,
				personName = order.personName,
				postMat = order.postMat,
				reciver = order.reciver,
				telephone = order.telephone,
				items = new List<OrderItemEntity>()
			};

			foreach(var item in order.items)
			{
				var product = await _postgreSQLDbContext.ItemEntities.FirstOrDefaultAsync(i => i.Id == item.ProductId);
				newOrderTelegram.items.Add(new OrderItemEntity { OrderId = item.OrderId, 
																									Product = product,
																									ProductId = item.ProductId,
																									Quantity = item.Quantity});
			};

			string message = $"Новый заказ!\n\n\n" +
				"Клиент:\n" +
				$"\tИмя: {newOrderTelegram.personName}\n" +
				$"\tТелефон: {newOrderTelegram.telephone}\n" +
				$"\tEmail: {newOrderTelegram.email}\n\n\n" +
				"Заказ:\n" +
				$"\tГород: {newOrderTelegram.city}\n" +
				$"\tТип доставки: {newOrderTelegram.deliveryType}\n" +
				$"\tПункт получения: {newOrderTelegram.postMat}\n" +
				$"\tПолучатель: {newOrderTelegram.reciver}\n" +
				$"\tОписание заказа: {newOrderTelegram.description}\n" +
				$"\tТип оплаты: {newOrderTelegram.paymentType}\n" +
				"\n\n\n" +
				$"Товары:\n";

			foreach (var item in newOrderTelegram.items)
			{
				message += $"\tНазвание: {item.Product.Name}\n" +
									 $"\tАртикул: {item.Product.Article}\n" +
									 $"\tКоличество: {item.Quantity}\n" +
									 $"\tЦена: {item.Product.DiscountPrice ?? item.Product.Price}\n" + 
									 $"\tОстаток на складе: {item.Product.Stock - item.Quantity}\n"+
									 "\n\n";
				var product = _postgreSQLDbContext
												.ItemEntities
												.FirstOrDefault(i => i.Id == item.Product.Id);

				product.Stock -= item.Quantity;

				if(product.Stock <= 0)
				{
					throw new Exception("Товара нет в наличии");
				}
				_postgreSQLDbContext.SaveChanges();
			}

			await _telegramBot.SendMessageAsync(message);
			return Ok("Заказ успешно собран!");
		}

		[HttpPost("TradeInRequest")]
		public async Task<IActionResult> PostTradeInRequest(TradeInRequest requestData)
		{
			string message = "ЗАЯВКА НА ТРЕЙД-ИН!\n\n" +
										$"Устройство: {requestData.DeviceType}\n" +
										$"Цвет: {requestData.Color}\n" +
										$"Объем памяти: {requestData.Memory}\n" +
										$"Внешнее состояние устройства: {requestData.Appearance}\n" +
										$"Состояние аккумулятора: {requestData.Accumulator}\n" +
										$"Комплектация устройства: {requestData.Complectation}\n" +
										$"Ремонтировалось ли устройство: {requestData.Remonted}\n\n" +
										$"Имя владельца: {requestData.Username}\n" +
										$"Телефонный номер владельца: {requestData.Telephone}\n";

            await _telegramBot.SendMessageAsync(message);
            return Ok("Заявка на трейд-ин отправлена!");
		}

        [HttpPost("RepairRequest")]
        public async Task<IActionResult> PostRepairRequest(RepairRequest requestData)
        {
			string message = "ЗАЯВКА НА РЕМОНТ!\n\n" +
										$"Устройство: {requestData.Model}\n" +
										$"Описание проблемы: {requestData.Description}\n\n" +
                                        $"Имя владельца: {requestData.Name}\n" +
                                        $"Телефонный номер владельца: {requestData.Telephone}\n";

            await _telegramBot.SendMessageAsync(message);
            return Ok("Заявка на ремонт отправлена!");
        }

		[HttpPost("OrderItemRequest")]
		public async Task<IActionResult> PostOrderItemRequest(OrderItemRequest request)
		{
			var message = "ЗАЯВКА НА ЗАКАЗ ТОВАРА!\n\n" +
									 $"Имя клиента: {request.Name}\n" +
									 $"Телефон клиента: {request.Telephone}\n\n" +
								 	 $"Товар под заказ: {request.ItemName}\n" +
									 $"Артикул товара: {request.Article}";

			await _telegramBot.SendMessageAsync(message);
			return Ok();
		}

        [HttpPost("TelephoneCall/{tel}")]
		public async Task <IActionResult> PostTelephoneAlert(string tel)
		{
			await _telegramBot.SendTelephoneRecallAlert(tel);
			return Ok();
		}
        #endregion
        #region ImageFunctions
        [Authorize]
        [HttpPost("updatePhoto")]
		public async Task<IActionResult> UpdatePhoto([FromForm] IFormFile image)
		{
			if (image == null || image.Length == 0)
			{
				return BadRequest("Image is required");
			}

			var form = await Request.ReadFormAsync();
			var id = Convert.ToInt32(form["id"]);

			if (id == null)
			{
				return BadRequest("Id is required.");
			}


			using (var memoryStream = new MemoryStream())
			{
				await image.CopyToAsync(memoryStream);
				var imageBytes = memoryStream.ToArray();

				// Найдем все записи с указанным именем
				var itemsToUpdate = _postgreSQLDbContext.ItemEntities.Where(i => i.Id == id).ToList();
				//var itemsToUpdate = _postgreSQLDbContext.ItemEntities.Where(i => i.Name == name).ToList();

				// Важно!  Проверка на пустой список, чтобы избежать исключения.
				if (!itemsToUpdate.Any())
				{
					return NotFound("No items found with the specified name.");
				}

				foreach (var item in itemsToUpdate)
				{
					//Избегаем внесения лишних изменений, если изображение уже установлено.
					if (item.Image != null)
					{
						item.Image = imageBytes;
					}
					// Важно!  Добавить проверку на корректность
					else if (imageBytes != null && imageBytes.Length > 0)
					{
						item.Image = imageBytes;
					}
				}

				try
				{
					await _postgreSQLDbContext.SaveChangesAsync();
					return Ok();
				}
				catch (DbUpdateConcurrencyException ex)
				{
					return StatusCode(500, $"Error updating items: {ex.Message}");
				}
			}
		}

		[Authorize]
		[HttpPost("upload")]
        public async Task<IActionResult> Upload(IFormFileCollection files, [FromForm] string sliderName)
        {
            if (files == null || files.Count == 0)
                return BadRequest("No files uploaded.");

            var slider = new Slider ();

            foreach (var file in files)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    var imageBytes = memoryStream.ToArray();
					slider.Name = sliderName;
					slider.ImageData = imageBytes;
				}
            }

            _postgreSQLDbContext.Sliders.Add(slider);
            await _postgreSQLDbContext.SaveChangesAsync();

            await _cache.RemoveAsync("sliderImages");
			await _cache.RemoveAsync("sliderImagesMobile");

            return Ok(new { sliderId = slider.Id });
        }

		[HttpPost("sliderImagesAdmin")]
        public async Task<IActionResult> GetSliderImagesAdmin()
        {
            var sliderImageQuery = await _postgreSQLDbContext
                                               .Sliders
                                               .ToListAsync();

            List<Slider> selectedSlides = sliderImageQuery;

            if (selectedSlides.Count == 0)
            {
                return BadRequest();
            }

            return Ok(selectedSlides);
        }

        [HttpPost("sliderImages")]
        public async Task<IActionResult> GetSliderImages()
        {
			const string cacheKey = "sliderImages";

			var cachedData = await _cache.GetStringAsync(cacheKey);

			if (cachedData != null)
			{
				var slides = JsonConvert.DeserializeObject<List<Slider>>(cachedData);
				return Ok(slides);
			}

			var sliderImageQuery = await _postgreSQLDbContext
											   .Sliders
											   .ToListAsync();

			List<Slider> selectedSlides =	sliderImageQuery
												.Where(slider => !slider.Name.Contains("Mobile"))
												.ToList();

            if (selectedSlides.Count == 0)
			{
				return BadRequest();
			}

			var serializedData = JsonConvert.SerializeObject(selectedSlides);
			await _cache.SetStringAsync(cacheKey, serializedData, _cacheOptions);

			return Ok(selectedSlides);
		}

        [HttpGet("MobileSliderImages")]
        public async Task<IActionResult> GetMobileSliderImages()
        {
			const string cacheKey = "sliderImagesMobile";

			var cachedData = await _cache.GetStringAsync(cacheKey);

			if (cachedData != null)
			{
				var slides = JsonConvert.DeserializeObject<List<Slider>>(cachedData);
				return Ok(slides);
			}

			var sliders = await _postgreSQLDbContext
										.Sliders
                                        .Where(item => item.Name.Contains("Mobile"))
										.ToListAsync();

            if (sliders.Count == 0)
            {
                return BadRequest();
            }

			var serializedData = JsonConvert.SerializeObject(sliders);
			await _cache.SetStringAsync(cacheKey, serializedData, _cacheOptions);

			return Ok(sliders);
        }

        [HttpDelete("sliderImage/{id}")]
		public async Task<IActionResult> DeleteSliderImage(int id)
		{
			var _itemToDelete = await _postgreSQLDbContext
											.Sliders
											.FindAsync(id);
			if(_itemToDelete == null) 
			{
				return NotFound();
			}

			_postgreSQLDbContext.Sliders.Remove(_itemToDelete);
			await _postgreSQLDbContext.SaveChangesAsync();
            await _cache.RemoveAsync("sliderImages");
            await _cache.RemoveAsync("sliderImagesMobile");
            return Ok();
		}
		#endregion
	}}
