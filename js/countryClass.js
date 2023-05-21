export default class countryClass {
    constructor(_parent, _item,  shortTofullCountry, createCountry) {
        this.parent = _parent;
        this.name = _item.name.common;
        this.flag = _item.flags.svg;
        this.pop = _item.population.toLocaleString();
        this.region = _item.region;
        this.languages = Object.keys(_item.languages);
        this.coin = Object.keys(_item.currencies);
        this.coinDescription = Object.values(_item.currencies)[0].name;
        this.capital = _item.capital;
        this.map = _item.latlng;
        this.borders = _item.borders;
        this.createCountry = createCountry;
        this.shortTofullCountry = shortTofullCountry;
    }

    render() {
        let div = document.createElement("div");
        div.setAttribute("data-aos", "fade-zoom-in");
        div.setAttribute("data-aos-easing", "ease-in-back");
        div.className = "m-3 p-4 border preBox shadow overflow-hidden country";
        document.querySelector(this.parent).append(div);

        div.innerHTML = `
        <h2>${this.name}</h2>
        <div class=" imgPreBox">
        <img src="${this.flag}" alt="${this.name}" class="pb-2">
        </div>
       `

        div.addEventListener("click", () => {
            document.querySelector(this.parent).innerHTML="";
            this.moreinfo();
         })
    }

    moreinfo(){
        let div = document.createElement("div");
        div.setAttribute("data-aos", "fade-up");
        div.className = "box p-0 m-3 shadow d-flex row";
        document.querySelector(this.parent).append(div);

        div.innerHTML = `
        <div class="col-md-6 p-2">
            <h2>${this.name}</h2>
            <div> POP: ${this.pop} </div>
            <div> Region: ${this.region}</div>
            <div> Languages: ${this.languages}</div>
            <div> Coin:  ${this.coin}, ${this.coinDescription}</div>
            <div> Capital: ${this.capital}</div>
            <div class="borders_div"></div>
            <div class=" imgPreBox">
                <img src="${this.flag}" alt="${this.name}" class="preImg pb-2">
            </div>
            <button class="btn btn-dark mt-3">less info</button>
        </div>

        <div class="p-2 col-md-6">
        <iframe class="col-12" height="100%" width="100%" src="https://maps.google.com/maps?q=${this.map[0]},${this.map[1]}&z=7&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" ></iframe>
        </div>
        `

        let borders_div = div.querySelector(".borders_div");
        if(this.borders){
            borders_div.innerHTML = `<strong>States with borders:</strong><br>`
            this.borders.forEach(async (item , index) => {
                let a = document.createElement("a");
                a.innerHTML = await this.shortTofullCountry(item);
                a.style = "color: rgb(53, 53, 184); cursor: pointer; "
                borders_div.append(a);

                if (index !== this.borders.length - 1) {
                    a.insertAdjacentText('afterend', ', ');
                }

                a.addEventListener("click", () => {
                    this.createCountry(a.innerHTML,true , false);
                })
            })
        }

        let less_info = div.querySelector('button');
        less_info.addEventListener("click", () => {
            document.querySelector(this.parent).innerHTML="";
            this.render();
        })
    }
}