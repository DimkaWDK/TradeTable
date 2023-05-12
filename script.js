const steamApiUrl = "https://api.steamapis.com/market/items/730";
const csMoneyApiUrl = "https://cs.money/price/all_json";

const itemsTable = document.getElementById("itemsTable");
const itemsTableBody = itemsTable.getElementsByTagName("tbody")[0];

// Получаем данные из API Steam
fetch(steamApiUrl)
  .then(response => response.json())
  .then(data => {
    // Обходим полученный объект и добавляем каждый элемент в таблицу
    for (const item of Object.values(data.items)) {
      const itemName = item.name;
      const itemPrice = item.prices.median_price;
      const itemRow = `<tr><td>${itemName}</td><td>${itemPrice}</td><td></td></tr>`;
      itemsTableBody.innerHTML += itemRow;
    }
  });

// Получаем данные из API cs.money
fetch(csMoneyApiUrl)
  .then(response => response.json())
  .then(data => {
    // Обходим полученный объект и обновляем строку в таблице, если найдено совпадение по названию предмета
    for (const item of Object.values(data)) {
      const itemName = item.market_name;
      const itemPrice = item.price;
      const itemRow = itemsTableBody.querySelector(`tr td:first-child:not(:empty):not(:first-child):not([colspan])`);
      if (itemRow.innerHTML === itemName) {
        itemRow.nextElementSibling.innerHTML = itemPrice;
      }
    }
  });
