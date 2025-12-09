// Google Apps Script for Google Sheets Integration
// Deploy this as a Web App and use the URL in your form

function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get timestamp
    const timestamp = new Date();
    
    // Prepare row data
    const rowData = [
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.occupation || '',
      data.linkedin || '',
      data.message || '',
      data.gdpr ? 'Да' : 'Нет'
    ];
    
    // Append data to sheet
    sheet.appendRow(rowData);
    
    // Send email notification (optional)
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'success': true,
        'message': 'Заявка успешно отправлена!'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'success': false,
        'message': 'Ошибка: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      'status': 'active',
      'message': 'Iceland Expedition Form API is running'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function sendEmailNotification(data) {
  try {
    const emailAddress = 'forgeacademy100@gmail.com'; // Change to your email
    const subject = '🇮🇸 Новая заявка - Экспедиция в Исландию 2026';
    
    const htmlBody = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #FF7B09;">Новая заявка на участие в экспедиции</h2>
          <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Имя:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${data.email}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Телефон:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Должность/Компания:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${data.occupation}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">LinkedIn:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${data.linkedin || 'Не указан'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; vertical-align: top;">Мотивация:</td>
              <td style="padding: 10px; border: 1px solid #ddd;">${data.message || 'Не указана'}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; color: #666;">
            <strong>Дата и время:</strong> ${new Date().toLocaleString('ru-RU')}
          </p>
        </body>
      </html>
    `;
    
    MailApp.sendEmail({
      to: emailAddress,
      subject: subject,
      htmlBody: htmlBody
    });
    
  } catch (error) {
    Logger.log('Email notification error: ' + error.toString());
  }
}

// Initialize spreadsheet with headers (run once)
function setupSpreadsheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const headers = [
    'Дата/Время',
    'Имя',
    'Email',
    'Телефон',
    'Должность/Компания',
    'LinkedIn',
    'Мотивация',
    'GDPR'
  ];
  
  sheet.clear();
  sheet.appendRow(headers);
  
  // Format header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#FF7B09');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  Logger.log('Spreadsheet setup complete!');
}
