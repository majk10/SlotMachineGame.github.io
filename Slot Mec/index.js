// Import the prompt-sync library for user input
const prompt = require("prompt-sync")();

// Constants for the number of rows and columns in the slot machine
const ROWS = 3;
const COLS = 3;

// Define the count and values for different symbols
const SYMBOL_COUNT ={
    "A": 2,
    "B": 4,
    "C": 6,
    "D": 8,
};
const SYMBOL_VALUES = {
    "A": 5,
    "B": 4,
    "C": 3,
    "D": 8,
};

// Function to get deposit amount from the user
const deposit = () => {
    while (true) {
        const depositAmount = prompt("Enter amount to play: ");
        const numberDepositAmount = parseFloat(depositAmount);
        if (isNaN(numberDepositAmount) || numberDepositAmount <= 0) {
            console.log("Invalid amount. Please enter again.");
        } else {
            return numberDepositAmount;
        }
    }
};

// Function to get the number of lines to play
const getNumberlines = () => {
    while (true) {
        const lines = prompt("Enter number of lines (0-3): ");
        const numberOflines = parseFloat(lines);
        if (isNaN(numberOflines) || numberOflines <= 0 || numberOflines > 3) {
            console.log("Invalid number of lines. Please enter again.");
        } else {
            return numberOflines;
        }
    }
};

// Function to get the bet amount per line
const getbet = (balance, lines) => {
    while (true) {
        const bet = prompt("Enter bet per line: ");
        const numberBet = parseFloat(bet);
        if (isNaN(numberBet) || numberBet <= 0 || numberBet > balance / lines) {
            console.log("Invalid bet amount. Please enter again.");
        } else {
            return numberBet;
        }
    }
};

// Function to simulate spinning the slot machine reels
const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOL_COUNT)) {
        for (let i = 0; i < count; i++) {
            symbols.push(symbol);
        }
    }

    const reels = [];
    for (let i = 0; i < COLS; i++) {
        reels.push([]);
        const reelSymbols = [...symbols];
        for (let j = 0; j < ROWS; j++) {
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);
        }
    }
    return reels;
};

// Function to transpose the reels to get rows
const transpose = (reels) => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS; j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
}

// Initial balance input from the player
let balance = deposit();

// Get the number of lines to play
const numberOflines = getNumberlines();

// Get the bet amount per line
const bet = getbet(balance, numberOflines);

// Simulate spinning the reels
const reels = spin();

// Display the results
console.log("Reels:", reels);

// Transpose the reels to get rows
const rows = transpose(reels);
console.log("Rows:", rows);
