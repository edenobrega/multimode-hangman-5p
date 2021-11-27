### Browser Compatibility
![Home page (left) shown in chrome, and play page (right) shown in firefox](testing/browser-compatibility-1.png)
*Home page (left) shown in chrome, and play page (right) shown in firefox*

![Play page shown in chrome (left) and edge (right)](testing/browser-compatibility-2.png)
*Play page shown in chrome (left) and edge (right)*

### Code Validation
For validation I used two tools from w3, for html I used [Nu Html Checker](https://validator.w3.org/nu/), for css I used [CSS Validation Service](https://jigsaw.w3.org/css-validator/) and for jscript i used [jshint](https://jshint.com/)

JSHint validation for index.js, showing no errors
![jshint validation on index.script](testing/jshint-index.png)

JSHint validation for script.js, showing no errors, but two errors, the first is about variables and confusing semantics, but the variable in question is used only once and is directly above the loop, the second warning ??, and the undefined variable is a [interface](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) that helps working with url params
![jshint validation on index.script](testing/jshint-script.png)

CSS Validation for style.css showing no errors
![CSS validation for style.css](testing/css-validator-style.png)

CSS Validation for index.css showing no errors
![CSS validation for index.css](testing/css-validator-index.png)

CSS Validation for play.css showing no errors
![CSS validation for play.css](testing/css-validator-play.png)

HTML Validation for index.html showing no errors
![HTML validation for index.html](testing/html-validator-index.png)

HTML Validation for play.html showing no errors
![HTML validation for play.html](testing/html-validator-play.png)