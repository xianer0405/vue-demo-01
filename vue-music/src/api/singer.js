import jsonp from 'common/js/jsonp'
import {commonParams, options} from 'common/js/config'

export function getSingers() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    uin: 0,
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0
  })
  return jsonp(url, data, options)
}
