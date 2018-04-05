function findSplit(children, limit) {
    var text = children[0].innerHTML;
    var newfirst = $("<p></p>").append(text.substring(0, limit));
    children.first().text(text.substring(limit)); // sets as blank if longer than limit
    return newfirst;
}

function moreLess(initiallyVisibleCharacters) {
    var visibleCharacters = initiallyVisibleCharacters;
    var paragraph = $(".readmore")


    paragraph.each(function () {
        var children = $(this).children();
        var allText = children.get().reduce((begin, child) => begin + child.innerHTML, "");

        if (allText.length < visibleCharacters || (children.length < 1)) {
            return
        } else {
            var oldChildren = children.detach();
            var first = findSplit(oldChildren, visibleCharacters);
            var more = $("<span class='ellipsis'>... </span><a href='#' class='more'>MORE<i class='fa fa-arrow-circle-o-down' aria-hidden='true'></i></a>");
            var rest = oldChildren.splice(1);
            var text = oldChildren[0].innerHTML;
            var less = $("<span style='display:none'><a href='#' class='less'> LESS<i class='fa fa-arrow-circle-o-up' aria-hidden='true'></i></a></span>");
            less.prepend(rest).prepend(text);
            $(this).append(first.append(more).append(less));
        }
    });
    $(".more").click(function (e) {
        e.preventDefault();
        $(this).hide().prev().hide();
        $(this).next().show();
    });
    $(".less").click(function (e) {
        e.preventDefault();
        $(this).parent().hide().prev().show().prev().show();
    });
};

window.onload = function () {
    moreLess(300);
}