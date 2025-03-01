document.addEventListener('DOMContentLoaded', function () {
  const currentYearMonthElement = document.getElementById('currentYearMonth');
  if (currentYearMonthElement) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

      currentYearMonthElement.textContent = `${currentMonth} ${currentYear} SeuSomelier `;
  }

  const currentAgeElement = document.getElementById('currentAge');
  if (currentAgeElement) {
      const currentDate = new Date();
      const birthDate = new Date('2003-08-28');
      let age = calculateAge(birthDate, currentDate);

      currentAgeElement.innerHTML = `<br>${age} years old`;
  }
});

function calculateAge(birthDate, currentDate) {
  const ageDifMs = currentDate - birthDate;
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}