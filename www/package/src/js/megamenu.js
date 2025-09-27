const $$ = selector => {
  const elementList = document.querySelectorAll(selector);
  return elementList.length === 1 ? elementList[0] : elementList;
}

class Megamenu {
  constructor() {
    this.mainElements = document.querySelectorAll("main");
    this.megamenus = document.querySelectorAll("nav.gs_megamenu_nav");
    this.toggleButton = document.querySelectorAll("#gs_mm_toggle_button-");
    //this.handleToggleMenuButton = this.handleToggleMenuButtonFunction.bind(this);
    this.remove = this.handleRemove.bind(this);
    this.isToggleButtonHandlerAttched = false;
  }
  //handleToggleMenuButtonFunction(event,button) {
    //const menu = this.parentNode.querySelectorAll("nav.gs_megamenu_nav");
    //menu[0].classList.toggle("active");
    //button.classList.toggle("active");
  //}
  init() {
    const handleBackdropClass = (elementsThatNeedBackdrop, addClass) => {
      if (addClass) {
        elementsThatNeedBackdrop.forEach(element => {
          element.classList.add("has-backdrop");
        });
      } else {
        elementsThatNeedBackdrop.forEach(element => {
          element.classList.remove("has-backdrop");
        });
      }
    }
    if (this.megamenus) {
      this.megamenus.forEach(megamenu => {
        const menuTrigger = megamenu.getElementsByClassName("menu-trigger");
        for (const trigger of menuTrigger) {
          trigger.addEventListener("click", event => {
            event.preventDefault();
            const submenu = trigger.parentNode.querySelector("ul");
            submenu.classList.toggle("active");
            trigger.classList.toggle("active");
          });
        }
        const firstLevelItems = megamenu.querySelectorAll("ul.gs_megamenu > li > a");
        const closeButtons = megamenu.querySelectorAll("button.close-button");
        const closeCurrentOpen = () => {
          const currentOpen = megamenu.querySelector("a[aria-expanded=true]");
          if (!currentOpen) {
            return;
          }
          currentOpen.setAttribute("aria-expanded", "false");
          handleBackdropClass(this.mainElements, false);
        }
        firstLevelItems.forEach(firstLevelItem => {
          firstLevelItem.addEventListener("click", (event) => {
            if (firstLevelItem.classList.contains("haschildren")) {
              event.preventDefault();
              //if (!isSmallScreenOrTouchOnly)
              closeCurrentOpen();
              firstLevelItem.setAttribute("aria-expanded", "true");
              handleBackdropClass(this.mainElements, true);
            }
          });
        });
        closeButtons.forEach(closeButton => {
          closeButton.addEventListener("click", () => {
            closeCurrentOpen();
          })
        })
      })
    }
    this.toggleButton.forEach(button => {
      if (!this.isToggleButtonHandlerAttched) {
        button.addEventListener("click", function(event) {
          const menu = this.parentNode.querySelectorAll("nav.gs_megamenu_nav");
          menu[0].classList.toggle("active");
          this.classList.toggle("active");
        });
        this.isToggleButtonHandlerAttched = true;
      }
    });
  }
  handleRemove() {
    this.toggleButton.removeEventListener("click", this.handleToggleMenuButton);
  }
}

class MegamenuVertical {
  constructor() {
    this.megamenuNavVert = document.querySelector("nav.gs_megamenu_nav_vert");
  }

  init() {
    if (this.megamenuNavVert) {
      try {
        const toggleButton = this.megamenuNavVert.parentNode.getElementsByClassName("gs_mm_toggle_button");
        const mobileOnly = this.megamenuNavVert.querySelector("section.mobile-only");
        toggleButton[0].remove();
        mobileOnly.remove();
      }
      catch {

      }
      for (const liLevel1 of this.megamenuNavVert.querySelector("ul").children) {
        if (liLevel1.querySelector("ul")) {
          const span = liLevel1.appendChild(document.createElement("span"));
          span.classList.add("menu-trigger");
          for (const liLevel2 of liLevel1.querySelector("ul").children) {
            if (liLevel2.querySelector("ul")) {
              const span2 = liLevel2.appendChild(document.createElement("span"));
              span2.classList.add("menu-trigger");
            }
          }
        }
      }

      //const menuTrigger = document.querySelectorAll(".menu-trigger");
      const menuTrigger = this.megamenuNavVert.getElementsByClassName("menu-trigger");

      for (const trigger of menuTrigger) {
        trigger.addEventListener("click", event => {
          event.preventDefault();
          const submenu = trigger.parentNode.querySelector("ul");
          submenu.classList.toggle("active");
          trigger.classList.toggle("active");
        });
      }
    }

  }

}

export {
  Megamenu,
  MegamenuVertical,
};
