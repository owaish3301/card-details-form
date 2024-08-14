const cardHolderName = document.querySelector("#card-holder-name");
const nameOnCard = document.querySelector(".name");
const cardNum = document.querySelector("#card-num-input");
const numOnCard = document.querySelector(".card-num");
const expMonthOnCard = document.querySelector("#exp-month-display");
const expYearOnCard = document.querySelector("#exp-year-display");
const expMonth = document.querySelector("#exp-month-input");
const expYear = document.querySelector("#exp-year-input");
const cvcOnCard = document.querySelector("#cvc-display");
const cvc = document.querySelector("#cvc-input");
const confirmBtn = document.querySelector("#confirm-btn");
const warnEmptyHolderName = document.querySelector("#warn-empty-holder-name");
const warnEmptyCardNum  = document.querySelector("#warn-empty-card-num");
const warnEmptyExp = document.querySelector("#warn-empty-card-exp");
const warnEmptyCvc = document.querySelector("#warn-empty-card-cvc");
const halfFilledCardNum = document.querySelector("#warn-half-filled-card-num");

const errorObj = {
    "card_number" : false,
    "exp-month" : false,
    "exp-year" : false,
    "cvc" : false
}

const isWarnVisibleObj = {
    "holderName" : false,
    "cardNum" : false,
    "MM" : false,
    "YY" : false,
    "CVC" : false
}

const editHolderName = () => { 

    if(isWarnVisibleObj["holderName"]){
        cardHolderName.classList.remove("red-border");
        cardHolderName.classList.add("focus-state");
        warnEmptyHolderName.classList.add("hidden");
        isWarnVisibleObj["holderName"] = false;
    }

    if(cardHolderName.value === ""){
        nameOnCard.innerHTML = "Jane Appleseed";
        return;
    }
    nameOnCard.innerText = cardHolderName.value;
}


const editCardNum = (evt) => {

    if(halfFilledCardNum.checkVisibility()){
        halfFilledCardNum.classList.add("hidden");
    }

    if(isWarnVisibleObj["cardNum"]){
        cardNum.classList.remove("red-border");
        cardNum.classList.add("focus-state");
        warnEmptyCardNum.classList.add("hidden");
        isWarnVisibleObj["cardNum"] = false;
    }
    //check if there arent any letter or anything in the field 
    const arrayOfNum = cardNum.value.split("").map ( (elem)=>{
        return Number(elem);
    } )
    let isValid = true;
    arrayOfNum.forEach(element => {
        if(isNaN(element)){
            isValid = false;
        }
    });
    const warnMsg = document.querySelector("#warn-error-format-card-num");
    if (isValid){
        errorObj["card_number"] = false;
        let isWarnHidden = false;
        warnMsg.classList.forEach( (className)=>{
            if(className === "hidden") isWarnHidden = true;
        } )
        if(!isWarnHidden){
            warnMsg.classList.add("hidden");
            cardNum.classList.add("focus-state");
            cardNum.classList.remove("red-border");
        }
    }
    else{
        errorObj["card_number"] = true;
        warnMsg.classList.remove("hidden");
        cardNum.classList.remove("focus-state");
        cardNum.classList.add("red-border");
    }



    if(evt.key === "Backspace") {
        if( cardNum.value === "" ){  
            numOnCard.innerText = "0000 0000 0000 0000"
            return;
        }
        if(cardNum.value.length === 4 || cardNum.value.length === 9 || cardNum.value.length === 14) return;
    }

    if(cardNum.value.length >= 4 && cardNum.value.length < 8){
        cardNum.value = cardNum.value.slice(0,4) + " " +  cardNum.value.slice(5);
    }
    else if (cardNum.value.length >= 9 && cardNum.value.length < 14){
        cardNum.value = cardNum.value.slice(0,4) + " " +  cardNum.value.slice(5,9) +" " + cardNum.value.slice(10);
    }
    else if ( cardNum.value.length >= 14 && cardNum.value.length <= 19 ){
        cardNum.value = cardNum.value.slice(0,4) + " " +  cardNum.value.slice(5,9) +" " + cardNum.value.slice(10,14) + " " + cardNum.value.slice(15,19); 
    }
    else if (cardNum.value.length > 19) {
        cardNum.value = cardNum.value.slice(0,19);
        return
    };

    numOnCard.innerText = cardNum.value;
}

