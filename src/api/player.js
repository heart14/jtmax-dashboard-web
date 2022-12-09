import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/sys/player_info',
    method: 'get'
  })
}

export function getPlayerList() {
  return request({
    url: '/player/list',
    method: 'get'
  })
}

export function updatePlayer(uid, data) {
  return request({
    url: `/player/${uid}`,
    method: 'put',
    data
  })
}

export function deletePlayer(uid) {
  return request({
    url: `/player/${uid}`,
    method: 'delete'
  })
}
