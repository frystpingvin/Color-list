// This is where it all goes :)
var colorEls = document.querySelectorAll('[data-color]');

for (var i = 0; i < colorEls.length; i++) {
  colorCode = colorEls[i].getAttribute('data-color-picker');

  colorEls[i].addEventListener('click', function() {
    copyToClipboard(this);
  });
}

function copyToClipboard(el) {
  var copyInputEl   = document.querySelector('[data-copy-input]');
  var currentFocus  = document.activeElement;
  var copyValue     = '#' + el.getAttribute('data-color');

  copyInputEl.value = copyValue;
  copyInputEl.focus();
  copyInputEl.setSelectionRange(0, copyInputEl.value.length);

  var success;
  try {
    success = document.execCommand('copy');
    copyInputEl.blur();
  } catch (e) {
    success = false;
  }

  if (currentFocus && typeof currentFocus.focus === "function") {
    currentFocus.focus();
  }

  copyInputEl.textContent = '';
  notify(success);
  return success;
}

function notify(success) {
  var showDuration = 1500;
  // look for container
  var notifyContainer = document.getElementById('js-notify-container');

  // if we cant find container...
  if (notifyContainer === null) {
    // ...create one
    notifyContainer = document.createElement('div');
    notifyContainer.id = 'js-notify-container';
    notifyContainer.className = 'flash-container';
    document.body.appendChild(notifyContainer);
  }

  var notification = document.createElement('div');
  notification.className = 'js-notify flash';

  if (success === true) {
    notification.innerHTML = 'Color copied! ✌️';
    notification.className += ' flash--success';
  } else {
    notification.innerHTML = 'We couldn\'t copy the color! 😕';
    notification.className += ' flash--error';
  }
  notifyContainer.prepend(notification);
  setTimeout(function() {
    clearNotification(notification);
  }, showDuration);
}

function clearNotification(el) {
  el.parentNode.removeChild(el);
}

HTMLElement = typeof(HTMLElement) != 'undefiend' ? HTMLElement : Element;
HTMLElement.prototype.prepend = function(element) {
  if (this.firstChild) {
    return this.insertBefore(element, this.firstChild);
  } else {
    return this.appendChild(element);
  }
};
