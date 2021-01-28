'use strict'

const Service = require('egg').Service

class worksService extends Service {
  //获取简历列表
  async list() {
    // 获取页码
    console.log(this.ctx.helper.uuid())
    const page = await this.app.mysql.select('works_resume',{
      where:{pid:this.ctx.helper.uuid()}
    })
    let pageList = []
    page.map((item)=>{
      pageList.push(item.id)
    })
    console.log(pageList)

    let id = this.ctx.request.body.id;
    const regId = ['',null,'null',undefined,'undefined',0,'0']
    if(regId.includes(id)){
      id = pageList[0]
    }

    const result = await this.app.mysql.select('works_resume',{
      where:{id:id}
    })
    const jobExp = await this.app.mysql.select('works_resume_jobexp',{
      where:{pid:id},
      columns:['id','name','content','start_time','end_time']
    })
    const projectExp = await this.app.mysql.select('works_resume_projectexp',{
      where:{pid:id},
      columns:['id','name','title','content','start_time','end_time']
    })
    function rTime(date) {
      let json_date = new Date(date).toJSON();
      let get_data = new Date(new Date(json_date) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      return get_data.substring(0,10)
    }
    jobExp.map((item)=>{
      item.start_time = rTime(item.start_time)
      item.end_time = rTime(item.end_time)
    })
    projectExp.map((item)=>{
      item.start_time = rTime(item.start_time)
      item.end_time = rTime(item.end_time)
    })
    
    result[0].jobExp = jobExp
    result[0].projectExp = projectExp

    Object.assign(result[0],{totalPage:pageList.length},{currentPage:this.ctx.request.body.id},{pageList:pageList})

    console.log(result)
    return JSON.stringify({
      code:1,
      mesage:'success',
      data:result[0]
    })
  }
  //添加简历
  async resume_add(){
    //基础信息
    let paramsBase = this.ctx.request.body
    const result = await this.app.mysql.insert('works_resume', paramsBase)
    //获取当前插入id
    const id = result.insertId
    //更新参数为空
    const row = {
      id: id,
      pid:this.ctx.helper.uuid(),
      jobExp: '',
      projectExp: '',
    };
    await this.app.mysql.update('works_resume', row); // 更新 works_resume 表中的记录
    //工作经验
    const paramsJobExp = JSON.parse(this.ctx.request.body.jobExp)
    paramsJobExp.map((item)=>{
      Object.assign(item,{pid:id})
    })
    await this.app.mysql.insert('works_resume_jobexp',paramsJobExp)
    //项目经验
    const paramsProjectExp = JSON.parse(this.ctx.request.body.projectExp)
    paramsProjectExp.map((item)=>{
      Object.assign(item,{pid:id})
    })
    await this.app.mysql.insert('works_resume_projectexp',paramsProjectExp)

    console.log(result)

    let code;
    let message;
    if(result.affectedRows === 1){
      code = 1;
      message = 'success'
    }else{
      code = 2;
      message = 'failed'
    }
    return JSON.stringify({
      code:code,
      mesage:message
    })
  }

  //编辑
  async resume_compile(){
    const id = this.ctx.request.body.id
    //查找id是否存在
    const is_id = await this.app.mysql.select('works_resume',{
      where:{id:id}
    })
    //console.log(is_id)
    if(is_id.length<=0){
      return JSON.stringify({
        code:2,
        message:'id不存在'
      })
    }
    //基础信息
    let paramsBase = this.ctx.request.body
    const result = await this.app.mysql.update('works_resume', paramsBase)
    //更新参数为空
    const row = {
      id: id,
      pid:this.ctx.helper.uuid(),
      jobExp: '',
      projectExp: '',
    }; 
    await this.app.mysql.update('works_resume', row); // 更新 works_resume 表中的记录
    //删除原工作经验&&原项目经验
    await this.app.mysql.delete('works_resume_jobexp',{pid:id})
    await this.app.mysql.delete('works_resume_projectexp',{pid:id})
    //更新工作经验
    const paramsJobExp = JSON.parse(this.ctx.request.body.jobExp)
    paramsJobExp.map((item)=>{
      Object.assign(item,{pid:id})
      console.log(item)
    })
    await this.app.mysql.insert('works_resume_jobexp',paramsJobExp)
    //更新原项目经验
    const paramsProjectExp = JSON.parse(this.ctx.request.body.projectExp)
    paramsProjectExp.map((item)=>{
      Object.assign(item,{pid:id})
    })
    await this.app.mysql.insert('works_resume_projectexp',paramsProjectExp)
    


    return JSON.stringify({
      code:1,
      message:'ceshi'
    })
  }
}

module.exports = worksService
