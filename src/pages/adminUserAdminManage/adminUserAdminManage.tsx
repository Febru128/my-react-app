/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-12 21:37:55
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-18 17:01:04
 * @FilePath: \React-App\my-react-app\src\pages\adminUserAdminManage\adminUserAdminManage.tsx
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
import { Button, Form, Input, Modal, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import API from "../../api";
import useDelData from "../../hooks/use-del-data";
import useFetchList from "../../hooks/use-fetch-list";
import useInsert from "../../hooks/use-insert";
import { Register } from "../registerUserCheck/registerUserCheck.type";

const AdminUserAdminManage = () => {
  const [form] = Form.useForm();
  // hooks操作数据
  //1.0查询数据
  const { dataSource, total, filterParams, setFilterParams } = useFetchList({
    API: API.getRegisterInfo,
    defaultParams: {
      isback: true,
    },
  });

  // 2.0 新增数据
  const { handleOkHandle, setIsModel, isModel, setDataInfo } = useInsert({
    form: form,
    insertHandle: API.createUser,
    updateHandle: API.updateUser,
    getDetail: API.getUserDetail,
    success: () => {
      setFilterParams({
        ...filterParams,
        page: 1,
      });
    },
  });

  //3.0删除数据
  const { ids, setIds, delData } = useDelData({
    API: API.delRegisterUsers,
    title: "",

    /* 删除成功的回调函数 */
    success: () => {
      /* 重置分页参数 */
      setFilterParams({
        ...filterParams,
        page: 1,
      } as any);
    },
  });

  //表格头数据
  const columns: ColumnsType<Register> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "用户名",
      dataIndex: "userName",
      key: "id",
    },
    {
      title: "密码",
      dataIndex: "password",
      key: "id",
    },
    {
      title: "备注",
      dataIndex: "remark",
      key: "id",
    },

    {
      title: "操作",
      dataIndex: "id",
      key: "id",
      render: (_txet, item) => {
        return (
          <Space>
            <Button
              onClick={() => {
                setDataInfo(item.id);
              }}
            >
              编辑
            </Button>
            <Button
              danger
              onClick={() => {
                delData([item.id]);
              }}
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      {" "}
      <Space>
        <Button>刷新</Button>
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
          disabled={ids.length === 0}
          onClick={() => {
            delData(ids);
          }}
        >
          删除
        </Button>

        <Input
          placeholder="请输入用户名称"
          onChange={(e) => {
            setFilterParams({
              ...filterParams,
              page: 1,
              userName: e.target.value,
            } as any);
          }}
        ></Input>
      </Space>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          total,
          current: filterParams.page,
          pageSize: filterParams.size,
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
      ></Table>
      <Modal
        title="新增"
        onCancel={() => {
          setIsModel(false);
        }}
        onOk={() => {
          setIsModel(true);
        }}
        open={isModel}
      >
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item
            label="昵称"
            name="nickName"
            rules={[
              {
                required: true,
                message: "请输入昵称",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item label="用户名" name="userName">
            <Input></Input>
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input type="password"></Input>
          </Form.Item>

          <Form.Item label="备注" name="remark">
            <Input.TextArea></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminUserAdminManage;
