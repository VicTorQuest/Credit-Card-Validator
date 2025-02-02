function  validateCreditCard(cardNumber) {
    
    // First i need to remove every space or - in the given card number  
    // the regular exp '/[\s-]/g' means check/test for an empty space or '-' in the carde number globally
    cardNumber = cardNumber.replace(/[\s-]/g, '')

    // Making sure the card number contains only digits. if not it'll return invalid input
    // the regular expression '/^\d+$/' checks one or more numbers that must start with a number and end with a number
    if (!/^\d+$/.test(cardNumber)) {
        return {
            'valid': false,
            'message': 'Invalid characters in card number'
        }
    }


    // Check card type
    const cardType = getCardType(cardNumber)

    // if the function returns false it means the card type is unknown or can't be detected
    if (!cardType)  {
        return {
            'valid': false,
            'message': 'Unknown card type'
        }
    }


    const isValid = luhnCheck(cardNumber)

    return {
        valid: isValid,
        message: isValid ? `Valid ${cardType} card number`: `Invalid card number`,
        cardType: isValid ? cardType: null
    }

    // function to check the type of the card 
    function getCardType(cardNumber) {
        // here are the card types and their respective patterns
        const cardPatterns = {
            'Visa': /^4[0-9]{12}(?:[0-9]{3})?$/,  // visa card starts with 4 followed by 12 numbers from 0-9 then exactly 3 digits if present or not. making it 13-16 digits long(optional cus of ?) and must end with a string
            'MasterCard': /^5[1-5][0-9]{14}$/, // Master Card starts with a 5 then second number from 1-5 and then 14 numbers from 0-9 and must end with a string. making it 16 numbers in total
            'Verve': /^(5060|5061|5078|5079|6500|6509)\d{10,14}$/   // Verve card starts with either (5060,5061,5078,5079,6500,6509) then 10-14 more digits after the prefix. this allow verve cards to be around 16-19 digits long
        }

        // looping through the patterns and testing the card number on each of them
        for (const [type, pattern] of Object.entries(cardPatterns)) {
            if (pattern.test(cardNumber)) {
                return type;
            }
        }
        return null;
    }

    // The luhn check algorithm(also called mod 10 algorithm) detects errors such as transposed numbers and mistyped digits when validating credit card numbers
    function luhnCheck(cardNumber) {
        let sum = 0;
        let shouldDouble = false;
    
        // Process each digit from right to left
        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber[i], 10);
    
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9; // Subtract 9 from numbers greater than 9
            }
    
            sum += digit;
            shouldDouble = !shouldDouble;
        }
    
        return sum % 10 === 0;
    }


    // Why is this important?
    // All major card networks(visa, masterCard e.t.c) uses luhn check.
    // If a card fails this test then it is not valid card even if it has correct number of digits and prefix.
    // It detacts input error before sending the card number for payment processing
    
}



const checkCard1 = validateCreditCard('4111 1111 1111 1111')  // Visa card   
const checkCard2 = validateCreditCard('5555 5555 5555 4444')  // MasterCard
const checkCard3 = validateCreditCard('5060 1234 5678 9011')  // Verve

console.log(checkCard1)
console.log(checkCard2)
console.log(checkCard3)