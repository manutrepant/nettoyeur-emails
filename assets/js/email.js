function checkCharactere() {
            
  // Return max length allowed in the textarea field.
  let x = document.querySelector("#sentence").maxLength;
  // console.log(x);
      
  document.querySelector("#sudo").innerHTML =
  "Maximum <strong>" + x + "</strong> caractères dans ce champs ";
  }
  checkCharactere()

  // ----------------------------------------------------------------------

  function caractFonct(cara, nbrcara) {
    const nombre = document.querySelector(".cara").value.length; // affichage Caractères
    // console.log(nombre);
    document.getElementById(nbrcara).innerHTML = nombre;
  }

// potDeMiel ---------------------------------------------

const honeyP = document.querySelector('#potDeMiel');
if (honeyP.value!==""){
alert("Une erreur est intervenue");
}; 

// ---- classement Alphabétique AZ ---------------------------------------------

          let flagAZ=0; // initialiser AZ à 0
          const checkboxA = document.querySelector('#a');
          checkboxA.addEventListener('change', e => {
          
              if(e.target.checked){
                // console.log("A");
                flagAZ=0;
              }
          });
          
          const checkboxZ = document.querySelector('#z');
          checkboxZ.addEventListener('change', e => {
          
              if(e.target.checked){
                // console.log("Z");
                flagAZ=1;
              }
          });
  

// ---- Export Point Virgule, Virgule, Espace ---------------------------------------------

let separator=0;
const checkboxPointVirgule = document.querySelector('#pointVirgule');
checkboxPointVirgule.addEventListener('change', e => {

    if(e.target.checked){
      // console.log("pointVirgule");
      separator = 0;
      // console.log(separator);
    }
});

const checkboxVirgule = document.querySelector('#virgule');
checkboxVirgule.addEventListener('change', e => {

    if(e.target.checked){
      // console.log("virgule");
      separator = 1;
      // console.log(separator);
    }
});

  // -----------------------------------------------------------
  
const checkboxEspace = document.querySelector('#espace');
checkboxEspace.addEventListener('change', e => {

    if(e.target.checked){
      // console.log("espace");
      separator = 2;
      // console.log(separator);
    }
});

  // -----------------------------------------------------------

const checkboxTableau = document.querySelector('#tableau');
checkboxTableau.addEventListener('change', e => {

    if(e.target.checked){
      // console.log("tableau");
      separator = 3;
      // console.log(separator);
    }
});

  // -----------------------------------------------------------

  // Cacher bouton reset
  document.querySelector("#reset").style.display = "none";
 
  // Bouton Reset
  function resetM() {
    const reset = document.querySelector("#reset"); // selection button
    reset.onclick = StartReset // quand clique;
  }

  // --------
  resetM() // Appel function
  // --------


  function StartReset() {
    const sentenceReset  = document.querySelector('#sentence');
    document.querySelector("#data").style.display = "none";
    sentenceReset.value = ' ';
    location.reload();   
  }

// --------------------------- Envoi des contenus ------------------------

// Sélection du formulaire (form)
const formulaire  = document.querySelector('#formulaire');
// console.log(formulaire);


  // evenement envoi submit
  formulaire.addEventListener('submit', (e) => {

    // Cacher le choix des séparator
    document.querySelector("#checkBoxSeparator").style.display = "none";

    // checkBoxClass
    document.querySelector(".checkBoxClass").style.display = "none";

    // input (des données à copier)
    document.querySelector("#input").style.display = "block";

  // Sélection input message
    const sentence  = document.querySelector('#sentence');


      try { 

          // Pas de reload page
          e.preventDefault();

          // reload Page
          // location.reload()
      
          // si rien envoyé message erreur
              if(sentence.value == ''){
              throw new Error(" ERREURS ! ");
              }
      
              // Si tape est remplie   
              else {  

                // Appel classe
                new CleanUpThisSentence(this.sentence.value);

            }
      } // Fin de try

      catch(error){     
      console.log(error.stack); // Affichage Error

      } 
});


