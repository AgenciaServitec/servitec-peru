import React from "react";
import { Image, Tabs } from "antd";
import { ProfileDataForm } from "./ProfileDataForm";
import { ProfileImageModal, type ProfileImageType } from "./ProfileImageModal";
import { ModalProvider, useAuthentication, useModal } from "../../providers";
import { useDevice, useQueryString } from "../../hooks";
import styled, { css } from "styled-components";
import { PhotoNoFound } from "../../images";
import { Building2, Mail, Pencil } from "lucide-react";

const items = [
  {
    key: "profile_edit",
    label: "Configuración de Cuenta",
    children: <ProfileDataForm />,
  },
];

export const Profile = () => {
  return (
    <ModalProvider>
      <ProfileContent />
    </ModalProvider>
  );
};

const ProfileContent = () => {
  const { authUser } = useAuthentication();
  const { onShowModal, onCloseModal } = useModal();
  const { isTablet } = useDevice();
  const [dataEdit] = useQueryString("dataEdit", "profile_edit");

  const coverUrl =
    authUser?.coverPhoto?.url || authUser?.coverPhoto?.thumbUrl || null;

  const profileUrl =
    authUser?.profilePhoto?.url ||
    authUser?.profilePhoto?.thumbUrl ||
    PhotoNoFound;

  const handleOpenImageModal = (
    e: React.MouseEvent,
    type: ProfileImageType
  ) => {
    e.stopPropagation();
    if (!authUser) return;

    onShowModal({
      title:
        type === "profile"
          ? "Editar Foto de Perfil"
          : "Editar Imagen de Portada",
      width: isTablet ? "90%" : "480px",
      onRenderBody: () => (
        <ProfileImageModal
          key={`${authUser.id}-${type}`}
          user={authUser}
          type={type}
          onCloseModal={onCloseModal}
        />
      ),
    });
  };

  return (
    <PageWrapper>
      <HeaderCard>
        <Banner $coverUrl={coverUrl}>
          <EditIconButton
            type="button"
            title="Editar portada"
            aria-label="Editar imagen de portada"
            onClick={(e) => handleOpenImageModal(e, "cover")}
          >
            <Pencil size={15} />
          </EditIconButton>
        </Banner>

        <ProfileMeta>
          <AvatarGlassWrapper>
            <EditIconButton
              type="button"
              $isAvatar
              title="Editar foto de perfil"
              aria-label="Editar foto de perfil"
              onClick={(e) => handleOpenImageModal(e, "profile")}
            >
              <Pencil size={14} />
            </EditIconButton>

            <Image
              src={profileUrl}
              fallback={PhotoNoFound}
              alt="Foto de perfil"
              preview={{
                mask: <div style={{ fontSize: 12 }}>Ver Foto</div>,
              }}
              wrapperStyle={{ width: "100%", height: "100%" }}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </AvatarGlassWrapper>

          <UserTitles>
            <div className="name-badge-row">
              <h1>
                {authUser?.firstName} {authUser?.paternalSurname}
              </h1>
            </div>

            <SubInfoRow>
              <span>
                <Building2 size={14} /> {authUser?.workPlace || "Servitec Perú"}
              </span>
              <span className="dot">•</span>
              <span>
                <Mail size={14} /> {authUser?.email || "Sin correo"}
              </span>
            </SubInfoRow>
          </UserTitles>
        </ProfileMeta>
      </HeaderCard>

      <TabsSection>
        <Tabs type="card" items={items} defaultActiveKey={dataEdit} />
      </TabsSection>
    </PageWrapper>
  );
};

const EditIconButton = styled.button<{ $isAvatar?: boolean }>`
  ${({ theme, $isAvatar }) => css`
    position: absolute;
    top: ${$isAvatar ? "10px" : "14px"};
    right: ${$isAvatar ? "10px" : "14px"};
    z-index: 10;
    width: ${$isAvatar ? "30px" : "34px"};
    height: ${$isAvatar ? "30px" : "34px"};
    border-radius: ${theme.border_radius.full};
    border: 1px solid rgba(255, 255, 255, 0.28);
    background: rgba(10, 10, 12, 0.65);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0;
    transform: translateY(-4px);
    pointer-events: none;
    transition:
      opacity 0.2s ease,
      transform 0.2s ease,
      background 0.2s ease,
      border-color 0.2s ease;

    &:hover {
      background: ${theme.colors.primary};
      border-color: ${theme.colors.primary};
      color: ${theme.mode === "dark" ? "#050505" : "#ffffff"};
    }

    @media (hover: none) {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  `}
`;

const PageWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const HeaderCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.bgSecondary};
    border-radius: ${theme.border_radius.xl};
    border: 1px solid ${theme.colors.border};
    overflow: hidden;
  `}
`;

