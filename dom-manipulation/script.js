const quoteDisplay = document.getElementById('quoteDisplay');
const newQuote = document.getElementById('newQuote');
const newQuoteText = document.getElementById('newQuoteText');

const quotes = [
    {
        text:"I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
        category:"Attitude"
    },
    {
        text:"Maybe one day music will just be music, and there won't be these categories; it'll just be different shades of music.",
        category:"Life"
    },
    {
        text:"Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind.",
        category:"Motivational"
    },
    {
        text:"You know you're in love when you can't fall asleep because reality is finally better than your dreams",
        category:"love"
    }
];

newQuote.addEventListener("click",showRandomQuote);

function showRandomQuote(){
    const randomQuotes = Math.floor((Math.random())*quotes.length);
    quoteDisplay.innerHTML = `${quotes[randomQuotes].text}<br><br><strong>${quotes[randomQuotes].category}</strong>`;

    const createAddQuoteForm = document.createElement('form');
    createAddQuoteForm.innerHTML = `
    <div>
        <input id="newQuoteText" type="text" placeholder="Enter a new quote" />
        <input id="newQuoteCategory" type="text" placeholder="Enter quote category" />
        <button type="button" onclick="addQuote(event)">Add Quote</button>
    </div>
    `;
    quoteDisplay.appendChild(createAddQuoteForm);
}

function addQuote(event){
    event.preventDefault();
    const newQuoteText = document.getElementById('newQuoteText').value.trim();
    const newQuoteCategory = document.getElementById('newQuoteCategory').value.trim();

    const newQuoteValue= { 
        text:newQuoteText,
        category:newQuoteCategory
    };

    if(newQuoteText !== "" && newQuoteCategory !== ""){
        quotes.push(newQuoteValue);
        saveQuotes();
    }
    else{
        alert("Enter a quote & category");
    }

    document.getElementById('newQuoteText').value = "";
    document.getElementById('newQuoteCategory').value = "";
};

function syncQuotes() {
    fetchQuotesFromServer();
    saveQuotes();
}

function startServerSync() {
    setInterval(syncQuotes, 30000);
}

async function fetchQuotesFromServer() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const serverData = await response.json();
        const serverQuotes = serverData.map(post => ({ text: post.title, category: 'Server' }));
        
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

function findConflicts(local, remote) {
    return local.filter(lq => 
        remote.some(rq => rq.text === lq.text && rq.category !== lq.category)
    );
}

function mergeQuotes(local, remote) {
    const localCopy = local.filter(lq => 
        !remote.some(rq => rq.text === lq.text)
    );
    return [...localCopy, ...remote];
}

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
    sessionStorage.setItem('lastUpdated', new Date().toISOString());
}

document.addEventListener('DOMContentLoaded', () => {
    initializeQuotes();
    populateCategories();
    showRandomQuote();
    startServerSync();
});