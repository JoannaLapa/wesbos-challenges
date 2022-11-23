'use strict'

const endpoint =
	'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const cities = []
const search = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

fetch(endpoint)
	.then(blob => blob.json())
	.then(data => cities.push(...data))

function findMatches(wordToMatch, cities) {
	return cities.filter(place => {
		//here we figure out if state or city matches to that what user put
		const regex = new RegExp(wordToMatch, 'gi');
		return place.city.match(regex) || place.state.match(regex);
	})
}

function displayMatches() {
	const matchArray = findMatches(this.value, cities)
	console.log(matchArray)
	const html = matchArray.map(place => {
		const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class='h1'>${this.value}</span>`);
        const stateName =place.state.replace(regex, `<span class='h1'>${this.value}</span>`);
        return ` <li>
        <span class='name'>${cityName}, ${place.state}</span>
        <span class='population'>${place.population}</span>
        </li>`
       }).join('')
       suggestions.innerHTML = html;
}

search.addEventListener('change', displayMatches)
search.addEventListener('keyup', displayMatches)

//'gi' = g - blobal, i = insensitive

//co tu jeszcze mona zrobić - sprawdzic jak dziala geolokacja
//jakie miasta są najblizej mnie
