

# Taro 使用心得

## 在 Taro 上使用 dva

### src/store.js

```js
import { create } from 'dva-core'
// import { createLogger } from 'redux-logger'
import createLoading from 'dva-loading'

let app
let store
let dispatch

function createApp(opt) {
  // redux日志
  // Object.assign(opt, {
  //   onAction: [createLogger()]
  // })
  app = create(opt)
  app.use(createLoading({}))

  if (!global.registered) opt.models.forEach(model => app.model(model))
  global.registered = true
  app.start()

  // eslint-disable-next-line no-underscore-dangle
  store = app._store
  app.getStore = () => store

  dispatch = store.dispatch

  app.dispatch = dispatch

  return app
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch
  }
}
```



### src/app.js

```js
import Taro, { Component } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
// ...
import dva from './store'
import models from './models'

const dvaApp = dva.createApp({
  initialState: {},
  models,
})

const store = dvaApp.getStore()

class App extends Component {
  // ...
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
```



### src/models/index.js

归纳所有的 model 文件

```js
import home from '@/pages/home/model'
import count from './count'

export default [count, home]
```



### src/models/count.js

```js
export default {
  namespace: 'count',
  state: {
    count: 0,
  },
  effects: {
    *addAfterOneSecond(action, { call, put }) {
      yield call(delay, 1000)
      yield put({ type: 'add' })
    },
  },
  reducers: {
    add (state) {
      return {
        count: state.count + 1
      }
    },
  },
}
```



## request 方法封装

```js
import Taro from '@tarojs/taro'

const baseConfig = {
  baseUrl: 'http://localhost:7300/mock/5e44f224a4de7a8083850859/saas'
}

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
}

const checkStatus = response => {
  const errortext = codeMessage[response.statusCode] || response.errMsg

  Taro.showModal({
    title: `请求错误 ${response.statusCode}: ${response.url}`,
    content: errortext,
  })

  return response
}

function request (url, method, { data, headers, baseUrl }) {
  const preUrl = baseUrl ? baseUrl.replace(/\/$/, '') : baseConfig.baseUrl
  const requestUrl = `${preUrl}/${url.replace(/^\//, '')}`

  // Taro.showLoading({
  //   title: 'loading',
  //   mask: true
  // })

  return Taro.request({
    url: requestUrl,
    method,
    data,
    // 不发送 cookie
    credentials: 'omit',
    header: {
      'content-type': 'application/json',
      ...headers,
    },
  }).then(res => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      if (!res.data.success) {
        Taro.showToast({
          title: res.data.message || '请求错误',
          icon: 'none',
          duration: 1000,
          mask: true,
        })
      }
      return res.data
    }
    throw res
  }).catch(error => checkStatus(error))
}


export const get = (url, params = {}, config = {}) => request(url, params, config)

export const post = (url, data = {}, config = {}) => request(url, data, config)

export const put = (url, data = {}, config = {}) => request(url, data, config)

export const dele = (url, params = {}, config = {}) => request(url, params, config)
```

