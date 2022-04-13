(function () {
    var common = {
        elem: {
            body : document.querySelector('body'),
            dimm : document.querySelector(".dimm"),
            scrollPosition : 0,
        }
    }


    var gnb = {
        elem: {
            mainMenu : document.querySelectorAll(".gnb-1depth > li"),
            subMenu : document.getElementsByClassName("gnb-2depth"),
            menuBar : document.querySelector(".menu-bar"),
            subMenuList : document.querySelectorAll(".gnb__list > li"),
            subMenuLast : document.querySelector(".gnb__list > li:last-child"),
            subDepthLast : document.querySelector(".sub-last > li:last-child a"),
            moMenuIcon : document.querySelector(".link-mo-nav"),
            moMenuCloseBtn : document.querySelector(".gnb__close"),
            moMenuWrap : document.querySelector('.gnb__wrap'),
            moSubList : document.getElementsByClassName('links'),
            // mologin : document.querySelector('.menu-login a'),
            // moBottomLogin : document.querySelector('.mo-login-bottom'), 
        },

        event: {
            mouseEnter : function () {
                [].forEach.call(gnb.elem.mainMenu, function (__el, index) {
                    var __elLeft = __el.offsetLeft,
                        __elPadLeft = Math.round(window.getComputedStyle(__el).getPropertyValue('padding-left').replace(/[^0-9^.]/g, '')),
                        __elAWidth = __el.querySelector(".gnb-1depth__title").offsetWidth;

                    __el.addEventListener('mouseenter', function (__e) {
                        __e.preventDefault();
                        gnb.elem.menuBar.style.display = "block";
                        gnb.elem.subMenu[index - 1].style.display = "block";
                        gnb.elem.menuBar.style.left = (__elLeft + __elPadLeft) + "px";
                        gnb.elem.menuBar.style.width = __elAWidth + "px";
                    });
                });
            },
            
            mouseLeave : function () {
                [].forEach.call(gnb.elem.mainMenu, function (__el, index) {
                    __el.addEventListener('mouseleave', function (__e) {
                        __e.preventDefault();
                        gnb.elem.menuBar.style.display = "none";
                        gnb.elem.subMenu[index - 1].style.display = "none";
                    });
                });
            },

            //mobile
            moShow : function () {
                gnb.elem.moMenuIcon.addEventListener("click", function (e) {
                    e.preventDefault();                    

                    gnb.elem.moMenuWrap.classList.add("open");
                    gnb.elem.moMenuWrap.style.display = "block";
                    common.elem.dimm.style.display = "block";

                    common.elem.scrollPosition = window.pageYOffset;
                    common.elem.body.style.overflow = 'hidden';
                    common.elem.body.style.position = 'fixed';
                    common.elem.body.style.top = "-" + common.elem.scrollPosition + "px";
                    common.elem.body.style.width = '100%';
                });
            },

            moHide : function () {
                gnb.elem.moMenuCloseBtn.addEventListener("click", function (e) {
                    e.preventDefault();
                    gnb.elem.moMenuWrap.classList.remove("open");
                    gnb.elem.moMenuWrap.style.display = "none";
                    common.elem.dimm.style.display = "none";

                    common.elem.body.removeAttribute("style");
                    window.scrollTo(0, common.elem.scrollPosition);
                });
            },

            moSubShow : function () {
                [].forEach.call(gnb.elem.moSubList, function (__el, index) {
                    __el.addEventListener('click', function (__e) {
                        __e.preventDefault();
                        for (var i = 0; i < gnb.elem.moSubList.length; i++) {
                            if (i !== index) {
                                gnb.elem.moSubList[i].parentNode.classList.remove("on");
                            } else {
                                if (gnb.elem.moSubList[i].parentNode.classList.contains("on") == true) {
                                    gnb.elem.moSubList[i].parentNode.classList.remove("on");
                                } else {
                                    gnb.elem.moSubList[i].parentNode.classList.add("on");
                                }
                            }
                        }
                    });
                });
            },
        },
        
        accessibility: {
            KeyboardEvent: function () {
                [].forEach.call(gnb.elem.mainMenu, function (__el, index) {
                    __el.addEventListener('keydown', function (__e) {
                        var key = __e.key || __e.keyCode;
                        
                        if (key === 'Enter' || key === 13) {
                            __e.preventDefault();                            
                            for (var i = 0; i < gnb.elem.subMenu.length; i++) {
                                gnb.elem.subMenu[i].style.display = "none";
                            }
                            gnb.elem.subMenu[index].style.display = "block";
                        }
                    });
                });
                
                [].forEach.call(gnb.elem.subMenuLast, function (__el, index) {
                    __el.addEventListener('keydown', function (__e) {
                        var keyCode = __e.key.toLowerCase();

                        if (__e.shiftKey && keyCode === 'tab') {}
                        else if (keyCode === 'tab') {
                            __e.preventDefault();
                            gnb.elem.subMenu[index].style.display = "none";
                        }
                    });
                });
                
                gnb.elem.subDepthLast.addEventListener("keydown", function (__e) {
                    var keyCode = __e.key.toLowerCase();

                    if (__e.shiftKey && keyCode === 'tab') {}
                    else if (keyCode === 'tab') {
                        __e.preventDefault();
                        gnb.elem.subMenu[gnb.elem.subMenu.length - 1].style.display = "none";
                    }
                });
                
                //mobile
                gnb.elem.moMenuIcon.addEventListener("keydown", function (__e) {
                    var key = __e.key || __e.keyCode;
                    
                    if (key === 'Enter' || key === 13) {
                        __e.preventDefault();
                        gnb.elem.moMenuWrap.style.display = "block";
                        common.elem.dimm.style.display = "block";
                        gnb.elem.mologin.focus();
                    }
                });

                gnb.elem.moBottomLogin.addEventListener("keydown", function (__e) {
                    var keyCode = __e.key.toLowerCase();

                    if (__e.shiftKey && keyCode === 'tab') {}
                    else if (keyCode === 'tab') {
                        __e.preventDefault();
                        gnb.elem.moMenuCloseBtn.focus();
                    }
                });

                gnb.elem.moMenuCloseBtn.addEventListener("keydown", function (__e) {
                    var keyCode = __e.key.toLowerCase();

                    if (__e.shiftKey && keyCode === 'tab') {
                        __e.preventDefault();
                        gnb.elem.moBottomLogin.focus();
                    }
                    else if (keyCode === 'tab') {
                        __e.preventDefault();
                        gnb.elem.mologin.focus();
                    }
                });
            }
        },

        init: function () {
            this.event.mouseEnter();
            this.event.mouseLeave();
            this.event.moShow();
            this.event.moHide();
            this.event.moSubShow();
            // this.accessibility.KeyboardEvent();
        }
    }




    window.addEventListener('resize', function(){
        // clearTimeout(slide.elem.timer);
        // slide.elem.timer = setTimeout(function(){
        //     slide.resize();
        // }, slide.elem.delay);
    });
    
    window.onload = function () {
        // slide.init();
        gnb.init();
        // popup.init();
        // selectBox.init();
    }

})();

