// Open modal function
function openModalCart() {
    const modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// Close modal function
function closeModalCart() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    var modals = document.getElementsByClassName("modal");
    for (var i = 0; i < modals.length; i++) {
      if (event.target == modals[i]) {
        modals[i].style.display = "none";
      }
    }
  };