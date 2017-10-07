// import jquery...
var createLazy = (function() {
    function Exposure($target, callback) {
        this.$target = $target;
        this.callback = callback;
        this.bind();
        this.check();
    }
    Exposure.prototype.bind = function() {
        var that = this;
        $(window).on('scroll', function() {
            that.check();
        });
    }
    Exposure.prototype.check = function() {
        if (this.isVisible()) {
            this.callback(this.$target)
        }
    }
    Exposure.prototype.isVisible = function() {
        var windowHeight = $(window).height(),
            offsetTop = this.$target.offset().top,
            scrollTop = $(window).scrollTop(),
            nodeHeight = this.$target.height();
        if (windowHeight + scrollTop > offsetTop) {
            return true;
        }
        return false;
    }
    return { //返回一个函数，可以调用
        start: function($targets, callback) {
            $.each($targets, function(idx, node) {
                new Exposure($(node), callback);
            })
        }
    }
})()

createLazy.start($('.ct img'), function($img) {
    showPic($img)
})

function showPic($img) {
    var url = $img.data('src');
    $img.attr('src', url)
}