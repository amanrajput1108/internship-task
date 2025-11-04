const popup = document.getElementById("popup");
const contactBtn = document.getElementById("contactBtn");
const closePopup = document.getElementById("closePopup");

contactBtn.onclick = function() {
    popup.style.display = "flex"
}

closePopup.onclick = function() {
    popup.style.display = "none"
}

window.onclick = function(event) {
    if (event.target === popup) {
        popup.style.display = "none"
    }
}
