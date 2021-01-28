'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  async index() {
    const result = await this.app.mysql.query('select * from user', '');
    return result;
  }
  async user(){
    const path = 'http://'+this.ctx.header.host
    const result = await this.app.mysql.select('user',{
      where:{uuid:this.ctx.helper.uuid()},
      columns:['user_name','avatar_url','position','company','introduce']
    })
    if (result != null) {
      //拼接图片地址
      result[0].avatar_url = path + result[0].avatar_url
      return JSON.stringify({
        code:'1',
        message:'success',
        data:result[0]
      })
    }
    return JSON.stringify({
      code:2,
      mesage:'用户不存在',
    })
  }
  async add() {
    const params = {
      uuid:this.ctx.helper.uuidSet(),
      user_number: this.ctx.request.body.user_number,
      user_name:this.ctx.helper.makeName(),
      user_password: this.ctx.request.body.user_password,
      user_job:this.ctx.request.body.user_job,
      create_time:new Date(),
      update_time:new Date()
    };
    //查找注册用户是否存在
    console.log(params)
    const isUser = await this.app.mysql.get('user', {user_number:params.user_number});
    if(isUser!=null){
      return JSON.stringify({
        code:2,
        message:'用户已存在'
      })
    }
    //新用户注册
    const result = await this.app.mysql.insert('user', params);
    // 判断返回状态
    const state = result.affectedRows;
    if (state === 1) {
      // 设置 session
      this.ctx.session.uuid = {uuuid:params.uuid};
      return JSON.stringify({
        code:'1',
        message:'注册成功',
        result:result
      })
    }
    return 'add fail';

  }
  async delete() {
    const params = { id:this.ctx.request.body.id };
    const result = await this.app.mysql.delete('user', params);
    // 判断返回状态
    const state = result.affectedRows;
    if (state === 1) {
      return JSON.stringify({
        code:'1',
        message:'删除成功',
        result:result
      })
    }
    return 'delete fail';

  }
  async update() {
    const stream = await this.ctx.getFileStream();
    const img_path = await this.ctx.helper.uploadFile(stream)
    let formData = stream.fields
    let data = JSON.parse(formData.formData)
    const params = { 
      user_name: data.user_name,
      avatar_url: img_path,
      position:data.position,
      company:data.company,
      introduce:data.introduce
    }; 
    const options = {
      where: {
        uuid:this.ctx.helper.uuid()
      }
    };
    const result = await this.app.mysql.update('user', params, options);
    // 判断返回状态
    const state = result.affectedRows;
    if (state === 1) {
      return JSON.stringify({
        code:'1',
        message:'更新成功',
        result:result
      })
    }
    return JSON.stringify({
      code:2,
      mesage:'update fail',
      result:result
    })
  }
  async search() {
    const params = { id:this.ctx.request.body.id };
    const result = await this.app.mysql.get('user', params);
    if (result != null) {
      return JSON.stringify({
        code:'1',
        message:'查找成功',
        result:result
      })
    }
    return JSON.stringify({
      code:2,
      mesage:'search fail',
    })

  }
  async login(){
    if(!this.ctx.request.body.user_number||this.ctx.request.body.user_number==''){
       console.log('用户账号不存在')
       return JSON.stringify({
         code:'2',
         message:'用户账号不存在'
       })
    }else if(!this.ctx.request.body.user_password||this.ctx.request.body.user_password==''){
      return JSON.stringify({
        code:'2',
        message:'用户密码不存在'
      })
    }
    const params = {user_number:this.ctx.request.body.user_number,user_password:this.ctx.request.body.user_password}
    const result = await this.app.mysql.get('user',params)
    console.log('登录日志打印',result)
    if(result != null){
       //需要存储的 token 数据
      const token = this.app.jwt.sign({'uuid':result.uuid}, this.app.config.jwt.secret);
      //设置headers
      this.ctx.set({'authorization':token})
      //设置session
      this.ctx.session.uuid = '123456789'
      console.log(this.ctx.session.uuid)

      return JSON.stringify({
        code:'1',
        message:'登录成功',
        data:{token:token}
      })
    }
    return JSON.stringify({
      code:2,
      message:'账号或密码错误'
    })
  }
}

module.exports = UserService;
