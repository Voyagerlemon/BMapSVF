/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-09 20:46:19
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-09 21:13:44
 * @FilePath: \BMapSVF-Client\src\utils\websocket\websocket.js
 * @Description: WebSocket相关配置
 */

import { Message } from "view-ui-plus";

let socket = new WebSocket("ws://127.0.0.1:5000");
// 与服务器建立连接
socket.onopen = () => {
  Message.success({
    background: true,
    content: "Connected successfully!",
    duration: 3
  });
};
socket.onerror = (event) => {
  Message.error({
    background: true,
    content: `Connected unsuccessful + ${event.reason}`,
    duration: 3
  });
};
socket.onclose = () => {
  Message.info({
    background: true,
    content: "Server is closed, please checking!",
    duration: 3
  });
};
export default socket;
