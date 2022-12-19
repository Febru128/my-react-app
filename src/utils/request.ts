/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-13 20:08:54
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-13 23:06:09
 * @FilePath: \React-App\my-react-app\src\utils\request.ts
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
import { message } from "antd";
import axios, { AxiosResponse } from "axios";
import { IBaseReponse } from "../type/index";

/* 
  AxiosResponse 接收两个泛型
  第一个T是规定业务层的请求类型，也就是接口定义的类型
  所以我们用统一的返回结构IBaseResponse

  IBaseResponse 又接收一个类型，这个类型就泛指具体业务
*/
// axios.defaults.baseURL = 'http://127.0.0.1:5000/'


axios.interceptors.response.use(
  (response: AxiosResponse<IBaseReponse<any>>) => {
    /* 
    按照我们的业务
    返回的code不是200的时候都是报错
    需要前端提示报错
    */
    if (response.data.code !== 200) {
      //   提示报错信息
      message.error(response.data.message);

      //抛出错误，阻塞后续程序运行
      throw new Error(response.data.message);
    }
    //正确的话，正常数据返回
    return response.data.data;
  }
);

axios.interceptors.request.use((config) => {
  if (config.headers) {
    const globalLocal = JSON.parse(localStorage.getItem("global") || "{}");
    config.headers["Authorization"] = globalLocal.token;
  }
  return config;
});

export default axios;
