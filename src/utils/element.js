/** Vanilla JS helper to manipulate DOM without jQuery
 * @see https://github.com/nefe/You-Dont-Need-jQuery
 * @see https://plainjs.com/javascript/
 * @see http://youmightnotneedjquery.com/
 */

/** @namespace ol.ext.element */
const element = {};

/**
 * Create an element
 * @param {string} tagName The element tag, use 'TEXT' to create a text node
 * @param {*} options
 *  @param {string} options.className className The element class name 
 *  @param {Element} options.parent Parent to append the element as child
 *  @param {Element|string} [options.html] Content of the element (if text is not set)
 *  @param {string} [options.text] Text content (if html is not set)
 *  @param {Element|string} [options.options] when tagName = SELECT a list of options as key:value to add to the select
 *  @param {string} options.* Any other attribut to add to the element
 */
element.create = function (tagName, options) {
  options = options || {};
  var elt;
  // Create text node
  if (tagName === 'TEXT') {
    elt = document.createTextNode(options.html||'');
    if (options.parent) options.parent.appendChild(elt);
  } else {
    // Other element
    elt = document.createElement(tagName);
    if (/button/i.test(tagName)) elt.setAttribute('type', 'button');
    for (var attr in options) {
      switch (attr) {
        case 'className': {
          if (options.className && options.className.trim) elt.setAttribute('class', options.className.trim());
          break;
        }
        case 'text': {
          elt.innerText = options.text;
          break;
        }
        case 'html': {
          if (options.html instanceof Element) elt.appendChild(options.html)
          else if (options.html!==undefined) elt.innerHTML = options.html;
          break;
        }
        case 'parent': {
          if (options.parent) options.parent.appendChild(elt);
          break;
        }
        case 'options': {
          if (/select/i.test(tagName)) {
            for (var i in options.options) {
              element.create('OPTION', {
                html: i,
                value: options.options[i],
                parent: elt          
              })
            }
          }
          break;
        }
        case 'style': {
          element.setStyle(elt, options.style);
          break;
        }
        case 'change':
        case 'click': {
          element.addListener(elt, attr, options[attr]);
          break;
        }
        case 'on': {
          for (var e in options.on) {
            element.addListener(elt, e, options.on[e]);
          }
          break;
        }
        case 'checked': {
          elt.checked = !!options.checked;
          break;
        }
        default: {
          elt.setAttribute(attr, options[attr]);
          break;
        }
      }
    }
  }
  return elt;
};



/** Set inner html or append a child element to an element
 * @param {Element} element
 * @param {Element|string} html Content of the element
 */
element.setHTML = function(element, html) {
  if (html instanceof Element) element.appendChild(html)
  else if (html!==undefined) element.innerHTML = html;
};

/** Append text into an elemnt
 * @param {Element} element
 * @param {string} text text content
 */
element.appendText = function(element, text) {
  element.appendChild(document.createTextNode(text||''));
};

/**
 * Add a set of event listener to an element
 * @param {Element} element
 * @param {string|Array<string>} eventType
 * @param {function} fn
 */
element.addListener = function (element, eventType, fn, useCapture ) {
  if (typeof eventType === 'string') eventType = eventType.split(' ');
  eventType.forEach(function(e) {
    element.addEventListener(e, fn, useCapture);
  });
};

/**
 * Add a set of event listener to an element
 * @param {Element} element
 * @param {string|Array<string>} eventType
 * @param {function} fn
 */
element.removeListener = function (element, eventType, fn) {
  if (typeof eventType === 'string') eventType = eventType.split(' ');
  eventType.forEach(function(e) {
    element.removeEventListener(e, fn);
  });
};

/**
 * Show an element
 * @param {Element} element
 */
element.show = function (element) {
  element.style.display = '';
};

/**
 * Hide an element
 * @param {Element} element
 */
element.hide = function (element) {
  element.style.display = 'none';
};

