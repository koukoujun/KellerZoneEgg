'use strict'

/**
 * @Controller
 * 
**/

const Controller = require('egg').Controller

class CodeController extends Controller {
    async option() {
        /**
        * @summary 获取工具选项
        * @description 获取工具选项
        * @router post /tools/option
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.tools.option()
    }
    async list() {
        /**
        * @summary 获取工具列表
        * @description 获取工具列表
        * @router post /tools
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.tools.list()
    }
    async add() {
        /**
        * @summary 添加工具
        * @description 添加工具列表
        * @router post /tools/add
        * @request body tools_add message 添加工具信息实例
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.tools.add()
    }
    async listSocial() {
        /**
        * @summary 获取社会服务-工具列表
        * @description 获取社会服务-工具列表
        * @router post /tools/list_social
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.tools.listSocial()
    }
    async addSocial() {
        /**
        * @summary 添加工具-社会服务
        * @description 添加工具-社会服务
        * @router post /tools/add_social
        * @request body tools_add_social message 添加工具信息实例
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.tools.addSocial()
    }
}

module.exports = CodeController