// --------------- Nettoyer phrase --------------

class CleanUpThisSentence{

        constructor(cleanedText){
        this.valueInput = sentence.value+" ";
        this.cleanedText=cleanedText;
        this.remplaceContent();
        this.deleteNotEmail();
        this.monSetEmail();
        this.visibilityElement();
        this.email();
      }

        remplaceContent(){ 

            // Cacher explication
            document.querySelector("#explication").style.display = "none";

            // Cacher info Champs
            document.querySelector("#infoChamps").style.display = "none";
            

          // ne plus afficher resetB
          document.querySelector("#resetB").style.display = "none";

          // Reset champs input
          document.querySelector('#sentence').value ="";
            
            // retirer ;:!,.?</> sans les (.)  
              // const reg = /[\,\<\>\/\?\;\!\:]/g;

              const reg = /[\,\<\>\/\?\"\'\;\!\:]/g;

              // retirer les différents points
              let cleanedText = this.valueInput.replace(reg, " " ); 

              // retirer les espaces
              cleanedText = cleanedText.replace(/\s+/g, ' ');
              // Convertir accent en caractère sans accent

                const accent = [
                  /[\300-\306]/g, /[\340-\346]/g, // A, a
                  /[\310-\313]/g, /[\350-\353]/g, // E, e
                  /[\314-\317]/g, /[\354-\357]/g, // I, i
                  /[\322-\330]/g, /[\362-\370]/g, // O, o
                  /[\331-\334]/g, /[\371-\374]/g, // U, u
                  /[\321]/g, /[\361]/g, // N, n
                  /[\307]/g, /[\347]/g, // C, c
              ];

              const noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];
              
                  for(let i = 0; i < accent.length; i++){
                    cleanedText = cleanedText.replace(accent[i], noaccent[i]);
                  }
              
              // convertir en minuscule
              cleanedText = cleanedText.toLowerCase();

              // objet
              this.cleanedText=cleanedText;
          
            }

            // Diviser la phrase nettoyée en array et checker si format email
            deleteNotEmail(){
              
              // Diviser la phrase
              const tab = (this.cleanedText).split(" "); 
              
              // Initialisation array
              const listEmailDef = [];
              this.listEmailDef=listEmailDef;
              
              // Boucle le nombre d'éléments (chaque mot)
              for(let i = 0; i < tab.length-1; i++){
              // console.log(tab[i]);
                    
                    // Détérmine ce qui est un format email
                    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,9})+$/;
                    
