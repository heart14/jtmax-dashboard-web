import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const ReTokenKey = 'Admin-ReToken'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function getReToken() {
  return Cookies.get(ReTokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setReToken(retoken) {
  return Cookies.set(ReTokenKey, retoken)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function removeReToken() {
  return Cookies.remove(ReTokenKey)
}
