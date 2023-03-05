import { createContext, useMemo } from "react";
import { useEffect, useState } from "react";
import { fetchInventory } from "../../infrastructure/inner/fetchInventory";

export const InventoryContext = createContext(undefined);

export const InventoryProvider = ({ children }) => {
  const [inventory, setInventory] = useState(undefined);

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
