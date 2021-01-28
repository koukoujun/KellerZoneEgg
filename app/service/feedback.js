'use strict'

const Service = require('egg').Service;

class FeedbackService extends Service{
 async add(){
    const params = this.ctx.request.body
    const result = await this.app.mysql.insert('feedback', params)
    // 判断插入成功
    const insertSuccess = result.affectedRows;
    if(insertSuccess === 1){
      return JSON.stringify({
         code:1,
         message:'success'
      })
    }else{
      return JSON.stringify({
         code:2,
         message:'failed'
      })
    }

 }
}

module.exports = FeedbackService