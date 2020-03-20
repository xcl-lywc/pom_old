//为页面添加登录DIV
// $(".mainContent").prepend('<div class="login-window">'+
//         '<div class="top-block">'+
//             '<i class="nx-icon close-icon-white js-close-check"></i>'+
//             '<div class="now-time">'+
//                 '<span class="time-clock"></span>'+
//             '</div>'+
//             '<div class="now-date"><span></span></div>'+
//             '<div class="now-week"><span></span></div>'+
//         '</div>'+
//         '<div class="bottom-block">'+
//             '<span class="login-time">09:00 - 17:30</span>'+
//             '<div class="login-div">'+
//                 '<div class="has-logged">'+
//                     '<span>已签到 09:00 AM</span>'+
//                 '</div>'+
//                 '<div class="need-login">'+
//                     '<button class="btn btn-primary brn-lg btn-block js-check-btn">签到</button>'+
//                 '</div>'+
//             '</div>'+
//         '</div>'+
//    '</div>')
// $("body").prepend('<div class="login-window-folded">'+
//         '<span class="js-extend"></span>'+
//    '</div>')
var checkStatus = false;
var loginTime;
var logoutTime;
var repStatus = false;
var isClose = false;  // 用户点击关闭按钮 true点击了关闭 false没有点击
var checkOnce = true;
var nowTime;
var nowDate;
var nowWeek;
var gotIP = null;
//初始化时间信息
function initDate () {
    var dateObj = new Date();
    nowTime = dateObj.Format("hh:mm");
    nowDate = dateObj.Format("yyyy-MM-dd");
    switch(dateObj.getDay()) {
        case 0:
            nowWeek = "星期日";
            break;
        case 1:
            nowWeek = "星期一";
            break;
        case 2:
            nowWeek = "星期二";
            break;
        case 3:
            nowWeek = "星期三";
            break;
        case 4:
            nowWeek = "星期四";
            break;
        case 5:
            nowWeek = "星期五";
            break;
        case 6:
            nowWeek = "星期六";
            break;
        default:
            nowWeek = "获取数据失败";
            break;
    }
    //设置当前时间信息
    $(".time-clock").html(nowTime)
    $(".now-date span").html(nowDate)
    $(".now-week span").html(nowWeek)
};

//查询当前的签到状态,查看是否已签 true可以签到 false无法签到
var checkStatusObj;
function getCheckStatus () {
    $.ajax({
        type: "GET",
        url: basePath + "/home/userhome/signstatus",
        async: false,
        success: function(response) {
            if(response.meta.code === 1){
                checkStatusObj = response.data;
                //以获取登签到状态, 可能存在获取失败或者没有权限
                if(checkStatusObj) { //非空
                    checkStatus = response.data.signStatu;
                    repStatus = response.data.repStatus;
                    // -------- 处理时间,时间初始查询一次
                    loginTime = response.data.autoBeginTime.split(":")
                    loginTime.pop()
                    loginTime = loginTime.join(":")
                    logoutTime = response.data.autoEndTime.split(":")
                    logoutTime.pop()
                    logoutTime = logoutTime.join(":")
                    $(".login-time").html(loginTime + " - "+ logoutTime)
                    if(checkStatus === "false") { 
                        showCheckDiv();
                    }
                }
            }else{
                commonFunction.showText(response.meta.message, true)
            }
        },
        error: function (error) {
            commonFunction.showText("获取签到信息失败", true)
        }
    })
};
//登录状态验证, 同时保存当前用户登录的部分信息
function checkLoginStatus () {
    $.ajax({
        type: "GET",
        url: basePath + "/me",
        success: function(response) {
            if(response.meta.code === 1) {
                $(".js-username-nav").html(response.data.userName);
                //保存至本地存储
                localStorage.setItem("myAccount", response.data.account);
                localStorage.setItem("myName",    response.data.userName);
                localStorage.setItem("myOrg",     response.data.orgName);

            } else {
                $(".js-username-nav").html("登录信息错误");
                commonFunction.showText("登陆状态异常, 正在返回登录页...");
                setTimeout(function () {
                    window.location.href = "../login.html";
                }, 2000)
            }
        },
        error: function () {
            $(".js-username-nav").html("登录信息错误");
            commonFunction.showText("登陆状态异常, 正在返回登录页...");
            setTimeout(function () {
                window.location.href = "../login.html";
            }, 2000)
        }
    })
}
//根据获取的签到状态决定签到窗的展示
function showCheckDiv () {
    if(!isClose){
        if (nowTime < logoutTime) {
            $(".login-window").fadeIn();
            $("body").find(".js-check-btn").html("签到");
        }else if (nowTime >= logoutTime) {
            $(".login-window").fadeIn();
            $("body").find(".js-check-btn").html("签退");
        }
    }
};
function getUserIP(onNewIP) { //  onNewIp - your listener function for new IPs
    //compatibility for firefox and chrome
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
        iceServers: []
    }),
    noop = function() {},
    localIPs = {},
    ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
    key;

    function iterateIP(ip) {
    if (!localIPs[ip]) onNewIP(ip);
        localIPs[ip] = true;
    }

    //create a bogus data channel
    pc.createDataChannel("");

    // create offer and set local description
    pc.createOffer().then(function(sdp) {
        sdp.sdp.split('\n').forEach(function(line) {
        if (line.indexOf('candidate') < 0) return;
            line.match(ipRegex).forEach(iterateIP);
        });
        pc.setLocalDescription(sdp, noop, noop);
    }).catch(function(reason) {
    // An error occurred, so handle the failure to connect
    });

    //sten for candidate events
    pc.onicecandidate = function(ice) {
        if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
            ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
        };
};
//进行签到
function checkIn () {
    //var ipPathBendi = returnCitySN["cip"];
    getUserIP(function(ip){
         $.ajax({
            type: "post",
            contentType:"application/json",
            url: basePath + "/home/userhome/sign",
            async: false,
            data:JSON.stringify({ipPath: ip}),
            success: function(response) {
                if(response.meta.code === 1) {
                    //重新校验登陆状态
                    getCheckStatus();

                    if(window.location.href.indexOf('integrated_manage') !== -1){
                        window.location.reload();
                    }
                    commonFunction.showText(response.meta.message, true)
                    $(".login-window").fadeOut();
                    $(".login-window-folded").fadeOut();

                } else {
                    commonFunction.showText(response.meta.message, false)
                }
            },
            error: function (error) {
                commonFunction.showText(error, false)
            }
        })
     });
    
};

//关闭登录DIV
function closeLoginWindow () {
    isClose = true
    $(".login-window").fadeOut();
    $(".login-window-folded").fadeIn();
};

$(function () {
    initDate();
    checkLoginStatus();
    getCheckStatus();
    //重复调用,更新时间
    setInterval(function() {
        initDate();
        //重复检查是否显示签到窗口 并修改字样
        if(checkStatus == "false") {
            showCheckDiv();            
        }
        //超过签退时间, 重新查询签到状态(只查询一次)
        if(nowTime >= logoutTime && checkOnce) {
            getCheckStatus();
            checkOnce = false;
        }
    }, 1000)
    $(".js-check-btn").on("click", checkIn)
    $(".js-close-check").on("click", closeLoginWindow);

    $(".js-extend").on("click", function(){
        isClose = false;
        $(".login-window").fadeIn()
         $(".login-window-folded").fadeOut();
    })
})