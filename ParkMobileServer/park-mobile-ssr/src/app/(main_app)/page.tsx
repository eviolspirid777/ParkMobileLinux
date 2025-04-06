// import { Catalog } from "@/Components/Catalog/Catalog";
import { UnderTilesLogos } from "@/Components/UnderTilesLogos/UnderTilesLogos";
import { PopularItems } from "@/Components/PopularItems/PopularItems";
import { SwiperList } from "@/Components/Swiper/Swiper";
// import { UnderSwiperCards } from "@/Components/UnderSwiperCards/UnderSwiperCards";
import { CustomQueryProvider } from "@/Shared/Components/CustomQueryProvider/CustomQueryProvider";
import { TilesWrapper } from "@/Components/Tiles/TilesWrapper/TilesWrapper";
import { AboutMainPage } from "@/Components/AboutMainPage/AboutMainPage";
// import { Comments } from "@/Components/Comments/Comments";

export const revalidate = 3600

const Home = async () => {
  return (
    <>
      <CustomQueryProvider>
        <SwiperList/>
        {/* <UnderSwiperCards /> */}
        <UnderTilesLogos />
        <PopularItems />
        <TilesWrapper />
        <AboutMainPage />
        {/* <Catalog /> */}
        {/* <Comments /> */}
      </CustomQueryProvider>
    </>
  );
};

export default Home;
