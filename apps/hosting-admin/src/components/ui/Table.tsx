import { Table as AntTable, type TableProps as AntTableProps } from "antd";
import styled, { css } from "styled-components";

export interface TableProps<RecordType> extends AntTableProps<RecordType> {
  // Puedes extender con props personalizadas si lo necesitas a futuro
}

export const Table = <RecordType extends object = any>({
  scroll = { x: 1200 },
  size = "middle",
  ...props
}: TableProps<RecordType>) => {
  return (
    <TableWrapper>
      <AntTable<RecordType> scroll={scroll} size={size} {...props} />
    </TableWrapper>
  );
};

/* --- ESTILOS DE CONTENEDOR Y JERARQUÍA VISUAL --- */

const TableWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    background: ${theme.colors.bgSecondary};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.border_radius.lg};
    overflow: hidden;
    box-shadow: ${theme.shadows.sm};

    /* Ajuste fino del Header de la Tabla */
    .ant-table-thead > tr > th {
      font-weight: ${theme.font_weight.semibold};
      font-size: ${theme.font_sizes.xs};
      text-transform: uppercase;
      letter-spacing: 0.05em;
      border-bottom: 1px solid ${theme.colors.border};

      &::before {
        /* Línea divisoria discreta entre columnas del header */
        background-color: ${theme.colors.border} !important;
      }
    }

    /* Filas y celdas */
    .ant-table-tbody > tr > td {
      border-bottom: 1px solid ${theme.colors.divider};
      font-size: ${theme.font_sizes.sm};
      transition: background ${theme.transitions.fast};
    }

    /* Última fila sin borde sobrante */
    .ant-table-tbody > tr:last-child > td {
      border-bottom: none;
    }

    /* Paginación integrada en la parte inferior */
    .ant-table-pagination {
      margin: ${theme.spacing.md} !important;
      padding: 0 ${theme.spacing.sm};
    }

    /* Scrollbar personalizado para tablas anchas */
    .ant-table-body::-webkit-scrollbar,
    .ant-table-content::-webkit-scrollbar {
      height: 8px;
      width: 8px;
    }

    .ant-table-body::-webkit-scrollbar-thumb,
    .ant-table-content::-webkit-scrollbar-thumb {
      background: ${theme.colors.border};
      border-radius: ${theme.border_radius.full};

      &:hover {
        background: ${theme.colors.fontTertiary};
      }
    }
  `}
`;
