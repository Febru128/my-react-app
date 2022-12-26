# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
<!--
## api

- 请求层，所有的 API 都写在 api 里面
- 后期如果项目变大，可以在 API 层里面在划分模块

## components

- 存放全局组件的

## hooks

- 存放全局 hooks
- 删除的 hooks
- 获取数据的 hooks
- 插入的 hooks

## layout

- 基本结构目录

## model

- 存放全局状态的目录
- 并且对 model 做了持久化

# page

- 页面代码

## type

- 全局类型

## utils

- 通用工具

## axios

- 每次请求前都会自动携带 token
- 每次返回都会根据业务返回的 code 做出全局错误的拦截，如果正确，则解构出 view 中需要的 data 返回，
- 并且每次请求的时候，都需要传两个泛型，一个是上传参数的类型，另一个返回数据的类型

## dva

- 首页我们对 dva 做了持久化，每次 state 变化的时候，我们都会存在 localStorage 中，
  防止页面刷新的时候，数据丢失
- 做了未登录的状态拦截
  subscribe 中；使用了路由的listen方法，监听路由的变化，如果本地没有 token,则代表未登录，直接调回/login 登录界面

  ## 权限
  - 我们手动创建了一个菜单树，并且菜单树上有对应的权限，以及菜单对应的组件
  所以说，我们可以直接使用递归的方式，对我们的菜单进行筛选，只留下有权限的使用的菜单
  - 还有对路由进行筛选，没有权限的路由直接不渲染，防止用户直接修改url跳转到对应菜单

  ## 自定义hooks
-  插入数据的hooks
   - 可以帮我们完成，插入数据的通用功能
      - 获取表单的数据
      - 暴露出个性化定义定制数据的切面
      - 调用插入数据的接口
      - 提示插入成功
      - 暴露插入成功的回调函数
-  删除数据的hooks
  - 可以帮我们完成，删除数据的功能
    - 确认好，要删除数据的id
    - 调用confirm 方法，提示用户
    - OK的时候，调用接口，提示成功
    - 暴露出成功的回调
-  获取数据的hooks 
  - 可以帮我们获取列表数据，以及筛选列表
    - 确认好筛选参数
    - 每次参数变化的时候，都需要调用下列表查询接口
    - 把拿到的列表数据返回
    - 再暴露出修改参数的钩子
    
  
To learn React, check out the [React documentation](https://reactjs.org/)
