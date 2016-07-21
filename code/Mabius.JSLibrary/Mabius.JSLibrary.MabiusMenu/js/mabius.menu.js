/// mabius.menu javascript file


/// $.mabiusMenuItem
/// paramters:
///     lostFocusClass(required): 失去焦点时的样式（默认和选定时的样式）
///     focusClass(required): 得到焦点时的样式，mouseover时触发
///     width: 菜单项宽度
///     height: 菜单项高度

$.fn.mabiusMenuItem = function (options) {
    var defaults = {};
    $.extend(defaults, options);

    this.isSelected = false;

    this._init = function () {
        if (defaults.width) { this.width(defaults.width); }
        if (defaults.height) { this.height(defaults.height); }
        this.addClass(defaults.lostFocusClass);
        this.bind('mouseover', { sender: this }, function (e) {
            var sender = e.data.sender;
            if (!sender.isSelected) { sender.removeClass(defaults.lostFocusClass).addClass(defaults.focusClass); }
        }).bind('mouseout', { sender: this }, function (e) {
            var sender = e.data.sender;
            if (!sender.isSelected) { sender.removeClass(defaults.focusClass).addClass(defaults.lostFocusClass); }
        }).bind('click', { sender: this }, function (e) {
            var sender = e.data.sender;
            if (!sender.isSelected) {
                sender.removeClass(defaults.focusClass).addClass(defaults.lostFocusClass);
                sender.isSelected = true;
                sender.trigger('selected');
            }
        });
    }

    this.select = function () {
        if (!this.isSelected) {
            if (this.hasClass(defaults.focusClass)) { this.removeClass(defaults.focusClass).addClass(defaults.lostFocusClass); }
            this.isSelected = true;
            this.trigger('selected');
        }
    }

    this.unselect = function () {
        if (this.isSelected) {
            this.isSelected = false;
        }
    }

    this._init();
    return this;
}


/// $.mabiusMenu
/// parameters:
///     items(required): 菜单项集合
///     menuClass: 菜单的样式，默认为mabius-menu
///     itemClass: 菜单项的样式，默认为mabius-menu-item
///     seperatorLength: 菜单项之间的间隔，默认为1
///     bar: 菜单的滑动效果线条项
$.fn.mabiusMenu = function (options) {
    var defaults = {
        menuClass: 'mabius-menu',
        itemClass: 'mabius-menu-item',
        seperatorLength: 1,
        duration: 300
    };
    $.extend(defaults, options);

    this.selectedIndex = -1;
    this.selectedItem = null;

    this._init = function () {
        this.addClass(defaults.menuClass);
        if (defaults.bar) {
            defaults.bar.addClass('mabius-menu-bar');
            this.append(defaults.bar);
            defaults.bar.hide();
        }
        for (var i = 0; i < defaults.items.length; i++) {
            defaults.items[i].addClass(defaults.itemClass);
            if (i == 0) { defaults.items[i].css({ left: 0 }); }
            else { defaults.items[i].css({ left: parseFloat(defaults.items[i - 1].css('left')) + defaults.items[i - 1].width() + defaults.seperatorLength }); }
            this.append(defaults.items[i]);
            defaults.items[i].bind('selected', { sender: this, index: i }, function (e) {
                var sender = e.data.sender;
                var index = e.data.index;
                //if (sender.selectedIndex == -1) {
                //    sender.selectedIndex = index;
                //    sender.selectedItem = defaults.items[index];
                //    sender.trigger('selectionchanged');
                //}
                //else if (sender.selectedIndex != index) {
                //    sender.selectedItem.unselect();
                //    sender.selectedIndex = index;
                //    sender.selectedItem = defaults.items[index];
                //    sender.trigger('selectionchanged');
                //}
                sender.select(index);
            });
        }
    }

    this.select = function (index) {
        if (this.selectedIndex == -1) {
            this.selectedIndex = index;
            this.selectedItem = defaults.items[index];
            if (defaults.bar) {
                defaults.bar.css('left', this.selectedItem.css('left'));
                defaults.bar.show();
            }
            this.trigger('selectionchanged');
        }
        else if (this.selectedIndex != index) {
            this.selectedItem.unselect();
            this.selectedIndex = index;
            this.selectedItem = defaults.items[index];
            if (!defaults.bar) { this.trigger('selectionchanged'); }
            else {
                self = this;
                defaults.bar.animate({ left: parseFloat(defaults.items[index].css('left')) }, defaults.duration, function () {
                    self.trigger('selectionchanged');
                });
            }
        }
    }

    this._init();
    return this;
}