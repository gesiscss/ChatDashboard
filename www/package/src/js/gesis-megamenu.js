import {
	isSmallScreenOrTouchOnly,
	isAppleMobileBrowser,
	fadeMainContent,
	unfadeMainContent,
	appendDebug,
} from "./gesis-helpers.js";
/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/

const addToFirstChars = function(array, node) {
	const textContent = node.textContent.trim();
	array.push(textContent.substring(0, 1).toLowerCase());
};

const getIndexFirstChars = function(startIndex, char) {
	for (var i = startIndex; i < this.firstChars.length; i++)
		if (char === this.firstChars[ i ])
			return i;

	return -1;
};

const keyCode = Object.freeze({
	"TAB"      : 9,
	"RETURN"   : 13,
	"ESC"      : 27,
	"SPACE"    : 32,
	"PAGEUP"   : 33,
	"PAGEDOWN" : 34,
	"END"      : 35,
	"HOME"     : 36,
	"LEFT"     : 37,
	"UP"       : 38,
	"RIGHT"    : 39,
	"DOWN"     : 40
});

const userIntents = Object.freeze({
  VISIT_LINK                               : "VISIT_LINK",
  GO_TO_PREVIOUS_ITEM                      : "GO_TO_PREVIOUS_ITEM",
  GO_TO_NEXT_ITEM                          : "GO_TO_NEXT_ITEM",
  GO_TO_FIRST_ITEM                         : "GO_TO_FIRST_ITEM",
  GO_TO_LAST_ITEM                          : "GO_TO_LAST_ITEM",
  OPEN_SUBMENU                             : "OPEN_SUBMENU",
  OPEN_SUBMENU_AND_GO_TO_SUBMENU_LAST_ITEM : "OPEN_SUBMENU_AND_GO_TO_SUBMENU_LAST_ITEM",
  CLOSE_MENU                               : "CLOSE_MENU",
  SEARCH_ITEM                              : "SEARCH_ITEM",
  TAB_OUT                                  : "TAB_OUT",
  UNDEFINED                                : "UNDEFINED"
});

const handleListItemClick = function(event) {
	if (event.target === this.parentLi) {
		if (this.popupMenu) {
			const currentOpenState = this.popupMenu.controller.isExpanded();
			if (true === currentOpenState) {
				this.popupMenu.close();
				this.popupMenu.setFocusToController();
			}
			else {
				this.popupMenu.open();
				this.popupMenu.setFocusToFirstItem();
			}
		}
  }
};

/*
 * A Menubutton instance (button element) has one popupMenu of type Menubar:
   * A Menubar instance (ul element) ...
	 * ... has a direct parent element (nav element "navElement")
	 * ... contains one or more li elements, each of which in turn must contain one 'a' element (type MenubarItem ... "...bar..."!) and may contain one ul element
	   * A MenubarItem instance ('a' element), if it has a ul element as next sibling, will have this sibling as popupMenu of type PopupMenu:
		* A PopupMenu instance (ul element) ...
		  * ... contains one or more li elements, each of which in turn must contain one 'a' element (type MenuItem ... NO "...bar..."!) and may contain one ul element
			* A MenuItem instance ('a' element), if it has a ul element as next sibling, will have this sibling as popupMenu of type PopupMenu:
			  * (from here recursion)
*/
class Menubutton {
	constructor(domNode, onOpen, onClose) {
		this.domNode    = domNode;
		this.isDisabled = false;
		this.popupMenu  = false;
		this.hasFocus   = false;
		this.hasHover   = false;
		this.onOpen     = onOpen  || function() {};
		this.onClose    = onClose || function() {};
	}

	init() {
		this.domNode.setAttribute("aria-haspopup", "true");

		this.domNode.addEventListener("keydown",   this.handleKeydown.bind(this));
		this.domNode.addEventListener("click",     this.handleClick.bind(this));
		this.domNode.addEventListener("focus",     this.handleFocus.bind(this));
		this.domNode.addEventListener("blur",      this.handleBlur.bind(this));
		this.domNode.addEventListener("mouseover", this.handleMouseover.bind(this));
		this.domNode.addEventListener("mouseout",  this.handleMouseout.bind(this));

		// initialize pop up menus
		const popupMenu = document.getElementById(this.domNode.getAttribute('aria-controls'));
		if (!popupMenu)
			return;

		this.popupMenu = new Menubar(popupMenu, this, this.onOpen, this.onClose);
		this.popupMenu.init();
	}
	
	getDisabled() {
		return this.isDisabled;
	}
	
	setDisabled(disabled) {
		this.isDisabled       = disabled;
		this.domNode.disabled = disabled;
	}
	
