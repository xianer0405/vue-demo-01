import jsonp from 'common/js/jsonp'
import {commonParams, options} from 'api/config'

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

export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    uin: 0,
    hostUin: 0,
    g_tk: 5381,
    needNewCode: 0,
    order: 'listen',
    begin: 0,
    num: 30,
    songstatus: 1,
    singermid: singerId
  })
  return jsonp(url, data, options)
}
