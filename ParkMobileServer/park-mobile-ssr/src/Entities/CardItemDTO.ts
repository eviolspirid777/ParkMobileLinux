export type CardItemDTO = {
    id: number;
    name: string,
    price: string,
    article?: string,
    image?: string,
    discountPrice?: string,
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