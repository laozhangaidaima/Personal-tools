

 const EventBus = {
  _events: {},
  /**
   * 注册事件
   * @param {string} name 事件名
   * @param {function} fn 回调
   */
  on(name = 'e', fn) {
    this._events[name] || (this._events[name] = [])
    this._events[name].push(fn)
  },
  /**
   * 解绑事件
   * @param {string} name 事件名
   */
  off(name = 'e') {
    delete this._events[name]
  },
  /**
   * 触发事件
   * @param {string} name 事件名
   * @param  {...any} args 自定义参数表
   */
  emit(name = 'e', ...args) {
    this._events[name] && this._events[name].map((item) => item(...args))
  }
}
/**
 * 延时函数
 * @param {number} ms 毫秒数
 */
 const sleep = function(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
/**
 * 获取周几
 * @param {object|string} date dayjs对象、Date对象、日期字符串
 */
 const getWeek = function(date) {
  const WEEK_MAP = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  let index
  if (date instanceof dayjs) {
    index = date.day()
  } else {
    index = dayjs(date).day()
  }
  return WEEK_MAP[index]
}
/**
 * 简单深复制
 * @param {object} 需要深复制的对象或数组，属性中有函数的会被忽略掉
 */
 const deepCopy = function(obj) {
  return JSON.parse(JSON.stringify(obj))
}
/**
 * 判断是否为undefined
 * @param {*} something 任何
 */
 const isUndefined = function(something) {
  return typeof something === 'undefined'
}
/**
 * 判断是否为null
 * @param {*} something 任何
 */
 const isNull = function(something) {
  return something === null
}
/**
 * 判断是否为NaN
 * @param {*} something 任何
 */
 const isRealNaN = function(something) {
  return !isUndefined(something) && isNaN(something)
}
/**
 * 判断是否为字符串
 * @param {*} something 任何
 */
 const isString = function(something) {
  return Object.prototype.toString.apply(something) === '[object String]'
}
/**
 * 判断是否为js对象
 * @param {*} something 任何
 */
 const isObject = function(something) {
  return Object.prototype.toString.apply(something) === '[object Object]'
}
/**
 * 判断是否为数组
 * @param {*} something 任何
 */
 const isArray = function(something) {
  return Object.prototype.toString.apply(something) === '[object Array]'
}
/**
 * 判断是否为json字符串
 * @param {*} something 任何
 */
 const isJson = function(something) {
  if (!isString(something)) {
    return false
  }
  return /({.*}|\[.*\])/.test(something)
}

// 获取时间差(返回xxhxxmin)
 const getTimeDiff = (startTime, endTime) => {
  const hourDiff = dayjs(endTime).diff(dayjs(startTime), 'hour') // 相差小时数
  const minuteDiff = dayjs(endTime).diff(dayjs(startTime), 'minute') // 相差分钟数
  const leftMin = minuteDiff - hourDiff * 60
  const diff = {
    hourDiff,
    leftMin
  }
  return diff
}
/**
 * 封装小型持久存储方法
 */
const s = Symbol('sessionStorage')
const o = {
  [s]: true
}
const storageToolBox = {
  set_cookie({ key, value, options }) {
    let expires, stringify
    if (options.expire) {
      const d = new Date(options.expire)
      expires = '; expires=' + d.toGMTString()
    }
    if (isObject(value) || isArray(value)) {
      stringify = JSON.stringify(value)
    }
    document.cookie = key + '=' + (stringify || value) + (expires || '')
  },
  get_cookie({ key }) {
    const name = key + '='
    const ca = document.cookie.split(';')
    let res
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim()
      if (c.indexOf(name) === 0) {
        res = c.substring(name.length, c.length)
        if (isJson(res)) {
          res = JSON.parse(res)
        }
        return res
      }
    }
    return ''
  },
  delete_cookie({ key }) {
    this.set_cookie(key, '', {
      expire: -1
    })
  },
  set_localstorage({ key, value, options }) {
    let stringify
    if (isObject(value) || isArray(value)) {
      stringify = JSON.stringify(value)
    }
    options[s]
      ? sessionStorage.setItem(key, stringify || value)
      : localStorage.setItem(key, stringify || value)
  },
  get_localstorage({ key, options }) {
    let res = options[s]
      ? sessionStorage.getItem(key)
      : localStorage.getItem(key)
    if (isJson(res)) {
      res = JSON.parse(res)
    }
    return res
  },
  delete_localstorage({ key, options }) {
    options[s] ? sessionStorage.removeItem(key) : localStorage.removeItem(key)
  },
  set_sessionstorage({ key, value }) {
    this.set_localstorage({ key, value, options: o })
  },
  get_sessionstorage({ key }) {
    return this.get_localstorage({ key, options: o })
  },
  delete_sessionstorage({ key }) {
    this.delete_localstorage({ key, options: o })
  }
}
/**
 * 轻量web存储器
 * @param {object} options 可选项 async: false即可取消异步存储，改为同步存储
 * @example 示例: 存数据saver({ key: 'userInfo', value: {name: 'xx'} }) 取数据saver({ method: 'get', key: 'userInfo' }) 删数据save({ method: 'delete', key: 'userInfo' })
 */
 const saver = function({
  method = 'set',
  mode = 'sessionstorage',
  async = true,
  key,
  value,
  options = {}
}) {
  if (key) {
    const attr = `${method}_${mode.toLowerCase()}`
    if (attr in storageToolBox) {
      if (method === 'get') {
        return storageToolBox[attr]({ key, value, options })
      }
      if (async) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              storageToolBox[attr]({ key, value, options })
              colorfulConsole(`saver: ${method} ${key}`)
              resolve()
            } catch (err) {
              reject(err)
            }
          }, 10)
        })
      } else {
        storageToolBox[attr]({ key, value, options })
      }
    }
  }
}
/**
 * 彩色打印
 * @param {string} log 打印信息
 * @param {string} color 颜色
 */
 const colorfulConsole = function() {
  const args = arguments
  const logInfo = '%c' + (args[0] || '')
  const color = 'color:' + (args[1] || 'red')
  console.log(logInfo, color)
  return null
}
/**
 * 获取md5加密后的字符串
 * @param {string} 需要加密的字符串
 */
 const getMd5 = function(str) {
  const md5 = crypto.createHash('md5')
  md5.update(str)
  const md5Str = md5.digest('hex')
  return md5Str.toUpperCase()
}
/**
 * 证件号码脱敏显示
 * @param {string} number : 证件号码
 */
 const cardNumberShow = (number) => {
  if (!number) {
    return
  }
  let pat = /(\w{3})\w*(\w{4})/
  if (number.length < 10) {
    pat = /(\w{2})\w*(\w{3})/
  }
  const str = number.replace(pat, '$1****$2')
  return str
}

