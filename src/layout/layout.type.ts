/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-14 21:07:47
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-14 21:39:02
 * @FilePath: \React-App\my-react-app\src\layout\layout.type.ts
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
import { MenuItemType } from "antd/es/menu/hooks/useItems";
import { Role } from "../type";

export interface IMenu extends MenuItemType {
  roles: Role[];
  children?: IMenu[];
  component?:React.ComponentType<any>
}
