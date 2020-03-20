"use strict";

/* 加载vue路由 */
import Router from "vue-router";

/* 加载 UserService */
import UserService from "../services/user";


/* 登录 */
const Login = () => import("../components/Login.vue");
/* 登录 */
const Register = () => import("../components/Register.vue");

/* 各个功能模块 --start-- */
const Home = () => import("../components/home/Index.vue");
const Home_Page = () => import("../components/home/Page.vue");

// 政策法规
const Policies_And_Regulations = () => import("../components/home/Policies_And_Regulations.vue");
// 新闻列表页
const News_List = () => import("../components/home/News_List.vue");
// 网上党校
const Online_Party_School_Index = () => import("../components/home/partySchool/Index.vue");
// 网上党校
const Online_Party_School = () => import("../components/home/partySchool/Online_Party_School.vue");
// 网上党校详情
const Party_School_Detail = () => import("../components/home/partySchool/Party_School_Detail.vue");
// 学习网上党校
const Learn_Party_School = () => import("../components/home/partySchool/Learn_Party_School.vue");
// 地图
const Map = () => import("../components/home/Map.vue");
// 详情页
const News_Detail = () => import("../components/home/Detail.vue");
// 写信
const Write_Letters = () => import("../components/home/Write_Letters.vue");
// 文章搜索列表
const Article_List = () => import("../components/home/ArticleList.vue");
// 组织信息
const Org_Message = () => import("../components/home/Org_Message.vue");


/* 编辑器测试 */
const Ueditor = () => import("../components/UeditorDY.vue");

/* 网上党课 */
const Online_Course_Index = () => import("../components/online_course/Index.vue");
// 党课列表
const Online_Course = () => import("../components/online_course/Online_Course.vue");
//党课详情
const Course_Detail = () => import("../components/online_course/Course_Detail.vue");
//学习党课
const Learn_Course = () => import("../components/online_course/Learn_Course.vue");
// 党课收藏
const Collection_Course = () => import("../components/online_course/Collection_Course.vue");
//创建党课
const CreateLecture = () => import("../components/online_course/Create_Lecture.vue");

/* 任务管理 */
const Task_Manage = () => import("../components/task_manage/Index.vue");
// 任务列表
const Task_List = () => import("../components/task_manage/Task_List.vue");
// 任务审批
const Task_Approve = () => import("../components/task_manage/Task_Approve.vue");
// 会议列表
const Task_Meeting = () => import("../components/task_manage/Meeting.vue");
// 通知列表
const Task_Inform = () => import("../components/task_manage/Inform.vue");

/*组织架构*/
const organizationIndex     = () => import("../components/organization/index.vue");
// 组织架构调整
const PartyAdjust           = () => import("../components/organization/PartyManage.vue");
// 公司组织架构调整
const CompanyAdjust           = () => import("../components/organization/CompanyManage.vue");
// 职工详情
const PeopleDetail           = () => import("../components/organization/companyManageComponents/Detail.vue");
// 党员花名册
const ARosterOfPartyMembers = () => import("../components/organization/ARosterOfPartyMembers.vue");
// 领导班子
const LeaderList            = () => import("../components/organization/LeaderList.vue");
// 党组织基本信息
const Organization_Message  = () => import("../components/organization/Message.vue");

/* 个人管理 */
const Personal_Manage = () => import("../components/personal_manage/Index.vue");
// 我的信息
const Personal_Message = () => import("../components/personal_manage/message/My_Message.vue");
// 经历性
const Experience = () => import("../components/personal_manage/message/Experience.vue");
// 获得性
const Archiveses = () => import("../components/personal_manage/message/Archiveses.vue");

// 我的任务
const Personal_Task = () => import("../components/personal_manage/My_Task.vue");
// 我的通知
const Personal_inform = () => import("../components/personal_manage/My_inform.vue");
// 我的权限
const Personal_Authority = () => import("../components/personal_manage/My_Authority.vue");
// 我的收藏
const Personal_Collection_Index = () => import("../components/personal_manage/my_collection/Index.vue");
// 我的收藏 - 文章
const Personal_Collection_Article = () => import("../components/personal_manage/my_collection/Article.vue");
// 我的收藏 - 党课
const Personal_Collection_Party_Lecture = () => import("../components/personal_manage/my_collection/Party_Lecture.vue");
// 我的积分
const Personal_Integral = () => import("../components/personal_manage/Integral.vue");
// 签到日历
const Calendar = () => import("../components/personal_manage/Calendar.vue");
// 我的会议
const Personal_Meeting = () => import("../components/personal_manage/My_Meeting.vue");
// 我的会议
const Personal_Notice = () => import("../components/personal_manage/My_Notice.vue");
// 我的信箱
const Personal_Mailbox = () => import("../components/personal_manage/my_mailbox/My_Mailbox.vue");
// 我的信箱详情
const Personal_Mailbox_Detail = () => import("../components/personal_manage/my_mailbox/My_Mailbox_Detail.vue");
// 个人组织生活
const Orgnizational_Life_Index = () => import("../components/personal_manage/my_organizational_life/Index.vue");
// 组织生活
const Orgnizational_Life = () => import("../components/personal_manage/my_organizational_life/OrgnizationalLife.vue");
// 入党申请
const ApplyForPartyMembership = () => import("../components/personal_manage/my_organizational_life/ApplyForPartyMembership.vue");
// 转正申请
const ApplicationForCorrection = () => import("../components/personal_manage/my_organizational_life/ApplicationForCorrection.vue");
// 我的规划
const MyPlan = () => import("../components/personal_manage/my_organizational_life/MyPlan.vue");
// 我的总结
const MySummary = () => import("../components/personal_manage/my_organizational_life/MySummary.vue");
// 我的报告
const MyReport = () => import("../components/personal_manage/my_organizational_life/MyReport.vue");
// 我的建议
const MySuggestion = () => import("../components/personal_manage/my_organizational_life/MySuggestion.vue");
// 我的请假
const MyLeave = () => import("../components/personal_manage/my_organizational_life/MyLeave.vue");


// 党员登记
const PartyMember_Register = () => import("../components/personal_manage/PartyMemberRegister.vue");
/*个人中心-投票活动管理*/
const Personal_Vote_Index = () => import("../components/vote_manage/Index.vue");
const Personal_Activity_List   = () => import("../components/personal_manage/vote/vote_activity_list/ActivityList.vue");
const Personal_Activity_Detail   = () => import("../components/personal_manage/vote/vote_activity_list/ActivityDetail.vue");
const Personal_Vote = () => import("../components/personal_manage/vote/vote_activity_list/Vote.vue");

// 我的组织
const My_Org_Index = () => import("../components/personal_manage/my_org/Index.vue");
// 我的企业
const My_Business = () => import("../components/personal_manage/my_org/My_Business.vue");
// 我的党组织
const My_Party_Organization = () => import("../components/personal_manage/my_org/My_Party_Organization.vue");
// 我的工会组织
const My_Trade_Union_Organization = () => import("../components/personal_manage/my_org/My_Trade_Union_Organization.vue");
// 我的团组织
const My_Regiment_Organization = () => import("../components/personal_manage/my_org/My_Regiment_Organization.vue");


/*学习教育*/
const Study_Index = () => import("../components/study/Index.vue");
const Study      = () => import("../components/study/Study.vue");