	handleKeydown(event) {
		var flag = false;

		switch (event.keyCode) {
			case keyCode.SPACE:
			case keyCode.RETURN:
			case keyCode.DOWN:
				if (!this.popupMenu) {
					this.popupMenu.open();
					this.popupMenu.setFocusToFirstItem();
				}
				flag = true;
				break;

			case keyCode.UP:
				if (this.popupMenu) {
					this.popupMenu.open();
					this.popupMenu.setFocusToLastItem();
					flag = true;
				}
				break;

			default:
				break;
		}

		if (flag) {
			event.stopPropagation();
			event.preventDefault();
		}
	}
	handleClick() {
		if (this.domNode.getAttribute("aria-expanded") == "true") {
			this.popupMenu.close(true);
		}
		else {
			this.popupMenu.open();
			this.popupMenu.setFocusToFirstItem();
		}
	}
	handleFocus() {
		this.popupMenu.hasFocus = true;
	}
	handleBlur() {
		this.popupMenu.hasFocus = false;
	}
	handleMouseover() {
		this.hasHover = true;
	}
	handleMouseout() {
		this.hasHover = false;
	}
}

// controllerObj: the Menubutton representing the hamburger button element (visible on small screens)
class Menubar {
	constructor(domNode, controllerObj, onOpen, onClose) {
		// Check whether menubarNode is a DOM element
		if (!domNode instanceof Element)
			throw new TypeError(domNode + " is not a DOM Element.");
		if ((!domNode.parentElement) || (domNode.parentElement.tagName !== "NAV"))
			throw new Error(domNode + " is not wrapped in a nav element.");

		this.parentNav = domNode.parentElement;
		// Check whether menubarNode has descendant elements
		if (domNode.childElementCount === 0)
			// if no children, then disable controllerObj / hamburger button
			controllerObj.setDisabled(true);

		// Check whether all menubarNodeChildren have each an 'a' element as first child
		const menubarNodeChildren = domNode.children;
		for (const menubarNodeChild of menubarNodeChildren) {
			const menubarNodeFirstGrandchild = menubarNodeChild.firstElementChild;
			if (menubarNodeFirstGrandchild && menubarNodeFirstGrandchild.tagName !== "A")
				throw new Error(domNode + " has child elements that are not A elements.");
		}

		this.isMenubar = true;

		// TODO rename to this.menubarNode
		// domNode is of element type "ul"
		this.domNode = domNode;

		this.controller = controllerObj;
		this.mainController = controllerObj;

		this.onOpen = onOpen;

		this.onClose = onClose;

		this.menubarItems = []; // See Menubar init method

		this.firstChars = []; // See Menubar init method


		// TODO rename to this.firstMenubarItem
		this.firstItem = null; // See Menubar init method


		//TODO rename to this.lastMenubarItem
		this.lastItem = null; // See Menubar init method

		this.hasFocus = false; // See MenubarItem handleFocus, handleBlur
		this.hasHover = false; // See Menubar handleMouseover, handleMouseout
		
		// if this.directlyPopUp is true, then menubar items don't need
		// a hover thresold to pop up. This improves usability when hover-
		// navigating between menubarItems and their individual pop-ups,
		// as the user is already in a mode of investigating pop-ups contents
		this.directlyPopUp = false;
	}
	/*
	*   @method Menubar.prototype.init
	*
	*   @desc
	*       Adds ARIA role to the menubar node
	*       Traverse menubar children for A elements to configure each A element as a ARIA menuitem
	*       and populate menuitems array. Initialize firstItem and lastItem properties.
	*/
	init() {
		// compared to PopupMenu, Menubar does not add its own mouseover and mouseout
		// event handlers.
		// Traverse the element children of menubarNode: configure each with
		// menuitem role behavior and store reference in menubarItems array.

		const menubarNodeChildren = this.domNode.children;
		for (const menubarNodeChild of menubarNodeChildren) {
			// a menubarNodeChild is an "li" with at least one nested "a" element and 
			// possibly a another nested "ul" element (submenu)
			const menubarItemNode = menubarNodeChild.firstElementChild;
			if (menubarItemNode && menubarItemNode.tagName === "A") {
				const menubarItem = new MenubarItem(menubarItemNode, this, this.onOpen, this.onClose, this.mainController);
				menubarItem.init();
				this.menubarItems.push(menubarItem);
				addToFirstChars(this.firstChars, menubarItemNode);
			}
		}

		// Use populated menubarItems to initialize firstItem and lastItem.
		const numItems = this.menubarItems.length;
		if (numItems > 0) {
			this.firstItem = this.menubarItems[0];

			// initially, make firstMenubarItem accessible by usertab,
			// see https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
			// see https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-12
			this.firstItem.domNode.tabIndex = 0;

			this.lastItem = this.menubarItems[numItems - 1];
		}

		this.domNode.addEventListener("focusin", this.handleContainedFocusChange.bind(this));
		this.domNode.addEventListener("focusout", this.handleContainedFocusChange.bind(this));
	}
	handleContainedFocusChange(event) {
		const thisContainer = this.domNode;
		const eventType = event.type;
		if ("focusin" === eventType) {
			const previouslyFocusedElement = event.relatedTarget;
			const wasFocusPreviouslyAlreadyInsideContainer = thisContainer.contains(previouslyFocusedElement);
			if (wasFocusPreviouslyAlreadyInsideContainer) {
			}
			else {
				this.open();
			}
		}
		else if ("focusout" === eventType) {
			const newlyFocusedElement = event.relatedTarget;
			const isFocusStillInsideContainer = thisContainer.contains(newlyFocusedElement);
			if (isFocusStillInsideContainer) {
			}
			else if (newlyFocusedElement === this.controller.domNode) {
				/* this "else if" exists in order to ignore focusout close()ing when the
				*  newlyFocusedElement is the pop-up button. The root event would be a
				*  mouse click/touch event which first fires this focusout event, then
				*  automatically a follow-up click event on the button. Not handling this
				*  case would case the menu to close and immediatly open again to to the
				*  follow-up click event on the button.
				*  Debugging this in devtools is challeging, because step-debugging
				*  swallows away the click event.
				*/
			}
			else if (isAppleMobileBrowser()) {
				/*
				What an annoying workaround for Apple iOS devices (iPhone, iPad)!
				On these devices, button elements never receive a focus event / become
				document.activeElement, therefore above strategy for testing on
				newlyFocusedElement === this.controller.domNode
				will not work in order to determine if the toggling button was pressed in
				order to reliable determine that the popup is intended to be closed.
				
				As a workaround and to still avoid double-toggling, in the following, first
				the button is deactivated, therefore disabling its click event listener (i.e.
				deactivating its own toggling mechanism).
				
				Then we manually close the pop-up.
				
				Then we leverage a setTimeout(..) which callbacks after all UI events have
				finished. In that callback, the button gets activated again.
				
				iOS browsers make up to 10% percent of gesis.org visitors according to
				etracker as of 2021-10-22, and due to Apple's policies, third-party browsers
				such as Chrome and Firefox have to use Apple's WebKit engine:
				https://www.theregister.com/2021/10/22/safari_risks_becoming_the_new_ie/
				
				Here is a debugging testbed. Keep in mind that step-debugging UI events
				has its own Heisenbug challenges, as breakpoint pauses may change or swallow
				up events in the usual UI event flow of focusin, focusout, focus, blur,
				mousedown, mouseup, and click events. Also keep in mind that DevTools device
				emulation of Apple devices is not faithful to real hardware. Chrome's Blink
				engine still behaves blinky with respect to UI events and not lik
				Apple iOS' WebKit engine even when iPhone or iPad emulation is activated.
				
		  ### BEGIN testbed ###
		  <button id="debug" tabindex="0">Button</button>
		  <div id="debug-output"></div>
		  
		  <script>
		  const debugButton = document.getElementById('debug');
		  const debugOutput = document.getElementById('debug-output');
		  
		  isAppleMobileBrowser = function() {
			return [
			  'iPad Simulator',
			  'iPhone Simulator',
			  'iPod Simulator',
			  'iPad',
			  'iPhone',
			  'iPod'
			].includes(navigator.platform)
			// iPad on iOS 13 detection
			|| (navigator.userAgent.includes("Mac") && "ontouchend" in document);
		  };
		  
		  appendDebug = function(text) {
			const debugOutput = document.getElementById('debug-output');
			if (debugOutput) {
			  const p = document.createElement('p');
			  const content = document.createElement('code');
			  content.textContent = text;
			  p.appendChild(content);
			  debugOutput.appendChild(p);
			}
		  };
		  
		  debugButton.addEventListener('click', event => {
			console.log('click');
			appendDebug('click');
		  });
		  debugButton.addEventListener('focus', event => {
			console.log('focus');
			appendDebug('focus');
		  });
		  debugButton.addEventListener('focus', event => {
			console.log('focus');
			appendDebug('focus');
		  });
		  debugButton.addEventListener('focusin', event => {
			const previouslyFocusedElement = event.relatedTarget;
			console.log('focusin. previouslyFocusedElement:', previouslyFocusedElement);
			appendDebug('focusin. previouslyFocusedElement: ' + (previouslyFocusedElement? previouslyFocusedElement.toString(): 'nulli'));
		  });
		  debugButton.addEventListener('focusout', event => {
			const newlyFocusedElement = event.relatedTarget;
			console.log('focusout. newlyFocusedElement:', newlyFocusedElement);
			appendDebug('focusout. newlyFocusedElement: ' + (newlyFocusedElement ? newlyFocusedElement.toString(): 'nulli'));
		  });
		  debugButton.addEventListener('blur', event => {
			console.log('blur');
			appendDebug('blur');
		  });
		  appendDebug('version 13');
		  appendDebug('isAppleMobileBrowser(): ' + isAppleMobileBrowser());
		  </script>
		  ### END testbed ###
				
				Further reading:
				https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus
				https://zellwk.com/blog/inconsistent-button-behavior/
				*/
				appendDebug("Apple iOS workaround. Disabling button");
				this.controller.domNode.disabled = true;

				// see https://stackoverflow.com/a/7760499/923560
				setTimeout(() => {
					appendDebug("Apple iOS workaround. Reenabling button");
					this.controller.domNode.disabled = false;
				}, 0);

				this.close();
			}
			else {
				this.close();
			}
		}
	}
	open() {
		this.controller.domNode.setAttribute("aria-expanded", "true");
		/* As MenuBar has role="menu" or "menubar", and as these roles don't permit
		 * aria-expanded, here a proprietary attribute "data-open" is additionally added.
		 * This attribute is used for CSS rules to conditionally hide or show the "main menu"
		 * when toggling the menubutton. As of 2022, CSS is not yet expressive enough to write
		 * a CSS rule which matches HTML elements which are not part of the same root line
		 * (i.e., in general, menubutton and root menu are not in a anchestor-descendant or
		 * sibling relationship which could be expressed with CSS)
		 * see https://w3c.github.io/aria/#menu
		 */
		this.domNode.setAttribute("data-open", "true");
		this.onOpen();
	}
	close() {
		this.menubarItems.forEach(menubarItem => {
			if (menubarItem.popupMenu) {
				menubarItem.popupMenu.close(true, true);
			}
		});
		this.controller.domNode.setAttribute("aria-expanded", "false");
		this.domNode.setAttribute("data-open", "false");
		this.onClose();
	}
	setFocusToController() {
		this.controller.domNode.focus();
	}
	// REFACTOR rename to setFocusToMenubarItem = function (toBeFocusedMenubarItem)
	setFocusToItem(newItem) {
		const anyMenuBarItemWasTabbaleAndExpanded = this.menubarItems.some(mbi => (mbi.domNode.tabIndex == 0) && (mbi.isExpanded()));

		this.menubarItems.forEach(mbi => {
			mbi.domNode.tabIndex = -1;
			mbi.popupMenu ? mbi.isExpanded() && mbi.popupMenu.close() : null;
		});

		newItem.domNode.focus();
		newItem.domNode.tabIndex = 0;

		if (anyMenuBarItemWasTabbaleAndExpanded && newItem.popupMenu) {
			newItem.popupMenu.open();
		}
	}
	setFocusToFirstItem() {
		this.setFocusToItem(this.firstItem);
	}
	setFocusToLastItem() {
		this.setFocusToItem(this.lastItem);
	}
	setFocusToPreviousItem(currentItem) {
		let newItem;

		if (currentItem === this.firstItem) {
			newItem = this.lastItem;
		}
		else {
			const index = this.menubarItems.indexOf(currentItem);
			newItem = this.menubarItems[index - 1];
		}

		this.setFocusToItem(newItem);
	}
	setFocusToNextItem(currentItem) {
		let newItem;
		if (currentItem === this.lastItem) {
			newItem = this.firstItem;
		}
		else {
			const index = this.menubarItems.indexOf(currentItem);
			newItem = this.menubarItems[index + 1];
		}

		this.setFocusToItem(newItem);
	}
	setFocusByFirstCharacter(currentItem, char) {
		var start, index, char = char.toLowerCase();

		// Get start index for search based on position of currentItem
		start = this.menubarItems.indexOf(currentItem) + 1;
		if (start === this.menubarItems.length) {
			start = 0;
		}

		// Check remaining slots in the menu
		index = this.getIndexFirstChars(start, char);

		// If not found in remaining slots, check from beginning
		if (index === -1) {
			index = this.getIndexFirstChars(0, char);
		}

		// If match was found...
		if (index > -1) {
			this.setFocusToItem(this.menubarItems[index]);
		}
	}
	
