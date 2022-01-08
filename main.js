// ======================== * 
// GET DATA
// ======================== * 
let urlImg, cocktailName, alcoholic, description, ingredients = [];

async function getCockail() {
    let url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);

    urlImg = data.drinks.map(drink => drink.strDrinkThumb);
    cocktailName = data.drinks.map(drink => drink.strDrink);
    alcoholic = data.drinks.map(drink => drink.strAlcoholic);
    description = data.drinks.map(drink => drink.strInstructionsIT);
    ingredients = data.drinks.map(drink => [
        drink.strIngredient1,
        drink.strIngredient2,
        drink.strIngredient3,
        drink.strIngredient4,
        drink.strIngredient5,
        drink.strIngredient6,
        drink.strIngredient7,
        drink.strIngredient8,
        drink.strIngredient9,
        drink.strIngredient10,
        drink.strIngredient11,
        drink.strIngredient12,
        drink.strIngredient13,
        drink.strIngredient14,
        drink.strIngredient15
    ]);
    ingredients = ingredients[0].filter(ingredient => ingredient !== null).join(', ');


    document.getElementById('cocktailImg').setAttribute('src', urlImg);
    document.getElementById('name').innerText = cocktailName;
    document.getElementById('alcoholic').innerText = alcoholic;
    document.getElementById('ingredients').innerText = ingredients;
    document.getElementById('description').innerText = description;
}
getCockail().catch(e => console.error("Si è verificato un errore (GET METHOD) " + e));

// ======================== * 
// (CHANGE) BUTTON
// ======================== * 
const change = document.getElementById("change");
change.addEventListener("click", () => getCockail());

// ======================== *
// (ADD) BUTTON
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
// (BUY) BUTTON 
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
        }).catch((e) => {
            console.error("Assicurati di essere connesso al Database (db.json) " + e);
        }).then((res) => {
            if (res === undefined) {
                throw new Error("Il server non è connesso");
            } else if (res.status >= 400 && res.status <= 451) {
                throw new Error("Errore di risposta Client " + res.status + ' ' + res.statusText);
            } else if (500 >= res.status >= 511) {
                throw new Error("Errore di risposta Server " + res.status + ' ' + res.statusText);
            } else if (res.ok === true) {
                return localStorage.setItem("order", ordersList);
            }
        }).catch((e) => {
            console.error("RESPONSE POST METHOD: " + e);
        })
    } catch (error) {
        console.error(error);
    };
});

// LOCAL STORAGE DATA
if (data !== null && data.length > 0) {
    orderDom.innerText = "Ordine effettuato: " + data;
} else {
    orderDom.innerText = "Effettua il tuo ordine!"
};