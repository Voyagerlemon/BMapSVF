/*
 * @Author: xuhy xuhaiyangw@163.com
 * @Date: 2023-04-02 10:45:09
 * @LastEditors: xuhy xuhaiyangw@163.com
 * @LastEditTime: 2023-12-14 21:36:31
 * @FilePath: \BMapSVF-Client\src\api\index.js
 * @Description: Network request encapsulation
 */
import Hjson from "hjson";
import lodash from "lodash";
import axios from "@/utils/http/index";

export const DGET = async (url, serviceName) => {
  try {
    const res = await axios.get(`${url}`, {
      // Prevents axios from automatically JSON.parse
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
    throw new Error(`Request---${serviceName}---${url} fail`);
  }
};

