$(document).ready(function() {
  const steamApiKey = "6569325A8A038A851BB8CD5870282C04";
  const csmoneyApiKey = ""; // Здесь нужно добавить API-ключ для CS.Money, если он есть

  const itemNames = ["AK-47 | Redline", "M4A1-S | Hyper Beast", "AWP | Asiimov"];

  itemNames.forEach(function(itemName) {
    // Получаем цену предмета на Steam
    $.getJSON(`https://api.csgofloat.com/?url=steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S${steamApiKey}A%listing%Dapp%570%2Frender%3Flistingid%3D${encodeURI(itemName)}`, function(data) {
      const itemSteamPrice = data.assets[0].lowest_price;

      // Если есть API-ключ для CS.Money, получаем цену предмета на нем
      if (csmoneyApiKey) {
        $.getJSON(`https://cs.money/prices/api/v1/get-by-item/${encodeURI(itemName)}`, {key: csmoneyApiKey}, function(data) {
          const itemCsMoneyPrice = data[0].price;

          // Создаем новую строку в таблице с полученными данными
          const newRow = $("<tr></tr>");
          const nameCell = $("<td></td>").text(itemName);
          const steamCell = $("<td></td>").text(itemSteamPrice);
          const csMoneyCell = $("<td></td>").text(itemCsMoneyPrice);

          newRow.append(nameCell, steamCell, csMoneyCell);
          $("#item-table").append(newRow);
        });
      } else { // Если нет API-ключа для CS.Money, создаем строку только с ценой на Steam
        const newRow = $("<tr></tr>");
        const nameCell = $("<td></td>").text(itemName);
        const steamCell = $("<td></td>").text(itemSteamPrice);

        newRow.append(nameCell, steamCell);
        $("#item-table").append(newRow);
      }
    });
  });
});
