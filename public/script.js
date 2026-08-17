const askButton = document.getElementById("ask-ai-button");

const chatBox = document.getElementById("chat-box");

const closeChat = document.getElementById("close-chat");

const sendButton = document.getElementById("send-button");

const userInput = document.getElementById("user-input");

const chatMessages = document.getElementById("chat-messages");


askButton.addEventListener("click", function () {

    chatBox.style.display = "block";

});


closeChat.addEventListener("click", function () {

    chatBox.style.display = "none";

});


sendButton.addEventListener("click", function () {

    const message = userInput.value.trim();


    if (message === "") {
        return;
    }


    const userMessage = document.createElement("p");

    userMessage.textContent = message;

    userMessage.classList.add("user-message");

    chatMessages.appendChild(userMessage);


    userInput.value = "";

    chatMessages.scrollTop = chatMessages.scrollHeight;


    fetch("/api/chat", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message: message
        })

    })
    .then(function (response) {

        return response.json();

    })
    .then(function (data) {

        const aiMessage = document.createElement("p");

        aiMessage.textContent = data.reply;

        aiMessage.classList.add("ai-message");

        chatMessages.appendChild(aiMessage);

        chatMessages.scrollTop = chatMessages.scrollHeight;

    })
    .catch(function (error) {

        console.error(error);

        const aiMessage = document.createElement("p");

        aiMessage.textContent = "服务器暂时出现问题，请稍后再试。";

        aiMessage.classList.add("ai-message");

        chatMessages.appendChild(aiMessage);

    });

});


userInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        sendButton.click();

    }

});

const timelineButtons = document.querySelectorAll(".timeline-toggle");


timelineButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const details = button.nextElementSibling;


        if (details.style.display === "block") {

            details.style.display = "none";

            button.textContent = "查看成果 ↓";

        } else {

            details.style.display = "block";

            button.textContent = "收起成果 ↑";

        }

    });

});

const projectButtons =
    document.querySelectorAll(".project-toggle");

const projectModal =
    document.getElementById("project-modal");

const projectModalTitle =
    document.getElementById("project-modal-title");

const projectModalBody =
    document.getElementById("project-modal-body");

const projectModalClose =
    document.getElementById("project-modal-close");


projectButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const card =
            button.closest(
                ".project-card, .ai-practice-card"
            );


        if (!card) {

            console.error(
                "没有找到项目卡片"
            );

            return;

        }


        const title =
            card.querySelector("h3");


        const details =
            card.querySelector(".project-details");


        if (!title || !details) {

            console.error(
                "项目标题或详情内容不存在"
            );

            return;

        }


        projectModalTitle.textContent =
            title.textContent.trim();


        projectModalBody.innerHTML =
            details.innerHTML;


        projectModal.classList.add(
            "is-open"
        );


        document.body.style.overflow =
            "hidden";

    });

});

function closeProjectModal() {

    projectModal.classList.remove("is-open");

    document.body.style.overflow = "";

}


projectModalClose.addEventListener(
    "click",
    closeProjectModal
);


projectModal.addEventListener(
    "click",
    function (event) {

        if (event.target === projectModal) {

            closeProjectModal();

        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeProjectModal();

        }

    }
);

/* =========================
   Experience Modal
========================= */

const experienceButtons =
    document.querySelectorAll(".experience-toggle");

const experienceModal =
    document.getElementById("experience-modal");

const experienceModalTitle =
    document.getElementById("experience-modal-title");

const experienceModalBody =
    document.getElementById("experience-modal-body");

const experienceModalClose =
    document.getElementById("experience-modal-close");


experienceButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const experienceCard =
            button.closest(".timeline-content");


        const companyName =
            experienceCard.querySelector("h3").textContent;


        const details =
            experienceCard.querySelector(".experience-details");


        experienceModalTitle.textContent =
            companyName;


        experienceModalBody.innerHTML =
            details.innerHTML;


        experienceModal.classList.add("is-open");


        document.body.style.overflow =
            "hidden";

    });

});


function closeExperienceModal() {

    experienceModal.classList.remove("is-open");

    document.body.style.overflow = "";

}


experienceModalClose.addEventListener(
    "click",
    closeExperienceModal
);


experienceModal.addEventListener(
    "click",
    function (event) {

        if (event.target === experienceModal) {

            closeExperienceModal();

        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            experienceModal.classList.contains("is-open")
        ) {

            closeExperienceModal();

        }

    }
);

/* =====================================
   CAPABILITY MODAL
===================================== */

const capabilityModal =
    document.getElementById("capability-modal");

const capabilityModalTitle =
    document.getElementById("capability-modal-title");

