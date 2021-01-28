module.exports = {
  //user
  user_contract_add: {
    user_name: { type: 'string', required: true, enum: '路人甲' },
    user_password: { type: 'string', required: true, enum: '123456' }
  },
  user_contract_delete: {
    id: { type: 'number', required: true, enum: 115 }
  },
  user_contract_update: {
    id: { type: 'number', required: true, enum: 110 },
    user_name: { type: 'string', required: true, enum: '路人甲' },
    user_password: { type: 'string', required: true, enum: '123456' },
    time: { type: 'string', required: true, enum: '2020-08-02' }
  },
  user_contract_search: {
    id: { type: 'number', required: true, enum: 01 }
  },
  user_contract_login: {
    user_number: { type: 'string', required: true, enum: 'admin' },
    user_password: { type: 'number', required: true, enum: '123456' }
  },
  //jobspace
  jobspace_schedule_add: {
    type: { type: 'string', required: true, enum: '1' },
    content: { type: 'string', required: true, enum: '测试内容' },
  },
  jobspace_schedule_update: {
    id: { type: 'string', required: true, enum: '1' },
    type: { type: 'string', required: true, enum: '1' },
    content: { type: 'string', required: true, enum: '测试内容' },
  },
  jobspace_schedule_delete: {
    id: { type: 'string', required: true, enum: '1' }
  },
  //community
  community_contract_rep_detail: {
    id: { type: 'number', required: true, enum: 01 }
  },
  community_contract_article_detail:{
    id: { type: 'number', required: true, enum: 01 }
  },
  community_contract_add: {
    name: { type: 'string', required: true, enum: '路人甲' },
    title: { type: 'string', required: true, enum: '标题' },
    content: { type: 'string', required: true, enum: '内容' },
  },
  community_contract_add_praise: {
    id: { type: 'number', required: true, enum: 1 }
  },
  community_contract_search: {
    title: { type: 'number', required: true, enum: 'php' }
  },
  community_contract_add_response: {
    pid:{ type: 'number', required: true, enum: 2 },
    fid:{ type: 'number', required: true, enum: 7 },
    name:{ type: 'string', required: true, enum: '评论测试' },
    content:{ type: 'string', required: true, enum: '路人甲' },
  },
  community_contract_add_praise:{
    id: { type: 'number', required: true, enum: 1 }
  },
  //works
  works_resume: {
    id: { type: 'number', required: true, enum: 0 }
  },
  works_resume_add: {
    email: { type: 'string', required: true, enum: '1060827900@qq.com' },
    expJob: { type: 'string', required: true, enum: '动画师' },
    interest: { type: 'string', required: true, enum: '绘画' },
    job: { type: 'string', required: true, enum: '服务员' },
    jobExp: {type: 'string', required: true, enum:'[{"name":"宇航局","content":"观测地球运行","start_time":"1990.01.02","end_time":"1999.10.22"},{"name":"宇航局","content":"观测火星运行","start_time":"1990.01.02","end_time":"1999.10.22"}]'},
    expIncome: { type: 'string', required: true, enum: '12k' },
    livePlace: { type: 'string', required: true, enum: '上海' },
    myIntroduce: { type: 'string', required: true, enum: '啦啦啦啦啦啦，我是卖报的小画家' },
    name: { type: 'string', required: true, enum: '小飞侠' },
    phone: { type: 'string', required: true, enum: '18700001234' },
    projectExp: { type: 'string', required: true, enum: '[{"title":"宇航局","name":"毒蝎1号计划","content":"规划地球运行","start_time":"1990.01.02","end_time":"1999.10.22"},{"title":"宇航局","name":"毒蝎2号计划","content":"规划火星运行","start_time":"1990.01.02","end_time":"1999.10.22"}]'},
    qq: { type: 'string', required: true, enum: '1060827900' },
    sex: { type: 'string', required: true, enum: '男' },
    skill: { type: 'string', required: true, enum: '洗碗' },
    wx: { type: 'string', required: true, enum: 'xiaofeixia123456' },
  },
  works_resume_compile: {
    id: { type: 'number', required: true, enum: 1 }
  },
  //tools
  tools_add: {
    name: { type: 'string', required: true, enum: '测试' },
    url: { type: 'string', required: true, enum: '/' }
  },
  tools_add_social: {
    name: { type: 'string', required: true, enum: '测试' },
    url: { type: 'string', required: true, enum: '/' },
    area: { type: 'string', required: true, enum: '3006' },
  },
  //feedback
  feedback_add: {
    title: { type: 'string', required: true, enum: '路人甲' },
    content: { type: 'string', required: true, enum: '路人甲爱吃酸辣粉' }
  },
};