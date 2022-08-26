/**
 * 公共api
 */
import { get, post } from '@/plugins/axios'
import config from '@/config/index'
const apiPath = config.gatewayUrl

export const getUserInfoApi = () => {
  return get(`${apiPath}/assess/userInfo/detail`)
}

export const sendCodeApi = (data) => { //new
  return get(`${apiPath}/auth/sendCode`, { params: data })
}

export const assessRegisterApi = (data) => {  //new
  return post(`${apiPath}/user/register`, data)
}

export const loginApi = (data) => {  //new
  return post(`${apiPath}/user/login`, data)
}

export const userInfoUpdate = (data) => {  //new
  return post(`${apiPath}/user/update`, data)
}
export const UpdatePwd = (data) => {  //new
  return post(`${apiPath}/user/updatePwd`, data)
}

export const userInfo = (data) => {  //new
  return post(`${apiPath}/user/detail`, data)
}

export const userScore = (data) => {  //new
  return post(`${apiPath}/assess/assess/userScore`, data)
}

export const fastSearch = (data) => {  //new
  return post(`${apiPath}/assess/assess/fastEvaluate`, data)
}

export const queryDictDataByType = (data) => {  //new
  return get(`${apiPath}/system/dict/data/queryDictDataByType`, { params: data })
}

//根据工作所在城市查询相应的高新区列表
export const queryHighArea = (data) => {  //new
  return get(`${apiPath}/system/dict/data/queryHighArea`, { params: data })
}

// 三级联动
export const getDistrictsListApi = (data) => {
  return get(`${apiPath}/assess/districts/districtsList`, { params: data })
}

//身价评估-基本信息
export const userInfoAdd = (data) => {  //new
  return post(`${apiPath}/assess/userInfo/add`, data)
}

//上传文件
export const upload = (data) => {  //new
  return post(`${apiPath}/assess/oss/upload`, data)
}

//上传文件
export const uploadUrl = (data) => {  //new
  return post(`${apiPath}/assess/oss/uploadReturnUrl`, data)
}
//学历学位信息详情
export const eduDetail = (data) => {  //new
  return get(`${apiPath}/assess/education/detail`, { params: data })
}
//学历学位信息更新
export const eduAdd = (data) => {  //new
  return post(`${apiPath}/assess/education/add`, data)
}
//职务职级信息详情
export const dutyDetail = (data) => {  //new
  return get(`${apiPath}/assess/rank/detail`, { params: data })
}
//职务职级信息更新
export const postAdd = (data) => {  //new
  return post(`${apiPath}/assess/rank/add`, data)
}

