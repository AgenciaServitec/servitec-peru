import styled from 'styled-components';
import { Drawer, Menu } from '../ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faClipboardUser,
  faFileAlt,
  faGears,
  faHome,
  faListCheck,
  faPoll,
  faShapes,
  faSquareCheck,
  faTicket,
  faUsers,
  faUsersCog,
} from '@fortawesome/free-solid-svg-icons';

type DrawerLayoutProps = {
  isVisibleDrawer: boolean;
  onSetIsVisibleDrawer: (isVisibleDrawer: boolean) => void;
};

export const DrawerLayout = ({ isVisibleDrawer, onSetIsVisibleDrawer }: DrawerLayoutProps) => {
  const items = [
    {
      label: 'Home',
      key: 'home',
      icon: <FontAwesomeIcon icon={faHome} size="lg" />,
      isVisible: true,
    },
    {
      label: 'Control de Accesos (acls)',
      key: 'group-acls',
      icon: <FontAwesomeIcon icon={faUsersCog} size="lg" />,
      isVisible: true,
      children: [
        {
          label: 'Roles con Acls',
          key: 'default-roles-acls',
          isVisible: true,
        },
        {
          label: 'Administrador Acls',
          key: 'manage-acls',
          isVisible: true,
        },
      ],
    },
    {
      label: 'Administración',
      key: 'manager',
      icon: <FontAwesomeIcon icon={faGears} size="lg" />,
      isVisible: true,
      children: [
        {
          label: 'Usuarios',
          key: 'users',
          icon: <FontAwesomeIcon icon={faUsers} size="lg" />,
          isVisible: true,
        },
      ],
    },
    {
      label: 'Assistencias',
      key: 'assistance',
      icon: <FontAwesomeIcon icon={faClipboardUser} size="lg" />,
      isVisible: true,
      children: [
        {
          label: 'Marcar asistencia',
          key: 'assistance',
          icon: <FontAwesomeIcon icon={faSquareCheck} size="lg" />,
          isVisible: true,
        },
        {
          label: 'Lista de asistencias',
          key: 'assistances',
          icon: <FontAwesomeIcon icon={faListCheck} size="lg" />,
          isVisible: true,
        },
      ],
    },
    {
      label: 'Sorteos',
      key: 'raffles',
      icon: <FontAwesomeIcon icon={faTicket} size="lg" />,
      isVisible: true,
      children: [
        {
          label: 'Crear Sorteo',
          key: 'raffle',
          icon: <FontAwesomeIcon icon={faTicket} size="lg" />,
          isVisible: true,
        },
        {
          label: 'Lista de Sorteos',
          key: 'raffles-list',
          icon: <FontAwesomeIcon icon={faListCheck} size="lg" />,
          isVisible: true,
        },
      ],
    },
    {
      label: 'Tutoriales',
      key: 'tutorials',
      icon: <FontAwesomeIcon icon={faShapes} size="lg" />,
      isVisible: true,
      children: [
        {
          label: 'Crear Tutorial',
          key: 'tutorial',
          icon: <FontAwesomeIcon icon={faShapes} size="lg" />,
          isVisible: true,
        },
        {
          label: 'Lista de Tutoriales',
          key: 'tutorial-list',
          icon: <FontAwesomeIcon icon={faListCheck} size="lg" />,
          isVisible: true,
        },
      ],
    },
    {
      label: 'Encuestas',
      key: 'surveys',
      icon: <FontAwesomeIcon icon={faPoll} size="lg" />,
      isVisible: true,
      children: [
        {
          label: 'Estudio del Clima Organizacional',
          key: 'organizational-climate-studies',
          icon: <FontAwesomeIcon icon={faFileAlt} size="lg" />,
          isVisible: true,
        },
      ],
    },
  ];

  return (
    <DrawerContainer
      key="right"
      title={
        <div style={{ width: '100%', textAlign: 'right' }}>
          <h5 style={{ color: '#fff' }}>version: "v1"</h5>
        </div>
      }
      placement="left"
      width={330}
      closable={true}
      onClose={() => onSetIsVisibleDrawer(!isVisibleDrawer)}
      open={isVisibleDrawer}
      className="drawer-content"
      bodyStyle={{ padding: '0' }}
    >
      <div className="logo" />
      <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
    </DrawerContainer>
  );
};

const DrawerContainer = styled(Drawer)`
  .drawer-content {
    color: #fff;
  }
`;
