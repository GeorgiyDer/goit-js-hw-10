import './css/styles.css';
import debounce from 'lodash.debounce'

import Notiflix from 'notiflix';
// import fetchCountries from "../src/fetchCountries.js"
const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box')
const ulEl = document.querySelector('.country-list')
const divEl = document.querySelector('.country-info')
inputEl.addEventListener('input', debounce(onInputChanges, DEBOUNCE_DELAY));

function onInputChanges(e) { 
    const inputText = e.target.value.trim();
    deleteInfo()
    fetchCountries(inputText)
    
}

function fetchCountries(name) { 
    if (name !== "") { 
        fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    
    .then(response => { 
        return response.json();
    })
        .then(country => {
            
            if (country.length > 10) { 
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return
            }
            if (country.length > 1) {
                makeList(country)
                
            } else { 
                makeDiv(country)
                
            }
            
    })
    .catch(error => { 
        Notiflix.Notify.failure('Oooop? there is no country with that name');
    })
    }
    
} 

function makeList(country) { 
    for (let i = 0; i < country.length; i++) {
        const markupLi = `<li><img src="${country[i].flags.svg}" width="20" height="20" >${country[i].name.official}</li>`
        console.log(markupLi);
        ulEl.insertAdjacentHTML("afterbegin", markupLi);
        ulEl.style.listStyle = "none"
    }
}

function makeDiv(country) { 
    const markupDiv =
        `<ul style="list-style: none">
            <li><img class = "img" src="${country[0].flags.svg}" width="20" height="20">${country[0].name.official}</li>
            <li>Capital: ${country[0].capital}</li>
            <li>population: ${country[0].population}</li>
            <li>languages: ${Object.values(country[0].languages)}</li>
        </ul>
        `
    divEl.insertAdjacentHTML("afterbegin", markupDiv);
    
}   



function deleteInfo() {
    ulEl.innerHTML = ''
    divEl.innerHTML = ''
}