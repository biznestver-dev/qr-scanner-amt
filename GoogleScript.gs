// Обработка GET-запросов
function doGet(e) {
  const action = e.parameter.action;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Оборудование") || ss.getSheets()[0];
  const rows = sheet.getDataRange().getValues();

  // 1. Получение всей базы для веб-приложения
  if (action === 'getEquipment') {
    const db = {};
    for (let i = 1; i < rows.length; i++) {
      const inv = String(rows[i][0]).trim();
      if (inv) {
        db[inv] = {
          inv: inv,
          category: String(rows[i][1] || ''),
          name: String(rows[i][2] || ''),
          sn: String(rows[i][3] || ''),
          status: String(rows[i][4] || 'В офисе')
        };
      }
    }
    return ContentService.createTextOutput(JSON.stringify(db))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // 2. Проверка конкретного инвентарного номера для Telegram-бота
  if (action === 'checkEquipment') {
    const targetInv = String(e.parameter.inv || '').trim().toUpperCase();
    for (let i = 1; i < rows.length; i++) {
      const inv = String(rows[i][0]).trim().toUpperCase();
      if (inv === targetInv) {
        return ContentService.createTextOutput(JSON.stringify({
          exists: true,
          data: {
            inv: inv,
            category: String(rows[i][1] || ''),
            name: String(rows[i][2] || ''),
            sn: String(rows[i][3] || ''),
            status: String(rows[i][4] || 'В офисе')
          }
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ exists: false }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ status: "OK" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Обработка POST-запросов
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("Оборудование") || ss.getSheets()[0];

    // Синхронизация статуса оборудования
    if (data.type === 'updateEquipmentStatus') {
      const targetInv = String(data.inv).trim().toUpperCase();
      const newStatus = data.status;
      const rows = sheet.getDataRange().getValues();
      let updated = false;

      for (let i = 1; i < rows.length; i++) {
        const invCell = String(rows[i][0]).trim().toUpperCase();
        if (invCell === targetInv) {
          sheet.getRange(i + 1, 5).setValue(newStatus);
          updated = true;
          break;
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ success: updated }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Сохранение пользователей бота
    if (data.type === 'saveUser') {
      const usersSheet = ss.getSheetByName("Пользователи") || ss.insertSheet("Пользователи");
      usersSheet.appendRow([data.chatId, data.username, data.firstName, new Date()]);
      return ContentService.createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Unknown type" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}