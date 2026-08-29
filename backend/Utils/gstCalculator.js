exports.calculateGST=(subtotal)=>{

const gstRate=5;

const gstAmount=subtotal*gstRate/100;

const platformFee = 10;

const totalAmount = subtotal + gstAmount + platformFee;

return{

gstRate,

gstAmount,

platformFee,

totalAmount:subtotal+gstAmount+10

};

}