import request from '@/utils/request'

// 带筛选条件分页查询
export function getActivities(data) {
  return request({
    url: '/activity/page_list',
    method: 'post',
    data
  })
}

export function deleteActivity(activityId) {
  return request({
    url: `/activity/${activityId}`,
    method: 'delete'
  })
}

export function updateActivity(activityId, data) {
  return request({
    url: `/activity/${activityId}`,
    method: 'put',
    data
  })
}

export function addActivity(data) {
  return request({
    url: '/activity/save',
    method: 'post',
    data
  })
}
