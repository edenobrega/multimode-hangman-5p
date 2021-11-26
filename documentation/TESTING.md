### Browser Compatibility
![Home page (left) shown in chrome, and play page (right) shown in firefox](documentation/browser-compatibility-1.png)
*Home page (left) shown in chrome, and play page (right) shown in firefox*

![Play page shown in chrome (left) and edge (right)](documentation/browser-compatibility-2.png)
*Play page shown in chrome (left) and edge (right)*

### Code Validation
For validation I used two tools from w3, for html I used [Nu Html Checker](https://validator.w3.org/nu/), for css I used [CSS Validation Service](https://jigsaw.w3.org/css-validator/) and for jscript i used [jshint](https://jshint.com/)

JSHint validation for index.js, showing no errors
![jshint validation on index.script](documentation/testing/jshint-index.png)

JSHint validation for script.js, showing no errors, but two errors, the first is about variables and confusing semantics, but the variable in question is used only once and is directly above the loop, the second warning ??, and the undefined variable is a [interface](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) that helps working with url params
![jshint validation on index.script](documentation/testing/jshint-script.png)