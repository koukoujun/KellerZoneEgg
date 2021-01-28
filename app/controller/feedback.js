'use strict'

/**
 * @Controller
 * 
**/

const Controller = require('egg').Controller

class FeedbackController extends Controller {
    async add(){
    /**
    * @summary 提交反馈
    * @description 提交反馈
    * @router post /feedback/add
    * @request body feedback_add message 添加实例
    * @response 200 JsonResult 操作结果
    */
   this.ctx.body = await this.service.feedback.add()
    }
}

module.exports = FeedbackController