function findSplit(children, limit) {
  var text = children[0].innerHTML;
  var alimit = adjustLimit(text, limit);
  var newfirst = $("<p></p>").append(text.substring(0, alimit));
  children.first().text(text.substring(alimit)); // sets as blank if longer than limit
  return newfirst;
}

function adjustLimit(text, limit) {
  var effective_length = 0;
  var total_length = 0;
  for (const token of text.split(/(<.+>)/)) {
    switch (token[0]) {
      case "<":
        total_length += token.length;
      default:
        for (const char in token.split("")) {
          if (effective_length == limit) return total_length;
          effective_length++;
          total_length++;
        }
    }
  }
  return total_length;
}

function moreLess(initiallyVisibleCharacters) {
  var limit = initiallyVisibleCharacters;
  var paragraph = $(".readmore");

  paragraph.each(function () {
    var children = $(this).children();
    // Only count inner text
    var allText = children
      .get()
      .reduce((begin, child) => begin + adjustLimit(child.innerHTML, limit), 0);

    if (allText < limit || children.length < 1) {
      return;
    } else {
      var oldChildren = children.detach();
      var first = findSplit(oldChildren, limit);
      var more = $(
        "<span class='ellipsis'>... </span><a href='#' class='more'>MORE<i class='fa fa-arrow-circle-o-down' aria-hidden='true'></i></a>"
      );
      var rest = oldChildren.splice(1);
      var text = oldChildren[0].innerText;
      var less = $(
        "<span style='display:none'><a href='#' class='less'> LESS<i class='fa fa-arrow-circle-o-up' aria-hidden='true'></i></a></span>"
      );
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
    var [articleElem] = $(this).parent().parent().get();
    var heightBefore = articleElem.offsetHeight;

    $(this).parent().hide().prev().show().prev().show();

    heightAfter = articleElem.offsetHeight;

    $(this).parent().show().prev().hide().prev().hide();

    scroll(0, window.scrollY - (heightBefore - heightAfter));

    $(this).parent().hide().prev().show().prev().show();
  });

  var spinners = $(".fa-spin");
  spinners.detach();
  paragraph.show();
}

window.addEventListener("load", () => {
  moreLess(300);
});
/*$(document).ready(function () {
    moreLess(300);
})*/
