import axios from 'axios';
import moment from 'moment';
import { Toast } from 'antd-mobile';
import qs from 'qs';

const api_url = 'https://www.famulei.com/services/api_url.php';

axios.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  config.url = api_url;
  config.data.platform = 'web';
  config.data.api_version = '9.9.9';
  config.data.language_id = '1';
  config.data.gameID = '1';
  config.headers['content-type']='application/x-www-form-urlencoded; charset=UTF-8'
  config.data = qs.stringify(config.data);
  return config;
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  if (response.status === 200) {
    if (response.data.code === "200") {
      return response.data.data;
    } else {
      Toast.fail(response.data.message);
      return Promise.reject();
    }
  } else {
    return Promise.reject();
  }
}, function(error) {

  return Promise.reject();
});


moment.locale('zh-cn');
