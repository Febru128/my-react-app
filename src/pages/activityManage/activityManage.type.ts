/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-14 22:45:16
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-17 18:45:04
 * @FilePath: \React-App\my-react-app\src\pages\activityManage\activityManage.type.ts
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */

import { BasePagesParams } from "../../type";

/* 
活动管理列表
*/
export interface IActivity {
  //活动人数上限
  activityMax: number;
  //活动名称
  activityName: string;
  //  活动人数
  activityRegistered: number;
  // 活动开始时间
  activityStartDate: string;
  // 活动详情
  activityDesc: string;
  // 活动结束时间
  activityEndDate: string;
  // 活动状态
  activitystatus: string;
  // 地址
  address: string;
  // 主办方
  business: string;
  // 微信
  id: string;
  // 活动封面
  activityImg: string;
  //时间
  activityDate?: string[];
}

export interface IActivityParams extends BasePagesParams {
  activitystatus: string;
  activityName: string;
}
