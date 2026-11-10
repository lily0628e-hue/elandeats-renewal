
document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       01. HERO FADE SLIDE
    ========================= */

    const heroImages = document.querySelectorAll(".hero-img img");

    if (heroImages.length > 1) {

        let heroIndex = 0;

        heroImages[0].classList.add("active");

        function changeHeroImage() {

            heroImages[heroIndex].classList.remove("active");

            heroIndex = (heroIndex + 1) % heroImages.length;

            heroImages[heroIndex].classList.add("active");
        }

        // 4초마다 이미지 전환
        setInterval(changeHeroImage, 4000);
    }


    /* =========================
       02. CAREER INFINITE SLIDER
    ========================= */

    const careerTrack = document.querySelector(".career-img");

    if (careerTrack && !careerTrack.dataset.cloned) {

        const originalItems = Array.from(careerTrack.children);

        originalItems.forEach((item) => {

            const clone = item.cloneNode(true);

            clone.setAttribute("aria-hidden", "true");

            clone.querySelectorAll("img").forEach((img) => {
                img.alt = "";
            });

            careerTrack.appendChild(clone);
        });

        careerTrack.dataset.cloned = "true";
    }


/* =========================
   03. OUR VALUE SCROLL ANIMATION
========================= */

const valueSection = document.querySelector(".value");

if (valueSection) {

    const valueObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    // 섹션 진입 시 애니메이션 실행
                    entry.target.classList.add("show");
                } else {
                    // 섹션 이탈 시 애니메이션 초기화
                    entry.target.classList.remove("show");
                }

            });

        },
        {
            threshold: 0.2
        }
    );

    valueObserver.observe(valueSection);
}


});
