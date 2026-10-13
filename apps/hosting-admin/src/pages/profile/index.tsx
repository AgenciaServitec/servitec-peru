import { Image, Tabs } from "antd";
import { ProfileDataForm } from "./ProfileDataForm";
import { useAuthentication } from "../../providers";
import { useQueryString } from "../../hooks";
import styled, { css } from "styled-components";
import { PhotoNoFound } from "../../images";
import { Building2, Mail, ShieldCheck } from "lucide-react";

const items = [
  {
    key: "profile_edit",
    label: "Configuración de Cuenta",
    children: <ProfileDataForm />,
  },
];

export const Profile = () => {
  const { authUser } = useAuthentication();
  const [dataEdit] = useQueryString("dataEdit", "profile_edit");

  return (
    <PageWrapper>
      {/* Cabecera de Perfil */}
      <HeaderCard>
        <Banner />
        <ProfileMeta>
          {/* Avatar con Ant Design Image y marco cristal */}
          <AvatarGlassWrapper>
            <Image
              src={authUser?.profilePhoto?.thumbUrl || PhotoNoFound}
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
              <span className="pro-badge">
                <ShieldCheck size={13} /> PRO
              </span>
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

      <Tabs type="card" items={items} defaultActiveKey={dataEdit} />
    </PageWrapper>
  );
};

/* --- ESTILOS COMPONENTE PRINCIPAL --- */

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

const Banner = styled.div`
  width: 100%;
  height: 180px;
  background: linear-gradient(
    120deg,
    #4f46e5 0%,
    #7c3aed 40%,
    #c084fc 75%,
    #f472b6 100%
  );
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      circle at 80% 20%,
      rgba(255, 255, 255, 0.22) 0%,
      transparent 50%
    );
  }
`;

const ProfileMeta = styled.div`
  ${({ theme }) => css`
    padding: 0 ${theme.spacing.xl}${theme.spacing.lg};
    display: flex;
    align-items: flex-end;
    gap: ${theme.spacing.lg};
    position: relative;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: flex-start;
      gap: ${theme.spacing.md};
      padding: 0 ${theme.spacing.md}${theme.spacing.md};
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
      border-radius: ${theme.border_radius.md}${theme.border_radius.md} 0 0;
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
      border-radius: 0 0 ${theme.border_radius.xl}${theme.border_radius.xl};
      padding: ${theme.spacing.xl};

      @media (max-width: 768px) {
        padding: ${theme.spacing.md};
      }
    }
  `}
`;
