
const Mock = require('mockjs')
const { ajaxResponse } = require('./utils')

module.exports = [
    // user login
    {
        url: '/api/Account/authenticate',
        type: 'post',
        response: config => {
            return ajaxResponse(Mock.mock({
                'items|3': [{
                    id: '@id',
                    title: '@sentence(10, 20)',
                    'status|1': ['published', 'draft', 'deleted'],
                    author: 'name',
                    display_time: '@datetime',
                    pageviews: '@integer(300, 5000)'
                }]
            }))
        }
    },
    {
        url: '/api/getInfo',
        type: 'get',
        response: config => {
            return ajaxResponse({
                data: Mock.mock({
                    'items|10': [{
                        id: '@id',
                        title: '@sentence(10, 20)',
                        'status|1': ['published', 'draft', 'deleted'],
                        author: 'name',
                        display_time: '@datetime',
                        pageviews: '@integer(300, 5000)'
                    }]
                })
            })
        }
    },
]