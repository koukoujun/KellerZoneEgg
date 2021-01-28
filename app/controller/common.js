'use strict'

/**
 * @Controller
 * 
**/

const Controller = require('egg').Controller

class CommonController extends Controller {
    async commonProvince(){
        /**
        * @summary 获取省份列表
        * @description 获取省份列表
        * @router post /common/province
        * @response 200 JsonResult 操作结果
        */
        this.ctx.body = await this.service.common.commonProvince()
    }
    async commonCity(){
    /**
    * @summary 获取市列表
    * @description 获取区列表
    * @router post /common/city
    * @response 200 JsonResult 操作结果
    */
    this.ctx.body = await this.service.common.commonCity()
    }
    async commonArea(){
    /**
    * @summary 获取区列表
    * @description 获取区列表
    * @router post /common/area
    * @response 200 JsonResult 操作结果
    */
    this.ctx.body = await this.service.common.commonArea()
    }
}

module.exports = CommonController