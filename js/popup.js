$(function () {
    $("#update_btn").click(function (event) {
        background.setBlackList();
        background.sendBlackList();
    });
});