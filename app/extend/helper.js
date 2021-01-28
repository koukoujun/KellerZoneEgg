const moment = require('moment');
const fs = require('fs');
const path = require('path');
//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const dayjs = require('dayjs');
module.exports = {
  //uuid格式：年月日时分秒3位毫秒+3位随机数，共20位  ===>   20190312162455043167
  uuidSet() {
    let uuid = moment().format("YYYYMMDDHHmmssSSS");
    uuid += (Array(3).join(0) + Math.random()*100).slice(-3);
    return uuid;
  },
  //注册生成随机昵称
  makeName(){
    let num = Math.random(0.9).toString()
    let user_name = '游客'+num.substring(0,6)
    return user_name
  },
  //获取token并转码为uuid
  uuid(){
    const token = this.ctx.request.header.authorization;
    let decode = this.ctx.app.jwt.verify(token, this.ctx.app.options.secret);
    return decode.uuid
  },
  //获取上传文件
  async uploadFile(data) {
    const stream =  data
    console.log('-----------获取数据 start--------------');
    console.log(stream);
    console.log('-----------获取数据 end--------------');
    // 基础的目录
    const uplaodBasePath = 'app/public/uploads';
    // 生成文件名
    const filename = `${Date.now()}${Number.parseInt(
      Math.random() * 1000,
    )}${path.extname(stream.filename).toLocaleLowerCase()}`;
    // 生成文件夹
    const dirname = dayjs(Date.now()).format('YYYY/MM/DD');
    function mkdirsSync(dirname) {
      if (fs.existsSync(dirname)) {
        return true;
      } else {
        if (mkdirsSync(path.dirname(dirname))) {
          fs.mkdirSync(dirname);
          return true;
        }
      }
    }
    mkdirsSync(path.join(uplaodBasePath, dirname));
    // 生成写入路径
    const target = path.join(uplaodBasePath, dirname, filename);
    // 写入流
    const writeStream = fs.createWriteStream(target);
    try {
      //异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      //如果出现错误，关闭管道
      await sendToWormhole(stream);
      this.error();
    }
    const image_path = '/public/uploads/'+dirname+'/'+filename
    return image_path
  }
}
