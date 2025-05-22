import './index.less';
$(".top-right").on("click", function () {
    $(".menu_mask").show();
});
$(".top").on("click", ".close2808c713", function () {
    var dom = $(this).closest(".menu_mask");
    if (dom.css("display") === "none") {
        dom.show();
        return false;
    }
    dom.hide();
});