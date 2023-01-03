import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, getReToken, setToken, setReToken } from '@/utils/auth'
import { refreshToken } from '@/api/user'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // 在每个请求的请求头中添加token
      config.headers['Authorization'] = getToken()
    }
    console.log('请求config')
    console.log(config)
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom state is not SUCCESS, it is judged as an error.
    if (res.state !== 'SUCCESS') {
      if (res.code === 9002) { // 登录失败弹窗提醒
        Message({
          message: res.msg + '：用户名或密码错误' || 'Error',
          type: 'error',
          duration: 5 * 1000 // 弹窗持续时间
        })
      } else if (res.code === 9003) { // token过期重新登录
        return refreshToken(getReToken()).then(re => {
          // console.log(re)
          // const { token } = re.data
          // console.log(re.data)
          // commit('SET_TOKEN', token.access_token)// 这个commit是什么作用？
          // commit('SET_RETOKEN', token.refresh_token)
          setToken(re.data.access_token)
          setReToken(re.data.refresh_token)
          console.log(response)
          return service.request(response.config)
        }).catch(err => {
          console.log(err)
          // to re-login
          MessageBox.confirm('长时间未操作，您已自动登出系统，请重新登录', '系统提示', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
        })
      } else { // 其它错误弹窗提醒
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000 // 弹窗持续时间
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
