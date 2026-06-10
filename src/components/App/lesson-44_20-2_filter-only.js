

// import '../css/lesson-44_20-2_filter-only.css'

//! Підключення бібліотеки Lodash з NPM
import lodash from 'lodash'; 
//! === Імпорт json-файлу для створення data ===
// import data from "../json/cards_4-10.json" // 4 картки 10-а сторінка
import data from "../json/cards_10-10.json" // 10 карток 10-а сторінка
console.log("data:", data); //!

// const data = [
//     {
//         userId: 4,
//         id: "37",
//         title: "provident vel ut sit ratione est",
//         body: "debitis et eaque non officia sed nesciunt pariatur vel..."
//     },
//     {
//         userId: 4,
//         id: "38",
//         title: "explicabo et eos deleniti nostrum ab id repellendus",
//         body: "animi esse sit aut sit nesciunt assumenda eum voluptas..."
//     },
//     {
//         userId: 4,
//         id: "39",
//         title: "eos dolorem iste accusantium est eaque quam",
//         body: "corporis rerum ducimus vel eum accusantium..."
//     },
//     {
//         userId: 4,
//         id: "40",
//         title: "enim quo cumque",
//         body: "ut voluptatum aliquid illo tenetur nemo sequi quo facilis..."
//     }
// ];

const searchInput = document.getElementById('search');
const cardsContainer = document.getElementById('cards');
const counterEl = document.getElementById('counter');


//! +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//! Первинне відображення всіх карток
renderCards(data);

//! Cлухаємо введення даних в інпут
// searchInput.addEventListener('input', debouncedFilter); // todo: var.1
// todo: var.2
// searchInput.addEventListener('input', filtersInputData); //! без debounce
// searchInput.addEventListener('input', _.debounce(filtersInputData, 300)); //! Lodash з CDN
searchInput.addEventListener('input', lodash.debounce(filtersInputData, 300)); //! Lodash з NPM
//! ---------------------------------------------------------------------------------------------


//! Функція debounce — затримка введення даних 300мс
// todo: var.1
// const debouncedFilter = _.debounce((event) => {
//     const value = event.target.value.trim();
//     filterCards(value);
// }, 300);
// todo: var.2
function filtersInputData(event) {
    const value = event.target.value.toLowerCase().trim();
    filterCards(value);
};


//! Функція фільтрації карток
function filterCards(keyword) {
    const lowerKeyword = keyword.toLowerCase();
    const filtered = data.filter(item =>
        item.title.toLowerCase().includes(lowerKeyword)
    );
    renderCards(filtered, keyword);
};


//! Функція для відображення карток після ДО та ПІСЛЯ фільтрації
function renderCards(items, keyword = '') {
    cardsContainer.innerHTML = '';

    if (items.length === 0) {
        cardsContainer.innerHTML = '<p class="empty">Нічого не знайдено... 😕</p>';
        updateCounter(0);
        return;
    };

    updateCounter(items.length);

    //todo: var.1
    items.forEach(item => {
        const card = document.createElement('li');
        card.className = 'card';
        card.innerHTML = `
            <h3>${highlightText(item.title, keyword)}</h3>
            <p>${item.body}</p>
        `;
        cardsContainer.appendChild(card);
        //! Анімація при появі
        setTimeout(() => card.classList.add('show'), 50);
    });

    //todo: var.2 (без Анімації при появі)
    // const markup = items
    //     .map((item) => {
    //     return `
    //         <li class="card show">
    //             <h3>${highlightText(item.title, keyword)}</h3>
    //             <p>${item.body}</p>
    //         </li>
    //     `;
    // })
    // .join("");
    // // cardsContainer.innerHTML = ""; //todo: var.1
    // // cardsContainer.insertAdjacentHTML("beforeend", markup); //todo: var.1
    // cardsContainer.innerHTML = markup; //todo: var.2
    // console.log("markup:", markup); //!
};


//! Функція оновлення лічильника
function updateCounter(count) {
    counterEl.textContent = `Знайдено: ${count} ${getWordForm(count, ['картка', 'картки', 'карток'])}`;
};


//! Функція підсвічування тексту
function highlightText(text, keyword) {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword})`, 'gi');
    return text.replace(regex, `<span class="highlight">$1</span>`);
};


//! Функція для відмінювання слова “картка”
function getWordForm(number, words) {
    const n = Math.abs(number) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return words[2];
    if (n1 > 1 && n1 < 5) return words[1];
    if (n1 === 1) return words[0];
    return words[2];
};
