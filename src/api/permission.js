import request from '@/utils/request'

// 带筛选条件分页查询权限列表
export function getPermissions(data) {
  return request({
    url: '/permission/page_list',
    method: 'post',
    data
  })
}