	getIndexFirstChars = getIndexFirstChars;
}


// RENAME domNode to menubarItemNode
class MenubarItem {
	constructor(domNode, menubar, onOpen, onClose, mainController) {

		// menubar is Menubar controller
		this.menubar = menubar;

		// domNode / menubarItemNode is of element type 'a'
		this.domNode = domNode;

		// if null, then no popupMenu exists.
		// Otherwise, this.popupMenu is the PopupMenu controller for popup menu
		this.popupMenu = null;

		this.hasFocus = false;
		this.hasHover = false;

		this.isMenubarItem = true;

		this.onOpen = onOpen;
		this.onClose = onClose;

		this.mainController = mainController;
		this.popupMenuHoverThresholdTimeoutID = null;
	}
	init() {
		// by default, menubarItems are focusable only by javascript, not tabpress
		// https://www.w3.org/TR/wai-aria-practices/#kbd_roving_tabindex
		// Menubar's init method gives first menubarItem a tabindex of 0, therefore
		// that first menubarItem will be focusable by javascript AND tabpress
		this.domNode.tabIndex = -1;

		this.parentLi = this.domNode.parentNode;
		this.parentLi.addEventListener("click", this.handleListItemClick.bind(this));
		this.parentLi.addEventListener("mousedown", event => event.preventDefault()); // prevent currently focused element to loose focus to nirvana

		this.domNode.addEventListener("keydown", this.handleKeydown.bind(this));
		this.domNode.addEventListener("focus", this.handleFocus.bind(this));
		this.domNode.addEventListener("blur", this.handleBlur.bind(this));
		this.domNode.addEventListener("mouseover", this.handleMouseover.bind(this));
		this.domNode.addEventListener("mouseleave", this.handleMouseleave.bind(this));

		// Initialize pop up menus
		var maybeSiblingUlPopupMenuElement = this.domNode.nextElementSibling;
		if (maybeSiblingUlPopupMenuElement && maybeSiblingUlPopupMenuElement.tagName === 'UL') {
			this.popupMenu = new PopupMenu(maybeSiblingUlPopupMenuElement, this, true, this.onOpen, this.onClose, this.mainController);
			this.popupMenu.init();
		}

	}
	
