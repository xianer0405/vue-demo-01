import axios from 'axios/index'
import {commonParams} from 'common/js/config'

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
