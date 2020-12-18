// ONLOAD //////////////////////////////////////////////////////////////////////////////////

function noticesImages(images){


    let sectionImg = document.getElementById("section-images");
    let allButtons = document.getElementById("all-buttons");
    let buttonsSliderChoice = document.getElementById("buttons-slider-choice");
    let nbrImg  = images.length;


    document.getElementById("images-grid").style.display = "none";


    let imagesClass = document.getElementsByClassName("images-id")[0];

    if(window.innerWidth > 900 && nbrImg  == "8"){
        build(images);
        //flexBlock(allButtons);
    }else if(nbrImg == "1"){
        build(images);
        //flexBlock(allButtons);
        imagesClass.id = "single-image";
        document.getElementById("radio-zoom").checked = true;
        document.querySelector('[data-diapo-nav="1"]').classList.add("diapo-nav-current");
        document.getElementById('buttons-slider-choice').style.display = "none";
    }else{
        build(images);
        //flexBlock(allButtons);
        imagesClass.id = "diaporama";
        document.getElementById("radio-diapo").checked = true;
        document.querySelector('[data-diapo-nav="1"]').classList.add("diapo-nav-current");
        document.getElementById('buttons-slider-choice').style.display = "none";
    }


    window.addEventListener('resize', evt => {
        if(window.innerWidth > 900 && nbrImg == "8"){
            document.getElementById('buttons-slider-choice').style.display = "flex";  
        }else{
           // displayDiapo(nameImg, nbrImg);
            document.getElementById('buttons-slider-choice').style.display = "none";
        }
    });

}


// ACTIONS BUTTON //////////////////////////////////////////////////////////////////////////////////

function display360(nameImg, nbrImg){
    document.getElementById("all_images").style.transform = "matrix(1, 0, 0, 1, 0, 0)";

    let imagesClass = document.getElementsByClassName("images-id")[0];
    if (imagesClass.id == "threesixty"){
        document.getElementById("radio-360viewer").checked = true;
    }else{
        imagesClass.id = "threesixty";
        document.getElementById("radio-360viewer").checked = true;
    }
}


function displayDiapo(nameImg, nbrImg){
    document.getElementById("all_images").style.transform = "matrix(1, 0, 0, 1, 0, 0)";
    let currentImage = document.getElementById("all_images").getElementsByClassName("current-image")[0].dataset.numImg;

    let diaporamaNavli = document.getElementById("diaporama_nav").getElementsByTagName('li');
    for(i = 0; i < diaporamaNavli.length; i++){
        diaporamaNavli[i].classList.remove("diapo-nav-current");
    }
    dataNav = document.querySelectorAll('[data-diapo-nav="' + currentImage + '"]')[0].classList.add("diapo-nav-current");

    let imagesClass = document.getElementsByClassName("images-id")[0];
    if (imagesClass.id == "diaporama"){
        document.getElementById("radio-diapo").checked = true;
    }else{
        imagesClass.id = "diaporama";
        document.getElementById("radio-diapo").checked = true;
    }

}

function resetRadio(){
    document.getElementById("all_images").style.transform = "matrix(1, 0, 0, 1, 0, 0)";
    let imagesId = document.getElementsByClassName("images-id")[0].id;
    if (imagesId == "threesixty"){
        document.getElementById("radio-360viewer").checked = true;
    }else{
        document.getElementById("radio-diapo").checked = true;
    }
}

function toggleZoom(){
    document.getElementById("radio-zoom").checked = true;

    let currentImage = document.getElementById("all_images").getElementsByClassName("current-image")[0];
    if(currentImage.src.includes('5000') === false){
        let newSrc = currentImage.src.replace('.jpg', '');
        currentImage.setAttribute('src', newSrc + '-5000.jpg');
        currentImage.setAttribute('srcset', newSrc + '-3000.jpg 3000vw, ' + newSrc + '-5000.jpg 5000vw');
        currentImage.setAttribute('sizes', '(max-width: 770px) 2999px, 4999px');
    }

}


// BUILD IMAGES //////////////////////////////////////////////////////////////////////////////////