                        // Condition si email valide
                        if((tab[i]).match(mailformat))
                            {
                              // console.log(tab[i]+" / Valid email address!");
                              // pousse la valeur [i]                             
                              const emailValided = (this.listEmailDef).push(tab[i]);
                              this.emailValided=emailValided;
                            }
                          else
                            {
                              // Not an email 
                              // console.log(tab[i] + " : Not an email adress!");
                              console.log(" Passe(s): "+i);
                            }
                  }

              // Display data analysée
              // console.log((tab.length-1 + " élément(s) analysé(s)"));

              const data  = document.querySelector('#data');
              data.textContent = (tab.length-1 + "  élément(s) analysé(s)");


                    if (isNaN((tab.length)-(this.emailValided))) {
                      console.log ('No Data');

                      // Ne pas afficher input des données aCopier
                      document.querySelector(".aCopier").style.display = "none"; // OK
                      document.querySelector("#input").style.display = "none";

                    }        
                    else{

                      document.querySelector(".aCopier").style.display = "flex"; // OK
                      console.log((tab.length)-(this.emailValided)+1 +" / Mots supprimés");
                      }    

                  // console.log((tab.length)-(this.emailValided)-1+" / Mots supprimés");

                  console.log((tab.length)+" / total");
                  // console.log(this.listEmailDef + " : Array résultat !"); 

            }

            // Création de mon Set (sans doublon)
            monSetEmail(){


// Sort email AZ ---------------------------------------------------


              let sortEmail= (this.listEmailDef).sort (); 
              sortEmail= (this.listEmailDef).reverse();

              switch (flagAZ) {
                case 0:

                  sortEmail= (this.listEmailDef).sort (); 
                  sortEmail= (this.listEmailDef).reverse();
    
                  break;
    
                  case 1:
                      sortEmail= (this.listEmailDef).sort (); 
                      break;
              
                default:
                 throw new Error;
              }

              // const monSet = new Set(this.listEmailDef);
              const monSet = new Set(sortEmail);
              this.monSet=monSet;

                  // console.log(this.monSet); // Mon set des emails propres              
                  // console.log(monSet.size + " : Valeur(s) unique(s)"); // ok

                  const uniqEmail  = document.querySelector('#uniqEmail');
                  uniqEmail.textContent = (monSet.size + "  emails(s) unique(s)");              
            }    

            visibilityElement(){
              document.querySelector("#resultDiv").style.display = "block";
              document.querySelector("#envoyer").style.display = "none";
              document.querySelector("#sentence").style.display = "none";
              document.querySelector("#reset").style.display = "block";
            }
         
            email(){

              // console.log(this.monSet); // Liste email
              
              // Appel Class si email
              // --------------------------------->

                // Si monset existe !
                if((this.monSet).size!==0){


                  // Afficher bouton Copy
                  document.querySelector("#copy").style.display = "block";

                  // Appel Class Nom de domaine 
                    new ListNdd(this.monSet);

                    }
                    else {
                      console.log("No Data");

                    }
            }         
      }

//-----Découpe nom de domaine -------------------------------------------------------------------

class ListNdd{
  constructor(setNdd, domain){
  this.flag=flagAZ;
  this.setNdd = setNdd;
  this.domain = domain;
  this.arrayNdd();
  this.sortList();
  this.appelClass();
  
  }
          arrayNdd(){

            // initialisation tableau conteneur NDD
            let arrayNdd = [];

            // Reconverti le set en array pour le découper
             let d = Array.from(this.setNdd);
            //  console.log(d + " <---------conversion en array -----------");

             for (let i = 0; i < d.length; i++) {

               const element = d[i];
              //  console.log(element);

                  const domain = element.replace(/.*@/, "");

                  // Nom de domaine -----------------------------------------
                  this.domain=domain; // OK
                  // console.log(domain + " : Nom de domaine ");

                  arrayNdd[i]=this.domain; // integration donnees dans array
                  // console.log(arrayNdd); // Tableau des noms de domaine non unique

                  // Si arrayNdd est vide donner une valeur (pour éviter une erreur)
                 this.arrayNdd=arrayNdd;
                //  console.log( this.arrayNdd);

          } // fin de boucle
        }

        // Ordre Alphabetique nom de domaine NDD
        sortList() {

          //AZ
              let sortNdd= (this.arrayNdd).sort (); 
              sortNdd= (this.arrayNdd).reverse();

              //flagAZ
              // console.log(flagAZ);

                    switch (flagAZ) {
                      case 0:
                        sortNdd= (this.arrayNdd).sort (); 
                        sortNdd= (this.arrayNdd).reverse()
                        // console.log("AZ");
                        break;
          
                        case 1:
                          sortNdd= (this.arrayNdd).sort (); 
                          // console.log("ZA");
                            break;
                    
                      default:
                      throw new Error;
                    }

              this.sortNdd=sortNdd;
              // console.log(sortNdd.length+" : Nombre de nom de domaine non unique ! "); // OK
        }

        appelClass(){
          
            // Appel Class DOM Email
            new DomEmail(this.setNdd, separator);
                       
            // Appel Class DOM Nom de domaine
            new DomNdd(this.sortNdd);

            }  
          }

// ---------------------------DOM Email ------------------------------

 
class DomEmail{

  constructor(displayDomEmail, separatorC){
  this.separatorC=separatorC;
  this.displayDomEmail = displayDomEmail;
  this.displayE();
  }


