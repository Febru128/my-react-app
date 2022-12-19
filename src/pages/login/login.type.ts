/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-12 22:53:36
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-13 20:47:09
 * @FilePath: \React-App\my-react-app\src\pages\login\login.type.ts
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */

import { Role } from "../../type";
/* 
登录接口传的参数
*/
export interface ILoginParams {
  username: string;
  password: string;
}

/* 
 登录接口返回值的类型
*/
export interface ILoginResponse {
  token: string;
  roles: Role[];
}
