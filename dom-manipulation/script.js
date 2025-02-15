const quotes = [
    { text: "If you catch a bird, let it go. If it comes back, keep it well. But if it never comes back, then it's never meant to be yours.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);
});

function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    if (!quoteDisplay) return;
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = "No quotes available. Please add some!";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${randomQuote.text} - <strong>(${randomQuote.category})</strong></p>`;
}

function addQuote() {
    const newQuoteTextElement = document.getElementById("newQuoteText");
    const newQuoteCategoryElement = document.getElementById("newQuoteCategory");
    
    if (!newQuoteTextElement || !newQuoteCategoryElement) return;
    
    const newQuoteText = newQuoteTextElement.value.trim();
    const newQuoteCategory = newQuoteCategoryElement.value.trim();
    
    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }
    
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    newQuoteTextElement.value = "";
    newQuoteCategoryElement.value = "";
    showRandomQuote();
}



function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;
    document.body.appendChild(formContainer);


const quotes = [
    { text: "The only way to do great work is to love what you do.", category: "Motivation" },
    { text: "Do what you can, with what you have, where you are.", category: "Inspiration" },
    { text: "Success is not the key to happiness. Happiness is the key to success.", category: "Success" }
];

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);
});

function showRandomQuote() {
    const quoteDisplay = document.getElementById("quoteDisplay");
    if (!quoteDisplay) return;
    if (quotes.length === 0) {
        quoteDisplay.innerHTML = "No quotes available. Please add some!";
        return;
    }
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `<p>${randomQuote.text} - <strong>(${randomQuote.category})</strong></p>`;
}

function addQuote() {
    const newQuoteTextElement = document.getElementById("newQuoteText");
    const newQuoteCategoryElement = document.getElementById("newQuoteCategory");
    
    if (!newQuoteTextElement || !newQuoteCategoryElement) return;
    
    const newQuoteText = newQuoteTextElement.value.trim();
    const newQuoteCategory = newQuoteCategoryElement.value.trim();
    
    if (newQuoteText === "" || newQuoteCategory === "") {
        alert("Please enter both a quote and a category.");
        return;
    }
    
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    newQuoteTextElement.value = "";
    newQuoteCategoryElement.value = "";
    showRandomQuote();
}

function createAddQuoteForm() {
    const formContainer = document.createElement("div");
    formContainer.innerHTML = `
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button onclick="addQuote()">Add Quote</button>
    `;
    document.body.appendChild(formContainer);
}

// ---------------------------- LocalStorage Logic -----------------------------

// Save quotes to local storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

// Load quotes from local storage
function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

// Call loadQuotes when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    loadQuotes();
    document.getElementById("newQuote").addEventListener("click", showRandomQuote);
});