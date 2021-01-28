'use strict';


/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller , middleware} = app;
  // 重定向到swagger-ui.html
  router.redirect('/', '/swagger-ui.html' , 302);
  // middleware
  const jwtErr = middleware.jwtErr(app.config.jwt)
  // user
  router.post('/user',jwtErr,controller.user.index);
  router.post('/user/user',jwtErr,controller.user.user);
  router.post('/user/add', controller.user.add);
  router.post('/user/delete', controller.user.delete);
  router.post('/user/update', controller.user.update);
  router.post('/user/search', controller.user.search);
  router.post('/user/login', controller.user.login);
  // jobspace
  router.post('/jobspace/science',controller.jobspace.science);
  router.post('/jobspace/schedule_add',controller.jobspace.schedule_add);
  router.post('/jobspace/schedule_list',controller.jobspace.schedule_list);
  router.post('/jobspace/schedule_update',controller.jobspace.schedule_update);
  router.post('/jobspace/schedule_delete',controller.jobspace.schedule_delete);
  // community
  router.post('/community',controller.community.list);
  router.post('/community/article_detail',controller.community.article_detail)
  router.post('/community/add',controller.community.add)
  router.post('/community/article_add_praise',controller.community.article_add_praise)
  router.post('/community/article_search',controller.community.article_search)
  router.post('/community/rep_detail',controller.community.rep_detail)
  router.post('/community/rep_add',controller.community.rep_add)
  router.post('/community/rep_add_praise',controller.community.rep_add_praise)
  // works
  router.post('./works/resume',controller.works.list)
  router.post('./works/resume_add',controller.works.resume_add)
  router.post('./works/resume_compile',controller.works.resume_compile)
  //tools
  router.post('./tools/option',controller.tools.option)
  router.post('./tools',controller.tools.list)
  router.post('./tools/add',controller.tools.add)
  router.post('./tools',controller.tools.listSocial)
  router.post('./tools/add_social',controller.tools.addSocial)
  //feedback
  router.post('./feedback/add',controller.feedback.add)
  /* common */
  router.post('./common/province',controller.common.commonProvince)
  /* 组件 */
  //上传
  router.resources('file', '/components/upload_file', controller.components.uploadFile);
};
