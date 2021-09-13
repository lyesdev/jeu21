
class Player extends Game {
    
    constructor(el, tableJeu, form, carteJeu) {

        super(el, tableJeu, form, carteJeu);

        this._tirage = this._tableJeu.parentNode.querySelector(".tirage");      
        this._btnJouer = this._el.querySelector("[data-js-jouer]");
        this._btnStoper = this._el.querySelector("[data-js-stoper]");
        this._nomCarte = this._el.querySelector("[data-js-carteTire]");
        this._points= this._el.querySelector("[data-js-ponits]");
        this._main = this._el.querySelector("[data-js-mainJoueur]");
        this._carteComplette = JSON.parse(sessionStorage.jeuCarteOriginal); /* Je laisse cette variable intact pour récupérer les données des cartes servies  */
        
        this._total = 0; /* score joueur */
        this._carteRetirer = 0;/* Carte tirée au hasard est encore disponible au niveau de   this._carte */

        
        this.init();
        
    }
    set carteRetirer(c){
        this._carteRetirer = c; 
    }
    set total(ca){
        this._total = ca;
    }

    init = () =>{
        this.jouer();
        this.stop();
    }

    /* au clic sur le bouton jouer */
    jouer = () =>{
       
        this._btnJouer.addEventListener('click', (e) => {
            /* À chaque tirage je mets en vedette la carte tirée et je supprime l’ancienne */
            this._tirage.innerHTML = "";

            /*  Je donne une valeur au hasard a this._cart Retirer encore disponible dans la carte restante  */
            this.carteARetirer()

            /* J enlève la carte tirée de mon jeu de carte "" */
            for (const prop in this._carte) {
                if(this._carte[prop].id == (this._carteRetirer+1)){          
                    delete this._carte[prop];
                } 
            }
            /* Je remplis le DOM du joueur qui a la main */
            this._nomCarte.insertAdjacentHTML('beforeend',`<h3>${this._carteComplette[this._carteRetirer].nom}</h3>`);/*je prends les informations de la carte service de la variable session jeuCarteOriginal */
            this._tirage.insertAdjacentHTML('beforeend',`<img src="./img/cartes/${this._carteComplette[this._carteRetirer].id}.svg"></img>`);
            this._main.insertAdjacentHTML('beforeend',`<img src="./img/cartes/${this._carteComplette[this._carteRetirer].id}.svg"></img>`);
            this.total =(this._total + this._carteComplette[this._carteRetirer].valeur); /* J’implémente le total du joueur avec la valeur de la carte servi e*/
            this._points.innerHTML=`<h3> Votre Score est de : ${this._total}</h3>`;

            sessionStorage.setItem("jeuCartePartie", JSON.stringify(this._carte));/* Enlever la carte de la variable session jeuCartePartie, et cela, en écrasant les données avec les données de this._carte  pour que le prochain joueur ne trouve pas la carte retirée*/

            this._el.setAttribute(`data-js-score`, `${this._total}`);  
            /* je stop Si le joueur dépasse 21 */
            if(this._total> 21){
                this._el.classList.add("perdu"); 
                this._tirage.innerHTML = "";                 
            }
            /* je passe la main au joueur suivant */
            this.joueurSuivant();

        });
    }
    /* Au clic sur le bouton stop */
    stop = () =>{
        this._btnStoper.addEventListener('click', (e) => {    
        this._tirage.innerHTML = "";
        /* Si le score du joueur et plus grand que la sessionStorage  'meilleurScore' [créé au niveau de board] alors j actualise la valeur de cette dernière */
        if(this._total > sessionStorage.getItem('meilleurScore') && this._total <= 21){
            sessionStorage.setItem("meilleurScore", this._total);
        }
        this._el.classList.add("stop"); 
        this.joueurSuivant();
             
    });
    }
    /* Une fonction pour avoir un chiffre au hasard copie de w3s */
    getRandomInt = (min, max) =>{ 
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
    /* Je fais une boucle pour vérifier si le chiffre aléatoire est encore disponible au niveau de mon jeu de carte, si oui je modifie this.carteRetirer */
    carteARetirer = () =>{
        for(let i = 0; i < this._carte.length; i++){
            let chiffe = this.getRandomInt(0, this._carte.length-1);
                if(this._carte[chiffe] !== undefined){                   
                    this.carteRetirer = chiffe; 
                    break;
                }
                       
            } 
        
    }
};