/**
 * 获取秒分钟小时天对应的毫秒数
 * @param {number} num 多少个
 * @param {string} unit 单位 day hour min sec
 * @returns {number} 毫秒数
 */
 const getMs = function(num, unit) {
  let res
  if (typeof num !== 'number') {
    return 0
  }
  switch (unit) {
    case 'day':
      res = num * 24 * 60 * 60 * 1000
      break
    case 'hour':
      res = num * 60 * 60 * 1000
      break
    case 'min':
      res = num * 60 * 1000
      break
    case 'sec':
      res = num * 1000
      break
    default:
      res = 0
      break
  }
  return res
}
/**
 * 频率控制 返回函数连续调用时，action 执行频率限定为 次 / delay
 * @param action {function}  请求关联函数，实际应用需要调用的函数
 * @param delay  {number}    延迟时间，单位毫秒
 * @return {function}    返回调用函数
 */
 const throttle = function(action, delay) {
  let last = 0
  return function() {
    const curr = +new Date()
    if (curr - last > delay) {
      action.apply(this, arguments)
      last = curr
    }
  }
}
/**
 * 监听浏览器返回操作
 * @param {function} cb 点击返回的回调函数
 */
 const listenBack = function(cb) {
  if (window.history && window.history.pushState) {
    colorfulConsole('监听返回: ' + document.URL, 'yellow')
    window.addEventListener('popstate', cb, false)
  }
}
/**
 * 移除返回监听
 * @param {function} cb
 */
 const removeListenBack = function(cb) {
  colorfulConsole('移除监听返回', 'yellow')
  setTimeout(() => {
    window.removeEventListener('popstate', cb, false)
  })
}

