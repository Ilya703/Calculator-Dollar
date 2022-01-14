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
        definePercentTab();
        break;
      case '30':
        currentPercent = Number(tabValue);
        currentAmount = 20000;
        // slider1.min = 20000;
        calc();
        definePercentTab();
        break;
    };
  });
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
  }
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
  percent.innerHTML = `${currentPercent} %`;
  totalPercent.innerHTML = `${currentPercent} %`;
  amount.innerHTML = `${currentAmount.toLocaleString()} $`;
  noteAmount.innerHTML = `Сумма - ${currentAmount.toLocaleString()} $`;
  let reinvestitionPercent = currentPercent / 1200;
  let sum = currentAmount;
  let payments = 0;
  for(let i = 0; i < 12; i++){
    let income = sum * reinvestitionPercent;
    payments += income * (100 - currentReinvestition) / 100;
    sum += income * currentReinvestition / 100;
  };
  noteReinvestition.innerHTML = `Реинвестиции - ${Math.floor(sum - currentAmount).toLocaleString()} $`;
  totalAmount.innerHTML = `${Math.floor(sum).toLocaleString()} $`;
  noteTotal.innerHTML = `Вклад - ${Math.floor(sum).toLocaleString()} $`;
  amountPerMonth.innerHTML = `${Math.floor(payments / 12).toLocaleString()} $`;
  notePayment.innerHTML = `Выплаты - ${(Math.floor(payments)).toLocaleString()} $`;
  total.innerHTML = `${Math.floor(sum + payments).toLocaleString()} $`;
};
