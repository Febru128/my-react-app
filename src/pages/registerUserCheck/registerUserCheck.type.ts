/* 
注册用户管理列表
*/
export interface Register {
  //审核状态
  checking: number;
  id: string;
  isback: boolean;
  //用户昵称
  nickName: string;
  //备注
  remark: string;
  //用户名
  username: string;
}

export interface RegisterParams {
  isback: boolean;
  checkStatus: string;
  userName: string;
}
