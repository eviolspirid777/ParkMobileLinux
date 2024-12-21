using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkMobileServer.DbContext;
using ParkMobileServer.DTO.ItemDTO;
using ParkMobileServer.Entities.Items;
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
		#region BaseFunctionsToCompeteDB

        [HttpPost("test")]
        public async Task<bool> PushTestData()
        {
            _postgreSQLDbContext.ItemEntities.AddRange(
                new ItemEntity
                {
                    Price = "14 990",
                    Name = "Watch 6 40mm",
                    CategoryId = 4,
                    Description = "Устройство, которое знает вас лучше всех, вернулось с еще более персонализированным контролем самочувствия и улучшенным анализом качества сна. Начните свой день полными сил с функцией оценки сна, которая доступна на Galaxy Watch6.\r\n\r\nБлагодаря увеличенному на 20% экрану получите еще больше информации с одного взгляда на устройство. Уменьшенный на 30% сенсорный безель делает его самым большим среди Galaxy Watch на сегодняшний день и создает больше пространства для самовыражения благодаря кастомизируемым циферблатам.\r\n\r\nСтиль и комфорт объединились в этой тонкой и изящной форме. Дизайн был изменен и переосмыслен, что сделало Galaxy Watch6 ультракомфортным и легким аксессуаром, идеальным для вашего запястья.\r\n\r\nПросто нажмите кнопку, чтобы легко отсоединить ремешок. Переходите от спортивного к повседневному стилю в одно касание. Направляющие ремешка позволяют быстро и точно вставить его, а затем надежно закрепить с приятным щелчком.\r\n\r\nЦарапины не страшны благодаря сверхпрочному сапфировому стеклу Sapphire Crystal Glass. Умные часы готовы ко всему, будь то дождь или солнце. Сверхпрочное сапфировое стекло делает экран устройства прочным и долговечным, а класс защиты IP68 и 5 АТМ означает, что они достаточно прочны, чтобы быть рядом даже в самых смелых приключениях.\r\n\r\nУзнайте о своем сне больше для максимально продуктивного дня. Надевайте Galaxy Watch6 перед сном и следите за фазами сна и другими его показателями, чтобы лучше высыпаться. Теперь вы можете получить доступ к функции оценки и корректировки сна прямо на своем запястье.\r\n\r\nОтслеживание сердечного ритма принесет спокойствие и позволит сосредоточиться на своем дне. Встроенный датчик PPG периодически измеряет частоту сердечных сокращений и сердечный ритм, пока вы носите Galaxy Watch6, и предупредит, если ваш пульс станет слишком высоким или низким. А для более детальных измерений используйте датчик ЭКГ.\r\n\r\nВозьмите проверку артериального давления в привычку\r\n\r\nПоддерживайте здоровый образ жизни, включив быструю проверку артериального давления в свой распорядок дня. Измеряйте давление прямо на запястье с помощью Galaxy Watch6. Никакого дополнительного оборудования не требуется!\r\n\r\nИзучите свой внутренний мир с функцией анализа состава тела. Откажитесь от громоздких устройств — получайте данные о своем теле в любое удобное время с помощью детального анализа состава тела (БИА) на ваших Galaxy Watch6. Эти измерения помогут вам эффективнее заботиться о физическом состоянии своего тела и устанавливать индивидуальные цели в фитнесе.\r\n\r\nФункции безопасности для вашего спокойствия\r\n\r\nВаши Galaxy Watch6 всегда находятся в режиме ожидания на случай чрезвычайной ситуации. Если вы упадете, система обнаружения падения зафиксирует это и спросит, нужна ли вам помощь. В других чрезвычайных ситуациях просто нажмите кнопку «Домой» пять раз, чтобы отправить сигнал SOS в службы экстренной помощи. Когда прибудет помощь, быстро получите доступ к вашей медицинской информации с экрана блокировки одним касанием. Будьте уверены, теперь вы в надежных руках.\r\nЗаписывайте все свои успехи и контролируйте прогресс с помощью Galaxy Watch6. Вы можете выбрать из более чем 90 тренировок, включая плавание и йогу, или создать свою собственную тренировку. Забыли нажать «Старт»? Ваши Galaxy Watch автоматически распознают и запишут некоторые тренировки, такие как бег, ходьба, и езда на велосипеде, чтобы вы не потеряли ценные данные.\r\n\r\nУстановите персональную зону пульса или просто начните бегать, а Galaxy Watch6 измерят частоту сердечных сокращений в зависимости от вашей физической подготовки и оптимизируют зону пульса, которая подходит именно вам. После настройки вы сможете получать уведомления, когда войдете в свою целевую зону пульса, и контролировать нахождение в этой зоне во время тренировок.\r\n\r\nСделайте уникальные Galaxy Watch6. Выбирайте из широкой линейки ремешков в различных стилях и материалах. Вы также можете настроить циферблат, используя любимые цвета, шаблоны и фотографии. Вас ничего не ограничивает, кроме воображения!",
                    ItemBrandId = 1,
                    Stock = 3,
                    Article = "4596394569"
                },
                new ItemEntity
                {
                    Price = "32 990",
                    Name = "iPhone 11",
                    CategoryId = 3,
                    Description = "Совершенно новая система двух камер со сверхширокоугольной камерой. Ночной режим и потрясающее качество видео. Защита от воды и пыли. Целый день без подзарядки. Шесть прекрасных цветов. 11 станет вашим любимым числом.\r\nСнимайте видео 4K, отличные портреты и захватывающие дух пейзажи с совершенно новой системой двух камер. Делайте красивейшие снимки при слабом освещении в Ночном режиме. Смотрите фото и видео, играйте в игры — на дисплее Liquid Retina HD 6,1 дюйма всё выглядит естественно и реалистично.\r\n\r\nОткрывайте новые возможности игр, дополненной реальности и фотосъёмки благодаря непревзойдённой производительности процессора A13 Bionic. А с мощным аккумулятором, которого хватит на целый день работы, вы сможете делать больше и меньше времени тратить на подзарядку. Устройство защищено от воды (допускается погружение до 2 метров до 30 минут).",
                    ItemBrandId = 3,
                    Stock = 2,
                    Article = "123412343145345",
					IsPopular = true,
					IsNewItem = true,
				},
                new ItemEntity
                {
                    Price = "39 490",
                    Name = "iPhone 12",
                    CategoryId = 1,
                    Description = "Apple iPhone 12 — ультрамощный смартфон от престижного бренда. Девайс получил молниеносный процессор A14 Bionic и впечатляющий дисплей Super Retina XDR от края до края. Набор продвинутых камер эффективно работает даже в условиях слабого освещения. Видеоролики Dolby Vision завораживают реалистичностью.\r\n\r\nФотовозможности гаджета колоссальны. Широкоугольный датчик теперь улавливает значительно больше света. Проработка нюансов очень точная днем и ночью. Портретный режим обеспечивает художественное размытие фона, выделяя самое главное. Смартфон объединяет прорывные возможности с легендарным дизайном. Apple iPhone 12 это выбор активного пользователя.\r\n",
                    ItemBrandId = 2,
                    Stock = 5,
                    Article = "34634563456",
					IsPopular = true
                },
                new ItemEntity
                {
                    Price = "15 190",
                    Name = "AirPods 3 Lightning",
                    CategoryId = 1,
                    ItemBrandId = 4,
                    Description = "AirPods 3 Lightning - это беспроводные наушники в форме вкладышей от компании Apple, которые предлагают ряд улучшенных функций и характеристик по сравнению с предыдущими моделями.\r\n\r\nОсновные характеристики:\r\n\r\nБеспроводная связь: AirPods 3 подключаются к вашему устройству с помощью технологии Bluetooth, обеспечивая стабильное и качественное беспроводное воспроизведение звука.\r\nУлучшенное качество звука: AirPods 3 обладают улучшенным звуком благодаря новому динамическому драйверу, который обеспечивает более глубокие басы и чистые высокие частоты.\r\nАктивное шумоподавление: Наушники оснащены технологией активного шумоподавления, которая позволяет блокировать внешние звуки, обеспечивая вас полным погружением в музыку или звонки.\r\nПрозрачный режим: С помощью прозрачного режима вы можете услышать окружающие звуки без необходимости снимать наушники, что делает их идеальным выбором для использования на улице или в общественном транспорте.\r\nУправление сенсорным нажатием: AirPods 3 управляются сенсорным нажатием, позволяя вам легко управлять воспроизведением музыки, отвечать на звонки и активировать голосового помощника Siri.\r\nЗарядка через разъем Lightning: AirPods 3 поставляются с зарядным футляром, который можно заряжать с помощью кабеля Lightning, обеспечивая быструю и удобную зарядку в любых условиях.\r\n\r\nAirPods 3 Lightning представляют собой идеальное сочетание качества звука, комфорта и удобства использования, что делает их отличным выбором для всех, кто ценит высокое качество звука и инновационные технологии.\r\nзводителя.",
                    Stock = 4,
                    Article = "3q4gferg2i43562",
                    IsNewItem = true,
                },
                new ItemEntity
                {
                    Price = "102 990",
                    Name = "MacBook Air 13 2024",
                    CategoryId = 2,
                    ItemBrandId = 1,
                    Description = "Добро пожаловать в мир стильного дизайна и мощной производительности с MacBook Air 13 2024 года. Этот портативный ноутбук предлагает передовые технологии и функции, которые помогут вам оставаться продуктивным в любой обстановке.\r\n\r\nОсобенности:\r\n\r\nПроизводительность нового поколения: Оснащенный процессором M2 от Apple, MacBook Air 13 2024 обеспечивает высокую производительность и быстродействие для выполнения самых требовательных задач.\r\nЯркий и четкий дисплей: 13,3-дюймовый экран Retina с технологией True Tone обеспечивает яркие и насыщенные цвета, а также резкое и четкое изображение для комфортного просмотра контента.\r\nУдобная клавиатура и трекпад: Клавиатура Magic Keyboard с механизмом ножничного переключателя обеспечивает комфортное и точное нажатие, а мультитач трекпад позволяет удобно управлять курсором.\r\nДолгая автономная работа: Благодаря оптимизированной работе аппаратных компонентов и операционной системы macOS, встроенная батарея обеспечивает до 12 часов работы без подзарядки.\r\nБезопасность и конфиденциальность: Встроенные сканеры Touch ID позволяют быстро и безопасно разблокировать устройство и авторизовываться в приложениях и сервисах Apple.\r\nСовременный дизайн и портативность: Стройный и легкий корпус из алюминия делает MacBook Air 13 2024 идеальным спутником для работы, учебы и развлечений в любом месте.",
                    Stock = 5,
                    Article = "egkrgow34562",
					IsPopular = true
				},
                new ItemEntity
                {
                    Price = "53 490",
                    Name = "Игровая приставка Sony PlayStation 5 Slim",
                    CategoryId = 5,
                    ItemBrandId = 2,
                    Description = "PlayStation 5 Slim представляет собой истинный прорыв в мире игровых консолей, принципиально отличаясь от своих предшественников благодаря впечатляющим техническим характеристикам и инновационным функциям. Вот некоторые из ключевых особенностей PlayStation 5:\r\n\r\nНевероятная скорость загрузки: Благодаря продвинутому накопителю SSD и уникальной системе ввода-вывода, PlayStation 5 позволяет переходить между игровыми локациями и загружать игры практически мгновенно, устраняя экранные загрузки и обеспечивая плавный игровой процесс.\r\nФотореалистичная графика: С гибридным процессором на основе архитектуры Zen 2 и поддержкой технологии трассировки лучей, PlayStation 5 позволяет разработчикам создавать игры с потрясающей детализацией, дальностью проработки и освещением, а также 4K-разрешением для впечатляющих визуальных эффектов.\r\nТехнология 3D AudioTech: Благодаря мощному звуковому чипу Tempest 3D AudioTech, PlayStation 5 обеспечивает непревзойденное качество звука, создавая трехмерное аудио, которое погружает вас в игровой мир и позволяет услышать каждую деталь звука.\r\nУникальный геймпад DualSense: Новый геймпад DualSense предлагает уникальные функции, такие как адаптивные спусковые курки, улучшенная тактильная отдача и встроенная система микрофонов, что делает игровой процесс еще более интерактивным и захватывающим.\r\nОбратная совместимость и эксклюзивные игры: PlayStation 5 обеспечивает обратную совместимость с играми PlayStation 4 и предлагает широкий выбор эксклюзивных игр, таких как Horizon: Forbidden West, Gran Turismo 7 и Ratchet & Clank Rift Apart, обещая захватывающий игровой опыт как на релизе, так и в будущем.\r\n\r\nPlayStation 5 Slim - это не просто игровая консоль, это новое поколение развлечений, которое открывает перед вами мир возможностей и невероятных приключений.",
                    Stock = 6,
                    Article = "flawsogf2345ot245t",
                    IsNewItem = true,
                });

            await _postgreSQLDbContext.SaveChangesAsync();
            return true;
        }
		#endregion
		#region Brands&Categories
		[HttpGet("GetBrands")]
		public async Task<IActionResult> GetBrandsList()
		{
			var items = await _postgreSQLDbContext
											.ItemBrands
											.ToListAsync();
			var brandMapper = new BrandMapper();
			var mappedItems = brandMapper.MapToDTO(items);
			return Ok(mappedItems);
		}
		//[Authorize]
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
		[HttpPost("CreateBaseBrands")]
		public async Task<IActionResult> CreateBaseBrands()
		{
			await _postgreSQLDbContext.ItemBrands.AddRangeAsync(
				new ItemBrand[] {
					new () { Name = "Apple" },
					new () { Name = "Xiaomi"},
					new () { Name = "Sony" },
					new () { Name = "Steam" },
					new () { Name = "Dyson" },
                    new () { Name = "Yandex" },
                    new () { Name = "Jbl" },
                    new () { Name = "Marshall" },
                    new () { Name = "Microsoft" },
                    new () { Name = "Nintendo" },
                });

			await _postgreSQLDbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpGet("GetCategories")]
		public async Task<IActionResult> GetCategoriesList()
		{
			var items = await _postgreSQLDbContext
									.ItemCategories
									.ToListAsync();
			var categoryMapper = new CategoryMapper();
			var mappedItems = categoryMapper.MapToDTO(items);
			return Ok(mappedItems);
		}

		//[Authorize]
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

        [HttpPost("CreateBaseCategories")]
        public async Task<IActionResult> CreateBaseCategories()
        {
            await _postgreSQLDbContext.ItemCategories.AddRangeAsync(
                new ItemCategory[] {
                    new () { Name = "Iphone" },
                    new () { Name = "Ipad"},
                    new () { Name = "Watch" },
                    new () { Name = "Mac" },
                    new () { Name = "Airpods" },
                    new () { Name = "Accessories" },
                    new () { Name = "Gadgets" },
                    new () { Name = "Audio" },
                    new () { Name = "Phones" },
                    new () { Name = "Gaming" },
                    new () { Name = "Health" },
                    new () { Name = "Tv" },
                    new () { Name = "Styler" },
                    new () { Name = "HairDryer" },
                    new () { Name = "Rectifier" },
                    new () { Name = "VacuumCleaner" },
                    new () { Name = "AirPurifiers" },
                });

            await _postgreSQLDbContext.SaveChangesAsync();
            return Ok();
        }
        #endregion
        #region Item
        [Authorize]		
		[HttpPost("CreateItem")]
		public async Task<IActionResult> CreateItem([FromBody] ItemEntity item)
		{
            if (item== null)
            {
                return BadRequest("Invalid brand data");
            }

            _postgreSQLDbContext.ItemEntities.Add(item);
			await _postgreSQLDbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpPost("GetCategoryItems")]
		public async Task<IActionResult> GetCategoryItems(SearchCategoryItemRequest searchCategoryRequest)
		{
			var _query = searchCategoryRequest.Query;

			var splitedQuery = _query.Split("/");

			string category = splitedQuery[0];
			string item = splitedQuery[1];

            IQueryable<ItemEntity> query = _postgreSQLDbContext
								.ItemEntities;

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
						case "apple watch":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "apple")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "watch")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
                        }
						case "airpods":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "apple")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "airpods")).Id;
							query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
							break;
                        }
						case "apple tv":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "apple")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "Tv")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
                    }
					break;
				case "samsung":
					switch (item.ToLower())
					{
						case "смартфоны":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "samsung")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "phones")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "наушники":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "samsung")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "audio")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "watches":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "samsung")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "watch")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
					}
					break;
				case "xiaomi":
					switch (item.ToLower())
					{
						case "смартфоны":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "xiaomi")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "phones")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "наушники":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "xiaomi")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "audio")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
							break;
                        }
						case "тв приставки":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "xiaomi")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "tv")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
							break;
                        }
					}
					break;
				case "dyson":
					switch(item.ToLower())
					{
						case "стайлеры":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "dyson")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "styler")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "фены":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "dyson")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "hairdryer")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
                        case "выпрямители":
                        {
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "dyson")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "rectifier")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
                        }
                        case "пылесосы":
                        {
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "dyson")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "vacuumcleaner")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
                        }
                        case "очистители воздуха":
                        {
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "dyson")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "airpurifiers")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
                        }
                    }
					break;
				case "акустика и гарнитура":
					switch (item.ToLower())
					{
						case "яндекс станции":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "yandex")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "audio")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "jbl":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "jbl")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "audio")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "marshall":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "marshall")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "audio")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
                        }
					}
					break;
				case "гейминг":
					switch (item.ToLower())
					{
						case "sony playstation":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "sony")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "tv")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "xbox":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "microsoft")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "tv")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "nintendo":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "nintendo")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "tv")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "steam deck":
						{
                            var brandId = (await _postgreSQLDbContext.ItemBrands.FirstAsync(brand => brand.Name.ToLower() == "steam")).Id;
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "tv")).Id;
                            query = query.Where(queryItem => queryItem.ItemBrandId == brandId && queryItem.CategoryId == categoryId);
                            break;
						}
						case "аксессуары":
						{
                            var categoryId = (await _postgreSQLDbContext.ItemCategories.FirstAsync(category => category.Name.ToLower() == "accessories")).Id;
                            query = query.Where(queryItem => queryItem.CategoryId == categoryId);
                            break;
						}
					}
					break;
			}

			var itemsCount = await query.CountAsync();
			var items = await query.ToListAsync();

			return Ok(new
			{
				items = items,
				count = itemsCount
			});
		}

		[HttpPost("GetItemsByName")]
		public async Task<IActionResult> GetItemByName(string name, int skip, int take)
		{

			var query =  _postgreSQLDbContext
									.ItemEntities
									.Where(item => item.Name.ToLower().Contains(name.ToLower()));

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
			var item = _postgreSQLDbContext.ItemEntities.FirstOrDefault(item => item.Id == id);

			var brand = await _postgreSQLDbContext
											.ItemBrands
											.FirstOrDefaultAsync(brand => brand.Id == item.ItemBrandId);
			var category = await _postgreSQLDbContext
												.ItemCategories
												.FirstOrDefaultAsync(category => category.Id == item.CategoryId);

			var itemDTO = ItemMapper.MapToDto(item, brand.Id, category.Id);
			return Ok(itemDTO);
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
		public async Task<IActionResult> ChangeItem([FromBody] ItemEntity item)
		{

			var _item = await _postgreSQLDbContext.ItemEntities.FindAsync(item.Id);

			if(_item == null)
			{
				return BadRequest();
			}
			_item.Name = item.Name ?? _item.Name;
            _item.Price = item.Price ?? _item.Price;
            _item.Article = item.Article ?? _item.Article;
			_item.DiscountPrice = item.DiscountPrice ?? _item.DiscountPrice;
			_item.Description = item.Description ?? _item.Description;
			_item.Image = item.Image ?? _item.Image;
            _item.Stock = item.Stock;
            _item.CategoryId = item.CategoryId;
			_item.ItemBrandId = item.ItemBrandId;
			_item.Options = item.Options ?? _item.Options;
			_item.IsNewItem = item.IsNewItem;
			_item.IsPopular = item.IsPopular;

			_postgreSQLDbContext.ItemEntities.Update(_item);

			await _postgreSQLDbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpGet("GetPopularItems")]
		public async Task<IActionResult> GetPopularItems()
		{
			var newItems = await _postgreSQLDbContext
						.ItemEntities
						.Where(item => item.IsPopular == true)
						.ToListAsync();

			return Ok(newItems);
		}

		[HttpGet("GetItems")]
		public async Task<IActionResult> GetItems(string? category, string? brand, int skip, int take)
		{
            int? categoryId = null;
            int? brandId = null;
			int count = 0;

			if(!string.IsNullOrWhiteSpace(category))
			{
                categoryId = (await _postgreSQLDbContext
                                .ItemCategories
                                .FirstOrDefaultAsync(c => c.Name == category))?
                                .Id;
            }
			if(!string.IsNullOrWhiteSpace(brand))
			{
                brandId = (await _postgreSQLDbContext
                                .ItemBrands
                                .FirstOrDefaultAsync(b => b.Name == brand))?
                                .Id;
            }

            var query = _postgreSQLDbContext.ItemEntities.AsQueryable();
            if (categoryId.HasValue)
            {
                query = query.Where(item => item.CategoryId == categoryId.Value);
				count = query.Where(item => item.CategoryId == categoryId.Value).Count();
                if (count == 0)
                {
                    return Ok(new ItemsEntityList
                    {
                        count = count,
                        items = new()
                    });
                }
            }

            if (brandId.HasValue)
            {
                query = query.Where(item => item.ItemBrandId == brandId.Value);
				count = query.Where(item => item.ItemBrandId == brandId.Value).Count();
				if( count == 0)
				{
					return Ok(new ItemsEntityList
					{
						count = count,
						items = new()
					});
				}
            }

            var items = await query
								 .Skip(skip)
								 .Take(take)
								 .ToListAsync();
			
			if( count == 0 && !categoryId.HasValue && !brandId.HasValue)
			{
				count = (await query.ToListAsync()).Count;
            }

            var itemsDTO = items.Select(item => ItemMapper.MapToDto(item, item.ItemBrandId, item.CategoryId)).ToList();
			
			return Ok(new ItemsEntityList()
            {
                count = count,
                items = itemsDTO
            });
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

        [HttpPost("TelephoneCall/{tel}")]
		public async Task <IActionResult> PostTelephoneAlert(string tel)
		{
			await _telegramBot.SendTelephoneRecallAlert(tel);
			return Ok();
		}
		#endregion
		#region ImageFunctions

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

		[HttpPost("{id}/image")]
        public async Task<IActionResult> GetImageData(int id)
        {
            var item = await _postgreSQLDbContext.ItemEntities.FindAsync(id);
            if (item == null || item.Image == null)
            {
                return NotFound();
            }

            // Убедитесь, что тип изображения корректен
            var imageContentType = "image/jpeg"; // или другой тип, который у вас
            return File(item.Image, imageContentType); // Используйте метод File для отправки изображения
        }

		[HttpPost("upload")]
		public async Task<IActionResult> UploadData([FromForm] IFormFile image)
		{
			if (image == null || image.Length == 0)
			{
				return BadRequest("Image is required");
			}

			// Получение данных из FormData
			//var form = await Request.ReadFormAsync();
			//var price = form["price"];
			//var tag = form["tag"];
			//var category = form["category"];
			//var description = form["description"];
			//var brand = form["brand"];
			//var stock = form["stock"];

			//if (!Enum.TryParse(category, true, out ItemCategory itemCategory))
			//{
			//	return BadRequest($"Invalid category type! {category}");
			//}

			//if (!Enum.TryParse(brand, true, out ItemBrand itemBrand))
			//{
			//	return BadRequest($"Invalid category type! {brand}");
			//}


			// Преобразование IFormFile в byte[]
			using (var memoryStream = new MemoryStream())
			{
				await image.CopyToAsync(memoryStream);
				var imageBytes = memoryStream.ToArray();

				// Создание уникального ID
				//var item = new ItemEntity
				//{
				//	Image = imageBytes,
				//	Price = price.ToString(),
				//	Name = tag.ToString(),
				//	Category = itemCategory,
				//	Description = description.ToString(),
				//	ItemBrand = itemBrand,
				//	Stock = Int32.Parse(stock.ToString())
				//};

				//_postgreSQLDbContext.ItemEntities.Add(item);
				//await _postgreSQLDbContext.SaveChangesAsync();
				//return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
				return Ok();
			}
		}
		#endregion
	}
}
