import "./css/style.css";

// ==============================
// VARIABLES
// ==============================

let etape = 0;

const sections = document.querySelectorAll(".etape");
const suivant = document.querySelectorAll(".suivant");
const precedent = document.querySelectorAll(".precedent");
const etapesNavigation = document.querySelectorAll("nav li");

const montants = document.querySelectorAll(
    'input[name="montant"]'
) as NodeListOf<HTMLInputElement>;

const montantPersonnalise = document.getElementById(
    "montant-personnalise"
) as HTMLInputElement;


// ==============================
// INTERFACES
// ==============================

interface messageErreur {
    vide?: string;
    pattern?: string;
    type?: string;
}

interface erreursJSON {
    [fieldName: string]: messageErreur;
}

let messagesJSON: erreursJSON;


// ==============================
// INITIALISATION
// ==============================

function initialiser(): void {

    afficherEtape();

    initialiserMontants();
    initialiserBoutons();

    obtenirMessages();
}


// ==============================
// GESTION DES ÉTAPES
// ==============================

function afficherEtape(): void {

    sections.forEach((section, index) => {
        section.classList.toggle("hidden", index !== etape);
    });

    etapesNavigation.forEach((item, index) => {
        if (index === etape) {
            item.setAttribute("aria-current", "step");
        } else {
            item.removeAttribute("aria-current");
        }
    });
}


function allerEtapeSuivante(): void {

    if (!validerEtape(etape)) {
        return;
    }

    etape++;
    afficherEtape();
}


function allerEtapePrecedente(): void {

    etape--;

    afficherEtape();
}


// ==============================
// BOUTONS
// ==============================

function initialiserBoutons(): void {

    suivant.forEach((bouton) => {
        bouton.addEventListener("click", allerEtapeSuivante);
    });

    precedent.forEach((bouton) => {
        bouton.addEventListener("click", allerEtapePrecedente);
    });
}


// ==============================
// MONTANTS
// ==============================

function initialiserMontants(): void {

    montants.forEach((montant) => {

        montant.addEventListener("change", () => {
            montantPersonnalise.value = montant.value;
        });

    });
}


// ==============================
// MESSAGES JSON
// ==============================

async function obtenirMessages(): Promise<void> {

    const reponse = await fetch("objJSONMessages.json");

    messagesJSON = await reponse.json();
}


// ==============================
// GESTION DES ERREURS
// ==============================

function afficherErreur(
    element: HTMLInputElement,
    message: string
): void {

    const erreur = document.getElementById(`erreur-${element.id}`);

    if (erreur) {
        erreur.textContent = message;
    }
}


function enleverErreur(element: HTMLInputElement): void {

    const erreur = document.getElementById(`erreur-${element.id}`);

    if (erreur) {
        erreur.textContent = "";
    }
}


// ==============================
// VALIDATION D'UN CHAMP
// ==============================

function validerChamp(
    element: HTMLInputElement,
    message: messageErreur
): boolean {

    if (element.value.trim() === "") {

        afficherErreur(element, message.vide!);

        return false;
    }

    if (!element.checkValidity()) {

        afficherErreur(element, message.pattern!);

        return false;
    }

    enleverErreur(element);

    return true;
}


// ==============================
// VALIDATION DES ÉTAPES
// ==============================

function validerEtape(etape: number): boolean {

    let valide = true;

    switch (etape) {

        // ==========================
        // ÉTAPE 1
        // ==========================

        case 0: {

            // Type de versement
            const versement = document.querySelector(
                'input[name="versement"]:checked'
            ) as HTMLInputElement;

            const erreurVersement =
                document.getElementById("erreur-versement");

            if (!versement) {

                if (erreurVersement) {
                    erreurVersement.textContent =
                        messagesJSON.versement.vide!;
                }

                valide = false;

            } else {

                if (erreurVersement) {
                    erreurVersement.textContent = "";
                }
            }


            // Montant
            const montant = document.querySelector(
                'input[name="montant"]:checked'
            ) as HTMLInputElement;

            const erreurMontant =
                document.getElementById(
                    "erreur-montant-personnalise"
                );


            if (!montant && montantPersonnalise.value.trim() === "") {

                if (erreurMontant) {
                    erreurMontant.textContent =
                        messagesJSON.montant.vide!;
                }

                valide = false;

            } else if (
                montantPersonnalise.value.trim() !== "" &&
                !montantPersonnalise.checkValidity()
            ) {

                if (erreurMontant) {
                    erreurMontant.textContent =
                        messagesJSON.montant.pattern!;
                }

                valide = false;

            } else {

                if (erreurMontant) {
                    erreurMontant.textContent = "";
                }
            }

            break;
        }


        // ==========================
        // ÉTAPE 2
        // ==========================

        case 1: {

            const champs = [
                "nom",
                "prenom",
                "adresse",
                "ville",
                "code-postal",
                "courriel"
            ];

            champs.forEach((id) => {

                const element =
                    document.getElementById(id) as HTMLInputElement;

                if (
                    !validerChamp(
                        element,
                        messagesJSON[id]
                    )
                ) {
                    valide = false;
                }

            });

            break;
        }


        // ==========================
        // ÉTAPE 3
        // ==========================

        case 2: {

            const champs = [
                "numero-carte",
                "expiration",
                "validation"
            ];

            champs.forEach((id) => {

                const element =
                    document.getElementById(id) as HTMLInputElement;

                if (
                    !validerChamp(
                        element,
                        messagesJSON[id]
                    )
                ) {
                    valide = false;
                }

            });

            break;
        }
    }

    return valide;
}


// ==============================
// DÉMARRER LE PROGRAMME
// ==============================

initialiser();