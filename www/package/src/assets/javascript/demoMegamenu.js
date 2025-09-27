const demoMegamenu = () => {
  const megamenus = document.querySelectorAll("nav.gs_megamenu_nav");
	const mainElements = document.querySelectorAll("main");

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

	megamenus.forEach(megamenu => {
		const firstLevelItems = megamenu.querySelectorAll("ul.gs_megamenu > li > a");
		const closeButtons = megamenu.querySelectorAll("button.close-button");
	
		const closeCurrentOpen = () => {
			const currentOpen = megamenu.querySelector("a[aria-expanded=true]");
			if(! currentOpen){
				return;
			}
	
			currentOpen.setAttribute("aria-expanded", "false");
			handleBackdropClass(mainElements, false);
		}
	
		firstLevelItems.forEach(firstLevelItem => {
			firstLevelItem.addEventListener("click", (event) => {
				event.preventDefault();
				closeCurrentOpen();
				firstLevelItem.setAttribute("aria-expanded", "true");
				handleBackdropClass(mainElements, true);
			});
		});
	
		closeButtons.forEach(closeButton => {
			closeButton.addEventListener("click", () => {
				closeCurrentOpen();
			})
		})
	})
} 

export default demoMegamenu;