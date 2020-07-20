function commmon(){
    document.getElementById('label-open-menu').addEventListener("click", fixedPositionAdd);
    document.getElementById('label-close-menu').addEventListener("click", fixedPositionRemove);

    function fixedPositionAdd(){
        let w = document.body.clientWidth;
        if(w < 700){
            document.body.classList.add("fixed-position");
        }
    }
    
    function fixedPositionRemove(){
        let w = document.body.clientWidth;
        if(w < 700){
            document.body.classList.remove("fixed-position");
        }
    }

}




function flexBlock(elem){
    elem.style.cssText = "display: -webkit-box; display: -moz-box; display: -ms-flexbox; display: -webkit-flex; display: flex;";
}



// sommaire partie //////////////////////////////////////////////////////////////////////////////////
/* seulement partie 1 > le script est appelé depuis l'HTML */

function toggleSommaire(){
    let sommaire = document.getElementById("sommaire-part").getElementsByTagName('ul')[0];
    let svgOpen = document.getElementById('svg-sommaire-open');
    let svgClose = document.getElementById('svg-sommaire-close');
    let w = document.body.clientWidth;

    if(sommaire.classList.contains('open-sommaire')){
        sommaire.classList.remove('open-sommaire');
        sommaire.style.bottom = "-350px";
        svgOpen.style.display = "inline";
        svgClose.style.display = "none";
    }else{
        if(w < 700){
            sommaire.style.bottom = "40px";
        }else{
            sommaire.style.bottom = "30px";
        }
        sommaire.classList.add('open-sommaire');
        
        svgOpen.style.display = "none";
        svgClose.style.display = "inline";
    }
   
    
}


// lancement PANZOOM //////////////////////////////////////////////////////////////////////////////////
    
function panzoomLoad(nbr) {
    // 'use strict';
    var max = nbr;
    var section = $('.panzoom-parent'),
      panzoom = section.find('.panzoom').panzoom({
        $zoomIn: $(".zoom-in"),
        $zoomOut: $(".zoom-out"),
        $reset: $(".reset"),
        minScale: 1,
        maxScale: max,
        contain: "invert"
      }),
      doPan = function (x, y, rel, anim) {
        panzoom.panzoom("pan", x, y, { relative: rel, animate: anim });
      };
    /* on dblclick */
    section.on('dblclick', function (e) {
    //   e.preventDefault();
    toggleZoom();
      panzoom.panzoom('zoom', e.originalEvent.wheelDelta < 0, {       
        increment: 1,
        focal: e
      });
    });

   /* on dleclick for phone */
   var touchtime = 0;
    section.on("click", function(e) {
        if (touchtime == 0) {
            // set first click
            touchtime = new Date().getTime();
        } else {
            // compare first click to this click and see if they occurred within double click threshold
            
            if (((new Date().getTime()) - touchtime) < 800) {
                // double click occurred
                toggleZoom();
                panzoom.panzoom('zoom', e.originalEvent.wheelDelta < 0, {       
                    increment: 1,
                    focal: e
                });
                touchtime = 0;
            } else {
                // not a double click so set as a new first click
                touchtime = new Date().getTime();
            }
        }
    });
  }
