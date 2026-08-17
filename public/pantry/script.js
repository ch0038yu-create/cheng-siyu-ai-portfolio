/* =====================================
   DATA
===================================== */

let inventory =
    JSON.parse(
        localStorage.getItem("pantryInventory")
    ) || [];


let currentFilter = "all";



/* =====================================
   ELEMENTS
===================================== */

const form =
    document.getElementById("ingredient-form");

const inventoryList =
    document.getElementById("inventory-list");

const totalItems =
    document.getElementById("total-items");

const expiringItems =
    document.getElementById("expiring-items");

const expiredItems =
    document.getElementById("expired-items");

const suggestionCount =
    document.getElementById("suggestion-count");

const generateButton =
    document.getElementById("generate-button");

const aiResults =
    document.getElementById("ai-results");

const shoppingList =
    document.getElementById("shopping-list");



/* =====================================
   DATE
===================================== */

function getDaysLeft(expiryDate) {

    const today = new Date();

    today.setHours(
        0,
        0,
        0,
        0
    );


    const expiry =
        new Date(expiryDate);

    expiry.setHours(
        0,
        0,
        0,
        0
    );


    const difference =
        expiry - today;


    return Math.ceil(
        difference /
        (1000 * 60 * 60 * 24)
    );

}



function getStatus(daysLeft) {

    if (daysLeft < 0) {

        return {
            label: "已过期",
            className: "status-expired"
        };

    }


    if (daysLeft <= 3) {

        return {
            label: "即将过期",
            className: "status-warning"
        };

    }


    return {
        label: "正常",
        className: "status-normal"
    };

}



/* =====================================
   SAVE
===================================== */

function saveInventory() {

    localStorage.setItem(
        "pantryInventory",
        JSON.stringify(inventory)
    );

}



/* =====================================
   DASHBOARD
===================================== */

function updateDashboard() {

    const expiring =
        inventory.filter((item) => {

            const days =
                getDaysLeft(item.expiry);

            return (
                days >= 0 &&
                days <= 3
            );

        });


    const expired =
        inventory.filter((item) => {

            return (
                getDaysLeft(item.expiry) < 0
            );

        });


    totalItems.textContent =
        inventory.length;

    expiringItems.textContent =
        expiring.length;

    expiredItems.textContent =
        expired.length;

}



/* =====================================
   RENDER INVENTORY
===================================== */

function renderInventory() {

    inventoryList.innerHTML = "";


    let filteredInventory =
        [...inventory];


    if (
        currentFilter ===
        "expiring"
    ) {

        filteredInventory =
            inventory.filter((item) => {

                const days =
                    getDaysLeft(
                        item.expiry
                    );

                return (
                    days >= 0 &&
                    days <= 3
                );

            });

    }


    if (
        currentFilter ===
        "expired"
    ) {

        filteredInventory =
            inventory.filter(
                (item) =>
                    getDaysLeft(
                        item.expiry
                    ) < 0
            );

    }



    filteredInventory.sort(
        (a, b) =>
            new Date(a.expiry) -
            new Date(b.expiry)
    );



    if (
        filteredInventory.length === 0
    ) {

        inventoryList.innerHTML = `
            <div class="empty-state">

                <p>
                    这里暂时没有食材。
                </p>

            </div>
        `;

        updateDashboard();

        return;

    }



    filteredInventory.forEach(
        (item) => {

            const daysLeft =
                getDaysLeft(
                    item.expiry
                );


            const status =
                getStatus(
                    daysLeft
                );


            let dateDescription;


            if (daysLeft < 0) {

                dateDescription =
                    `已过期 ${Math.abs(daysLeft)} 天`;

            }

            else if (daysLeft === 0) {

                dateDescription =
                    "今天到期";

            }

            else {

                dateDescription =
                    `${daysLeft} 天后到期`;

            }



            const element =
                document.createElement(
                    "div"
                );


            element.className =
                "inventory-item";


            element.innerHTML = `

                <div class="inventory-name">

                    <strong>
                        ${item.name}
                    </strong>

                    <span>
                        ${item.category}
                    </span>

                </div>


                <div class="inventory-value">

                    ${item.quantity}
                    ${item.unit}

                </div>


                <div>

                    <span
                        class="
                            status
                            ${status.className}
                        "
                    >
                        ${status.label}
                    </span>

                    <div
                        class="inventory-value"
                        style="margin-top:6px;"
                    >
                        ${dateDescription}
                    </div>

                </div>


                <button
                    class="delete-button"
                    data-id="${item.id}"
                >
                    删除
                </button>

            `;


            inventoryList.appendChild(
                element
            );

        }
    );


    updateDashboard();

}



