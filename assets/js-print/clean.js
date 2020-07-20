function clean(content) {

    /* Delete .img-comparaison */
    let imgComparaison = content.querySelectorAll(".img-comparaison");
    for (let i = 0; i < imgComparaison.length; i++) {
        imgComparaison[i].parentNode.removeChild(imgComparaison[i]);
    }

    /* Add breaks in titles */
    let listnotice = content.getElementById("notices-list-all");
    listnotice.querySelectorAll('[data-num-inventaire="Ra 122"]')[0].getElementsByTagName('h1')[0].innerHTML = 'Tête d’adolescent <br>(Tiberius Gemellus ?)';
    listnotice.querySelectorAll('[data-num-inventaire="Ra 68 (1)"]')[0].getElementsByTagName('h1')[0].innerHTML = 'Tête de jeune garçon <br>(C. Fulvius Plautus Hortensianus ?)';
    listnotice.querySelectorAll('[data-num-inventaire="Ra 69"]')[0].getElementsByTagName('h1')[0].innerHTML = 'Portrait d’homme anciennement <br>dit Sévère Alexandre';
    listnotice.querySelectorAll('[data-num-inventaire="Ra 32"]')[0].getElementsByTagName('h1')[0].innerHTML = 'Repos de deux faunes <br>dans un paysage';
    listnotice.querySelectorAll('[data-num-inventaire="2000.411.1"]')[0].getElementsByTagName('h1')[0].innerHTML = 'Chapiteau corinthien <br>à tête de feuillagee';

    /* aria-hidden */
    let printElems = content.querySelectorAll(".print");
    for (let p = 0; p < printElems.length; p++) {
        printElems[p].setAttribute('aria-hidden', 'true');
    }


}