function warning(errorElem,id){
    const warnMsg = document.querySelector(id);
    warnMsg.innerText = "Wrong format, numbers only";

    const arrayOfNum = errorElem.value.split("").map((elem)=>{
        return Number(elem);
    })
    let isValid = true;
    arrayOfNum.forEach((elem)=>{
        if (isNaN(elem)){
            isValid = false;
        }
    });
    if (isValid){
        if (errorElem === expMonth){
            errorObj["exp-month"] = false;
        }
        else if (errorElem === expYear){
            errorObj["exp-year"] = false;
        }
        else if (errorElem === cvc){
            errorObj["cvc"] = false;
        }
        let isWarnHidden = false;
        warnMsg.classList.forEach( (className)=>{
            if(className === "hidden") isWarnHidden = true;
        } )
        if(!isWarnHidden){
            warnMsg.classList.add("hidden");
            errorElem.classList.add("focus-state");
            errorElem.classList.remove("red-border");
        }
    }
    else{
        if (errorElem === expMonth){
            errorObj["exp-month"] = true;
        }
        else if (errorElem === expYear){
            errorObj["exp-year"] = true;
        }
        else if (errorElem === cvc){
            errorObj["cvc"] = true;
        }
        warnMsg.classList.remove("hidden");
        errorElem.classList.remove("focus-state");
        errorElem.classList.add("red-border");
    }
}

const editExpMonth = () => {
    //remove the empty error if both month and years are non empty else just chnge the border
    if(isWarnVisibleObj["MM"]){
        expMonth.classList.remove("red-border");
        expMonth.classList.add("focus-state");
        if(!(expYear.value === "")){
            warnEmptyExp.classList.add("hidden");
        }
        isWarnVisibleObj["MM"] = false;
    }
    const id = "#warn-error-format-exp";
    warning(expMonth, id);

    if(expMonth.value.length > 2) {
        expMonth.value = expMonth.value.slice(0,2);
        return
    }

    if(expMonth.value > 12){
        const warnMsg = document.querySelector("#warn-error-format-exp");
        warnMsg.innerText = "Wrong Month";
        warnMsg.classList.remove("hidden")
        errorObj["exp-month"] = true;
    }

    
    
    expMonthOnCard.innerText = expMonth.value;
}

const editExpYear = () => {
    if(isWarnVisibleObj["YY"]){
        expYear.classList.remove("red-border");
        if(!(expMonth.value === "")){
            warnEmptyExp.classList.add("hidden");
        }
        isWarnVisibleObj["YY"] = false;
    }

    if (expYear.value.length > 2){
        expYear.value = expYear.value.slice(0,2);
    }

    const id = "#warn-error-format-exp"
    warning(expYear, id)

    expYearOnCard.innerText = expYear.value;
}

const editCvc = () => {
    if(isWarnVisibleObj["CVC"]){
        cvc.classList.remove("red-border");
        warnEmptyCvc.classList.add("hidden");
        isWarnVisibleObj["CVC"] = false;
    }

    const id = "#warn-error-format-cvc";
    warning(cvc,id)

    if (cvc.value.length > 3){
        cvc.value = cvc.value.slice(0,3);
    }

    cvcOnCard.innerText = cvc.value
}

const checkEmptyValue = () => {
    if(cardHolderName.value === ""){
        //holder name is empty
        warnEmptyHolderName.classList.remove("hidden");
        cardHolderName.classList.add("red-border");
        isWarnVisibleObj["holderName"] = true;
    }

    if(cardNum.value === ""){
        //card number is empty
        warnEmptyCardNum.classList.remove("hidden");
        cardNum.classList.add("red-border");
        isWarnVisibleObj["cardNum"] = true;
    }

    if(expMonth.value === "" || expYear.value === ""){
        warnEmptyExp.classList.remove("hidden");
        if(expMonth.value === "") {
            expMonth.classList.add("red-border");
            isWarnVisibleObj["MM"] = true;
        };
        if (expYear.value === "") {
            expYear.classList.add("red-border");
            isWarnVisibleObj["YY"] = true;
        };
    }

    if(cvc.value === "") {
        warnEmptyCvc.classList.remove("hidden");
        cvc.classList.add("red-border");
        isWarnVisibleObj["CVC"] = true;
    }
}

const checkCardNumLength = () => {
    const lengthOfCardNum = cardNum.value.length;
    if(lengthOfCardNum !== 19 && isWarnVisibleObj["cardNum"] === false){
        halfFilledCardNum.classList.remove("hidden");
    }
}

const confirmation = () => {
    checkEmptyValue();
    checkCardNumLength();

    //access all the values of error and blank obj and check if there any error if yes then dont do anything else if no then show the confirmation page
    const erroredValuesList = Object.values(errorObj);
    let areThereAnyError = false;
    erroredValuesList.forEach((elem)=>{
        if(elem === true){
            areThereAnyError = true;
        }
    });

    const blankValuesList = Object.values(isWarnVisibleObj);
    blankValuesList.forEach((elem)=>{
        if(elem===true){
            areThereAnyError = true;
        }
    });

    if(!(areThereAnyError)){
        document.querySelector(".card-input").classList.add("hidden");
        document.querySelector(".confirmation-page").classList.remove("hidden");
    }
}


cardHolderName.addEventListener("keyup", editHolderName);
cardNum.addEventListener("keyup", editCardNum);
expMonth.addEventListener("keyup", editExpMonth);
expYear.addEventListener("keyup", editExpYear);
cvc.addEventListener("keyup", editCvc);
confirmBtn.addEventListener("click", confirmation);