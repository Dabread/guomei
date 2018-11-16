window.onload = function () {

    //-------------------------------0.弹出的广告shade------------------------------
    var shade = document.getElementById("shade");
    var shadeImg = shade.getElementsByTagName("img")[0];
    shadeImg.style.marginLeft = (document.documentElement.clientWidth-shadeImg.clientWidth)/2+"px";
    shadeImg.style.marginTop = (document.documentElement.clientHeight-shadeImg.clientHeight)/2+"px";
    setTimeout(function () {
        shade.style.display = "none";
    },2000);

    // console.log(document.documentElement.clientWidth);
    // console.log(shadeImg.style.marginLeft);

    //---------------------------1.广告条adv----------------------------------------

    //获取 .adv 广告条元素，给对应的图片添加背景颜色
    var adv = document.getElementsByClassName("adv")[0];
    var adv_btn = adv.getElementsByTagName("button")[0];
    var adv_img = adv.getElementsByTagName("img")[0];

    //定义广告条图片，颜色匹配数组
    var adv_imgs = [{
        src:"./images/gome-topap-bg.gif",
        backgroundColor:"#00D1FF"
    },{
        src:"./images/gome-topap-bg1.jpg",
            backgroundColor:"#C6157F"
    },{
        src:"./images/gome-topap-bg2.jpg",
            backgroundColor:"#92C1F8"
    }];

    //每次刷新，广告条随机显示图片以及其配对背景
    var adv_rd = Math.floor(Math.random()*3);
    adv_img.src = adv_imgs[adv_rd].src;
    adv.style.backgroundColor = adv_imgs[adv_rd].backgroundColor;
    //console.log(adv_btn);
    //点击“×”按钮，关闭广告条
    adv_btn.onclick = function(){
        this.parentNode.parentNode.remove();
    }


    //-------------------------------2.header---------------------------------------

    //获取class="headerH"元素，鼠标移上去有小放开
    var headerH = document.getElementsByClassName("headerH");
    //获取出现的div，与headerH一一对应
    var oHeader = document.getElementsByClassName("header")[0].getElementsByClassName("wrap")[0].getElementsByClassName("oHeader");
    //console.log(headerH);
   // console.log(oHeader);
    for (var i=0;i<headerH.length;i++){
        headerH[i].index = i;
        var tag;
        tag = headerH[i].onmouseover = function () {
            for (var j=0;j<oHeader.length;j++){
                oHeader[j].style.display="none";
            }
            for(var m=0;m<headerH.length;m++){
                headerH[m].style.borderLeft="none";
                headerH[m].style.borderRight="none";
                headerH[m].style.backgroundColor="";
            }

            this.style.borderLeft="1px solid #ccc";
            this.style.borderRight="1px solid #ccc";
            this.style.backgroundColor="white";
            oHeader[this.index].style.display="block";

            var _this=this;
            oHeader[this.index].onmouseout = function () {
                this.style.display = "none";
                _this.style.borderLeft="none";
                _this.style.borderRight="none";
                _this.style.backgroundColor="";
            }

        }

    }


    //-------------------------------------3.nav 广告切换-------------------------------

    //通过获取.nav下面的唯一一个ul标签元素，得到li,并通过p下面的i标签对ul操作
    var nav_ul =document.getElementsByClassName("nav")[0].getElementsByTagName("ul")[0];
    var nav_li = nav_ul.getElementsByTagName("li");
    var nav_i =document.getElementsByClassName("nav")[0].getElementsByTagName("p")[0].getElementsByTagName("i");  //有两个i标签
    //console.log(nav_i,nav_ul,nav_li);

    //设置定时器
    var nav=0;

    //点击i标签时，上下翻滚
    nav_i[0].onclick = function () {
        clearInterval(navtimer);
        if(nav==0){
            nav_ul.style.top="-120px";
            nav = 4;
        }else{
            nav--;
        }
        move(nav_ul,"top",5,-nav*40);
        this.onmouseout = function () {
            navtimer =setInterval(navAuto,3000);
        }
    }

    nav_i[1].onclick = function () {
        clearInterval(navtimer);
        if(nav>=4){
            nav_ul.style.top="0px";
            nav =0;
        }else{
            nav++;
        }
        move(nav_ul,"top",5,-nav*40);
        this.onmouseout = function () {
            navtimer =setInterval(navAuto,3000);
        }
    }

    var navtimer =setInterval(navAuto,3000);
    function navAuto() {
        if(nav== 4){
                nav = 1;
                nav_ul.style.top = "0px";
            }else {
            nav++;
        }
        move(nav_ul,"top",5,-nav*40);
    }



    // -------------------------------------4.banner大轮播----------------------------

    //获取元素  ul,img,span左右翻转的按钮,在p元素中插入b标签
    var bannerUl =document.getElementsByClassName("banner_c")[0].getElementsByTagName("ul")[0];
    var bannerImg = document.getElementsByClassName("banner_c")[0].getElementsByClassName("banner_box")[0].getElementsByTagName("img");
    var bannerSpan = document.getElementsByClassName("banner_c")[0].getElementsByTagName("span");
    var bannerP = document.getElementsByClassName("banner_c")[0].getElementsByTagName("p")[0];
    var bannerB = bannerP.getElementsByTagName("b");
    //console.log(bannerP,bannerB,bannerImg,bannerSpan,bannerUl);
    //通过ajax获取数据
    ajax("./uses/banner.txt",function (ban) {
        var ban = eval(ban);
        for(var i=0;i<ban.length;i++){
            ban[i]=ban[i][0];
        }
        //console.log(ban);

       /* bannerUl.style.height = 450*bannerImg.length+"px";  //自动调整UL宽度
        console.log(bannerUl.offsetHeight);*/
        //根据数组的长度生成对应的标签
        for(var j = 0;j<ban.length;j++){
            bannerUl.innerHTML += "<li><img src='"+ban[j].src+"' alt=''></li>";

            bannerP.innerHTML += "<b></b>";
        }
        bannerUl.appendChild(bannerUl.firstChild.cloneNode(true));
        //console.log(bannerUl,bannerP);


        //设置默认选中项
        bannerB[0].className = "active";
        //添加b添加事件，切换图片（划过）
        for(var b = 0;b<bannerB.length;b++){
            bannerB[b].index = b;
            bannerB[b].onmouseover = function () {
                for(var j = 0;j<bannerB.length;j++){
                    bannerB[j].className = "";
                }
                //改自己的样式
                this.className = "active";
                //移动图片
                n = this.index; //下标同步
                bannerUl.style.top = -n*450 +"px";
                document.getElementsByClassName("banner")[0].style.backgroundColor = ban[this.index].background;
            }
        }

        //自己动
        var n = 0;
        var bannertimer;

        //点击b标签时，上下翻滚
        bannerSpan[0].onclick = function () {
            clearInterval(bannertimer);
            if(n<=0){
                bannerUl.style.top=-(bannerB.length-1)*450+"px";
                n=bannerB.length-1;
            }else{
                n--;
                bannerUl.style.top=-n*450+"px";
            }
            for(var j = 0;j<bannerB.length;j++){
                bannerB[j].className = "";
            }
            bannerB[n].className = "active";
            document.getElementsByClassName("banner")[0].style.backgroundColor = ban[n].background;
        }

        bannerSpan[1].onclick = function () {
            clearInterval(bannertimer);
            if(n>=bannerB.length){
                nav_ul.style.top="0px";
                n =1;
            }else{
                n++;
            }
            bannerUl.style.top=-n*450+"px";
            for(var j = 0;j<bannerB.length;j++){
                bannerB[j].className = "";
            }
            if(n==bannerB.length){
                bannerB[0].className = "active";
                document.getElementsByClassName("banner")[0].style.backgroundColor = ban[0].background;
            }
            else{
                bannerB[n].className = "active";
                document.getElementsByClassName("banner")[0].style.backgroundColor = ban[n].background;}
        }

        clearInterval(bannertimer);
        bannertimer = setInterval(bannerauto,3000); //1
        function bannerauto() {
            //6.到最后一张
            if(n == bannerB.length){
                bannerUl.style.top = "0px";
                n = 1;
            }else {
                n++;
            }
            //变换图片，改小方块的样式
            bannerUl.style.top = -n*450 +"px";
            if(n==bannerB.length){
                document.getElementsByClassName("banner")[0].style.backgroundColor = ban[0].background;
            }
            else{
                document.getElementsByClassName("banner")[0].style.backgroundColor = ban[n].background;}
            for(var j = 0;j<bannerB.length;j++){
                bannerB[j].className = "";
            }
            if(n == bannerB.length){
                bannerB[0].className = "active";
            }else {
                bannerB[n].className = "active";
            }
        }


        //鼠标移入，定时器关闭，鼠标离开，定时器重新开始
        document.getElementsByClassName("banner_c")[0].getElementsByClassName("banner_box")[0].onmouseover = function () {
            clearInterval(bannertimer); //clearInterval(1)
        }

        document.getElementsByClassName("banner_c")[0].getElementsByClassName("banner_box")[0].onmouseout = function () {
            bannertimer = setInterval(bannerauto,3000); //2
        }


    });


    //------------------------------------5.倒计时cd----------------------------------

    //获取countdown下面的span标签,加入时间
    var cdSpan = document.getElementsByClassName("countdown_top")[0].getElementsByTagName("p")[1].getElementsByTagName("span");
    //console.log(cdSpan);
    var cdHour,cdMinute,cdSecond; //设置倒计时的时分秒
    cdAuto();
    setInterval(cdAuto,1000);
    function cdAuto() {
            var cdNow = new Date();
            var cdNew = new Date(2018,9,13);
            var cdTime = parseInt((cdNew-cdNow)/1000);
            //console.log(cdNow,cdNew,cdTime);
            //都变成两位数
            cdHour = toTwo(parseInt(cdTime/3600));
            cdMinute = toTwo(parseInt(cdTime%3600/60));
            cdSecond = toTwo(cdTime%60);
            //console.log(cdHour,cdMinute,cdSecond);
            cdSpan[0].innerHTML =cdHour;
            cdSpan[1].innerHTML = cdMinute;
            cdSpan[2].innerHTML = cdSecond;
    }

    //倒计时下面的ul翻转
    //获取移动元素
    var cdbottom = document.getElementsByClassName("countdown_bottom")[0];
    //获取两个span 元素
    var cdbSpan = cdbottom.getElementsByTagName("span");
    var cdbTag =0;
    //console.log(cdbSpan);
    //点击两个span 转换
    cdbSpan[0].onclick = function () {
        cdbT();
    }
    cdbSpan[1].onclick = function () {
        cdbT();
    }
    function cdbT() {
        if(cdbTag==0){
            cdbottom.style.top="-206px";
            cdbSpan[0].style.top = "286px";
            cdbSpan[1].style.top = "286px";
            cdbTag=1;
        }else{
            cdbottom.style.top="0px";
            cdbSpan[0].style.top = "80px";
            cdbSpan[1].style.top = "80px";
            cdbTag=0;
        }
    }


    //-------------------------------------6.猜你喜欢--------------------------------

    //获取元素  .like_ul移动(相对于父元素.like_box定位) 获取img标签给它设置地址
    //获取h2下面的两个i标签,处理点击事件
    var likeUl = document.getElementsByClassName("like_ul")[0];
    var likeImg = likeUl.getElementsByTagName("img");
    var likeI = document.getElementsByClassName("like")[0].getElementsByTagName("h2")[0].getElementsByTagName("i");
    //console.log(likeUl,likeImg,likeI[0]);
    //遍历数组，设置图片路径
    for(var ln=0;ln<likeImg.length;ln++){
        likeImg[ln].src = "./images/like/like"+(ln+1)+".webp";
    }
    //点击事件
    var liken = 0;
    //右边
    likeI[0].onclick = function () {
        liken++;
        if(liken>2){
            liken=0;
        }else if(liken==1){
            liken=1;
        }else{
            liken=2;
        }
        likeUl.style.top = -268*liken+"px";
    }
    //左边
    likeI[1].onclick = function () {
        liken--;
        if(liken<0){
            liken=2;
        }else if(liken==0){
            liken=0;
        }else{
            liken=1;
        }
        likeUl.style.top = -268*liken+"px";
    }


    /*-------------------------右边黑色的固定条---------------------------------*/
    //console.log(document.documentElement.clientHeight);




    //----------------------------------7.楼层，有类似选项卡的东东-------------------------

    ajax("./images/floor/floor.txt",function (fs) {
        var fs = eval(fs)[0];
        //console.log(fs);
        let{floor1,floor2,floor3,floor4,floor5,floor6,floor7,floor8,floor9}=fs;
        //console.log(floor1,floor2,floor3,floor4,floor5,floor6,floor7,floor8,floor9);

        //不同楼层，对应不同颜色样式
        var floors=[floor1,floor2,floor3,floor4,floor5,floor6,floor7,floor8,floor9];
        var colors=["color1","color2","color3","color4","color5","color6","color7","color8","color9"];

        //获取楼层
        var floor=document.getElementsByClassName("floor");
        //console.log(floor.length);

        //循环调用函数
        for(var f=0;f<floor.length;f++){
            ff(f,floors[f],colors[f]);
        }

        function ff(fo,foo,colors) {   //楼层下标 ，对应数据 ，对应颜色样式
            //每层floor_right 的块数---------------7
            var floor_right =floor[fo].getElementsByClassName("floor_right");
            //console.log(floor_right);

            /*-------------------------每层楼第一块--------------------------*/
            //循环遍历，给一楼第一块图片设置路径
            for(var i=0;i<floor_right[0].getElementsByTagName("img").length;i++){
                floor_right[0].getElementsByTagName("img")[i].src=foo[0][i].src;
            }
            /*-------------------------- 每层楼下面的块------------------------*/

            //获取一楼上的块切换（选项卡）
            var f_div = floor[fo].getElementsByTagName("h1")[0].getElementsByTagName("i");
            //console.log(f_div);  //块个数
            for(var div = 0;div<f_div.length;div++){
                f_div[div].index = div;
                f_div[div].onmouseover = function () {
                    for(var j=0;j<f_div.length;j++){
                        floor_right[j].style.display="none";
                        f_div[j].className="";
                    }
                    floor_right[this.index].style.display = "block";
                    this.className=colors;
                    nextDiv=this.index;
                }
            }


            //除了第一块的默认块，进行遍历,设置内容
            for(var f_inner=1;f_inner<foo.length;f_inner++){

                for(var i=0;i<foo[f_inner].length;i++){
                    floor_right[f_inner].getElementsByTagName("ul")[0].innerHTML +="<li></li>";
                    floor_right[f_inner].getElementsByTagName("li")[i].innerHTML="<img>"+"<p><a href=''></a></p>"+"<p></p>";
                    floor_right[f_inner].getElementsByTagName("img")[i].src = foo[f_inner][i].src;
                    floor_right[f_inner].getElementsByTagName("li")[i].getElementsByTagName("a")[0].innerHTML=foo[f_inner][i].content;
                    floor_right[f_inner].getElementsByTagName("li")[i].getElementsByTagName("p")[1].innerHTML=foo[f_inner][i].price;
                }

            }


            //定义一个变量，记录滑块当前所在位置;
            var nextDiv=0;
            //点击下一个按钮，切换
            floor[fo].getElementsByClassName("next")[0].onclick=function () {
                nextDiv++;
                if(nextDiv==f_div.length){
                    nextDiv=0;
                }
                for(var j=0;j<f_div.length;j++){
                    floor_right[j].style.display="none";
                    f_div[j].className="";
                }
                floor_right[nextDiv].style.display = "block";
                f_div[nextDiv].className=colors;
            }

            //一楼第一块的轮播
            var f1U =floor_right[0].getElementsByClassName("floor_r1")[0].getElementsByTagName("ul")[0];
            var f1Span = floor_right[0].getElementsByClassName("floor_r1")[0].getElementsByTagName("span");
            var f1I = floor_right[0].getElementsByClassName("floor_r1")[0].getElementsByTagName("p")[0].getElementsByTagName("i");
            //console.log(f1U,f1Span,f1I);

            var f1 = 0;
            //右边
            f1Span[1].onclick = f_right;

            //左边
            f1Span[0].onclick = function () {
                f1--;
                if(f1<0){
                    f1=2;
                }else if(f1==0){
                    f1=0;
                }else{
                    f1=1;
                }
                f1U.style.top = -470*f1+"px";
                for(var j=0;j<f1I.length;j++){
                    f1I[j].className="";
                }
                f1I[f1].className="active";
            }
            var f1timer = setInterval(f_right,3000);



            //九楼只有一张切换图片，不设置动态

            if(fo==8){
                clearInterval(f1timer);
                f1Span[0].onclick=f1Span[1].onclick=null;
            }

            for(var i=0;i<f1I.length;i++){
                f1I[i].index = i;
                f1I[i].onmouseover = function () {
                    f1U.style.top = -470*this.index+"px";
                    for(var j=0;j<f1I.length;j++){
                        f1I[j].className="";
                    }
                    this.className = "active";
                    f1=this.index;
                }
            }
            function f_right() {
                f1++;
                if(f1>2){
                    f1=0;
                }else if(f1==1){
                    f1=1;
                }else{
                    f1=2;
                }
                f1U.style.top = -470*f1+"px";
                for(var m=0;m<f1I.length;m++){
                    f1I[m].className="";
                }
                if(fo!=8){
                    f1I[f1].className="active";
                }else{
                    f1I[0].className="active";
                }
            }

            floor_right[0].getElementsByClassName("floor_r1")[0].onmouseover=function () {
                clearInterval(f1timer);
            }
            floor_right[0].getElementsByClassName("floor_r1")[0].onmouseout=function () {
                f1timer = setInterval(f_right,3000);
            }

        }


    });





    //----------------------------8.左边的滑块导航---------------------------------------------

    var scroll = document.getElementsByClassName("scroll")[0];
   // console.log(scroll);
    var sLi = scroll.getElementsByClassName("sli");
    var sSpan = scroll.getElementsByTagName("span");
    var scrollTop;

    window.onscroll = function () {
        scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop >= 2100&&scrollTop<=7900){
            scroll.style.display="block";
            scroll.style.top=66+scrollTop+"px";

            for(var i=0;i<sSpan.length;i++){
                sSpan[i].className=""
            }
            /*if(parseInt((scrollTop-2100)/560)>0&&parseInt((scrollTop-2100)/560)<10){
                sSpan[parseInt((scrollTop-2100)/560)].className = "si";
            }*/
            var arr = ["f1","f2","f3","f4","f5","f6","f7","f8","f9","f10"];
            // console.log(document.getElementById("f2").offsetTop);
            // console.log(arr.length);  //10
            // console.log(scrollTop);
            for(var ai = 0;ai<arr.length-1;ai++){
                if(scrollTop>=document.getElementById(arr[ai]).offsetTop&&scrollTop<document.getElementById(arr[ai+1]).offsetTop){
                    // console.log(arr[ai]);
                    sSpan[ai].className = "si";
                }else if(scrollTop>=document.getElementById("f10").offsetTop){
                    sSpan[9].className = "si";
                }else if(scrollTop<document.getElementById("f1").offsetTop){
                    sSpan[0].className = "si";
                }
            }

        }else {
            scroll.style.display="none";
        }
        //console.log(scrollTop);


    }





         /*------------------------------9.搜索------------------------------------*/
         //设置搜索默认值
         //console.log(document.getElementById("search"));
         var places = ["洗衣机","空调清凉节","打折优惠","一元起","iPad","最新上市"];
         setInterval(function () {
             document.getElementById("search").placeholder=places[Math.ceil(Math.random()*6)];
         },3000);

    $(function () {
        // alert($);

        $(".scroll a").click(function () {
            //运动的距离，a标签对应的div的offsetTop
            //1。获取对应的abiaoq
            // console.log($(this).parent().children()[0]);
            var top = $( $(this).attr("href")).offset().top;
            $("html,body").animate({"scrollTop":top},500);

        })
    });

}




