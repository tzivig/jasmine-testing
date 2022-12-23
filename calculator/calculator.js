window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  document.getElementById("loan-amount").value = 10000;
  document.getElementById("loan-years").value = 5;
  document.getElementById("loan-rate").value = 6;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const values = getCurrentUIValues();
  const monthly = calculateMonthlyPayment(values);
  updateMonthly(monthly);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  // Convert the term from years to months
  const termInMonths = values.years * 12;

  // Convert the annual interest rate to a monthly interest rate
  const monthlyRate = values.rate / 100 / 12;

  // Calculate the monthly payment using the formula:
  // monthlyPayment = principle * monthlyRate / (1 - (1 + monthlyRate)^(-termInMonths))
  const monthlyPayment = values.amount * monthlyRate / (1 - Math.pow(1 + monthlyRate, -termInMonths));

  // Return the monthly payment as a string with 2 decimal places
  return monthlyPayment.toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  document.getElementById("monthly-payment").innerHTML = monthly;
}
