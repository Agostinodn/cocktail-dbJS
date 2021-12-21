let urlImg, cocktailName, alcoholic, description = '';
let change = document.getElementById("change");

async function getCockail() {
    try {
        let url = `https://www.thecocktaildb.com/api/json/v1/1/random.php`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
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

change.addEventListener("click", () => getCockail());