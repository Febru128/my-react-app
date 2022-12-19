/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-11-30 17:06:40
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-13 22:04:23
 * @FilePath: \React-App\my-react-app\src\index.tsx
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
import dva, { DvaOption } from "dva";
import router from "./router";
import "./index.css";
import "antd/dist/reset.css";
import global from "./model/global";
import { IGlobalState } from "./model/type";

/* 

 初始化 dva state的方法
*/
const initialGLobalState = () => {
  const globalLocal = JSON.parse(localStorage.getItem("global") || "{}");

  /* 
  首先同步现有的数据
  在同步localStorage里面的数据
  遵循后进先出的原则
  */
  return {
    ...global.state,
    ...globalLocal,
  };
};

const app = dva({
  /* 
    每次state改变都会触发
    我们就可以每次改变的时候，存在 localStorage里
    初始化的时候，在拿出来
    */
  onStateChange(state: { global: IGlobalState }) {
    localStorage.setItem("global", JSON.stringify(state.global));
  },

  initialState: {
    global: initialGLobalState(),
  },
} as unknown as DvaOption);

app.router(router);

//引用model
app.model(global);

//挂载并启动项目
app.start("#root");
