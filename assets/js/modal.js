/* jshint esversion: 8 */

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");
// When the user clicks on the button, open the modal
btn.addEventListener("click", function () {
  modal.style.display = "block";
});

// Get the <span> element that closes the modal
let span = document.getElementById("close");
// When the user clicks on <span> (x), close the modal
span.addEventListener("click", function () {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click",function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }});