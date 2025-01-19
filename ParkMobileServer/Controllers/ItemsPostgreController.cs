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

namespace ParkMobileServer.Controllers
{
    [ApiController]
	[Route("api/[controller]")]
	public class ItemsPostgreController : Controller
	{
		private readonly PostgreSQLDbContext _postgreSQLDbContext;
		private readonly TelegramBot.TelegramBot _telegramBot;
		public ItemsPostgreController
		(
			PostgreSQLDbContext postgreSQLDbContext,
			TelegramBot.TelegramBot telegramBot
		)
		{
			_postgreSQLDbContext = postgreSQLDbContext;
			_telegramBot = telegramBot;
		}

		//[Authorize]
		//[HttpGet("ConnectData")]
		//public async Task<IActionResult> ConnectData()
  //      {
  //          // Получите все записи ItemEntity
  //          var items = _postgreSQLDbContext.ItemEntities.ToList();

  //          foreach (var item in items)
  //          {
  //              // Перенесите данные в DescriptionEntity
  //              if (!string.IsNullOrEmpty(item.Description))
  //              {
  //                  var description = new DescriptionEntity
  //                  {
  //                      Description = item.Description,
  //                      ItemId = item.Id // Устанавливаем связь с ItemEntity
  //                  };
  //                  _postgreSQLDbContext.DescriptionEntity.Add(description);

  //                  // Сохраните изменения, чтобы получить Id для DescriptionEntity
  //                  _postgreSQLDbContext.SaveChanges();

  //                  // Установите DescriptionId в ItemEntity
  //                  item.DescriptionTableId = description.Id;
  //              }

  //              // Перенесите данные в ArticleEntity
  //              if (!string.IsNullOrEmpty(item.Article))
  //              {
  //                  var article = new ArticleEntity
  //                  {
  //                      Article = item.Article,
  //                      ItemId = item.Id // Устанавливаем связь с ItemEntity
  //                  };
  //                  _postgreSQLDbContext.ArticleEntity.Add(article);

  //                  // Сохраните изменения, чтобы получить Id для ArticleEntity
  //                  _postgreSQLDbContext.SaveChanges();

  //                  // Установите ArticleId в ItemEntity
  //                  item.ArticleTableId = article.Id;
  //              }
  //          }

