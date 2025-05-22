import './index.less';

import './components/top/index.ts';

declare const TCPlayer: any;
declare const Swiper: any;
declare const layer: any;

$(".title").on("click", "button", function () {
  var flag = $(this).hasClass("s");
  if (flag) {
    $(this).removeClass("s").find("span .o").show();
    $(this).removeClass("s").find("span .c").hide();
    $(this).closest("li").find(".list").animate({ "height": 0 }, 800);
  }
  else {
    $(this).addClass("s").find("span .c").show();
    $(this).addClass("s").find("span .o").hide();
    $(this).closest("li").find(".list").animate({ "height": $(this).closest("li").find(".wrap").height() }, 800);
  }
});
$("#fullyear").text(new Date().getFullYear());
let swiper1 = new Swiper(".preview_swiper", {
  slidesPerView: 1,
  observer: true,
  observeParents: true,
  pagination: {
    el: ".swiper-pagination1",
    type: "fraction"
  }
});
$.each($("img[preview]"), (index, item) => {
  $(item).attr("index", index);
  swiper1.appendSlide(`<div class="swiper-slide">
    <img src="${$(item).attr("preview")}" alt="">
  </div>`)
})


$(document).on("click", "img[preview]", function () {
  $(".preview_mask").addClass("show");
  swiper1.slideTo($(this).attr("index"))
})

$(".preview_mask").on("click", ".swiper-slide", function () {
  $(".preview_mask").removeClass("show");
})

new Swiper('.case_swiper', {
  centeredSlides: false,
  spaceBetween: 5,
  slidesPerView: 1.4,
});
$(".more").on("click", function () {
  if ($(this).hasClass("up")) {
    $(this).closest(".sp").find("ul li:nth-of-type(n+7)").hide();
    $(this).find("span").text("展开更多");
    $(this).removeClass("up");
  }
  else {
    $(this).closest(".sp").find("ul li").show();
    $(this).find("span").text("收起");
    $(this).addClass("up");
  }
});
$("select").change(function () {
  if ($(this).val()) {
    $(this).css("color", "#333");
  }
  else {
    $(this).css("color", "#999");
  }
});
var flag = true;
if ($(".jc").length) {
  $(window).on('scroll', function () {
    var st = $(window).scrollTop();
    var wh = $(".jc").offset().top;
    if (st > (wh - 48) && flag) {
      $("html,body").addClass("noscroll");
      $(".form_up").addClass("show");
      flag = false;
    }
  });
}
$(".form_up").on("click", ".close", function () {
  $(".form_up").removeClass("show");
  $("html,body").removeClass("noscroll");
});
$(".rightfixed").on("click", function () {
  $(".form_up").addClass("show");
  $("html,body").addClass("noscroll");
});
var inputs = [
  {
    name: "name",
    message: "请输入学生姓名"
  },
  {
    name: "mobile",
    message: "请输入家长手机号"
  },
  {
    name: "grade",
    message: "请选择就读年级"
  },
  {
    name: "want_school",
    message: "意向学校"
  }, {
    name: "email",
    message: "您的邮箱"
  }
];
$(".submit").on("click", function () {
  var form = $(this).closest("form");
  var errors = [];
  var msg = inputs.reduce(function (acc, input) {
    var val = form.find("[name=\"".concat(input.name, "\"]")).val();
    if (!val) {
      errors.push(input.message);
    }
    return errors[0];
  }, "");
  if (msg) {
    layer.open({
      content: msg,
      skin: 'msg',
      time: 3
    });
  }
  else {
    $.ajax({
      url: "".concat(form[0].action, "&t=").concat(Math.random().toString()),
      type: form[0].method,
      dataType: "JSON",
      data: form.serialize(),
      success: function (res) {
        if (res.status == 1) {
          layer.open({
            content: "您已报名成功，谢谢您的参与！",
            skin: 'msg',
            time: 3
          });
          $(".form_up").removeClass("show");
          form[0].reset();
        }
        else {
          layer.open({
            content: "报名失败，请稍后再试",
            skin: 'msg',
            time: 3
          });
        }
      },
      error: function () {
        layer.open({
          content: "报名失败，请稍后再试",
          skin: 'msg',
          time: 3
        });
      }
    });
  }
  return false;
});
try {
  var player = TCPlayer('masksp', {});
  player.poster($(".sp").find("li").eq(0).find("img").attr("src"));
} catch (error) {

}
$(".sp").on("click", "li img", function () {
  $("#mask").show();
  $("html,body").addClass("noscroll");
  player.src($(this).attr("value"));
  player.poster($(this).attr("src"));
  setTimeout(function () {
    player.play();
  }, 300);
});
$("#mask").on("click", "img", function () {
  $("html,body").removeClass("noscroll");
  player.pause();
  $("#mask").hide();
});
$('#go-bottom').on('click', function () {
  $('html,body').animate({
    scrollTop: $("form").offset().top
  }, 500);
});
$(".footer-nav").on("click", "li", function () {
  var img = $(this).find("img");
  $("html,body").addClass("noscroll");
  if (img.attr("img")) {
    $(".concat h4").text(img.attr("alt"));
    $(".concat .img img").attr("src", img.attr("img"));
    if (img.attr("tel")) {
      $(".concat p").text("".concat(img.attr("alt"), "\u8BF7\u626B\u7801\u6216\u62E8\u6253\u7535\u8BDD\uFF1A"));
      $(".concat a").attr("href", "tel:".concat(img.attr("tel"))).text("".concat(img.attr("tel")));
      $(".concat").addClass("show");
    }
    else {
      $(".concat").removeClass("show");
      $(".form_up").addClass("show");
    }
    $("html,body").addClass("noscroll");
  }
});
$(".concat .box > img").on("click", function () {
  $(".concat").removeClass("show");
  $("html,body").removeClass("noscroll");
});

$(".menu_mask").on("click", "a.form", function () {
  $(".form_up").addClass("show");
});
$(".form_up").on("click", ".close img", function () {
  $(this).closest(".form_up").removeClass("show");
});
$(".menu_mask").on("click", function (e) {
  if (!$(e.target).closest(".con").length) {
    $(".menu_mask").hide();
  }
});