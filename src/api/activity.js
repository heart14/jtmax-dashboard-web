import request from '@/utils/request'

// 带筛选条件分页查询
export function getActivities(data) {
  return request({
    url: '/activity/page_list',
    method: 'post',
    data
  })
}

// 无筛选条件查询所有活动
export function getAllActivity() {
  return request({
    url: '/activity/list',
    method: 'get'
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

export function publishActivity(activityId) {
  return request({
    url: `/activity/publish/${activityId}`,
    method: 'patch'
  })
}

// 带筛选条件分页查询
export function getActivityPlayerInfo(data) {
  return request({
    url: '/activity_player/page_list',
    method: 'post',
    data
  })
}
