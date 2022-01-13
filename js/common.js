const amount = document.getElementById('amount');
const percent = document.getElementById('percent');
const slider0 = document.querySelector('.slider0');
const slider1 = document.querySelector('.slider1');
const slider2 = document.querySelector('.slider2');
const tabs = document.querySelectorAll('.tab');
const reinvestition = document.getElementById('reinvestition');
const totalAmount = document.getElementById('total__amount');
const noteAmount = document.getElementById('note__amount');
const noteTotal = document.getElementById('note__total');
const notePayment = document.getElementById('note__payment');
const noteReinvestition = document.getElementById('note__reinvestition');
const totalPercent = document.getElementById('total__percent');
const amountPerMonth = document.getElementById('amountPerMonth');
const total = document.getElementById('total');
let currentPercent = 15;
let currentAmount = 50000;
let currentReinvestition = 0;
const definePercentTab = () => {
  tabs.forEach((item,index) => {
    item.classList.remove('active');
    if(tabs[index].dataset.percent == currentPercent){
      tabs[index].classList.add('active');
    };
  });
  slider0.value = currentPercent / 15;
};
tabs.forEach((item) => {
  item.addEventListener('click', () => {
    let tabValue = item.dataset.percent;
    switch(tabValue){
      case '15':
        currentPercent = Number(tabValue);
        currentAmount = 50000;
        // slider1.min = 50000;
        calc();
        break;
      case '30':
        currentPercent = Number(tabValue);
        currentAmount = 20000;
        // slider1.min = 20000;
        calc();
        break;
    };
  });
  definePercentTab();
});
const range0 = () => {
  currentPercent = Number(slider0.value) * 15;
  definePercentTab();
  if(currentPercent == 30){
    currentAmount = 20000;
  } else {
    currentAmount = 50000;
  }
  calc();
};
const range1 = () => {
  currentAmount = Number(slider1.value);
  if (currentPercent == 15 && currentAmount < 50000) {
    currentAmount = 50000;
    slider1.value = 50000;
  }
  amount.innerHTML = `${currentAmount.toLocaleString()} $`;
  noteAmount.innerHTML = `Сумма - ${currentAmount.toLocaleString()} $`;
  calc();
};
const range2 = () => {
  currentReinvestition = Number(slider2.value);
  reinvestition.innerHTML = `${currentReinvestition} %`;
  calc();
};
const calc = () => {
  slider1.value = currentAmount;
  if(currentReinvestition > 0){
    noteAmount.style.display = 'block';
    noteReinvestition.style.display = 'block';
  } else {
    noteAmount.style.display = 'none';
    noteReinvestition.style.display = 'none';
  }
  definePercentTab();
  percent.innerHTML = `${currentPercent} %`;
  totalPercent.innerHTML = `${currentPercent} %`;
  amount.innerHTML = `${currentAmount.toLocaleString()} $`;
  noteAmount.innerHTML = `Сумма - ${currentAmount.toLocaleString()} $`;
  let reinvestitionAmount = currentAmount * currentPercent * currentReinvestition / 10000;
  noteReinvestition.innerHTML = `Реинвестиции - ${Math.floor(reinvestitionAmount).toLocaleString()} $`;
  let remains = (currentAmount * currentPercent / 100) - reinvestitionAmount;
  totalAmount.innerHTML = `${Math.floor(currentAmount + reinvestitionAmount).toLocaleString()} $`;
  let sum = currentAmount;
  let remainsAmount = 0;
  for(let i = 0; i < 12; i++){
    let currentAmountRemains = sum * (1 - currentReinvestition / 100) * currentPercent / 1200;
    remainsAmount += currentAmountRemains;
    sum = sum + sum * currentPercent * currentReinvestition / 120000;
    if(i == 5){
      remains = currentAmountRemains;
    }
  };
  sum += remainsAmount;
  amountPerMonth.innerHTML = `${Math.floor(remains).toLocaleString()} $`;
  noteTotal.innerHTML = `Вклад - ${currentAmount.toLocaleString()} $`;
  notePayment.innerHTML = `Выплаты - ${(Math.floor(remains) * 12).toLocaleString()} $`;
  total.innerHTML = `${Math.floor(sum).toLocaleString()} $`;
};
