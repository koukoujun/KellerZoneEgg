/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1590471106652_7196';

  // add your middleware config here
  //中间件
  config.middleware = ['forbidIp'];
  //中间件-屏蔽ip配置
  config.forbidIp = {
    forbidips: [
      '192.168.1.12'
    ]
  }

  //add jwt
  config.jwt = {
    secret: '123456',
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 数据库配置
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'keller',
      // 密码
      password: '123456',
      // 数据库名
      database: 'keller_zone',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
  // 跨域配置
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
    domainWhiteList: ['127.0.0.1'],
  };
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };
  // swagger配置
  config.swaggerdoc = {
    dirScanner: './app/controller', // 配置自动扫描的控制器路径
    // 接口文档的标题，描述或其它
    apiInfo: {
        title: 'Keller-Api',  // 接口文档的标题
        description: '接口api文档(测试版)',   // 接口文档描述
        version: '1.0.0',   // 接口文档版本
    },
    schemes: ['http', 'https'], // 配置支持的协议
    consumes: ['application/json'], // 指定处理请求的提交内容类型（Content-Type），例如application/json, text/html
    produces: ['application/json'], // 指定返回的内容类型，仅当request请求头中的(Accept)类型中包含该指定类型才返回
    securityDefinitions: {  // 配置接口安全授权方式
        // apikey: {
        //   type: 'apiKey',
        //   name: 'clientkey',
        //   in: 'header',
        // },
        // oauth2: {
        //   type: 'oauth2',
        //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
        //   flow: 'password',
        //   scopes: {
        //     'write:access_token': 'write access_token',
        //     'read:access_token': 'read access_token',
        //   },
        // },
    },
    enableSecurity: false,  // 是否启用授权，默认 false（不启用）
    enableValidate: false,    // 是否启用参数校验，默认 true（启用）
    routerMap: true,    // 是否启用自动生成路由，默认 true (启用)
    enable: true,   // 默认 true (启用),
  };
  return {
    ...config,
    ...userConfig,
  };
};



