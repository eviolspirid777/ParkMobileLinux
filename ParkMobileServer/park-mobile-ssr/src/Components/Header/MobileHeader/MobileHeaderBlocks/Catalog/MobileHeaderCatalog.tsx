import { FC } from "react";

type MobileHeaderCatalogProps = {
  handlePath: (path: string) => void;
};

export const MobileHeaderCatalog: FC<MobileHeaderCatalogProps> = ({
  handlePath,
}) => {
  return (
    <ul>
      <nav onClick={handlePath.bind(this, "/categories/Apple")}>Apple</nav>
      <nav onClick={handlePath.bind(this, "/categories/Samsung")}>Samsung</nav>
      <nav onClick={handlePath.bind(this, "/categories/Xiaomi")}>Xiaomi</nav>
      <nav onClick={handlePath.bind(this, "/categories/Dyson")}>Dyson</nav>
      <nav onClick={handlePath.bind(this, "/categories/Headphones")}>
        Акустика и гарнитура
      </nav>
      <nav onClick={handlePath.bind(this, "/categories/Gaming")}>Гейминг</nav>
    </ul>
  );
};
