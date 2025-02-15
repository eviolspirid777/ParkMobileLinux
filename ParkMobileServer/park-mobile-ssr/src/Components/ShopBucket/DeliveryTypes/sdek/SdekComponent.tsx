"use client"
import { AddressesAtom } from "@/Store/AddressesStore";
import { shopBucketAtom } from "@/Store/ShopBucket";
import { CdekPointType, GetAdressesCDEKResponse } from "@/Types/CDEK";
import { Map, YMaps, Placemark } from "@pbe/react-yandex-maps";
import { Form, Input } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

export const SdekComponent = () => {
  const [ addresses ] = useAtom(AddressesAtom);
  const [ userCoords, setUserCoords ] = useState<{longitude: number, latitude: number}>({ latitude: 0, longitude: 0 })
  const [ selectedItem, setSelectedItem ] = useState<GetAdressesCDEKResponse>();

  const [ shopBucket ] = useAtom(shopBucketAtom);

  useEffect(() => {
    if(shopBucket.length === 0) {
      setSelectedItem(undefined);
      navigator.geolocation.getCurrentPosition((data) => {
        setUserCoords({
          latitude: data.coords.latitude,
          longitude: data.coords.longitude
        })
      });
    }
  }, [shopBucket])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((data) => {
      setUserCoords({
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      })
    });
  }, [])

  const handlePlacemarkClick = (event: CdekPointType) => {
    const _selectedItem = addresses?.find(item => item.location.latitude === event.originalEvent.target.geometry._coordinates.at(0) && item.location.longitude === event.originalEvent.target.geometry._coordinates.at(1))
    setSelectedItem(_selectedItem);
    setUserCoords(prev => ({ latitude: _selectedItem?.location.latitude ?? prev.latitude, longitude: _selectedItem?.location.longitude ?? prev.longitude }))
  }

  return (
    <>
      <YMaps>
        <div>
          <Form.Item
            name="postmat"
          >
            <span style={{display: "none"}}>{selectedItem?.location.address_full}</span>
            <Input
              type="text"
              placeholder="Пункт получения"
              value={selectedItem?.location.address_full}
              disabled
            />
          </Form.Item>
        </div>
        {
          userCoords.latitude !== 0 && userCoords.longitude !== 0 ?
          <Map
            key={`${addresses?.length}-${userCoords.latitude}`}
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
                  options={{ preset: `islands#${userCoords.latitude === address.location.latitude && userCoords.longitude === address.location.longitude ? "red" : "green"}DotIcon` }}
                  onClick={(event: CdekPointType) => handlePlacemarkClick(event)}
                />)
            }
          </Map> : 
          null
        }
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
