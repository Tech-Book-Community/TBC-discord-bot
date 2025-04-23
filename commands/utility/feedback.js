// commands/feedback.ts
const {
  SlashCommandBuilder,
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
} = require('discord.js');
const { I18n } = require('i18n-js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('feedback')
    .setDescription('Give us your feedback about the event'),
  async execute(interaction) {
    const i18n = new I18n({
      en: {
        title: 'Feedback Form',
        eventLabel: 'Which event are you giving feedback on?',
        ratingLabel: 'How satisfied are you? (1-5)',
        suggestionLabel: 'Any suggestions?',
      },
      'zh-tw': {
        title: '回饋表單',
        eventLabel: '你要回饋的活動是？',
        ratingLabel: '你對這活動的滿意度？（1~5）',
        suggestionLabel: '有什麼建議嗎？',
      },
    });

    i18n.locale = interaction.locale.includes('en') ? 'en' : 'zh-tw';

    const modal = new ModalBuilder()
      .setCustomId('feedback_form')
      .setTitle(i18n.t('title'));

    const eventSelect = new TextInputBuilder()
      .setCustomId('event')
      .setLabel(i18n.t('eventLabel'))
      .setPlaceholder('English Small Talk')
      .setValue('English Small Talk')
      .setStyle(TextInputStyle.Short);

    const rating = new TextInputBuilder()
      .setCustomId('rating')
      .setLabel(i18n.t('ratingLabel'))
      .setPlaceholder('1~5')
      .setStyle(TextInputStyle.Short);

    const suggestion = new TextInputBuilder()
      .setCustomId('suggestion')
      .setLabel(i18n.t('suggestionLabel'))
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(
      new ActionRowBuilder().addComponents(eventSelect),
      new ActionRowBuilder().addComponents(rating),
      new ActionRowBuilder().addComponents(suggestion),
    );

    await interaction.showModal(modal);
  },
};
