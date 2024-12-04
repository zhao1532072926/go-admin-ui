import request from '@/utils/request'

// 查询FirstUsers列表
export function listFirstUsers(query) {
  return request({
    url: '/api/v1/first-users',
    method: 'get',
    params: query
  })
}

// 查询FirstUsers详细
export function getFirstUsers(id) {
  return request({
    url: '/api/v1/first-users/' + id,
    method: 'get'
  })
}

// 新增FirstUsers
export function addFirstUsers(data) {
  return request({
    url: '/api/v1/first-users',
    method: 'post',
    data: data
  })
}

// 修改FirstUsers
export function updateFirstUsers(data) {
  return request({
    url: '/api/v1/first-users/' + data.id,
    method: 'put',
    data: data
  })
}

// 删除FirstUsers
export function delFirstUsers(data) {
  return request({
    url: '/api/v1/first-users',
    method: 'delete',
    data: data
  })
}

