/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-12 21:24:55
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-18 13:51:05
 * @FilePath: \React-App\my-react-app\src\pages\bannerManage\bannerManage.tsx
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
import { Button, Space, Table, Image, Modal, Form } from "antd";
import { useForm } from "antd/es/form/Form";
import { ColumnsType } from "antd/es/table";
import React, { Key } from "react";
import API from "../../api";
import UploadImg from "../../components/upload-img";
import useDelData from "../../hooks/use-del-data";
import useFetchList from "../../hooks/use-fetch-list";
import useInsert from "../../hooks/use-insert";
import { IBanner } from "./bannerManage.type";

const BannerManage = () => {
  //表格头
  const columns: ColumnsType<IBanner> = [
    {
      title: "图片",
      dataIndex: "img",
      key: "id",
      render: (text) => {
        return <Image width={100} src={text}></Image>;
      },
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "id",
      render: (text, item) => {
        return (
          <Button
            danger
            onClick={() => {
              delData([item.id]);
            }}
          >
            删除
          </Button>
        );
      },
    },
  ];

  //表格数据
  const [form] = useForm<IBanner>();
  //引入hooks
  //1.查询
  const { dataSource, total, filterParams, setFilterParams, getData } =
    useFetchList({
      API: API.getBannerImg,
    });

  //2.0删除
  const { ids, setIds, delData } = useDelData({
    API: API.delBanners,
    success: () => {
      setFilterParams({
        ...filterParams,
        page: 1,
      });
    },
  });

  //3.0新增
  const { handleOkHandle, setIsModel, isModel } = useInsert({
    form: form,
    insertHandle: API.addBanners,
    success: () => {
      setFilterParams({
        ...filterParams,
        page: 1,
      });
    },
  });

  return (
    <div>
      <Space>
        <Button onClick={getData}>刷新</Button>
        <Button
          type="primary"
          onClick={() => {
            setIsModel(true);
          }}
        >
          新增
        </Button>
        <Button
          danger
          onClick={() => {
            delData(ids);
          }}
        >
          删除
        </Button>
      </Space>
      <Table
        pagination={{
          total,
          pageSize: filterParams.size,
          current: filterParams.page,
          onChange: (page) => {
            setFilterParams({
              ...filterParams,
              page,
            });
          },
        }}
        rowSelection={{
          type: "checkbox",
          onChange: (keys) => {
            setIds(keys);
          },
        }}
        columns={columns}
        dataSource={dataSource}
      ></Table>
      <Modal
        title="新增"
        onOk={handleOkHandle}
        open={isModel}
        onCancel={() => {
          setIsModel(false);
        }}
      >
        <Form form={form}>
          <Form.Item label="图片" name="activityImg">
            <UploadImg></UploadImg>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BannerManage;
