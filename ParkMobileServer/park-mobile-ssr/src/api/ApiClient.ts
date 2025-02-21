import { CardItemDTO } from "@/Entities/CardItemDTO";
import { RepairRequestType } from "@/hooks/useAddRepairRequest";
import { TradeInType } from "@/Store/TradeInStore";
import { CardItemType, CardType, RecivedCardDataType } from "@/Types/CardType";
import { RecivedCardDataAdminType } from "@/Types/CardTypeAdmin";
import { GetAdressesCDEKParams, GetAdressesCDEKResponse, GetLocationsCDEKResponse, SdekAutorizeResponse, SdekPostTypeBase } from "@/Types/CDEK";
import { GetItemByNameType } from "@/Types/GetItemByName";
import { GetItemsMainMenuType } from "@/Types/GetItemsMainMenu";
import { GetItemType } from "@/Types/GetItemType";
import { Order, OrderStatusChangeRequest } from "@/Types/Order";
import { OrderItem } from "@/Types/OrderItem";
import { SearchItemsResponseType } from "@/Types/SearchItemShortType";
import { SliderResponse } from "@/Types/SliderResponse";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export type AuthorizationType = {userName: string, password: string}

const AUTORIZATIONS_PATH = `https://parkmobile.store/api/api/Autorization`;
const POSTGRE_ITEMS_PATH = `https://parkmobile.store/api/api/ItemsPostgre`;
const CDKEK_PATH_LOCAL = "https://parkmobile.store/api/api/Cdek";
const ORDERS_ITEMS_PATH = "https://parkmobile.store/api/api/Order";
export const SIGNAL_R_ORDERS = "https://parkmobile.store/api/OrdersHub"; 

// const AUTORIZATIONS_PATH = `http://localhost:3001/api/Autorization`;
// const POSTGRE_ITEMS_PATH = `http://localhost:3001/api/ItemsPostgre`;
// const ORDERS_ITEMS_PATH = "http://localhost:3001/api/Order";
// const CDKEK_PATH_LOCAL = "http://localhost:3001/api/Cdek";
// export const SIGNAL_R_ORDERS = "http://localhost:3001/OrdersHub"; 

// const CDEK_PATH = `https://api.cdek.ru/v2`;

class ApiClient {
    client: AxiosInstance;
    authClient: AxiosInstance;
    cdekClient: AxiosInstance;
    sessionToken: string | null;

    constructor() {
        this.client = axios.create({
            headers: {
                "Content-Type": "application/json"
            },
        });
        this.authClient = axios.create()
        this.cdekClient = axios.create({
            headers: {
                "Content-Type": "application/json"
            }
        })
        // this.sessionToken = localStorage.getItem("sessionToken") ?? null; //TODO: с этой строчкой потом можно добавить запоминание сессии
        this.sessionToken = null;
    }
    
    async Login({ userName, password }: AuthorizationType): Promise<AxiosResponse<unknown, unknown>> {
        try {
            const loginResponse = await this.authClient.post(`${AUTORIZATIONS_PATH}/login`, {
                Username: userName,
                Password: password
            })
            
            if (loginResponse.status && loginResponse.data) {
                this.sessionToken = loginResponse.data;
                this.authClient.defaults.headers.common["Authorization"] = `Bearer ${this.sessionToken}`
            }
            return loginResponse;
        }
        catch (error) {
            throw error;
        }
    }

    async AutorizeCDEK() {
        try {
            const loginCDEKResponse = await this.cdekClient.get<SdekAutorizeResponse>(`${CDKEK_PATH_LOCAL}/autorize`)

            const {access_token, expires_in} = loginCDEKResponse.data;
            
            this.cdekClient.defaults.headers.common["Authorization"] = `Bearer ${access_token}`
            setTimeout(() => {
                this.cdekClient.defaults.headers.common["Authorization"] = null
            }, expires_in * 1000)
        }
        catch (error) {
            throw error;
        }
    }

    Logout() {
        this.authClient.defaults.headers.common["Authorization"] = null;
        this.sessionToken = null;
        localStorage.setItem("sessionToken", "");
    }

    async Register({userName, password}: AuthorizationType) {
        const response = await this.authClient.post(`${AUTORIZATIONS_PATH}/register`, {
            Username: userName,
            PasswordHash: password
        })
        return response.data;
    }

    async GetItems(item: GetItemsMainMenuType) {
        const response = await this.client.post<RecivedCardDataType>(`${POSTGRE_ITEMS_PATH}/GetItems`, item);
        return response.data;
    }

