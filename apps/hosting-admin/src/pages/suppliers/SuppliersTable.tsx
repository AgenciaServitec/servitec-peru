import React from "react";
import type { Supplier } from "../../globalTypes.ts";

interface SuppliersTableProps {
  suppliers: Supplier[];
  suppliersLoading: boolean | undefined;
}

export const SuppliersTable: React.FC<SuppliersTableProps> = ({
  suppliers,
  suppliersLoading,
}) => {
  if (suppliersLoading) {
    return <div>Cargando proveedores...</div>;
  }

  return (
    <div>
      {suppliers.map((supplier) => (
        <div key={supplier.id}>
          {supplier.fullName} - {supplier.company.ruc}
        </div>
      ))}
    </div>
  );
};