  //          // Сохраните изменения в ItemEntity
  //          _postgreSQLDbContext.SaveChanges();
		//	return Ok();
  //      }

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
        #endregion
        #region Item
        [Authorize]
		[HttpPost("CreateItem")]
		public async Task<IActionResult> CreateItem([FromBody] ItemDTO itemDto)
		{
            if (itemDto == null)
            {
                return BadRequest("Invalid brand data");
            }

            var item = new ItemEntity
            {
                Name = itemDto.Name,
                Price = itemDto.Price,
                DiscountPrice = itemDto.DiscountPrice,
                Image = itemDto.Image,
                Stock = itemDto.Stock,
                IsPopular = itemDto.IsPopular,
                IsNewItem = itemDto.IsNewItem,
                isInvisible = itemDto.IsInvisible,
                CategoryId = itemDto.CategoryId,
                BrandId = itemDto.BrandId,
                Description = new DescriptionEntity { Description = itemDto.Description },
                Article = new ArticleEntity { Article = itemDto.Article }
            };

            _postgreSQLDbContext.ItemEntities.Add(item);
			await _postgreSQLDbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpPost("GetCategoryItems")]
		public async Task<IActionResult> GetCategoryItems(SearchCategoryItemRequest searchCategoryRequest)
		{
			var _query = searchCategoryRequest.Query;

			var splitedQuery = _query.Split("/");

			string category = splitedQuery[0].ToLower();
			string item = splitedQuery[1].ToLower();

			var brandId = 0;
			var categoryId = 0;

            IQueryable<ItemEntity> query = _postgreSQLDbContext
											.ItemEntities;

			//TODO: Можно отобрать бренды и категории через Select и упростить эту схему

			switch(category.ToLower())
			{
				case "apple": 
					switch (item.ToLower())
					{
						case "iphone":
                            query = query.Where(queryItem => queryItem.Name.ToLower().Contains(item.ToLower()));
							break;
						case "macbook":
							query = query.Where(queryItem => queryItem.Name.ToLower().Contains(item.ToLower()));
							break;
						case "ipad":
							query = query.Where(queryItem => queryItem.Name.ToLower().Contains(item.ToLower()));
							break;
						case "watches":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "apple")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "watch")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
                        }
						case "airpods":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "apple")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "airpods")).Id;
							query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
							break;
                        }
						case "tv":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "apple")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "tv")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
                    }
					break;
				case "samsung":
					switch (item.ToLower())
					{
						case "phones":
						{
                            brandId = 11;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "phones")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "headphones":
						{
                            brandId = 11;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "audio")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "watches":
						{
                            brandId = 11;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "watch")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
					}
					break;
				case "xiaomi":
					switch (item.ToLower())
					{
						case "phones":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "xiaomi")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "phones")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "headphones":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "xiaomi")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "audio")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
							break;
                        }
						case "tv":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "xiaomi")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "tv")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
							break;
                        }
					}
					break;
				case "dyson":
					switch(item.ToLower())
					{
						case "styler":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "dyson")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "styler")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "hairdryer":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "dyson")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "hairdryer")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
                        case "rectifier":
                        {
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "dyson")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "rectifier")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
                        }
                        case "vacuumcleaner":
                        {
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "dyson")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "vacuumcleaner")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
                        }
                        case "airpurifiers":
                        {
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "dyson")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "airpurifiers")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
                        }
                    }
					break;
				case "headphones":
					switch (item.ToLower())
					{
						case "yandex":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "yandex")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "audio")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "jbl":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "jbl")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "audio")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "marshall":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "marshall")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "audio")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
                        }
					}
					break;
				case "gaming":
					switch (item.ToLower())
					{
						case "sony":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "sony")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "gaming")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId).Take(5);
                            break;
						}
						case "microsoft":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "microsoft")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "gaming")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "nintendo":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "nintendo")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "gaming")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "steam":
						{
                            brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "steam")).Id;
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "gaming")).Id;
                            query = query.Where(queryItem => queryItem.BrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "accessories":
						{
                            categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "gaimingaccessories")).Id;
                            query = query.Where(queryItem => queryItem.CategoryId == categoryId);
                            break;
						}
					}
					break;
			}

			var itemsCount = await query.CountAsync();
			var items = await query
								.Skip(searchCategoryRequest.Skip)
								.Take(searchCategoryRequest.Take)
								.ToListAsync();

			if(items.Count > 0)
			{
				return Ok(new
				{
					items = items.Select(item => ItemMapper.MapToDto(item, brandId, categoryId)),
					count = itemsCount
				});
			}
			else
			{
				return NoContent();
			}

		}

		[HttpPost("GetItemsByName")]
		public async Task<IActionResult> GetItemByName(string name, int skip, int take, bool fromSearch = true)
		{
			var splittedName = name.Split(" ");

			var query = _postgreSQLDbContext
								.ItemEntities
								.Include(item => item.Description)
                                .Include(item => item.Article)
                                .AsQueryable();
			foreach(var splitValue in splittedName)
			{
				query = query
							.Where(item => item.Name.ToLower()
							.Contains(splitValue.ToLower()));
				if(fromSearch == false)
				{
					if(name.ToLower() == "iphone 16" ||  name.ToLower() == "iphone 15" || name.ToLower() == "iphone 14" || name.ToLower() == "iphone 13" || name.ToLower() == "iphone 12" || name.ToLower() == "iphone 11")
					{
						query = query
									.Where(item => !item.Name.ToLower().Contains("max"))
									.Where(item => !item.Name.ToLower().Contains("pro"));
					}

					if(name.ToLower() == "iphone 16 pro" || name.ToLower() == "iphone 15 pro")
					{
						query = query.Where(item => !item.Name.ToLower().Contains("max"));
					}

					if(name.ToLower() == "apple watch ultra 2")
					{
						query = query.Where(item => !item.Name.ToLower().Contains("2024"));
					}
					if(name.ToLower() == "apple watch 9")
					{
						query = query
									.Where(item => item.Name.ToLower().Contains("apple watch 9"))
									.Where(item => !item.Name.ToLower().Contains("49mm"));
					}
					if(name.ToLower() == "airpods 2")
					{
						query = query
									.Where(item => item.Name.ToLower().Contains("apple airpods 2"))
									.Where(item => !item.Name.ToLower().Contains("2024"));
					}
                    if (name.ToLower() == "airpods 4")
                    {
                        query = query
                                    .Where(item => item.Name.ToLower().Contains("apple airpods 4"))
                                    .Where(item => !item.Name.ToLower().Contains("2024"));
                    }
                    if (name.ToLower() == "galaxy s")
					{
						query = query
								.Where(item =>
										item.Name.ToLower().Contains("galaxy s24") ||
										item.Name.ToLower().Contains("galaxy s23") ||
										item.Name.ToLower().Contains("galaxy s22") ||
										item.Name.ToLower().Contains("galaxy s21") ||
										item.Name.ToLower().Contains("galaxy s20"));

                    }

					if (name.ToLower() == "galaxy a")
					{
						query = query
								.Where(item =>
										item.Name.ToLower().Contains("galaxy a55") ||
										item.Name.ToLower().Contains("galaxy a35") ||
										item.Name.ToLower().Contains("galaxy a05") ||
                                        item.Name.ToLower().Contains("galaxy a06")
                                );
					}

					if(name.ToLower() == "xiaomi 14")
					{
						query = query
									.Where(item => !item.Name.ToLower().Contains("ultra"))
									.Where(item => !item.Name.ToLower().Contains("pro"))
									.Where(item => !item.Name.ToLower().Contains("14t"));
					}
					
					if(name.ToLower() == "xiaomi 13")
					{
						query = query
									.Where(item => !item.Name.ToLower().Contains("pro"))
									.Where(item => !item.Name.ToLower().Contains("plus"))
									.Where(item => !item.Name.ToLower().Contains("13t"));
					}
					if(name.ToLower() == "янедкс станция 2")
					{
						query = query.Where(item => !item.Name.ToLower().Contains("лайт"));
					}
					if(name.ToLower() == "яндекс станция мини")
					{
						query = query.Where(item => !item.Name.ToLower().Contains("с часами"));
					}
					if(name.ToLower() == "яндекс станция лайт")
					{
						query = query.Where(item => !item.Name.ToLower().Contains("2"));
					}
				}
			}

			var itemsCount = await query.CountAsync();

			var items = await query
								.Skip(skip)
                                .Take(take)										
								.ToListAsync();

			var mappedItems = items.Select(ItemMapper.MatToShortDto).ToList();

			
			if(itemsCount == 0)
			{
				return BadRequest("Нет товаров с таким именем!");
			}

			return Ok(new
			{
				items = mappedItems,
				count = itemsCount
			});
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
									item.isInvisible,
									Category = item.Category!.Name,
									Brand = item.Brand!.Name,
                                    Article = item.Article!.Article,
									Description = item.Description!.Description
								})
								.FirstOrDefault();
			return Ok(item);
		}

		[Authorize]
		[HttpDelete("DeleteItem/{id}")]
		public async Task<IActionResult> DeleteItem (int id )
		{
			var item = await _postgreSQLDbContext.ItemEntities.FindAsync(id);
			
			if (item == null)
			{
				return BadRequest();
			}

			_postgreSQLDbContext.ItemEntities.Remove(item);

			await _postgreSQLDbContext.SaveChangesAsync();
			return Ok();
		}

		[Authorize]
		[HttpPost("ChangeItem")]
		public async Task<IActionResult> ChangeItem([FromBody] ItemOneLevelDTO item)
		{
			var _item = await _postgreSQLDbContext
								.ItemEntities
								.Include(i => i.Description)
								.Include(i => i.Article)
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

			// Обновляем связанные сущности
			if (_item.Article == null)
			{
				_item.Article = new () { Article = item.Article };
			}
			else
			{
				_item.Article.Article = item.Article;
			}

			if (_item.Description == null)
			{
				_item.Description = new () { Description = item.Description };
			}
			else
			{
				_item.Description.Description = item.Description;
			}

			// Сохраняем изменения
			await _postgreSQLDbContext.SaveChangesAsync();

			return Ok();
		}
		[HttpGet("GetPopularItems")]
		public async Task<IActionResult> GetPopularItems()
		{
			var newItems = await _postgreSQLDbContext
						.ItemEntities
						.Where(item => item.IsPopular == true)
						.Select(item => new {
							item.Id,
							item.Name,
							item.Price,
							item.DiscountPrice,
							item.Image
						})
						.ToListAsync();

			return Ok(newItems);
		}

        [HttpGet("GetItems")]
        public async Task<IActionResult> GetItems(string? category, string? brand, int skip, int take, string name = "", bool isForAdmin = false)
        {
            int? categoryId = null;
            int? brandId = null;

            if (category != null && category == "New")
            {
				if(isForAdmin == false) {
					var queryString = await _postgreSQLDbContext
										.ItemEntities
										.Select(item => new
										{
											item.Id,
											item.Name,
											item.DiscountPrice,
											item.Price,
											item.Image,
											item.IsPopular,
											item.IsNewItem,
											Article = item.Article!.Article,
										})
										.Where(item => item.IsNewItem == true && item.Name.ToLower().Contains(name.ToLower()))
										.ToListAsync();

					var newItems = queryString
										.Skip(skip)
										.Take(take);

					var counter = queryString
										.Count;

					return Ok(new
					{
						count = counter,
						items = newItems,
					});
				}
				else {
					var queryString = await _postgreSQLDbContext
					.ItemEntities
					.Select(item => new {
						item.Id,
						item.Name,
						item.DiscountPrice,
						item.Price,
						item.Image,
						item.IsPopular,
						item.IsNewItem,
						Article = item.Article!.Article,
						Description = item.Description!.Description,
						brandId = item.BrandId,
						stock = item.Stock,
						item.CategoryId
					})
					.Where(item => item.IsNewItem == true && item.Name.ToLower().Contains(name.ToLower()))
					.ToListAsync();

					var newItems = queryString
										.Skip(skip)
										.Take(take);

					var counter = queryString
										.Count;

					return Ok(new
					{
						count = counter,
						items = newItems,
					});
				}
            }

            if (!string.IsNullOrWhiteSpace(category))
            {
                categoryId = (await _postgreSQLDbContext
                                .ItemCategories
                                .FirstOrDefaultAsync(c => c.Name == category))?
                                .Id;
            }
            if (!string.IsNullOrWhiteSpace(brand))
            {
                brandId = (await _postgreSQLDbContext
                                .ItemBrands
                                .FirstOrDefaultAsync(b => b.Name.ToLower() == brand.ToLower()))?
                                .Id;
				//TODO: Снизу заглушка, т.к. brandId не ищется, если brand = samsung
				if(brand == "Samsung")
				{
					brandId = 11;
				}
            }

			if(isForAdmin == false) {
				var query = _postgreSQLDbContext
								.ItemEntities
								.Select(item => new
								{
									item.Id,
									item.Name,
									item.DiscountPrice,
									item.Price,
									item.Image,
									item.IsPopular,
									item.IsNewItem,
									item.BrandId,
									item.CategoryId,
									Article = item.Article!.Article,
								})
								.AsQueryable();

				if (categoryId.HasValue)
				{
					if(category.ToLower() == "gaming")
					{
						query = query.Where(item => item.CategoryId == 10 || item.CategoryId == 18);
					}
					else
					{
						query = query.Where(item => item.CategoryId == categoryId.Value);
					}
				}

				if (brandId.HasValue)
				{
					query = query.Where(item => item.BrandId == brandId.Value);
				}

				if (!string.IsNullOrWhiteSpace(name))
				{
					query = query.Where(item => item.Name.ToLower().Contains(name.ToLower()));
				}

				var count = await query.CountAsync();

				var items = await query
									.Skip(skip)
									.Take(take)
									.ToListAsync();

				return Ok(new
				{
					count = count,
					items = items
				});
			}
			else {
				var query = _postgreSQLDbContext
				.ItemEntities
				.Select(item => new {
					item.Id,
					item.Name,
					item.DiscountPrice,
					item.Price,
					item.Image,
					item.IsPopular,
					item.IsNewItem,
					Article = item.Article!.Article,
					Description = item.Description!.Description,
					brandId = item.BrandId,
					stock = item.Stock,
					item.CategoryId
				})
				.AsQueryable();

				if (categoryId.HasValue)
				{
					if(category.ToLower() == "gaming")
					{
						query = query.Where(item => item.CategoryId == 10 || item.CategoryId == 18);
					}
					else
					{
						query = query.Where(item => item.CategoryId == categoryId.Value);
					}
				}

				if (brandId.HasValue)
				{
					query = query.Where(item => item.brandId == brandId.Value);
				}

				if (!string.IsNullOrWhiteSpace(name))
				{
					query = query.Where(item => item.Name.ToLower().Contains(name.ToLower()));
				}

				var count = await query.CountAsync();

				var items = await query
									.Skip(skip)
									.Take(take)
									.ToListAsync();

				return Ok(new
				{
					count = count,
					items = items
				});
			}
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

		//[HttpPost("{id}/image")]
  //      public async Task<IActionResult> GetImageData(int id)
  //      {
  //          var item = await _postgreSQLDbContext.ItemEntities.FindAsync(id);
  //          if (item == null || item.Image == null)
  //          {
  //              return NotFound();
  //          }

  //          var imageContentType = "image/jpeg"; // или другой тип, который у вас
  //          return File(item.Image, imageContentType); // Используйте метод File для отправки изображения
  //      }

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

            return Ok(new { sliderId = slider.Id });
        }

        [HttpPost("sliderImages")]
        public async Task<IActionResult> GetSliderImages([FromQuery] bool? isForAdmin = false)
        {
			var sliderImageQuery = await _postgreSQLDbContext
											   .Sliders
											   .ToListAsync();

			List<Slider> selectedSlides = isForAdmin == false ?
												sliderImageQuery
														.Where(slider => !slider.Name.Contains("Mobile"))
														.ToList() :
												sliderImageQuery;

            if (selectedSlides.Count == 0)
			{
				return BadRequest();
			}

			return Ok(selectedSlides);
		}

        [HttpGet("MobileSliderImages")]
        public async Task<IActionResult> GetMobileSliderImages()
        {
			var sliders = await _postgreSQLDbContext
										.Sliders
                                        .Where(item => item.Name.Contains("Mobile"))
                                        .Select(item => new
										{
											item.Id,
											item.Name,
											image = item.ImageData
										})
										.ToListAsync();

            if (sliders.Count == 0)
            {
                return BadRequest();
            }
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
			return Ok();
		}
		#endregion
	}}