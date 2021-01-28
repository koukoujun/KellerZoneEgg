'use strict'

/**
 * @Controller
 * 
**/

const Controller = require('egg').Controller

class CommunityController extends Controller {
    async list() {
        /**
        * @summary 获取社区文章列表
        * @description 获取社区文章列表
        * @router post /community
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.community.list()
    }
    async article_detail() {
        /**
        * @summary 获取社区文章详情
        * @description 获取社区文章详情
        * @router post /community/article_detail
        * @request body community_contract_article_detail message 文章id
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.community.article_detail()
    }
    async add() {
        /**
        * @summary 添加社区文章
        * @description 添加社区文章
        * @router post /community/add
        * @request body community_contract_add message 添加文章信息实例
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.community.add()
    }
    async article_add_praise() {
        /**
        * @summary 社区文章点赞
        * @description 社区文章点赞
        * @router post /community/article_add_praise
        * @request body community_contract_add_praise message 添加文章点赞示例
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.community.article_add_praise()
    }
    async article_search() {
        /**
        * @summary 查找社区文章
        * @description 查找社区文章
        * @router post /community/article_search
        * @request body community_contract_search message 查找文章示例
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.community.article_search()
    }
    async rep_detail() {
        /**
        * @summary 获取社区文章评论详情
        * @description 获取社区文章评论详情
        * @router post /community/rep_detail
        * @request body community_contract_rep_detail message 文章id
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.community.rep_detail()
    }
    async rep_add() {
        /**
        * @summary 添加文章评论
        * @description 添加文章评论
        * @router post /community/add_response
        * @request body community_contract_add_response message 添加评论信息实例
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.community.rep_add()
    }
    async rep_add_praise() {
        /**
        * @summary 文章评论点赞
        * @description 文章评论点赞
        * @router post /community/add_praise
        * @request body community_contract_add_praise message 添加文章评论点赞
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.community.rep_add_praise()
    }
}

module.exports = CommunityController