/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-14 20:51:52
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-15 20:42:01
 * @FilePath: \React-App\my-react-app\src\layout\layout.hooks.ts
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
import { useSelector } from "dva";
import { useEffect, useState } from "react";
import { IGlobalState } from "../model/type";
import { getMenu } from "./layout.config";
import { IMenu } from "./layout.type";

export default function useLayout() {
  const [currentMenu, setCurrentMenu] = useState<IMenu[]>([]);

  //获取state
  const global = useSelector<{ global: IGlobalState }, IGlobalState>(
    (state) => {
      return state.global;
    }
  );

  //组件每次渲染，每次调用，可以设置依赖项，根据依赖项变化渲染后调用
  useEffect(() => {
    setCurrentMenu(getCurrentMenus());
  }, []);

  //获取当前菜单
  const getCurrentMenus = (menuArr = getMenu()) => {
    return menuArr.filter((item) => {
      if (item.children) {
        item.children = getCurrentMenus(item.children);
      }
      return item.roles.some((val) => {
        return global.roles.includes(val);
      });
    });
  };

  return {
    currentMenu,
  };
}
