import { CardItemDTO } from "@/Entities/CardItemDTO";
import { RepairRequestType } from "@/hooks/useAddRepairRequest";
import { TradeInType } from "@/Store/TradeInStore";
import { CardItemType, CardType, RecivedCardDataType } from "@/Types/CardType";
import { RecivedCardDataAdminType } from "@/Types/CardTypeAdmin";
import { GetItemByNameType } from "@/Types/GetItemByName";
import { GetItemsMainMenuType } from "@/Types/GetItemsMainMenu";
import { GetItemType } from "@/Types/GetItemType";
import { OrderItem } from "@/Types/OrderItem";
import { SearchItemsResponseType } from "@/Types/SearchItemShortType";
import { SliderResponse } from "@/Types/SliderResponse";
import axios, { AxiosInstance, AxiosResponse } from "axios";

export type AuthorizationType = {userName: string, password: string}

const AUTORIZATIONS_PATH = `https://parkmobile.store/api/api/Autorization`
const POSTGRE_ITEMS_PATH = `https://parkmobile.store/api/api/ItemsPostgre`
// const AUTORIZATIONS_PATH = `http://localhost:3001/api/Autorization`
// const POSTGRE_ITEMS_PATH = `http://localhost:3001/api/ItemsPostgre`

class ApiClient {
    client: AxiosInstance;
    authClient: AxiosInstance;
    sessionToken: string | null;

    constructor() {
        this.client = axios.create({
            headers: {
                "Content-Type": "application/json"
            },
        });
        this.authClient = axios.create()
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
}

export const apiClient = new ApiClient;