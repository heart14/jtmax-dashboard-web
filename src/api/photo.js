import request from '@/utils/request'

export function getPhotoList(data) {
  return request({
    url: '/photo/page_list',
    method: 'post',
    data
  })
}

// 删除图片
export function deletePhoto(id) {
  return request({
    url: `/photo/${id}`,
    method: 'delete'
  })
}
