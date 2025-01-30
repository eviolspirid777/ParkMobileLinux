export type CardTypeAdmin = {
    key: number,
    name: string,
    article: string,
    count: number,
    price: string,
    discountPrice?: string,
    description?: string,
    image: string;
    stock?: number;
    id?: number;
    isPopular: boolean;
    isNewItem: boolean;
    isInvisible: boolean;
    brandId?: number;
    categoryId?: number;
    filters?: {id: number, name: string}[]
}

export type RecivedCardDataAdminType = {
    items: CardTypeAdmin[],
    count: number
}