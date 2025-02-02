import { ConfigProvider, Select } from "antd"
import { DefaultOptionType } from "antd/es/select";

import styles from "./SortSelect.module.scss"

type SortSelectProps<T> = {
  options?: DefaultOptionType[],
  onSelectChange: (value: T, option?: DefaultOptionType | DefaultOptionType[] | undefined) => void,
  size?: "large" | "small" | "middle",
  value: T | null,
}

const placeholderSelect = 
  <div
    className={styles["placeholder-block"]}
  >
    <i className="fa-solid fa-bars-sort"/>
    <span>Сортировка</span>
  </div>

const baseOptions: DefaultOptionType[] = [
  {
    label: "Название (A-Я)",
    value: "name,asc"
  },
  {
    label: "Название (Я-А)",
    value: "name,desc"
  },
  {
    label: "Цена (по возрастанию)",
    value: "price,asc"
  },
  {
    label: "Цена (по убыванию)",
    value: "price,desc"
  },
]

export const SortSelect = <T,>({
  options = baseOptions,
  onSelectChange,
  size = "middle",
  value
}: SortSelectProps<T>) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#87a08b",
        }
      }}
    >
      <Select
        options={options}
        onChange={onSelectChange}
        size={size}
        style={{
          width: "200px"
        }}
        placeholder={placeholderSelect}
        value={value}
      />
    </ConfigProvider>
  )
}