import request from '@/utils/request'

// 带筛选条件分页查询权限列表
export function getPermissions(data) {
  return request({
    url: '/permission/page_list',
    method: 'post',
    data
  })
}

export function deletePermission(permId) {
  return request({
    url: `/permission/${permId}`,
    method: 'delete'
  })
}

export function updatePermission(permId, data) {
  return request({
    url: `/permission/${permId}`,
    method: 'put',
    data
  })
}

export function addPermission(data) {
  return request({
    url: '/permission/save',
    method: 'post',
    data
  })
}