//知识产权列表
export const intellectualList = (data) => {  //new
  return get(`${apiPath}/assess/intellectual/list`, { params: data })
}
//知识产权添加
export const intellectualAdd = (data) => {  //new
  return post(`${apiPath}/assess/intellectual/add`, data)
}
//知识产权修改
export const intellectualUpdate = (data) => {  //new
  return post(`${apiPath}/assess/intellectual/update`, data)
}
//知识产权删除
export const intellectualDelete = (data) => {  //new
  return post(`${apiPath}/assess/intellectual/batchDelete`, data, { www: 1 })
}
//科技成果列表
export const techList = (data) => {  //new
  return get(`${apiPath}/assess/technological/list`, { params: data })
}
//科技成果添加
export const techAdd = (data) => {  //new
  return post(`${apiPath}/assess/technological/add`, data)
}
//科技成果修改
export const techUpdate = (data) => {  //new
  return post(`${apiPath}/assess/technological/update`, data)
}
//科技成果删除
export const techDelete = (data) => {  //new
  return post(`${apiPath}/assess/technological/batchDelete`, data, { www: 1 })
}
//成就贡献列表
export const contributeList = (data) => {  //new
  return get(`${apiPath}/assess/contribute/list`, { params: data })
}
//成就贡献添加
export const contributeAdd = (data) => {  //new
  return post(`${apiPath}/assess/contribute/add`, data)
}
//成就贡献修改
export const contributeUpdate = (data) => {  //new
  return post(`${apiPath}/assess/contribute/update`, data)
}
//成就贡献删除
export const contributeDelete = (data) => {  //new
  return post(`${apiPath}/assess/contribute/batchDelete`, data, { www: 1 })
}
//荣誉称号列表
export const honorList = (data) => {  //new
  return get(`${apiPath}/assess/honor/list`, { params: data })
}
//荣誉称号添加
export const honorAdd = (data) => {  //new
  return post(`${apiPath}/assess/honor/add`, data)
}
//荣誉称号修改
export const honorUpdate = (data) => {  //new
  return post(`${apiPath}/assess/honor/update`, data)
}
//荣誉称号删除
export const honorDelete = (data) => {  //new
  return post(`${apiPath}/assess/honor/batchDelete`, data, { www: 1 })
}
//社会职务详情
export const societypostDetail = (data) => {  //new
  return get(`${apiPath}/assess/societypost/detail`, { params: data })
}
//社会职务修改
export const societypostUpdate = (data) => {  //new
  return post(`${apiPath}/assess/societypost/add`, data)
}
//社会职务详情
export const additionalDetail = (data) => {  //new
  return get(`${apiPath}/assess/additional/detail`, { params: data })
}
//社会职务修改
export const additionalUpdate = (data) => {  //new
  return post(`${apiPath}/assess/additional/add`, data)
}

//财富信息详情
export const wealthInfoDetail = (data) => {  //new
  return get(`${apiPath}/assess/wealthInfo/detail`, { params: data })
}
//财富信息修改
export const wealthInfoUpdate = (data) => {  //new
  return post(`${apiPath}/assess/wealthInfo/add`, data)
}

//学习经历列表
export const eduexperienceList = (data) => {  //new
  return get(`${apiPath}/assess/eduexperience/list`, { params: data })
}
//学习经历添加
export const eduexperienceAdd = (data) => {  //new
  return get(`${apiPath}/assess/eduexperience/add`, { params: data })
}

//学习经历删除
export const eduexperienceDelete = (data) => {  //new
  return post(`${apiPath}/assess/eduexperience/batchDelete`, data, { www: 1 })
}

//学习经历修改
export const eduexperienceUpdate = (data) => {  //new
  return post(`${apiPath}/assess/eduexperience/update`, data)
}

//身价计算
export const precisoEvaluate = (data) => {  //new
  return post(`${apiPath}/assess/assess/precisoEvaluate`, data)
}
//查询人均身价平均值
export const argScore = (data) => {  //new
  return get(`${apiPath}/assess/assess/argAssessScore`, { params: data })
}
//综合身价报告
export const zhTalentReportSend = (data) => {  //new
  return get(`${apiPath}/assess/assess/zhTalentReport`, { params: data })
}
//金融身价报告
export const financeReportSend = (data) => {  //new
  return get(`${apiPath}/assess/assess/financeReport`, { params: data })
}
//投资身价报告
export const investReportSend = (data) => {  //new
  return get(`${apiPath}/assess/assess/investReport`, { params: data })
}
//岗位身价报告
export const postReportSend = (data) => {  //new
  return get(`${apiPath}/assess/assess/postReport`, { params: data })
}

//报告列表
export const reportDetail = (data) => {  //new
  return get(`${apiPath}/assess/commodity/queryLastReportInfo`, { params: data })
}

//报告列表
export const reportList = (data) => {  //new
  return get(`${apiPath}/assess/commodity/reportList`, { params: data })
}
//报告预览
export const reportView = (data) => {  //new
  return get(`${apiPath}/assess/assess/reportView`, { params: data })
}
//报告购买
export const reportOrder = (data) => {  //new
  return post(`${apiPath}/assess/yjptOrder/save`, data)
}
//报告邮件发送
export const reportSend = (data) => {  //new
  return get(`${apiPath}/assess/assess/reportSend`, { params: data })
}

