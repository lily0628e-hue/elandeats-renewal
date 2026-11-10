//-------------헤더---------------//

const header = document.querySelector(".header");
const navigation = header.querySelector(".gnb");
const menuButton = header.querySelector(".menu-btn");
const closeButton = header.querySelector(".mobile-menu-close");
const submenuButtons = header.querySelectorAll(".submenu-toggle");
const mobileScreen = window.matchMedia("(width < 768px)");

function setSubmenus(isOpen, selectedButton = null) {
    submenuButtons.forEach(function (button) {
        const isSelected = selectedButton === null || selectedButton === button;
        button.setAttribute("aria-expanded", String(isOpen && isSelected));
    });
}

function setDesktopDropdown(isOpen) {
    header.classList.toggle("is-dropdown-open", isOpen);
    setSubmenus(isOpen);
}

function setMobilePanel(isOpen) {
    header.classList.toggle("is-mobile-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    setSubmenus(false);
}

menuButton.addEventListener("click", function () {
    setMobilePanel(true);
    closeButton.focus();
});

closeButton.addEventListener("click", function () {
    setMobilePanel(false);
    menuButton.focus();
});

submenuButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        if (!mobileScreen.matches) return;

        const wasOpen = button.getAttribute("aria-expanded") === "true";
        setSubmenus(!wasOpen, button);
    });
});
navigation.addEventListener("pointerenter", function (event) {
    if (!mobileScreen.matches && event.pointerType === "mouse") {
        setDesktopDropdown(true);
    }
});

header.addEventListener("pointerleave", function (event) {
    if (!mobileScreen.matches && event.pointerType === "mouse") {
        setDesktopDropdown(false);
    }
});

header.addEventListener("focusout", function (event) {
    if (!mobileScreen.matches && !header.contains(event.relatedTarget)) {
        setDesktopDropdown(false);
    }
});

document.addEventListener("click", function (event) {
    if (!mobileScreen.matches && !header.contains(event.target)) {
        setDesktopDropdown(false);
    }
});

header.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;

    if (mobileScreen.matches && header.classList.contains("is-mobile-open")) {
        setMobilePanel(false);
        menuButton.focus();
    } else if (header.classList.contains("is-dropdown-open")) {
        const submenu = event.target.closest(".sub-menu");

        if (submenu) {
            submenu.previousElementSibling.focus();
        }

        setDesktopDropdown(false);
    }
});

mobileScreen.addEventListener("change", function () {
    setMobilePanel(false);
    setDesktopDropdown(false);
});
//-------------히어로메뉴---------------//

// 메인 히어로 자동 슬라이드 + 동그라미 버튼
const heroTrack = document.querySelector(".hero-track");
const heroSlides = document.querySelectorAll(".hero-track > .hero-slide");
const heroDots = document.querySelectorAll(".main-hero .hero-dot");

if (heroTrack && heroSlides.length > 1) {
    let heroIndex = 0;
    let heroTimer;

    function showHeroSlide(index) {
        heroIndex = index;
        heroTrack.style.transform = `translateX(${-index * 100}%)`;

        heroDots.forEach(function (dot, dotIndex) {
            if (dotIndex === index) {
                dot.setAttribute("aria-current", "true");
            } else {
                dot.removeAttribute("aria-current");
            }
        });
    }

    function startHeroTimer() {
        clearInterval(heroTimer);

        heroTimer = setInterval(function () {
            let nextIndex = heroIndex + 1;

            if (nextIndex === heroSlides.length) {
                nextIndex = 0;
            }

            showHeroSlide(nextIndex);
        }, 4000);
    }

    heroDots.forEach(function (dot, index) {
        dot.addEventListener("click", function () {
            showHeroSlide(index);
            startHeroTimer();
        });
    });

    const mainHero = heroTrack.closest(".main-hero");

    mainHero.addEventListener("mouseenter", function () {
        clearInterval(heroTimer);
    });

    mainHero.addEventListener("mouseleave", startHeroTimer);

    showHeroSlide(0);
    startHeroTimer();
}

//-------------브랜드메뉴----------------//
// ABOUT 영역 등장 효과
const aboutSection = document.querySelector(".brand-about");

if (aboutSection) {
    const aboutObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    // 사진과 글 보여주기
                    entry.target.classList.add("is-visible");

                    // 한 번 실행 후 감지 종료
                    aboutObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0,
            rootMargin: "0px 0px -200px 0px"
        }
    );

    // 등장 전 상태 적용
    aboutSection.classList.add("is-ready");

    // 화면에 들어오는지 감지
    aboutObserver.observe(aboutSection);
}




//-------------사이드메뉴----------------//

const sideTrack = document.querySelector(".side-track");
const sidePrev = document.querySelector(".side-prev");
const sideNext = document.querySelector(".side-next");
const sideTablet = window.matchMedia("(max-width: 1024px)");

let sidePage = 0;

function getSideLastPage() {
    const cardCount = sideTrack.querySelectorAll(".side-item").length;
    const cardsPerPage = sideTablet.matches ? 2 : 4;

    return Math.max(0, Math.ceil(cardCount / cardsPerPage) - 1);
}

// 다음 화살표
sideNext.addEventListener("click", function (event) {
    event.preventDefault();

    sidePage = sidePage >= getSideLastPage() ? 0 : sidePage + 1;
    moveSideMenu();
});

// 이전 화살표
sidePrev.addEventListener("click", function (event) {
    event.preventDefault();

    sidePage = sidePage <= 0 ? getSideLastPage() : sidePage - 1;
    moveSideMenu();
});

// PC와 태블릿 사이에서 화면 크기가 바뀌면 첫 페이지로 이동
sideTablet.addEventListener("change", function () {
    sidePage = 0;
    moveSideMenu();
});

function moveSideMenu() {
    sideTrack.style.transform = `translateX(-${sidePage * 100}%)`;
}

//-------------시그니처메뉴----------------//


// 시그니처 영역 반복 등장 효과
const signatureSection = document.querySelector(".signature");

if (signatureSection) {
    const signatureObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    entry.target.classList.remove("is-visible");
                }
            });
        },
        {
            threshold: 0,
            rootMargin: "0px 0px -100px 0px"
        }
    );

    signatureSection.classList.add("is-ready");
    signatureObserver.observe(signatureSection);
}

//-------------스토어메뉴----------------//

// 매장 찾기 영역 반복 등장 효과
const storeSection = document.querySelector(".store-finder");

if (storeSection) {
    const storeObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                } else {
                    entry.target.classList.remove("is-visible");
                }
            });
        },
        {
            threshold: 0,
            rootMargin: "0px 0px -100px 0px"
        }
    );

    storeSection.classList.add("is-ready");
    storeObserver.observe(storeSection);
}