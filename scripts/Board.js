
class Board {

    constructor(nbrJoueurs, containerGame, form) {
        this._containerGame = containerGame;
        this._nbrJoueurs = nbrJoueurs;/* chiffre entre par l utulisateur "nombre de jours" */
        this._form = form;
        this._tableJeu = this._containerGame.querySelector("[data-js-table]");
        this._board = this._containerGame.querySelector("[data-js-board]");
        this._carte = JSON.parse(sessionStorage.jeuCartePartie);/*  variable qui representera le jeu de carte de la partie */

        this.init();

    }
    
    init = () =>{
        this.creationDomJouers();      
    } 

    creationDomJouers =() => {     
        /* Création du DOM des joueurs */
        for(let i = 0; i < this._nbrJoueurs; i++){
            this._tableJeu.insertAdjacentHTML('beforeend',
            `<div class="joueur" data-js-joueur>
                <div class="mainJoueur" data-js-mainJoueur></div>
                <div class="carteTire" data-js-carteTire></div>
                <div class="points" data-js-ponits></div>
                <div class="btn_action">
                    <button class="jouer" data-js-jouer>Jouer</button>
                    <button class="stoper" data-js-stoper>Stop</button>
                </div>
            </div>`);
        }
        let containerJoueur = this._containerGame.querySelectorAll("[data-js-joueur]");
        for(let i = 0; i < containerJoueur.length; i++){ /* Création e joueurs selon le nombre entre par l’utilisateur */
            new Player(containerJoueur[i], this._tableJeu, this._form, this._carte);
        }
        this.commencer();
    }

    commencer = () =>{
        
        sessionStorage.setItem("meilleurScore", 0);/* Initiation du meilleur score a 0 */
        this._joueurs =   this._board.querySelectorAll("[data-js-joueur]");
        for(let i = 0; i < this._joueurs.length; i++){
            if(i > 0){
                this._joueurs[i].classList.add("desactiver");/* Désactivation tous les joueurs */
            }
        }
    
    }



};