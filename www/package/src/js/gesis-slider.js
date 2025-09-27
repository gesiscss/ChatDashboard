import {
  tns,
  initializeSliderOptions
} from './accessible-slider/src/tiny-slider.js';

// expects a NodeList of slider-type HTML elements, e.g.
// sliderElements = document.querySelectorAll('.gs_3col_slider, .gs_single_slider, .gs_news_compact_slider, .gs_single_slider_wrapper');
const initializeSliders = function(sliderElements) {
  const sliders = [];
  const sliderElementsArray = Array.from(sliderElements);
  
  {
    // Slider with up to 4 items at once
    const multiColumnSliders = sliderElementsArray.filter(
      sliderElement => sliderElement.classList.contains('gs_3col_slider')
    );
    for (const multiColumnSlider of multiColumnSliders) {
      const additionalOptions = {
        responsive: {
          576: { // >= 576px: bootstrap sm and larger
            items: 2
          },
          768: { // >= 768px: bootstrap md and larger
            items: 3
          },
          992: { // >= 992px: bootstrap lg and larger
            items: 4
          }
        },
        gutter: 16, // equals 16px = 1rem
      };
      const options = initializeSliderOptions(multiColumnSlider, additionalOptions);
      const slider = tns(options);
      sliders.push(slider);
    }
  }
  
  {
    // banner slider, testimonials, news, and RSS feed (all with 1 item at once)
    const oneColumnSliders = sliderElementsArray.filter(
      sliderElement => (
        sliderElement.classList.contains('gs_single_slider') ||
        sliderElement.classList.contains('gs_news_compact_slider')
      )
    );
    for (const oneColumnSlider of oneColumnSliders) {
      const options = initializeSliderOptions(oneColumnSlider);
      const slider = tns(options);
      sliders.push(slider);
    }
  }
  
  {
    // ul-li sliders inside wrapper
    const ulLiSliderWrappers = sliderElementsArray.filter(
      sliderElement => sliderElement.classList.contains('gs_single_slider_wrapper')
    );
    for (const ulLiSliderWrapper of ulLiSliderWrappers) {
      const maybeHeader = ulLiSliderWrapper.querySelector('.headline header');
      const containerLabelledby = maybeHeader ? maybeHeader.id : false;
      
      // ul-li-based slider tiles are problematic because HTML validation fails with
      // "Error: Bad value tabpanel for attribute role on element li."
      // Therefore, the following steps replace  the ul element and its li children to divs.
      const wrappedUlLiSlider = ulLiSliderWrapper.querySelector('ul');
      const replacedListContainer = replaceTag(wrappedUlLiSlider, 'div');
      replacedListContainer.querySelectorAll(':scope > li').forEach( li => replaceTag(li, 'div') );
      
      const options = initializeSliderOptions(replacedListContainer, {containerLabelledby});
      const slider = tns(options);
      sliders.push(slider);
    }
  }
  
  return sliders;
};

export {
  tns,
  initializeSliderOptions,
  initializeSliders,
};
