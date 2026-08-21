// Обработка GET-запросов
function doGet(e) {
  const action = e && e.parameter ? e.parameter.action : '';
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

  if (action === 'getVenues') {
    return jsonResponse(readReferenceSheet('Площадки', ['name', 'address', 'manager', 'phone', 'status']));
  }

  if (action === 'getSchedule') {
    return jsonResponse(readReferenceSheet('Расписание', ['time', 'comp', 'participant', 'location', 'desc']));
  }

  if (action === 'getContacts') {
    return jsonResponse(readReferenceSheet('Контакты', ['dept', 'name', 'task', 'phone']));
  }

  if (action === 'getCallSheet') {
    const id = String(e.parameter.id || '').trim();
    const callSheet = readCallSheet(id);
    return jsonResponse(callSheet ? { success: true, data: callSheet } : { success: false, error: 'Call sheet not found' });
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
      const newStatus = String(data.status || '').trim();
      if (!isValidInventoryNumber(targetInv) || !newStatus || newStatus.length > 200) {
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Invalid equipment data" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      const rows = sheet.getDataRange().getValues();
      let updated = false;

      for (let i = 1; i < rows.length; i++) {
        const invCell = String(rows[i][0]).trim().toUpperCase();
        if (invCell === targetInv) {
          sheet.getRange(i + 1, 5).setValue(newStatus.startsWith('=') ? "'" + newStatus : newStatus);
          updated = true;
          break;
        }
      }
      return ContentService.createTextOutput(JSON.stringify({ success: updated }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Сохранение пользователей бота
    if (data.type === 'saveUser') {
      const chatId = String(data.chatId || '').trim();
      const username = String(data.username || '').trim().slice(0, 100);
      const firstName = String(data.firstName || '').trim().slice(0, 100);
      if (!/^\d+$/.test(chatId) || !firstName) {
        return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Invalid user data" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      const usersSheet = ss.getSheetByName("Пользователи") || ss.insertSheet("Пользователи");
      usersSheet.appendRow([chatId, username, firstName, new Date()]);
      return ContentService.createTextOutput(JSON.stringify({ success: true }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    if (data.type === 'saveAct') {
      const act = data.act;
      if (!act || !/^\d{4}-\d+$/.test(String(act.num || '')) || !act.returnDate) {
        return jsonResponse({ success: false, error: "Invalid act data" });
      }
      saveActToSheet(act);
      return jsonResponse({ success: true });
    }

    if (data.type === 'updateActStatus') {
      const num = String(data.num || '').trim();
      const status = String(data.status || '').trim();
      if (!/^\d{4}-\d+$/.test(num) || !['Выдано', 'Частично сдано', 'Закрыт'].includes(status)) {
        return jsonResponse({ success: false, error: "Invalid act status" });
      }
      const actsSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Накладные');
      if (!actsSheet) return jsonResponse({ success: false, error: "Acts sheet not found" });
      const rows = actsSheet.getDataRange().getValues();
      for (let i = 1; i < rows.length; i++) {
        if (String(rows[i][0]).trim() === num) {
          actsSheet.getRange(i + 1, 7).setValue(status);
          actsSheet.getRange(i + 1, 9).clearContent();
          return jsonResponse({ success: true });
        }
      }
      return jsonResponse({ success: false, error: "Act not found" });
    }

    if (data.type === 'saveCallSheet') {
      if (!data.callSheet || !/^CS-[A-Za-z0-9_-]+$/.test(String(data.callSheet.id || ''))) {
        return jsonResponse({ success: false, error: "Invalid call sheet data" });
      }
      saveCallSheet(data.callSheet);
      return jsonResponse({ success: true });
    }

    if (data.type === 'reserveActNumber') {
      const year = String(data.year || new Date().getFullYear()).trim();
      const minimum = Number(data.minimum || 1);
      if (!/^\d{4}$/.test(year) || !Number.isInteger(minimum) || minimum < 1) {
        return jsonResponse({ success: false, error: "Invalid year" });
      }
      const lock = LockService.getScriptLock();
      lock.waitLock(30000);
      try {
        const properties = PropertiesService.getScriptProperties();
        const key = 'actNumberCounter_' + year;
        const currentNumber = Number(properties.getProperty(key) || 0);
        const nextNumber = Math.max(currentNumber, minimum - 1) + 1;
        properties.setProperty(key, String(nextNumber));
        return jsonResponse({
          success: true,
          num: year + '-' + String(nextNumber).padStart(3, '0')
        });
      } finally {
        lock.releaseLock();
      }
    }

    return ContentService.createTextOutput(JSON.stringify({ success: false, error: "Unknown type" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function isValidInventoryNumber(value) {
  return /^AM-[A-Z0-9]+(?:-[A-Z0-9]+)*$/.test(value);
}

function readReferenceSheet(sheetName, fields) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() < 2) return [];
  const rows = sheet.getDataRange().getDisplayValues();
  return rows.slice(1).map(row => {
    const item = {};
    fields.forEach((field, index) => item[field] = String(row[index] || '').trim());
    return item;
  }).filter(item => fields.some(field => item[field]));
}

function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function saveActToSheet(act) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Накладные') || ss.insertSheet('Накладные');
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Номер', 'Дата', 'Возврат до', 'Ответственный', 'Получатель', 'Контакты', 'Статус', 'Оборудование JSON', 'Уведомление отправлено']);
  }
  const rows = sheet.getDataRange().getValues();
  const values = [
    String(act.num || ''), String(act.date || ''), String(act.returnDate || ''),
    String(act.manager || ''), String(act.participant || ''), String(act.contact || ''),
    String(act.status || 'Выдано'), JSON.stringify(act.items || []), ''
  ].map(value => String(value).startsWith('=') ? "'" + value : value);
  const existingRow = rows.findIndex((row, index) => index > 0 && String(row[0]).trim() === values[0]);
  if (existingRow >= 0) sheet.getRange(existingRow + 1, 1, 1, values.length).setValues([values]);
  else sheet.appendRow(values);
}

function checkOverdueReturns() {
  const token = PropertiesService.getScriptProperties().getProperty('TELEGRAM_BOT_TOKEN');
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Накладные');
  if (!token || !sheet || sheet.getLastRow() < 2) return;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    const returnDate = parseSheetDate(rows[i][2]);
    const status = String(rows[i][6] || 'Выдано');
    const notifiedAt = rows[i][8];
    if (!returnDate || returnDate >= today || status === 'Закрыт' || notifiedAt) continue;
    const chatIds = getResponsibleChatIds(String(rows[i][3] || '').trim());
    if (chatIds.length === 0) continue;
    const text = `⚠️ <b>Просрочен возврат оборудования</b>\nНакладная: <b>${escapeTelegramHtml(rows[i][0])}</b>\nПолучатель: ${escapeTelegramHtml(rows[i][4])}\nСрок возврата: ${escapeTelegramHtml(rows[i][2])}\nСтатус: ${escapeTelegramHtml(status)}`;
    const sent = chatIds.every(chatId => sendTelegramMessage(token, chatId, text));
    if (sent) sheet.getRange(i + 1, 9).setValue(new Date());
  }
}

function getResponsibleChatIds(managerName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Ответственные');
  if (!sheet || sheet.getLastRow() < 2) return [];
  return sheet.getDataRange().getValues().slice(1)
    .filter(row => !managerName || String(row[0]).trim() === managerName)
    .map(row => String(row[1] || '').trim())
    .filter(chatId => /^\d+$/.test(chatId));
}

function sendTelegramMessage(token, chatId, text) {
  const response = UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/sendMessage', {
    method: 'post', contentType: 'application/json', muteHttpExceptions: true,
    payload: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
  });
  try {
    return JSON.parse(response.getContentText()).ok === true;
  } catch (error) {
    return false;
  }
}

function parseSheetDate(value) {
  const text = String(value || '').trim();
  const match = text.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (!match) return null;
  return new Date(Number(match[3]), Number(match[2]) - 1, Number(match[1]));
}

function escapeTelegramHtml(value) {
  return String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

function createDailyOverdueTrigger() {
  ScriptApp.getProjectTriggers().forEach(trigger => {
    if (trigger.getHandlerFunction() === 'checkOverdueReturns') ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger('checkOverdueReturns').timeBased().everyDays(1).atHour(9).create();
}

function saveCallSheet(callSheet) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Вызывные') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Вызывные');
  if (sheet.getLastRow() === 0) sheet.appendRow(['ID', 'Дата сохранения', 'Данные JSON']);
  const rows = sheet.getDataRange().getValues();
  const values = [String(callSheet.id), new Date(), JSON.stringify(callSheet)];
  const existingRow = rows.findIndex((row, index) => index > 0 && String(row[0]).trim() === values[0]);
  if (existingRow >= 0) sheet.getRange(existingRow + 1, 1, 1, values.length).setValues([values]);
  else sheet.appendRow(values);
}

function readCallSheet(id) {
  if (!id) return null;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Вызывные');
  if (!sheet || sheet.getLastRow() < 2) return null;
  const rows = sheet.getDataRange().getValues();
  const row = rows.slice(1).find(item => String(item[0]).trim() === id);
  if (!row) return null;
  try { return JSON.parse(String(row[2])); } catch (error) { return null; }
}