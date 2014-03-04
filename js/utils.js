define(function () {
  return {
    addStyle: function (ele, newStyle) {
      if (ele) {
        var $ele = $(ele);
        var style = newStyle ? newStyle : $ele.attr('style');
        if (style) {
          var styles = style.split(';');
          for (var i = 0, len = styles.length; i < len; i++) {
            var style = styles[i].split(':');
            if (style.length === 2) {
              $ele.css(style[0].trim(), style[1].trim());
            }
          }
        }
      }
    },

    replaceGKTagName: function (tagName, $ele) {
      var newHTML = $ele[0].outerHTML;
      var oldTagNameLen = $ele[0].tagName.length + 1;
      newHTML = '<' + tagName + newHTML.substr(oldTagNameLen, newHTML.length);
      newHTML = newHTML.substr(0, newHTML.length - oldTagNameLen) + tagName + '>';
      return $(newHTML);
    }
  }
});