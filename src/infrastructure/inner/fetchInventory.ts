import { getInventory } from "../outer/api/getInventory";
import type { InventoryItem } from "@/types/types";

export const fetchInventory = async () => {
  const response = await getInventory();
  const sectors = response.data;

  const inventory: InventoryItem[] = sectors.flatMap((sector) =>
    sector.items.map((item) => ({
      id: item.id,
      type: item.type,
      brand: item.brand,
      model: item.model,
      fragility: item.fragility,
      lastMaintenance: mapLastMaintenance(item.last_maintenance),
      sector: sector.sector,
    }))
  );

  return inventory;
};

const mapLastMaintenance = (lastMaintenance: {
  day: number;
  month: number;
  year: number;
}) => {
  const { day, month, year } = lastMaintenance;

  return new Date(year, month, day);
};
