import { atom } from 'jotai'

export const categoryDictionary = new Map([
    ["Все", ""],
    ["iPhone", "Iphone"],
    ["iPad", "Ipad"],
    ["Watch", "Watch"],
    ["Mac", "Mac"],
    ["Airpods", "Airpods"],
    ["Аксессуары", "Accessories"],
    ["Гаджеты", "Gadgets"],
    ["Аудио", "Audio"],
    ["Смартфоны", "Phones"],
    ["Гейминг", "Gaming"],
    ["Красота и здоровье", "Health"],
    ["TV и Дом", "Tv"],
    ["Популярное", ""]
])

export const categoryAtom = atom<string>();