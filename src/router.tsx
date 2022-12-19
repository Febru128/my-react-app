/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-12 20:12:22
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-17 13:39:46
 * @FilePath: \React-App\my-react-app\src\router.tsx
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
import { RouterAPI } from "dva";
import { Router, Route, Switch } from "dva/router";
import Layout from "./layout/layout";
import Login from "./pages/login/login";
import zhCN from "antd/locale/zh_CN";
import { ConfigProvider } from "antd";

/* 
dva 里面的router和我们react-router-dom 一样
*/
export default function RouterStore(api?: RouterAPI) {
  if (api) {
    return (
      <ConfigProvider locale={zhCN}>
        <Router history={api.history}>
          <Switch>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/">
              <Layout></Layout>
            </Route>
          </Switch>
        </Router>
      </ConfigProvider>
    );
  }
  return {};
}
// export default RouterStore;