const Banner = styled.div<{ $coverUrl?: string | null }>`
  width: 100%;
  height: 180px;
  position: relative;
  background: ${({ $coverUrl }) =>
    $coverUrl
      ? `url(${$coverUrl}) center / cover no-repeat`
      : `linear-gradient(
          120deg,
          #4f46e5 0%,
          #7c3aed 40%,
          #c084fc 75%,
          #f472b6 100%
        )`};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: ${({ $coverUrl }) =>
      $coverUrl
        ? "linear-gradient(180deg, rgba(0, 0, 0, 0.28) 0%, transparent 50%)"
        : "radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.22) 0%, transparent 50%)"};
    pointer-events: none;
  }

  &:hover > ${EditIconButton} {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

const ProfileMeta = styled.div`
  ${({ theme }) => css`
    padding: 0 ${theme.spacing.xl} ${theme.spacing.lg};
    display: flex;
    align-items: flex-end;
    gap: ${theme.spacing.lg};
    position: relative;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: ${theme.spacing.md};
      padding: 0 ${theme.spacing.md} ${theme.spacing.md};
    }
  `}
`;

const AvatarGlassWrapper = styled.div`
  ${({ theme }) => css`
    width: 150px;
    height: 150px;
    border-radius: 36px;
    padding: 6px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border: 1.5px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25);
    margin-top: -75px;
    position: relative;
    z-index: 2;
    flex-shrink: 0;
    overflow: hidden;

    .ant-image {
      border-radius: 28px;
      overflow: hidden;
    }

    .ant-image-img {
      border-radius: 28px;
    }

    &:hover > ${EditIconButton} {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  `}
`;

const UserTitles = styled.div`
  ${({ theme }) => css`
    padding-bottom: ${theme.spacing.xs};
    flex: 1;

    .name-badge-row {
      display: flex;
      align-items: center;
      gap: ${theme.spacing.sm};
      flex-wrap: wrap;

      h1 {
        margin: 0;
        font-size: ${theme.font_sizes.heading};
        font-weight: ${theme.font_weight.large};
        color: ${theme.colors.fontPrimary};
        line-height: 1.2;
      }

      .pro-badge {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: ${theme.colors.primary};
        color: ${theme.mode === "dark" ? "#000000" : "#ffffff"};
        font-size: 11px;
        font-weight: ${theme.font_weight.large};
        padding: 3px 10px;
        border-radius: ${theme.border_radius.full};
        letter-spacing: 0.5px;
      }
    }
  `}
`;

const SubInfoRow = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    margin-top: 6px;
    color: ${theme.colors.fontSecondary};
    font-size: ${theme.font_sizes.sm};
    font-weight: ${theme.font_weight.medium};
    flex-wrap: wrap;

    span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .dot {
      color: ${theme.colors.fontTertiary};
    }
  `}
`;

const TabsSection = styled.div`
  ${({ theme }) => css`
    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab {
      border: 1px solid ${theme.colors.border};
      border-bottom: none;
      border-radius: ${theme.border_radius.md} ${theme.border_radius.md} 0 0;
      font-weight: ${theme.font_weight.medium};
      transition: all ${theme.transitions.fast};
    }

    .ant-tabs-card > .ant-tabs-nav .ant-tabs-tab-active {
      border-color: ${theme.colors.primary};
      background: ${theme.colors.bgSecondary} !important;
    }

    .ant-tabs-content-holder {
      background: ${theme.colors.bgSecondary};
      border: 1px solid ${theme.colors.border};
      border-radius: 0 0 ${theme.border_radius.xl} ${theme.border_radius.xl};
      padding: ${theme.spacing.xl};

      @media (max-width: 768px) {
        padding: ${theme.spacing.md};
      }
    }
  `}
`;