function build(images){
    

    /* afficher viewer-360 */
    document.getElementById("radio-360viewer").checked = true;
    document.getElementById("threesixty").style.display = "block";
    threesixtyFunction(images);
    //document.getElementById("threesixty").classList.add("viewer360-build");

    // let divDiaporamaImages = document.getElementById("diaporama_images");
    let divDiaporamaNav = document.getElementById("diaporama_nav"); 

    // charger les images dans la navigation
    for(n = 0; n < images.length; n++){
        let number = n + 1;
        // nav images
        var liNavDiapo = document.createElement("li");
        liNavDiapo.dataset.diapoNav = number;
        var imgNavDiapo = document.createElement("img");
        imgNavDiapo.src = images[n] ;
        divDiaporamaNav.getElementsByTagName('ul')[0].appendChild(liNavDiapo).appendChild(imgNavDiapo);
    }

    // ajout des fonction de clic (navigation)
     clickEventNav();
    

   

}


// BUILD IMAGES //////////////////////////////////////////////////////////////////////////////////

function buildold(nameImg, nbrImg){
    

    /* afficher viewer-360 */
    document.getElementById("radio-360viewer").checked = true;
    document.getElementById("threesixty").style.display = "block";
    threesixtyFunction(nameImg, nbrImg);
    //document.getElementById("threesixty").classList.add("viewer360-build");

    // let divDiaporamaImages = document.getElementById("diaporama_images");
    let divDiaporamaNav = document.getElementById("diaporama_nav"); 

    // charger les images dans la navigation
    for(n = 0; n < nbrImg; n++){
        let number = n + 1;
        // nav images
        var liNavDiapo = document.createElement("li");
        liNavDiapo.dataset.diapoNav = number;
        var imgNavDiapo = document.createElement("img");
        imgNavDiapo.src = nameImg ;
        divDiaporamaNav.getElementsByTagName('ul')[0].appendChild(liNavDiapo).appendChild(imgNavDiapo);
    }

    // ajout des fonction de clic (navigation)
     clickEventNav();
    

   

}




// CHANGE IMAGE DIAPO //////////////////////////////////////////////////////////////////////////////////

/* add event listener on nav images*/ 
function clickEventNav(){
    let diaporamaNavli = document.getElementById("diaporama_nav").getElementsByTagName('li');
    for(i = 0; i < diaporamaNavli.length; i++){
        diaporamaNavli[i].addEventListener("click", toggleImagesDiapo);
    }
}

/* click on nav image */
function toggleImagesDiapo(){
    diapoButton(this.dataset.diapoNav); 
}


/* click on nav button*/
function diapoButton(position){

    /* reset zoom */
    document.getElementById("all_images").style.transform = "matrix(1, 0, 0, 1, 0, 0)"; 

    /* remove current img */
    let currentImg = document.getElementById("all_images").getElementsByClassName("current-image")[0];
    let currentImgNum = currentImg.dataset.numImg;
    currentImg.classList.remove("current-image"); 
    currentImg.classList.add("previous-image"); 

    /* remove current nav li */
    let currentNav = document.getElementById("diaporama_nav").getElementsByClassName("diapo-nav-current")[0];
    currentNav.classList.remove("diapo-nav-current"); 

    /* set new num diapo*/
    let nextImg;
    let nbrFigure = document.getElementById("diaporama_nav").getElementsByTagName("li").length;
    if(position == "next"){
        if(currentImgNum == nbrFigure){
            nextImg = "1";
        }else{
            nextImg = Number(currentImgNum) + 1;
        }
    }else if(position == "prev"){
        if(currentImgNum == "1"){
            nextImg = nbrFigure;
        }else{
            nextImg = Number(currentImgNum) - 1;
        }
    }else{
        nextImg = position;
    }
    
    /* set new image + nav */
    let newImg = document.querySelector('[data-num-img="' + nextImg + '"]');
    newImg.classList.remove("previous-image"); 
    newImg.classList.add("current-image");
    document.querySelector('[data-diapo-nav="' + nextImg + '"]').classList.add("diapo-nav-current");

    // change path for download current image
    let downloadImage = document.getElementById("download-image");
    let pathImage = downloadImage.getAttribute('data-path');
    downloadImage.href =  pathImage + "-" + nextImg + "-5000.jpg";

    //change data section for current image
    document.getElementById('section-images').setAttribute('data-current-img', nextImg);

}



