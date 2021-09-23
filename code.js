"use strict";
//elements with events

const menuIcon = document.querySelector(".btn-icon-menu");
const menuResoponsive = document.querySelector(".menu-responsive");
const menuCloseIcon = document.getElementById("btn-close-menu-responsive");

const buttonsSelectReward = document.querySelectorAll(".btn-select");

const overlaySelectionModal = document.querySelector(".overlay-selection-modal")
const selectionMSCloseIcon = document.getElementById("btn-close-selection-modal");

const btnsRadio = document.querySelectorAll('.input-radio');

const btnContinuePledge_NoReward = document.getElementById("btn-continue-no-reward")
const btnContinuePledge_BambooStand = document.getElementById("btn-continue-bamboo-stand")
const btnContinuePledge_BlackEditionStand = document.getElementById("btn-continue-black-edition-stand")
const btnContinuePledge_MahoganySpecialEdition = document.getElementById("btn-continue-mahogany-special-edition")


//elments with variable values
const eGoalMoney = document.getElementById("goal-money");
const eTotalMoney = document.getElementById("total-money");
const eTotalBackers = document.getElementById("total-backers");
const eDaysLeft = document.getElementById("days-left");

const eStockBambooStand = document.querySelectorAll(".stock-bamboo-stand");
const eStockBlackEditionStand = document.querySelectorAll(".stock-black-edition-stand");
const eStockMahoganySpecialEdition = document.querySelectorAll(".stock-mahogany-special-edition");

//variables for the total money pledged and number of backers and days left
const goalMoney = 100000;
let totalMoney = 89914;
let totalBackers = 4999;
let daysLeft = 56;
//variables for rewards left
let stockBambooStand = 101;
let stockBlackEditionStand = 2;
let stockMahoganySpecialEdition = 1;


//return a number with ',' and '.' with 2 decimals
function formatNumber(num) {
    return Number(parseFloat(num).toFixed(2)).toLocaleString('en');
}

//set values 

function updateEGoalMoney(num) {
    eGoalMoney.innerHTML = (`of $${formatNumber(num)} backed`);
}

function updateETotalMoney(num) {
    eTotalMoney.innerHTML = (`$${formatNumber(num)}`);
}

function updateETotalBackers(num) {
    eTotalBackers.innerHTML = (`${formatNumber(num)}`);
}
function updateEDaysLeft(num) {
    eDaysLeft.innerHTML = (`${formatNumber(num)}`);
}

updateEGoalMoney(goalMoney);
updateETotalMoney(totalMoney);
updateETotalBackers(totalBackers);
updateEDaysLeft(daysLeft);


//stock values
eStockBambooStand.forEach((item) => {
    item.innerHTML = `${formatNumber(stockBambooStand)}`;

});
eStockBlackEditionStand.forEach((item) => {
    item.innerHTML = `${formatNumber(stockBlackEditionStand)}`;

});
eStockMahoganySpecialEdition.forEach((item) => {
    item.innerHTML = `${formatNumber(stockMahoganySpecialEdition)}`;

});


//functions to update stock values
function updateStockBambooStand() {
    if (stockBambooStand > 0) {
        stockBambooStand--;
        let num = stockBambooStand;
        eStockBambooStand.forEach((item) => {
            item.innerHTML = `${formatNumber(num)}`;
        });
        //if the stock is 0 the div will become unavailable
        if (num == 0) {
            document.querySelectorAll(".div-bamboo-stand").forEach(item => {
                item.classList.add("out-of-stock");
            })
            document.querySelectorAll('.btn-bamboo-stand').forEach((item) => {
                item.disabled = true
            });
        }
    }
}

function updateStockBlackEditionStand() {
    if (stockBlackEditionStand > 0) {
        stockBlackEditionStand--;
        let num = stockBlackEditionStand;

        eStockBlackEditionStand.forEach((item) => {
            item.innerHTML = `${formatNumber(num)}`;
        });
        //if the stock is 0 the div will become unavailable
        if (num == 0) {
            document.querySelectorAll(".div-black-edition-stand").forEach(item => {
                item.classList.add("out-of-stock");
            })
            document.querySelectorAll('.btn-black-edition-stand').forEach((item) => {
                item.disabled = true
            });
        }
    }
}

function updateStockMahoganySpecialEdition() {
    if (stockMahoganySpecialEdition > 0) {
        stockMahoganySpecialEdition--;
        let num = stockMahoganySpecialEdition;

        eStockMahoganySpecialEdition.forEach((item) => {
            item.innerHTML = `${formatNumber(num)}`;
        });
        //if the stock is 0 the div will become unavailable
        if (num == 0) {
            document.querySelectorAll(".div-mahogany-special-edition").forEach(item => {
                item.classList.add("out-of-stock");
            })
            document.querySelectorAll('.btn-mahogany-special-edition').forEach((item) => {
                item.disabled = true
            });
        }
    }
}

// update progress bar
    function updateProgressBar() {
        let percentage = (100*totalMoney)/goalMoney;
        document.querySelector(".progres-bar-item").value = percentage;
    }
    updateProgressBar()


//responsive menu
//:show and close