	hoverThresholdReached() {
	  this.popupMenuHoverThresholdTimeoutID = null;
	  this.menubar.directlyPopUp = true;
	  this.popupMenu.open();
	}
	
	isExpanded() {
		const isExpanded = this.domNode.getAttribute('aria-expanded') === 'true';
		return isExpanded;
	}
	setExpanded(value) {
		if (value) {
			this.domNode.setAttribute('aria-expanded', 'true');
		}
		else {
			this.domNode.setAttribute('aria-expanded', 'false');
		}
	}
	handleKeydown(event) {
		const char = event.key;

		let preventDefaultBrowserKeydownBehavior = false;

		function isPrintableCharacter(str) {
			return str.length === 1 && str.match(/\S/);
		}

		let userIntent;
		switch (event.keyCode) {
			case keyCode.RETURN:
				userIntent = userIntents.VISIT_LINK;
				break;

			case keyCode.SPACE:
				userIntent = userIntents.OPEN_SUBMENU;
				break;

			case keyCode.DOWN:
				userIntent = isSmallScreenOrTouchOnly() ? userIntents.GO_TO_NEXT_ITEM : userIntents.OPEN_SUBMENU;
				break;

			case keyCode.LEFT:
				userIntent = isSmallScreenOrTouchOnly() ? userIntents.CLOSE_MENU : userIntents.GO_TO_PREVIOUS_ITEM;
				break;

			case keyCode.RIGHT:
				userIntent = isSmallScreenOrTouchOnly() ? userIntents.OPEN_SUBMENU : userIntents.GO_TO_NEXT_ITEM;
				break;

			case keyCode.UP:
				userIntent = isSmallScreenOrTouchOnly() ? userIntents.GO_TO_PREVIOUS_ITEM : userIntents.OPEN_SUBMENU_AND_GO_TO_SUBMENU_LAST_ITEM;
				break;

			case keyCode.HOME:
			case keyCode.PAGEUP:
				userIntent = userIntents.GO_TO_FIRST_ITEM;
				break;

			case keyCode.END:
			case keyCode.PAGEDOWN:
				userIntent = userIntents.GO_TO_LAST_ITEM;
				break;

			case keyCode.TAB:
				userIntent = userIntents.TAB_OUT;
				break;

			case keyCode.ESC:
				userIntent = userIntents.CLOSE_MENU;
				break;

			default:
				if (isPrintableCharacter(char)) {
					userIntent = userIntents.SEARCH_ITEM;
				}
				else {
					userIntent = userIntents.UNDEFINED;
				}
				break;
		}

		switch (userIntent) {
			case userIntents.VISIT_LINK:
				break;

			case userIntents.OPEN_SUBMENU:
				if (this.popupMenu) {
					this.setExpanded(true);
					this.popupMenu.open();
					this.popupMenu.setFocusToFirstItem();
					preventDefaultBrowserKeydownBehavior = true;
				}
				break;

			case userIntents.GO_TO_PREVIOUS_ITEM:
				this.menubar.setFocusToPreviousItem(this);
				preventDefaultBrowserKeydownBehavior = true;
				break;

			case userIntents.GO_TO_NEXT_ITEM:
				this.menubar.setFocusToNextItem(this);
				preventDefaultBrowserKeydownBehavior = true;
				break;

			case userIntents.OPEN_SUBMENU_AND_GO_TO_SUBMENU_LAST_ITEM:
				if (this.popupMenu) {
					this.setExpanded(true);
					this.popupMenu.open();
					this.popupMenu.setFocusToLastItem();
					preventDefaultBrowserKeydownBehavior = true;
				}
				break;

			case userIntents.GO_TO_FIRST_ITEM:
				this.menubar.setFocusToFirstItem();
				preventDefaultBrowserKeydownBehavior = true;
				break;

			case userIntents.GO_TO_LAST_ITEM:
				this.menubar.setFocusToLastItem();
				preventDefaultBrowserKeydownBehavior = true;
				break;

			case userIntents.TAB_OUT:
				if (this.popupMenu) {
					this.setExpanded(false);
					this.popupMenu.close(true);
				}
				break;

			case userIntents.CLOSE_MENU:
				if (this.popupMenu) {
					this.setExpanded(false);
					this.popupMenu.close(true);
				}
				this.menubar.close();
				this.menubar.setFocusToController();
				break;

			case userIntents.SEARCH_ITEM:
				this.menubar.setFocusByFirstCharacter(this, char);
				preventDefaultBrowserKeydownBehavior = true;
				break;

			default:
				break;
		}

		if (preventDefaultBrowserKeydownBehavior) {
			event.stopPropagation();
			event.preventDefault();
		}
	}
	handleFocus() {
		this.menubar.hasFocus = true;
	}
	handleBlur() {
		this.menubar.hasFocus = false;
	}
	handleMouseover() {
		this.hasHover = true;
		if (this.popupMenu && !isSmallScreenOrTouchOnly()) {
		  if (this.menubar.directlyPopUp === true) {
			this.popupMenu.open();
		  }
		  else {
			this.popupMenuHoverThresholdTimeoutID =
			setTimeout(() => this.hoverThresholdReached(), 200);
		  }
		}
	}
	handleMouseleave(event) {
		const newHoveredElement = event.relatedTarget;
		this.hasHover = false;

		if (this.popupMenu && !isSmallScreenOrTouchOnly()) {
			if (!this.popupMenu.domNode.contains(newHoveredElement)) {
			  // the pointer has moved outside the menubar item AND
			  // has not moved into its own popup menu
			  if (this.popupMenuHoverThresholdTimeoutID) {
				  clearTimeout(this.popupMenuHoverThresholdTimeoutID);
				  this.popupMenuHoverThresholdTimeoutID = null;
				}
				this.popupMenu.close(false);
			}
			if (!this.menubar.domNode.contains(newHoveredElement)) {
			  // the pointer has moved outside the menubar item AND
			  // has not moved to any element within the menubar,
			  // including the menubar itself, sibling menu items,
			  // and their own popups
			  this.menubar.directlyPopUp = false;
			}
		}
	}
	handleListItemClick = handleListItemClick;
}


