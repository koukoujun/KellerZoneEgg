'use strict'

/**
 * @Controller
 * 
**/

const Controller = require('egg').Controller

class ComponentsController extends Controller {
    async uploadFile(){
    /**
    * @summary 上传文件
    * @description 上传文件
    * @router post /components/upload_file
    * @response 200 JsonResult 操作结果
    */
   this.ctx.body = await this.service.components.uploadFile()
    }
}

module.exports = ComponentsController