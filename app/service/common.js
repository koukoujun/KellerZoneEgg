'use strict'

const Service = require('egg').Service;

class CommonService extends Service{
 //获取省份
 async commonProvince(){
    const result = await this.app.mysql.query('select * from provinces', '')
    return JSON.stringify({
       code:1,
       message:'success',
       data:result
    })
 }
  //获取市
  async commonCity(){
   const result = await this.app.mysql.query('select * from cities', '')
   return JSON.stringify({
      code:1,
      message:'success',
      data:result
   })
}
 //获取区
 async commonArea(){
   const result = await this.app.mysql.query('select * from areas', '')
   return JSON.stringify({
      code:1,
      message:'success',
      data:result
   })
}
}

module.exports = CommonService