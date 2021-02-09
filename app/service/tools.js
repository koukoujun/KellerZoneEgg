'use strict'

const Service = require('egg').Service

class toolsService extends Service {
  //工具-标签
  async option(){
    if(this.ctx.request.body.type == ''||!this.ctx.request.body.type){
      return JSON.stringify({
        code:'2',
        message:'type类别不存在'
      })
    }
    const condition = {
      where:{type:this.ctx.request.body.type}
    }
    const result = await this.app.mysql.select('tools_option',condition)
    return JSON.stringify({
      code:1,
      message:'success',
      data:result
    })
  }
  //职业工具-列表
  async list() {
    let option = {}
    if(this.ctx.request.body.type&&this.ctx.request.body.type!=''){
      option = {where:{type:this.ctx.request.body.type}}
    }
    const result =  await this.app.mysql.select('tools',option)
    console.log(result)
    return JSON.stringify({
      code:1,
      mesage:'success',
      data:result
    })
  }
  //职业工具-添加
  async add(){
    if(this.ctx.request.body.name==''){
      return JSON.stringify({
        code:2,
        mesage:'请填写名称',
        result:result
      })
    }else if(this.ctx.request.body.url==''){
      return JSON.stringify({
        code:2,
        mesage:'请填写链接',
        result:result
      })
    }
    const params = {
      name:this.ctx.request.body.name,
      desc:this.ctx.request.body.desc,
      type:this.ctx.request.body.type,
      url:this.ctx.request.body.url,
      icon:this.ctx.request.body.icon
    }
    const result = await this.app.mysql.insert('tools',params)
    console.log(result)
    return JSON.stringify({
      code:1,
      mesage:'添加成功',
      result:result
    })
  }
  //社会服务-列表
  async listSocial() {
    const TABLE_NAME = 'tools_social';
    const QUERY_STR = '*';
    let sql = `select ${QUERY_STR} from ${TABLE_NAME} where area like "%${this.ctx.request.body.area}%"`;
    const result = await this.app.mysql.query(sql);
    let arrList = []
    result.map((item)=>{
      arrList.push({
        title:item.type,
        content:[item]
      })
    })
    function unique(arr){            
      for(let i=0; i<arr.length; i++){
        for(let j=i+1; j<arr.length; j++){
          if(arr[i].title==arr[j].title){         //第一个等同于第二个，splice方法删除第二个
            arr[i].content.push(arr[j].content[0])
            arr.splice(j,1);
            j--;
          }
        }
      }
    return arr;
    }
    return JSON.stringify({
      code:1,
      mesage:'success',
      data:unique(arrList)
    })
  }
  //社会服务-add
  async addSocial(){
    if(this.ctx.request.body.name==''){
      return JSON.stringify({
        code:2,
        mesage:'请填写名称',
        result:result
      })
    }else if(this.ctx.request.body.url==''){
      return JSON.stringify({
        code:2,
        mesage:'请填写链接',
        result:result
      })
    }
    else if(this.ctx.request.body.area==''){
      return JSON.stringify({
        code:2,
        mesage:'请选择地区',
        result:result
      })
    }
    const params = {
      name:this.ctx.request.body.name,
      desc:this.ctx.request.body.desc,
      type:this.ctx.request.body.type,
      url:this.ctx.request.body.url,
      icon:this.ctx.request.body.icon,
      area:this.ctx.request.body.area
    }
    const result = await this.app.mysql.insert('tools_social',params)
    console.log(result)
    return JSON.stringify({
      code:1,
      mesage:'添加成功'
    })   
  }
}

module.exports = toolsService
