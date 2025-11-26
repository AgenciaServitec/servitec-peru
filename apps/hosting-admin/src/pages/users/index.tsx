import React, { useEffect, useState } from "react";
import {
  Col,
  Input,
  modalConfirm,
  notification,
  Row,
  Title,
} from "../../components";
import { useAuthentication, useGlobalData } from "../../providers";
import { useNavigate } from "react-router-dom";
import { UsersTable } from "./UsersTable";
import {
  apiErrorNotification,
  getApiErrorResponse,
  useApiUserPatch,
} from "../../api";
import { assign, isEmpty } from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import styled, { css } from "styled-components";
import { theme } from "../../styles";
import { Timestamp } from "firebase/firestore";
import { assistancesRef } from "../../firebase/collections";
import { UserAssistancesTable } from "./UserAssistancesTable.tsx";
import { useCollectionData } from "react-firebase-hooks/firestore";

export interface Phone {
  prefix: string;
  number: string;
}

export interface ProfilePhoto {
  uid: string;
  name: string;
  url: string;
  thumbUrl?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  paternalSurname: string;
  maternalSurname: string;
  dni: string;
  cip?: string;
  phone?: Phone;
  profilePhoto?: ProfilePhoto | null;
  secondaryEmail?: string;
  bloodGroup?: string;
  workPlace?: string;
  cgi?: boolean;
  roleCode?: string;
  searchData?: string[];
  createAt: Timestamp;
  updateAt?: Timestamp;
  isDeleted: boolean;
  updateBy?: string;
  payPerMinute?: number;
  foodVoucher?: number;
}

export const Users: React.FC = () => {
  const navigate = useNavigate();
  const { authUser } = useAuthentication();
  const { users } = useGlobalData();
  const { patchUser, patchUserResponse } = useApiUserPatch();

  const [userSearch, setUserSearch] = useState<string>("");
  const [usersView, setUsersView] = useState<User[]>([]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const userAssistancesQuery =
    selectedUser &&
    assistancesRef
      .where("userId", "==", selectedUser.id)
      .where("isDeleted", "==", false);

  const [userAssistances, loadingAssistances] =
    useCollectionData(userAssistancesQuery);

  const navigateTo = (userId: string): void => navigate(userId);

  const onAddUser = (): void => navigateTo("new");

  const onEditUser = (user: User): void => navigateTo(user.id);

  const removeUser = async (user: User): Promise<void> => {
    const response = await patchUser(user);

    if (!patchUserResponse.ok) {
      throw new Error(response);
    }

    notification({
      type: "success",
      title: "¡Usuario eliminado exitosamente!",
    });
  };

  const onDeleteUser = async (user: User): Promise<void> => {
    try {
      const userToDelete = assign({}, user, {
        updateBy: authUser?.email,
        isDeleted: true,
      });

      await removeUser(userToDelete);
    } catch (e) {
      const errorResponse = await getApiErrorResponse(e);
      apiErrorNotification(errorResponse);
    }
  };

  const onConfirmRemoveUser = (user: User): void => {
    modalConfirm({
      content: "El usuario se eliminará",
      onOk: async () => {
        await onDeleteUser(user);
      },
    });
  };

  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setUserSearch(value);
  };

  useEffect(() => {
    const usersMatch = users.filter((user) => {
      const searchText =
        `${user.firstName} ${user.paternalSurname} ${user.maternalSurname} ${user.dni}`.toLowerCase();
      return searchText.includes(userSearch.toLowerCase());
    });

    setUsersView(isEmpty(userSearch) ? users : usersMatch);
  }, [userSearch, users]);

  const onViewAssistances = (user: User): void => {
    setSelectedUser(user);
  };

  return (
    <Container>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={2}>Usuarios ({usersView.length})</Title>
        </Col>
        <Col span={24}>
          <Input
            label="Búsqueda de usuarios"
            value={userSearch}
            onChange={handleUserSearch}
            name="userSearch"
            suffix={
              <FontAwesomeIcon
                icon={faSearch}
                style={{ color: theme.colors.font1 }}
              />
            }
          />
        </Col>
        <Col span={24}>
          <UsersTable
            users={usersView}
            onEditUser={onEditUser}
            onRemoveUser={onConfirmRemoveUser}
            onViewAssistances={onViewAssistances}
          />
        </Col>
        <Col span={24}>
          {selectedUser && (
            <UserAssistancesTable
              selectedUser={selectedUser}
              loadingAssistances={loadingAssistances}
              userAssistances={userAssistances ?? []}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  ${() => css`
    padding: ${theme.paddings.large};
    min-height: 100vh;
  `}
`;
