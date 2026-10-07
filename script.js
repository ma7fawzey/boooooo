/* =========================================================
   LOADER
========================================================= */

const loader = document.getElementById("loader");
const loaderBar = document.getElementById("loaderBar");
const loaderPercent = document.getElementById("loaderPercent");

let loading = 0;

const loadingTimer = setInterval(() => {

    loading += Math.random() * 7;

    if (loading >= 100) {

        loading = 100;

        clearInterval(loadingTimer);

        setTimeout(() => {

            loader.classList.add("hide");

        }, 600);

    }

    loaderBar.style.width = `${loading}%`;

    loaderPercent.textContent =
        `${Math.floor(loading)}%`;

}, 80);


/* =========================================================
   PASSWORD
========================================================= */

const password = document.getElementById("password");
const enterButton = document.getElementById("enterButton");

const login = document.getElementById("login");
const website = document.getElementById("website");

const wrongPassword =
    document.getElementById("wrongPassword");


function unlockWebsite() {

    if (password.value === "1909") {

        wrongPassword.classList.remove("show");

        login.style.opacity = "0";

        login.style.transform = "scale(1.08)";

        setTimeout(() => {

            login.style.display = "none";

            website.classList.remove("hidden");

            document.body.style.overflowX = "hidden";

            startAnimations();

        }, 1200);

    }

    else {

        wrongPassword.classList.add("show");

        password.animate(
            [
                {
                    transform: "translateX(0)"
                },

                {
                    transform: "translateX(-12px)"
                },

                {
                    transform: "translateX(12px)"
                },

                {
                    transform: "translateX(-7px)"
                },

                {
                    transform: "translateX(7px)"
                },

                {
                    transform: "translateX(0)"
                }
            ],
            {
                duration: 450
            }
        );

    }

}


enterButton.addEventListener(
    "click",
    unlockWebsite
);


password.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            unlockWebsite();

        }

    }
);


/* =========================================================
   CURSOR
========================================================= */

const cursorDot =
    document.querySelector(".cursor-dot");

const cursorCircle =
    document.querySelector(".cursor-circle");

let mouseX = 0;
let mouseY = 0;

let circleX = 0;
let circleY = 0;


document.addEventListener(
    "mousemove",
    event => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        cursorDot.style.left =
            `${mouseX}px`;

        cursorDot.style.top =
            `${mouseY}px`;

    }
);


function cursorAnimation() {

    circleX +=
        (mouseX - circleX) * .12;

    circleY +=
        (mouseY - circleY) * .12;

    cursorCircle.style.left =
        `${circleX}px`;

    cursorCircle.style.top =
        `${circleY}px`;

    requestAnimationFrame(
        cursorAnimation
    );

}

cursorAnimation();


/* =========================================================
   CURSOR HOVER
========================================================= */

document
    .querySelectorAll(
        "button, img, .photo-frame, .small-photo, .three-grid > div"
    )
    .forEach(element => {

        element.addEventListener(
            "mouseenter",
            () => {

                document.body
                    .classList
                    .add("cursor-hover");

            }
        );

        element.addEventListener(
            "mouseleave",
            () => {

                document.body
                    .classList
                    .remove("cursor-hover");

            }
        );

    });


/* =========================================================
   START
========================================================= */

function startAnimations() {

    setupObserver();

    updateProgress();

    updateCounter();

}


/* =========================================================
   SCROLL OBSERVER
========================================================= */

function setupObserver() {

    const scenes =
        document.querySelectorAll(
            ".scene"
        );

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");

                    }

                });

            },
            {
                threshold: .15
            }
        );

    scenes.forEach(scene => {

        observer.observe(scene);

    });

}


/* =========================================================
   PROGRESS
========================================================= */

const progressBar =
    document.getElementById(
        "progressBar"
    );


window.addEventListener(
    "scroll",
    () => {

        updateProgress();

        updateCounter();

        parallax();

    }
);


function updateProgress() {

    const scrollTop =
        window.scrollY;

    const height =
        document.documentElement
            .scrollHeight -
        window.innerHeight;

    const percentage =
        (scrollTop / height) * 100;

    progressBar.style.width =
        `${percentage}%`;

}


/* =========================================================
   COUNTER
========================================================= */

const counter =
    document.getElementById(
        "counter"
    );


function updateCounter() {

    const scenes =
        document.querySelectorAll(
            "[data-number]"
        );

    let closest = null;

    let distance = Infinity;


    scenes.forEach(scene => {

        const rect =
            scene.getBoundingClientRect();

        const sceneCenter =
            rect.top +
            rect.height / 2;

        const screenCenter =
            window.innerHeight / 2;

        const currentDistance =
            Math.abs(
                sceneCenter -
                screenCenter
            );

        if (
            currentDistance <
            distance
        ) {

            distance =
                currentDistance;

            closest =
                scene;

        }

    });


    if (closest) {

        const number =
            String(
                closest.dataset.number
            ).padStart(2, "0");

        counter.textContent =
            number;

    }

}


/* =========================================================
   PARALLAX
========================================================= */

function parallax() {

    const images =
        document.querySelectorAll(
            `
            .photo-frame img,
            .split-image img,
            .center-photo img,
            .big-memory-photo img
            `
        );


    images.forEach(image => {

        const rect =
            image.getBoundingClientRect();

        const distance =
            rect.top +
            rect.height / 2 -
            window.innerHeight / 2;

        const movement =
            distance * -.025;

        image.style.transform =
            `translateY(${movement}px) scale(1.04)`;

    });

}


/* =========================================================
   TILT
========================================================= */

const tiltElements =
    document.querySelectorAll(
        `
        .photo-frame,
        .center-photo,
        .final-photo
        `
    );


tiltElements.forEach(element => {

    element.addEventListener(
        "mousemove",
        event => {

            const rect =
                element.getBoundingClientRect();

            const x =
                (event.clientX -
                    rect.left) /
                rect.width;

            const y =
                (event.clientY -
                    rect.top) /
                rect.height;

            const rotateX =
                (y - .5) * -4;

            const rotateY =
                (x - .5) * 4;

            element.style.transform =
                `
                perspective(1200px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale(1.01)
                `;

        }
    );


    element.addEventListener(
        "mouseleave",
        () => {

            element.style.transform =
                "none";

        }
    );

});


/* =========================================================
   IMAGE LOAD
========================================================= */

document
    .querySelectorAll("img")
    .forEach(image => {

        image.addEventListener(
            "dragstart",
            event => {

                event.preventDefault();

            }
        );

    });


/* =========================================================
   KEYBOARD EASTER EGG
========================================================= */

let secret = "";


document.addEventListener(
    "keydown",
    event => {

        secret +=
            event.key.toLowerCase();

        if (secret.length > 15) {

            secret =
                secret.slice(-15);

        }

        if (
            secret.includes("love")
        ) {

            document.body.animate(
                [
                    {
                        filter:
                            "brightness(1)"
                    },

                    {
                        filter:
                            "brightness(1.4)"
                    },

                    {
                        filter:
                            "brightness(1)"
                    }
                ],
                {
                    duration: 1000
                }
            );

            secret = "";

        }

    }
);