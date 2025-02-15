"use client"
import { AddressesAtom } from "@/Store/AddressesStore";
import { CdekPointType } from "@/Types/CDEK";
import { Map, YMaps, Placemark } from "@pbe/react-yandex-maps";
import { Form, Input } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const SdekComponent = () => {
  const [ addresses ] = useAtom(AddressesAtom);
  const [ userCoords, setUserCoords ] = useState<{longitude: number, latitude: number}>({latitude: 0, longitude: 0})
  const [ selectedIndex, setSelectedIndex ] = useState<number>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      setUserCoords({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      })
    });
  }, [])

  const handlePlacemarkClick = (event: CdekPointType, number: number) => {
    setSelectedIndex(number)
    const selectedItem = addresses?.find(item => item.location.latitude === event.originalEvent.target.geometry._coordinates.at(0))
    setUserCoords(prev => ({latitude: selectedItem?.location.latitude ?? prev.latitude, longitude: selectedItem?.location.longitude ?? prev.longitude}))
  }
  
  return (
    <>
      <YMaps>
        <div>
          <Form.Item name="postmat">
            <Input type="text" placeholder="Выберите пункт получения" />
          </Form.Item>
        </div>
        <Map
          key={`${addresses?.length}-${selectedIndex}`}
          defaultState={{
            center: [userCoords.latitude, userCoords.longitude],
            zoom: 14,
          }}
          width="100%"
          height="360px"
          onLoad={(ymaps) => {
            console.log(ymaps);
          }}
        >
          {
            addresses?.map((address, index) => 
              <Placemark
                key={index}
                geometry={[address.location.latitude, address.location.longitude]}
                // properties={{ iconContent: "ПВЗ" }}
                options={{ preset: `islands#${selectedIndex === index ? "red" : "green"}DotIcon` }}
                onClick={(event: CdekPointType) => handlePlacemarkClick(event, index)}
              />)
          }
        </Map>
        <div style={{ marginTop: "10px" }}>
          <Form.Item
            name="reciver"
            rules={[
              {
                required: true,
                message: "Пожалуйста, заполните получателя!",
              },
            ]}
          >
            <Input type="text" placeholder="Получатель: Иванов Иван Иванович" />
          </Form.Item>
        </div>
        <div>
          <Form.Item name="description">
            <Input type="text" placeholder="Комментарий к заказу" />
          </Form.Item>
        </div>
      </YMaps>
    </>
  );
};
