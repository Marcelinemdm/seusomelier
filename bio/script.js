document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    document.getElementById('popupOverlay').style.display = 'flex';
  }, 2000);
});

function closePopup() {
  document.getElementById('popupOverlay').style.display = 'none';
}
