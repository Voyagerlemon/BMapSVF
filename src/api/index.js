/*
 * @Author: xuhy 1727317079@qq.com
 * @Date: 2023-04-02 10:45:09
 * @LastEditors: xuhy 1727317079@qq.com
 * @LastEditTime: 2023-04-02 14:48:35
 * @FilePath: \BMapSVF-Client\src\api\index.js
 * @Description: 网络请求封装
 */
import Hjson from "hjson";
import lodash from "lodash";
import axios from "@/utils/http/index";

export const DGET = async (url, serviceName) => {
  try {
    const res = await axios.get(`${url}`, {
      // 阻止 axios 自动 JSON.parse
      // refer https://github.com/axios/axios/issues/907
      transformResponse: undefined,
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate"
      }
    });
    const { data } = res;
    if (lodash.isString(data)) {
      return Hjson.parse(data);
    }
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`请求---${serviceName}---${url}失败`);
  }
};

