/* ===================== Text Animation Effects  ==========================*/
// Letter-by-Letter Masked Reveal
document.addEventListener("DOMContentLoaded", function () {
  const textElements = document.querySelectorAll(".reveal-text");

  textElements.forEach((element) => {
    const customDuration = element.getAttribute("data-duration") || "0.7s";
    const originalText = element.textContent.trim();
    element.innerHTML = ""; // Reset core HTML content

    const words = originalText.split(" ");
    let globalCharIdx = 0; // Seamless sequence counter for animation delays

    words.forEach((word, wordIdx) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "mask-word";

      const chars = word.split("");
      chars.forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.className = "mask-char";
        charSpan.textContent = char;

        // Dynamic Delay configuration sequence
        charSpan.style.animationDelay = `${globalCharIdx * 0.04}s`;
        charSpan.style.animationDuration = customDuration;

        wordSpan.appendChild(charSpan);
        globalCharIdx++;
      });

      element.appendChild(wordSpan);

      // Maintain exact line spacing words gap rules
      if (wordIdx < words.length - 1) {
        const space =
          document.createTextNode("\u00A0"); /* Strict Non-breaking space */
        element.appendChild(space);
      }
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const textObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animated");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  textElements.forEach((el) => textObserver.observe(el));
});

// Fade TypeWriter By Letters
document.addEventListener("DOMContentLoaded", function () {
  const allTypewriters = document.querySelectorAll(".dynamic-typewriter");

  allTypewriters.forEach((element) => {
    const speed = parseInt(element.getAttribute("data-speed")) || 50;
    const delay = parseInt(element.getAttribute("data-delay")) || 0;
    const thresholdValue =
      parseFloat(element.getAttribute("data-threshold")) || 0.4;

    const originalText = element.textContent.trim();
    element.textContent = ""; // Reset container

    // Pehle pooray text ko spaces se tod kar words ka array banaya
    const wordsArray = originalText.split(" ");
    let charArray = []; // Isme saare spans jama honge sequence wise typing ke liye

    wordsArray.forEach((word, wordIndex) => {
      // Har lafuz ke liye ek safe wrapper banaya
      const wordWrapper = document.createElement("span");
      wordWrapper.classList.add("word-wrapper");

      // Ab is lafuz ke ek ek character ko toda
      word.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.classList.add("fade-letter");
        charSpan.textContent = char;
        wordWrapper.appendChild(charSpan);
        charArray.push(charSpan); // Animation queue mein save kiya
      });

      element.appendChild(wordWrapper);

      // Agar yeh aakhri word nahi hai, toh words ke beech ka space maintain rakhne ke liye empty span
      if (wordIndex < wordsArray.length - 1) {
        const spaceSpan = document.createElement("span");
        spaceSpan.innerHTML = "&nbsp;";
        element.appendChild(spaceSpan);
      }
    });

    let charIndex = 0;
    let isAlreadyTriggered = false;

    function runFadeTypewriter() {
      if (isAlreadyTriggered) return;
      isAlreadyTriggered = true;

      setTimeout(() => {
        element.classList.add("start-typing");

        function fadeNextLetter() {
          if (charIndex < charArray.length) {
            charArray[charIndex].classList.add("letter-visible");
            charIndex++;
            setTimeout(fadeNextLetter, speed);
          }
        }
        fadeNextLetter();
      }, delay);
    }

    // Dynamic Intersection Observer
    const observerInstance = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio >= thresholdValue
          ) {
            runFadeTypewriter();
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: [0, thresholdValue, 1],
      },
    );

    observerInstance.observe(element);
  });
});

/* ===================== Text Animation Effects End  ==========================*/

/*=========================== Main Navbar =========================*/
document.addEventListener("DOMContentLoaded", function () {
  const searchWrapper = document.getElementById("searchWrapper");
  const letsTalkBtn = document.getElementById("letsTalkBtn");
  const searchInput = document.getElementById("searchInput");
  const closeSearchBtn = document.getElementById("closeSearchBtn");

  searchWrapper.addEventListener("click", function (e) {
    const triggerBtn = e.target.closest(".search-action-btn");

    if (window.innerWidth >= 992) {
      if (!searchWrapper.classList.contains("active") && triggerBtn) {
        e.preventDefault();
        searchWrapper.classList.add("active");
        letsTalkBtn.classList.add("hide-btn");
        setTimeout(() => searchInput.focus(), 300);
      }
    }
  });

  closeSearchBtn.addEventListener("click", function (e) {
    if (window.innerWidth >= 992) {
      e.stopPropagation();
      searchWrapper.classList.remove("active");
      letsTalkBtn.classList.remove("hide-btn");
      searchInput.value = "";
    }
  });
});