//身价证书
export const certificateInit = (data) => {  //new
  return get(`${apiPath}/assess/certificate/getPersonCertificateURL`, { params: data })
}

//查询身价证书是否超期和支付等相关信息
export const certificateQuery = (data) => {  //new
  return get(`${apiPath}/assess/certificate/queryPersonCertificateInfo`, { params: data })
}
//积分管理
export const pointDetail = (data) => {  //new
  return post(`${apiPath}/assess/point/queryUserPoints`, data)
}
//积分管理
export const pointAdd = (data) => {  //new
  return post(`${apiPath}/assess/point/save`, data)
}
//评估动态
export const scoreRecords = (data) => {  //new
  return get(`${apiPath}/assess/assess/scoreRecords`, { params: data })
}
//评估记录
export const userScoreRecords = (data) => {  //new
  return get(`${apiPath}/assess/assess/userScoreRecords`, { params: data })
}
//证书头像上传
export const avatorImg = (data) => {  //new
  return post(`${apiPath}/user/userPic/add`, data)
}
//证书头像查询
export const userPicDetail = (data) => {  //new
  return get(`${apiPath}/user/userPic/detail`, { params: data })
}
//身价名片
export const sjCard = (data) => {  //new
  return get(`${apiPath}/assess/businessCard/getPersonBusinessCardURL`, { params: data })
}
//身价档案
export const sjDocDetail = (data) => {  //new
  return get(`${apiPath}/assess/archives/queryPersonArchives`, { params: data })
}

//身价卡包
export const getCardBagData = (data) => {  //new
  return get(`${apiPath}/user/userPic/queryUserCardBagData`, { params: data })
}
//积分记录
export const getPointRecord = (data) => {  //new
  return post(`${apiPath}/assess/point/list`, data)
}

//补充信息删除
export const batchDelete = (data) => {  //new
  return post(`${apiPath}/assess/supplement/batchDelete`, data, { www: 1 })
}
//补充信息添加
export const batchAdd = (data) => {  //new
  return post(`${apiPath}/assess/supplement/add`, data )
}
//补充信息更新
export const batchupdate = (data) => {  //new
  return post(`${apiPath}/assess/supplement/update`, data)
}
//补充信息列表
export const batchList = (data) => {  //new
  return get(`${apiPath}/assess/supplement/list`, { params: data })
}

//订单列表查询
export const queryUserOrderList = (data) => {  //new
  return get(`${apiPath}/assess/yjptOrder/queryUserOrderList`, { params: data })
}

