let form = document.getElementById()
form.onsubmit = (e) => {
    console.log(e.target["transaction-button"].value)
    console.log(e.target.amount.value)

    e.preventDefault()
}