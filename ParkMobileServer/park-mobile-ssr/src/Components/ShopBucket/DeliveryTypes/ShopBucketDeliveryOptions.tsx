import { KrasnodarDelivery } from "./KrasnodarDelivery/KrasnodarDelivery";
import { SdekComponent } from "./sdek/SdekComponent";
import { SelfDeliveryComponent } from "./SelfDelivery/SelfDeliveryComponent";

export const deliveryOptions = new Map([
  ["sdek-delivery", () => <SdekComponent />],
  ["krasnodar-self-delivery", () => <SelfDeliveryComponent />],
  ["krasnodar-delivery", () => <KrasnodarDelivery />],
]);
