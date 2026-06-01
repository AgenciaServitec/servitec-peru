import { motion } from "framer-motion";
import {
  Avatar,
  Button,
  Card,
  Checkbox,
  Col,
  IconAction,
  Row,
  Space,
  Tag,
  Typography,
  useModalConfirm,
  useNotification,
} from "../../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faEnvelope,
  faPhone,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useTheme } from "styled-components";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../../firebase";
import { useState } from "react";
import { useDefaultFirestoreProps } from "../../../hooks";
import { deleteContact } from "../../../firebase/collections";
import { DrawerDetails } from "./ContactHistoryDrawer.tsx";

const { Text } = Typography;

export const ContactsIntegration = () => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedContact, setSelectedContact] = useState<any>(null);

  const { modalConfirm } = useModalConfirm();
  const { notification } = useNotification();
  const { assignDeleteProps } = useDefaultFirestoreProps();

  const [contacts, contactsLoading] = useCollectionData(
    firestore.collection("contacts").where("isDeleted", "==", false)
  );

  const [entries, entriesLoading] = useCollectionData(
    firestore.collection("entries").where("isDeleted", "==", false)
  );

  const theme = useTheme();

  const handleOpenDrawer = (contact: any) => {
    setSelectedContact(contact);
    setOpenDrawer(true);
  };

  const contactEntries =
    entries?.filter((entry: any) => entry.contactId === selectedContact?.id) ||
    [];

  const handleSelectAll = (checked: boolean) => {
    if (checked && contacts) {
      const allIds = contacts.map((c: any) => c.id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const onDeleteContact = async (contact: any) => {
    try {
      await deleteContact(contact.id, assignDeleteProps(contact));
      notification({
        type: "success",
        title: "¡Contacto eliminado exitosamente!",
      });
    } catch (e) {
      console.error(e);
      notification({
        type: "error",
        title: "Error al eliminar el contacto",
      });
    }
  };

  const onConfirmRemoveContact = (contact: any) => {
    modalConfirm({
      content: "¿Estás seguro de que deseas eliminar este contacto?",
      onOk: async () => {
        await onDeleteContact(contact);
      },
    });
  };

  const onConfirmRemoveBulk = () => {
    modalConfirm({
      title: "¿Estás seguro de que quieres eliminar?",
      content: `Se eliminarán ${selectedIds.length} contactos seleccionados. Esta acción no se puede deshacer.`,
      onOk: async () => {
        try {
          const contactsToDelete = contacts?.filter((c) =>
            selectedIds.includes(c.id)
          );

          if (contactsToDelete) {
            await Promise.all(
              contactsToDelete.map((c) =>
                deleteContact(c.id, assignDeleteProps(c))
              )
            );

            notification({
              type: "success",
              title: `¡${selectedIds.length} contactos eliminados con éxito!`,
            });

            setSelectedIds([]);
          }
        } catch (e) {
          console.error("Error en borrado masivo:", e);
          notification({
            type: "error",
            title: "Hubo un error al eliminar los contactos",
          });
        }
      },
    });
  };

  return (
    <>
      <Contacts
        contacts={contacts}
        selectedIds={selectedIds}
        theme={theme}
        handleSelectAll={handleSelectAll}
        handleSelectItem={handleSelectItem}
        onConfirmRemoveContact={onConfirmRemoveContact}
        onConfirmRemoveBulk={onConfirmRemoveBulk}
        handleOpenDrawer={handleOpenDrawer}
      />
      <DrawerDetails
        open={openDrawer}
        setOpen={setOpenDrawer}
        selectedContact={selectedContact}
        entries={contactEntries}
        loading={entriesLoading}
      />
    </>
  );
};

const Contacts = ({
  contacts,
  selectedIds,
  theme,
  handleSelectAll,
  handleSelectItem,
  onConfirmRemoveContact,
  onConfirmRemoveBulk,
  handleOpenDrawer,
}: any) => {
  const isAllSelected =
    contacts && contacts.length > 0 && selectedIds.length === contacts.length;
  const isIndeterminate =
    selectedIds.length > 0 && contacts && selectedIds.length < contacts.length;

  return (
    <motion.div
      key="list"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <Space style={{ marginBottom: "16px" }} size="middle">
        <Button
          danger
          type="primary"
          icon={<FontAwesomeIcon icon={faTrashCan} />}
          disabled={selectedIds?.length === 0}
          onClick={onConfirmRemoveBulk}
          style={{ borderRadius: theme.border_radius.sm }}
        >
          Eliminar contactos ({selectedIds?.length})
        </Button>

        <div
          style={{
            background: theme.colors.bgSecondary,
            padding: "4px 12px",
            borderRadius: theme.border_radius.sm,
            border: `1px solid ${theme.colors.border}`,
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Checkbox
            indeterminate={isIndeterminate}
            onChange={(e) => handleSelectAll(e.target.checked)}
            checked={isAllSelected}
          />
          <Text style={{ fontSize: "12px", color: theme.colors.fontSecondary }}>
            {isAllSelected
              ? "Desmarcar todos"
              : "Seleccionar todos los filtrados"}
          </Text>
        </div>
      </Space>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {contacts?.map((contact) => {
          const displayName =
            contact.fullName ||
            `${contact.firstName || ""} ${contact.paternalSurname || ""}`.trim() ||
            "Cliente";

          const phoneNumber =
            typeof contact.phone === "object"
              ? contact.phone?.number
              : contact.phone;
          const phonePrefix =
            typeof contact.phone === "object"
              ? contact.phone?.prefix?.replace("+", "")
              : "51";

          return (
            <Card
              key={contact.id}
              bodyStyle={{ padding: "16px" }}
              style={{
                background: theme.colors.bgSecondary,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.border_radius.md,
              }}
            >
              <Row align="middle" gutter={16}>
                <Col>
                  <Checkbox
                    checked={selectedIds?.includes(contact.id)}
                    onChange={() => handleSelectItem(contact.id)}
                  />
                </Col>
                <Col>
                  <Avatar
                    size={64}
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`}
                  />
                </Col>
                <Col flex="auto">
                  <Row justify="space-between">
                    <Col>
                      <Space direction="vertical" size={0}>
                        <Text style={{ fontSize: "13px" }}>
                          <span style={{ color: theme.colors.fontSecondary }}>
                            Nombres y Apellidos:{" "}
                          </span>
                          <Text strong style={{ color: "#1890ff" }}>
                            {displayName}
                          </Text>
                        </Text>
                        <Text style={{ fontSize: "13px" }}>
                          <span style={{ color: theme.colors.fontSecondary }}>
                            Teléfono principal:{" "}
                          </span>{" "}
                          {phoneNumber || "No registrado"}
                        </Text>
                      </Space>
                    </Col>
                    <Col style={{ textAlign: "right" }}>
                      <Text style={{ fontSize: "13px" }}>
                        <span style={{ color: theme.colors.fontSecondary }}>
                          Email:{" "}
                        </span>{" "}
                        {contact.email}
                      </Text>
                    </Col>
                  </Row>

                  {contact.secondaryPhones &&
                    contact.secondaryPhones?.length > 0 && (
                      <div
                        style={{
                          margin: "8px 0",
                          padding: "8px",
                          background: theme.colors.bgTertiary,
                          borderRadius: theme.border_radius.sm,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: "12px",
                            color: theme.colors.fontSecondary,
                          }}
                        >
                          <span style={{ fontWeight: 600 }}>
                            Números secundarios vinculados:{" "}
                          </span>
                          {contact.secondaryPhones.join(" - ")}
                        </Text>
                      </div>
                    )}

                  <Row
                    justify="space-between"
                    align="middle"
                    style={{
                      marginTop: contact.secondaryPhones?.length ? 0 : "12px",
                    }}
                  >
                    <Col>
                      <Space size={12}>
                        <Text
                          style={{
                            fontSize: "11px",
                            color: theme.colors.fontTertiary,
                          }}
                        >
                          Clasificación:{" "}
                          <Tag
                            color="processing"
                            style={{
                              fontSize: "10px",
                              borderRadius: "4px",
                              textTransform: "uppercase",
                            }}
                          >
                            Cliente
                          </Tag>
                        </Text>
                        {contact.createAt && (
                          <Text
                            style={{
                              fontSize: "11px",
                              color: theme.colors.fontTertiary,
                            }}
                          >
                            Registrado el:{" "}
                            {dayjs(contact.createAt.toDate()).format(
                              "DD/MM/YYYY"
                            )}
                          </Text>
                        )}
                      </Space>
                    </Col>
                    <Col>
                      <Space>
                        {phoneNumber && (
                          <IconAction
                            tooltipTitle="WhatsApp"
                            href={`https://wa.me/${phonePrefix}${phoneNumber}`}
                            target="_blank"
                            icon={faWhatsapp}
                            iconStyles={{
                              color: "#25D366",
                            }}
                          />
                        )}
                        <IconAction
                          tooltipTitle="Email"
                          href={`mailto:${contact.email}`}
                          target="_blank"
                          icon={faEnvelope}
                          iconStyles={{
                            color: theme.colors.warning,
                          }}
                        />
                        {phoneNumber && (
                          <IconAction
                            tooltipTitle="Llamar"
                            href={`tel:${phoneNumber}`}
                            target="_blank"
                            icon={faPhone}
                            iconStyles={{
                              color: theme.colors.info,
                            }}
                          />
                        )}
                        <IconAction
                          tooltipTitle="Ver historial"
                          onClick={() => handleOpenDrawer(contact)}
                          icon={faCalendarDays}
                          iconStyles={{
                            color: theme.colors.primary,
                          }}
                        />
                        <IconAction
                          tooltipTitle="Eliminar"
                          onClick={() => onConfirmRemoveContact(contact)}
                          icon={faTrashCan}
                          iconStyles={{
                            color: theme.colors.error,
                          }}
                        />
                      </Space>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
};