// RENAME domNode to popupMenuNode
// RENAME controllerObj to controllingWidget
class PopupMenu {
	constructor(domNode, controllerObj, isMainPopup, onOpen, onClose, mainController) {

		// Check whether domNode is a DOM element
		if (!domNode instanceof Element) {
			throw new TypeError(`${domNode} is not a DOM Element.`);
		}
		// Check whether domNode has child elements
		if (domNode.childElementCount === 0) {
			throw new Error(`${domNode} has no child nodes.`);
		}

		// Check whether all popupMenuNodeChildren have each an 'a' element as first child
		const popupMenuNodeChildren = domNode.children; // popupMenuNodeChildren is an array of li elements
		for (const popupMenuNodeChild of popupMenuNodeChildren) { // popupMenuNodeChild is an li element
			const popupMenuNodeFirstGrandchild = popupMenuNodeChild.firstElementChild; // by convention, popupMenuNodeChild.firstElementChild is an 'a' element
			if (popupMenuNodeFirstGrandchild && popupMenuNodeFirstGrandchild.tagName !== 'A') {
				throw new Error(`${domNode} has descendant elements that are not '<a>' elements.`);
			}
		}

		this.isMenubar   = false;
		this.isMainPopup = isMainPopup;

		// domNode / popupMenuNode is of element type 'ul'
		this.domNode = domNode;

		// this.controller is either a MenubarItem or a MenuItem instance
		this.controller     = controllerObj;
		this.mainController = mainController;

		                       // TODO Rename to menuItems
		this.menuitems  = [];  // See PopupMenu init method
		this.firstChars = [];  // See PopupMenu init method

		this.firstItem = null;  // See PopupMenu init method
		this.lastItem  = null;  // See PopupMenu init method

		this.hasFocus = false; // See MenuItem handleFocus, handleBlur
		this.hasHover = false; // See PopupMenu handleMouseover, handleMouseout

		this.onOpen  = onOpen || function() {};
		this.onClose = onClose || function() {};
	}
	/*
	*   @method PopupMenu.prototype.init
	*
	*   @desc
	*       Add domNode event listeners for mouseover and mouseout. Traverse
	*       domNode children to configure each menuitem and populate menuitems
	*       array. Initialize firstItem and lastItem properties.
	*/
	init() {
		if (this.isMainPopup)
			this.domNode.addEventListener("mouseleave", this.handleMouseleave.bind(this));

		// Traverse the element children of domNode: configure each with
		// menuitem role behavior and store reference in menuitems array.
		const popupMenuNodeChildren = this.domNode.children;
		for (const popupMenuNodeChild of popupMenuNodeChildren) {
			const menuItemNode = popupMenuNodeChild.firstElementChild;
			if (menuItemNode && menuItemNode.tagName === "A") {
				const menuItem = new MenuItem(menuItemNode, this, this.mainController);
				menuItem.init();
				this.menuitems.push(menuItem);
				addToFirstChars(this.firstChars, menuItemNode);
			}
		}

		// Use populated menuitems array to initialize firstItem and lastItem.
		const numItems = this.menuitems.length;
		if (numItems > 0) {
			this.firstItem = this.menuitems[0];
			this.lastItem = this.menuitems[numItems - 1];
			// no tabIndex fiddely like in Menubar init because popupmenus should
			// not participate in tabbability
			// see https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-12
		}

	}
	handleMouseleave(event) {
		if (!isSmallScreenOrTouchOnly()) {
			this.hasHover = false;
			this.close(false);
			if (this.controller instanceof MenubarItem) {
			  const menubar = this.controller.menubar;
			  const newHoveredElement = event.relatedTarget;
			  if (! menubar.domNode.contains(newHoveredElement)) {
				// the pointer has moved outside the popupMenu AND
				// has not moved to any element within the menubar,
				// including the menubar itself, menu items,
				// their own popups
				menubar.directlyPopUp = false;
			  }
			}
		}
	}
	setFocusToController(command, flag) {

		if (typeof command !== "string")
			command = "";

		function setFocusToMenubarItem(controller, close) {
			while (controller) {
				if (controller.isMenubarItem) {
					controller.domNode.focus();

					return controller;
				}
				else {
					if (close)
						controller.menu.close(true);
					controller.hasFocus = false;
				}
				controller = controller.menu.controller;
			}
			return false;
		}

		if (command === "") {
			if (this.controller && this.controller.domNode)
				this.controller.domNode.focus();
			return;
		}

		if (!this.controller.isMenubarItem) {
			this.controller.domNode.focus();
			this.close();

			if (command === 'next') {
				var menubarItem = setFocusToMenubarItem(this.controller, false);
				if (menubarItem) {
					menubarItem.menu.setFocusToNextItem(menubarItem, flag);
				}
			}
		}
		else {
			if (command === 'previous') {
				this.controller.menu.setFocusToPreviousItem(this.controller, flag);
			}
			else if (command === 'next') {
				this.controller.menu.setFocusToNextItem(this.controller, flag);
			}
		}

	}
	setFocusToFirstItem() {
		this.firstItem.domNode.focus();
	}
	setFocusToLastItem() {
		this.lastItem.domNode.focus();
	}
	setFocusToPreviousItem(currentItem) {
		var index;

		if (currentItem === this.firstItem) {
			this.lastItem.domNode.focus();
		}
		else {
			index = this.menuitems.indexOf(currentItem);
			this.menuitems[index - 1].domNode.focus();
		}
	}
	setFocusToNextItem(currentItem) {
		var index;

		if (currentItem === this.lastItem) {
			this.firstItem.domNode.focus();
		}
		else {
			index = this.menuitems.indexOf(currentItem);
			this.menuitems[index + 1].domNode.focus();
		}
	}
	setFocusByFirstCharacter(currentItem, char) {
		var start, index, char = char.toLowerCase();

		// Get start index for search based on position of currentItem
		start = this.menuitems.indexOf(currentItem) + 1;
		if (start === this.menuitems.length) {
			start = 0;
		}

		// Check remaining slots in the menu
		index = this.getIndexFirstChars(start, char);

		// If not found in remaining slots, check from beginning
		if (index === -1) {
			index = this.getIndexFirstChars(0, char);
		}

		// If match was found...
		if (index > -1) {
			this.menuitems[index].domNode.focus();
		}
	}
	open() {
		if (!isSmallScreenOrTouchOnly()) {
			// only fade background if not responsive layout, as button trigger already takes care of fading
			this.onOpen();
		}
		this.controller.setExpanded(true);
	}
	close(force, shallCloseRecursively) {
		if (!isSmallScreenOrTouchOnly()) {
			// only unfade background if not responsive layout, as button trigger already takes care of fading
			this.onClose();
		}
		this.controller.setExpanded(false);
		if (shallCloseRecursively) {
			this.menuitems.forEach(menuItem => {
				if (menuItem.popupMenu) {
					menuItem.popupMenu.close(true, true);
				}
			});
		}
	}
	
