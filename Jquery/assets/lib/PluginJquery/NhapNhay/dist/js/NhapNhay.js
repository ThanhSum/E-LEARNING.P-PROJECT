window.jQuery.prototype.NhapNhay = function (configOb) {
    var times = 0;
    var color = "";
    var fontSize = "";
    if(configOb != undefined)
    {
        configOb.times != undefined ? times = configOb.times : times = 0;
        configOb.color != undefined ? color = configOb.color : color = "";
        configOb.fontSize != undefined ? fontSize = configOb.fontSize : fontSize = "";
    }
    var selector = $(this);
    for (var i = 0; i < times; i++) {
        selector.fadeOut(300);
        selector.fadeIn(300);
    }
    selector.css({
        "color": color,
        "font-size": fontSize
    });
    //Có thể addclass cho selector 
}