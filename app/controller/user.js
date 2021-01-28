'use strict';

/**
 * @Controller
 */

const Controller = require('egg').Controller;

class UserController extends Controller {
  async index() {
    /**
    * @summary 获取用户列表
    * @description 获取用户列表
    * @router get /user
    * @response 200 JsonResult 操作结果
    */
    this.ctx.body = await this.service.user.index();
  }
  async user() {
    /**
    * @summary 获取当前用户信息
    * @description 必须参数 token
    * @router post /user/user
    * @response 200 JsonResult 操作结果
    */
    this.ctx.body = await this.service.user.user();
  }
  async add() {
    /**
    * @summary 添加用户
    * @description 必须参数 user_name,user_password
    * @router post /user/add
    * @request body user_contract_add message 新增用户
    * @response 200 JsonResult 操作结果
    */
    this.ctx.body = await this.service.user.add();
  }
  async delete() {
    /**
    * @summary 删除用户
    * @description 必须参数 id
    * @router post /user/delete
    * @request body user_contract_delete id 用户id
    * @response 200 JsonResult 操作结果
    */
    this.ctx.body = await this.service.user.delete();
  }
  async update() {
    /**
    * @summary 更新用户
    * @description 必须参数 id, user_name, user_password, time
    * @router post /user/update
    * @request body user_contract_update message 用户更新信息
    * @response 200 JsonResult 操作结果
    */
    this.ctx.body = await this.service.user.update();
  }
  async search() {
    /**
    * @summary 查找用户
    * @description 必须参数 id
    * @router post /user/search
    * @request body user_contract_search message 查找用户
    * @response 200 JsonResult 操作结果
    */
    this.ctx.body = await this.service.user.search();
  }
  async login(){
    /**
    * @summary 用户登录
    * @description 必须参数 user_number,user_pasword
    * @router post /user/login
    * @request body user_contract_login message 用户登录
    * @response 200 JsonResult 操作结果
    */
   this.ctx.body = await this.service.user.login();
  }
}

module.exports = UserController;