window.addEventListener("scroll", function () {
  const navbar = document.getElementById("mainNavbar");

  // 🔥 CHECK ENGINE: Yeh function sirf tab chalega jab aap HTML mein 'has-scroll-effect' class lagayenge
  if (navbar.classList.contains("has-scroll-effect")) {
    // Agar user 50px se zyada scroll karega
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
      navbar.classList.remove("navbar-transparent");
    } else {
      // User wapas top par chala jaye
      navbar.classList.add("navbar-transparent");
      navbar.classList.remove("navbar-scrolled");
    }
  }
});
/*=========================== Main Navbar End =========================*/

/*=========================================== Home Page Carousels ==================================================*/

/*=========================== Hero Section  =========================*/

// Hero Section Carousel
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".hero-slider", {
    loop: true,
    // effect: "card",
    // fadeEffect: {
    //   crossFade: true,
    // },
    speed: 1000,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".custom-swiper-button-next",
      prevEl: ".custom-swiper-button-prev",
    },
    watchSlidesProgress: true,
    observer: true,
    observeParents: true,

    on: {
      init: function () {
        this.el.classList.add("slide-direction-next");
      },
      slideChangeTransitionStart: function () {
        const container = this.el;
        const direction = this.swipeDirection;

        if (direction === "next") {
          container.classList.add("slide-direction-next");
          container.classList.remove("slide-direction-prev");
        } else if (direction === "prev") {
          container.classList.add("slide-direction-prev");
          container.classList.remove("slide-direction-next");
        }
      },
    },
  });
});

// Tooltip for Social Media Icons
const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]',
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
);
/*=========================== Hero Section End =========================*/

/*=========================== Caousel Section  =========================*/

// var swiper = new Swiper(".carousel-swiper", {
//   slidesPerView: 5,
//   spaceBetween: 20,
//   loop: true,
//   watchSlidesProgress: true,
//   speed: 1000,
//   autoplay: {
//     delay: 3000,
//     disableOnInteraction: false,
//   },
//   breakpoints: {
//     // Mobile screens
//     0: {
//       slidesPerView: 1,
//       spaceBetween: 25,
//     },
//     576: {
//       slidesPerView: 3,
//       spaceBetween: 25,
//     },
//     // Large screens / Desktop
//     992: {
//       slidesPerView: 5,
//       spaceBetween: 0,
//     },
//   },
// });
/*=========================== Caousel Section End =========================*/

/*=========================== Transforming Businesses Through AI Section  =========================*/
(function () {
  const slides = document.querySelectorAll(".insights-slide");
  if (!slides.length) return;

  let current = 0;
  const INTERVAL = 6000; // 6 seconds per slide

  function nextSlide() {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");

    // Ken Burns — restart animation on new active image
    const img = slides[current].querySelector("img");
    img.style.animation = "none";
    img.offsetHeight; // reflow trick — animation reset karta hai
    img.style.animation = "";
  }

  setInterval(nextSlide, INTERVAL);
})();

/*=========================== Counter Up on Scrolling  =========================*/
// (function () {
//   const countersSection = document.querySelector(".insights-counters");
//   if (!countersSection) return;

