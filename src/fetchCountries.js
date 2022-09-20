export default function fetchCountries(name) { 
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