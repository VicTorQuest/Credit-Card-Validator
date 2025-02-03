# Credit Card Validator

A JavaScript utility that validates credit card numbers and identifies the card type (Visa, MasterCard, or Verve) using regular expressions and the Luhn algorithm.

## Features

- **Input Sanitization**: Automatically removes spaces and hyphens. 
- **Regex Matching**: Detects card type based on known patterns. 
- **Luhn Algorithm**: Validates the card number to catch common errors like mistyped or transposed digits. 
- **Clear Output**: Returns an object with validation status, card type, and a descriptive message.

## How It Works

1. **Clean Input**: Removes all spaces and hyphens from the provided card number. 
2. **Validate Characters**: Ensures the card number contains only digits. 
3. **Determine Card Type**: Matches the cleaned card number against regular expressions for: 
- **Visa**: Must start with `4` and be 13 or 16 digits long. 
- **MasterCard**: Must start with `5` (with the second digit between `1-5`) and be 16 digits long. 
- **Verve**: Must start with one of the prefixes (`5060`, `5061`, `5078`, `5079`, `6500`, or `6509`) and be between 16 and 19 digits long.
4. **Luhn Check**: Applies the Luhn algorithm to verify the integrity of the card number. 
5. **Return Result**: Provides an object indicating whether the card is valid, its type (if valid), and a descriptive message.

## Usage

Clone the repository and run the script using Node.js

```bash git clone https://github.com/VicTorQuest/Credit-Card-Validator.git 
cd yourrepository 
node index.js