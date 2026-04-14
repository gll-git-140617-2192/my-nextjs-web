import { 
  UserOutlined, 
  DashboardOutlined, 
  SettingOutlined,
  TeamOutlined, 
  ReadOutlined
} from "@ant-design/icons";

export const MENU_ITEMS = [
  {
    path: "/",
    name: "控制台",
    icon: <DashboardOutlined />,
  },
  {
    name: "用户管理",
    icon: <TeamOutlined />,
    children: [
      {
        path: "/about",
        name: "用户列表",
        icon: <UserOutlined />,
      },
      {
        path: "/users/roles",
        name: "角色权限",
        icon: <SettingOutlined />,
      },
    ],
  }, 
];