/* 系统设置 */
const Settings_Index = () => import("../components/settings/Index.vue");
// 首页管理
const Settings_Home = () => import("../components/settings/Home.vue");
// 上传文章
const Settings_Upload_Article = () => import("../components/settings/UploadArticle.vue");
// 上传文章
const Settings_Edit_Article = () => import("../components/settings/EditArticle.vue");
// 新文章
const Settings_New_Article = () => import("../components/settings/NewArticle.vue");
// 新评论
const Settings_New_Comment = () => import("../components/settings/NewComment.vue");
// 新报错
const Settings_New_Error = () => import("../components/settings/NewError.vue");
// 添加专题
const Settings_New_Special = () => import("../components/settings/NewSpecial.vue");
// 添加分类
const Settings_New_Type = () => import("../components/settings/NewType.vue");
// 学习专题
const Settings_Study_Special = () => import("../components/settings/StudySpecial.vue");
// 文章删除
const Settings_Article_Delete = () => import("../components/settings/ArticleDelete.vue");
// 文章详情
const Settings_Article_Detail = () => import("../components/settings/ArticleDetail.vue");


/* 谈心谈话 */
const Talking_Index = () => import("../components/talking/Index.vue");
// 列表
const Talking_Talking = () => import("../components/talking/Talking.vue");
// 详情
const Talking_Detail = () => import("../components/talking/Detail.vue");

/* 主题活动 */
const Theme_Index = () => import("../components/theme/Index.vue");
// 列表
const Theme_Theme = () => import("../components/theme/Theme.vue");
// 详情
const Theme_Detail = () => import("../components/theme/Detail.vue");


/*选票管理*/
const Vote_Index = () => import("../components/vote_manage/Index.vue");
const Vote_List   = () => import("../components/vote_manage/vote_list/VoteList.vue");
const Create_Vote   = () => import("../components/vote_manage/vote_list/CreateVote.vue");
const Vote_Detail   = () => import("../components/vote_manage/vote_list/VoteDetail.vue");
// 投票活动管理
const Activity_List   = () => import("../components/vote_manage/vote_activity_list/ActivityList.vue");
const Activity_Detail   = () => import("../components/vote_manage/vote_activity_list/ActivityDetail.vue");
const Vote = () => import("../components/vote_manage/vote_activity_list/Vote.vue");

/* 发展党员 */
const Develop_Party_Members_Index = () => import("../components/develop_party_members/Index.vue");
//发展名册
const roster_of_development_Index = () => import("../components/develop_party_members/roster_of_development/Index.vue");

/* 党员管理 */
// 党费缴纳
const Payment_Index = () => import("../components/members_manage/Index.vue");
// 党费缴纳
const Payment_Payment = () => import("../components/members_manage/Payment.vue");

/* 图片考试 */
const Testing_Index = () => import("../components/testing/Index.vue");
// 知识点管理
const Knowledge_Point = () => import("../components/testing/KnowledgePoint.vue");
// 题库
const Question_Library = () => import("../components/testing/QuestionLibrary.vue");
// 题目详情
const Question_Detail = () => import("../components/testing/QuestionDetail.vue");
// 智能组题
const Create_Exam_Paper = () => import("../components/testing/CreateExamPaper.vue");
// 试题列表
const Exam_Paper_List = () => import("../components/testing/ExamPaperList.vue");
// 智能组题详情
const Auto_Paper_Detail = () => import("../components/testing/AutoPaperDetail.vue");
// 手动出题详情
const Manual_Paper_Detail = () => import("../components/testing/ManualPaperDetail.vue");
// 试题篮
const Question_Basket = () => import("../components/testing/QuestionBasket.vue");
// 考试列表
const Testing_List = () => import("../components/testing/TestingList.vue");
// 考试详情
const Testing_Detail = () => import("../components/testing/TestingDetail.vue");

// 党风廉政
const CleanAndHonestGovernment = () => import("../components/otherTask/CleanAndHonestGovernment.vue");
// 党群共建
const CoConstructionOfThePartyAndTheMasses = () => import("../components/otherTask/CoConstructionOfThePartyAndTheMasses.vue");
// 发展党员
const DevelopingPartyMembers = () => import("../components/otherTask/DevelopingPartyMembers.vue");
// 学习教育
const LearningEducation = () => import("../components/otherTask/LearningEducation.vue");
// 规划总结
const OrganizationalBuilding = () => import("../components/otherTask/OrganizationalBuilding.vue");
// 党代表名单
const ListOfPartyRepresentatives = () => import("../components/otherTask/ListOfPartyRepresentatives.vue");

// 组织生活
const OrganizationalLife = () => import("../components/otherTask/OrganizationalLife.vue");
// 党费管理
const PartyFeeManagement = () => import("../components/otherTask/PartyFeeManagement.vue");
// 干部管理
const PersonnelAdministration = () => import("../components/otherTask/PersonnelAdministration.vue");
// 干部名册
const RosterOfCadras = () => import("../components/otherTask/RosterOfCadras.vue");

// 投票调研
const PollResearch = () => import("../components/otherTask/PollResearch.vue");
// 宣传文化
const PropagandaCulture = () => import("../components/otherTask/PropagandaCulture.vue");
// 主题实践活动
const ThemeActivityPractice = () => import("../components/otherTask/ThemeActivityPractice.vue");


// 查看答卷
const Check_Answer = () => import("../components/testing/CheckAnswer.vue");

// 我的考试
const My_Testing_Index = () => import("../components/my_testing/Index.vue");
// 我的考试- 列表
const My_Testing_List = () => import("../components/my_testing/TestingList.vue");
// 考试详情
const My_Testing_Detail = () => import("../components/my_testing/TestingDetail.vue");
// 开始考试
const Start_Testing = () => import("../components/my_testing/StartTesting.vue");

/* 我的谈心谈话 */
const My_Talking_Index = () => import("../components/personal_manage/talking/Index.vue");
// 我的列表
const My_Talking_Talking = () => import("../components/personal_manage/talking/Talking.vue");
// 我的详情
const My_Talking_Detail = () => import("../components/personal_manage/talking/Detail.vue");

//维护系统
const MaintenanceSystemIndex  = () => import("../components/maintenanceSystem/Index.vue");
const FeedbackPage            = () => import("../components/maintenanceSystem/Feedback.vue");
const InstructionsPage        = () => import("../components/maintenanceSystem/Instructions.vue");

/* 各个功能模块 --end-- */

