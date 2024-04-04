import { GetServerSideProps } from "next";
import { InventoryItem } from "../../ui/components/InventoryItem";
import cx from "./Inventory.module.scss";
import { fetchInventory } from "@/infrastructure/inner/fetchInventory";
import type {
  InventoryItem as InventoryItemT,
  SerializedInventoryItem,
} from "@/types/types";

export const getServerSideProps: GetServerSideProps = async () => {
  const inventoryItem: InventoryItemT[] = await fetchInventory();
  const serializedInventory: SerializedInventoryItem[] = inventoryItem.map(
    (item) => ({
      ...item,
      lastMaintenance: item.lastMaintenance.toISOString(),
    })
  );

  return {
    props: { serializedInventory },
  };
};

type InventoryProps = {
  serializedInventory: SerializedInventoryItem[];
};

const Inventory = ({ serializedInventory }: InventoryProps) => {
  const inventory = serializedInventory.map((item) => ({
    ...item,
    lastMaintenance: new Date(item.lastMaintenance),
  }));

  return (
    <ul className={cx.list}>
      {inventory.map((item) => (
        <InventoryItem
          key={item.id}
          item={item}
        />
      ))}

      <div className={cx.spacing} />
    </ul>
  );
};

export default Inventory;
