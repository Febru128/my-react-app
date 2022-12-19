/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-13 20:26:56
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-18 16:25:04
 * @FilePath: \React-App\my-react-app\src\api\index.ts
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
import { Key } from "antd/es/table/interface";
import request from ".././utils/request";
import {
  IActivity,
  IActivityParams,
} from "../pages/activityManage/activityManage.type";
import { IBanner } from "../pages/bannerManage/bannerManage.type";
import { ILoginParams, ILoginResponse } from "../pages/login/login.type";
import {
  Register,
  RegisterParams,
} from "../pages/registerUserCheck/registerUserCheck.type";
import { BasePagesParams, IBasePagination } from "../type";

/* 
   如果业务复杂的话，可以分割module
   这个先全部放在index
 */

const API = {
  /*登录*/
  login(data: ILoginParams) {
    return request.post<ILoginParams, ILoginResponse>("api1/login", data);
  },

  /*获取活动列表 */

  getActivitys(data: IActivityParams) {
    return request.post<IActivityParams, IBasePagination<IActivity>>(
      "api1/activityList/search",
      data
    );
  },

  /*删除数据*/
  delActivitys(ids: Key[]) {
    return request.post<Key[], any>("api1/activityList/del", ids);
  },

  /* 新增数据*/
  createActivity(data: IActivity) {
    return request.post<IActivity, {}>("api1/activityList/add", data);
  },

  /* 修改数据*/
  updateActivity(data: IActivity) {
    return request.post<IActivity, {}>("api1/activityList/update", data);
  },
  /**
   * 查询数据详情
   */
  getActivityDetail(id: string) {
    return request.get<Key[], IActivity>(`api1/activityList/detail?id = ${id}`);
  },
  /**
   * 查询轮播图数据
   *
   */
  getBannerImg(data: BasePagesParams) {
    return request.post<BasePagesParams, IBasePagination<IBanner>>(
      "api1/bannerList/get",
      data
    );
  },

  /**
   * 删除轮播图数据
   */
  delBanners(ids: Key[]) {
    return request.post<Key[], {}>("api1/BannerList/del", ids);
  },
  /**
   * 新增轮播图数据
   */
  addBanners(data: IBanner) {
    return request.post<IBanner, {}>("api1/BannerList/add", data);
  },

  /**
   * 注册用户信息管理查询
   */
  getRegisterInfo(data: RegisterParams) {
    return request.post<RegisterParams, IBasePagination<Register>>(
      `api1/Register/info`,
      data
    );
  },

  /**
   * 删除注册用户信息数据
   */
  delRegisterUsers(ids: Key[]) {
    return request.post<Key[], {}>("api1/Register/del", ids);
  },

  /**
   * 注册用户审核
   */
  checkRegister(data: Pick<Register, "checking" | "id">) {
    return request.post<
      Pick<Register, "checking" | "id">,
      IBasePagination<Register>
    >(`api1/Register/check`, data);
  },

  /**
   * 创建用户
   */
  createUser(data: Register) {
    return request.post<Register, IBasePagination<Register>>(
      `api1/Users/admin/create`,
      data
    );
  },

  /**
   * 创建用户
   */
  updateUser(data: Register) {
    return request.post<Register, IBasePagination<Register>>(
      `api1/Users/admin/update`,
      data
    );
  },
  /**
   * 查询用户详情
   */
  getUserDetail(id: string) {
    return request.get<Key[], Register>(`api1/activityList/detail?id = ${id}`);
  },
};

export default API;