//查询身价占比
export const queryRankPercent = (data) => {  //new
  return get(`${apiPath}/assess/assess/rankRange`, { params: data })
}
//---------------------团队功能接口----------------------------------
//我创建的团队
export const teamInfoList = (data) => {  //new
  return get(`${apiPath}/assess/teamInfo/list`, { params: data })
}
//我加入的团队
export const teamInfoJoinList = (data) => {  //new
  return get(`${apiPath}/assess/teamInfo/joinList`, { params: data })
}
//我加入的团队
export const teamAdd = (data) => {  //new
  return post(`${apiPath}/assess/teamInfo/add`, data)
}
//团队信息
export const teamDetail = (data) => {  //new
  return get(`${apiPath}/assess/teamInfo/detail/`+ data )
}
//团队购买信息
export const teamPayInfo = (data) => {  //new
  return get(`${apiPath}/assess/teamInfo/queryTeamPayInfo/`,{ params: data } )
}
//查询团队成员
export const teamMember = (data) => {  //new
  return get(`${apiPath}/assess/teamMember/queryMemberByTeamId`,{ params: data } )
}
//团队证书
export const TeamCertificate = (data) => {  //new
  return get(`${apiPath}/assess/teamCertificate/getTeamCertificateURL`,{ params: data } )
}
//团队报告
export const teamReportView = (data) => {  //new
  return get(`${apiPath}/assess/teamReport/reportView`,{ params: data } )
}
//团队报告
export const teamReportSend = (data) => {  //new
  return get(`${apiPath}/assess/teamReport/reportSend`,{ params: data } )
}
//团队成员添加
export const teamMemberAdd = (data) => {  //new
  return post(`${apiPath}/assess/teamMember/add`, data, config)
}
//团队成员删除
export const teamMemberDelete = (data) => {  //new
  return get(`${apiPath}/assess/teamMember/delete`,{ params: data } )
}
//团队成员退出
export const teamMemberLeave = (data) => {  //new
  return get(`${apiPath}/assess/teamMember/signOutTeam`,{ params: data } )
}
//团队解散
export const teamBatchBreak = (data) => {  //new
  return post(`${apiPath}/assess/teamInfo/batchDelete`,data, { www: 1 } )
}
//---------------------小程序支付接口----------------------------------
//小程序支付
export const wechatAppletPay = (data) => {  //new
  return post(`${apiPath}/assess/wechatApplet/pay`, data, config)
}
//-------------------------------------------------------
//根据国家名称查询国家列表
export const gdpList = (data) => {  //new
  return get(`${apiPath}/assess/gdp/data/list`,{ params: data } )
}
//-------------------------------------------------------
//外籍人员来中国原因删除
export const foreignReasonDelete = (data) => {  //new
  return post(`${apiPath}/assess/foreign/reason/batchDelete`, data, { www: 1 })
}
//外籍人员来中国原因添加
export const foreignReasonAdd = (data) => {  //new
  return post(`${apiPath}/assess/foreign/reason/add`, data )
}
//外籍人员来中国原因更新
export const foreignReasonUpdate = (data) => {  //new
  return post(`${apiPath}/assess/foreign/reason/update`, data)
}
//外籍人员来中国原因列表
export const foreignReasonList = (data) => {  //new
  return get(`${apiPath}/assess/foreign/reason/list`, { params: data })
}
//-------------------------------------------------------
//外籍人员来中国技术删除
export const foreignTechDelete = (data) => {  //new
  return post(`${apiPath}/assess/foreign/technology/batchDelete`, data, { www: 1 })
}
//外籍人员来中国技术添加
export const foreignTechAdd = (data) => {  //new
  return post(`${apiPath}/assess/foreign/technology/add`, data )
}
//外籍人员来中国技术更新
export const foreignTechUpdate = (data) => {  //new
  return post(`${apiPath}/assess/foreign/technology/update`, data)
}
//外籍人员来中国技术列表
export const foreignTechList = (data) => {  //new
  return get(`${apiPath}/assess/foreign/technology/list`, { params: data })
}
//-------------------------------------------------------
//外籍人员来中国解决问题删除
export const foreignProblemDelete = (data) => {  //new
  return post(`${apiPath}/assess/foreign/problem/batchDelete`, data, { www: 1 })
}
//外籍人员来中国解决问题添加
export const foreignProblemAdd = (data) => {  //new
  return post(`${apiPath}/assess/foreign/problem/add`, data )
}
//外籍人员来中国解决问题更新
export const foreignProblemUpdate = (data) => {  //new
  return post(`${apiPath}/assess/foreign/problem/update`, data)
}
//外籍人员来中国解决问题列表
export const foreignProblemList = (data) => {  //new
  return get(`${apiPath}/assess/foreign/problem/list`, { params: data })
}
//-------------------------------------------------------
//外籍人员来中国企业删除
export const foreignEnterpriseDelete = (data) => {  //new
  return post(`${apiPath}/assess/foreign/problem/batchDelete`, data, { www: 1 })
}
//外籍人员来中国企业添加
export const foreignEnterpriseAdd = (data) => {  //new
  return post(`${apiPath}/assess/foreign/problem/add`, data )
}
//外籍人员来中国企业更新
export const foreignEnterpriseUpdate = (data) => {  //new
  return post(`${apiPath}/assess/foreign/problem/update`, data)
}
//外籍人员来中国企业列表
export const foreignEnterpriseList = (data) => {  //new
  return get(`${apiPath}/assess/foreign/problem/list`, { params: data })
}
//-------------------------------------------------------
//外籍人员来中国发挥特长删除
export const foreignSpecialtyDelete = (data) => {  //new
  return post(`${apiPath}/assess/foreign/specialty/batchDelete`, data, { www: 1 })
}
//外籍人员来中国发挥特长添加
export const foreignSpecialtyAdd = (data) => {  //new
  return post(`${apiPath}/assess/foreign/specialty/add`, data )
}
//外籍人员来中国发挥特长更新
export const foreignSpecialtyUpdate = (data) => {  //new
  return post(`${apiPath}/assess/foreign/specialty/update`, data)
}
//外籍人员来中国发挥特长列表
export const foreignSpecialtyList = (data) => {  //new
  return get(`${apiPath}/assess/foreign/specialty/list`, { params: data })
}
//-------------------------------------------------------
//外籍人员社会职务添加
export const foreignPostAdd = (data) => {  //new
  return post(`${apiPath}/assess/foreign/societypost/add`, data )
}
//外籍人员社会职务更新
export const foreignPostUpdate = (data) => {  //new
  return post(`${apiPath}/assess/foreign/societypost/update`, data)
}
//外籍人员社会职务删除
export const foreignPostDelete = (data) => {  //new
  return post(`${apiPath}/assess/foreign/societypost/batchDelete`, data, { www: 1 })
}
//外籍人员社会职务列表
export const foreignPostList = (data) => {  //new
  return get(`${apiPath}/assess/foreign/societypost/list`, { params: data })
}
//----------------------------------------------------------------------
//工作经历删除
export const workExpDelete = (data) => {  //new
  return post(`${apiPath}/assess/work/batchDelete`, data, { www: 1 })
}
//工作经历添加
export const workExpAdd = (data) => {  //new
  return post(`${apiPath}/assess/work/add`, data )
}
///工作经历列表
export const workExpList = (data) => {  //new
  return get(`${apiPath}/assess/work/list`, { params: data })
}
//工作经历修改
export const workExpUpdate = (data) => {  //new
  return post(`${apiPath}/assess/work/update`, data )
}
//----------------------------------------------------------------------
export const getRankListApi = () => {
  return get(`${apiPath}/assess/getRankList`)
}

