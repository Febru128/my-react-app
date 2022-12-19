import {
  Button,
  Input,
  Radio,
  Space,
  Table,
  Image,
  Form,
  DatePicker,
} from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { activityStatus } from "./activityManage.config";
import { IActivity } from "./activityManage.type";
import useFetchList from "../../hooks/use-fetch-list";
import API from "../../api";
import useDelData from "../../hooks/use-del-data";
import Modal from "antd/es/modal/Modal";
import UploadImg from "../../components/upload-img";
import useInsert from "../../hooks/use-insert";
import formatDate from "../../utils/formatDate";
import moment from "moment";

const ActivityManage = () => {
  const { RangePicker } = DatePicker;

  const [form] = Form.useForm();

  /* 调用列表hooks，希望拿到列表返回的数据，或者直接渲染的数据*/
  const { dataSource, total, filterParams, setFilterParams } =
    useFetchList<IActivity>({
      API: API.getActivitys,
    });

  /* 调用删除hooks ，删除数据，同时获取删除数据的IDs */
  const { ids, setIds, delData } = useDelData({
    API: API.delActivitys,
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

  /*使用新增/修改 hooks -- useInsert*/
  const { handleOkHandle, setIsModel, isModel, setDataInfo } = useInsert({
    form: form,
    convertData: (data) => {
      if (data.activityDate) {
        data.activityStartDate =
          formatDate(data.activityDate[0] as any) || data.activityStartDate;
        data.activityEndDate =
          formatDate(data.activityDate[1] as any) || data.activityEndDate;
      }
      return data;
    },
    insertHandle: API.createActivity,
    updateHandle: () => {},
    success: () => {
      setFilterParams({ ...filterParams, page: 1 });
    },
    getDetail: API.getActivityDetail,
    convertBackData: (data) => {
      data.activityDate = [
        moment(data.activityStartDate, "YYYY/MM/DD") as any,
        moment(data.activityEndDate, "YYYY/MM/DD") as any,
      ];
      return data;
    },
  });

  //表格头数据
  const columns: ColumnsType<IActivity> = [
    {
      title: "活动名称",
      dataIndex: "activityName",
      key: "id",
      width: 200,
    },
    {
      title: "活动封面",
      dataIndex: "activityImg",
      key: "id",
      width: 100,

      /* 第一个参数是我吗dataIndex定义的值*/
      render: (text) => {
        return <Image width={100} src={text}></Image>;
      },
    },
    {
      title: "活动状态",
      dataIndex: "activityStatus",
      key: "id",
      width: 100,
      render: (text) => {
        return getActivityStatusName(text);
      },
    },
    {
      title: "活动上限",
      dataIndex: "activityMax",
      key: "id",
    },
    {
      title: "报名人数",
      dataIndex: "activityRegistered",
      key: "id",
    },
    {
      title: "活动时间",
      dataIndex: "activityDate",
      key: "id",
      render: (text, item) => {
        return `${item.activityStartDate}-${item.activityEndDate}`;
      },
    },
    {
      title: "主办方",
      dataIndex: "business",
      key: "id",
    },
    {
      title: "操作",
      dataIndex: "id",
      key: "id",
      render: (txet, item) => {
        return (
          <Space>
            <Button
              type="primary"
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
            <Button>查看报名人数</Button>
          </Space>
        );
      },
    },
  ];

  const getActivityStatusName = (text: string) => {
    switch (text) {
      case "0":
        return "全部";
      case "1":
        return "未开始";
      case "2":
        return "进行中";
      case "3":
        return "已结束";
      default:
        return "";
    }
  };

  const handleOK = () => {
    //获取表单内容

    //对内容进行转换，转换成接口需要的格式

    //调用后台接口，
    handleOkHandle();
    //重新调用查询
  };

  const handleCancel = () => {
    setIsModel(false);
  };

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
      {/* 头部筛选栏 */}
      <Space>
        <Button>刷新</Button>
        <Button type="primary" onClick={() => setIsModel(true)}>
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
        <Radio.Group onChange={onChange} defaultValue="">
          {activityStatus.map((item) => {
            return <Radio.Button value={item.value}>{item.label}</Radio.Button>;
          })}
        </Radio.Group>
        <Input
          placeholder="请输入活动名称"
          onChange={(e) => {
            setFilterParams({
              ...filterParams,
              page: 1,
              activityName: e.target.value,
            } as any);
          }}
        ></Input>
      </Space>
      <Table
        style={{ marginTop: "20px" }}
        columns={columns}
        dataSource={dataSource}
        scroll={{
          x: 1500,
        }}
        rowSelection={{
          type: "checkbox",
          onChange: (keys) => {
            setIds(keys);
          },
        }}
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
      ></Table>
      <Modal
        title="活动新增"
        open={isModel}
        onCancel={handleCancel}
        onOk={handleOK}
      >
        <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item
            label="活动名"
            name="activityName"
            rules={[
              {
                required: true,
                message: "请输入活动名",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item label="活动上限" name="activityMax">
            <Input></Input>
          </Form.Item>
          <Form.Item label="活动上限" name="activityDate">
            <RangePicker />
          </Form.Item>
          <Form.Item label="主办方" name="business">
            <Input></Input>
          </Form.Item>
          <Form.Item label="上传图片" name="business">
            <UploadImg></UploadImg>
          </Form.Item>
          <Form.Item label="活动详情" name="activityDesc">
            <Input.TextArea></Input.TextArea>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ActivityManage;
