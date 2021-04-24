// Grabbing DOM elements
let form = document.getElementById("transaction-form")
let balanceAmount = document.getElementById("account-balance")
let transactionLog = document.getElementById("transaction-log")
// Setting a starting balance
let balance = 0.00
let transactionNumber = 0
let transactionArr = []
// Changing the forms behavior
form.onsubmit = (e) => {
    // Cleaning up form data to be in string format not number
    let type;
    if (e.target["transaction-type"].value === "1") type = "Deposit";
    else type = "Withdraw";

    // Bundling data in a better way to be passed to a function
    let transaction = {
        type: type,
        amount: Number(e.target.amount.value)
    }

    // Using helper functions to handle the heavy lifting
    // Updates the balance
    handleTransaction(transaction)
    // Updates the display amount with the new balance
    renderBalance()
    renderTransactionTable()
    // Stops redirect which is the default behaviour of a form
    e.preventDefault()
}

function handleTransaction(transaction) {
    console.log(transaction)

    transactionNumber += 1

    // Starts building the Transaction log entry, has to wait for last value
    let currentTransaction = {
        tID: transactionNumber,
        amount: transaction.amount,
        type: transaction.type,
        preBalance: balance
    }

    // Add or subtract from balance based on t.type
    if (transaction.type === "Deposit") {
        balance += transaction.amount
    } else {
        balance -= transaction.amount
    }

    // Adds final k:v to the object
    currentTransaction.postBalance = balance
    transactionArr.push(currentTransaction)
    console.log(currentTransaction)
    console.log(transactionArr)
}

function renderBalance() {
    // Changes the text of the element using reassignment
    balanceAmount.innerText = `$ ${balance}`
    balanceAmount.style.color = balance >= 0 ? `#9AB278` : `#FE4C58`
}

function renderTransactionTable() {
    transactionLog.innerHTML = ""

    for (let i = transactionArr.length - 1; i >= 0; i--) {
        let row = createTableRow(transactionArr[i])
        transactionLog.appendChild(row)
    }
}

function createTableRow(entry) {
    let tableRow = document.createElement('tr')
    let tID = document.createElement('th')
    let tType = document.createElement('td')
    let tAmount = document.createElement('td')
    let preBalance = document.createElement('td')
    let postBalance = document.createElement('td')

    tID.innerText = entry.tID
    tType.innerText = entry.type
    tAmount.innerText = entry.amount
    preBalance.innerText = entry.preBalance
    postBalance.innerText = entry.postBalance

    tableRow.appendChild(tID)
    tableRow.appendChild(tType)
    tableRow.appendChild(tAmount)
    tableRow.appendChild(preBalance)
    tableRow.appendChild(postBalance)

    return tableRow
}