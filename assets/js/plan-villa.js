

/* PLAN VILLA SCRIPT -----------------------------------------------------------------------------------------
--------------------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------------------- */

  function planVilla(){  

    var planChirigan =  document.getElementById("plan-chiragan");
    // if (typeof(planChirigan) != 'undefined' && planChirigan != null)
    // {
        var points = document.getElementById("points_1_").getElementsByTagName("path");
        var pointsBig = document.getElementById("points-big").getElementsByTagName("path");
        var legendeLieux = document.getElementById("legende-lieux");
        var legendeLieuxLi = document.getElementById("legende-lieux").getElementsByTagName("li");
        var legendeEtats = document.getElementById("legende-etats");
        var legendeEtatsLi = document.getElementById("legende-etats").getElementsByTagName("li");

        for(let p = 0; p < points.length; p++){
            points[p].addEventListener("mouseover", function(){pointOnHover(this, "point");} );
            points[p].addEventListener("mouseout", function(){pointClearHover(this, "point");} );
            points[p].addEventListener("click", function(){pointOnClick(this, "point");} );
        }

        for(let e = 0; e < legendeEtatsLi.length; e++){
            legendeEtatsLi[e].addEventListener("mouseover", etatOnHover);
            legendeEtatsLi[e].addEventListener("click", etatOnClick);
        }
        legendeEtats.addEventListener("mouseout", etatClearHover);

        for(let l = 0; l < legendeLieuxLi.length; l++){
            legendeLieuxLi[l].addEventListener("mouseover", function(){pointOnHover(this, "legende");} );
            legendeLieuxLi[l].addEventListener("mouseout", function(){pointClearHover(this, "legende");} );
            legendeLieuxLi[l].addEventListener("click", function(){pointOnClick(this, "legende");} );
        }


        /* POINTS FUNCTIONS -----------------------------------------------------------------------------------------
        -------------------------------------------------------------------------------------------------------------- */

        function pointOnHover(elem, type){
            if(type == "point"){
                let id = elem.id.replace('-point', '');
                document.getElementById(id + '-big').style.display = "block";
                let legendeAssociee = legendeLieux.querySelectorAll('[data-legende=' + id + ']')[0];
                legendeAssociee.classList.add('legend-hover');
            }else{
                let id = elem.id.replace('legende-', '');
                elem.classList.add('legend-hover');
                document.getElementById(id + '-big').style.display = "block";
            }
            
        }

        function pointClearHover(elem, type){
            if(type == "point"){
                let id = elem.id.replace('-point', '');
                let legendeAssociee = legendeLieux.querySelectorAll('[data-legende=' + id + ']')[0];
                if(elem.classList.contains('point-select') === false) {
                    document.getElementById(id + '-big').style.display = "none";
                    legendeAssociee.classList.remove('legend-hover');
                } 
            }else{
                let id = elem.id.replace('legende-', '');
                if(elem.classList.contains('legend-select') === false) {
                    document.getElementById(id + '-big').style.display = "none";
                    elem.classList.remove('legend-hover');
                } 
            }
            
        }

        function pointOnClick(elem, type){      

            for(let i = 0; i < pointsBig.length; i++){
                /* reset */
                pointsBig[i].style.display = "none";
                points[i].classList.remove('point-select');
                legendeLieuxLi[i].classList.remove('legend-select');
                legendeLieuxLi[i].classList.remove('legend-hover');
            }

            
            if(type == "point"){
                let id = elem.id.replace('-point', '');
                let legendeAssociee = legendeLieux.querySelectorAll('[data-legende=' + id + ']')[0];
                elem.classList.add('point-select');
                document.getElementById(id + '-big').style.display = "block";
                legendeAssociee.classList.add('legend-select'); 
            }else{
                let id = elem.id.replace('legende-', '');
                elem.classList.add('legend-select'); 
                document.getElementById(id + '-point').style.display = "point-select";
                document.getElementById(id + '-big').style.display = "block";
            }


            
        
        }


        /* ETATS FUNCTIONS -----------------------------------------------------------------------------------------
        -------------------------------------------------------------------------------------------------------------- */


        function etatOnHover(){
            if(legendeEtats.classList.contains("legend-click") == false){
                let id = this.dataset.legende;
                displayEtat(this, id);      
            }
        }

        function etatClearHover(){
            if(legendeEtats.classList.contains("legend-click") == false){
                resetEtat();    
            }
        }

        function etatOnClick(){
            let id = this.dataset.legende;
            let legendesActives = legendeEtats.getElementsByClassName("etat-click");

            legendeEtats.classList.add("legend-click");

            if(legendesActives.length === 0 || legendesActives.length === 4){ 
                displayEtat(this, id); 
                this.classList.add('etat-click');
            }else{
                if(this.classList.contains('etat-click')){
                    document.getElementById(id).classList.add("etat-inactive");
                    if(id == "etat-3"){ document.getElementById("etat-3-plein").classList.add("etat-inactive"); }
                    this.classList.remove('legend-active');
                    this.classList.remove('etat-click');
                }else{
                    document.getElementById(id).classList.remove("etat-inactive");
                    if(id == "etat-3"){ document.getElementById("etat-3-plein").classList.remove("etat-inactive"); }
                    this.classList.add('legend-active');
                    this.classList.add('etat-click');
                }
                
            }

            if(legendesActives.length === 4){
                /* reset when 4 click */ 
                legendeEtats.querySelectorAll('[data-legende="etat-1"]')[0].classList.remove("etat-click");
                legendeEtats.querySelectorAll('[data-legende="etat-2"]')[0].classList.remove("etat-click");
                legendeEtats.querySelectorAll('[data-legende="etat-3"]')[0].classList.remove("etat-click");
                legendeEtats.querySelectorAll('[data-legende="etat-4"]')[0].classList.remove("etat-click");
                legendeEtats.classList.remove("legend-click");
            }

            if(legendesActives.length === 0){
                /* reset when 0 click */ 
                resetEtat(); 
                legendeEtats.classList.remove("legend-click"); 
            }
        }

        function displayEtat(elem, id){
            document.getElementById("etat-1").classList.add("etat-inactive");
            document.getElementById("etat-2").classList.add("etat-inactive");
            document.getElementById("etat-3").classList.add("etat-inactive");
            document.getElementById("etat-3-plein").classList.add("etat-inactive");
            document.getElementById("etat-4").classList.add("etat-inactive");
            document.getElementById("bassins_1_").classList.add("etat-inactive"); 
            for(let i = 0; i < legendeEtatsLi.length; i++){
                legendeEtatsLi[i].classList.remove('legend-active')
            }
            document.getElementById(id).classList.remove("etat-inactive"); 
            if(id == "etat-3"){ document.getElementById("etat-3-plein").classList.remove("etat-inactive"); }
            elem.classList.add('legend-active');
        }

        function resetEtat(){
            legendeEtats.querySelectorAll('[data-legende="etat-1"]')[0].classList.add('legend-active');
            legendeEtats.querySelectorAll('[data-legende="etat-2"]')[0].classList.add('legend-active');
            legendeEtats.querySelectorAll('[data-legende="etat-3"]')[0].classList.add('legend-active');
            legendeEtats.querySelectorAll('[data-legende="etat-4"]')[0].classList.add('legend-active');
            document.getElementById("etat-1").classList.remove("etat-inactive");
            document.getElementById("etat-2").classList.remove("etat-inactive");
            document.getElementById("etat-3").classList.remove("etat-inactive");
            document.getElementById("etat-3-plein").classList.remove("etat-inactive");
            document.getElementById("etat-4").classList.remove("etat-inactive");
            document.getElementById("bassins_1_").classList.remove("etat-inactive");
        }

    // }

}/* end function villa */





