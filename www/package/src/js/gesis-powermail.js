const setupParsley = function() {
  // FIXME as of 2023-03-31 and earlier, these window.ParsleyConfig are not taken
  // into account anymore
  //
  // configure Parsley (used by Powermail) for better accessibility (see https://stackoverflow.com/a/22591965/923560 )
  // until Parsley provides better accessibility out-of-the-box (see https://github.com/guillaumepotier/Parsley.js/issues/640 ).
  window.ParsleyConfig = {
    errorsWrapper: '<ul class="parsley-errors-list" aria-live="assertive"></ul>',
    trigger: 'keyup',
    validationThreshold: 0 // see https://github.com/guillaumepotier/Parsley.js/issues/1179
  };
};

const setupPowermail = function() {
  // For accessibility and usability reasons,
  // show input placeholder texts below input field. Also see gs_form.cssp.
  const powermailPlaceholders = document.querySelectorAll('.tx-powermail *[placeholder]');
  for (const powermailPlaceholder of powermailPlaceholders) {
    let placeholderDiv = document.createElement('div');
    placeholderDiv.textContent = (language === 'de'? 'Anmerkung: ' : 'Remark: ') + powermailPlaceholder.getAttribute('placeholder');
    placeholderDiv.classList.add('powermail-placeholder');
    placeholderDiv.id = powermailPlaceholder.id + 'placeholder';
    powermailPlaceholder.parentNode.insertBefore(placeholderDiv, powermailPlaceholder.nextSibling);
  }
  
  // See https://github.com/einpraegsam/powermail/issues/547
  const powermailValidationTriggers = document.querySelectorAll('[data-parsley-trigger]');
  for (const powermailValidationTrigger of powermailValidationTriggers) {
    powermailValidationTrigger.setAttribute('data-parsley-trigger', 'keyup');
  }
  
  // FIXME as of 2023-03-31 and earlier, these window.Parsley is not taken
  // into account anymore
  //
  // Enhance Powermail / Parsley form accessibility by adding aria-invalid
  // attributes during input validation,
  // ( see http://parsleyjs.org/doc/index.html#psly-usage-global-configuration#events-list )
  // until Parsley provides better accessibility out-of-the-box (see https://github.com/guillaumepotier/Parsley.js/issues/640 ).
  if (window.Parsley && window.Parsley.on) {
    window.Parsley.on('field:error', function() {
      this.$element.attr('aria-invalid', 'true');
    });
    window.Parsley.on('field:success', function() {
      this.$element.attr('aria-invalid', 'false');
    });
  }
};

export { setupParsley, setupPowermail };
