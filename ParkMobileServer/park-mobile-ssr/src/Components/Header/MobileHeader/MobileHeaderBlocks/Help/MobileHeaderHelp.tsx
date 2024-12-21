import { FC } from "react";

type MobileHeaderHelpProps = {
  handlePath: (path: string) => void;
};

export const MobileHeaderHelp: FC<MobileHeaderHelpProps> = ({ handlePath }) => {
  return (
    <ul>
      <nav onClick={handlePath.bind(this, "/help/delivery")}>
        Доставка и оплата
      </nav>
      <nav onClick={handlePath.bind(this, "/help/gurantee")}>Гарантии</nav>
      <nav onClick={handlePath.bind(this, "/help/trade-in")}>Trade-in</nav>
      <nav onClick={handlePath.bind(this, "/help/credit")}>
        Рассрочка и кредит
      </nav>
    </ul>
  );
};
