import "./css/style.css";


// Steps left
let etape = 0;

const sections = document.querySelectorAll(".etape");
const suivant = document.querySelectorAll(".suivant");
const precedent = document.querySelectorAll(".precedent");

console.log(sections);

sections[0].classList.remove("hidden");

suivant.forEach((bouton) => {
  bouton.addEventListener("click", () => {
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

// interface

// Validations

// function validerEtape(etape:number): boolean{
//   case 0:
//     const nomElemen = document.getElementById('nom');
// }

// async function obtenirMessages(): Promise<void> {
//   const reponse: await fetch('objJSONMessages.json');            
//   messagesJSON = await reponse.json();
// }