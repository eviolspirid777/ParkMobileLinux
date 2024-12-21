"use client";
import { InputFileComponent } from "@/Components/InputFileComponent/InputFileComponent";
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

  //TODO: ReadMore.js: https://jedfoster.com/Readmore.js/  для подробнее...
  //TODO: Сделать возможность загрузки фоток в слайдер(ну это уже необязательно)
  //TODO: Добавить заявку на ремонт в мобильную версию
  //TODO: Большую кнопку (отправить заявку) на трейд-ин. И там шаги с заполнением + отправка сообщения в тг +
  //TODO: Заявка на ремонт(модалка с названием товара и описанием проблемы) +
  //TODO: Заявка на трейд-ин(перекидывает на модалку с шагами) и заявка на ремонт(простая форма) +
  //TODO: В мобильной версии следлать слайдер вместо четырех плашек этих +

  //TODO: Убрать надпись ГАРАНТИЯ +
  //TODO: Сделать вариант добавления тайлика ГАРАНТИЯ (ЭТО УБИРАЕМ) +
  //TODO: сделать вариант навигации при выборе категории в header +
  //TODO: Сделать вариант добавления в ПОПУЛЯРНЫЕ ТОВАРЫ +
  //TODO: Нужно сделать loadingPage +
  //TODO: Нужно сделать страницу ошибки +
  //TODO: Реализовать поиск на декстопной версии и мобильной +
  //TODO: Сделать возможность добавления товара в корзину +
  //TODO: Добавить возможность выбора и добавления в корзину ПОПУЛЯРНЫХ ТОВАРОВ +
  //TODO: Сделать возможность выбора options у товара ???

  //TODO: Сделать возможность загрузки фоток в слайдер(ну это уже необязательно)
  //TODO: Добавить возможность редактирования популярных товаров +
  //TODO: Сделать возможность добавления/удаления брендов в админке +
  //TODO: Добавить поиск товаров в таблицу редактирования товаров !?!?!?!
  //TODO: Добавить выборку options у товаров ???
  //TODO: Добавить возможность добавления options у товаров ???

  /*TODO:
  9)Добавить обработку клика по товарам в категории +
  7)Реализовать цену со скидкой +
  2)Сделать по два товара в каталоге товаров +!
  3)Сделать по два товара в слайдере +!
  6)Клик по категориям в футере +!
  1)Если выбрано СДЭК, то мы убираем наличными при получении(его убрать) и добавляем вместо него ПЕРЕВОД +!
  4)Сделать по 2 раздела вот этих с apple watch, macbook pro !!!НЕ РЕАЛИЗУЕМО!!!
  
  О компании +++++
  14)Почему мобильной версии не отображается изображение +
  10)Карта в мобильной версии посередине +
  11) прижать к левому краю заголовок и текст, и уменьшить красную строку +
  13)На крестик закрывается весь поиск +
  12) Оформление кредита, цвет с зеленого на #6b6b6b +

  */
  //THEN READY TO DEPLOY!!!
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
        {/* TODO:Удали меня! Не ЗАБУДЬ! */}
        <InputFileComponent />
      </QueryClientProvider>
    </>
  );
};

export default Home;
