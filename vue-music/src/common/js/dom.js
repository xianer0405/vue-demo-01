export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let classArr = el.className.split(' ')
  classArr.push(className)
  el.className = classArr.join(' ')
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