/**
 * Test if an element is hihdden
 * @param {Element} element
 * @return {boolean}
 */
element.hidden = function (element) {
  return element.getStyle(element, 'display') === 'none';
};

/**
 * Toggle an element
 * @param {Element} element
 */
element.toggle = function (element) {
  element.style.display = (element.style.display==='none' ? '' : 'none');
};

/** Set style of an element
 * @param {DOMElement} el the element
 * @param {*} st list of style
 */
element.setStyle = function(el, st) {
  for (var s in st) {
    switch (s) {
      case 'top':
      case 'left':
      case 'bottom':
      case 'right':
      case 'minWidth':
      case 'maxWidth':
      case 'width':
      case 'height': {
        if (typeof(st[s]) === 'number') {
          el.style[s] = st[s]+'px';
        } else {
          el.style[s] = st[s];
        }
        break;
      }
      default: {
        el.style[s] = st[s];
      }
    }
  }
};

/**
 * Get style propertie of an element
 * @param {DOMElement} el the element
 * @param {string} styleProp Propertie name
 * @return {*} style value
 */
element.getStyle = function(el, styleProp) {
  var value, defaultView = (el.ownerDocument || document).defaultView;
  // W3C standard way:
  if (defaultView && defaultView.getComputedStyle) {
    // sanitize property name to css notation
    // (hypen separated words eg. font-Size)
    styleProp = styleProp.replace(/([A-Z])/g, "-$1").toLowerCase();
    value = defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
  } else if (el.currentStyle) { // IE
    // sanitize property name to camelCase
    styleProp = styleProp.replace(/-(\w)/g, function(str, letter) {
      return letter.toUpperCase();
    });
    value = el.currentStyle[styleProp];
    // convert other units to pixels on IE
    if (/^\d+(em|pt|%|ex)?$/i.test(value)) { 
      return (function(value) {
        var oldLeft = el.style.left, oldRsLeft = el.runtimeStyle.left;
        el.runtimeStyle.left = el.currentStyle.left;
        el.style.left = value || 0;
        value = el.style.pixelLeft + "px";
        el.style.left = oldLeft;
        el.runtimeStyle.left = oldRsLeft;
        return value;
      })(value);
    }
  }
  if (/px$/.test(value)) return parseInt(value);
  return value;
};

/** Get outerHeight of an elemen
 * @param {DOMElement} elt
 * @return {number}
 */
element.outerHeight = function(elt) {
  return elt.offsetHeight + element.getStyle(elt, 'marginBottom')
};

/** Get outerWidth of an elemen
 * @param {DOMElement} elt
 * @return {number}
 */
element.outerWidth = function(elt) {
  return elt.offsetWidth + element.getStyle(elt, 'marginLeft')
};

/** Get element offset rect
 * @param {DOMElement} elt
 * @return {*} 
 */
element.offsetRect = function(elt) {
  var rect = elt.getBoundingClientRect();
  return {
    top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
    left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0),
    height: rect.height || (rect.bottom - rect.top),
    width: rect.width || (rect.right - rect.left)
  }
};

/** Get element offset 
 * @param {ELement} elt
 * @returns {Object} top/left offset
 */
element.getFixedOffset = function(elt) {
  var offset = {
    left:0,
    top:0
  };
  var getOffset = function(parent) {
    if (!parent) return offset;
    // Check position when transform
    if (element.getStyle(parent, 'position') === 'absolute'
      && element.getStyle(parent, 'transform') !== "none") {
      var r = parent.getBoundingClientRect();
      offset.left += r.left; 
      offset.top += r.top; 
      return offset;
    }
    return getOffset(parent.offsetParent)
  }
  return getOffset(elt.offsetParent)
};

/** Get element offset rect
 * @param {DOMElement} elt
 * @param {boolean} fixed get fixed position
 * @return {Object} 
 */
