function citations(content) {

  let parties = content.querySelectorAll(".partie");


  /* Create endnotes for each part (call + list) ------------------------------- */
  for (let n = 0; n < parties.length; n++) {
    let partie = parties[n];
    let numPart = n + 1;
    console.log(numPart);
    let list = partie.getElementsByClassName("refs-biblio")[0].getElementsByTagName("ul")[0];

    let citations = partie.querySelectorAll(".citation");

    for (let i = 0; i < citations.length; i++) {

      let citationText = citations[i].innerHTML;
      if (citationText.charAt(0) === '(') {
        citationText = citationText.substr(1, citationText.length - 2);
      }

      let numRef = i + 1;

      let noteCall = document.createElement('a');
      noteCall.classList.add("ref-fn");
      noteCall.href = '#part' + numPart + '-fn' + numRef;
      noteCall.id = 'part' + numPart + '-ref' + numRef;
      noteCall.setAttribute("data-ref", numRef);
      noteCall.innerHTML = numRef;

      citations[i].parentNode.replaceChild(noteCall, citations[i]);

      let note = document.createElement("li");
      note.id = 'part' + numPart + '-fn' + numRef;
      note.innerHTML = '<span class="mark-fn">' + numRef + '</span> ' + citationText + '<a href="#part' + numPart + '-ref' + numRef + '">↩</a>';
      list.appendChild(note);

    }

    let texts = content.querySelectorAll("p");
    for (let n = 0; n < texts.length; n++) {     
         
        contentText = texts[n].innerHTML.replace(' <a class="ref-fn"', '&nbsp;<a class="ref-fn"');
        
        texts[n].innerHTML = contentText;
    }

  }

}