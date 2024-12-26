"use client";
import { Catalog } from "@/Components/Catalog/Catalog";
import { UnderTilesLogos } from "@/Components/UnderTilesLogos/UnderTilesLogos";
import { Tiles } from "@/Components/Tiles/Tiles";
import { PopularItems } from "@/Components/PopularItems/PopularItems";
import { SwiperList } from "@/Components/Swiper/Swiper";
import { UnderSwiperCards } from "@/Components/UnderSwiperCards/UnderSwiperCards";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; 
import Media from "react-media";
import { TilesMobile } from "@/Components/Tiles/TilesMobile/TilesMobile";

const Home = () => {
  const queryClient = new QueryClient();

  //TODO: fa-(solid,regular, thin, sharp)

  //TODO: Redis прикрути(жрет оперативу)
  
  /*
  TODO: 19. Сделать в товарах цена за наличку и по карте как у доктора, скрин выше 
  TODO: 18. И сделать «Предзаказ 1-2» и форму для оставления заявки
  TODO: 17. Сделать возможность убирать товар с сайта без удаления карточки
  TODO: 16. Добавить фильтры в каталоге

  TODO: 22. Исправлен баг с неправильным выводом пояснительных комментариев внутри карточки товара
  TODO: 21. Добавить в админ панель - товары - поиск по товарам +
  TODO: 20. Исправить категорию «популярные товары» чтобы были название и тд. (Сделать карточки в ровень к друг другу) +
  TODO: 15. Сделать по меньше АРТИКУЛЫ в карточках +
  TODO: 14. Сделать уведомление товар добавлен в корзину +
  TODO: 13. Самовывоз «картой при получении оплата» +
  TODO: 12. При сдэке перевод, qr-код. (Без при получении) +
  TODO: 11. Самовывоз (наличными, оплата картой Visa,MasterCard Мир) +
  TODO: 10  Исправлен баг с неправильным с англовариантом полей у товара в корзине +
  TODO: 9   Добавлено оповещение снизу, что товар добавлен в корзину +
  TODO: 8   В корзине магазина изменить радио баттон под Картой при получении(Visa, MasterCard, Мир) +
  TODO: 5   Поиск в мобильной версии +
  TODO: 2   Контакты в мобильной версии должны перебрасывать на "О компании" +
  TODO: 1   Cлайдер пофиксить +
  TODO: 3   Артикул поменьше +
  TODO: 4   Популярные товары на мобильной версии херятся +
  TODO: 6   Популярное => новинки +
  TODO: 7   Новинки тайлик у товара неправильно вырисовывается +
  */
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SwiperList />
        <UnderSwiperCards />
        <PopularItems />
        <Media
          queries={{
            telephone: "(max-width: 1024px)",
            computer: "(min-width: 1025px)",
          }}
        >
          {(matches) => <>{matches.computer ? <Tiles /> : <TilesMobile />}</>}
        </Media>
        <UnderTilesLogos />
        <Catalog />
      </QueryClientProvider>
    </>
  );
};

export default Home;
