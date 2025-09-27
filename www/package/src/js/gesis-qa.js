if (! window.location.host.startsWith('www.gesis.org')) {
  /*
  if (document.location.ancestorOrigins[0] === 'https://www.gesis.org') {
    console.log('inside iframe with outside window originating from www.gesis.org');
  }
  else {
    console.log('not inside iframe with outside window originating from www.gesis.org');
  }
  */
  
  window.addEventListener("message", messageEvent => {
    // console.log("slave: received message, handling ...");
    //var prevTarget = document;
    if (messageEvent && messageEvent.origin === "https://www.gesis.org") {
      document.querySelector('html').style.scrollBehavior = 'auto';
      if (messageEvent.data) {
        if (messageEvent.data.type === 'scroll') {
          window.scrollTo(messageEvent.data.data);
        }
        else if (messageEvent.data.type === 'navigation') {
          console.log('slave: navigating to: ', messageEvent.data.data);
          window.location = messageEvent.data.data.replace('https://www.gesis.org', window.location.origin);
        }
        else if (messageEvent.data.type === 'click') {
          console.log('slave: clicking to: ', messageEvent.data.data);
          document.elementFromPoint(messageEvent.data.data.pageX - window.pageXOffset, messageEvent.data.data.pageY - window.pageYOffset).click();
        }
        else if (messageEvent.data.type === 'mobile') {
          console.log('slave: setting up mobile style');
          // remove scroll bars to give mobile feeling
          var sheet = document.styleSheets[0];
          sheet.insertRule('* { scrollbar-width: none; }', sheet.cssRules.length);
          sheet.insertRule('::-webkit-scrollbar { display: none; }', sheet.cssRules.length);
        }
        /*
        else if (messageEvent.data.type === 'mousemove') {
          console.log('moving mouse to: ', messageEvent.data.data);
          target = document.elementFromPoint(messageEvent.data.data.pageX - window.pageXOffset, messageEvent.data.data.pageY - window.pageYOffset);
          if (target != prevTarget) {
              prevTarget.dispatchEvent(new MouseEvent('mouseleave'));
              prevTarget.dispatchEvent(new MouseEvent('mouseout'));
              target.dispatchEvent(new MouseEvent('mouseenter'));
              target.dispatchEvent(new MouseEvent('mouseover'));
              target.dispatchEvent(new MouseEvent('mousemove'));
              prevTarget = target;
          }
        }
        */
      }
    }
  }, false);
  
}
