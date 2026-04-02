import styled from "styled-components";
import { Card } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faPlus } from "@fortawesome/free-solid-svg-icons";

const ShortcutCard = ({ item, onList, onCreate }) => {
  return (
    <ModernCard $color={item.color}>
      <CardBody>
        <IconContainer $color={item.color}>
          <FontAwesomeIcon icon={item.icon} />
        </IconContainer>
        <div className="info">
          <h3>{item.title}</h3>
          <p>Módulo de gestión</p>
        </div>
      </CardBody>

      <LightningActions $color={item.color}>
        <button className="list-action" onClick={onList}>
          <FontAwesomeIcon icon={faListUl} />
          <span>Lista</span>
        </button>
        <button className="create-action" onClick={onCreate}>
          <FontAwesomeIcon icon={faPlus} />
          <span>Crear</span>
        </button>
      </LightningActions>
    </ModernCard>
  );
};

export default ShortcutCard;

const ModernCard = styled(Card)<{ $color: string }>`
  background: #141414;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition:
    border-color 0.3s ease,
    background 0.3s ease;

  .ant-card-body {
    padding: 0;
  }

  &:hover {
    background: #1a1a1a;
    border-color: ${({ $color }) => $color}80;
  }
`;

const CardBody = styled.div`
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;

  .info {
    h3 {
      color: #eeeeee;
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.2;
    }
    p {
      color: rgba(255, 255, 255, 0.45);
      font-size: 0.85rem;
      margin: 4px 0 0 0;
      font-weight: 400;
    }
  }
`;

const IconContainer = styled.div<{ $color: string }>`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: ${({ $color }) => $color}15;
  color: ${({ $color }) => $color};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  border: 1px solid ${({ $color }) => $color}25;
`;

const LightningActions = styled.div<{ $color: string }>`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 52px;
  background: rgba(255, 255, 255, 0.03);
  border-top: 1px solid rgba(255, 255, 255, 0.05);

  button {
    border: none;
    cursor: pointer;
    background: transparent;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 500;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s ease;

    &:hover {
      color: #fff;
    }
  }

  .list-action {
    clip-path: polygon(0 0, 100% 0, 90% 100%, 0% 100%);
    border-right: 1px solid rgba(255, 255, 255, 0.05);
    &:hover {
      background: ${({ $color }) => $color}15;
      color: ${({ $color }) => $color};
    }
  }

  .create-action {
    clip-path: polygon(10% 0, 100% 0, 100% 100%, 0% 100%);
    margin-left: -10%;
    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  }

  @media (max-width: 767px) {
    height: 48px;
    .list-action {
      clip-path: polygon(0 0, 100% 0, 88% 100%, 0% 100%);
    }
  }
`;
