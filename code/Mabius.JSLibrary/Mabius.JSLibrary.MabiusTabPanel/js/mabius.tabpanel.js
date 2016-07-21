/// mabius.tabpanel.js
/// TabPanel control

/// $.mabiusTabItem
/// parameters:
///     unselectHeaderClass(required): 未被选中时tabheader样式
///     selectHeaderClass(required): 选中时的tabheader样式
///     header(required):
///     item(required):
$.fn.mabiusTabItem = function (options) {
    var defaults = {
        enableAnimation: true
    };
    $.extend(defaults, options);
}