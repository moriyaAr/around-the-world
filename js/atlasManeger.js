import countryClass from "./countryClass.js";
import { declareEvents } from "./declareEvents.js"

let all_countries = [];
let shortTofullCountry;

export const appMeneger = (data,shortTofullC) =>{
    all_countries= data;
    shortTofullCountry = shortTofullC;
    homeState();
    declareEvents(createCountry,homeState,displaySuggestions);
}

export const displaySuggestions = (currentText) => {
    const suggestions = [];
    all_countries.forEach(function(word) {
      if ((word.name.common.toLowerCase()).startsWith(currentText)) {
        suggestions.push(word.name.common.toLowerCase());
      }
    });
    const dropdown = document.getElementById('dropdown');
    dropdown.innerHTML = '';
    suggestions.forEach(function(suggestion) {
      const option = document.createElement('option');
      option.value = suggestion;
      dropdown.appendChild(option);
    });
}

export const createCountry = (countryName , toClear = true , pre = true) => {

    let arr = all_countries.filter((item) =>
      item.cca3.toLowerCase().includes(countryName.toLowerCase()) ||
      item.name.common.toLowerCase().includes(countryName.toLowerCase())
    );
    let parent = document.querySelector("#id_parent");
    if(toClear){
    parent.innerHTML = "";
    }

    if (arr.length > 0) {
        arr.forEach((item) => {
            let country = new countryClass("#id_parent",item,shortTofullCountry, createCountry);
            if(pre){
              country.render(); 
            }
            else{
              country.moreinfo();
            }
        });
      } else {
        document.querySelector(
          "#id_parent"
        ).innerHTML = `<h2>Country ${_input} is  not found </h2>`;
      }
}

export const homeState = () => {
    document.querySelector("#id_parent").innerHTML="";
    let linksBox = document.querySelector(".links")
    const links = linksBox.querySelectorAll('a');
    links.forEach(function(link) {
        createCountry(link.innerHTML, false);
    });
}
