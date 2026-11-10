
document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       01. 요소 선택
    ========================= */

    const menuOpen = document.querySelector(".menu-open");
    const menuClose = document.querySelector(".menu-close");
    const mobileMenu = document.querySelector(".mobile-menu");

    const brandBtn = document.querySelector(".mobile-brand-btn");
    const mobileBrand = document.querySelector(".mobile-brand");

    const categoryBtns = document.querySelectorAll(".category-btn");
    const mobileLinks = document.querySelectorAll(
        ".mobile-menu a"
    );

    if (!menuOpen || !menuClose || !mobileMenu ||
        !brandBtn || !mobileBrand) return;

    /* =========================
       02. 메뉴 열기
    ========================= */

    function openMenu() {
        mobileMenu.classList.add("active");
        document.body.classList.add("menu-active");

        menuOpen.setAttribute("aria-expanded", "true");
        menuClose.focus();
    }

    /* =========================
       03. 메뉴 닫기
    ========================= */

    function closeMenu() {
        mobileMenu.classList.remove("active");
        document.body.classList.remove("menu-active");

        menuOpen.setAttribute("aria-expanded", "false");

        mobileBrand.classList.remove("active");
        brandBtn.classList.remove("active");
        brandBtn.setAttribute("aria-expanded", "false");

        categoryBtns.forEach(btn => {
            btn.classList.remove("active");
            btn.parentElement.classList.remove("active");
            btn.setAttribute("aria-expanded", "false");
        });
    }

    menuOpen.addEventListener("click", openMenu);
    menuClose.addEventListener("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    mobileMenu.classList.remove("active");
    document.body.classList.remove("menu-active");

    menuOpen.setAttribute("aria-expanded", "false");
});

    /* =========================
       04. 브랜드 아코디언
    ========================= */

    brandBtn.addEventListener("click", () => {

        const isActive = mobileBrand.classList.toggle("active");

        brandBtn.classList.toggle("active", isActive);
        brandBtn.setAttribute("aria-expanded", String(isActive));

    });

    /* =========================
       05. 카테고리 아코디언
    ========================= */

    categoryBtns.forEach(btn => {

        btn.setAttribute("aria-expanded", "false");

        btn.addEventListener("click", () => {

            const category = btn.parentElement;
            const isActive = category.classList.contains("active");

            // 다른 카테고리 닫기
            categoryBtns.forEach(otherBtn => {
                otherBtn.classList.remove("active");
                otherBtn.parentElement.classList.remove("active");
                otherBtn.setAttribute("aria-expanded", "false");
            });

            // 선택한 카테고리 열기
            if (!isActive) {
                category.classList.add("active");
                btn.classList.add("active");
                btn.setAttribute("aria-expanded", "true");
            }

        });

    });

    /* =========================
       06. 링크 클릭 시 메뉴 닫기
    ========================= */

    mobileLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    /* =========================
       07. ESC 키로 닫기
    ========================= */

    document.addEventListener("keydown", e => {
        if (
            e.key === "Escape" &&
            mobileMenu.classList.contains("active")
        ) {
            closeMenu();
            menuOpen.focus();
        }
    });

    /* =========================
       08. PC 전환 시 초기화
    ========================= */

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1024) {
            closeMenu();
        }
    });

});
