/**
 * 全局配置文件
 */
let baseURL;
if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://www.jiangfeather.com/api';
} else {
  baseURL = '/api';
}

export default { baseURL };
