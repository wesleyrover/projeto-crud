$(function () {
    $(".datepicker").datepicker();
    $('.datepicker-btn').click(function () {
        $(this).closest(".input-group").find(".datepicker").focus();
    });
});  