let mybalanceElement = document.getElementById('balance');
let myNameElement = document.getElementById("name")
myNameElement.innerHTML = " Name: Viktor";
let url = "https://noroff-komputer-store-api.herokuapp.com/";
let myOutstandingsloansElement = document.getElementById("outstandingsloans");
let payBalanceElement = document.getElementById("pay")
let balance = 200;
let loan = false;
mybalanceElement.innerHTML = balance;
let salary = 0;
let totalloan = 0;
let cumputersElemnt = document.getElementById("computers")
let specElement = document.getElementById('spec');
let infoElement = document.getElementById('info');
let picElement = document.getElementById("image");
let buyButtonElement = document.getElementById("BuyButton");
let priceTagElement = document.getElementById("price")
let computernameElement = document.getElementById("computername");

if (loan == false) {
    let PayBackButton = document.getElementById("PayBackButton").style.display = 'none'
}

let computers = [];
getAPI();

//handle which method to run from a press of a button
window.addEventListener('click', (e) => {
    if (e.target.id === "getloan") {
        getLoan();
    }
    if (e.target.id === "WorkButton") {
        Work();
    }
    if (e.target.id === "BankButton") {
        banking();
    }
    if (e.target.id === "PayBackButton") {
        payBackLoan()
    }

})

// Handle banking. If you have a loan, then you pay 10% to the loan, and the rest of it goes to your wallet. if you dont have a loan, every penny goes to your wallet. 
const banking = () => {

    if (loan === true) {
        totalloan -= salary * (0.10);
        myOutstandingsloansElement.innerHTML = totalloan;
        balance += salary * (0.90);
        mybalanceElement.innerHTML = balance;
        salary = 0;
        payBalanceElement.innerHTML = salary;

    } else if (loan === false) {
        balance += salary;
        mybalanceElement.innerHTML = balance;
        salary = 0;
        payBalanceElement.innerHTML = salary;
    }
}
// working
const Work = () => {
    salary += 100;
    payBalanceElement.innerHTML = salary;
}

// get a loan. You cant have more than one loan active at the same time. You have to enter a amaount in digits. You cannot get a loan more than double of your bank balance
const getLoan = () => {
    let loanSum = prompt("please enter the amount you want to loan")

    if (loan === true) {
        alert("You have to pay back you loan before you take a new loan")
    }
    if (loanSum > (balance * 2)) {
        alert("You dont have enough money to take this loan, go and work")
    }

    if (loanSum === "" || loanSum === null) {
        alert("Try again.. Enter a amount in digits")
    }

    if (loan === false && loanSum < (balance * 2) && (loanSum !== "" || loanSum !== null )) {
        alert("you loaned " + loanSum)
        totalloan = parseInt(loanSum);
        myOutstandingsloansElement.innerHTML = totalloan;
        balance += totalloan;
        updateBalanceElement();
        let PayBackButton = document.getElementById("PayBackButton").style.display = ''
        loan = true;
    }
}
/*
    
*/

// paying back loan. Your entire salary goes to the loan. if you pay the entire loan, and there is money left over, you have to press the button "bank" , to get the rest of it to your wallet.
const payBackLoan = () => {

    if (totalloan <= salary) {
        salary = salary - totalloan;
        payBalanceElement.innerHTML = salary;
        totalloan = 0;
        myOutstandingsloansElement.innerHTML = totalloan;
        loan = false;
    } else {
        totalloan -= salary;
        myOutstandingsloansElement.innerHTML = totalloan;
        salary = salary - totalloan;
        payBalanceElement.innerHTML = salary;

    }
}

// just a method that update the balance ;
function updateBalanceElement() {
    mybalanceElement.innerText = balance;
}

// getting the Json from api. Calling methods inside, to automatically update all data.

