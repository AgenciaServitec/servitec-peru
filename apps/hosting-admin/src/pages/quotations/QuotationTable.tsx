import { Space } from "antd";
import { IconAction, Table } from "../../components";
import { useNavigate } from "react-router-dom";
import {
  faEdit,
  faFilePdf,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../styles";
import { isEmpty, orderBy, truncate } from "lodash";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import type { ColumnsType } from "antd/es/table";
import type { Assistance } from "../../globalTypes.ts";
import { htmlToText } from "html-to-text";
import { useCallback, useMemo } from "react";

export const QuotationTable = ({ quotations, quotationsLoading }) => {
  const navigate = useNavigate();

  const navigateTo = useCallback(
    (pathname: string) => navigate(pathname),
    [navigate]
  );

  const convertHtmlToText = useCallback(
    (item: any) =>
      htmlToText(item, {
        wordwrap: false,
      }),
    []
  );

  const columns = useMemo<ColumnsType<Partial<Assistance>>>(
    () => [
      {
        title: "N° de Contrato",
        key: "contractNumber",
        dataIndex: "contractNumber",
        width: 70,
        align: "center",
        render: (_, quotation) => quotation?.contractNumber || "-",
      },
      {
        title: "Cliente",
        key: "client",
        dataIndex: "client",
        width: 120,
        align: "center",
        render: (_, quotation) =>
          quotation.client.document.type === "dni" ? (
            <Space align="center" direction="vertical">
              <strong>
                {`${quotation.client?.paternalSurname} ${quotation.client?.maternalSurname} ${quotation.client?.firstName}` ||
                  "-"}
              </strong>
              <span>
                DNI: <strong>{quotation.client.document.number || "-"}</strong>
              </span>
            </Space>
          ) : (
            <Space align="center" direction="vertical">
              <strong>{quotation.client?.companyName || "-"}</strong>
              <span>
                RUC: <strong>{quotation.client.document.number || "-"}</strong>
              </span>
            </Space>
          ),
      },
      {
        title: "Contacto",
        key: "contact",
        dataIndex: "contact",
        width: 120,
        align: "center",
        render: (_, quotation) => (
          <Space direction="vertical">
            {!isEmpty(quotation.client.email) ? (
              <a href={`mailto:${quotation.client.email}`}>
                {quotation.client.email}
              </a>
            ) : (
              "-"
            )}
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
                {quotation.client.phone.number || "-"}
              </span>
            </Space>
          </Space>
        ),
      },
      {
        title: "Problema",
        key: "reportedIssue",
        dataIndex: "reportedIssue",
        width: 100,
        align: "center",
        render: (_, quotation) => (
          <span>
            {truncate(convertHtmlToText(quotation?.reportedIssue), {
              length: 50,
            }) || "-"}
          </span>
        ),
      },
      {
        title: "Análisis",
        key: "analysis",
        dataIndex: "analysis",
        width: 100,
        align: "center",
        render: (_, quotation) => (
          <span>
            {truncate(convertHtmlToText(quotation?.analysis), {
              length: 50,
            }) || "-"}
          </span>
        ),
      },
      {
        title: "Solución",
        key: "solutionAndRecommendations",
        dataIndex: "solutionAndRecommendations",
        width: 100,
        align: "center",
        render: (_, quotation) => (
          <span>
            {truncate(
              convertHtmlToText(quotation?.solutionAndRecommendations),
              {
                length: 50,
              }
            ) || "-"}
          </span>
        ),
      },
      {
        title: "Acciones",
        key: "actions",
        dataIndex: "actions",
        width: 100,
        align: "center",
        fixed: "right",
        render: (_, quotation) => (
          <Space size="small">
            <IconAction
              tooltipTitle="Editar"
              icon={faEdit}
              onClick={() => navigateTo(`/quotations/${quotation.id}`)}
            />
            <IconAction
              tooltipTitle="Enviar"
              icon={faPaperPlane}
              iconStyles={{ color: () => theme.colors.info }}
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
    ],
    [convertHtmlToText, navigateTo]
  );

  const dataSource = useMemo<Assistance[]>(
    () => orderBy(quotations, "createAt", "desc"),
    [quotations]
  );

  return (
    <Table
      bordered
      virtual
      columns={columns}
      dataSource={dataSource}
      size="small"
      scroll={{ x: 1200, y: 600 }}
      loading={quotationsLoading}
      pagination={false}
    />
  );
};