export const uploadIdCardApi = (data) => {
  const config = {
    www: true
  }
  return post(`${apiPath}/app/uploadIdCard`, data, config)
}

// 识别身份证信息
export const readIdCardApi = (data) => {
  return get(`${apiPath}/app/readIdCard`, { params: data })
}

export const getRankApi = () => {
  return get(`${apiPath}/assess/getRank`)
}

export const changeMobileApi = (data) => {
  const config = {
    www: true
  }
  return post(`${apiPath}/app/changeMobile`, data, config)
}

export const changePasswordApi = (data) => {
  const config = {
    www: true
  }
  return post(`${apiPath}/app/changePassword`, data, config)
}

// 更新用户信息
export const updateBaseInfoApi = (data) => {
  return post(`${apiPath}/baseInfo/update`, data)
}

// 用户信息查询
export const getBaseInfoApi = () => {
  return get(`${apiPath}/baseInfo/query`)
}


// 字典数据
export const getDictTypeApi = (data) => {
  return get(`${apiPath}/dict/data/type`, { params: data })
}

// 高校列表
export const getSchoolListApi = (data) => {
  return get(`${apiPath}/getSchoolList`, { params: data })
}

// 工作经历__查询
export const getWorkexperiencesQueryApi = () => {
  return get(`${apiPath}/workexperiences/query`)
}

