export type CardItemDTO = {
    id: number;
    name: string,
    price: number,
    discountPrice?: number,
    article?: string,
    image?: string,
    description?: string,
    stock: number,
    categoryId: number,
    brandId: number,
    options?: string,
    isPopular?: boolean,
    isNewItem?: boolean,
    isInvisible?: boolean,
    filters?: string[],
}