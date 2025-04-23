// interactions/handleModalSubmit.ts
const { google } = require('googleapis');
const { Events } = require('discord.js');
const dayjs = require('dayjs');
const path = require('node:path');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId !== 'feedback_form') return;

    const event = interaction.fields.getTextInputValue('event');
    const rating = interaction.fields.getTextInputValue('rating');
    const suggestion = interaction.fields.getTextInputValue('suggestion');
    const user = interaction.user.username;

    // Google Sheets
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, '../credentials.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const sheetId = '1L--7A1qSqsjmPW5HDcIiIpk6hWbkHgbj92Nekzx21_o';
    const row = [dayjs(), user, event, rating, suggestion];

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Feedback!A:E',
      valueInputOption: 'RAW',
      requestBody: { values: [row] },
    });

    await interaction.reply({
      content: '✅ Thanks for your feedback!',
      ephemeral: true,
    });
  },
};
