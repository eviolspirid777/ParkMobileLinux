import { FC } from "react";

type MobileHeaderAboutProps = {
  handlePath: (path: string) => void;
};

export const MobileHeaderAbout: FC<MobileHeaderAboutProps> = ({
  handlePath,
}) => {
  return (
    <ul>
      <nav onClick={handlePath.bind(this, "/about/contacts")}>
        Адреса магазинов
      </nav>
      <nav onClick={handlePath.bind(this, "/about/contacts")}>Контакты</nav>
      <nav onClick={handlePath.bind(this, "/about/contacts")}>
        Обратная связь
      </nav>
    </ul>
  );
};