	getIndexFirstChars = getIndexFirstChars;
}


class MenuItem {
	constructor(domNode, menuObj, mainController) {
		// domNode is of element type 'a'
		this.domNode = domNode;

		// menu / menuObj is containing PopupMenu controller
		this.menu = menuObj;

		this.mainController = mainController;

		this.popupMenu = false;
		this.isMenubarItem = false;
	}
	init() {
		// MenuItem's domNode shall not be tabbable, but can still be given focus with .focus()
		// see https://www.w3.org/TR/wai-aria-practices/#wai-aria-roles-states-and-properties-13
		this.domNode.tabIndex = -1;

		this.parentLi = this.domNode.parentNode;
		this.parentLi.addEventListener('click', this.handleListItemClick.bind(this));
		this.parentLi.addEventListener('mousedown', event => event.preventDefault()); // prevent currently focused element to loose focus to nirvana

		this.domNode.addEventListener('keydown', this.handleKeydown.bind(this));
		this.domNode.addEventListener('focus', this.handleFocus.bind(this));
		this.domNode.addEventListener('blur', this.handleBlur.bind(this));

		var nextElement = this.domNode.nextElementSibling;

		if (nextElement && nextElement.tagName === 'UL') {
			this.popupMenu = new PopupMenu(nextElement, this, false, null, null, this.mainController);
			this.popupMenu.init();
		}

	}
	handleKeydown(event) {
		var tgt = event.currentTarget, char = event.key, flag = false, clickEvent;

		function isPrintableCharacter(str) {
			return str.length === 1 && str.match(/\S/);
		}

		switch (event.keyCode) {
			case keyCode.RETURN:
				break;

			case keyCode.UP:
				this.menu.setFocusToPreviousItem(this);
				flag = true;
				break;

			case keyCode.DOWN:
				this.menu.setFocusToNextItem(this);
				flag = true;
				break;

			case keyCode.LEFT:
				if (isSmallScreenOrTouchOnly()) {
					this.menu.setFocusToController();
				}
				else {
					// to implement https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-12
					// on full screen popup menubar menus, when navigating left, directly open previous popup menu
					// this.menu.setFocusToController('previous', true);
					// but because this is actually confusing in navigation, we don't implement this behavior
					this.menu.setFocusToController();
				}
				this.menu.close(true);
				this.setExpanded(false);
				flag = true;
				break;

			case keyCode.RIGHT:
			case keyCode.SPACE:
				if (this.popupMenu) {
					this.setExpanded(true);
					this.popupMenu.open();
					this.popupMenu.setFocusToFirstItem();
				}
				flag = true;
				break;

			case keyCode.HOME:
			case keyCode.PAGEUP:
				this.menu.setFocusToFirstItem();
				flag = true;
				break;

			case keyCode.END:
			case keyCode.PAGEDOWN:
				this.menu.setFocusToLastItem();
				flag = true;
				break;

			case keyCode.ESC:
				this.menu.setFocusToController();
				this.setExpanded(false);
				this.menu.close(true);
				flag = true;
				break;

			case keyCode.TAB:
				// when tabbing, tab out of menu and close all open menus
				// see https://www.w3.org/TR/wai-aria-practices/#keyboard-interaction-12
				let currentMenu = this.menu;
				while (currentMenu && !currentMenu.isMenubar) {
					currentMenu.setFocusToController();
					currentMenu.close(true);
					currentMenu = currentMenu.controller.menu;
				}
				break;

			default:
				if (isPrintableCharacter(char)) {
					this.menu.setFocusByFirstCharacter(this, char);
					flag = true;
				}
				break;
		}

		if (flag) {
			event.stopPropagation();
			event.preventDefault();
		}
	}
	handleFocus() {
		this.menu.hasFocus = true;
	}
	handleBlur() {
		this.menu.hasFocus = false;
	}
	
