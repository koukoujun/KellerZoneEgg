'use strict'

const Service = require('egg').Service;

class CommunityService extends Service {
  // 获取文章列表  
  async list() {
    const result = await this.app.mysql.select('community_list')
    return JSON.stringify({
      code: 1,
      mesage: 'success',
      data: result
    })
  }
  //获取文章详情
  async article_detail() {
    if (!this.ctx.request.body.id || this.ctx.request.body.id == '') {
      return JSON.stringify({
        code: 2,
        message: 'id不存在'
      })
    }
    const result = await this.app.mysql.get('community_list', { id: this.ctx.request.body.id })
    return JSON.stringify({
      code: 1,
      mesage: 'success',
      data: result
    })
  }
  //添加新文章
  async add() {
    console.log('添加文章参数', this.ctx.request)
    let name = await this.app.mysql.select('user',{
      where:{uuid:this.ctx.helper.uuid()}
    })
    console.log(name[0].user_name)

    const params = {
      pid:this.ctx.helper.uuid(),
      name: name[0].user_name,
      title: this.ctx.request.body.title,
      content: this.ctx.request.body.content,
      type:this.ctx.request.body.type,
      praise_count:0,
      time: new Date()
    }
    const result = await this.app.mysql.insert('community_list', params)
    return JSON.stringify({
      code: 1,
      mesage: 'success',
      data: result
    })
  }
  //文章点赞
  async article_add_praise(){
    const checkId = await this.app.mysql.select('community_list',{
      where:{ id: this.ctx.request.body.id }
    })
    if(checkId.length<1){
        return JSON.stringify({
        code: 2,
        mesage: 'id 不存在'
        })
    }else{
      const newData = {
        id:checkId[0].id,
        praise_count:parseInt(checkId[0].praise_count)+1
      }
      const result = await this.app.mysql.update('community_list',newData)
      console.log(result)
      return JSON.stringify({
        code: 1,
        mesage: 'success'
      })
    }
  }
  //查找文章
  async article_search(){
    const TABLE_NAME = 'community_list';
    const QUERY_STR = '*';
    let sql = `select ${QUERY_STR} from ${TABLE_NAME} where title like "%${this.ctx.request.body.title}%"`;
    const result = await this.app.mysql.query(sql);
    console.log(result)
    return JSON.stringify({
      code: 1,
      mesage: 'success',
      data:result
    })
  }
  //获取评论详情
  async rep_detail() {
    const result = await this.app.mysql.select('community_response', { // 搜索 post 表
      where: { pid: this.ctx.request.body.id }, // WHERE 条件
    });
    function formatTree(obj) {
      let copyedObj = JSON.parse(JSON.stringify(obj)) //深拷贝源数据
      return copyedObj.filter(parent => {
        let findChildren = copyedObj.filter(child => {
          return parent.id === child.fid
        })
        findChildren.length > 0 ? parent.children = findChildren : parent.children = []
        return parent.fid == 0 //返回顶层，依据实际情况判断这里的返回值
      })
    }
    //含有emoji 表情包base64解码
    result.map((item)=>{
      const regRule= /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
      const regResult = regRule.test(item.content)
      if(regResult == true){
        item.content = Buffer.from(item.content, 'base64').toString()
      }
    })
    const repData = formatTree(result)
    console.log('树形数据', repData)
    return JSON.stringify({
      code: 1,
      mesage: 'success',
      data: repData
    })
  }
  //添加评论
  async rep_add() {
    console.log('添加评论参数', this.ctx.request)
    const content = Buffer.from(this.ctx.request.body.content).toString('base64')
    const params = {
      uuid:this.ctx.helper.uuid(),//用户id
      pid: this.ctx.request.body.pid,//评论归属文章
      fid: this.ctx.request.body.fid,//父级id
      name: this.ctx.request.body.name,//用户姓名
      praise_count:0,//点赞数
      content: content,//评论内容
      time: new Date()
    }
    const result = await this.app.mysql.insert('community_response', params)
    return JSON.stringify({
      code: 1,
      mesage: 'success',
      data: result
    })
  }
  //评论点赞
  async rep_add_praise(){
    const checkId = await this.app.mysql.select('community_response',{
      where:{ id: this.ctx.request.body.id }
    })
    if(checkId.length<1){
       return JSON.stringify({
        code: 2,
        mesage: 'id 不存在'
       })
    }else{
      const newData = {
        id:checkId[0].id,
        praise_count:parseInt(checkId[0].praise_count)+1
      }
      const result = await this.app.mysql.update('community_response',newData)
      console.log(result)
      return JSON.stringify({
        code: 1,
        mesage: 'success'
      })
    }
  }
}

module.exports = CommunityService