const API_URL = 'https://api.edamam.com/search?';
const API_KEY = '735af4078042b214fc773d157aede3f4';
const APP_ID = '5ffce72c';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

const getRecipes = async dish => {
    const { data } = await axios(API_URL, {
        params: {
            q: dish,
            app_id: APP_ID,
            app_key: API_KEY,
        }
    });
    showRecipes(data.hits);
};

const showRecipes = recipes => {
    main.innerHTML = '';
    recipes.forEach(recipe => {   
        console.log(recipe) 
        const recipeEl = document.createElement('div');
        recipeEl.classList.add('card');
        recipeEl.innerHTML= `
            <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
            <div class="recipe-info">
                <h3>${recipe.recipe.label}</h3>
            </div>
            <div class="overview">
                <p>calories: ${recipe.recipe.calories}</p>
                <p>link:<a href="${recipe.recipe.url}"> ${recipe.recipe.url}</a></p>
            </div>
        `
        main.appendChild(recipeEl)
    })
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm && searchTerm!== '') {
        getRecipes(searchTerm);
        search.value = '';
    } else {
        window.location.reload();
    };
});