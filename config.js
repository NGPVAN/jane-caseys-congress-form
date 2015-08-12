module.exports = {

    connectionString: process.env.DATABASE_URL,
    PUBLIC_KEY: '6LeRdfQSAAAAAG_fUXud4U5gaiQStQ5nWEbUS8Sr',
    PRIVATE_KEY: '6LeRdfQSAAAAAGGvll55GUQHg9HEAKH9QjUrtG6j',
    NEW_RECAPTCHA_PUBLIC_KEY: '6LdRSAYTAAAAAIF6kPVGPOY-Mg6Qvwca0gdphFxN',
    NEW_RECAPTCHA_PRIVATE_KEY: '6LdRSAYTAAAAAIpObr2gN5Ua66yNj0GccY2Euft8',
    VIEWS_DIR: '../client/views/',
    ZIP_REGEX_PATTERN: /^[0-9]{5}$/,
    EMAIL_REGEX_PATTERN: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/ig

};