// 判断身份证号

 const isIdCard = function(cardid) {
  // 身份证正则表达式(18位)
  const isIdCard2 = /^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i
  const stard = '10X98765432' // 最后一位身份证的号码
  const first = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2] // 1-17系数
  let sum = 0
  if (!isIdCard2.test(cardid)) {
    return false
  }
  const year = cardid.substr(6, 4)
  const month = cardid.substr(10, 2)
  const day = cardid.substr(12, 2)
  const birthday = cardid.substr(6, 8)
  let formatDate = new Date(year + '/' + month + '/' + day)
  if (formatDate instanceof Date) {
    const year = formatDate.getFullYear()
    let month = formatDate.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = formatDate.getDate()
    day = day < 10 ? '0' + day : day
    formatDate = year.toString() + month.toString() + day.toString()
  }

  if (birthday !== formatDate) {
    // 校验日期是否合法
    return false
  }
  for (let i = 0; i < cardid.length - 1; i++) {
    sum += cardid[i] * first[i]
  }
  const result = sum % 11
  const last = stard[result] // 计算出来的最后一位身份证号码
  if (cardid[cardid.length - 1].toUpperCase() === last) {
    return true
  } else {
    return false
  }
}
/**
 * 判断一个字符串是否为电话号码
 * @param {string} str 字符串
 */
 const isPhoneNumber = function(str) {
  if (!isString(str)) {
    return false
  }
  return /^1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/.test(
    str
  )
}

// 百度坐标转高德（传入经度、纬度）
 const BMapTransformAMap = function(bdlng, bdlat) {
  const X_PI = (Math.PI * 3000.0) / 180.0
  const x = bdlng - 0.0065
  const y = bdlat - 0.006
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI)
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI)
  const gglng = z * Math.cos(theta)
  const gglat = z * Math.sin(theta)
  return {
    lng: gglng,
    lat: gglat
  }
}

// 高德坐标转百度（传入经度、纬度）
 const AMapTransformBMap = function(gglng, gglat) {
  const X_PI = (Math.PI * 3000.0) / 180.0
  const x = gglng
  const y = gglat
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI)
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI)
  const bdlng = z * Math.cos(theta) + 0.0065
  const bdlat = z * Math.sin(theta) + 0.006
  return {
    lat: bdlat,
    lng: bdlng
  }
}
/**
 * 阻断式装饰器函数，如果装饰函数返回false，则不执行目标函数，如不返回值或返回值不为false，则会执行目标函数
 * @param {function} target 目标函数
 * @param {function} decorator 装饰函数
 * @param {*} decoratorParams 传递给装饰函数的参数
 */
 const decorate = function(target, decorator, decoratorParams) {
  return function() {
    const args = []
    for (let i = 0, len = arguments.length; i < len; i++) {
      args.push(arguments[i])
    }
    decoratorParams && args.push(decoratorParams)
    const flag = decorator.apply(target, args)
    if (flag !== false) {
      return target.apply(this, arguments)
    }
  }
}
// 计算表达式的值(代替eval)
 const evil = (fn) => {
  const Fn = Function // 一个变量指向Function，防止有些前端编译工具报错
  return new Fn('return ' + fn)()
}

/**
 * 替换修改路由指定传入参数的值
 * @param {*} paramName ：路由参数
 * @param {*} replaceWith ：新的值
 */
 const replaceParamVal = (paramName, replaceWith) => {
  // const oUrl = window.location.href.toString();
  // const re=evil('/('+ paramName+'=)([^&]*)/gi');
  // const nUrl = oUrl.replace(re,paramName+'='+replaceWith);
  // this.location = nUrl;
  // window.location.href=nUrl
}
/**
 * 历经时长
 * @param {*} endTime 结束时间
 * @param {*} startTime 结束时间
 * return 返回如：10小时20分钟
 */
 const getRuntime = (endTime, startTime) => {
  const hourDiff = dayjs(endTime).diff(dayjs(startTime), 'hour') // 相差小时数
  const minuteDiff = dayjs(endTime).diff(dayjs(startTime), 'minute') // 相差分钟数
  const leftMin = minuteDiff - hourDiff * 60
  return hourDiff + '小时' + leftMin + '分钟'
}
/**
 * 多请求并发
 */
 const reqAll = function(...args) {
  return Promise.all(
    args.map((item) =>
      item.catch(() => {
        return { code: 0 }
      })
    )
  )
}

// 字符串和对象相互转换
 const stringJsonTranfer = (val) => {
  if (!val || val === '{}') {
    return val
  }
  if (isString(val)) {
    return JSON.parse(val)
  }
  return JSON.stringify(val)
}

