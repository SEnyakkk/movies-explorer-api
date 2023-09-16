const REG_URL = /^((http|https|ftp):\/\/)?(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)/i;

const REG_EMAIL = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

module.exports = { REG_URL, REG_EMAIL };