	handleListItemClick = handleListItemClick;
	
	isExpanded() {
		const isExpanded = this.domNode.getAttribute('aria-expanded') === 'true';
		return isExpanded;
	}
	setExpanded(value) {
		if (value) {
			this.domNode.setAttribute('aria-expanded', 'true');
		}
		else {
			this.domNode.setAttribute('aria-expanded', 'false');
		}
	}
}

const fadeMainContentAndHighlightThisMegamenuOnOpenHandler = function() {
  fadeMainContent(this.mainController.popupMenu.parentNav, this.mainController.domNode);
};

const unfadeMainContentAndHighlightThisMegamenuOnCloseHandler = function() {
  unfadeMainContent(this.mainController.popupMenu.parentNav, this.mainController.domNode);
};

// menubuttonElements = document.getElementsByClassName('gs_mm_toggle_button');
const initializeMegamenus = function(menubuttonElements, onOpen, onClose) {
  const menubuttons = [];
  
  for (const menubuttonElement of menubuttonElements) {
	const menubutton = new Menubutton(menubuttonElement, onOpen, onClose);
	menubutton.init();
	menubuttons.push(menubutton);
  }
  
  return menubuttons;
};

export {
  Menubutton,
  initializeMegamenus,
  fadeMainContentAndHighlightThisMegamenuOnOpenHandler,
  unfadeMainContentAndHighlightThisMegamenuOnCloseHandler,
};
