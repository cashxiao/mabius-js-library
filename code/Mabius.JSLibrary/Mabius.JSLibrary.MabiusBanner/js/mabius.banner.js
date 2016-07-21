/// mabius.banner.js
/// 通用banner控件

/// $.mabiusBanner
/// parameters:
///     items(required):
$.fn.mabiusBanner = function (options) {
    var defaults = {};
    $.extend(defaults, options);

    this.currentIndex = 0;

    this._init = function () {
        this.addClass('mabius-banner');
        for (var i = 0; i < defaults.items.length; i++) {
            defaults.items[i].addClass('mabius-banner-item').css({ width: this.width(), height: this.height(), left: i * this.width() });
            this.append(defaults.items[i]);
        }
    }

    this._init();
    return this;
}