element.positionRect = function(elt, fixed) {
  var gleft = 0;
  var gtop = 0;

  var getRect = function( parent ) {
    if (parent) {
      gleft += parent.offsetLeft;
      gtop += parent.offsetTop;
      return getRect(parent.offsetParent);
    } else {
      var r = {
        top: elt.offsetTop + gtop,
        left: elt.offsetLeft + gleft
      };
      if (fixed) {
        r.top -= (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
        r.left -= (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0);
      }
      r.bottom = r.top + elt.offsetHeight;
      r.right = r.top + elt.offsetWidth;
      return r;
    }
  }; 
  return getRect(elt.offsetParent);
}

/** Make a div scrollable without scrollbar.
 * On touch devices the default behavior is preserved
 * @param {DOMElement} elt
 * @param {*} options
 *  @param {function} [options.onmove] a function that takes a boolean indicating that the div is scrolling
 *  @param {boolean} [options.vertical=false] 
 *  @param {boolean} [options.animate=true] add kinetic to scroll
 *  @param {boolean} [options.mousewheel=false] enable mousewheel to scroll
 *  @param {boolean} [options.minibar=false] add a mini scrollbar to the parent element (only vertical scrolling)
 * @returns {Object} an object with a refresh function
 */
element.scrollDiv = function(elt, options) {
  options = options || {};
  var pos = false;
  var speed = 0;
  var d, dt = 0;

  var onmove = (typeof(options.onmove) === 'function' ? options.onmove : function(){});
  //var page = options.vertical ? 'pageY' : 'pageX';
  var page = options.vertical ? 'screenY' : 'screenX';
  var scroll = options.vertical ? 'scrollTop' : 'scrollLeft';
  var moving = false;
  // Factor scale content / container
  var scale, isbar;

  // Update the minibar
  var updateCounter = 0;
  var updateMinibar = function() {
    if (scrollbar) {
      updateCounter++;
      setTimeout(updateMinibarDelay);
    }
  }
  var updateMinibarDelay = function() {
    if (scrollbar) {
      updateCounter--;
      // Prevent multi call
      if (updateCounter) return;
      // Container height
      var pheight = elt.clientHeight;
      // Content height
      var height = elt.scrollHeight;
      // Set scrollbar value
      scale = pheight / height;
      scrollbar.style.height = scale * 100 + '%';
      scrollbar.style.top = (elt.scrollTop / height * 100) + '%';
      scrollContainer.style.height = pheight + 'px';
      // No scroll
      if (pheight > height - .5) scrollContainer.classList.add('ol-100pc');
      else scrollContainer.classList.remove('ol-100pc');
    }
  }
  
  // Handle pointer down
  var onPointerDown = function(e) {
    // Prevent scroll
    if (e.target.classList.contains('ol-noscroll')) return;
    // Start scrolling
    moving = false;
    pos = e[page];
    dt = new Date();
    elt.classList.add('ol-move');
    // Prevent elt dragging
    e.preventDefault();
    // Listen scroll
    window.addEventListener('pointermove', onPointerMove);
    element.addListener(window, ['pointerup','pointercancel'], onPointerUp);
  }

  // Register scroll
  var onPointerMove = function(e) {
    if (pos !== false) {
      var delta = (isbar ? -1/scale : 1) * (pos - e[page]);
      moving = moving || Math.round(delta)
      elt[scroll] += delta;
      d = new Date();
      if (d-dt) {
        speed = (speed + delta / (d - dt))/2;
      }
      pos = e[page];
      dt = d;
      // Tell we are moving
      if (delta) onmove(true);
    } else {
      moving = true;
    }
  };
  
  // Animate scroll
  var animate = function(to) {
    var step = (to>0) ? Math.min(100, to/2) : Math.max(-100, to/2);
    to -= step;
    elt[scroll] += step;
    if (-1 < to && to < 1) {
      if (moving) setTimeout(function() { elt.classList.remove('ol-move'); });
      else elt.classList.remove('ol-move');
      moving = false;
      onmove(false);
    } else {
      setTimeout(function() {
        animate(to);
      }, 40);
    }
  }
  
  // Initialize scroll container for minibar
  var scrollContainer, scrollbar;
  if (options.vertical && options.minibar) {
    var init = function(b) {
      // only once
      elt.removeEventListener('pointermove', init);
      elt.parentNode.classList.add('ol-miniscroll');
      scrollbar = element.create('DIV');
      scrollContainer = element.create('DIV', {
        className: 'ol-scroll',
        html: scrollbar
      });
      elt.parentNode.insertBefore(scrollContainer, elt);
      // Move scrollbar
      scrollbar.addEventListener('pointerdown', function(e) {
        isbar = true;
        onPointerDown(e)
      });
      // Handle mousewheel
      if (options.mousewheel) {
        element.addListener(scrollContainer, 
          ['mousewheel', 'DOMMouseScroll', 'onmousewheel'], 
          function(e) { onMouseWheel(e) }
        );
        element.addListener(scrollbar, 
          ['mousewheel', 'DOMMouseScroll', 'onmousewheel'], 
          function(e) { onMouseWheel(e) }
        );
      }
      // Update on enter
      elt.parentNode.addEventListener('pointerenter', updateMinibar);
      // Update on resize
      window.addEventListener('resize', updateMinibar);
      // Update
      if (b!==false) updateMinibar();
    };
    // Allready inserted in the DOM
    if (elt.parentNode) init(false);
    // or wait when ready
    else elt.addEventListener('pointermove', init);
    // Update on scroll
    elt.addEventListener('scroll', function() {
      updateMinibar();
    });
  }

  // Enable scroll
  elt.style['touch-action'] = 'none';
  elt.style['overflow'] = 'hidden';
  elt.classList.add('ol-scrolldiv');
  
  // Start scrolling
  element.addListener(elt, ['pointerdown'], function(e) {
    isbar = false;
    onPointerDown(e)
  });

  // Prevet click when moving...
  elt.addEventListener('click', function(e) {
    if (elt.classList.contains('ol-move')) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // Stop scrolling
  var onPointerUp = function(e) {
    dt = new Date() - dt;
    if (dt>100 || isbar) {
      // User stop: no speed
      speed = 0;
    } else if (dt>0) {
      // Calculate new speed
      speed = ((speed||0) + (pos - e[page]) / dt) / 2;
    }
    animate(options.animate===false ? 0 : speed*200);
    pos = false;
    speed = 0;
    dt = 0;
    // Add class to handle click (on iframe / double-click)
    if (!elt.classList.contains('ol-move')) {
      elt.classList.add('ol-hasClick')
      setTimeout(function() { elt.classList.remove('ol-hasClick'); }, 500);
    } else {
      elt.classList.remove('ol-hasClick');
    }
    isbar = false;
    window.removeEventListener('pointermove', onPointerMove)
    element.removeListener(window, ['pointerup','pointercancel'], onPointerUp);
  };

  // Handle mousewheel
  var onMouseWheel = function(e) {
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    elt.classList.add('ol-move');
    elt[scroll] -= delta*30;
    elt.classList.remove('ol-move');
    return false;
  }
  if (options.mousewheel) { // && !elt.classList.contains('ol-touch')) {
    element.addListener(elt, 
      ['mousewheel', 'DOMMouseScroll', 'onmousewheel'], 
      onMouseWheel
    );
  }

  return { 
    refresh: updateMinibar
  }
};

/** Dispatch an event to an Element 
 * @param {string} eventName
 * @param {Element} element
 */
element.dispatchEvent = function (eventName, element) {
  var event;
  try {
    event = new CustomEvent(eventName);
  } catch(e) {
    // Try customevent on IE
    event = document.createEvent("CustomEvent");
    event.initCustomEvent(eventName, true, true, {});
  }
  element.dispatchEvent(event);
};

export default element
