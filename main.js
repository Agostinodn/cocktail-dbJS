// ======================== *
// GET COCKTAIL 
// ======================== *
let urlImg, cocktailName, alcoholic, description;
const change = document.getElementById("change");
change.addEventListener("click", () => getCockail());

async function getCockail() {
    try {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        urlImg = data.drinks.map(drink => drink.strDrinkThumb);
        cocktailName = data.drinks.map(drink => drink.strDrink);
        alcoholic = data.drinks.map(drink => drink.strAlcoholic);
        description = data.drinks.map(drink => drink.strInstructionsIT);
    } catch (error) {
        console.error(error);
    }

    document.getElementById('cocktailImg').setAttribute('src', urlImg);
    document.getElementById('name').innerText = cocktailName;
    document.getElementById('alcoholic').innerText = alcoholic;
    document.getElementById('description').innerText = description;
}
getCockail();

// ======================== *
// ADD COCKTAIL
// ======================== *
let ordersList = new Array();
const addCocktail = document.getElementById("add");

addCocktail.addEventListener("click", () => {
    let newArrayOrders = [...ordersList, cocktailName[0]];
    ordersList = newArrayOrders;
    orderDom.innerText = "Ordine in corso: " + ordersList;
    return ordersList;
});

// ======================== *
// BUY COCKTAIL 
// ======================== *
const buyButton = document.getElementById("buy");
const orderDom = document.getElementById("order");
let data = localStorage.getItem("order", ordersList);

buyButton.addEventListener("click", async () => {
    try {
        fetch("http://localhost:3000/cocktailsOrder", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ordersList)
        }).then((res) => {
            if (res.status >= 400 && res.status <= 451) {
                throw new Error("Errore di risposta Client " + res.status + ' ' + res.statusText);
            } else if (500 >= res.status >= 511) {
                throw new Error("Errore di risposta Server " + res.status + ' ' + res.statusText);
            } else if (res.ok === true) {
                localStorage.setItem("order", ordersList);
            }
        }).catch((e) => {
            console.error("Si è verificato un errore " + e);
            console.error("Assicuratevi di essere connessi al Database 'db.json'");
        });
    } catch (error) {
        console.error(error);
    };
});

// LOCAL STORAGE DATA
if (data !== null) {
    if (data.length > 0) {
        orderDom.innerText = "Ordine effettuato: " +
            localStorage.getItem("order", ordersList);
    } else {
        orderDom.innerText = "Effettua il tuo ordine!"
    }
}