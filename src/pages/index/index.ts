import '@common/css/reset.less'
import '@cs/header/index.ts'
import './index.less';

declare const TCPlayer: any;
declare const Swiper: any;
declare const layer: any;

$(".title").on("click", "button", function () {
  var flag = $(this).hasClass("s");
  if (flag) {
    $(this).removeClass("s").find("span").text($(this).find("a.c").text());
    $(this).closest("li").find(".list").animate({ "height": 0 }, 800);
  }
  else {
    $(this).addClass("s").find("span").text($(this).find("a.g").text());
    $(this).closest("li").find(".list").animate({ "height": $(this).closest("li").find(".wrap").height() }, 800);
  }
});

var previewLength = $("img[preview]").length;
$.each($("img[preview]"), (index, item) => {
  $(item).attr("index", index);
})
var previewIndex = 0;
$(document).on("click", "img[preview]", function () {
  var src = $(this).attr("preview");
  $(".img-mask img").attr("src", src);
  $(".img-mask").addClass("show");
  previewIndex = Number($(this).attr("index"));
});
$(document).on("click", ".close-img-mask", function () {
  $(".img-mask").removeClass("show");
  $(".img-mask img").attr("src", "");
});
$(".img-mask").on("click", function (e) {
  console.log(e.target);
  if(e.target == this) {
    $(this).removeClass("show");
    $(".img-mask img").attr("src", "");
  }
})
$(".arr").on("click", "span", function () {
  let img: any = "";
  $(".img-mask img").attr("src", "");
  if ($(this).hasClass("left")) {
    previewIndex = previewIndex - 1
  } else if ($(this).hasClass("right")) {
    previewIndex = previewIndex + 1
  }
  if (previewIndex < 0) {
    previewIndex = previewLength - 1
  } else if (previewIndex > previewLength - 1) {
    previewIndex = 0
  }
  img = $("img[preview][index='" + previewIndex + "']")
  $(".img-mask img").attr("src", img.attr("preview"));
})

$("#fullyear").text(new Date().getFullYear());
new Swiper('.case_swiper', {
  effect: 'coverflow',
  centeredSlides: true,
  spaceBetween: -80,
  slidesPerView: 2,
  loop: true,
  autoplay: 500,
  coverflowEffect: {
    rotate: 0,
    stretch: 60.8,
    depth: 80,
    modifier: 3,
    slideShadows: true,
  }
});
if ($(".video_swiper").find(".swiper-slide").length > 4) {
  new Swiper('.video_swiper', {
    loop: true,
    slidesPerView: 4,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });
}
try {
  var player = TCPlayer('swipervideo', {});
  player.src($("#swipervideo").attr("value"));
  player.poster($("#swipervideo").attr("poster2"));
} catch (err) {

}
$("#videos").on("click", "img[value]", function () {
  var img = $(this).attr("src");
  var value = $(this).attr("value");
  var name = $(this).attr("alt");
  player.src(value);
  player.poster(img);
  $(this).closest("#videos").siblings("p").text(name);
  setTimeout(function () {
    player.play();
  }, 300);
});
var player2 = TCPlayer('mask_video', {});
$("select").change(function () {
  $(this).css("color", "#333");
});
$(".mask .wrap>img").on("click", function () {
  $(".mask").hide();
  player2.pause();
});
$(document).on('click', '.showTk', function () {
  $('.mask_form').addClass('show');
  $("body").addClass("noscroll");
});
$(document).on('click', '.close', function () {
  $('.mask_form').removeClass('show');
  $("body").removeClass("noscroll");
  $('.error-tips').html('');
  $(this).parents('.mask_form').find('form')[0].reset();
});
$('#go-top').on('click', function () {
  $('html,body').animate({
    scrollTop: 0
  }, 500);
});
var flag = true;
if ($(".school").length) {
  $(window).on('scroll', function () {
    var st = $(window).scrollTop();
    var wh = $(".school").offset().top;
    if (st > (wh - 48) && flag && !$(".img-mask").hasClass("show")) {
      $(".showTk").click();
      flag = false;
    }
  });
}
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
    layer.msg(msg);
  }
  else {
    $.ajax({
      url: "".concat(form[0].action, "&t=").concat(Math.random().toString()),
      type: form[0].method,
      dataType: "JSON",
      data: form.serialize(),
      success: function (res) {
        if (res.status == 1) {
          $('.mask_form').removeClass('show');
          $("body").removeClass("noscroll");
          layer.msg("您已报名成功，谢谢您的参与！");
          form[0].reset();
        }
        else {
          layer.msg(res.info);
        }
      },
      error: function () {
        layer.msg("报名失败，请稍后再试");
      }
    });
  }
  return false;
});

$(".contact ul").hover(function () {
  $(".right-fixed-nav").hide();
}, function () {
  $(".right-fixed-nav").show();
});