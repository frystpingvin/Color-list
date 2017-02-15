// This is where it all goes :)
// RUN THROUGH COLORS AND ADD CLICK EVENT LISTENER
var colorEls = document.querySelectorAll('[data-color]');

for (var i = 0; i < colorEls.length; i++) {
  colorCode = colorEls[i].getAttribute('data-color-picker');

  colorEls[i].addEventListener('click', function() {
    copyToClipboard(this);
  });
}


// COPY TO CLIPBOARD
function copyToClipboard(el) {
  var currentFocus  = document.activeElement;
  var fakeInput     = createFakeInput();
  var copyValue     = '#' + el.getAttribute('data-color');

  fakeInput.value = copyValue;
  fakeInput.focus();
  fakeInput.setSelectionRange(0, fakeInput.value.length);

  var success;
  try {
    success = document.execCommand('copy');
    fakeInput.blur();
  } catch (e) {
    success = false;
  }

  if (currentFocus && typeof currentFocus.focus === "function") {
    currentFocus.focus();
  }

  clearEl(fakeInput);

  notify(success);
  return success;
}


// CREATE FAKE ELEMENT
function createFakeInput() {
  var fakeInput = document.createElement('textarea');
  // Prevent zooming on iOS
  fakeInput.style.fontSize = '12pt';
  fakeInput.style.border = '0';
  fakeInput.style.padding = '0';
  fakeInput.style.margin = '0';
  fakeInput.style.position = 'fixed';
  fakeInput.style.right = '-9999px';
  fakeInput.setAttribute('readonly', '');
  document.body.appendChild(fakeInput);
  return fakeInput;
}


// NOTIFY
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

  // Clear notification
  setTimeout(function() {
    clearEl(notification);

    // if notification container is empty, remove it.
    if (notifyContainer.innerHTML === "") {
      clearEl(notifyContainer);
    }
  }, showDuration);
}


// CLEAR ELEMENT
function clearEl(el) {
  el.parentNode.removeChild(el);
}


// PROTOTYPE FOR PREPENDING
HTMLElement = typeof(HTMLElement) != 'undefiend' ? HTMLElement : Element;
HTMLElement.prototype.prepend = function(element) {
  if (this.firstChild) {
    return this.insertBefore(element, this.firstChild);
  } else {
    return this.appendChild(element);
  }
};
