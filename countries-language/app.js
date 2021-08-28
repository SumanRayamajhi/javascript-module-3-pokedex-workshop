const URL = "https://restcountries.eu/rest/v2/lang/en";

/*Create function that return all the countries which currency be as 
  a parameter USD
  and create another function that show the name of that countries 
  in the console 
  */

// function countriesWithUSD(countries, currency) {
//   const usdCountries = countries.filter(({ currencies }) => {
//     return currencies.some(({ code }) => code === currency);
//   });
//   return usdCountries;
// }

// const printCountriesName = countries => {
//     countries.map(({ name }) => console.log(name))
// }

// fetch(URL)
//   .then((response) => response.json())
//   .then((countries) => {
//       const filteredCountries = filteredCountriesByCurrency(countries, "USD");
//       printCountriesName(filteredCountries);
//   }

/*Using the same filtered array, just show the name of those countries that also speak spanish. Try to use destructuring 
  when ever you can
  */

function spanishSpeakingCountries(countries, language) {
  const spanishLanguage = countries.filter(({ languages }) => {
    return languages.some(({ name }) => name === language);
  });
  return spanishLanguage;
}

const printCountriesName = (countries) => {
  countries.map(({ name }) => console.log(name));
};

fetch(URL)
  .then((response) => response.json())
  .then((countries) => {
    const spanishLanguage = spanishSpeakingCountries(countries, "Spanish");
    printCountriesName(spanishLanguage);
  });
