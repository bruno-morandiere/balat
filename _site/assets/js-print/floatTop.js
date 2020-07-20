// floatTop variables ----------------------------------------
    var classElemFloatTop = "float-top";
    let tableFloatTop = [];
    let tableFloatTopElem = [];
    // -----------------------------------------------------------

    function addcss(css){
        var head = document.getElementsByTagName('head')[0];
        var s = document.createElement('style');
        s.setAttribute('type', 'text/css');
        if (s.styleSheet) {   // IE
            s.styleSheet.cssText = css;
        } else {// the world
            s.appendChild(document.createTextNode(css));
        }
        head.appendChild(s);
    }




      class floatTop extends Paged.Handler {
        constructor(chunker, polisher, caller) {
          super(chunker, polisher, caller);
          this.flagPage = false;         
        }

      

        beforeParsed(content){
            /* Delete the element of the prev. page from calculating the layout */
            var css1 = "." + classElemFloatTop + "{ box-sizing: border-box!important; height: 0!important; margin: 0!important; }";
            addcss(css1);
    
            /* Set full page CSS*/
            // var css2 = ".pagedjs_float-top{ box-sizing: border-box!important;  margin: 0!important; }";       
            // addcss(css2);
        }

        

        afterPageLayout(pageElement, page, breakToken){

          let floatTop = pageElement.querySelectorAll("." + classElemFloatTop);

           /* if there is an element on the page */
          if(typeof(floatTop) != 'undefined' && floatTop != null){
            for(let i = 0; i < floatTop.length; i++){

               /* get page of element*/
              let pageN = floatTop[i].closest(".pagedjs_page");
              let pageNum = parseInt(pageN.getAttribute("data-page-number"));

               /* add page element to table*/
              tableFloatTop.push(pageNum);
               /* add element to table */
              tableFloatTopElem.push(floatTop[i]);
            }
          }

          }



        beforePageLayout(page) {

          // FloatTop (step 2) -----------------------------------------
          for(let i = 0; i < tableFloatTop.length; i++){
            if (page.position === tableFloatTop[i]) {
              // set flag
              this.flagPage = page;
            }
          }
          // -----------------------------------------------------------

        }


        layoutNode(node) {
          if (this.flagPage) {

            let pageContent = this.flagPage.wrapper;
            let pageContentParent = pageContent.closest(".pagedjs_page");
            let pageContentNum = parseInt(pageContentParent.getAttribute("data-page-number")) ;

            for(let i = 0; i < tableFloatTop.length; i++){
              if (pageContentNum === tableFloatTop[i] + 1) {
                tableFloatTopElem[i].classList.remove(classElemFloatTop);
                tableFloatTopElem[i].classList.add("pagedjs_float-top");
                pageContent.appendChild(tableFloatTopElem[i]);
              }
            }
            this.flagPage = false;
          }

        }

       
      }
      Paged.registerHandlers(floatTop);