  displayE(){

          this.separator=this.separatorC;
          // console.log(this.separator);
          // console.log(this.displayDomEmail); // set
          // console.log(this.displayDomEmail.size); // longueur Set


          for (const contenuDuSet of this.displayDomEmail) { 

              // console.log(contenuDuSet);

              // Sélection DOM
              document.querySelector('#result');

              // Création du Div
              let creationList = document.createElement('div');

              // Ajout de la class
              creationList.className = "resultClass";

              // Ajout du texte de contenuDuSet
              creationList.textContent = contenuDuSet;

              // Attacher l'ensemble des div à mon conteneur ciblé - Affichage message
              document.querySelector('#result').prepend(creationList); 
              
          }    
          
          // Séparator entre email (, ; espace "", )        
          let mySeparator;
          // let guillemet=''; // "monEmail",(espace)

          switch (this.separator) {
            case 0:
              mySeparator = "; ";
              break;

              case 1:
                mySeparator = ", ";
                // guillemet='';
                break;

              case 2:
                  mySeparator = " ";
                  break;

              case 3:
                    // Création Set
                    const objetJsOn = new Set();

                    // On ajoute valeur du displayDomEmail + guillemets 
                    for (let contenuDuSet of this.displayDomEmail) { 

                    contenuDuSet='"'+contenuDuSet; // ok
                    objetJsOn.add(contenuDuSet+'"');
            }

              // Copie de Set
              this.displayDomEmail=objetJsOn;
              
            break;
          
            default:
             throw new Error;
          }

  // -----------------  Convertir mon Set en STRING et ajouter le séparateur ;,"", espace   

                const stringsSet = this.displayDomEmail; // copie
                const sortedStrings = [...stringsSet].sort(); // convertir en string
                // console.log(sortedStrings); // 👉️ ['c', 'b', 'a']
                const sortedStringsSet = new Set(sortedStrings);
                // console.log(sortedStringsSet); // 👉️ {'a', 'b', 'c'}
                this.sortedStringsSet=sortedStringsSet;

          const listToCopy = [...this.sortedStringsSet].join(mySeparator);
          // console.log(" MA LISTE = "+listToCopy);

          const inputValue = document.querySelector("#input");
          inputValue.value = listToCopy;         
  }
}           


// -----------------  DOM du Nom de domaine
    
    class DomNdd{

      constructor(displayDomain){
      this.displayDomain = displayDomain;
      this.displayD(); 
      }

      displayD(){

        // console.log(this.displayDomain);
        const monSetNddUnique = new Set(this.displayDomain);
        // console.log(monSetNddUnique.size + " Nombre de Nom de Domaine Unique ");

        const uniqndd  = document.querySelector('#nddUnique');
        uniqndd.textContent = (monSetNddUnique.size + " : nom de domaine unique(s)"); 


        for (let i = 0; i < (monSetNddUnique.size).length; i++) {
          console.log(i + " longueur ");     
        }

              for (const contenuDuSet of monSetNddUnique) {  
                    
                        // console.log(contenuDuSet);
                
                        // Sélection DOM
                        document.querySelector('#nnd');
                                          
                        // Création du Div
                        let creationNdd = document.createElement('div');

                        // Ajout de la class
                        creationNdd.className = "nddClass";

                        // Ajout du texte de l'utilisateur
                        creationNdd.textContent = contenuDuSet;

                        // Attacher l'ensemble des div à mon conteneur ciblé - Affichage message
                        document.querySelector('#ndd').prepend(creationNdd);                                                    
                    }
        }           

    }

  

  // ------Copier / coller résultat-----------------------------------------------------------------------------


document.querySelector("#copy").addEventListener("click", copy);
  
function copy() {
    let copyText = document.querySelector("#input");
    // console.log(copyText);
    copyText.select();
    document.execCommand("copy");

    if(copyText.value!==""){
      // console.log(copyText.value);
      alert("Données copiées dans votre presse-papier !");
    } else{
      alert("Pas de données à copier !")
    }
  }