/*
 * Lazy Load - jQuery plugin for lazy loading images
 *
 * Copyright (c) 2007-2013 Mika Tuupola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.appelsiini.net/projects/lazyload
 *
 * Version:  1.9.3
 *
 */

(function($, window, document, undefined) {
    var $window = $(window);

    $.fn.lazyload = function(options) {
        var elements = this;
        var $container;
        var settings = {
            threshold       : 0,
            failure_limit   : 0,
            event           : "scroll",
            effect          : "show",
            container       : window,
            data_attribute  : "original",
            skip_invisible  : true,
            appear          : null,
            load            : null,
            placeholder     : "data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QOJaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6YWRlZjkzYTgtM2RiMi1iNDQyLWI4NjItY2NlMWRiNDdmYjNjIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFDNzVCNzJBRjc3MjExRTg4RUI3RjY1QjJFQTE4NEJDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFDNzVCNzI5Rjc3MjExRTg4RUI3RjY1QjJFQTE4NEJDIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzYgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzI3ODI1MGEtMTJlNi1hMTQ1LWE3YzQtMDE3Njg1YWExZTk0IiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6MDE3ZDJjNDktZGU3OC0xMWU4LThmODMtZGEwNjAwN2RlNWMzIi8+IDwvcmRmOkRl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"
        };

        function update() {
            var counter = 0;

            elements.each(function() {
                var $this = $(this);
                if (settings.skip_invisible && !$this.is(":visible")) {
                    return;
                }
                if ($.abovethetop(this, settings) ||
                    $.leftofbegin(this, settings)) {
                        /* Nothing. */
                } else if (!$.belowthefold(this, settings) &&
                    !$.rightoffold(this, settings)) {
                        $this.trigger("appear");
                        /* if we found an image we'll load, reset the counter */
                        counter = 0;
                } else {
                    if (++counter > settings.failure_limit) {
                        return false;
                    }
                }
            });

        }

        if(options) {
            /* Maintain BC for a couple of versions. */
            if (undefined !== options.failurelimit) {
                options.failure_limit = options.failurelimit;
                delete options.failurelimit;
            }
            if (undefined !== options.effectspeed) {
                options.effect_speed = options.effectspeed;
                delete options.effectspeed;
            }

            $.extend(settings, options);
        }

        /* Cache container as jQuery as object. */
        $container = (settings.container === undefined ||
                      settings.container === window) ? $window : $(settings.container);

        /* Fire one scroll event per scroll. Not one scroll event per image. */
        if (0 === settings.event.indexOf("scroll")) {
            $container.bind(settings.event, function() {
                return update();
            });
        }

        this.each(function() {
            var self = this;
            var $self = $(self);

            self.loaded = false;

            /* If no src attribute given use data:uri. */
            if ($self.attr("src") === undefined || $self.attr("src") === false) {
                if ($self.is("img")) {
                    $self.attr("src", settings.placeholder);
                }
            }

            /* When appear is triggered load original image. */
            $self.one("appear", function() {
                if (!this.loaded) {
                    if (settings.appear) {
                        var elements_left = elements.length;
                        settings.appear.call(self, elements_left, settings);
                    }
                    $("<img />")
                        .bind("load", function() {

                            var original = $self.attr("data-" + settings.data_attribute);
                            $self.hide();
                            if ($self.is("img")) {
                                $self.attr("src", original);
                            } else {
                                $self.css("background-image", "url('" + original + "')");
                            }
                            $self[settings.effect](settings.effect_speed);

                            self.loaded = true;

                            /* Remove image from array so it is not looped next time. */
                            var temp = $.grep(elements, function(element) {
                                return !element.loaded;
                            });
                            elements = $(temp);

                            if (settings.load) {
                                var elements_left = elements.length;
                                settings.load.call(self, elements_left, settings);
                            }
                        })
                        .attr("src", $self.attr("data-" + settings.data_attribute));
                }
            });

            /* When wanted event is triggered load original image */
            /* by triggering appear.                              */
            if (0 !== settings.event.indexOf("scroll")) {
                $self.bind(settings.event, function() {
                    if (!self.loaded) {
                        $self.trigger("appear");
                    }
                });
            }
        });

        /* Check if something appears when window is resized. */
        $window.bind("resize", function() {
            update();
        });

        /* With IOS5 force loading images when navigating with back button. */
        /* Non optimal workaround. */
        if ((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)) {
            $window.bind("pageshow", function(event) {
                if (event.originalEvent && event.originalEvent.persisted) {
                    elements.each(function() {
                        $(this).trigger("appear");
                    });
                }
            });
        }

        /* Force initial check if images should appear. */
        $(document).ready(function() {
            update();
        });

        return this;
    };

    /* Convenience methods in jQuery namespace.           */
    /* Use as  $.belowthefold(element, {threshold : 100, container : window}) */

    $.belowthefold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = (window.innerHeight ? window.innerHeight : $window.height()) + $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top + $(settings.container).height();
        }

        return fold <= $(element).offset().top - settings.threshold;
    };

    $.rightoffold = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.width() + $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left + $(settings.container).width();
        }

        return fold <= $(element).offset().left - settings.threshold;
    };

    $.abovethetop = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollTop();
        } else {
            fold = $(settings.container).offset().top;
        }

        return fold >= $(element).offset().top + settings.threshold  + $(element).height();
    };

    $.leftofbegin = function(element, settings) {
        var fold;

        if (settings.container === undefined || settings.container === window) {
            fold = $window.scrollLeft();
        } else {
            fold = $(settings.container).offset().left;
        }

        return fold >= $(element).offset().left + settings.threshold + $(element).width();
    };

    $.inviewport = function(element, settings) {
         return !$.rightoffold(element, settings) && !$.leftofbegin(element, settings) &&
                !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
     };

    /* Custom selectors for your convenience.   */
    /* Use as $("img:below-the-fold").something() or */
    /* $("img").filter(":below-the-fold").something() which is faster */

    $.extend($.expr[":"], {
        "below-the-fold" : function(a) { return $.belowthefold(a, {threshold : 0}); },
        "above-the-top"  : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-screen": function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-screen" : function(a) { return !$.rightoffold(a, {threshold : 0}); },
        "in-viewport"    : function(a) { return $.inviewport(a, {threshold : 0}); },
        /* Maintain BC for couple of versions. */
        "above-the-fold" : function(a) { return !$.belowthefold(a, {threshold : 0}); },
        "right-of-fold"  : function(a) { return $.rightoffold(a, {threshold : 0}); },
        "left-of-fold"   : function(a) { return !$.rightoffold(a, {threshold : 0}); }
    });

})(jQuery, window, document);
