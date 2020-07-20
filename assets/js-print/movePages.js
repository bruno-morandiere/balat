

function movePages(pageElement){


    /* -- Move a specific content in other place of the flow ---------------------------------------------- */
    // let imageMartres = pageElement.querySelector("#martres-tolosane");
    // if(typeof(imageMartres) != 'undefined' && imageMartres != null){
    //     let shift = 5;
    //     let numPageImg = parseInt(pageElement.getAttribute("data-page-number"));
    //     let numNewPage = numPageImg - shift;

    //     /* create table with content of page*/
    //     let contents = [];
    //     for(let i = 0; i <  shift; i++){
    //         let num = numNewPage + i;
    //         let pageNum = document.getElementById("page-" + num);
    //         let pageContent = pageNum.querySelectorAll('.pagedjs_area')[0].innerHTML;
    //         contents.push(pageContent);
    //     } 

    //     /* move image on the new page */
    //     let contentImg = document.getElementById("page-" + numPageImg).querySelectorAll('.pagedjs_area')[0].innerHTML;
    //     let newPageImg = document.getElementById("page-" + numNewPage).querySelectorAll('.pagedjs_area')[0];
    //     newPageImg.innerHTML = contentImg;

    //     /* replace content of page (+1) */
    //     for(let i = 0; i <  shift; i++){
    //         let num = numNewPage + i + 1;
    //         let pageNum = document.getElementById("page-" + num);
    //         let pageContent = pageNum.querySelectorAll('.pagedjs_area')[0];
    //         pageContent.innerHTML = contents[i];
    //     }

    // } 

    /* -- Array of elements to move on previous page ---------------------------------------------- */
    for(let i = 0; i <  elemsPrev.length; i++){
        let element = pageElement.querySelector(elemsPrev[i]);
        if(typeof(element) != 'undefined' && element != null){

            let numPageImg = parseInt(pageElement.getAttribute("data-page-number"));
            let elemArea = pageElement.querySelectorAll('.pagedjs_area')[0];
            let elemHTML = elemArea.innerHTML;
            
            let prevPageNum = numPageImg - 1;
            let prevPage = document.getElementById("page-" + prevPageNum);
            let prevArea = prevPage.getElementsByClassName('pagedjs_area')[0];
            let prevHTML = prevArea.innerHTML;

            elemArea.innerHTML = prevHTML;
            prevArea.innerHTML = elemHTML;

        } 
    } 

    /* -- Array of elements to move on next page ---------------------------------------------- */
    for(let i = 0; i <  elemsNext.length; i++){
        let element = pageElement.querySelector(elemsNext[i]);
        if(typeof(element) != 'undefined' && element != null){
            let numPageImg = parseInt(pageElement.getAttribute("data-page-number"));
            let numPageImgNext = numPageImg + 1;
            nextPageNumber.push(numPageImgNext);
        } 
    } 

    /* -- Array of (next) page numbers of elements to move on next page ---------------------------------------------- */
    for(let i = 0; i <  nextPageNumber.length; i++){
        let numPage = parseInt(pageElement.getAttribute("data-page-number"));
        if (nextPageNumber == numPage){

            let numElemPage = numPage - 1;
            let elemArea = document.getElementById("page-" + numElemPage ).querySelectorAll('.pagedjs_area')[0];
            let elemHTML = elemArea.innerHTML;
            
            let nextArea = pageElement.querySelectorAll('.pagedjs_area')[0];
            let nextHTML = nextArea.innerHTML;

            elemArea.innerHTML = nextHTML;
            nextArea.innerHTML = elemHTML;
        }
    } 

    
}