const capabilityModalBody =
    document.getElementById("capability-modal-body");

const capabilityModalClose =
    document.getElementById("capability-modal-close");


document
    .querySelectorAll(".capability-toggle")
    .forEach((button) => {

        button.addEventListener("click", () => {

            const card =
                button.closest(".capability-card");

            if (!card) return;


            const title =
                card.querySelector("h3");

            const details =
                card.querySelector(".capability-details");


            if (!title || !details) return;


            capabilityModalTitle.textContent =
                title.textContent.trim();


            capabilityModalBody.innerHTML =
                details.innerHTML;


            capabilityModal.classList.add("show");

            capabilityModal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";

        });

    });



function closeCapabilityModal() {

    capabilityModal.classList.remove("show");

    capabilityModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.style.overflow =
        "";

}



capabilityModalClose.addEventListener(
    "click",
    closeCapabilityModal
);



capabilityModal.addEventListener(
    "click",
    (event) => {

        if (event.target === capabilityModal) {

            closeCapabilityModal();

        }

    }
);



document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            capabilityModal.classList.contains("show")
        ) {

            closeCapabilityModal();

        }

    }
);

/* =====================================
   NAVIGATION ACTIVE SECTION
===================================== */

const navLinks =
    document.querySelectorAll(".nav-links a");


const pageSections = [
    document.getElementById("about"),
    document.getElementById("experience"),
    document.getElementById("projects"),
    document.getElementById("ai-workflow"),
    document.getElementById("skills"),
    document.getElementById("contact")
].filter(Boolean);


function setActiveNav(sectionId) {

    navLinks.forEach((link) => {

        const target =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${sectionId}`
        );

    });

}


const navObserver =
    new IntersectionObserver(

        (entries) => {

            const visibleSections =
                entries
                    .filter(
                        (entry) =>
                            entry.isIntersecting
                    )
                    .sort(
                        (a, b) =>
                            b.intersectionRatio -
                            a.intersectionRatio
                    );


            if (visibleSections.length > 0) {

                setActiveNav(
                    visibleSections[0].target.id
                );

            }

        },

        {
            root: null,

            rootMargin:
                "-28% 0px -55% 0px",

            threshold:
                [0, 0.1, 0.25, 0.5]
        }

    );


pageSections.forEach((section) => {
    navObserver.observe(section);
});

/* =====================================
   SCROLL REVEAL
===================================== */

const revealElements =
    document.querySelectorAll(
        `
        .section-label,
        .experience-title,
        .experience-intro,
        #projects > h2,
        .projects-intro,
        .workflow-title,
        .workflow-intro,
        .capabilities-title,
        .capabilities-intro,
        .timeline-item,
        .project-card,
        .ai-practice-card,
        .capability-card,
        .contact-container
        `
    );


revealElements.forEach((element) => {
    element.classList.add("reveal");
});


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "visible"
                );


                observer.unobserve(
                    entry.target
                );

            });

        },

        {
            root: null,

            threshold: 0.12,

            rootMargin:
                "0px 0px -50px 0px"
        }

    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});

/* =====================================
   PRODUCT SCREENSHOT LIGHTBOX
===================================== */

const screenshotImages =
    document.querySelectorAll(
        ".fresh-phone-frame img"
    );


const screenLightbox =
    document.getElementById(
        "screen-lightbox"
    );


const screenLightboxImage =
    document.getElementById(
        "screen-lightbox-image"
    );


const screenLightboxCaption =
    document.getElementById(
        "screen-lightbox-caption"
    );


const screenLightboxClose =
    document.getElementById(
        "screen-lightbox-close"
    );



/* 点击截图 */

screenshotImages.forEach((image) => {

    image.addEventListener(
        "click",
        () => {

            screenLightboxImage.src =
                image.src;


            screenLightboxImage.alt =
                image.alt;


            screenLightboxCaption.textContent =
                image.alt;


            screenLightbox.classList.add(
                "show"
            );


            screenLightbox.setAttribute(
                "aria-hidden",
                "false"
            );

        }
    );

});



/* 关闭 */

function closeScreenLightbox() {

    screenLightbox.classList.remove(
        "show"
    );


    screenLightbox.setAttribute(
        "aria-hidden",
        "true"
    );


    screenLightboxImage.src =
        "";

}



screenLightboxClose.addEventListener(
    "click",
    closeScreenLightbox
);



/* 点击黑色背景关闭 */

screenLightbox.addEventListener(
    "click",
    (event) => {

        if (
            event.target ===
            screenLightbox
        ) {

            closeScreenLightbox();

        }

    }
);