    async GetItemsByHeader(skip: number, take: number, category: string, items: string) {
        const response = await axios.post<RecivedCardDataType>(`${POSTGRE_ITEMS_PATH}/GetCategoryItems`, {
            skip: skip,
            take: take,
            query: `${category}/${items}`
        })
        return response.data
    }

    async GetItemsAdmin(skip: number, take: number, searchKeyWord: string = "") {
        const response = await this.client.get<RecivedCardDataAdminType>(
            `${POSTGRE_ITEMS_PATH}/GetItemsForAdmin`, {
                params: {
                    skip: skip,
                    take: take,
                    name: searchKeyWord
                }
            });
        return response.data;
    }

    async GetPopularItems() {
        const response = await this.client.get<CardType[]>(`${POSTGRE_ITEMS_PATH}/GetPopularItems`);
        return response.data;
    }

    async GetFilteredItems(item: GetItemType) {
        const response = await this.client.post<RecivedCardDataType>(`${POSTGRE_ITEMS_PATH}/GetFilteredItems`, item);
        return response.data;
    }

    async GetSearchItems(item: GetItemByNameType) {
        const response = await this.client.post<SearchItemsResponseType>(`${POSTGRE_ITEMS_PATH}/GetItemsByName`, item)
        return response.data;
    }

    async GetItem(id: number) {
        const response = await this.client.post<CardItemType>(
            `${POSTGRE_ITEMS_PATH}/GetItem/${id}`
        );
        return response.data;
    }

    async GetSliderDataAdmin() {
        const response = await this.client.post<SliderResponse[]>(`${POSTGRE_ITEMS_PATH}/sliderImagesAdmin`);
        return response.data
    }

    async GetSliderData() {
        const response = await this.client.post<SliderResponse[]>(`${POSTGRE_ITEMS_PATH}/sliderImages`);
        return response.data
    }

    async GetMobileSliderData() {
        const response = await this.client.get<SliderResponse[]>(`${POSTGRE_ITEMS_PATH}/MobileSliderImages`);
        return response.data;
    }

    async DeleteSliderData(id: number) {
        const response = await this.authClient.delete(`${POSTGRE_ITEMS_PATH}/sliderImage/${id}`);
        return response;
    }

    async PostSliderData(form: FormData) {
        const response =  await this.authClient.postForm(`${POSTGRE_ITEMS_PATH}/upload`, form)
        return response
    }

    async PostCall(number: string) {
        const response = await this.client.post(`${POSTGRE_ITEMS_PATH}/TelephoneCall/${number}`)
        return response.data;
    }

    async PostOrderItem(item: OrderItem) {
        const response = await this.client.post(`${POSTGRE_ITEMS_PATH}/OrderItemRequest`, item)
        return response.data;
    }

    async OrderData(values: object) {
        const response = await this.client.post(`${POSTGRE_ITEMS_PATH}/orderData`, values)
        return response.data
    }

    async TradeIn(tradeInRequest: TradeInType) {
        const response = await this.client.post(`${POSTGRE_ITEMS_PATH}/TradeInRequest`, tradeInRequest)
        return response.data;
    }

    async RepairRequest(request: RepairRequestType) {
        const response = await this.client.post(`${POSTGRE_ITEMS_PATH}/RepairRequest`, request)
        return response.data
    }

    async AddItem(item: Omit<CardItemDTO, "id">) {
        const response = await this.authClient.post(`${POSTGRE_ITEMS_PATH}/CreateItem`, item);
        return response.data;
    }

    async UpdateItem(item: CardItemDTO) {
        const response = await this.authClient.post(`${POSTGRE_ITEMS_PATH}/ChangeItem`, item);
        return response.data;
    }

    async DeleteItem(id: number) {
        const response = await this.authClient.delete(`${POSTGRE_ITEMS_PATH}/DeleteItem/${id}`)
        return response.data;
    }

    async UpdatePhoto(formData: FormData) {
        const response = await this.authClient.postForm(`${POSTGRE_ITEMS_PATH}/updatePhoto`, formData);
        return response.data;
    }

    async GetBrands() {
        const response = await this.client.get(`${POSTGRE_ITEMS_PATH}/GetBrands`)
        return response.data;
    }

    async PostBrand(name: string) {
        const response = await this.authClient.post(`${POSTGRE_ITEMS_PATH}/CreateBrand`, {name})
        return response.data
    }

    async GetCategories() {
        const response = await this.client.get(`${POSTGRE_ITEMS_PATH}/GetCategories`)
        return response.data;
    }

