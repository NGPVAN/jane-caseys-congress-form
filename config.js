
module.exports = {

  postgres: {
    url: process.env.POSTGRES_DB_URL,
    username: process.env.POSTGRES_USERNAME || '',
    password: process.env.POSTGRES_PASSWORD || '',
    server: process.env.POSTGRES_SERVER ||'localhost/postgres'
  },

  captcha:
  {
    old:{
      publicKey: process.env.RECAPTCHA_PUBLIC_KEY,
      privateKey: process.env.RECAPTCHA_PRIVATE_KEY
    },
    new: {
      publicKey: process.env.RECAPTCHA_V2_PUBLIC_KEY,
      privateKey: process.env.RECAPTCHA_V2_PRIVATE_KEY
    }
  }

};
