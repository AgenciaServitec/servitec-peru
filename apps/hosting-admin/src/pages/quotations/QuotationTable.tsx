import { Space } from "antd";
import { IconAction, Table } from "../../components";
import { useNavigate } from "react-router-dom";
import { faEdit, faFilePdf, faTrash } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../styles";
import { orderBy } from "lodash";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

export const QuotationTable = ({ quotations, quotationsLoading }) => {
  const navigate = useNavigate();

  const navigateTo = (pathname) => navigate(pathname);

  const columns = [
    {
      title: "N° de Contrato",
      dataIndex: "contractNumber",
      key: "contractNumber",
      width: 60,
      align: "center",
      render: (_, quotation) => "25112025190625",
    },
    {
      title: "Cliente",
      dataIndex: "client",
      key: "client",
      width: 180,
      align: "center",
      render: (_, quotation) => (
        <Space align="center" direction="vertical">
          <strong>Marujita S.A.C.</strong>
          <span>
            DNI: <strong>{quotation.client.document.number}</strong>
          </span>
          <span>
            RUC: <strong>207311505406</strong>
          </span>
        </Space>
      ),
    },
    {
      title: "Contacto",
      dataIndex: "contact",
      key: "contact",
      width: 180,
      align: "center",
      render: (_, quotation) => (
        <Space direction="vertical">
          <a href={`mailto:${quotation.client.email}`}>
            {quotation.client.email}
          </a>
          <Space>
            <IconAction
              tooltipTitle="Whatsapp"
              icon={faWhatsapp}
              size={27}
              iconStyles={{ color: () => theme.colors.success }}
              onClick={() =>
                window.open(
                  `https://api.whatsapp.com/send?phone=${quotation.client.phone.prefix.replace(
                    "+",
                    ""
                  )}${quotation.client.phone.number}`
                )
              }
            />
            <span>
              {quotation.client.phone.prefix} &nbsp;
              {quotation.client.phone.number}
            </span>
          </Space>
        </Space>
      ),
    },
    {
      title: "Problema",
      dataIndex: "reportedIssue",
      key: "reportedIssue",
      width: 150,
      align: "center",
      render: (_, quotation) => <span>{quotation.reportedIssue}</span>,
    },
    {
      title: "Análisis",
      dataIndex: "analysis",
      key: "analysis",
      width: 150,
      align: "center",
      render: (_, quotation) => <span>{quotation.analysis}</span>,
    },
    {
      title: "Solución",
      dataIndex: "solutionAndRecommendations",
      key: "solutionAndRecommendations",
      width: 150,
      align: "center",
      render: (_, quotation) => (
        <span>{quotation.solutionAndRecommendations}</span>
      ),
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      width: 80,
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
    <Table
      bordered
      virtual
      columns={columns}
      dataSource={orderBy(quotations, "createAt", "desc")}
      scroll={{ x: "max-content" }}
      size="small"
      loading={quotationsLoading}
      pagination={false}
    />
  );
};
