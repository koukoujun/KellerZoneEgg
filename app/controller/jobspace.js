'use strict'

/**
 * @Controller
 * 
**/

const Controller = require('egg').Controller

class JobSpaceController extends Controller {
    async science(){
    /**
    * @summary 获取职业科普数据
    * @description 获取职业科普数据列表
    * @router post /jobspace/science
    * @response 200 JsonResult 操作结果
    */
    this.ctx.body = await this.service.jobspace.science()
    }
    async schedule_list(){
    /**
    * @summary 获取事项管理数据
    * @description 获取事项管理数据列表
    * @router post /jobspace/schedule_list
    * @response 200 JsonResult 操作结果
    */
    this.ctx.body = await this.service.jobspace.schedule_list()
    }
    async schedule_add(){
    /**
    * @summary 添加事项管理
    * @description 添加事项管理数据
    * @router post /jobspace/schedule
    * @request body jobspace_schedule_add 
    * @response 200 JsonResult 操作结果
    */
    this.ctx.body = await this.service.jobspace.schedule_add()
    }
    async schedule_update(){
    /**
    * @summary 更新事项管理
    * @description 更新事项管理数据
    * @router post /jobspace/schedule
    * @request body jobspace_schedule_update
    * @response 200 JsonResult 操作结果
    */
    this.ctx.body = await this.service.jobspace.schedule_update()
    }
    async schedule_delete(){
    /**
    * @summary 删除事项管理
    * @description 删除事项管理数据
    * @router post /jobspace/schedule
    * @request body jobspace_schedule_delete
    * @response 200 JsonResult 操作结果
    */
    this.ctx.body = await this.service.jobspace.schedule_delete()
    }
}

module.exports = JobSpaceController