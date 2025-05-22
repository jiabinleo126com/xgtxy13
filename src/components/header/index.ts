import '@cs/bar-title/index.ts';
import './index.less';
declare let $: any;
$(function () {
  $('.search-hover').on('click', 'li', function () {
    $('#searchContent').text($(this).text())
    $('#searchid').val($(this).attr('value'))
    $('.search-hover').find('.submenu').hide();
  })
  $("#searchbtn").click(function () {
    const txt = $("#q").val().replace(/(^\s*)|(\s*$)/g, '');
    // var searchid = $("#searchid").val();
    if (txt == "输入搜索内容" || txt == "请输入搜索内容" || txt == "") {
      return false;
    }

    // if (searchid == 1) {
    //     var url = "//schoollist.ieduchina.com/?searchkey=" + txt;
    // }
    // if (searchid == 2 || !searchid) {
    //     var url = "//www.ieduchina.com/search/" + txt + ".html?searchid=2";
    // }
    // if (searchid == 3) {
    //     var url = "//www.ieduchina.com/institutions/?searchkey=" + txt;
    // }

    // if ($("#search_catid").length > 0) {
    //     var catid = $("#search_catid").val();
    //     if (catid == 1) {
    //         var url = "//schoollist.ieduchina.com/schlist/c1/?searchkey=" + txt;
    //     }
    // }
    // $("#search").attr("action", url);
  });
  function isShowMenu() {
    const ad_height = $('#pc_ad_top').height() || 0;
    const top = $(window).scrollTop();
    const position = top > ($('.bar-header').height() + $('.bar-title').height() + ad_height) ? 'fixed' : 'initial';
    $('.iedu-menu-box').css({
      position: position
    });
  }
  $(document).on('scroll', function () {
    isShowMenu();
  })
  isShowMenu();
  //主菜单
  $('.parentMenu').hover(function () {
    $(this).find('.submenu').show();
  }, function () {
    $(this).find('.submenu').hide();
  });
  //获取指定名称的cookie的值
  function getcookieval(objname) {
    var arrstr = document.cookie.split("; ");
    for (var i = 0; i < arrstr.length; i++) {
      var temp = arrstr[i].split("=");
      if (temp[0] == objname)
        return decodeURI(unescape(temp[1]));
    }
  }

  var live_username = getcookieval("live_username");
  if (live_username) {
    var userUrl = '//www.ieduchina.com/usercenter/index/index.html';
    var html = "<p class='logout'><span><a rel='nofollow' target='_blank' href='" + userUrl + "'> " + live_username + " </a></span><span> | </span><a href='//www.ieduchina.com/logout.html'>退出</a></p>";
    $("#login-before").html(html);
  }
})