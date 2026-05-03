let allIssues = [];
// 1. Authentication 
document.getElementById('login-form').addEventListener('click', () =>{
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if (user === 'admin' && pass === 'admin123') {
        document.getElementById('login-page').classList.add('hidden');
        document.getElementById('main-page').classList.remove('hidden');
        fetchIssues();
    } else {
        alert('Invalid Credentials!');
    }

});

// 2. Data Fetching 

async function fetchIssues(query = '') {
    const grid = document.getElementById('issues-grid');
    const loader = document.getElementById('loading-spinner');

    grid.innerHTML = '';
    loader.classList.remove('hidden');

    try {
        const url = query 
        ?`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`
        :`https://phi-lab-server.vercel.app/api/v1/lab/issues`;
    }
}