// 过滤长字符串
 const filterLongStr = (str, len) => {
  if (str.length) {
    if (str.length > len * 2) {
      const start = str.slice(0, len)
      const end = str.slice(-len)
      return start + '...' + end
    }
  }
  return str
}
// 预订前判断企业
/**
 * 
 * orderType 订单类型:1:机票，2：火车票，3：酒店，4：贵宾厅，5：保险，6009/6010：专车，6008：滴滴，7：国际酒店，8：国际机票
  busCode：100 表示【未开启差旅审批】并且没有开通允许企业支付 -> 个人支付
  busCode：200 表示【未开启差旅审批】并且开通了允许企业支付 -> 个人支付/企业支付
  busCode：201 表示【未开启差旅审批】并且开通了允许企业支付、限制了所选业务线个人支付 -> 个人支付
  busCode：300 表示【开启了差旅审批】并且免审批、未限制了所选业务线个人支付 -> 个人支付/企业支付
  busCode：301 表示【开启了差旅审批】并且免审批、限制了所选业务线个人支付 -> 个人支付
  busCode：302 表示【开启了差旅审批】并且免审批、未限制了所选业务线个人支付、限制代他人预订，仅限【本人出行】使用企业支付 -> 客户端判断当前人userID与出行人staffID是否一致，一致可企业支付，不一致只能个人支付
  busCode：400 表示【开启了差旅审批】并且需要审批、有可用申请单 ->（这里需要根据选择的申请单状态，判断是否允许企业支付）
  busCode：401 表示【开启了差旅审批】并且需要审批、有可用申请单、限制了所选业务线个人支付 -> 个人支付
  busCode：402 表示【开启了差旅审批】并且需要审批、带产品审批模式，不需要关联申请单-> 个人支付/企业支付
  busCode：500 表示【开启了差旅审批】并且需要审批、没有可用申请单 -> 个人支付
  busCode：600 表示未找到企业信息 -> 提示用户
  busCode：700 实时同步申请单标识，例如：金晓
  busCode：701 表示湖南广电企业，点击预订后关闭当前页
 */
 const predeterminedJudgment = function(orderType,cityNameArrive,cityNameFrom,reserveDate,endDate='') {
  const userInfo = saver({
    method: 'get',
    key: 'loginInfo',
    mode: 'localstorage'
  })
  const data = {
    applyUserId: userInfo.userID,
    cityNameArrive,
    cityNameFrom,
    companyId:userInfo.companyID,
    endDate,
    orderType,
    reserveDate
  }
  return req
    .post('/tmc/travelapproval/predeterminedJudgment', data)
    .then((res) => {
      if (res.code === 1) {
        return res.busCode
      } else {
        // Vue.$message.error(res.message)
      }
    })
}
/**
 * 具有存储期限的localStorage
 * @example expireLocalStorage.setItem('test', {name: 'handsome'}, 5).removeItem('test').getItem('test', {})
 */
 const expireLocalStorage = {
  setItem(key = '', value = '', expire = 1) {
    value = {
      ms: Date.now(),
      expire: Math.floor(expire),
      originData: value
    }
    window.localStorage.setItem(key, JSON.stringify(value))
    return this
  },
  getItem(key = '', except) {
    let value
    value = window.localStorage.getItem(key)
    if (!value) {
      return except || null
    }
    value = JSON.parse(value)
    if (Date.now() - value.ms >= value.expire * 12 * 60 * 60 * 1000) {
      window.localStorage.removeItem(key)
      return except || null
    }
    if (value.originData) {
      return value.originData
    } else {
      return except || null
    }
  },
  removeItem(key = '') {
    window.localStorage.removeItem(key)
    return this
  }
}
/**
 * clickOutSide
 */
 const OnClickOutside = function(el, cb) {
  this.evt = function(e) {
    const itsChildren = el.contains(e.target)
    if (e.target !== el && !itsChildren) {
      return cb ? cb() : null
    }
  }
  document.addEventListener('click', this.evt, false)
  return this
}
OnClickOutside.prototype.remove = function() {
  document.removeEventListener('click', this.evt, false)
}
OnClickOutside.prototype.reinit = function() {
  document.addEventListener('click', this.evt, false)
}

/**
 * 重新登录逻辑
 */
 const relogin = function() {
  const loginInfo = saver({
    method: "get",
    key: "loginInfo",
    mode: "localstorage"
  });
  const loginType = loginInfo.type;
  if (loginType === 1002) {
    // 授权登录
    // 360
    colorfulConsole("关闭窗口");
    window.iqh.closeWindow();
  } else if (loginType === 1000 || loginType === 1001) {
    // 账号密码登录、验证码登录
    location.replace("http://" + location.host + "/login");
    location.reload();
  }
};
