/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-15 19:38:23
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-18 15:19:55
 * @FilePath: \React-App\my-react-app\src\hooks\use-fetch-list.ts
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
/* 
获取接口列表数据

*/

import { useEffect, useState } from "react";
import { BasePagesParams } from "../type";
import { IFetchListProps } from "./type";

export default function useFetchList<Response>(
  props: IFetchListProps<Response>
) {
  const [dataSource, setDataSource] = useState<Response[]>([]);

  const [total, setTotal] = useState(0);

  const [filterParams, setFilterParams] = useState({
    ...new BasePagesParams(),
    ...(props.defaultParams || {}),
  });
  /* 
  调用统一在useEffect中使用，返回接口dataSource,给页面传过去
  */
  useEffect(() => {
    getData();
  }, [filterParams]);

  const getData = async () => {
    const { list, pagination } = await props.API(filterParams);
    list.forEach((item: any) => {
      item.key = item.id;
    });
    setDataSource(list);
    setTotal(pagination.total);
  };
  /* 
    请求列表接口，返回dataSource ，total
    */
  return {
    dataSource,
    total,
    filterParams,
    setFilterParams,
    getData,
  };
}
