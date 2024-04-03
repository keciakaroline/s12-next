import { createContext, useMemo } from "react";
import { useEffect, useState } from "react";
import { fetchInventory } from "../../infrastructure/inner/fetchInventory";
import type { InventoryItem, FragilityLevel } from "../../types/types";
import { ReactNode } from "react";

export const InventoryContext = createContext<
  { inventory: InventoryItem[] } | undefined
>(undefined);

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  useEffect(() => {
    fetchInventory().then((data) => setInventory(data));
  }, []);

  const value = useMemo(
    () => ({
      inventory,
    }),
    [inventory]
  );

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
};
