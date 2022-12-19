/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-17 18:23:56
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-17 19:34:30
 * @FilePath: \React-App\my-react-app\src\utils\formatDate.ts
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
import { Moment } from "moment";
export default function formatDate(modelDate: Moment) {
  if (!modelDate) {
    return;
  }
  let date = new Date(modelDate as any);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