/* =====================================
   ADD
===================================== */

form.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const name =
            document
                .getElementById(
                    "ingredient-name"
                )
                .value
                .trim();


        const quantity =
            Number(
                document
                    .getElementById(
                        "ingredient-quantity"
                    )
                    .value
            );


        const unit =
            document
                .getElementById(
                    "ingredient-unit"
                )
                .value;


        const category =
            document
                .getElementById(
                    "ingredient-category"
                )
                .value;


        const expiry =
            document
                .getElementById(
                    "ingredient-expiry"
                )
                .value;



        const newItem = {

            id: Date.now(),

            name,
            quantity,
            unit,
            category,
            expiry

        };


        inventory.push(
            newItem
        );


        saveInventory();

        renderInventory();


        form.reset();


        document
            .getElementById(
                "ingredient-quantity"
            )
            .value = 1;

    }
);



/* =====================================
   DELETE
===================================== */

inventoryList.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest(
                ".delete-button"
            );


        if (!button) {
            return;
        }


        const id =
            Number(
                button.dataset.id
            );


        inventory =
            inventory.filter(
                (item) =>
                    item.id !== id
            );


        saveInventory();

        renderInventory();

    }
);



/* =====================================
   FILTER
===================================== */

document
    .querySelectorAll(
        ".filter-button"
    )
    .forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(
                        ".filter-button"
                    )
                    .forEach(
                        (item) =>
                            item
                                .classList
                                .remove(
                                    "active"
                                )
                    );


                button
                    .classList
                    .add(
                        "active"
                    );


                currentFilter =
                    button.dataset.filter;


                renderInventory();

            }
        );

    });



/* =====================================
   MVP RECOMMENDATION ENGINE
===================================== */

generateButton.addEventListener(
    "click",
    () => {

        const usableItems =
            inventory
                .filter(
                    (item) =>
                        getDaysLeft(
                            item.expiry
                        ) >= 0
                )
                .sort(
                    (a, b) =>
                        getDaysLeft(
                            a.expiry
                        ) -
                        getDaysLeft(
                            b.expiry
                        )
                );


        if (
            usableItems.length === 0
        ) {

            aiResults.innerHTML = `

                <div class="empty-state">

                    <p>
                        当前没有可以用于推荐的食材。
                    </p>

                </div>

            `;

            suggestionCount.textContent =
                "0";

            return;

        }



        const priorityItems =
            usableItems.slice(
                0,
                5
            );


        const names =
            priorityItems.map(
                (item) =>
                    item.name
            );


        const recipes =
            createDemoRecommendations(
                names,
                priorityItems
            );


        renderRecipes(
            recipes
        );


        suggestionCount.textContent =
            recipes.length;

    }
);



/* =====================================
   LOCAL MVP LOGIC
===================================== */

function createDemoRecommendations(
    names,
    priorityItems
) {

    const first =
        names[0] || "现有食材";

    const second =
        names[1] || "";

    const third =
        names[2] || "";


    return [

        {
            title:
                `${first} 快手料理`,

            description:
                `优先使用 ${first}${
                    second
                        ? `，可搭配 ${second}`
                        : ""
                }，制作一份简单的家常料理。`,

            reason:
                `${first} 是当前优先消耗食材之一。`
        },


        {
            title:
                "清库存组合餐",

            description:
                `尝试组合 ${
                    [first, second, third]
                        .filter(Boolean)
                        .join("、")
                }，减少零散库存。`,

            reason:
                "优先组合库存时间较长的食材。"
        },


        {
            title:
                "简单健康餐",

            description:
                `从现有库存中选择 ${
                    names
                        .slice(0, 4)
                        .join("、")
                }，搭配成一顿简单饮食。`,

            reason:
                "减少额外采购，优先消耗已有库存。"
        }

    ];

}



/* =====================================
   RENDER RECIPES
===================================== */

function renderRecipes(
    recipes
) {

    aiResults.innerHTML = "";


    recipes.forEach(
        (recipe, index) => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "recipe-card";


            card.innerHTML = `

                <span class="recipe-number">
                    0${index + 1}
                </span>

                <h3>
                    ${recipe.title}
                </h3>

                <p>
                    ${recipe.description}
                </p>

                <div class="recipe-reason">
                    ${recipe.reason}
                </div>

            `;


            aiResults.appendChild(
                card
            );

        }
    );

}



/* =====================================
   INITIAL
===================================== */

renderInventory();