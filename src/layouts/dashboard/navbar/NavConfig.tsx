// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'general',
  //   items: [
  //     { title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
  //       ],
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'الطلبات',
        path: PATH_DASHBOARD.products.root,
        icon: ICONS.cart,
      },
      {
        title: 'الفئات',
        path: PATH_DASHBOARD.categories.root,
        icon: ICONS.menuItem,
      },
      {
        title: 'المنتجات',
        path: PATH_DASHBOARD.products.root,
        icon: ICONS.ecommerce,
      },

      {
        title: 'التواصل الاجتماعي',
        path: PATH_DASHBOARD.products.root,
        icon: ICONS.mail,
      },
      {
        title: 'روابط البانر',
        path: PATH_DASHBOARD.products.root,
        icon: ICONS.dashboard,
      },
    ],
  },
];

export default navConfig;
