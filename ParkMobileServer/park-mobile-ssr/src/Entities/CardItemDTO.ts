export type CardItemDTO = {
    id: number;
    name: string,
    price: string,
    article?: string,
    image?: string,
    discountPrice?: string;
    description?: string,
    stock: number,
    categoryId: number,
    itemBrandId: number,
    options?: string,
    isPopular?: boolean,
    isNewItem?: boolean,
}