// 工作经历__删除
export const delWorkexperiencesApi = (data) => {
  return post(`${apiPath}/workexperiences/delete`, data, { www: 1 })
}

// 工作经历__添加
export const addWorkexperiencesApi = (data) => {
  return post(`${apiPath}/workexperiences/insert`, data)
}

// 工作经历__详情查询
export const getWorkexperiencesDetailApi = (data) => {
  return get(`${apiPath}/workexperiences/queryDetail`, { params: data })
}

// 工作经历__更新
export const updateWorkexperiencesApi = (data) => {
  return post(`${apiPath}/workexperiences/update`, data)
}

// 荣誉成就__查询
export const getHonorQueryApi = () => {
  return get(`${apiPath}/honor/query`)
}

// 荣誉成就__删除
export const delHonorApi = (data) => {
  return post(`${apiPath}/honor/delete`, data, { www: 1 })
}

// 荣誉成就__添加
export const addHonorApi = (data) => {
  return post(`${apiPath}/honor/insert`, data)
}

// 荣誉成就__详情查询
export const getHonorDetailApi = (data) => {
  return get(`${apiPath}/honor/queryDetail`, { params: data })
}

// 荣誉成就__更新
export const updateHonorApi = (data) => {
  return post(`${apiPath}/honor/update`, data)
}

// 职业资格__添加
export const addProfessionalApi = (data) => {
  return post(`${apiPath}/professional/insert`, data)
}

// 职业资格__查询
export const getProfessionalQueryApi = () => {
  return get(`${apiPath}/professional/query`)
}

// 职业资格__删除
export const delProfessionalApi = (data) => {
  return post(`${apiPath}/professional/delete`, data, { www: 1 })
}

// 参加赛事__添加
export const addCompetitionApi = (data) => {
  return post(`${apiPath}/competition/insert`, data)
}

// 参加赛事__查询
export const getCompetitionQueryApi = () => {
  return get(`${apiPath}/competition/query`)
}

// 参加赛事__删除
export const delCompetitionApi = (data) => {
  return post(`${apiPath}/competition/delete`, data, { www: 1 })
}

// 科研成果__添加
export const addScientificApi = (data) => {
  return post(`${apiPath}/scientific/insert`, data)
}

// 科研成果__查询
export const getScientificQueryApi = () => {
  return get(`${apiPath}/scientific/query`)
}

// 科研成果__删除
export const delScientificApi = (data) => {
  return post(`${apiPath}/scientific/delete`, data, { www: 1 })
}

// 技术成果__添加
export const addTechnologicalApi = (data) => {
  return post(`${apiPath}/technological/insert`, data)
}

// 技术成果__查询
export const getTechnologicalQueryApi = () => {
  return get(`${apiPath}/technological/query`)
}

// 技术成果__删除
export const delTechnologicalApi = (data) => {
  return post(`${apiPath}/technological/delete`, data, { www: 1 })
}

// 信息完善度
export const queryPerfectProportionApi = (data) => {
  return post(`${apiPath}/baseInfo/queryPerfectProportion`, data)
}

// 身价计算
export const reCalculateScoreApi = (data) => {
  return post(`${apiPath}/baseInfo/reCalculateScore`, data)
}

// 查询认可或不认可身价人数
export const getApprobateApi = () => {
  return get(`${apiPath}/baseInfo/queryApprobate`)
}

// 根据工作所在城市查询相应的高新区列表
export const getHighAreaApi = (data) => {
  return get(`${apiPath}/dict/data/queryHighArea`, { params: data })
}

// 国家数据
export const getCountryListApi = () => {
  return get(`${apiPath}/queryCountryList`)
}

// 民族数据
export const getNationListApi = () => {
  return get(`${apiPath}/queryNationList`)
}
