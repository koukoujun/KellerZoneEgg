'use strict'

const Service = require('egg').Service;

class JobSpaceService extends Service{
 //职业科普列表
 async science(){
    const result = await this.app.mysql.query('select * from job_space_science', '')
    return result
 }
  //事件管理-列表 
  async schedule_list() {
    const condition = {
      columns:['id','content','type','create_time','end_time'],
      where:{pid:this.ctx.helper.uuid()}
    }
    const result = await this.app.mysql.select('job_space_schedule',condition)
    function rTime(d) {
      const ztime = d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? '0'+ (d.getMonth() + 1):d.getMonth() + 1) + '-' + (d.getDate() <10?'0'+d.getDate():d.getDate()) + ' ' + (d.getHours()<10?'0'+d.getHours():d.getHours()) + ':' + (d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes()) + ':' + (d.getSeconds()<10?'0'+d.getSeconds():d.getSeconds());
      return ztime
    }
    let arrList = []
    result.map((item)=>{
      item.create_time = rTime(item.create_time)
      if(item.end_time!=null){
        item.end_time = rTime(item.end_time)
      }
      arrList.push({
        type:item.type,
        content:[item]
      })
    })
    function unique(arr){            
      for(let i=0; i<arr.length; i++){
        for(let j=i+1; j<arr.length; j++){
          if(arr[i].type==arr[j].type){         //第一个等同于第二个，splice方法删除第二个
            arr[i].content.push(arr[j].content[0])
            arr.splice(j,1);
            j--;
          }
        }
      }
    return arr;
    }
    
    return JSON.stringify({
      code: 1,
      mesage: 'success',
      data: unique(arrList)
    })
  }
 //事项管理-添加
 async schedule_add() {
   const params = {
     pid:this.ctx.helper.uuid(),
     type: this.ctx.request.body.type,
     content: this.ctx.request.body.content,
     create_time: new Date()
   }
   const result = await this.app.mysql.insert('job_space_schedule', params)
   return JSON.stringify({
     code: 1,
     mesage: 'success'
   })
 }
  //事项管理-更新
  async schedule_update() {

    const params = {
      pid:this.ctx.helper.uuid(),
      id:this.ctx.request.body.id,
      type: this.ctx.request.body.type,
      content: this.ctx.request.body.content,
      update_time: new Date()
    }
    if(this.ctx.request.body.type == '2'){
      Object.assign(params,{end_time:new Date()})
    }
    const result = await this.app.mysql.update('job_space_schedule', params)
    // 判断更新成功
    if(result.affectedRows === 1){
      return JSON.stringify({
        code: 1,
        mesage: 'success'
      })
    }else{
      return JSON.stringify({
        code: 2,
        mesage: 'failed'
      })
    }
  }
  //事项管理-删除
  async schedule_delete() {
    const params = {
      pid:this.ctx.helper.uuid(),
      id: this.ctx.request.body.id
    }
    const result = await this.app.mysql.delete('job_space_schedule', params)
    return JSON.stringify({
      code: 1,
      mesage: 'success'
    })
  }
}

module.exports = JobSpaceService