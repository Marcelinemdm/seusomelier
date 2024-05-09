document.addEventListener('DOMContentLoaded', function () {
  const currentYearMonthElement = document.getElementById('currentYearMonth');
  if (currentYearMonthElement) {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.toLocaleString('default', { month: 'long' });

      currentYearMonthElement.textContent = `${currentMonth} ${currentYear} SeuSomelier `;
  }
});

//currentAge
document.addEventListener('DOMContentLoaded', function () {
  const currentAgeElement = document.getElementById('currentAge');
  if (currentAgeElement) {
      const currentDate = new Date();
      const birthDate = new Date('2003-08-28');
      let age = calculateAge(birthDate, currentDate);

      if (currentDate.getMonth() > birthDate.getMonth() ||
          (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() >= birthDate.getDate())) {
          age++;
      }

      currentAgeElement.innerHTML = `Working as a C# developer<br>${age} years old`;
  }
});

function calculateAge(birthDate, currentDate) {
  const diffInMilliseconds = currentDate - birthDate;
  const ageDate = new Date(diffInMilliseconds);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
