import { useInventory } from "../../application/hooks/useInventory";
import { InventoryItem } from "../components/InventoryItem";
import cx from "./Inventory.module.scss";

export const Inventory = () => {
  const { inventory, isLoading } = useInventory();

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <ul className={cx.list}>
      {inventory.map((item) => (
        <InventoryItem key={item.id} item={item} />
      ))}

      <div className={cx.spacing} />
    </ul>
  );
};
