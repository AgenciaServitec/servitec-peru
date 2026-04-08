import { useCallback, useState } from "react";

export function useFilters<T extends object>(initialFilters: T) {
  const [filters, setFilters] = useState<T>(initialFilters);

  const handleFilterChange = useCallback((key: keyof T, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  return { filters, handleFilterChange, resetFilters, setFilters };
}