// ------ 首页 ---------
const [HOME, LOGIN, REGISTER, INSTRCTIONS] = [
  { 
    path: "/home", 
    component: Home,
    name: "home",
    meta: {
        showInNav: false,
        navName: "首页",
        type: 'home',
    },
    children:[
        { path: "" , component: Home_Page, name: "Home_Page", meta: {type: 'home'}},
        { path: "ueditor", component: Ueditor, name: "Ueditor", meta: {type: 'home'}},
        { path: "policies_and_regulations/:id/:name", component: Policies_And_Regulations, name: "Policies_And_Regulations", meta: {type: 'home'} },
        { path: "map", component: Home, name: "map_index", meta: {type: 'home'},
          children:[
                { path: "", component: Map, name: "Map", meta: {type: 'home'} },
                { path: "org_message/:id", component: Org_Message, name: "Org_Message", meta: {type: 'home'} },
            ]
        },
        { path: "online_party_school", component: Online_Party_School_Index, name: "Online_Party_School_Index", meta: {type: 'home'},
            children:[
                { path: "", component: Online_Party_School, name: "Online_Party_School", meta: {type: 'home'} },
                { path: "detail/:id", component: Party_School_Detail, name: "Party_School_Detail", meta: {type: 'home'} },
                { path: "learn/:courseId/:periodId", component: Learn_Party_School, name: "Learn_Party_School", meta: {type: 'home'} },
            ]
        },
        { path: "news_list/:object", component: News_List, name: "News_List", meta: {type: 'home'} },
        { path: "detail/:id", component: News_Detail, name: "News_Detail", meta: {type: 'home'} },
        { path: "write_letters/:id/:name", component: Write_Letters, name: "Write_Letters", meta: {type: 'home'} },
        { path: "article_list/:keywords", component: Article_List, name: "Article_List", meta: {type: 'home'} },
        // { path: "org_message/:id", component: Org_Message, name: "Org_Message", meta: {type: 'home'} },
    ]
  },
  { 
    path: "/login", 
    component: Login,
    name: "login",
    meta: {
        showInNav: true,
        navName: "登录",
        type: 'login',
    },
  },
  { 
    path: "/register", 
    component: Register,
    name: "Register",
    meta: {
        showInNav: true,
        navName: "注册",
        type: 'register',
    },
  },
  {
      path: '/maintenance',
      component: MaintenanceSystemIndex,
      name: 'MaintenanceSystemIndex',
      meta: {
        showNav: false,
        navName: '维护系统',
        type: 'home',
      },
      children: [
        {path: "", name: "FeedbackPage", navName: '反馈', component: FeedbackPage, meta: { showNav: true }},
        {path: "instructions", name: "InstructionsPage", navName: '说明书', component: InstructionsPage, meta: { showNav: true }},
      ],
    },
];
// ---------------- 组织工作台 ---------------
const [ONLINECOURSE, TASKMANAGE, ORGANIZATION, VOTE, SETTINGS, 
  TALKING,THEME, DEVELOPPARTYMEMBERS, MEMBERSMANAGE, TESTING, ORGANIZATIONBUILDING,
  DEVELOPINGPARTYMEMBERS, PARTYFEEMANAGEMENT, LEARNINGEDUCATION, ORGANIZATIONLLIFE,
  PERSONNELADMINISTRATION, CLEANANDHONESTGOVERNMENT, THEMEACTIVITYPRACTICE, PROPAGANDACULTURE,
  COCONSTRUCTIONOFTHEPARTYANDTHEMASSES, POLLRESEARCH] = 
