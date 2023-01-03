import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/sys/logout',
    method: 'get'
  })
}

export function refreshToken(reToken) {
  return request({
    url: `/sys/access_token/${reToken}`,
    method: 'get'
  })
}

export function getInfo() {
  return request({
    url: '/sys/player_info',
    method: 'get'
  })
}
