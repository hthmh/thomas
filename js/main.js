(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

angular.module('app', ["ngRoute", 'ngAnimate'])
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider
            .when("/home1", {
                templateUrl: "view/home1.html",
                controller: "home"
            })
            .when("/home2", {
                templateUrl: "view/home2.html",
                controller: "home"
            })
            .when("/home3", {
                templateUrl: "view/home3.html",
                controller: "home"
            })
            .when("/position", {
                templateUrl: "view/position.html",
                controller: "position"
            })
            .when("/thomas", {//微官网
                templateUrl: "view/thomas.html",
                controller: "thomas"
            })
            .when("/successCase", {//成功案例
                templateUrl: "view/successCase.html",
                controller: "successCase"
            })
            .when("/courseIntroduction", {//课程介绍
                templateUrl: "view/courseIntroduction.html",
                controller: "courseIntroduction"
            })
            .when("/introduce", {//课程介绍详情
                templateUrl: "view/introduce.html",
                controller: "introduce"
            })
            .when("/videoList", {//课程视频
                templateUrl: "view/videoList.html",
                controller: "videoList"
            })
            .when("/culture", {//企业文化
                templateUrl: "view/culture.html",
                controller: "culture"
            })
            .when("/contactUs", {//联系我们
                templateUrl: "view/contactUs.html",
                controller: "contactUs"
            })
            .when("/aboutUs", {//关于我们
                templateUrl: "view/aboutUs.html",
                controller: "aboutUs"
            })

            .when("/feedback", {//问题反馈
                templateUrl: "view/feedback.html",
                controller: "feedback"
            })
            .otherwise({
                redirectTo: "/position"
            });
    }])
    .directive('onFinishRenderFilters', function ($timeout) {
        return {
            restrict: 'A',
            link: function (scope) {
                if (scope.$last === true) {
                    $timeout(function () {
                        scope.$emit('ngRepeatFinished');
                    });
                }

            }
        };
    })
    .filter('to_trusted', ['$sce', function ($sce) {
        return function (text, a) {
            if (a) {
                return text.replace(/<[^>]+>/g, "");
            } else {
                return $sce.trustAsHtml(text);
            }
        };
    }])
    .controller('home', function ($scope, $rootScope, $http, $timeout,$location) {
        $rootScope.myTitle = "托马斯微官网";
        $scope.pageClass = 'home';
        $timeout(function () {
            TouchSlide({
                slideCell: "#focus1",
                delayTime: 500,
                titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                mainCell: ".bd ul",
                effect: "leftLoop",
                autoPlay: true,//自动播放
                autoPage: true, //自动分页
                switchLoad: "_src" //切换加载，真实图片路径为"_src"
            });
        }, 50);
    })
    .controller('position', function ($scope, $rootScope, $http) {
        $rootScope.myTitle = "托马斯微官网";
        $scope.pageClass = 'position';


        // //计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
        // function GetDistance(lng1, lat1, lng2, lat2) {
        //     var radLat1 = Rad(lat1);
        //     var radLat2 = Rad(lat2);
        //     var a = radLat1 - radLat2;
        //     var b = Rad(lng1) - Rad(lng2);
        //     var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
        //             Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        //     s = s * 6378.137;// EARTH_RADIUS;
        //     s = Math.round(s * 10000) / 10000; //输出为公里
        //     //s=s.toFixed(4);
        //     return s;
        // }
        // //进行经纬度转换为距离的计算
        // function Rad(d) {
        //     return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
        // }


    })
    .controller('thomas', function ($scope, $rootScope, $http, $timeout) {
        $rootScope.myTitle = "托马斯微官网";
        $scope.pageClass = 'thomas';

        $timeout(function () {
            TouchSlide({
                slideCell: "#focus2",
                titCell: ".hd ul", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
                mainCell: ".bd ul",
                effect: "left",
                autoPlay: true,//自动播放
                autoPage: true, //自动分页
                switchLoad: "_src" //切换加载，真实图片路径为"_src"
            });
        }, 300)

    })
    .controller('successCase', function ($scope, $rootScope, $http, $timeout) {
        $rootScope.myTitle = "成功案例";
        $scope.pageClass = 'successCase';

        $http.get(io.about.case)
            .success(function (res) {
                $scope.successCase = res.list;
                $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                    $timeout(function () {
                        $scope.upDownSwiper($scope.successCase);
                    }, 0, false);
                });
            });


    })
    .controller('courseIntroduction', function ($scope, $rootScope, $http, $timeout) {
        // $scope.loading();
        $rootScope.myTitle = "课程介绍";
        $scope.pageClass = 'courseIntroduction';
        var i = Number(sessionStorage.getItem("thomas_class_id"));
        sessionStorage.setItem("thomas_class_id", 0);
        $http.get(io.about.introduction)
            .success(function (res) {
                $scope.courseIntroduction = res.list;
                $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                    $timeout(function () {
                        $scope.accordionSwiper(i);
                    }, 100, false);
                })
            })


    })
    .controller('introduce', function ($scope, $rootScope, $http, $timeout, $location) {
        $rootScope.myTitle = "课程介绍";
        $scope.pageClass = 'introduce';
        sessionStorage.setItem("thomas_class_id", $location.search().index);
        $scope.introduceBgStyle = {
            "background": "url(" + $location.search().img + ") top/100% auto"
        };
        $http.get(io.about.introduction)
            .success(function (res) {
                $scope.introduce = res.list[0];
                $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
                    $timeout(function () {
                        $scope.accordionSwiper(0);
                    }, 500, false);
                })
            })
    })
    .controller('videoList', function ($scope, $rootScope, $http, $timeout) {
        $rootScope.myTitle = "课程列表";
        $scope.pageClass = 'videoList';
    })
    .controller('feedback', function ($scope, $rootScope, $http, $timeout) {
        $rootScope.myTitle = "问题反馈";
        $scope.pageClass = 'feedback';
        $(".subBtn").click(function () {
            var submsg = layer.open({
                content: "提交"
            });
            $timeout(function () {
                layer.close(submsg)
            }, 500)
        })
    })
    .controller('culture', function ($scope, $rootScope, $http, $timeout) {
        $rootScope.myTitle = "企业文化";
        $scope.pageClass = 'culture';

    })
    .controller('contactUs', function ($scope, $rootScope, $http, $timeout) {
        $rootScope.myTitle = "联系我们";
        $scope.pageClass = 'contactUs home';

    })
    .controller('aboutUs', function ($scope, $rootScope, $http, $timeout) {
        $rootScope.myTitle = "关于我们";
        $scope.pageClass = 'aboutUs';

    })

    .controller('mainCtrl', function ($scope, $rootScope, $http, $timeout) {
        $scope.loading = function () {
            $scope.displayBlock = "displayBlock";
            $timeout(function () {
                $scope.displayBlock = "displayNone"
            }, 500)
        };

        $scope.upDownSwiper = function (list) {//案例页滑动效果
            var imgList = $(".successCase").find("img");
            var imgNum = imgList.length;
            imgList.each(function (index, ele) {
                var obj = {};
                obj[index] = new Image();
                obj[index].src = $(ele).attr("src");
                obj[index].onload = function () {
                    imgNum--;
                    if (imgNum <= 0) {
                        main();
                    }
                };
            });
            function main() {
                var cHeight = document.documentElement.clientHeight;
                var h1 = cHeight / 3;
                var h2 = 2 * cHeight / 3;
                var h3 = cHeight / 2;
                var box1 = $(".successCase");
                var box2 = $("body");
                var scrollInterval1, scrollInterval2;
                var oTimer2 = 0;
                var initTop = 0;
                var i = 0;
                if (list[0].type == 0) {
                    box1.prepend('<div class="ding ding-t"></div>');
                    if (list[i].type == 1) {
                        initTop = 400;
                    }
                }
                if (list[0].type == 1 && list[i].type == 0) {
                    initTop = -400;
                }
                $(".mask").height(h1);

                $(".img-detail").each(function (index, ele) {
                    if (list[index].type == 1) {
                        $(this).height(h2);
                    } else {
                        $(this).height(h1);
                    }
                    if (index < i) {
                        initTop += $(this).height();
                    }
                });
                $(".ding").height(h1);
                box1.scrollTop(initTop);
                changeMask(i);
                box2.on('touchmove', function (event) {
                    event.preventDefault();
                });
                box2.on('mousewheel', function (event) {
                    event.preventDefault();
                });
                var sTop, cTop;
                box2.on("swipeUp", Up);
                box2.on("swipeDown", Down);

                function Up() {
                    $(".mask1").css("top", "-100%");
                    $(".mask2").css("bottom", "-100%");
                    box2.off("swipeUp", Up);
                    box2.off("swipeDown", Down);
                    clearInterval(scrollInterval1);
                    clearInterval(scrollInterval2);
                    clearTimeout(oTimer2);
                    if (i < list.length - 1) {
                        i++;
                        sTop = box1.scrollTop();
                        scrollInterval1 = setInterval(function () {
                            cTop = box1.scrollTop();
                            if (cTop < sTop + $(".img-detail").eq(i).height()) {
                                box1.scrollTop(cTop + 4)
                            } else {
                                box1.scrollTop(sTop + $(".img-detail").eq(i).height());
                                clearInterval(scrollInterval1);
                                box2.on("swipeUp", Up);
                                box2.on("swipeDown", Down);
                            }
                        }, 5);
                    } else {
                        box2.on("swipeUp", Up);
                        box2.on("swipeDown", Down);
                    }
                    changeMask(i)
                }

                function Down() {
                    $(".mask1").css("top", "-100%");
                    $(".mask2").css("bottom", "-100%");
                    box2.off("swipeUp", Up);
                    box2.off("swipeDown", Down);
                    clearInterval(scrollInterval1);
                    clearInterval(scrollInterval2);
                    clearTimeout(oTimer2);
                    if (i > 0) {
                        i--;
                        sTop = box1.scrollTop();
                        scrollInterval2 = setInterval(function () {
                            cTop = box1.scrollTop();
                            if (cTop > sTop - $(".img-detail").eq(i + 1).height()) {
                                box1.scrollTop(cTop - 4)
                            } else {
                                box1.scrollTop(sTop - $(".img-detail").eq(i + 1).height());
                                clearInterval(scrollInterval2);
                                box2.on("swipeUp", Up);
                                box2.on("swipeDown", Down);
                            }
                        }, 5);
                    } else {
                        box2.on("swipeUp", Up);
                        box2.on("swipeDown", Down);
                    }
                    changeMask(i)
                }

                function changeMask(i) {
                    clearTimeout(oTimer2);
                    if ($(".img-detail").eq(i).height()) {
                        clearTimeout(oTimer2);
                        if ($(".img-detail").eq(i).height() < h3) {
                            oTimer2 = setTimeout(function () {
                                $(".mask2").css("opacity", .85);
                                $(".mask2").css("bottom", 0);
                                $(".mask1").css("opacity", .85);
                                $(".mask1").css("top", 0);
                            }, 500);
                        } else {
                            clearTimeout(oTimer2);
                            $(".mask1").css("opacity", 0);
                            $(".mask1").css("top", "-100%");
                            oTimer2 = setTimeout(function () {
                                $(".mask2").css("opacity", .85);
                                $(".mask2").css("bottom", 0);
                            }, 500);
                        }
                    }
                    $(".p1").html(list[i].tit)
                    $(".p2").html(list[i].subTit)
                    $(".p3").html(list[i].txt)
                }
            }
        };

        //    上下手风琴
        $scope.accordionSwiper = function (i) {

            var list = $(".mList");
            var img = list.find(".img-box");
            var active = list.find(".img-box.active");

            // document.querySelector('body').addEventListener('touchstart', function (e) {
            //     e.preventDefault();//禁止微信下拉
            // });
            list.on("touchmove", function (e) {
                e.preventDefault();//禁止微信下拉
            });
            // img.eq(0).height(img.eq(0).find("img").height());
            img.eq(i).height("18.75rem");
            img.eq(i).find('p').eq(1).addClass("active");
            list.css("top", -5 * i + "rem").find('p').removeClass("active");
            list.swipeUp(function () {
                i++;
                if (i > img.length - 1) {
                    i = img.length - 1;
                }
                img.eq(i).height(img.eq(i).find("img").height()).siblings().height("5rem");
                list.css("top", -5 * i + "rem").find('p').removeClass("active");
                img.eq(i).find('p').eq(1).addClass("active");
            });
            list.swipeDown(function () {
                i--;
                if (i < 0) {
                    i = 0;
                }
                img.eq(i).height(img.eq(i).find("img").height()).siblings().height("5rem");
                list.css("top", -5 * i + "rem").find('p').removeClass("active");
                img.eq(i).find('p').eq(1).addClass("active");
            });

            // $(".img-box").tap(function () {
            //     $(".pj-page").append('<div class="modal"></div>');
            //     var i = $(this).index();
            //     $(".introduce" + i).addClass("active");
            // });
            $(".introduce>div i.icon-iconfontweibiaoti1015").click(function () {
                $(".modal").remove();
                $(".introduce").removeClass("active");
            });

            $('.bottom li').click(function () {
                if ($(this).data('href')) {
                    // location.href = $(this).data('href');
                }
            });
        };

    })


;

