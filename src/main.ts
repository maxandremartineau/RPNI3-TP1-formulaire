import "./css/style.css";


// Steps left
let etape = 0;

const sections = document.querySelectorAll(".etape");
const suivant = document.querySelectorAll(".suivant");
const precedent = document.querySelectorAll(".precedent");

console.log(sections);

sections[0].classList.remove("hidden");


// MONTANTS
const montants = document.querySelectorAll(
  'input[name="montant"]'
) as NodeListOf<HTMLInputElement>;

const montantPersonnalise = document.getElementById(
  "montant-personnalise"
) as HTMLInputElement;


// Lorsqu'un montant est sélectionné,
// il est inscrit dans « Autre montant »
montants.forEach((montant) => {

  montant.addEventListener("change", () => {

    montantPersonnalise.value = montant.value;

  });

});


suivant.forEach((bouton) => {
  bouton.addEventListener("click", () => {

    if (!validerEtape(etape)) {
      return;
    }

    sections[etape].classList.add("hidden");

    etape++;

    sections[etape].classList.remove("hidden");
  });
});


precedent.forEach((bouton) => {
  bouton.addEventListener("click", () => {

    sections[etape].classList.add("hidden");

    etape--;

    sections[etape].classList.remove("hidden");
  });
});


// Interfaces

interface messageErreur {
    vide?: string;
    pattern?: string;
    type?: string;
}

interface erreursJSON {
    [fieldName: string]: messageErreur;
}

let messagesJSON: erreursJSON;


// Obtenir les messages du JSON

async function obtenirMessages(): Promise<void> {

    const reponse = await fetch('objJSONMessages.json');

    messagesJSON = await reponse.json();
}


// Afficher une erreur

function afficherErreur(
    element: HTMLInputElement,
    message: string
): void {

    const erreur = document.getElementById(`erreur-${element.id}`);

    if (erreur) {
        erreur.textContent = message;
    }
}


// Enlever une erreur

function enleverErreur(element: HTMLInputElement): void {

    const erreur = document.getElementById(`erreur-${element.id}`);

    if (erreur) {
        erreur.textContent = '';
    }
}


// Validation

