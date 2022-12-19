/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-12 20:14:49
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-18 16:48:07
 * @FilePath: \React-App\my-react-app\src\layout\layout.tsx
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
import React, { useState } from "react";
import "./layout.css";
import BannerManage from "../pages/bannerManage/bannerManage";
import ActivityManage from "../pages/activityManage/activityManage";
import AdminUserAdminManage from "../pages/adminUserAdminManage/adminUserAdminManage";
import RegisterUserCheck from "../pages/registerUserCheck/registerUserCheck";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Route } from "dva/router";
import { MenuInfo } from "rc-menu/lib/interface";
import { useHistory } from "dva";

import useLayout from "./layout.hooks";

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  //获取当前路由
  const { currentMenu } = useLayout();

  //获取当前菜单组件
  const routerRender = (menuArr = currentMenu) => {
    return menuArr.map((item, index) => {
      return (
        <Route component={item?.component} path={item.key + ""}>
          {item.children && routerRender(item.children)}
        </Route>
      );
    });
  };

  //路由跳转
  const history = useHistory();

  //切换导航栏
  const linkPage = ({ key }: MenuInfo) => {
    history.push(key);
  };

  //退出登录
  const logout = () => {
    /* 
    退出登录的时候，清除token

    */
    localStorage.clear();
    history.push("/login");
  };

  return (
    <Layout id="layout">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">活动管理平台</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={currentMenu}
          onClick={linkPage}
        />
      </Sider>

      <Layout className="site-layout">
        <Header className="header-box">
          {/* <Header style={{ padding: 0, background: colorBgContainer }}> */}
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <Button className="header-btn" type="link" onClick={logout}>
            退出登录
          </Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {routerRender()}
          {/* <Route path="/bannerManage">
            <BannerManage></BannerManage>
          </Route>
          <Route path="/activityManage">
            <ActivityManage></ActivityManage>
          </Route>
          <Route path="/userManage/adminUserAdminManage">
            <AdminUserAdminManage></AdminUserAdminManage>
          </Route>
          <Route path="/userManage/registerUserCheck">
            <RegisterUserCheck></RegisterUserCheck>
          </Route> */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
