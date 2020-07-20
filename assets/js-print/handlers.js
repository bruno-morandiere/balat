
    let elemsPrev = ['#figure-ra152', '#figure-ra28j', '#figure-ra57',];
    let elemsNext = ['#figure-ra52'];
    let nextPageNumber = [];


    class handlers extends Paged.Handler {
      constructor(chunker, polisher, caller) {
        super(chunker, polisher, caller);
      }

      beforeParsed(content) {
        let parties = content.querySelectorAll(".partie");
        clean(content);
        citations(content);
      }

      afterPageLayout(pageElement, page, breakToken) {
        movePages(pageElement);
      }


    }
    Paged.registerHandlers(handlers);