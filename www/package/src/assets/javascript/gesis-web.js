import {Menubutton}                         from "../../../node_modules/@gesis-web/gesis-web-frontend/src/js/gesis-megamenu.js";
import {fadeMainContent, unfadeMainContent} from "../../../node_modules/@gesis-web/gesis-web-frontend/src/js/gesis-helpers.js";
import {initializeTabContainers}            from "../../../node_modules/@gesis-web/gesis-web-frontend/src/js/gesis-tabs.js";

import "bootstrap/dist/js/bootstrap.bundle.js";

import demoMegamenu from "./demoMegamenu.js";
import lightbox from "lightbox2/dist/js/lightbox.js";

document.addEventListener("DOMContentLoaded", () => {
	lightbox.option({
		albumLabel       : "%1/%2",
		disableScrolling : true
	});
  const accordionButtons = document.querySelectorAll("details summary");
  const accordions = initializeAccordions(accordionButtons);

  const tabContainerElements = document.querySelectorAll(".tabs");
  const tabs = initializeTabContainers(tabContainerElements);

  const menuButtonsElements = document.querySelectorAll(".gs_mm_toggle_button");
  for (const menuButtonElement of menuButtonsElements) {
    const menuButtonElementId = menuButtonElement.id;
    const menubutton = new Menubutton(
      menuButtonElement,
      function () {
        fadeMainContent(this.mainController.popupMenu.parentNav, this.mainController.domNode);
      },
      function () {
        unfadeMainContent(this.mainController.popupMenu.parentNav, this.mainController.domNode);
      }
    );
    menubutton.init();
  }

  demoMegamenu();
});
