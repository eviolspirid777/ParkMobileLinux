export type SearchItemShortType = {
    id?: number,
    name: string,
    price: string,
    discountPrice: string,
    image: string
}

export type SearchItemsResponseType = {
    items: SearchItemShortType[],
    count: number
}