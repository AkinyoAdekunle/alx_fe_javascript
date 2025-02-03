const elements = {
    notification: document.getElementById('notification'),
    categoryFilter: document.getElementById('categoryFilter'),
    quoteDisplay: document.getElementById('quoteDisplay'),
};

const newQuote = document.getElementById('newQuote');
let quotes = [];

// Predefined Quotes
quotes = [
    { text: "I'm selfish, impatient and a little insecure...", category: "Attitude" },
    { text: "Maybe one day music will just be music...", category: "Life" },
    { text: "Be who you are and say what you feel...", category: "Motivational" },
    { text: "You know you're in love when you can't fall asleep...", category: "Love" }
];

// Show a Random Quote
function showRandomQuote() {
    const filteredQuotes = elements.categoryFilter.value === 'all' 
        ? quotes 
        : quotes.filter(quote => quote.category === elements.categoryFilter.value);
    
    if (filteredQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
        elements.quoteDisplay.innerHTML = `
            <div class="quote">
                <p>"${filteredQuotes[randomIndex].text}"</p>
                <em>– ${filteredQuotes[randomIndex].category}</em>
            </div>
        `;
    }
}

// Add a New Quote
function addQuote(event) {
    event.preventDefault();
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    if (newQuoteText && newQuoteCategory) {
        quotes.push({ text: newQuoteText, category: newQuoteCategory });
        saveQuotes();
        showNotification("Quote added successfully!");
    } else {
        showNotification("Enter a quote & category");
    }
}

// Fetch Quotes from Server
async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverData = await response.json();
        
        const serverQuotes = serverData.map(post => ({
            text: post.title,
            category: 'Server'
        }));

        const conflicts = findConflicts(quotes, serverQuotes);
        if (conflicts.length > 0) {
            showNotification(`${conflicts.length} conflicts detected. Using server version.`);
            quotes = mergeQuotes(quotes, serverQuotes);
            saveQuotes();
            showRandomQuote();
        }
    } catch (error) {
        showNotification('Error syncing with server');
    }
}

// Sync Quotes Periodically
function syncQuotes() {
    fetchQuotesFromServer();
    saveQuotes();
}

// Find Conflicts Between Local and Server Quotes
function findConflicts(local, remote) {
    return local.filter(lq => remote.some(rq => rq.text === lq.text && rq.category !== lq.category));
}

// Merge Quotes with Conflict Resolution
function mergeQuotes(local, remote) {
    const localCopy = local.filter(lq => !remote.some(rq => rq.text === lq.text));
    return [...localCopy, ...remote];
}

// Save Quotes to Local Storage
function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
    sessionStorage.setItem('lastUpdated', new Date().toISOString());
}

// Load Quotes from Local Storage
function initializeQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    quotes = storedQuotes ? JSON.parse(storedQuotes) : quotes;
    elements.categoryFilter.value = localStorage.getItem('lastCategory') || 'all';
}

// Populate Category Filter Dropdown
function populateCategories() {
    const categories = ['all', ...new Set(quotes.map(quote => quote.category))];
    elements.categoryFilter.innerHTML = categories.map(category => `<option value="${category}">${category}</option>`).join('');
}

// Start Periodic Syncing
function startServerSync() {
    setInterval(syncQuotes, 30000); // Sync every 30 seconds
}

// Show Notifications
function showNotification(message, duration = 3000) {
    elements.notification.textContent = message;
    setTimeout(() => elements.notification.textContent = '', duration);
}

// Initialize on Page Load
document.addEventListener('DOMContentLoaded', () => {
    initializeQuotes();
    populateCategories();
    showRandomQuote();
    startServerSync();
});

// Event Listeners
newQuote.addEventListener("click", showRandomQuote);
elements.categoryFilter.addEventListener('change', showRandomQuote);