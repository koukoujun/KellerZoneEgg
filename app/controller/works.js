'use strict'

/**
 * @Controller
 * 
**/

const Controller = require('egg').Controller

class WorksController extends Controller {
    async list() {
        /**
        * @summary 获取个人简历列表
        * @description 获取个人简历列表
        * @router post /works/resume
        * @request body works_resume message 查找简历
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.works.list()
    }
    async resume_add() {
        /**
        * @summary 添加简历
        * @description 添加简历
        * @router post /works/resume_add
        * @request body works_resume_add message 添加简历
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.works.resume_add()
    }
    async resume_compile() {
        /**
        * @summary 编辑简历
        * @description 编辑简历
        * @router post /works/resume_compile
        * @request body works_resume_compile message 编辑简历
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.works.resume_compile()
    }
}

module.exports = WorksController