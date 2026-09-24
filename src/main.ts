import "./css/style.css";

// ==============================
// VARIABLES
// ==============================

let etape = 0;

let etapesValidees: boolean[] = [false, false, false, false];

const sections = document.querySelectorAll(".etape");
const suivant = document.querySelectorAll(".suivant");
const precedent = document.querySelectorAll(".precedent");
const etapesNavigation = document.querySelectorAll(".cercle-etape");

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
        // Étape actuelle
        if (index === etape) {
            item.setAttribute("aria-current", "step");
        } else {
            item.removeAttribute("aria-current");
        }

    // Étapes qui ne sont pas encore accessibles
    if (index > 0 && !etapesValidees[index - 1]){
        item.setAttribute("aria-disabled", "true");
    } else{
        item.removeAttribute("aria-disabled");
    }

    });
}


function allerEtapeSuivante(): void {

    if (!validerEtape(etape)) {
        return;
    }

    etapesValidees[etape] = true;

    etape++;
    
    if (etape === 3) {
        mettreAJourResume();
    }

    afficherEtape();
    mettreAJourEtapes();
}


function allerEtapePrecedente(): void {

    etape--;
    afficherEtape();
    mettreAJourEtapes();
}


// ==============================
// MISE À JOUR (STEPS LEFT)
// ==============================

function mettreAJourEtapes(): void {
    const cercle = document.querySelectorAll(".cercle-etape");
    const ligne = document.querySelectorAll(".ligne-etape");

    cercle.forEach((cercle, index) => {
        cercle.classList.remove(
            "bg-[#FFB42D]",
            "bg-white",
            "border-[#FFB42D]",
            "border-[#17294E]",
            "text-[#17294E]",
            "text-black"
        );

        if (index < etape) {
            // Étape complétée
            cercle.classList.add(
                "bg-[#FFB42D]",
                "border-[#FFB42D]",
                "text-black"
            );
            cercle.innerHTML = `<img src="src/assets/check.svg" alt="" class="w-6 h-6">`;
        }
        else if (index === etape) {
            // Étape en cours
            cercle.classList.add(
                "bg-white",
                "border-[#FFB42D]",
                "text-black"
            );
            cercle.textContent = String(index + 1);
        }
        else {
            // Étape à faire
            cercle.classList.add(
                "bg-white",
                "border-[#17294E]",
                "text-[#17294E]"
            );
            cercle.textContent = String(index + 1);
        }
        // Accessibilité
        if (index > 0 && !etapesValidees[index - 1]) {
            cercle.setAttribute("aria-disabled", "true");
        } else {
            cercle.removeAttribute("aria-disabled");
        }

    });

    ligne.forEach((ligne, index) => {
        ligne.classList.remove(
            "bg-[#FFB42D]",
            "bg-[#17294E]"
        );

        if (index < etape) {
            ligne.classList.add("bg-[#FFB42D]");
        }
        else {
            ligne.classList.add("bg-[#17294E]");
        }
    });
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

    etapesNavigation.forEach((lien, index)=>{

        lien.addEventListener("click",(event)=>{

            // Impossible d'aller a un étape future
            if(index > etape){
                event.preventDefault();
                return;
            }

            // Si on revient en arrière
            if(index < etape){
                for(let indexEtape = index; indexEtape < etapesValidees.length; indexEtape++){
                    etapesValidees[indexEtape] = false
                }
            }
            
            etape = index;

            afficherEtape();
            mettreAJourEtapes();
        })
    })
}

// ==============================
// RÉSUMÉ
// ==============================

function mettreAJourResume(): void{

    // Variables
    const versementUnique = document.getElementById("versement-unique") as HTMLInputElement;
    const versementMensuel = document.getElementById("versement-mensuel") as HTMLInputElement;

    const montant5 = document.getElementById("montant-5") as HTMLInputElement;
    const montant10 = document.getElementById("montant-10") as HTMLInputElement;
    const montant20 = document.getElementById("montant-20") as HTMLInputElement;
    const montant50 = document.getElementById("montant-50") as HTMLInputElement;
    const montant200 = document.getElementById("montant-200") as HTMLInputElement;
    
    const nom = document.getElementById("nom") as HTMLInputElement;
    const prenom = document.getElementById("prenom") as HTMLInputElement;
    const adresse = document.getElementById("adresse") as HTMLInputElement;
    const ville = document.getElementById("ville") as HTMLInputElement;
    const codePostal = document.getElementById("code-postal") as HTMLInputElement;
    const courriel = document.getElementById("courriel") as HTMLInputElement;
    
    const visa = document.getElementById("visa") as HTMLInputElement;
    const mastercard = document.getElementById("mastercard") as HTMLInputElement;
    const amex = document.getElementById("amex") as HTMLInputElement;

    // Type de versement
    if (versementUnique.checked){
        document.getElementById("resume-versement")!.textContent = "Un versement unique" ;
    } else if (versementMensuel.checked){
        document.getElementById("resume-versement")!.textContent = "Un versement à chaque mois";
    }
    
    // Montants
    if (montantPersonnalise.value.trim() !== "") {

        document.getElementById("resume-montant")!.textContent =
            montantPersonnalise.value + " $";

    } else if (montant5.checked) {

        document.getElementById("resume-montant")!.textContent =
            "5 $";

    } else if (montant10.checked) {

        document.getElementById("resume-montant")!.textContent =
            "10 $";

    } else if (montant20.checked) {

        document.getElementById("resume-montant")!.textContent =
            "20 $";

    } else if (montant50.checked) {

        document.getElementById("resume-montant")!.textContent =
            "50 $";

    } else if (montant200.checked) {

        document.getElementById("resume-montant")!.textContent =
            "200 $";
    }

    // Informations du donateur
    document.getElementById("resume-nom")!.textContent = nom.value;
    document.getElementById("resume-prenom")!.textContent = prenom.value;
    document.getElementById("resume-adresse")!.textContent = adresse.value;
    document.getElementById("resume-ville")!.textContent = ville.value;
    document.getElementById("resume-code-postal")!.textContent = codePostal.value;
    document.getElementById("resume-courriel")!.textContent = courriel.value;

    // Type de carte
    if (visa.checked) {
        document.getElementById("resume-carte")!.textContent = "Visa";

    } else if (mastercard.checked) {
        document.getElementById("resume-carte")!.textContent = "Mastercard";

    } else if (amex.checked) {
        document.getElementById("resume-carte")!.textContent = "American Express";
    }
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
        erreur.innerHTML = `<img src="../src/assets/chienOpti.svg" alt="" class="w-4 h-4 inline-block mr-1"> ${message}`;
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