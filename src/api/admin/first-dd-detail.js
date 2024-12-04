import request from '@/utils/request'

// 查询FirstDdDetail列表
export function listFirstDdDetail(query) {
  return request({
    url: '/api/v1/first-dd-detail',
    method: 'get',
    params: query
  })
}

// 查询FirstDdDetail详细
export function getFirstDdDetail(id) {
  return request({
    url: '/api/v1/first-dd-detail/' + id,
    method: 'get'
  })
}

// 新增FirstDdDetail
export function addFirstDdDetail(data) {
  return request({
    url: '/api/v1/first-dd-detail',
    method: 'post',
    data: data
  })
}

// 修改FirstDdDetail
export function updateFirstDdDetail(data) {
  return request({
    url: '/api/v1/first-dd-detail/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除FirstDdDetail
export function delFirstDdDetail(data) {
  return request({
    url: '/api/v1/first-dd-detail',
    method: 'delete',
    data: data
  })
}

