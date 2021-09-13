
class Game {
    
    constructor(el, tableJeu, form, carteJeu) {
        this._el = el;
        this._tableJeu = tableJeu;
        this._form = form;
        this._carte = carteJeu;
        this._tirage ="";
        this._positionActif = 0; /* position du joueur actif */
        this._joueursApresActif=0; /*Nombres des jours dans la position est après le joueur actif  */
        this._joueursStopOuPerdu= 0; /* Nombre des jours en mode stop ou qui ont perdu  */
    }
    get tirage(){
        return this._tirage;
    }
    set tirage(l){
        this._tirage = l;
    }
    set positionActif(y){
        this._positionActif = y;
    }
    set joueursApresActif(e){
        this._joueursApresActif = e;
    }
    
    set joueursStopOuPerdu(s){
        this._joueursStopOuPerdu = s;
    }

    
    init = () =>{

    } 

    /* Fonction qui passe d’un joueur a l’autre */
    joueurSuivant =() => { 
        
        let joueurs =  this._tableJeu.querySelectorAll("[data-js-joueur]"); /* tt les joueurs */
        /* Si le joueur actif a le joueur après lui qui n'a pas perdu ou stoppé  */
        if(this._el.nextElementSibling && !this._el.nextElementSibling.classList.contains("perdu") && !this._el.nextElementSibling.classList.contains("stop")){
            this._el.nextElementSibling.classList.remove("desactiver");
            this._el.classList.add("desactiver");
            /* Si le joueur actif a le joueur après lui qui a paru ou stoppé   */
        }else if(this._el.nextElementSibling && ( this._el.nextElementSibling.classList.contains("perdu") || this._el.nextElementSibling.classList.contains("stop"))){
            /* recuperation du joueur actif  */
            for(let k = 0; k < joueurs.length; k++){

                if(!joueurs[k].classList.contains("desactiver")){
                    this.positionActif = k;                  
                    break;                     
                }
                
            }
            /* Récupérer le joueur après le joueur actif qui n a ni perdu ni stoppé */
            for(let b = this._positionActif+1; b < joueurs.length; b++){

                if(!joueurs[b].classList.contains("perdu") && !joueurs[b].classList.contains("stop")){
                    
                    this.joueursApresActif = b +1;
                    
                }

            }

            /* S’il y a des jours après le joueur actif ni perdu ni stoppé  */
            if(this._joueursApresActif > 0){
                for(let b = this._positionActif+1; b < joueurs.length; b++){

                    if(!joueurs[b].classList.contains("perdu") && !joueurs[b].classList.contains("stop")){
                        joueurs[b].classList.remove("desactiver");
                        this._el.classList.add("desactiver");
                        
                        
                        break;
                    }
                }

            }else if(this._joueursApresActif == 0){/* S’il n’y a pas de jours après actif, je boucle à partir du joueur n 1  */
                for(let j = 0; j < joueurs.length; j++){
                    if(!joueurs[j].classList.contains("perdu") && !joueurs[j].classList.contains("stop")){
                        joueurs[j].classList.remove("desactiver");
                        this._el.classList.add("desactiver");

                        break;
                    }  
            
                }
            }
               
        }else if(!this._el.nextElementSibling){ /* si le joueur actif est le dernier joueur de la liste */
            for(let j = 0; j < joueurs.length; j++){
                if(!joueurs[j].classList.contains("perdu") && !joueurs[j].classList.contains("stop")){
                    joueurs[j].classList.remove("desactiver");
                    this._el.classList.add("desactiver");

                    break;
                }       
            }       
        }
        
        /* Nombre des jours en mode stop ou qui ont perdu  */
        for(let b = 0, cont =0; b < joueurs.length; b++){

            if(joueurs[b].classList.contains("perdu") || joueurs[b].classList.contains("stop")){
                cont++;
                this.joueursStopOuPerdu = cont;
                
            }

        }
        /* Si le joueur actif est le dernier à pouvoir joueur je lui redonne la main t que c possible */
        if(this._joueursStopOuPerdu == (joueurs.length-1) && !this._el.classList.contains("perdu") && !this._el.classList.contains("stop")){
            this._el.classList.remove("desactiver");
        }
        /* Si tt les joueurs sont désactivés fin de partie et je donne la main pour rejouer */
        if(this._joueursStopOuPerdu == (joueurs.length)){
            this._el.classList.add("desactiver");
            this.finPartie();
            this.rejouer();
        }
           
    }   


    finPartie = () =>{

       this._tableJeu.insertAdjacentHTML("afterend","<button class ='btn_rejouer' data-js-rejouer>Rejouer</button>");
        
        let joueurs =  this._tableJeu.querySelectorAll("[data-js-joueur]");
        for(let i = 0; i < joueurs.length; i++){
            
            if(joueurs[i].dataset.jsScore == Number(sessionStorage.getItem('meilleurScore'))){

            joueurs[i].classList.add("gagnant"); /* Le jouer qui a un score = au meilleur score je lui ajoute la class gagnant   */
            }
            
        }

    }

    rejouer = () =>{
        let rejouer =  this._tableJeu.parentNode.querySelector("[data-js-rejouer]");
        this.tirage = this._tableJeu.parentNode.querySelector(".tirage");
        /* Au clic sur rejouer vide le DOM et reparaitre le form */
        rejouer.addEventListener('click', (e) => {
            this._tirage.innerHTML = ""; 
            this._tableJeu.innerHTML = "";
            this._tableJeu.parentNode.querySelector("[data-js-rejouer]").remove();
            this._form.classList.remove("dispa");
            sessionStorage.setItem("jeuCartePartie", sessionStorage.jeuCarteOriginal);/* un nouveau jeu de carte pour la nouvelle partie */
        });
    }
    
};
