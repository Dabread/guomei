/**
 * Created by ibm on 2018/7/23.
 */
//声明一个函数，获取标签的某个样式，返回获取的样式值
function getStyle(elememt,attr) { //标签，样式
    if(elememt.currentStyle){ //ie
        var w = elememt.currentStyle[attr];  //."width"
    }else { //undefined
        var w = getComputedStyle(elememt)[attr];
    }
    return w;
}
function move(obj,attr,step,target,fun) { //运动的元素obj，运动的属性attr，步长step，目标值target,回调函数fun
    //6.处理步长的正负
    step = parseInt(getStyle(obj,attr))<target ? step : -step;
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var left = parseInt(getStyle(obj,attr)) + step;
        if(left >= target && step > 0 || left <= target && step < 0){
            left = target;
            clearInterval(obj.timer);

            //调用回调函数,判断有没有，有才调用
            if(fun){ //有值就为真    true  非0为真
                fun();
            }
        }
        obj.style[attr] = left+"px";
    },30);
}



//给元素绑定事件
function bind(obj,type,fun) {//元素obj,事件类型type,事件处理函数
    if(obj.addEventListener){
        obj.addEventListener(type,fun);
    }else {
        obj.attachEvent("on"+type,fun);
    }
}




function hc(obj,json) { //运动元素obj，运动属性attr，目标target
    //1.开启定时器前清除定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        for(var attr in json){ // 属性
            //2.操作属性   在当前的基础上 +- 一个值
            //6.判断是否是透明度
            if(attr == "opacity"){
                var cur = parseFloat(getStyle(obj,attr))*100; //获取到当前值
            }else {
                var cur = parseInt(getStyle(obj,attr)); //获取到当前值
            }
            var speed = (json[attr] - cur)/10;
            //4.对速度取整  正数：上  负：下
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //5.停止定时器
            if(cur == json[attr]){
                clearInterval(obj.timer);
            }
            //3.将处理好的值设置到元素上
            if(attr == "opacity"){
                obj.style[attr] = (cur + speed)/100 ;
            }else {
                obj.style[attr] = cur+speed +"px";
            }
        }
    },30);
}


//1.存储cookie
function setCookie(key,value,time) { //key-名称  value-内容
    //创建时间对象
    var oDate = new Date();
    oDate.setDate(oDate.getDate()+time);
    document.cookie = key+"="+value+";expires="+oDate;
}

//2.删除cookie
function removeCookie(key) {
    setCookie(key,1,-100);
}


//3.获取cookie
function getCookie(key){ //key=pass
    /*var cookies = {
     "userName":"123asd",
     "pass":"123"
     }*/
    var cookies = {};
    var cookie = document.cookie.split("; ");  // ["userName=123asd", "pass=123"]
    for(var i = 0;i<cookie.length;i++){
        var ar = cookie[i].split("=");
        cookies[ar[0]] = ar[1];  //cookies["userName"] = "123"
    }
    return cookies[key];

    //cookies[key];


    //var cookie = document.cookie;  //userName=123asd; pass=123
    //cookie = cookie.split("; ");  //["userName=123asd", "pass=123"]
    /* for(var i = 0;i<cookie.length;i++){
     //userName=123asd
     var arr = cookie[i].split("=");
     console.log(arr);  //["userName", "123asd"]  ["pass", "123"]
     if(key == arr[0]){
     return arr[1];
     }
     }*/




}



function ajax(url,sFun,eFun) { //url=bendi.txt   sFun = function(str){}   eFun = function(error){}
    //1.创建
    var ajax = new XMLHttpRequest();

    //2.建立连接
    ajax.open("GET",url,true);

    //3.发送请求
    ajax.send();

    //4.监听处理结果
    ajax.onreadystatechange = function () {
        if(ajax.readyState == 4){
            if(ajax.status == 200){
                //成功
                // sFun = function(str){}   eFun = function(error){}
                sFun&&sFun(ajax.responseText);
            }else {
                //失败
                sFun&&eFun(ajax.status);
            }
        }
    }
}


//声明一个函数，判断一个数字是否大于10，小于前面补0，并且将设置好的数值返回
function toTwo(num) {
    return  num < 10 ? "0"+num : num;
}

