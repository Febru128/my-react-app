/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-12 21:14:10
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-18 16:51:05
 * @FilePath: \React-App\my-react-app\src\layout\layout.config.ts
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
/* 
用来存放layout 页面的相关配置
也就是说这个页面的数据，后面会由接口返回

这里对外暴露的是一个对象引用，
应该对外暴露一个不可变数据
方案：对象改为函数返回
*/

import { Role } from "../type";
import BannerManage from "../pages/bannerManage/bannerManage";
import ActivityManage from "../pages/activityManage/activityManage";
import AdminUserAdminManage from "../pages/adminUserAdminManage/adminUserAdminManage";
import RegisterUserCheck from "../pages/registerUserCheck/registerUserCheck";
import { IMenu } from "./layout.type";

export const getMenu = function () {
  return [
    {
      key: "/bannerManage",
      label: "轮播图管理",
      roles: [Role.ACTIVITYMANAGE],
      component: BannerManage,
    },
    {
      key: "/activityManage",
      label: "活动管理",
      roles: [Role.ACTIVITYMANAGE],
      component: ActivityManage,
    },
    /* 
    每个路由中/都要注意下，不要遗漏，会匹配不到，尤其是有父子路由组件的！！！
     */
    {
      key: "/userManage",
      label: "用户管理",
      //父级菜单的角色一定包括子集菜单的所有角色
      roles: [Role.USERMANAGE],
      children: [
        {
          key: "/userManage/registerUserCheck",
          label: "注册用户管理",
          roles: [Role.USERMANAGE],
          component: RegisterUserCheck,
        },
        {
          key: "/userManage/adminUserAdminManage",
          label: "后台用户管理",
          roles: [Role.USERMANAGE],
          component: AdminUserAdminManage,
        },
      ],
    },
  ] as IMenu[];
};
