const TelegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

class UnexpectedStatusError extends Error{}
class UnexpectedTokenError extends Error {}

exports.handler = function handler() {
  fetch(process.env.URL, { follow: 0, timeout: 3000 })
    .then(response => {
      if (response.status === 200) {
        return response.text();
      }

      throw new UnexpectedStatusError(response.statusText);
    })
    .then(body => {
      if (process.env.EXPECTED_TOKEN && !body.includes(process.env.EXPECTED_TOKEN)) {
        throw new UnexpectedTokenError();
      }
    })
    .catch(error => {
      const message = error instanceof UnexpectedTokenError
        ? 'The served page doesn\'t contain the expected token!'
        : `Server error! — ${error.message}`;

      return bot.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
    });
};
