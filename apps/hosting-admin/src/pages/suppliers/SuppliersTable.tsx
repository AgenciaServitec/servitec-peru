import React, { useCallback, useMemo } from "react";
import { Space, Tag } from "antd";
import { IconAction, Table } from "../../components";
import { useNavigate } from "react-router-dom";
import {
  faEdit,
  faTrash,
  faMobileScreen,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { theme } from "../../styles";
import { isEmpty, orderBy } from "lodash";
import type { ColumnsType } from "antd/es/table";
import type { Supplier } from "../../globalTypes.ts";
import { SpecialtyOptions } from "../../data-list";

interface SuppliersTableProps {
  suppliers: Supplier[];
  suppliersLoading: boolean | undefined;
}

export const SuppliersTable: React.FC<SuppliersTableProps> = ({
  suppliers,
  suppliersLoading,
}) => {
  const navigate = useNavigate();

  const navigateTo = useCallback(
    (pathname: string) => navigate(pathname),
    [navigate]
  );

  const getSpecialtyLabel = useCallback((specialtyValue: string) => {
    const specialty = SpecialtyOptions.find(
      (opt) => opt.value === specialtyValue
    );
    return specialty ? specialty.label : specialtyValue;
  }, []);

  const sortedSuppliers = useMemo(() => {
    return orderBy(suppliers, "createAt", "desc");
  }, [suppliers]);

  const columns = useMemo<ColumnsType<Supplier>>(
    () => [
      {
        title: "Encargado",
        key: "encargado",
        dataIndex: "fullName",
        width: 140,
        render: (_, supplier) => (
          <Space align="start" direction="vertical" size={0}>
            <strong>{supplier.fullName || "-"}</strong>
            <span style={{ fontSize: "12px", color: "#666" }}>
              DNI: <strong>{supplier.document?.number || "-"}</strong>
            </span>
          </Space>
        ),
      },
      {
        title: "Empresa",
        key: "empresa",
        dataIndex: ["company", "legalName"],
        width: 140,
        render: (_, supplier) => {
          return (
            <Space align="start" direction="vertical" size={0}>
              <strong>{supplier.company?.legalName || "-"}</strong>
              <span style={{ fontSize: "12px", color: "#666" }}>
                RUC: <strong>{supplier.company?.ruc || "-"}</strong>
              </span>
            </Space>
          );
        },
      },
      {
        title: "Contacto",
        key: "contacto",
        width: 140,
        render: (_, supplier) => (
          <Space direction="vertical" size={4}>
            {!isEmpty(supplier.email) && (
              <a href={`mailto:${supplier.email}`}>{supplier.email}</a>
            )}

            {supplier.phone?.number && (
              <Space>
                <IconAction
                  tooltipTitle={
                    supplier.phone.type === "mobile"
                      ? "Llamar a celular"
                      : "Llamar a fijo"
                  }
                  icon={
                    supplier.phone.type === "mobile" ? faMobileScreen : faPhone
                  }
                  size={18}
                  iconStyles={{ color: () => theme.colors.info }}
                  onClick={() =>
                    window.open(
                      `tel:${supplier.phone!.prefix}${supplier.phone!.number}`
                    )
                  }
                />
                <span>
                  {supplier.phone.prefix} {supplier.phone.number}
                </span>
              </Space>
            )}

            {supplier.whatsapp?.number && (
              <Space>
                <IconAction
                  tooltipTitle="Whatsapp"
                  icon={faWhatsapp}
                  size={20}
                  iconStyles={{ color: () => theme.colors.success }}
                  onClick={() =>
                    window.open(
                      `https://api.whatsapp.com/send?phone=${supplier.whatsapp!.prefix.replace(
                        "+",
                        ""
                      )}${supplier.whatsapp!.number}`
                    )
                  }
                />
                <span>
                  {supplier.whatsapp.prefix} {supplier.whatsapp.number}
                </span>
              </Space>
            )}
          </Space>
        ),
      },
      {
        title: "Dirección",
        key: "direccion",
        width: 130,
        render: (_, supplier) => {
          const address = supplier.company?.address;
          const district = supplier.company?.district;

          if (!address && !district) return "-";

          const searchQuery = encodeURIComponent(
            `${address || ""} ${district || ""}`.trim()
          );

          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;

          return (
            <Space direction="vertical" size={2}>
              <span style={{ lineHeight: "1.2" }}>{address || "-"}</span>
              {district && (
                <span style={{ fontSize: "12px", color: "#666" }}>
                  {district}
                </span>
              )}
              <a
                href={mapsUrl}
                target="_blank"
                rel="noreferrer"
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <IconAction
                  icon={faMapMarkerAlt}
                  size={14}
                  iconStyles={{ color: () => theme.colors.error }}
                />
                Cómo llegar
              </a>
            </Space>
          );
        },
      },
      {
        title: "Especialidades",
        key: "specialties",
        dataIndex: "specialties",
        width: 150,
        render: (_, supplier) => {
          const specialties = supplier.specialties || [];
          const validSpecialties = specialties.filter((s) => s !== "");

          if (validSpecialties.length === 0) return "-";

          return (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
              {validSpecialties.map((specialty) => (
                <Tag key={specialty} color="blue">
                  {getSpecialtyLabel(specialty)}
                </Tag>
              ))}
            </div>
          );
        },
      },
      {
        title: "Acciones",
        key: "actions",
        dataIndex: "actions",
        width: 80,
        align: "center",
        fixed: "right",
        render: (_, supplier) => (
          <Space size="small">
            <IconAction
              tooltipTitle="Editar"
              icon={faEdit}
              onClick={() => navigateTo(`/suppliers/${supplier.id}`)}
            />
            <IconAction
              tooltipTitle="Eliminar Proveedor"
              icon={faTrash}
              iconStyles={{ color: () => theme.colors.error }}
              onClick={() => {}}
            />
          </Space>
        ),
      },
    ],
    [navigateTo, getSpecialtyLabel]
  );

  return (
    <Table
      bordered
      rowKey="id"
      columns={columns}
      dataSource={sortedSuppliers}
      size="small"
      scroll={{ x: 1000, y: 600 }}
      loading={suppliersLoading}
      pagination={false}
    />
  );
};
