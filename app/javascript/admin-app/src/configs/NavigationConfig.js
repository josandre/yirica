import { CalendarOutlined, MessageOutlined, ProductOutlined, UserOutlined } from '@ant-design/icons';
import { APP_PREFIX_PATH } from './AppConfig'

const customersNavTree = [{
  key: 'customers',
  path: `${APP_PREFIX_PATH}/customers-management`,
  title: 'sidenav.customers',
  breadcrumb: true,
  isGroupTitle: true,
  submenu: [{
    key: 'users',
    path: `${APP_PREFIX_PATH}/users`,
    title: 'sidenav.customers.users',
    icon: UserOutlined,
    breadcrumb: true,
    isGroupTitle: false,
    submenu: []
  },
  {
    key: 'comments',
    path: `${APP_PREFIX_PATH}/comments`,
    title: 'sidenav.customers.comments',
    icon: MessageOutlined,
    breadcrumb: false,
    submenu: []
  }]
}]

const hotelNavTree = [{
  key: 'hotel',
  path: `${APP_PREFIX_PATH}/hotel-management`,
  title: 'sidenav.hotel',
  breadcrumb: true,
  isGroupTitle: true,
  submenu: [
    {
      key: 'rooms',
      path: `${APP_PREFIX_PATH}/rooms`,
      title: 'sidenav.hotel.rooms',
      icon: ProductOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'rooms.list',
          path: `${APP_PREFIX_PATH}/rooms`,
          title: 'sidenav.hotel.rooms.list',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'rooms.add',
          path: `${APP_PREFIX_PATH}/rooms/add`,
          title: 'sidenav.hotel.rooms.add',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    },
  {
    key: 'reservations',
    path: `${APP_PREFIX_PATH}/reservations`,
    title: 'sidenav.hotel.reservations',
    icon: CalendarOutlined,
    breadcrumb: true,
    submenu: []
  }]
}]

const navigationConfig = [
  ...customersNavTree,
  ...hotelNavTree,
]

export default navigationConfig;
