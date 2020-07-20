function imageComparaison(){

    /* ------ Liens notices ------------------------------------------------------------------------------------------------------- 
    ------------------------------------------------------------------------------------------------------------------------------ */

    let pageType = document.getElementsByTagName("body")[0];
    let mainContent; 
    let iconNotice = '<svg version="1.1" class="notice-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 90 90" xml:space="preserve"><path d="M70,0H20c-5.5,0-10,4.5-10,10v70c0,5.5,4.5,10,10,10h50c5.5,0,10-4.5,10-10V10C80,4.5,75.5,0,70,0z M24.057,20.848h41.875v8.75H24.057V20.848z M65.932,68.848H24.057v-8.75h41.875V68.848z M66.057,49.348H24.182v-9h41.875V49.348z" /></svg>';

    if (pageType.classList.contains('body-notice')) {
       mainContent =  document.getElementById("content-notice");
       pageType = "notice";
    }else{
        mainContent =  document.getElementById("main-content");
        pageType = "partie";
    }
   
    if (typeof(mainContent) != 'undefined' && mainContent != null){
        let links = mainContent.querySelectorAll('a');
        
        for(i = 0; i < links.length; i++){
            let link = links[i];
            if(!link.classList.contains('citation') && !link.classList.contains('comparaison') && !link.classList.contains('link-citer') && !link.classList.contains('link-wikidata') && !link.classList.contains('link-relecture')){
                link.classList.add('link-notice');
                link.setAttribute('target', '_blank');
                let span = document.createElement("span");
                span.innerHTML = iconNotice;
                link.appendChild(span);                
            }
        }

    }



    /* ------ IMAGES DE COMPARAISON ---------------------------------------------------------------------------------------------- 
    ------------------------------------------------------------------------------------------------------------------------------ */

    let imagesComp = document.querySelectorAll('.comparaison');
    let iconComp = '<svg version="1.1" class="image-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve"><path d="M50,40c-8.285,0-15,6.718-15,15c0,8.285,6.715,15,15,15c8.283,0,15-6.715,15-15 C65,46.718,58.283,40,50,40z M90,25H78c-1.65,0-3.428-1.28-3.949-2.846l-3.102-9.309C70.426,11.28,68.65,10,67,10H33 c-1.65,0-3.428,1.28-3.949,2.846l-3.102,9.309C25.426,23.72,23.65,25,22,25H10C4.5,25,0,29.5,0,35v45c0,5.5,4.5,10,10,10h80 c5.5,0,10-4.5,10-10V35C100,29.5,95.5,25,90,25z M50,80c-13.807,0-25-11.193-25-25c0-13.806,11.193-25,25-25 c13.805,0,25,11.194,25,25C75,68.807,63.805,80,50,80z M86.5,41.993c-1.932,0-3.5-1.566-3.5-3.5c0-1.932,1.568-3.5,3.5-3.5 c1.934,0,3.5,1.568,3.5,3.5C90,40.427,88.433,41.993,86.5,41.993z"/></svg>';
    let iconClose = '<svg class="close-icon" data-name="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60"><title>Close Icon</title><path d="M33.4,30l25-25c0.9-0.9,0.9-2.5,0-3.4c-0.9-0.9-2.5-0.9-3.4,0l-25,25L5,1.5C4,0.6,2.5,0.6,1.5,1.5C0.6,2.5,0.6,4,1.5,5 l25,25l-25,25c-0.9,0.9-0.9,2.5,0,3.4s2.5,0.9,3.4,0l25-25l25,25c0.9,0.9,2.5,0.9,3.4,0s0.9-2.5,0-3.4L33.4,30z"/></svg>';

    if (typeof(imagesComp) != 'undefined' && imagesComp != null){
        for(i = 0; i < imagesComp.length; i++){
            imagesComp[i].setAttribute('target', '_blank');
            imagesComp[i].classList.add("close");

            /* svg camera*/
            let span = document.createElement("span");
            span.innerHTML = iconComp;
            imagesComp[i].appendChild(span);

            /* close */
            let close = document.createElement("button");
            close.innerHTML = iconClose;
            imagesComp[i].getElementsByClassName("img-comparaison")[0].appendChild(close);

            /* caption */
            let alt = imagesComp[i].getElementsByTagName("img")[0].getAttribute("alt");
            let dataLink = imagesComp[i].getElementsByTagName("img")[0].getAttribute("data-link");
            let dataLinkTitle = imagesComp[i].getElementsByTagName("img")[0].getAttribute("data-link-title");
            let caption = document.createElement("span");
            caption.classList.add("caption");
            if (typeof(dataLink) != 'undefined' && dataLink != null){
                caption.innerHTML = alt + ', <a href="' + dataLink + '" target="_blank">' + dataLinkTitle + '</a>';
            }else{
                caption.innerHTML = alt;
            }
            imagesComp[i].getElementsByClassName("img-comparaison")[0].appendChild(caption);

                      let img = imagesComp[i].getElementsByClassName("img-comparaison")[0];
      


            /* change ordeer link and span */
            let spanComp = imagesComp[i].getElementsByTagName('span')[0];
            imagesComp[i].parentNode.insertBefore(spanComp, imagesComp[i]);
            spanComp.getElementsByTagName('button')[0].addEventListener("click", closeImgComp);

            imagesComp[i].parentNode.insertBefore(imagesComp[i], spanComp);

        

              /* open/close on click */
            imagesComp[i].addEventListener("click", openImgComp);


        }
        
    }

}







 /* function open/close on click (images comparaisons) */
function toggleImgComp(e){
    e.preventDefault();
    if(this.classList.contains("open")){
        this.classList.remove("open");
        this.classList.add("close");
    }else{
        this.classList.remove("close");
        this.classList.add("open"); 
    }
    
}


function openImgComp(e){
    e.preventDefault();
    imageComp = this.nextSibling;
    imageComp.classList.add("open-comp");
}


function closeImgComp(){
    this.parentNode.classList.remove("open-comp");
}


