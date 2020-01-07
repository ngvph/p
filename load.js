; (function ($, window, document, undefined) {

    "use strict";
    var pluginName = "external",
        defaults = {

        };

    // The actual plugin constructor
    function Plugin(element, options) {
        this.element = element;

        var data = $(element).data();

        this.settings = $.extend({}, defaults, data, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            this.renderHtml(this.settings.url);
        },

        renderHtml: function (url) {

            var that = this;

            $.ajax(url).done(function(res) {

                $(that.element).html(res);
            });
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);
