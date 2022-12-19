/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-12 20:28:15
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-13 22:13:28
 * @FilePath: \React-App\my-react-app\src\pages\login\login.tsx
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-12 20:28:15
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-13 21:43:27
 * @FilePath: \React-App\my-react-app\src\pages\login\login.tsx
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
import { Button, Card, Checkbox, Form, Input } from "antd";
import "./login.scss";
import { ILoginParams } from "./login.type";
import API from "../../api";
import { useDispatch, useSelector } from "dva";
import { omit } from "lodash";
import { IGlobalState } from "../../model/type";

export default function Login() {
  const dispatch = useDispatch();

  const globalState = useSelector<{ global: IGlobalState; IGlobalState }>(
    ({ global }) => global
  );

  const login = async (values: ILoginParams) => {
    console.log(values);

    /* 
    调用登录接口，并传入参数
   */
    let res = await API.login(values);
    console.log(res.token);
    /* 
     调用完接口，拿到了token和相关角色
     token 要全局封装在axios
     使用角色过滤菜单
     
     最后，跳转到活动管理页面
    */
    dispatch({
      //对应模块里面的effect 里面的方法
      type: "global/setUserInfo",
      //所有的dispatch 传参数都放在payload对象里
      payload: {
        ...omit(res, ["checking"]),
      },
    });
  };
  return (
    <div id="login">
      <Card style={{ width: 800 }}>
        <h2 className="title">活动管理平台</h2>
        <Form
          name="basic"
          className="loginForm"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={login}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: "请输入用户名!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "请输入密码!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <div className="login-btn">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
