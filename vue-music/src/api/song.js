import axios from 'axios/index'
import {commonParams, options} from 'api/config'
import { getUid } from 'common/js/uid'
import jsonp from 'common/js/jsonp'

export function getLyric(id) {
  const url = '/api/getLyric'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    loginUin: 0,
    needNewCode: 0,
    format: 'json',
    nobase64: 1,
    musicid: id
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    console.log(res.data)
    return Promise.resolve(res.data)
  }).catch((err) => {
    console.log(err)
  })
}

export function getVKey(songmid, filename) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'

  const data = Object.assign({}, commonParams, {
    cid: 205361747,
    format: 'json',
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    uin: 0,
    songmid,
    filename,
    guid: getUid()
  })

  return jsonp(url, data, Object.assign({}, options, {
    param: 'callback'
  }))
}
