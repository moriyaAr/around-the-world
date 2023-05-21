export const declareEvents = (createCountry,homeState,displaySuggestions) => {
    let id_input = document.querySelector("#id_input")
    let btn_Search = document.querySelector("#btn_Search");
    let home = document.querySelector('#id_home');
    let linksBox = document.querySelector(".links")
    const links = linksBox.querySelectorAll('a');

    links.forEach(function(link) {
    link.addEventListener('click', () => {
        createCountry(link.innerHTML);
    })
    });
  
    id_input.addEventListener("input", () => {
        displaySuggestions(id_input.value);
    })
  
    id_input.addEventListener("keydown", (e) => {
        if (e.key == 'Enter')
            createCountry(id_input.value);
    })

    id_input.addEventListener("enter", (e) => {
        if (e.key == 'Enter')
            createCountry(id_input.value);
    })

    btn_Search.addEventListener("click", () => {
        createCountry(id_input.value);
    })

    home.addEventListener("click", () => {
        homeState();
    })
}







  