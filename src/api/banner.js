import request from '@/utils/request'

export function getBannerList(data) {
  return request({
    url: '/banner/page_list',
    method: 'post',
    data
  })
}
