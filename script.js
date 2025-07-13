function setupCurrencyConvertor() {
  const elements = {
    amountInput: document.querySelector(".convert-amount input"),
    fromSelect: document.querySelector(".convert-from select"),
    toSelect: document.querySelector(".convert-to select"),
    convertBtn: document.querySelector(".convert-submit-btn button"),
    resultText: document.querySelector(".sc-conver"),
    resultValue: document.querySelector(".sc-answer")
  };
    const swapBtn = document.querySelector(".convert-ex");

  elements.amountInput.value = "1.00";
  elements.fromSelect.value = "USD";
  elements.toSelect.value = "EUR";


  elements.convertBtn.addEventListener("click", convert);

  swapBtn.addEventListener("click", ()=>{
    const temp = elements.fromSelect.value;
    elements.fromSelect.value = elements.toSelect.value;
    elements.toSelect.value = temp;
  })

  async function convert() {
    const amount = parseFloat(elements.amountInput.value);
    const from = elements.fromSelect.value;
    const to = elements.toSelect.value;

    if(isNaN(amount)){
      showResult("Invalid amount", "");
      return;
    }

    if(from === to){
      showResult("Same currencies", "");
      return;
    }

    elements.convertBtn.disabled = true;
    elements.convertBtn.textContent = "Converting..."

    try {
      const response = await fetch(`https://api.frankfurter.app/latest?from=${from}&to=${to}`);
      const data = await response.json();
      const result = (amount * data.rates[to]).toFixed(2);
      showResult(`${amount} ${from}=`, `${result} ${to}`)
    } catch (error) {
      showResult("Error Converting!", "");
    }finally{
      elements.convertBtn.disabled = false;
      elements.convertBtn.textContent = "Convert";
    }
  }

  function showResult(text, value){
    elements.resultText.textContent = text;
    elements.resultValue.textContent = value;
  }
};

window.addEventListener('DOMContentLoaded', setupCurrencyConvertor);

 function lockScroll(){
  document.body.style.overflow = "hidden";
 }

 function unLockScroll(){
  document.body.style.overflow = "auto";
 }

//signin
document.addEventListener('DOMContentLoaded', function () {
  const showRegisterBtn = document.getElementById('showRegister');
  const showSignInBtn = document.getElementById('showSignIn');
  const registerFormSec = document.querySelector('.register-ui-sec');
  const signUpFormSec = document.querySelector('.form-container');
  const signInLink = document.querySelector('.form-wrapper p a');

  showRegisterBtn.addEventListener("click", function (e) {
    e.preventDefault();
    registerFormSec.style.display = "flex";
    lockScroll();
  });

  showSignInBtn.addEventListener("click", function (e) {
    e.preventDefault();
    signUpFormSec.style.display = 'flex';
    lockScroll();
  });



  // Formlar arası geçiş
  if (signInLink) {
    signInLink.addEventListener("click", function (e) {
      e.preventDefault();
      signUpFormSec.style.display = 'none';
      registerFormSec.style.display = 'flex';
   
    });
  }

  document.querySelectorAll('.xe-ui-exit-x').forEach(btn => {
    btn.addEventListener('click', () => {
      signUpFormSec.style.display = 'none';
      registerFormSec.style.display = 'none';
      unLockScroll();
    });
  });
});


//Logo refresh functionality
document.addEventListener('DOMContentLoaded',()=>{
  const logoImg = document.querySelector(".exchane-logo img");

  if(logoImg){
    logoImg.addEventListener("click", ()=>{
      window.location.reload();
    });

    logoImg.style.cursor="pointer";
  }
});