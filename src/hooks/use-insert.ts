import { message } from "antd";
import { useEffect, useState } from "react";
import { InsertData } from "./type";

//新增和修改数据
export default function useInsert<T>(props: InsertData<T>) {
  const [isModel, setIsModel] = useState(false);

  //监听界面关闭-reset
  useEffect(() => {
    if (!isModel) {
      props.form.resetFields();
    }
  }, [isModel]);
  const handleOkHandle = async () => {
    //获取表单的数据
    let data = props.form.getFieldsValue(true);
    //对表单的数据进行转换
    data = props.convertData ? props.convertData(data) : data;

    //调用后端接口
    //判断是编辑还是新增
    data.id
      ? props.updateHandle && (await props.updateHandle(data))
      : props.insertHandle && (await props.insertHandle(data));

    //暴露新的切面，新增或修改成功后的回调
    props.success && props.success();

    //提示新增或修改成功
    message.success(data.id ? "修改成功！" : "新增成功！");
    setIsModel(false);
  };
  /**
   * 回显表单数据的方法
   */
  const setDataInfo = async (id: string) => {
    //    获取当前id的数据
    let data = await props.getDetail!(id);

    //暴露一个可以操作回显数据的方法
    (data as any) = props.convertBackData ? props.convertBackData(data) : data;
    //给表单回显数据
    props.form.setFieldsValue(data as any);

    //打开弹窗
    setIsModel(true);
  };
  return { handleOkHandle, setIsModel, isModel, setDataInfo };
}