    async PostCategory(name: string) {
        const response = await this.authClient.post(`${POSTGRE_ITEMS_PATH}/CreateCategory`, {name})
        return response.data
    }

    async GetFilters() {
        const response = await this.client.get(`${POSTGRE_ITEMS_PATH}/GetFilters`);
        return response.data;
    }

    async PostFilter(name: string) {
        const response = await this.authClient.post(`${POSTGRE_ITEMS_PATH}/CreateFilter`, {name: name})
        return response.data;
    }

    //#region SDEK
    async GetAdressesCDEK(data: GetAdressesCDEKParams)  {
        const response = await this.cdekClient.get<GetAdressesCDEKResponse[]>(`${CDKEK_PATH_LOCAL}/Addresses`, {
            params: data
        })
        return response.data;
    }

    async PostCDEKForm(data: SdekPostTypeBase) {
        const response = await this.cdekClient.post(`${CDKEK_PATH_LOCAL}/PostOrder`, data);
        return response.data;
    }

    async PostRefusalCDEK(uuid: string)  {
        const response = await this.cdekClient.post(`${CDKEK_PATH_LOCAL}/Refusal`, null, {
            params: {
                uuid
            }
        })
        return response.data;
    }

    async DeleteOrderCDEK(uuid: string)  {
        const response = await this.cdekClient.delete(`${CDKEK_PATH_LOCAL}/DeleteOrder`, {
            params: {
                uuid
            }
        })
        return response.data;
    }

    async GetLocationsCDEK(name: string)  {
        const response = await this.cdekClient.post<GetLocationsCDEKResponse[]>(`${CDKEK_PATH_LOCAL}/Locations`, {
            name
        })
        return response.data;
    }

    // async GetRegions() {
    //     const response = await this.cdekClient.get(`${CDEK_PATH}/location/regions`)
    //     return response.data;
    // }

    // async GetCityCodeByName(name: string) {
    //     const response = await this.cdekClient.get(`${CDEK_PATH}/location/suggest/cities`, {
    //         params: {
    //             name
    //         }
    //     })
    //     return response.data;
    // }

    // async GetCDEKInformationByIm (data: GetCDEKInformationByImType) {
    //     const response = await this.cdekClient.get(`${CDEK_PATH}/orders`, {
    //         params: data
    //     });
    //     return response.data;
    // }

    // async GetCDEKInformationByUuid (uuid: string) {
    //     const response = await this.cdekClient.get(`${CDEK_PATH}/orders/${uuid}`);
    //     return response.data;
    // }

    // async PostCDEKClientReturn(uuid: string, tariff_code: number) {
    //     const response = await this.cdekClient.post(`${CDEK_PATH}/orders/${uuid}/clientReturn`, tariff_code);
    //     return response.data;
    // }

    // async PostCDEKRefuse(uuid: string) {
    //     const response = await this.cdekClient.post(`${CDEK_PATH}/orders/${uuid}/refusal`);
    //     return response.data
    // }

    // async PostCDEKDeliveryCalculatorPrice(data: PostCDEKDeliveryPriceType) {
    //     const response = await this.cdekClient.post(`${CDEK_PATH}/calculator/tarifflist`, data);
    //     return response.data
    // }

    // async PostCDEKDeliveryCalculatorTariff(data: PostCDEKDeliveryTariffType) {
    //     const response = await this.cdekClient.post(`${CDEK_PATH}/calculator/tariff`, data);
    //     return response.data
    // }

    //#endregion SDEK

    //#region Orders
    async GetOrders() {
        const response = await this.authClient.get<Omit<Order, "Client" | "Items">[]>(`${ORDERS_ITEMS_PATH}/Orders`)
        return response.data
    }

    async GetOrderById(id: number) {
        const response = await this.authClient.post<Order>(`${ORDERS_ITEMS_PATH}/GetOrderById`, null, {
            params: {
                id
            }
        })
        return response.data;
    }

    async PostOrder(order: Order) {
        const response = await this.client.post(`${ORDERS_ITEMS_PATH}/PostOrder`, order)
        return response.data;
    }

    async DeleteOrder(id: number) {
        const response = await this.authClient.delete(`${ORDERS_ITEMS_PATH}/DeleteOrderById/${id}`)
        return response.data;
    }

    async ChangeOrderStatus(data: OrderStatusChangeRequest) {
        const response = await this.authClient.post(`${ORDERS_ITEMS_PATH}/ChangeOrderStatus`, data)
        return response.data;
    }
    //#endregion
}

export const apiClient = new ApiClient;