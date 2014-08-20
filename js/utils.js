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
    },

    changeTagNameOfGKElment: function changeTagNameOfGKElment(thisObj, newTagName) {
      var $newEle,
          $ele = thisObj.$ele,
          $originEle = thisObj.$originEle,
          newHTML = $ele[0].cloneNode().outerHTML,
          oldTagNameLen = $ele[0].tagName.length + 1,
          attrs = $originEle.prop("attributes");

      // change tagName
      newHTML = '<' + newTagName + newHTML.substr(oldTagNameLen, newHTML.length);
      newHTML = newHTML.substr(0, newHTML.length - oldTagNameLen) + newTagName + '>';
      $newEle = $(newHTML);
      $ele.clone(true).contents().appendTo($newEle);

      // copy attributes
      attrs = $originEle.prop("attributes");
      $.each(attrs, function () {
        switch (this.name) {
          case 'class':
            !$newEle.hasClass(this.value) && $newEle.addClass(this.value);
            break;
          case 'is':
            // do nothing
            break;
          default:
            $newEle.attr(this.name, this.value);
            break;
        }
      });

      // update GK information
      $newEle.data('_gk_', thisObj);
      thisObj.$ele.replaceWith($newEle[0]);
      thisObj.$ele = $newEle;

      return thisObj;
    },

    exposeProperties: function (props, inst, getter, setter) {
      var defineProperty = function (inst, prop, src) {
        Object.defineProperty(inst, prop, {
          get: function () {
            return getter(src || prop);
          },
          set: function (val) {
            setter(src || prop, val);
          }
        });
      };
      props.forEach(function (prop) {
        if (typeof prop === 'string') {
          defineProperty(inst, prop);
        } else {
          $.each(prop, function (key, val) {
            defineProperty(inst, key, val);
          });
        }
      });
    }
  }
});