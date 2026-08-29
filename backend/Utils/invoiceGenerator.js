const crypto = require("crypto")

const generateInvoice = ()=> {

    const year = new Date().getFullYear();

    const random = crypto.randomBytes(3).toString("hex").toUpperCase();

    return `RST-${year}-${random}`;
}

module.exports = generateInvoice