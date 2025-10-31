import dayjs from "dayjs";
import { userFullName } from "../../utils";
import { Space } from "antd";
import { IconAction } from "../../components";
import { useNavigate } from "react-router-dom";
import { faEdit, faFilePdf, faTrash } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../styles";
import { TableVirtualized } from "../../components/ui/table/TableVirtualized.tsx";
import styled from "styled-components";
import { orderBy } from "lodash";

export const QuotationTable = ({ quotations, quotationsLoading }) => {
  const navigate = useNavigate();

  const navigateTo = (pathname) => navigate(pathname);

  const columns = [
    {
      title: "F. Creación",
      align: "center",
      width: ["7rem", "100%"],
      render: (quotation) =>
        dayjs(quotation.createAt.toDate()).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Cliente",
      align: "center",
      width: ["15rem", "100%"],
      render: (quotation) => (
        <Space align="center" direction="vertical">
          <strong>{quotation.client.document.number}</strong>
        </Space>
      ),
    },
    {
      title: "Opciones",
      align: "center",
      width: ["14rem", "100%"],
      render: (quotation) => (
        <Space>
          <IconAction
            tooltipTitle="Editar"
            icon={faEdit}
            onClick={() => navigateTo(`/quotations/${quotation.id}`)}
          />
          <IconAction
            tooltipTitle="PDF"
            icon={faFilePdf}
            iconStyles={{ color: () => theme.colors.error }}
            onClick={() => navigateTo(`${quotation.id}/sheets`)}
          />
          <IconAction
            tooltipTitle="Eliminar"
            icon={faTrash}
            iconStyles={{ color: () => theme.colors.error }}
            onClick={() => navigateTo(`/quotations/${quotation.id}`)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Container>
      <TableVirtualized
        dataSource={orderBy(quotations, "createAt", "desc")}
        columns={columns}
        rowHeaderHeight={50}
        rowBodyHeight={150}
        loading={quotationsLoading}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  .contact {
    &__item {
      display: flex;
      align-items: center;
    }
  }
`;
