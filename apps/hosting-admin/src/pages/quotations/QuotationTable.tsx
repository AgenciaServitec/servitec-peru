import dayjs from "dayjs";
import { Space } from "antd";
import { IconAction, Table } from "../../components";
import { useNavigate } from "react-router-dom";
import { faEdit, faFilePdf, faTrash } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../styles";
import styled from "styled-components";
import { orderBy } from "lodash";

export const QuotationTable = ({ quotations, quotationsLoading }) => {
  const navigate = useNavigate();

  const navigateTo = (pathname) => navigate(pathname);

  const columns = [
    {
      title: "F. Creación",
      dataIndex: "createAt",
      key: "createAt",
      width: 180,
      align: "center",
      render: (_, quotation) =>
        dayjs(quotation.createAt.toDate()).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Cliente",
      dataIndex: "client",
      key: "client",
      width: 180,
      align: "center",
      render: (_, quotation) => (
        <Space align="center" direction="vertical">
          <strong>{quotation.client.document.number}</strong>
        </Space>
      ),
    },
    {
      title: "Opciones",
      dataIndex: "options",
      key: "options",
      align: "center",
      width: 120,
      render: (_, quotation) => (
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
      <Table
        columns={columns}
        dataSource={orderBy(quotations, "createAt", "desc")}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Total: ${total} usuarios`,
        }}
        scroll={{ x: 1200 }}
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
