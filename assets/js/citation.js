function citation(){

    let pageType = document.getElementsByTagName("body")[0];
    let mainContent; 

    if (pageType.classList.contains('body-notice')) {
       mainContent =  document.getElementById("main-notice");
       pageType = "notice";
    }else{
        mainContent =  document.getElementById("main-content");
        pageType = "partie";
    }

    

   
   
    if (typeof(mainContent) != 'undefined' && mainContent != null)
    {
        let citations = mainContent.querySelectorAll('.citation');
        builderRefBiblio(citations);
        refTop();
        
        let refsBiblio = mainContent.getElementsByClassName('ref-biblio');

        if(pageType ==  "notice"){
            for(i = 0; i < refsBiblio.length; i++){
                refsBiblio[i].addEventListener("click", toggleRef);
            }
        }else{
            if(window.innerWidth < 1200){
                for(i = 0; i < refsBiblio.length; i++){
                    refsBiblio[i].addEventListener("click", toggleRef);
                }
            }
    
            window.addEventListener('resize', evt => {
                if(window.innerWidth < 1200){
                    for(i = 0; i < refsBiblio.length; i++){
                        refsBiblio[i].addEventListener("click", toggleRef);
                    }
                }
            });

        }

     
    }

    function toggleRef(){
        let refElem = this.getElementsByClassName('ref-biblio-elem')[0];
        if (refElem.classList.contains('ref-open')) {
            refElem.style.display = 'none';
            refElem.classList.remove('ref-open');
        }else{
            refElem.style.display = 'inline';
            refElem.classList.add('ref-open');
        }
    }


    function builderRefBiblio(elems){

        

        let refDivPrint = document.createElement("ul");
        refDivPrint.id = "refs-biblio-print";
        mainContent.appendChild(refDivPrint);
    

        for(i = 0; i < elems.length; i++){
            let citation = elems[i];
            let citationText = citation.innerHTML;
            let bookmarkFill = '<svg class="bookmark-fill" data-name="bookmark-fill" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 30"><title>bookmark-fill</title><path d="M16.09.29H2.91A1.9,1.9,0,0,0,1,2.19V29a.71.71,0,0,0,1.22.5L9.5,22.17l7.27,7.33a.71.71,0,0,0,.51.21.65.65,0,0,0,.27-.05A.71.71,0,0,0,18,29V2.19A1.9,1.9,0,0,0,16.09.29Z"/></svg>';
            // let bookmarkStroke = '<svg id="bookmark-stroke" data-name="bookmark-stroke" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 30"><defs><style>.cls-1{stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.43px;}</style></defs><title>bookmark-stroke</title><path class="cls-1" d="M17.28,29,9.5,21.16,1.72,29V2.19A1.19,1.19,0,0,1,2.91,1H16.09a1.19,1.19,0,0,1,1.19,1.19Z"/></svg>';
    
            if(citationText.charAt(0) === '('){
                citationText = citationText.substr(1, citationText.length-2);
            }
    
            var refBilio = document.createElement('span');
            refBilio.classList.add("ref-biblio")
            refBilio.id = 'ref-biblio-' + i;
            refBilio.innerHTML = '<span class="ref-biblio-call">' + bookmarkFill + '</span><span class="ref-biblio-elem">' + bookmarkFill + citationText + '</span>';
    
            citation.parentNode.replaceChild(refBilio, citation);

            /* for print only */

            let refBiblioPrint = document.createElement("li");
            refBiblioPrint.innerHTML = citationText;
            refDivPrint.appendChild(refBiblioPrint);
        }
    
    
    }

   

    function refTop(){

        let pageType = document.getElementsByTagName("body")[0];
        let mainContent; 

        if (pageType.classList.contains('body-notice')) {
           mainContent =  document.getElementById("main-notice");
        }else{
            mainContent =  document.getElementById("main-content");
        }
    
        
        let refElements = mainContent.getElementsByClassName('ref-biblio-elem');
        if (typeof(refElements) != 'undefined' && refElements != null){
            for(i = 1; i < refElements.length; i++){
                let refTop = refElements[i].offsetTop;
                let refHeight = refElements[i].offsetHeight;
                let refTopPrev = refElements[i-1].offsetTop;
                let refHeightPrev = refElements[i-1].offsetHeight;
                let calc = refTopPrev +refHeightPrev - refTop;
                if(calc > 0){ refElements[i].style.top = refTop + calc - 6 + 20 + "px"; }
            }
        }
    }
    
 
}


