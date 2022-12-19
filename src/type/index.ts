/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-13 20:04:55
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-15 20:16:50
 * @FilePath: \React-App\my-react-app\src\type\index.ts
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */

import { AnyAction } from "redux";

/* 通用报文体 */
export interface IBaseReponse<T> {
  // 状态码
  code: number;

  // 报错信息
  message: string;

  //返回数据
  data: T;
}

/* 
  菜单枚举
*/
export enum Role {
  //  用户管理
  USERMANAGE = "userManage",

  //活动管理
  ACTIVITYMANAGE = "activityManage",
}

export interface IPayload<T extends Partial<AnyAction>> {
  payload: T;
}

/* 
分页列表的基本类型
*/
export interface IBasePagination<T> {
  // 接口返回的列表数据

  list: T[];

  //分页参数
  pagination: {
    size: number;
    page: number;
    total: number;
  };
}
/*
分页参数 
*/
export class BasePagesParams {
  public page = 1;
  public size = 3;
}
