import jsonp from 'common/js/jsonp'
import {commonParams, options} from 'api/config'
// import axios from 'axios'

// https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg
// ?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&uin=0&needNewCode=1&platform=h5&jsonpCallback=__jp0
export function getRank() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    needNewCode: 1,
    notice: 0,
    uin: 0
  })

  return jsonp(url, data, options)
}

// https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg
// ?g_tk=107962675&uin=812884868&format=json&inCharset=utf-8&outCharset=utf-8
// &notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=4&_=1518958056907
export function getTopList(topid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    hostUin: 0,
    needNewCode: 1,
    type: 'top',
    page: 'detail',
    format: 'json',
    notice: 0,
    tpl: 3,
    topid
  })
  return jsonp(url, data, options)
}
