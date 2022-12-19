/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-13 20:58:51
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-14 22:28:37
 * @FilePath: \React-App\my-react-app\src\model\global.ts
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
/* 

存放全局变量
*/

import { Model, routerRedux } from "dva";
import { ILoginResponse } from "../pages/login/login.type";
import { IPayload } from "../type";

const model = {
  namespace: "global", //命名空间

  state: {
    roles: [],
    token: "",
  },

  /* 
   里面存放副作用函数，专门处理异步函数
   不能直接修改state
   如果要修改state必须使用 put 方法调用reducers里面的方法
   redux-saga ：dva 内部封装
  */
  effects: {
    /* 
   保存登录后，接口返回的信息
   payload是必传的，包括所有参数
   */
    *setUserInfo({ payload }: Partial<IPayload<ILoginResponse>>, { put }) {
      //调用 reducers里面的方法，修改token和rules
      yield put({
        type: "save",
        payload,
      });

      yield put(routerRedux.push("/activityManage"));
      /* 
        接收到的参数，赋值给state
        */
    },
  },
  /* 
 里面只能放纯函数，不能放副作用函数 
 return 什么 ，state 就是什么（返回新的state）
*/

  reducers: {
    /* 
      为什么这里的IPayload 要是any
      因为这个方法是通用的
      */
    save(state, action: Partial<IPayload<any>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ history }) {
      /* 
        每次路由变化都会触发这个方法
        */
      history.listen((router) => {
        const global = JSON.parse(localStorage.getItem("global") || "{}");

        //设置白名单 -'/login'
        const ignoreUrls = ["/login"];
        /* 
        如果本地没有token代表未登录，跳转login界面,白名单的除外
        */
        if (!global?.token && !ignoreUrls.includes(router.pathname)) {
          history.push("/login");
        }
      });
    },
  },
} as Model;

export default model;