function validerEtape(etape: number): boolean {

    let valide = true;

    switch (etape) {


        // ÉTAPE 1
        case 0:

            // TYPE DE VERSEMENT

            const versement = document.querySelector(
                'input[name="versement"]:checked'
            ) as HTMLInputElement;

            const erreurVersement =
                document.getElementById('erreur-versement');


            if (!versement) {

                if (erreurVersement) {

                    erreurVersement.textContent =
                        messagesJSON.versement.vide!;

                }

                valide = false;

            } else {

                if (erreurVersement) {

                    erreurVersement.textContent = '';

                }

            }


            // MONTANT

            const montant = document.querySelector(
                'input[name="montant"]:checked'
            ) as HTMLInputElement;


            const erreurMontant =
                document.getElementById('erreur-montant-personnalise');


            /*
             * L'utilisateur doit avoir :
             *
             * - soit sélectionné un montant prédéfini
             * - soit entré un montant personnalisé
             *
             * Les deux ne sont pas obligatoires.
             */

            if (!montant && montantPersonnalise.value.trim() === '') {

                if (erreurMontant) {

                    erreurMontant.textContent =
                        messagesJSON.montant.vide!;

                }

                valide = false;

            }


            /*
             * Si un montant personnalisé est entré,
             * on vérifie son format.
             */

            else if (
                montantPersonnalise.value.trim() !== '' &&
                !montantPersonnalise.checkValidity()
            ) {

                if (erreurMontant) {

                    erreurMontant.textContent =
                        messagesJSON.montant.pattern!;

                }

                valide = false;

            }


            else {

                if (erreurMontant) {

                    erreurMontant.textContent = '';

                }

            }

            break;



        // ÉTAPE 2
        case 1:


            // NOM

            const nomElement =
                document.getElementById('nom') as HTMLInputElement;


            if (nomElement.value.trim() === '') {

                afficherErreur(
                    nomElement,
                    messagesJSON.nom.vide!
                );

                valide = false;

            }

            else if (!nomElement.checkValidity()) {

                afficherErreur(
                    nomElement,
                    messagesJSON.nom.pattern!
                );

                valide = false;

            }

            else {

                enleverErreur(nomElement);

            }



            // PRÉNOM

            const prenomElement =
                document.getElementById('prenom') as HTMLInputElement;


            if (prenomElement.value.trim() === '') {

                afficherErreur(
                    prenomElement,
                    messagesJSON.prenom.vide!
                );

                valide = false;

            }

            else if (!prenomElement.checkValidity()) {

                afficherErreur(
                    prenomElement,
                    messagesJSON.prenom.pattern!
                );

                valide = false;

            }

            else {

                enleverErreur(prenomElement);

            }



            // ADRESSE

            const adresseElement =
                document.getElementById('adresse') as HTMLInputElement;


            if (adresseElement.value.trim() === '') {

                afficherErreur(
                    adresseElement,
                    messagesJSON.adresse.vide!
                );

                valide = false;

            }

            else if (!adresseElement.checkValidity()) {

                afficherErreur(
                    adresseElement,
                    messagesJSON.adresse.pattern!
                );

                valide = false;

            }

            else {

                enleverErreur(adresseElement);

            }



            // VILLE

            const villeElement =
                document.getElementById('ville') as HTMLInputElement;


            if (villeElement.value.trim() === '') {

                afficherErreur(
                    villeElement,
                    messagesJSON.ville.vide!
                );

                valide = false;

            }

            else if (!villeElement.checkValidity()) {

                afficherErreur(
                    villeElement,
                    messagesJSON.ville.pattern!
                );

                valide = false;

            }

            else {

                enleverErreur(villeElement);

            }



            // CODE POSTAL

            const codePostalElement =
                document.getElementById('code-postal') as HTMLInputElement;


            if (codePostalElement.value.trim() === '') {

                afficherErreur(
                    codePostalElement,
                    messagesJSON["code-postal"].vide!
                );

                valide = false;

            }

            else if (!codePostalElement.checkValidity()) {

                afficherErreur(
                    codePostalElement,
                    messagesJSON["code-postal"].pattern!
                );

                valide = false;

            }

            else {

                enleverErreur(codePostalElement);

            }



            // COURRIEL

            const courrielElement =
                document.getElementById('courriel') as HTMLInputElement;


            if (courrielElement.value.trim() === '') {

                afficherErreur(
                    courrielElement,
                    messagesJSON.courriel.vide!
                );

                valide = false;

            }

            else if (!courrielElement.checkValidity()) {

                afficherErreur(
                    courrielElement,
                    messagesJSON.courriel.pattern!
                );

                valide = false;

            }

            else {

                enleverErreur(courrielElement);

            }

            break;



        // ÉTAPE 3
        case 2:


            // NUMÉRO DE CARTE

            const numeroCarteElement =
                document.getElementById('numero-carte') as HTMLInputElement;


            if (numeroCarteElement.value.trim() === '') {

                afficherErreur(
                    numeroCarteElement,
                    messagesJSON["numero-carte"].vide!
                );

                valide = false;

            }

            else if (!numeroCarteElement.checkValidity()) {

                afficherErreur(
                    numeroCarteElement,
                    messagesJSON["numero-carte"].pattern!
                );

                valide = false;

            }

            else {

                enleverErreur(numeroCarteElement);

            }



            // EXPIRATION

            const expirationElement =
                document.getElementById('expiration') as HTMLInputElement;


            if (expirationElement.value.trim() === '') {

                afficherErreur(
                    expirationElement,
                    messagesJSON.expiration.vide!
                );

                valide = false;

            }

            else if (!expirationElement.checkValidity()) {

                afficherErreur(
                    expirationElement,
                    messagesJSON.expiration.pattern!
                );

                valide = false;

            }

            else {

                enleverErreur(expirationElement);

            }



            // CODE DE VALIDATION

            const validationElement =
                document.getElementById('validation') as HTMLInputElement;


            if (validationElement.value.trim() === '') {

                afficherErreur(
                    validationElement,
                    messagesJSON.validation.vide!
                );

                valide = false;

            }

            else if (!validationElement.checkValidity()) {

                afficherErreur(
                    validationElement,
                    messagesJSON.validation.pattern!
                );

                valide = false;

            }

            else {

                enleverErreur(validationElement);

            }

            break;
    }


    return valide;
}


// Charger le JSON

obtenirMessages();