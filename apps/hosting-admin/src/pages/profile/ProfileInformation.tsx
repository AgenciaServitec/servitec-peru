import React from "react";
import { Col, Image, Row, Title } from "../../components";
import { PhotoNoFound } from "../../images";
import styled, { css } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faIdCard,
  faM,
  faN,
  faP,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../styles";
import type { User } from "../../providers";

interface ProfileInformationProps {
  user: User;
}

export const ProfileInformation: React.FC<ProfileInformationProps> = ({
  user,
}) => {
  return (
    <Container>
      <AvatarSection>
        <AvatarWrapper>
          <Image
            width={160}
            height={160}
            src={user?.profilePhoto?.thumbUrl || PhotoNoFound}
            className="profile-photo"
            preview
          />
        </AvatarWrapper>
        <UserName>
          {user?.firstName} {user?.paternalSurname}
        </UserName>
      </AvatarSection>

      <InfoSection>
        <Title level={4}>Información Personal</Title>
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <InfoItem>
              <InfoIcon>
                <FontAwesomeIcon icon={faN} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Nombres</InfoLabel>
                <InfoValue>{user?.firstName || "No registrado"}</InfoValue>
              </InfoContent>
            </InfoItem>
          </Col>

          <Col span={12}>
            <InfoItem>
              <InfoIcon>
                <FontAwesomeIcon icon={faP} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Apellido Paterno</InfoLabel>
                <InfoValue>
                  {user?.paternalSurname || "No registrado"}
                </InfoValue>
              </InfoContent>
            </InfoItem>
          </Col>

          <Col span={12}>
            <InfoItem>
              <InfoIcon>
                <FontAwesomeIcon icon={faM} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Apellido Materno</InfoLabel>
                <InfoValue>
                  {user?.maternalSurname || "No registrado"}
                </InfoValue>
              </InfoContent>
            </InfoItem>
          </Col>

          <Col span={12}>
            <InfoItem>
              <InfoIcon>
                <FontAwesomeIcon icon={faIdCard} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>DNI</InfoLabel>
                <InfoValue>
                  {user?.document.number || "No registrado"}
                </InfoValue>
              </InfoContent>
            </InfoItem>
          </Col>

          <Col span={12}>
            <InfoItem>
              <InfoIcon>
                <FontAwesomeIcon icon={faEnvelope} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Email</InfoLabel>
                <InfoValue>{user?.email || "No registrado"}</InfoValue>
              </InfoContent>
            </InfoItem>
          </Col>

          <Col span={12}>
            <InfoItem>
              <InfoIcon>
                <FontAwesomeIcon icon={faPhone} />
              </InfoIcon>
              <InfoContent>
                <InfoLabel>Celular</InfoLabel>
                <InfoValue>{user?.phone?.number || "No registrado"}</InfoValue>
              </InfoContent>
            </InfoItem>
          </Col>
        </Row>
      </InfoSection>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const AvatarSection = styled.div`
  ${() => css`
    padding: ${theme.spacing.xl} ${theme.spacing.md};
    text-align: center;
  `}
`;

const AvatarWrapper = styled.div`
  ${() => css`
    width: 160px;
    height: 160px;
    margin: 0 auto ${theme.spacing.md};
    border-radius: ${theme.border_radius.full};
    overflow: hidden;
    border: 2px solid ${theme.colors.primary};
    transition: ${theme.transitions.fast};

    .profile-photo {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    img {
      border-radius: ${theme.border_radius.full};
    }
  `}
`;

const UserName = styled.h2`
  ${() => css`
    color: ${theme.colors.fontPrimary};
    font-size: ${theme.font_sizes.xl};
    font-weight: ${theme.font_weight.large};
    margin-bottom: ${theme.spacing.xs};
    text-transform: capitalize;
  `}
`;

const InfoSection = styled.div`
  ${() => css`
    padding: ${theme.spacing.xl} ${theme.spacing.md};
  `}
`;

const InfoItem = styled.div`
  ${() => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.md};
    padding: ${theme.spacing.sm};
    border-radius: ${theme.border_radius.md};
    background: ${theme.colors.bgTertiary};
    border: 1px solid ${theme.colors.border};
    transition: ${theme.transitions.fast};
  `}
`;

const InfoIcon = styled.div`
  ${() => css`
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${theme.colors.primaryAlpha};
    border-radius: ${theme.border_radius.sm};
    color: ${theme.colors.primary};
    font-size: ${theme.font_sizes.md};
    flex-shrink: 0;
  `}
`;

const InfoContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const InfoLabel = styled.div`
  ${() => css`
    color: ${theme.colors.fontTertiary};
    font-size: ${theme.font_sizes.xs};
    margin-bottom: 2px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `}
`;

const InfoValue = styled.div`
  ${() => css`
    color: ${theme.colors.fontPrimary};
    font-size: ${theme.font_sizes.sm};
    font-weight: ${theme.font_weight.medium};
    word-break: break-word;
  `}
`;
