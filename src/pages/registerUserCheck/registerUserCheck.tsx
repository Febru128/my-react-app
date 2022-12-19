/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-12 21:36:27
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-18 15:37:00
 * @FilePath: \React-App\my-react-app\src\pages\registerUserCheck\registerUserCheck.tsx
 * @Description:
 *
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved.
 */
import { Button, Input, message, Modal, Radio, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import API from "../../api";
import useDelData from "../../hooks/use-del-data";
import useFetchList from "../../hooks/use-fetch-list";
import { Register } from "./registerUserCheck.type";

const RegisterUserCheck = () => {
  const { confirm } = Modal;
  //枚举数据
  const registerStatus = [
    {
      value: "",
      label: "全部",
    },
    {
      value: "0",
      label: "审核中",
    },
    {
      value: "1",
      label: "已通过",
    },
    {
      value: "2",
      label: "未通过",
    },
  ];

  //表格头数据
  const columns: ColumnsType<Register> = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "昵称",
      dataIndex: "nickName",
      key: "id",
    },
    {
      title: "手机号码",
      dataIndex: "userName",
      key: "id",
    },
    {
      title: "密码",
      dataIndex: "password",
      key: "id",
    },
    {
      title: "审核状态",
      dataIndex: "checking",
      key: "id",
      render: (text) => {
        return getRegisterStatusName(text);
      },
    },
    {
      title: "审核",
      dataIndex: "checking",
      key: "id",
      render: (text, Item) => {
        return (
          <Space>
            <Button
              type="primary"
              disabled={text !== "0"}
              onClick={() => {
                checkUser({
                  checking: 1,
                  id: Item.id,
                });
              }}
            >
              通过
            </Button>
            <Button
              danger
              onClick={() => {
                checkUser({
                  checking: 2,
                  id: Item.id,
                });
              }}
            >
              拒绝
            </Button>
          </Space>
        );
      },
    },

    {
      title: "操作",
      dataIndex: "id",
      key: "id",
      render: (_txet, item) => {
        return (
          <Space>
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

  const getRegisterStatusName = (text: string) => {
    switch (text) {
      case "0":
        return "审核中";
      case "1":
        return "已通过";
      case "2":
        return "未通过";
      default:
        return "全部";
    }
  };

  /**
   * hooks操作数据
   */
  //1.0查询数据
  const { dataSource, total, filterParams, setFilterParams } =
    useFetchList<Register>({
      API: API.getRegisterInfo,
      defaultParams: {
        isback: false,
      },
    });

  //2.0删除数据
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

  //审核
  const checkUser = async ({ checking, id }) => {
    const checkName = checking === 1 ? "通过" : "拒绝";
    confirm({
      title: `确认${checkName}`,
      async onOk() {
        await API.checkRegister({ checking, id });
        message.success(`${checkName}成功！`);
        setFilterParams({
          ...filterParams,
          page: 1,
        });
      },
    });
  };

  //状态切换
  //单选框change事件
  const onChange = (e) => {
    setFilterParams({
      ...filterParams,
      page: 1,
      activityStatus: e.target.value,
    } as any);
  };

  return (
    <div>
      <Space>
        <Button>刷新</Button>
        <Button
          danger
          disabled={ids.length === 0}
          onClick={() => {
            delData(ids);
          }}
        >
          删除
        </Button>
        <Radio.Group onChange={onChange} defaultValue="">
          {registerStatus.map((item) => {
            return <Radio.Button value={item.value}>{item.label}</Radio.Button>;
          })}
        </Radio.Group>
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
    </div>
  );
};

export default RegisterUserCheck;