async function getAPI() {
    try {
        const response = await fetch(`${url}computers`)
        const json = await response.json();
        computers = json;
        addComputerToMenu(json);
        ChangeDescriptionmenu(json);
        onChangeSpecText(json)

        buyButtonElement.addEventListener('click', () => {
            let id = cumputersElemnt.options[cumputersElemnt.selectedIndex].id;
            const computerToBuy = computers.find(c => c.id == id);
            if (balance >= computerToBuy.price) {
                balance -= computerToBuy.price;
                console.log(computerToBuy.price);
                updateBalanceElement();
                alert("You have bought the computer")
            }
            else {
                alert("You dont have enough money")
                console.log(computerToBuy.price);
            }
        })

    } catch (error) {
        console.log(error);
    }
}
// adding all computers to the menu
const addComputerToMenu = (json) => {
    json.forEach(c => {
        let option = document.createElement('option');
        option.setAttribute('id', `${c.id}`)
        let text = document.createTextNode(c.title);
        option.appendChild(text);
        cumputersElemnt.appendChild(option);
        onChangepic(json);
    })
}

//Changing the descripton of a computer, when a new computer is selected.
const ChangeDescriptionmenu = (json) => {
    let id = cumputersElemnt.options[cumputersElemnt.selectedIndex].id
    json.forEach(c => {
        // console.log(c.specs);
        if (c.id == id) {
            specElement.innerText = c.description;

        }
    })

    window.addEventListener('change', () => {
        let id = cumputersElemnt.options[cumputersElemnt.selectedIndex].id;
        json.forEach(c => {
            if (c.id == id) {
                specElement.innerText = c.description;
            }
        }
        )
    })
}
//Changing the spec text of a computer, when a new computer is selected.¨
const onChangeSpecText = (json) => {
    let id = cumputersElemnt.options[cumputersElemnt.selectedIndex].id;
    let temp = ""
    json.forEach(c => {
        // console.log(c.description);
        if (c.id == id) {
            for (let i = 0; i < c.specs.length; i++) {

                temp += c.specs[i] + "\n" + "\n";
            }
            infoElement.innerText = temp;

        }
    }
    )
    window.addEventListener('change', () => {
        let id = cumputersElemnt.options[cumputersElemnt.selectedIndex].id;
        let temp = ""
        json.forEach(c => {
            // console.log(c.description);
            if (c.id == id) {
                for (let i = 0; i < c.specs.length; i++) {

                    temp += c.specs[i] + "\n" + "\n";
                }
                infoElement.innerText = temp;
            }
        }
        )
    })
}
//Changing the picture of a computer, when a new computer is selected.¨
const onChangepic = (json) => {
    let id = cumputersElemnt.options[cumputersElemnt.selectedIndex].id;
    json.forEach(c => {
        if (c.id == id) {


            picElement.setAttribute('class', "test");
            picElement.setAttribute('src', `${url}${c.image}`);
            priceTagElement.innerText = "Price:" + c.price;;
            computernameElement.innerHTML = c.title;

        }
    }
    )
    window.addEventListener('change', () => {
        let id = cumputersElemnt.options[cumputersElemnt.selectedIndex].id;
        json.forEach(c => {
            if (c.id == id) {
                if (c.id == 5) {
                    picElement.setAttribute('src', "https://noroff-komputer-store-api.herokuapp.com/assets/images/5.png")
                    priceTagElement.innerText = "Price:" + c.price;;
                    computernameElement.innerHTML = c.title;
                }
                else {

                    picElement.setAttribute('class', "test");
                    picElement.setAttribute('src', `${url}${c.image}`);
                    priceTagElement.innerText = "Price:" + c.price;;
                    computernameElement.innerHTML = c.title;
                }
            }
        }
        )
    })
}

// buying a cumputer. checking if you have enough money to buy it. Updating your balance.
const buyComputer = (json) => {

    let id = cumputersElemnt.options[cumputersElemnt.selectedIndex].id;
    json.forEach(c => {
        // console.log(c.description);
        if (c.id == id && balance > c.price) {
            balance -= c.price;
            alert("You have bought the computer")
        }
        else alert("You dont have enough money")
    }
    )
    window.addEventListener('click', () => {
        let id = cumputersElemnt.options[cumputersElemnt.selectedIndex].id;
        json.forEach(c => {
            // console.log(c.description);
            if (c.id == id && balance > c.price) {
                balance -= c.price;
                alert("You have bought the computer")
            }
            else alert("You dont have enough money")
        }
        )
    })

}

