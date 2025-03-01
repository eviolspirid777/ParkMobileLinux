"use client"
import { AddressesAtom } from "@/Store/AddressesStore";
import { deliveryPointAtom } from "@/Store/DeliveryPoint";
import { shopBucketAtom } from "@/Store/ShopBucket";
import { CdekPointType } from "@/Types/CDEK";
import { Map, YMaps, Placemark } from "@pbe/react-yandex-maps";
import { Form, Input, Select } from "antd";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { BaseShopBucketFormData } from "../BaseShopBucketFormData";
import { debounce } from "@/Shared/Functions/debounce";
import { apiClient } from "@/api/ApiClient";

type YandexSuggestType = {
  title: {
    text: string
  },
  subtitle: {
    text: string
  }
}

export const SdekComponent = () => {
  const [ addresses, setAddresses ] = useAtom(AddressesAtom);
  const [ userCoords, setUserCoords ] = useState<{longitude: number, latitude: number}>({ latitude: 0, longitude: 0 })
  const [ selectedItem, setSelectedItem ] = useAtom(deliveryPointAtom);
  const [ shopBucket ] = useAtom(shopBucketAtom);
  const [cityOptions, setCityOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [cities, setCities] = useState<{ city: string, street: string }[]>();

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

  const handleSelect = (_: unknown, newValue: {label: string, value: string}) => {
    const city = cities?.find(item => item.street === newValue.label)?.city
    handleAddresses(city ?? newValue.label)
  }

  const handleChange = (value: string) => {
    debouncedFetchSuggestions(value);
  };

  const handleAddresses = async (value: string) => {
    debounceAddresses(value)
  }

  const debounceAddresses = 
  debounce(async (searchTerm: string) => {
    await apiClient.AutorizeCDEK()
    const locations = await apiClient.GetLocationsCDEK(searchTerm);
    const foundCode = locations.at(0)?.code
    const adresses = await apiClient.GetAdressesCDEK({ CityCode: foundCode })
    setAddresses(adresses)
  }, 1000);

  const debouncedFetchSuggestions = 
    debounce(async (searchTerm: string) => {
      await fetchSuggestions(searchTerm);
    }, 1000);

  const fetchSuggestions = async (searchTerm: string) => {
    if (!searchTerm) {
      setCityOptions([]); // Очистка при пустом вводе
      return;
    }

    try {
      const response = await fetch(
        `https://suggest-maps.yandex.ru/v1/suggest?apikey=8ab2e2a3-2ca6-491b-8ef3-5687f909f24c&text=${searchTerm}&lang=ru&results=10`
      );
      const data = await response.json();

      if (data.results) {
        const arr = data.results.map(
          (el: YandexSuggestType, index: number) => ({
            label: el.title.text,
            value: `${index}|||${el.title.text}`,
          })
        );
        const cities = data.results.map(
          (el: YandexSuggestType) => ({
            city: el.subtitle.text,
            street: el.title.text
          })
        )
        setCities(cities);
        setCityOptions(arr);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  return (
    <>
      <YMaps>
        <div>
          <Form.Item
            name="city"
            rules={[
              {
                required: true,
                message: "Пожалуйста, выберите город!",
              },
            ]}
          >
            <Select
              options={cityOptions}
              showSearch
              onSearch={handleChange}
              onSelect={handleSelect}
              filterOption={() => true}
              placeholder="Укажите адрес доставки"
              style={{ height: "38px" }}
            />
          </Form.Item>
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
        </Map>
        <BaseShopBucketFormData />
        <div>
          <Form.Item name="description">
            <Input type="text" placeholder="Комментарий к заказу" />
          </Form.Item>
        </div>
      </YMaps>
    </>
  );
};
