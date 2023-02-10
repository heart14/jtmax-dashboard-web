import request from '@/utils/request'

// 删除图片
export function deletePhoto(id) {
  return request({
    url: `/photo/${id}`,
    method: 'delete'
  })
}
