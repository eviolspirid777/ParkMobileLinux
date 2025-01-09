"use client"
import { ShopBucket } from "@/Components/ShopBucket/ShopBucket"
import { MobileHeader } from "../MobileHeader/MobileHeader"
import { TradeInModal } from "@/Components/Help/TradeInComponent/TradeInModal/TradeInModal"
import { RepairModal } from "@/Components/Help/RepairModal/RepairModal"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { RepairRequestType, useAddRepairRequest } from "@/hooks/useAddRepairRequest"
import { searchedItemsAtom } from "@/Store/SearchedItemsStore"
import { useAtom } from "jotai"

export const MobileHeaderBlock = () => {
  const navigate = useRouter();

  const [, setIsHeaderMenuVisible] = useState(false);
  const [, setIsContentVisible] = useState(false);

  const [deviceFixOpen, setDeviceFixOpen] = useState(false);
  const [tradeInOpen, setTradeInOpen] = useState(false);

  const {mutateAsync} = useAddRepairRequest();

  const handleSubmitData = async (values: RepairRequestType) => {
    await mutateAsync(values);
  }

  const [, setSearchedItems] = useAtom(searchedItemsAtom);

  const [open, setOpen] = useState(false);

  const handleMouseLeave = () => {
    setIsContentVisible(false);
    setSearchedItems([]);
    setTimeout(() => {
      setIsHeaderMenuVisible(false);
    }, 800);
  };

  const handleMainMenu = () => {
    navigate.push("/");
    handleMouseLeave();
  };

  const handleShopBag = () => {
    setOpen((previousState) => !previousState);
  };

  return (
    <>
      <MobileHeader
        handleMainMenuRoute={handleMainMenu}
        handleShopBag={handleShopBag}
        setDeviceFixOpen={setDeviceFixOpen.bind(null, true)}
        setTradeInOpen={setTradeInOpen.bind(null, true)}
      />
      <ShopBucket
        open={open}
        handleShopBag={handleShopBag}
      />
      <TradeInModal
        handleClose={setTradeInOpen.bind(this, false)}
        open={tradeInOpen}
      />
      <RepairModal
        handleClose={setDeviceFixOpen.bind(this, false)}
        submitData={handleSubmitData}
        open={deviceFixOpen}
      />
    </>
  )
}