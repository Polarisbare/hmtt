// 封装本地localStorage 方法
const TOKENKEY = 'hmtt-key'
// 存
export function setTokenFn (token) {
  return localStorage.setItem(TOKENKEY, token)
}
// 取
export function getTokenFn (token) {
  return localStorage.getItem(TOKENKEY)
}
// 删
export function removeTokenFn (token) {
  return localStorage.removeItem(TOKENKEY)
}
