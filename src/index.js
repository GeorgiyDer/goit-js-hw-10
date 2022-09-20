import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';
// import { fetchCountries } from '../src/fetchCountries';

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
                const ListMarkupToRender = makeList(country)
                makeRenderLi(ListMarkupToRender)
                
            } else { 
                const divMarkupToRender = makeDiv(country)
                makeRenderDiv(divMarkupToRender)
                
            }
            
    })
    .catch(error => { 
        Notiflix.Notify.failure('Oooop? there is no country with that name');
    })
    }
    
}   


function makeList(country) { 
    const markupList = []
    for (let i = 0; i < country.length; i++) {
        const markupLi = `<li class="flex"><img src="${country[i].flags.svg}" alt="national flag of ${country[0].name.official} width="30" height="30" >${country[i].name.official}</li>`
        markupList.push(markupLi)
    }
    return markupList.join('')
}
function makeRenderLi(ListMarkupToRender) {
    ulEl.insertAdjacentHTML("afterbegin", ListMarkupToRender);
    ulEl.style.listStyle = "none"
}


function makeDiv(country) { 
    const markupDiv =
        `<ul style="list-style: none">
            <li class = "flex, name"><img src="${country[0].flags.svg}" alt="national flag of ${country[0].name.official} width="30" height="30">${country[0].name.official}</li>
            <li>Capital: ${country[0].capital}</li>
            <li>population: ${country[0].population}</li>
            <li>languages: ${Object.values(country[0].languages)}</li>
        </ul>
        `
    return markupDiv
    
}   

function makeRenderDiv(divMarkupToRender) { 
    divEl.insertAdjacentHTML("afterbegin", divMarkupToRender);
}


function deleteInfo() {
    ulEl.innerHTML = ''
    divEl.innerHTML = ''
}