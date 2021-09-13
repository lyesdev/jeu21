/* Traite le formulaire initial.
Lance le jeu (classe Board). */

document.addEventListener('DOMContentLoaded', () => {
    

    let containerGame = document.querySelectorAll("[data-js-jeu21]");
    let nbrJoueursMax = 5;

    for(let i = 0 , l = containerGame.length ; i < l; i++){
        let btnSubmit =  containerGame[i].querySelector("[data-js-submit]");
        let inputNbrJoueurs = containerGame[i].querySelector("[data-js-input]");
        let form = containerGame[i].querySelector("[data-js-form]");
        let msgErreur = containerGame[i].querySelector("[data-js-error-msg]");

        btnSubmit.addEventListener("click", function(e){
            e.preventDefault();


            let nbrJoueurs = inputNbrJoueurs.value;
            
            if(nbrJoueurs <= 0 || nbrJoueurs > nbrJoueursMax){
                msgErreur.innerHTML = `Le nombre de joueurs doit etre superieure a 0 et in ferieur a ${nbrJoueursMax }`;
            }else{
                msgErreur.innerHTML = "";
                   
                new Board (nbrJoueurs, containerGame[i], form); 
                form.classList.add("dispa");
                       
            }
        });

    }  

});