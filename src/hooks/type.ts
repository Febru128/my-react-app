/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-15 19:49:21
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-18 15:18:45
 * @FilePath: \React-App\my-react-app\src\hooks\type.ts
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
import { FormInstance } from "antd";
import { Key } from "antd/es/table/interface";
import { IBasePagination } from "../type";
export interface IFetchListProps<Response> {
  /* 
    每个接口获取数据的接口
    */
  API: (params: any) => Promise<IBasePagination<Response>>;
  defaultParams?: Object;
}

export interface IDelData {
  API: (ids: Key[]) => Promise<{}>;
  title?: string;
  success?: () => void;
}

export interface InsertData<T> {
  form: FormInstance<T>;
  convertData?: (data: T) => T;
  insertHandle?: (data: T) => void;
  updateHandle?: (data: T) => void;
  success?: () => void;
  getDetail?: (id: string) => Promise<T>;
  convertBackData?: (data: T) => T;
}
