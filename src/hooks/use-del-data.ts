/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-17 12:11:34
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-18 13:31:45
 * @FilePath: \React-App\my-react-app\src\hooks\use-del-data.ts
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
import { useState } from "react";
import { IDelData } from "./type";
import { message, Modal } from "antd";
import { Key } from "antd/es/table/interface";

const { confirm } = Modal;

export default function useDelData(props: IDelData) {
  const [ids, setIds] = useState<Key[]>([]);

  const delData = (currenIds?: Key[]) => {
    confirm({
      title: props.title || "确认删除该数据吗?",
      async onOk() {
        /* 
          currenIds 代表单删
          */
        await props.API(currenIds || ids);
        message.success("删除成功");
        props.success && props.success();
      },
    });
  };
  return {
    ids,
    setIds,
    delData,
  };
}