[
  {
    path: "/online_course_index",
    component: Online_Course_Index,
    iconFont: "el-icon-news",
    name: "Online_Course_Index",
    meta: { 
        menuId: "1_11",
        showInNav: true,
        navName: "网上党校",
        type: 'orgManage',
        authority:[1,2,3,4,5,6,7]
    },
    children:[
      {   path: "", aliasPath:"online_course_index", component: Online_Course_Index, name: "Online_Course_Index",
          meta: {
            id: "1_11_1",
            showInNav: true,
            navName: '党课列表', 
            type: 'orgManage',
            authority:[1,2,3,4,5,6,7]
          },
          children: [
            {
                path: "", aliasPath:"online_course_index", component: Online_Course, name: "Online_Course",
                meta: {
                    showInNav: true,
                    navName: '党课列表', 
                    type: 'orgManage',
                    authority:[1,2,3,4,5,6,7]
                },
            },
            {   path: "detail/:id", aliasPath:"online_course_index/detail/", component: Course_Detail, name: "Course_Detail" ,
                meta: {
                    showInNav: false,
                    navName: '党课详情', 
                    type: 'orgManage',
                }
            },
            {   path: "learn/:courseId/:periodId", aliasPath:"online_course_index/learn/", component: Learn_Course, name: "Learn_Course" ,
                meta: {
                    showInNav: false,
                    navName: '学习党课', 
                    type: 'orgManage',
                }
            },
          ],
      },
      {   path: "collection_course", component: Collection_Course, name: "Collection_Course" ,
          meta: {
              showInNav: false,
              navName: '党课收藏', 
              type: 'orgManage',
          } 
      },
      {
          path: "create_lecture", component: CreateLecture, name: "CreateLecture",
          meta: {
              id: "1_11_2",
              showInNav: true,
              navName: '课程管理', 
              type: 'orgManage',
              authority:[1,3,4,6,7]
          },
      },
    ]
  },
  {
    path: "/task_manage",
    component: Task_Manage,
    iconFont: "el-icon-tickets",
    name: "Task_Manage",
    meta: {
        menuId: "1_12",
        showInNav: true,
        navName: "任务管理",
        type: 'orgManage',
        id: '1',
        authority:[1,2,3,4,5,6,7],
    },
    children:[
        { path: "", aliasPath:"task_manage", component: Task_List, name: "Task_List",
            meta: {
                showInNav: true,
                navName: '任务列表',
                type: 'orgManage',
                id: '0',
                bubbleRequestUrl: 't_tasks/unfinish/count/', 
                bubbleParams: '',
                authority:[1,2,3,4,5,6,7],
            }
        },
        { path: "metting", component:Task_Meeting , name: "Task_Meeting",
            meta: {
                showInNav: true,
                navName: '会议列表',
                type: 'orgManage',
                id: '-1',
                bubbleRequestUrl: 'm_info/unaffi/count/', 
                bubbleParams: '',
                authority:[1,2,3,4,5,6,7],
            }
        },
        { path: "inform", component:Task_Inform , name: "Task_Inform",
            meta: {
                showInNav: true,
                navName: '通知列表',
                type: 'orgManage',
                id: '-2',
                bubbleRequestUrl: 'n_notice/unread/count/', 
                bubbleParams: '',
                authority:[1,2,3,4,5,6,7],
            }
        },
        
      ]
  },
  {
    path: "/organizational_structure",
    component: organizationIndex,
    iconFont: "fa fa-cubes",
    name: "organizationIndex",
    meta: {
        menuId: "1_1",
        showInNav: true,
        navName: "组织架构",
        type: 'orgManage',
        authority:[1,2,3,4,5,6,7],
    },
    children:[
      { path: "", aliasPath:"organizational_structure", component: PartyAdjust, name: "PartyAdjust" ,
          meta: {
              id: "1_1_1",
              showInNav: true,
              navName: '党组织架构调整',
              type: 'orgManage',
              authority:[1,2,3,4,5,6,7],
          }
      },
      { path: "partymembers_roster", component: ARosterOfPartyMembers, name: "ARosterOfPartyMembers" ,
          meta: { 
              showInNav: false,
              navName: '党员花名册',
              type: 'orgManage',
              authority:[1,2,3,4,5,6,7],
          }
      },
      // { path: "leader_list", component: LeaderList, name: "LeaderList" ,
      //     meta: {
      //         showInNav: true,
      //         navName: '领导班子调整',
      //         type: 'orgManage',
      //         authority:[1,2,4,5],
      //     }
      // },
      { path: "message/:id",  aliasPath: "message" ,component: Organization_Message, name: "Organization_Message" ,
          meta: {
              showInNav: false,
              navName: '党组织基本信息',
              type: 'orgManage',
          }
      },
      { path: "company", component: CompanyAdjust, name: "CompanyAdjust" ,
          meta: {
              id: "1_1_2",
              showInNav: true,
              navName: '公司行政组织架构',
              type: 'orgManage',
              authority:[1,2,3,4,5,6,7],
          }
      },
      { path: "detail/:id", component: PeopleDetail, name: "PeopleDetail" ,
          meta: {
              showInNav: false,
              navName: '人员详情',
              type: 'orgManage',
          }
      },
    ]
  },
  // {
  //   path: "/study",
  //   component: Study_Index,
  //   iconFont: "fa fa-book",
  //   name: "Study_Index",
  //   meta: {
  //       showInNav: true,
  //       navName: "学习教育管理",
  //       type: 'orgManage',
  //       authority:[1,2,3,4,5,6,7],
  //   },
  //   children:[
  //     { path: "", aliasPath:"study", component: Study , name: "Study",
  //         meta: {
  //             showInNav: true,
  //             navName: '学习教育管理',
  //             type: 'orgManage',
  //             authority:[1,2,3,4,5,6,7],
  //         }
  //     },
  //   ]
  // },
  {
    path: "/vote_index",
    component: Vote_Index,
    iconFont: "fa fa-chain-broken",
    name: "Vote_Index",
    meta: {
        showInNav: false,
        navName: "投票",
        type: 'orgManage',
    },
    children:[
        { path: "", aliasPath:"vote_index", component:Vote_Index, name: "Vote_Index",
            meta: {
                showInNav: true,
                navName: '投票活动列表',
                type: 'orgManage',
            },
            children:[
                { path: "", aliasPath:"vote_index", component:Activity_List, name: "Activity_List",
                    meta: {
                        showInNav: true,
                        navName: '投票活动列表',
                        type: 'orgManage',
                    },
                },
                { path: "detail/:id", aliasPath:"vote_index/detail", component:Activity_Detail, name: "Activity_Detail",
                    meta: {
                        showInNav: true,
                        navName: '投票详情',
                        type: 'orgManage',
                    },
                },
                { path: "vote/:id", aliasPath:"vote_index/vote", component:Vote, name: "Vote",
                    meta: {
                        showInNav: true,
                        navName: '投票',
                        type: 'orgManage',
                    },
                },
                

            ]
        },
        { path: "vote_list", component:Vote_Index, name: "Vote_Index",
            meta: {
                showInNav: true,
                navName: '选票列表',
                type: 'orgManage',
            },
            children:[
                { path: "", aliasPath:"vote_list", component:Vote_List, name: "Vote_List",
                    meta: {
                        showInNav: true,
                        navName: '选票列表',
                        type: 'orgManage',
                    },
                },
                { path: "create_vote/:id", aliasPath:"vote_list/create_vote", component:Create_Vote, name: "Create_Vote",
                    meta: {
                        showInNav: true,
                        navName: '创建选票',
                        type: 'orgManage',
                    }
                },
                { path: "vote_detail/:id", aliasPath:"vote_list/vote_detail", component: Vote_Detail, name: "Vote_Detail",
                    meta: {
                        showInNav: true,
                        navName: '选票详情',
                        type: 'orgManage',
                    }
                },
            ]
        },
    ]
  },
  {
    path: "/settings",
    component: Settings_Index,
    iconFont: "fa fa-cogs",
    name: "Settings_Index",
    meta: {
        menuId: '1_17',
        showInNav: true,
        navName: "系统设置",
        type: 'orgManage',
        authority:[1,3,4,6,7],
    },
    children:[
        { path: "", aliasPath:"settings", component:Settings_Home, name: "Settings_Home",
            meta: {
                id: '1_17_1',
                showInNav: true,
                navName: '党委首页管理',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
        { path: "upload_article", component: Settings_Upload_Article, name: "Settings_Upload_Article",
            meta: {
                id: '1_17_2',
                showInNav: true,
                navName: '文章发布',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
        { path: "edit_article/:id", component: Settings_Edit_Article, name: "Settings_Edit_Article",
            meta: { 
                showInNav: false,
                navName: '文章发布',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
        { path: "new_article", component: Settings_New_Article, name: "Settings_New_Article",
            meta: {
                id: '1_17_3',
                showInNav: true,
                navName: '文章审批',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
        { path: "new_comment", component: Settings_New_Comment, name: "Settings_New_Comment",
            meta: {
                id: '1_17_4',
                showInNav: true,
                navName: '评论审批',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
        { path: "new_error", component:Settings_New_Error, name: "Settings_New_Error",
            meta: {
                id: '1_17_5',
                showInNav: true,
                navName: '报错审批',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
        { path: "new_special", component:Settings_New_Special, name: "Settings_New_Special",
            meta: {
                id: '1_17_6',
                showInNav: true,
                navName: '文章专题管理',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
        { path: "new_type", component:Settings_New_Type, name: "Settings_New_Type",
            meta: {
                id: '1_17_7',
                showInNav: true,
                navName: '文章分类管理',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
        { path: "study_sepcial", component:Settings_Study_Special, name: "Settings_Study_Special",
            meta: {
                showInNav: false,
                navName: '学习专题管理',
                type: 'orgManage',
            }
        },
        { path: "article_delete", component:Settings_Article_Delete, name: "Settings_Article_Delete",
            meta: {
                id: '1_17_8',
                showInNav: true,
                navName: '文章删除',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
        { path: "article_detail/:id/:routername", component:Settings_Article_Detail, name: "Settings_Article_Detail",
            meta: {
                showInNav: false,
                navName: '文章详情',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
    ]
  },
  {
    path: "/talking",
    component: Talking_Index,
    iconFont: "fa fa-comments",
    name: "Talking_Index",
    meta: {
        menuId: '1_13',
        showInNav: true,
        navName: "谈心谈话",
        type: 'orgManage',
        authority:[1,2,3,4,5,6,7],
    },
    children:[
        { path: "", aliasPath:"talking", component: Talking_Talking , name: "Talking_Talking",
            meta: {
                id: '1_13_1',
                showInNav: true,
                navName: '谈心谈话列表',
                type: 'orgManage',
                authority:[1,2,3,4,5,6,7],
            }
        },
        { path: "detail/:id", aliasPath:"talking/detail", component: Talking_Detail , name: "Talking_Detail",
            meta: {
                showInNav: false,
                navName: '谈心谈话详情',
                type: 'orgManage',
            }
        },
    ]
  },
  {
    path: "/theme",
    component: Theme_Index,
    iconFont: "fa fa-object-ungroup",
    name: "Theme_Index",
    meta: {
        showInNav: false,
        navName: "主题活动",
        type: 'orgManage',
    },
    children:[
      { path: "", aliasPath:"theme", component: Theme_Theme , name: "Theme_Theme",
          meta: {
              showInNav: true,
              navName: '主题活动',
              type: 'orgManage',
          }
      },
      { path: "detail/:id", aliasPath:"theme/detail", component: Theme_Detail , name: "Theme_Detail",
          meta: {
              showInNav: false,
              navName: '主题活动详情',
              type: 'orgManage',
          }
      },
    ]
  },
  {
    path: "/develop_party_members",
    component: Develop_Party_Members_Index,
    iconFont: "fa fa-indent",
    name: "Develop_Party_Members_Index",
    meta: {
        showInNav: false,
        navName: "党员发展",
        type: 'orgManage',
    },
    children:[
        { path: "", aliasPath:"develop_party_members", component: roster_of_development_Index , name: "roster_of_development_Index",
            meta: {
                showInNav: true,
                navName: '发展名册',
                type: 'orgManage',
            },
        },
    ]
  },
  {
    path: "/members_manage",
    component: Payment_Index,
    iconFont: "fa fa-users",
    name: "Payment_Index",
    meta: {
        showInNav: false,
        navName: "党员管理",
        type: 'orgManage',
    },
    children:[
        { path: "", aliasPath:"members_manage", component: Payment_Payment , name: "Payment_Payment",
            meta: {
                showInNav: false,
                navName: '党费缴纳',
                type: 'orgManage',
            }
        },
    ]
  },
  {
    path: "/testing",
    component: Testing_Index,
    iconFont: "fa fa-book",
    name: "Testing_Index",
    meta: {
        menuId: '1_14',
        showInNav: true,
        navName: "在线考试",
        type: 'orgManage',
        authority:[1,2,3,4,5,6,7],
    },
    children:[
        { path: "",aliasPath:"testing", component: Testing_List , name: "Testing_List",
            meta: {
                id: '1_14_1',
                showInNav: true,
                navName: '考试列表',
                type: 'orgManage',
                authority:[1,2,3,4,5,6,7],
            }
        },
        { path: "point", component: Knowledge_Point , name: "Knowledge_Point",
            meta: {
                id: '1_14_2',
                showInNav: true,
                navName: '知识点管理',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
        { path: "library", component: Question_Library , name: "Question_Library",
            meta: {
                id: '1_14_3',
                showInNav: true,
                navName: '题库',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
        { path: "question_detail/:id", aliasPath:"testing/question_detail", component: Question_Detail , name: "Question_Detail",
            meta: { 
                showInNav: false,
                navName: '题目详情',
                type: 'orgManage',
            }
        },
        { path: "create_exam_paper", component: Create_Exam_Paper , name: "Create_Exam_Paper",
            meta: {
                id: '1_14_4',
                showInNav: true,
                navName: '智能组题',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
        { path: "exam_paper_list", component: Exam_Paper_List , name: "Exam_Paper_List",
            meta: {
                id: '1_14_5',
                showInNav: true,
                navName: '试卷列表',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
        { path: "auto_paper_detail/:id", aliasPath:"testing/auto_paper_detail", component: Auto_Paper_Detail , name: "Auto_Paper_Detail",
            meta: {
                showInNav: false,
                navName: '智能组题详情',
                type: 'orgManage',
            }
        },
        { path: "manual_paper_detail/:id", aliasPath:"testing/manual_paper_detail", component: Manual_Paper_Detail , name: "Manual_Paper_Detail",
            meta: {
                showInNav: false,
                navName: '手动出题详情',
                type: 'orgManage',
            }
        },
        { path: "question_basket", component: Question_Basket , name: "Question_Basket",
            meta: {
                id: '1_14_6',
                showInNav: true,
                navName: '试题篮',
                type: 'orgManage',
                authority:[1,3,4,6,7],
            }
        },
        { path: "testing_detail/:id", component: Testing_Detail , name: "Testing_Detail",
            meta: {
                showInNav: false,
                navName: '考试详情',
                type: 'orgManage',
            }
        },
        { path: "check_answer/:id", component: Check_Answer , name: "Check_Answer",
            meta: {
                showInNav: false,
                navName: '查看答卷',
                type: 'orgManage',
            }
        },
    ]
  },
  {
    path: "/organizational_building",
    component: OrganizationalBuilding,
    iconFont: "fa fa-id-card-o",
    name: "Talking_Index",
    meta: { 
        menuId: '1_2',
        showInNav: true,
        navName: "规划总结",
        type: 'orgManage',
        id: '14',
        subMenu: [{"id":27,"name":"党员代表管理"},{"id":35,"name":"党代表活动记录"},{"id":36,"name":"“双联”工作记录"},{"id":37,"name":"公司“四好班子”规划、总结"},{"id":39,"name":"“五好”党支部规划、总结"},{"id":68,"name":"工作计划"}],
        authority:[1,2,3,4,5,6,7],
    },
    children:[
      { path: "list_of_party_representatives", component: ListOfPartyRepresentatives , name: "list_of_party_representatives",
        meta: {
            id: "1_2_1",
            showInNav: true,
            navName: '党代表名单',
            type: 'orgManage',
            authority:[1,2,3,4,5,6,7],
        },
      },
    ]
  },
  {
    path: "/developing_party_members",
    component: DevelopingPartyMembers,
    iconFont: "fa fa-grav",
    name: "Talking_Index",
    meta: {
        menuId: '1_15',
        showInNav: true,
        navName: "发展党员",
        type: 'orgManage',
        id: '4',
        subMenu: [{"id":10,"name":"入党申请"},{"id":11,"name":"转预备党员申请"},{"id":12,"name":"转正式党员申请"},{"id":22,"name":"党员思想汇报流程"},{"id":23,"name":"党员考察流程"}],
        authority:[1,2,3,4,5,6,7],
    },
    children:[
      { path: "roster_of_development", component: roster_of_development_Index , name: "roster_of_development_Index",
        meta: {
            id: '1_15_1',
            showInNav: true,
            navName: '发展名册',
            type: 'orgManage',
            authority:[1,2,3,4,5,6,7],
        },
      },
    ]
  },
  {
      path: "/party_fee_management",
      component: PartyFeeManagement,
      iconFont: "fa fa-money",
      name: "Talking_Index",
      meta: { 
          menuId: '1_3',
          showInNav: true,
          navName: "党费缴纳",
          type: 'orgManage',
          id: '10',
          subMenu: [{"id":18,"name":"党委党费缴纳"},{"id":19,"name":"支部党费缴纳"},{"id":20,"name":"党小组党费缴纳任务"},{"id":21,"name":"党员党费缴纳任务"},{"id":25,"name":"党费缴纳核定"}],
          authority:[1,2,3,4,5,6,7],
      },
      children:[
        { path: "details_of_party_payment", component: Payment_Payment , name: "details_of_party_payment",
            meta: {
                id: "1_3_1",
                showInNav: true,
                navName: '党费缴纳详情',
                type: 'orgManage',
                authority:[1,2,3,4,5,6,7],
            }
        },
      ]
  },
  {
      path: "/learning_education",
      component: LearningEducation,
      iconFont: "fa fa-bitbucket-square",
      name: "Talking_Index",
      meta: { 
          menuId: '1_4',
          showInNav: true,
          navName: "学习教育",
          type: 'orgManage',
          id: '6',
          subMenu: [{"id":28,"name":"党委中心组学习"},{"id":41,"name":"党支部学习"},{"id":43,"name":"党委中心组成员学习总结或调研报告"},{"id":44,"name":"党课"},{"id":45,"name":"形势任务教育"}],
          authority:[1,2,3,4,5,6,7],
      },
      children:[]
  },
  {
      path: "/organizational_life",
      component: OrganizationalLife,
      iconFont: "fa fa-life-saver",
      name: "Talking_Index",
      meta: { 
          menuId: '1_5',
          showInNav: true,
          navName: "组织生活",
          type: 'orgManage',
          id: '15',
          subMenu: [{"id":29,"name":"党委领导班子民主生活会"},{"id":46,"name":"党支部专题组织生活会"},{"id":70,"name":"党支部委员会议"},{"id":71,"name":"党小组会议"},{"id":72,"name":"谈心谈话（党委层面、支部层面）"},{"id":73,"name":"党员个人思想总结"},{"id":74,"name":"党员思想分析"},{"id":75,"name":"党员大会"},{"id":76,"name":"民主评议党员"}],
          authority:[1,2,3,4,5,6,7],
      },
      children:[]
  },
  {
      path: "/personnel_administration",
      component: PersonnelAdministration,
      iconFont: "fa fa-object-group",
      name: "Talking_Index",
      meta: { 
          menuId: '1_6',
          showInNav: true,
          navName: "干部管理",
          type: 'orgManage',
          id: '16',
          subMenu: [{"id":30,"name":"干部名册管理"},{"id":47,"name":"党委后备干部名册"},{"id":48,"name":"党委履职巡察工作记录"},{"id":49,"name":"干部考察工作记录"},{"id":50,"name":"干部任免工作记录"},{"id":51,"name":"干部奖惩工作记录"}],
          authority:[1,2,3,4,5,6,7],
      },
      children:[
        { path: "roster_of_cadras", component: RosterOfCadras , name: "RosterOfCadras",
            meta: {
                id: "1_6_1",
                showInNav: true,
                navName: '干部名册',
                type: 'orgManage',
                authority:[1,2,3,4,5,6,7],
            }
        },
      ]
  },
  {
      path: "/clean_and_honest_government",
      component: CleanAndHonestGovernment,
      iconFont: "fa fa-paper-plane",
      name: "Talking_Index",
      meta: { 
          menuId: '1_7',
          showInNav: true,
          navName: "党风廉政",
          type: 'orgManage',
          id: '17',
          subMenu: [
            {"id":31,"name":"纪委廉洁从业警示教育活动规划"},
            {"id":52,"name":"党风廉政建设责任制落实工作总结"},
            {"id":53,"name":"党风廉政建设责任书管理记录"},
            {"id":54,"name":"纪委廉洁从业警示教育活动总结"},
            {"id":55,"name":"领导干部年度述职述廉报告"},
            {"id":56,"name":"党风廉政建设谈话记录表"},
            {"id":57,"name":"案件调查处理工作记录"},
            {"id":58,"name":"礼金礼品上交工作记录"},
            {"id":89,"name":"党委落实“两个责任”工作规划"},
            {"id":90,"name":"党委落实“两个责任”工作总结"},
            {"id":91,"name":"领导干部廉政情况登记表"},
            {"id":92,"name":"领导干部党风廉政建设综述记录"},
            {"id":93,"name":"领导干部考察期廉洁从业鉴定意见"},
            {"id":94,"name":"领导干部任前廉洁从业培训记录"},
            {"id":95,"name":"领导干部任前廉洁从业谈话记录"},
            {"id":96,"name":"领导干部任前廉洁从业承诺书记录"},
            {"id":97,"name":"领导干部试用期满廉洁从业书面报告"},
          ],
          authority:[1,3,4,6,7],
      },
      children:[]
  },
  {
      path: "/theme_activity_practice",
      component: ThemeActivityPractice,
      iconFont: "fa fa-recycle",
      name: "Talking_Index",
      meta: {
          menuId: '1_16',
          showInNav: true,
          navName: "主题实践活动",
          type: 'orgManage',
          id:'3',
          subMenu:[{"id":16,"name":"主题活动"},{"id":67,"name":"“创先争优”记录"}],
          authority:[1,3,4,6,7],
      },
      children:[]
  },
  {
      path: "/propaganda_culture",
      component: PropagandaCulture,
      iconFont: "fa fa-user-secret",
      name: "Talking_Index",
      meta: { 
          menuId: '1_8',
          showInNav: true,
          navName: "宣传文化",
          type: 'orgManage',
          id: '18',
          subMenu: [{"id":32,"name":"员工思想分析"},{"id":59,"name":"通讯员名册"},{"id":60,"name":"对内报道"},{"id":61,"name":"对外报道"},{"id":62,"name":"信息报送"},{"id":63,"name":"政研论文"},{"id":64,"name":"大事记要"},{"id":65,"name":"史志年鉴"},{"id":66,"name":"EAP活动"}],
          authority:[1,3,4,6,7],
      },
      children:[]
  },
  {
      path: "/co_construction_of_the_party_and_the_masses",
      component: CoConstructionOfThePartyAndTheMasses,
      iconFont: "fa fa-window-restore",
      name: "Talking_Index",
      meta: { 
          menuId: '1_9',
          showInNav: true,
          navName: "党群共建",
          type: 'orgManage',
          id: '19',
          subMenu: [{"id":33,"name":"党建带工建"},{"id":69,"name":"党建带团建"}],
          authority:[1,3,4,6,7],
      },
      children:[]
  },
  {
      path: "/poll_research",
      component: PollResearch,
      iconFont: "fa fa-pie-chart",
      name: "Talking_Index",
      meta: { 
          menuId: '1_10',
          showInNav: true,
          navName: "投票调研",
          type: 'orgManage',
          id: '7',
          subMenu: [{"id":13,"name":"投票流程"}],
          authority:[1,2,3,4,5,6,7],
      },
      children:[
        { path: "activity_list", component:Vote_Index, name: "Vote_Index",
            meta: {
                id: "1_10_1",
                showInNav: true,
                navName: '投票活动列表',
                type: 'orgManage',
                authority:[1,2,3,4,5,6,7],
            },
            children:[
                { path: "", aliasPath:"/poll_research/activity_list", component:Activity_List, name: "Activity_List",
                    meta: {
                        showInNav: true,
                        navName: '投票活动列表',
                        type: 'orgManage',
                        authority:[1,3,4,6,7],
                    },
                },
                { path: "detail/:id", aliasPath:"poll_research/detail", component:Activity_Detail, name: "Activity_Detail",
                    meta: {
                        showInNav: true,
                        navName: '投票详情',
                        type: 'orgManage',
                    },
                },
                { path: "vote/:id", aliasPath:"poll_research/govote", component:Vote, name: "Vote",
                    meta: {
                        showInNav: true,
                        navName: '投票',
                        type: 'orgManage',
                    },
                },
                

            ]
        },
        { path: "vote_list", component:Vote_Index, name: "Vote_Index",
            meta: {
              id: "1_10_2",
              showInNav: true,
              navName: '选票列表',
              type: 'orgManage',
              authority:[1,2,3,4,5,6,7],
            },
            children:[
                { path: "", aliasPath:"/poll_research/vote_list", component:Vote_List, name: "Vote_List",
                    meta: {
                        showInNav: true,
                        navName: '选票列表',
                        type: 'orgManage',
                    },
                },
                { path: "create_vote/:id", aliasPath:"/poll_research/create_vote", component:Create_Vote, name: "Create_Vote",
                    meta: {
                        showInNav: true,
                        navName: '创建选票',
                        type: 'orgManage',
                    }
                },
                { path: "vote_detail/:id", aliasPath:"/poll_research/vote_detail", component: Vote_Detail, name: "Vote_Detail",
                    meta: {
                        showInNav: true,
                        navName: '选票详情',
                        type: 'orgManage',
                    }
                },
            ]
        },
    ]
  },
];
// ---------- 个人工作台 -------------
// 我的签到，我的组织, 我的信息, 我的通知, 我的任务, 我的会议, 谈心谈话, 我的收藏, 我的考试, 投票调研, 组织生活,我的积分,我的信箱
const [PERSONALCALENDAR, PERSONALORGINDEX, PERSONALMESSAGE, PERSONALINFORM, PERSONALTASK, PERSONALMEETING, 
      PERSONALTALKING, PERSONALSTUDY, PERSONALTEST, 
      PERSONALVOTE, PERSONALORGLIFE, PERSONALMAILBOX, PERSONALINTEGRAL, PERSONALMANAGE, ] = 
[
  { path: "/mycalendar", 
    component: Personal_Manage, 
    iconFont: "fa fa-calendar-check-o",
    name: "Calendar",
    meta: {
      showInNav: true,
      navName: '我的签到',
      type: 'personalManage',
    },
    children: [
      {
        path: "", 
        component: Calendar, 
        name: "Calendar",
        meta: {
          showInNav: true,
          navName: '我的签到',
          type: 'personalManage',
        },
      }
    ],
  },
  { path: "/my_org_index", 
    component: My_Org_Index, 
    iconFont: "fa fa-users",
    name: "My_Org_Index",
    meta: {
      showInNav: true,
      navName: '我的组织',
      type: 'personalManage',
    },
    children: [
      {
        path: "", 
        component: My_Business, 
        name: "My_Business",
        meta: {
          showInNav: true,
          navName: '我的企业',
          type: 'personalManage',
        },
      },
      {
        path: "my_party_organization", 
        component: My_Party_Organization, 
        name: "my_party_organization",
        meta: {
          showInNav: true,
          navName: '我的党组织',
          type: 'personalManage',
        },
      },
      {
        path: "my_trade_union_organization", 
        component: My_Trade_Union_Organization, 
        name: "my_trade_union_organization",
        meta: {
          showInNav: true,
          navName: '我的工会组织',
          type: 'personalManage',
        },
      },
      {
        path: "my_regiment_organization", 
        component: My_Regiment_Organization, 
        name: "my_regiment_organization",
        meta: {
          showInNav: true,
          navName: '我的团组织',
          type: 'personalManage',
        },
      },
      { path: "detail/:id", component: PeopleDetail, name: "MyPeopleDetail" ,
          meta: {
              showInNav: false,
              navName: '人员详情',
              type: 'personalManage',
          }
      },
    ],
  },
  { path: "/mymessage", 
    component: Personal_Manage, 
    name: "Personal_Message",
    iconFont: "fa fa-info-circle",
    meta: {
        showInNav: true,
        navName: '我的信息',
        type: 'personalManage',
    },
    children: [
      { path: "", component: Personal_Message, name: "Personal_Message",
          meta: {
              showInNav: true,
              navName: '我的信息',
              type: 'personalManage',
          }
      },
      { path: "experience", component: Experience, name: "Experience",
          meta: {
              showInNav: true,
              navName: '经历性',
              type: 'personalManage',
          }
      },
      { path: "archiveses", component: Archiveses, name: "Archiveses",
          meta: {
              showInNav: true,
              navName: '获得性',
              type: 'personalManage',
          }
      },
    ]
  },
  { path: "/myinform", 
    component:Personal_inform , 
    name: "Personal_inform",
    iconFont: "fa fa-bullhorn",
    meta: {
        showInNav: true,
        navName: '我的通知',
        type: 'personalManage',
        id: '-2',
        bubbleRequestUrl: 'n_notice/unread/count', 
        bubbleParams: '',
    },
    children: [
      { path: "", component:Personal_inform , name: "Personal_inform",
          meta: {
              showInNav: true,
              navName: '我的通知',
              id: '-2',
              type: 'personalManage',
              bubbleRequestUrl: 'n_notice/unread/count', 
              bubbleParams: '',
          }
      },
    ]
  },
  { path: "/my_task", 
    component:Personal_Task , 
    name: "Personal_Task",
    iconFont: "el-icon-tickets",
    meta: {
      showInNav: true,
      navName: '我的任务',
      type: 'personalManage',
      id: '0',
      bubbleRequestUrl: 't_tasks/unfinish/count', 
      bubbleParams: '',
    },
    children:[
      { path: "", 
        component:Personal_Task , 
        name: "Personal_Task",
        iconFont: "fa fa-life-ring",
        meta: {
          showInNav: true,
          navName: '我的任务',
          id: '0',
          type: 'personalManage',
          bubbleRequestUrl: 't_tasks/unfinish/count', 
          bubbleParams: '',
        }
      },
    ]
  },
  { path: "/mymeeting", 
    component: Personal_Meeting, 
    name: "Personal_Meeting",
    iconFont: "fa fa-user-secret",
    meta: {
      showInNav: true,
      navName: '我的会议',
      id: '-1',
      type: 'personalManage',
      bubbleRequestUrl: 'm_info/unaffi/count', 
      bubbleParams: '',
    },
    children:[
      { path: "", 
        component: Personal_Meeting, 
        name: "Personal_Meeting",
        iconFont: "fa fa-life-ring",
        meta: {
          showInNav: true,
          navName: '我的会议',
          id: '-1',
          type: 'personalManage',
          bubbleRequestUrl: 'm_info/unaffi/count', 
          bubbleParams: '',
        }
      },
    ]
  },
  {
    path: "/mytalking",
    component: My_Talking_Index,
    iconFont: "fa fa-comments",
    name: "Talking_Index",
    meta: {
        showInNav: true,
        navName: "谈心谈话",
        type: 'personalManage',
        authority:[1,2,3,4,5,6,7],
    },
    children:[
        { path: "", aliasPath:"mytalking", component: My_Talking_Talking , name: "My_Talking_Talking",
            meta: {
                showInNav: true,
                navName: '谈心谈话列表',
                type: 'personalManage',
                authority:[1,2,3,4,5,6,7],
            }
        },
        { path: "detail/:id", aliasPath:"mytalking/detail", component: My_Talking_Detail , name: "My_Talking_Detail",
            meta: {
                showInNav: false,
                navName: '谈心谈话详情',
                type: 'personalManage',
            }
        },
    ]
  },
  { path: "/mystudy", 
    component: Personal_Collection_Index, 
    name: "Personal_Collection_Index",
    iconFont: "fa fa-book",
    meta: {
        showInNav: true,
        navName: '我的收藏',
        type: 'personalManage',
        subType: "collection",
    },
    children: [
        { path: "", component: Personal_Collection_Article, name: "Personal_Collection_Article",
            meta: {
                showInNav: true,
                navName: '文章',
                type: 'personalManage',
            }
        },
        { path: "party_lecture", component: Personal_Collection_Party_Lecture, name: "Personal_Collection_Party_Lecture",
            meta: {
                showInNav: true,
                navName: '网上党课',
                type: 'personalManage',
            }
        },
    ]
  },
  {
    path: "/my_test",
    component: My_Testing_Index,
    iconFont: "fa fa-chain",
    name: "My_Testing_Index",
    meta: {
        showInNav: true,
        navName: "我的考试",
        type: 'personalManage',
    },
    children:[
        {   
            path: "",
            component: My_Testing_List,
            name: "My_Testing_List",
            meta: {
                showInNav: true,
                navName: '考试列表',
                type: 'personalManage',
            },
        },
        {   
            path: "start/:id",
            component: Start_Testing,
            name: "Start_Testing",
            meta: {
                showInNav: false,
                navName: '开始考试',
                type: 'login',
            },
        },
        {   
            path: "detail/:id",
            component: My_Testing_Detail,
            name: "My_Testing_Detail",
            meta: {
                showInNav: false,
                navName: '我的考试详情',
                type: 'personalManage',
            },
        },
        {   
            path: "check_answer/:id",
            component: Check_Answer,
            name: "My_Check_Answer",
            meta: {
                showInNav: false,
                navName: '我的考试详情',
                type: 'personalManage',
            },
        },
        { 
            path: "auto_paper_detail/:id", 
            component: Auto_Paper_Detail , 
            name: "My_Auto_Paper_Detail",
            meta: {
                showInNav: false,
                navName: '智能组题详情',
                type: 'personalManage',
            }
        },
        { 
            path: "manual_paper_detail/:id", 
            component: Manual_Paper_Detail ,
            name: "My_Manual_Paper_Detail",
            meta: {
                showInNav: false,
                navName: '手动出题详情',
                type: 'personalManage',
            }
        },
        { path: "question_detail/:id", component: Question_Detail , name: "My_Question_Detail",
            meta: {
                showInNav: false,
                navName: '题目详情',
                type: 'personalManage',
            }
        },
    ],
  },
  {
    path: "/my_vote_index",
    component: Personal_Vote_Index,
    iconFont: "fa fa-chain-broken",
    name: "Personal_Vote_Index",
    meta: {
        showInNav: true,
        navName: "投票调研",
        type: 'personalManage',
    },
    children:[
      {   
          path: "", 
          component:Personal_Vote_Index,
          iconFont: "fa fa-chain-broken", 
          name: "Personal_Vote_Index",
          meta: {
            showInNav: true,
            navName: '投票活动列表',
            type: 'personalManage',
          },
          children:[
            { path: "", component: Personal_Activity_List, name: "Personal_Activity_List",
                meta: {
                    showInNav: true,
                    navName: '活动列表',
                    type: 'personalManage',
                },
            },
            { path: "detail/:id", component: Personal_Activity_Detail, name: "Personal_Activity_Detail",
                meta: {
                    showInNav: true,
                    navName: '投票详情',
                    type: 'personalManage',
                },
            },
            { path: "vote/:id", component:Personal_Vote, name: "Personal_Vote",
                meta: {
                    showInNav: true,
                    navName: '投票',
                    type: 'personalManage',
                },
            },
          ]
      },
    ],
  },
  {
    path: "/my_org_Life",
    component: Orgnizational_Life_Index,
    iconFont: "fa fa-life-ring",
    name: "Orgnizational_Life_Index",
    meta: {
        showInNav: true,
        navName: "组织生活",
        type: 'personalManage',
    },
    children:[
        // { path: "", component: Orgnizational_Life , name: "Orgnizational_Life",
        //     meta: {
        //         showInNav: false,
        //         navName: '组织生活',
        //         type: 'personalManage',
        //     }
        // },
        { path: "", component: ApplyForPartyMembership , name: "ApplyForPartyMembership",
            meta: {
                showInNav: true,
                navName: '申请入党',
                type: 'personalManage',
            }
        },
        { path: "ApplicationForCorrection", component: ApplicationForCorrection , name: "ApplicationForCorrection",
            meta: {
                showInNav: true,
                navName: '转正申请',
                type: 'personalManage',
            }
        },
        { path: "partyMember_register", component: PartyMember_Register, name: "PartyMember_Register",
            meta: {
                showInNav: true,
                navName: '党员档案',
                type: 'personalManage',
            },
        },
        { path: "MyPlan", component: MyPlan , name: "MyPlan",
            meta: {
                showInNav: true,
                navName: '我的规划',
                type: 'personalManage',
            }
        },
        { path: "MySummary", component: MySummary , name: "MySummary",
            meta: {
                showInNav: true,
                navName: '我的总结',
                type: 'personalManage',
            }
        },
        { path: "MyReport", component: MyReport , name: "MyReport",
            meta: {
                showInNav: true,
                navName: '我的报告',
                type: 'personalManage',
            }
        },
        { path: "MySuggestion", component: MySuggestion , name: "MySuggestion",
            meta: {
                showInNav: true,
                navName: '我的建议',
                type: 'personalManage',
            }
        },
        { path: "MyLeave", component: MyLeave , name: "MyLeave",
            meta: {
                showInNav: true,
                navName: '我的请假',
                type: 'personalManage',
            }
        },
    ]
  },
  { path: "/mymailbox", 
    component: Personal_Manage, 
    name: "Personal_Manage",
    iconFont: "fa fa-envelope-o",
    meta: {
        showInNav: true,
        navName: '我的信箱',
        type: 'personalManage',
    },
    children: [
        { path: "", component: Personal_Mailbox, name: "Personal_Mailbox",
            meta: {
                showInNav: true,
                navName: '我的信箱',
                type: 'personalManage',
            }
        },
        { path: "detail/:id", component: Personal_Mailbox_Detail, name: "Personal_Mailbox_Detail",
            meta: {
                showInNav: false,
                navName: '详情',
                type: 'personalManage',
            }
        },
    ]
  },
  { path: "/myintegral", 
    component: Personal_Integral, 
    name: "Personal_Integral",
    iconFont: "fa fa-eur",
    meta: {
        showInNav: true,
        navName: '我的积分',
        type: 'personalManage',
    },
    children: [
      { path: "", 
        component: Personal_Integral, 
        name: "Personal_Integral",
          meta: {
              showInNav: true,
              navName: '我的积分',
              type: 'personalManage',
          }
      },
    ]
  },
  {
    path: "/personal_manage",
    component: Personal_Manage,
    iconFont: "el-icon-printer",
    name: "Personal_Manage",
    meta: {
        showInNav: false,
        navName: "个人管理",
        type: 'personalManage',
    },
    children:[
      { path: "authority", component: Personal_Authority, name: "Personal_Authority",
          meta: {
              showInNav: false,
              navName: '我的权限',
              type: 'personalManage',
          }
      },
      { path: "notice", component: Personal_Notice, name: "Personal_Notice",
          meta: {
              showInNav: true,
              navName: '我的提醒',
              type: 'personalManage',
              bubbleRequestUrl: 'm_info/unaffi/count', 
              bubbleParams: '',
          }
      },
      
      
    ]
  },
]


/* 路由配置 */
let router = new Router({
  routes: [
    { path: "/", redirect: "/home" }, 
    HOME, LOGIN, REGISTER, INSTRCTIONS,
    // -------- 个人工作台 ------------------
    PERSONALCALENDAR, PERSONALORGINDEX, PERSONALMESSAGE, PERSONALINFORM, PERSONALTASK, PERSONALMEETING, PERSONALTALKING, PERSONALSTUDY, PERSONALTEST, 
    PERSONALVOTE, PERSONALORGLIFE, PERSONALMAILBOX, PERSONALINTEGRAL, PERSONALMANAGE,
    // -------------- 组织工作台 --------------
    ORGANIZATION,ORGANIZATIONBUILDING, DEVELOPPARTYMEMBERS, PARTYFEEMANAGEMENT, LEARNINGEDUCATION, ORGANIZATIONLLIFE, PERSONNELADMINISTRATION,
    CLEANANDHONESTGOVERNMENT, PROPAGANDACULTURE, COCONSTRUCTIONOFTHEPARTYANDTHEMASSES, POLLRESEARCH,
    ONLINECOURSE, TASKMANAGE, VOTE,  
    TALKING, THEME,MEMBERSMANAGE, TESTING, 
    DEVELOPINGPARTYMEMBERS, 
    THEMEACTIVITYPRACTICE, 
    SETTINGS
  ],
  linkActiveClass: "active"
});

export default router;