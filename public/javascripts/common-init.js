$(function () {
    loaded();
    $(window).on("beforeunload", function () {
        loading();
    });
    $("#dialog").dialog({
        autoOpen: false,
        width: 400,
        modal: true,
        show: {
            effect: "blind",
            duration: 200
        },
        hide: {
            effect: "blind",
            duration: 500
        }
    });
    $(".buttonset").buttonset();
    $(".button").button();
    $(".menu").menu({
        items: "> :not(.ui-widget-header)"
    });
    $(".selectmenu").selectmenu();
    $(document).tooltip();
});