//   let started = false;

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting && !started) {
//           started = true;
//           startCounters();
//           observer.disconnect();
//         }
//       });
//     },
//     { threshold: 1 },
//   );

//   observer.observe(countersSection);

//   function startCounters() {
//     document.querySelectorAll(".counter-num").forEach((el) => {
//       const target = parseInt(el.dataset.target, 10);
//       const suffix = el.dataset.suffix || "";

//       if (window.countUp && window.countUp.CountUp) {
//         const cu = new countUp.CountUp(el, target, {
//           duration: 3.5,
//           suffix: suffix,
//           easingFn: function (t, b, c, d) {
//             return -c * (t /= d) * (t - 2) + b;
//           },
//         });
//         if (!cu.error) cu.start();
//       } else {
//         const duration = 7000;
//         const startTime = performance.now();

//         function easeOutCubic(t) {
//           return 1 - Math.pow(1 - t, 3);
//         }

//         function animate(currentTime) {
//           const elapsed = currentTime - startTime;
//           const progress = Math.min(elapsed / duration, 1);
//           const easedProgress = easeOutCubic(progress);
//           const current = Math.round(easedProgress * target);
//           el.textContent = current + suffix;
//           if (progress < 1) requestAnimationFrame(animate);
//         }

//         requestAnimationFrame(animate);
//       }
//     });
//   }
// })();
/*=========================== Insights Section End  =========================*/

/*=========================== Latest Projects Section =========================*/
var latestProjectSwiper = new Swiper(".expertise-slider", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 0,
  speed: 600,
  pagination: {
    el: ".expertise-slider .swiper-pagination",
    clickable: true,
  },
  navigation: {
    prevEl: ".expertise-prev",
    nextEl: ".expertise-next",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
/*=========================== Latest Projects Section End =========================*/

/*=========================== Testimonial Section =========================*/
var whyChooseSlider = new Swiper(".why-choose-slider", {
  slidesPerView: 2,
  // spaceBetween: 40,
  loop: true,

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  navigation: {
    prevEl: ".why-choose-slider-prev",
    nextEl: ".why-choose-slider-next",
  },

  pagination: {
    el: ".why-choose-slider-pagination",
    clickable: true,
  },

  breakpoints: {
    0: { slidesPerView: 1, spaceBetween: 0 },
    992: { slidesPerView: 3, spaceBetween: 40 },
  },
});

/*=========================== Testimonial Section End =========================*/

/*=========================================== Home Page Carousels End ==================================================*/

/*=========================================== About Page Carousels ==================================================*/

// Company Overview Section Slider

var swiper = new Swiper(".company-overview-img-slider", {
  grabCursor: true,
  effect: "creative",
  loop: true,

  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
    reverseDirection: true, // Autoplay backward chal raha hai
  },

  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      translate: ["100%", 0, 0],
    },
  },
});
document
  .querySelector(".company-overview-slider-next")
  ?.addEventListener("click", function () {
    swiper.slidePrev();
  });

document
  .querySelector(".company-overview-slider-prev")
  ?.addEventListener("click", function () {
    swiper.slideNext();
  });

Fancybox.bind("[data-fancybox='gallery']", {
  Infinite: true,
  Images: {
    Panzoom: {
      maxScale: 1,
    },
  },

  Thumbs: false,
  Drag: false,

  Toolbar: {
    display: {
      left: ["infobar"],
      main: [],
      right: ["close"],
    },
  },

  Carousel: {
    Navigation: true,
  },

  // Custom core DOM elements templates
  tpl: {
    /* 🔥 Add predefined "jost-font" class to custom buttons templates strings */
    prev: `
      <button class="f-button is-prev jost-font" data-carousel-prev title="Previous">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
    `,
    next: `
      <button class="f-button is-next jost-font" data-carousel-next title="Next">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </button>
    `,
  },
});
/*=========================================== About Page Carousels End ==================================================*/

/*=========================================== Industries Inner Page Carousels ==================================================*/
var innerPageLatestProjectSlider = new Swiper(
  ".inner-page-latest-project-slider",
  {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: "auto",
    speed: 600,

    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 120,
      modifier: 1,
      scale: 0.82,
      slideShadows: false,
    },

    navigation: {
      prevEl: ".inner-page-latest-project-prev",
      nextEl: ".inner-page-latest-project-next",
    },

    breakpoints: {
      0: {
        coverflowEffect: {
          rotate: 0,
          stretch: 15,
          depth: 150,
          scale: 0.8,
        },
      },
      992: {
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 1,
          scale: 0.82,
        },
      },
    },

    on: {
      init: positionArrows,
      resize: positionArrows,
      slideChange: function () {
        setTimeout(positionArrows, 50);
      },
    },
  },
);

function positionArrows() {
  const swiperContainer = document.querySelector(
    ".inner-page-latest-project-slider",
  );
  const prev = document.querySelector(".inner-page-latest-project-prev");
  const next = document.querySelector(".inner-page-latest-project-next");

  if (!swiperContainer || !prev || !next) return;

  const containerW = swiperContainer.offsetWidth;
  const center = containerW / 2;
  const arrowW = 48;
  const isMobile = window.innerWidth < 992;

  if (isMobile) {
    prev.style.left = "16px";
    next.style.left = "auto";
    next.style.right = "16px";
    return;
  }

  const slideW = 300;
  const scale = 0.82;

  const sideSlideCenter = center + slideW / 2 + (slideW * scale) / 2;
  const nextLeft = sideSlideCenter - arrowW / 2;
  const prevLeft = center - slideW / 2 - (slideW * scale) / 2 - arrowW / 2;

  prev.style.left = prevLeft + "px";
  next.style.left = nextLeft + "px";
  prev.style.right = "auto";
  next.style.right = "auto";
}

/*=========================================== Industries Inner Page Carousels End ==================================================*/