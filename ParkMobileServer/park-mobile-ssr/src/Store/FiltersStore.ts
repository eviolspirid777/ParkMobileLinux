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
    ["Новинки", "New"]
])

export const subCategoryDictionary = new Map([
    ["apple watch", "watches"],
    ["apple tv", "tv"],
    ["смартфоны", "phones"],
    ["наушники", "headphones"],
    ["умные часы", "watches"],
    ["тв приставки", "tv"],
    ["стайлеры", "styler"],
    ["фены", "hairdryer"],
    ["выпрямители", "rectifier"],
    ["пылесосы", "vacuumcleaner"],
    ["очистители воздуха", "airpurifiers"],
    ["яндекс станции", "yandex"],
    ["jbl", "jbl"],
    ["marshall", "marshall"],
    ["sony", "sony"],
    ["xbox", "microsoft"],
    ["nintendo", "nintendo"],
    ["steam deck", "steam"],
    ["аксессуары", "accessories"]
])

export const categoryAtom = atom<string>();