/*
 * @Author: linxin 1448943441@qq.com
 * @Date: 2022-12-13 23:04:50
 * @LastEditors: linxin 1448943441@qq.com
 * @LastEditTime: 2022-12-13 23:05:12
 * @FilePath: \React-App\my-react-app\src\setupProxy.js
 * @Description: 
 * 
 * Copyright (c) 2022 by linxin 1448943441@qq.com, All Rights Reserved. 
 */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        /**第一个请求配置 */
        createProxyMiddleware('/api1', {	//需要转发的请求（当请求中有api1前缀的请求，会触发该代理配置）
            target: "http://127.0.0.1:5000",//配置转发目标地址(能返回数据的服务器地址)
            changeOrigin: true,//控制服务器收到的请求头中host的值
            /*
	         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
	         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
	         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
	         */
            pathRewrite: { '^/api1': '' }//重写请求路径，去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
        }),
        /**第二个请求配置 */
        createProxyMiddleware('/api2', {//需要转发的请求（当请求中有api2前缀的请求，会触发该代理配置）
            target: "http://localhost:5002",//配置转发目标地址(能返回数据的服务器地址)
            changeOrigin: true,//控制服务器收到的请求头中host的值
            /*
	         	changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
	         	changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000
	         	changeOrigin默认值为false，但我们一般将changeOrigin值设为true
	         */
            pathRewrite: { '^/api2': '' }//重写请求路径，去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
        })
        /** 更多请求配置... */
    )
}