menuIcon.addEventListener("click", (e) => {
    e.preventDefault;
    menuResoponsive.classList.add("show");
    menuIcon.style.display = "none";
});

menuCloseIcon.addEventListener("click", (e) => {
    e.preventDefault;
    menuResoponsive.classList.remove("show");
    menuIcon.style.display = "block";
});

//close the responsive menu when select a option
document.querySelectorAll(".menu-responsive-item .menu-item").forEach(item=>{
    item.addEventListener("click", e=>{
        menuResoponsive.classList.remove("show")
        menuIcon.style.display = "block";
    })
});
//event for the first button "back this project" - show the overlay selection modal 

document.getElementById("btn-backProject").addEventListener("click", (e) => {
    e.preventDefault;
    overlaySelectionModal.classList.add("show");
    document.getElementById("radio-btn-no-reward").click();
    document.getElementById("radio-btn-no-reward").scrollIntoView();

});


// events for buttons "select reward"  to show the overlay selection modal and focus the selected option
buttonsSelectReward.forEach((item) => {
    item.addEventListener("click", (e) => {
        e.preventDefault;
        overlaySelectionModal.classList.add("show");
        document.getElementById(item.value).click();
        document.getElementById(item.value).scrollIntoView();
    });
});

//close overlay selection modal 
selectionMSCloseIcon.addEventListener("click", (e) => {
    e.preventDefault;
    overlaySelectionModal.classList.remove("show");
});

// show inputs for selected pledge in overlay selection modal  and put a cyan border around it
btnsRadio.forEach((item) => {
    item.addEventListener("change", (e) => {
        let element = document.getElementById(item.value);
        if (!element.classList.contains("show")){ 
            element.classList.add("show");
            element.parentElement.classList.add("show-border-cyan");
        }

        //hide others pledges if there are some showing
        btnsRadio.forEach(obj => {
            if (item.value != obj.value) {
                let el = document.getElementById(obj.value);
                if (el.classList.contains("show")){
                     el.classList.remove("show");
                     el.parentElement.classList.remove("show-border-cyan");
                    }
            }
        });
    });
});

//function to show  succes overlay and add a event to a button to close it

function showOverlaySucces() {
    document.querySelector(".overlay-succes-modal").classList.add("show");
};

document.getElementById("btn-gotIt").addEventListener("click", (e) => {
    e.preventDefault;
    document.querySelector(".overlay-succes-modal").classList.remove("show");
});


//save the made pledge and show the succes modal 
btnContinuePledge_NoReward.addEventListener("click", e => {
    e.preventDefault;
    let min = 1;
    let num = parseFloat(btnContinuePledge_NoReward.previousElementSibling.value);
    
    if(num >= min && confirm("Are you sure that want to do the pledge?")){
        //update data
        totalMoney += num;
        updateETotalMoney(totalMoney);
        totalBackers++;
        updateETotalBackers(totalBackers);
        //hidde the selection modal and show de overlay "succes"
        overlaySelectionModal.classList.remove("show");
        showOverlaySucces()
    }else alert(`Your pledge must be equal or bigger than ${min}$`)
});


btnContinuePledge_BambooStand.addEventListener("click", e => {
    e.preventDefault;
    let min = 25;
    let num = parseFloat(btnContinuePledge_BambooStand.previousElementSibling.value);
    if (num >= min && confirm("Are you sure that want to do the pledge?")) {
        totalMoney += num;
        updateETotalMoney(totalMoney);
        updateStockBambooStand();
        totalBackers++;
        updateETotalBackers(totalBackers);
        updateProgressBar();
        
        overlaySelectionModal.classList.remove("show");
        showOverlaySucces()
    } else {
        alert(`Your pledge must be equal or bigger than ${min}$`);
    }
});
btnContinuePledge_BlackEditionStand.addEventListener("click", e => {
    e.preventDefault;
    let min = 75;
    let num = parseFloat(btnContinuePledge_BlackEditionStand.previousElementSibling.value);
    if (num >= min && confirm("Are you sure that want to do the pledge?")) {
        totalMoney += num;
        updateETotalMoney(totalMoney);
        updateStockBlackEditionStand();
        totalBackers++;
        updateETotalBackers(totalBackers);
        updateProgressBar();

        overlaySelectionModal.classList.remove("show");
        showOverlaySucces()
    } else {
        alert(`Your pledge must be equal or bigger than ${min}$`);
    }
});
btnContinuePledge_MahoganySpecialEdition.addEventListener("click", e => {
    e.preventDefault;
    let min = 200;
    let num = parseFloat(btnContinuePledge_MahoganySpecialEdition.previousElementSibling.value);
    if (num >= min && confirm("Are you sure that want to do the pledge?")) {
        totalMoney += num;
        updateETotalMoney(totalMoney);
        updateStockMahoganySpecialEdition();
        totalBackers++;
        updateETotalBackers(totalBackers);
        updateProgressBar();

        overlaySelectionModal.classList.remove("show");
        showOverlaySucces()
    } else {
        alert(`Your pledge must be equal or bigger than ${min}$`);
    }
});


// this is just for put the Mahogany special edition stock to 0 isn't neccessary
updateStockMahoganySpecialEdition()