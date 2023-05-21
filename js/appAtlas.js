import {appMeneger } from "./atlasManeger.js";

const init = () => {
  doApi();
}

export const doApi = async () => {
  let url = "https://restcountries.com/v3.1/all";
  try {
      let resp = await fetch(url);
      let data = await resp.json();
      appMeneger(data, shortTofullCountry);
  }
  catch(err){
      console.log(err);
      alert("There problem, come back later")
    }
}

const shortTofullCountry = async (codeCountry) => {
  let url = `https://restcountries.com/v3.1/alpha/${codeCountry}`;
  let resp = await fetch(url);
  let data = await resp.json();
  let fullCountry = await (data[0].name.common);
  return fullCountry;
}

init();