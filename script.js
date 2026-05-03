let allIssues = [];
// 1. Authentication 
document.getElementById('login-btn').addEventListener('click', () =>{
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
    const res = await fetch(url);
    const data = await res.json();
    allIssues = data.data; // Storing for local filtering 
    displayIssues(allIssues);

    }catch (error) {
        console.error('Fetch Error:', error);

    }finally {
        loader.classList.add('hidden');
    }

}

// 3. Display Cards

function displayIssues(issues) {
    const grid = document.getElementById('issues-grid');
    grid.innerHTML = issues.map(issues => `<div onclick="openModal('${issue.id}')" class="card bg-white shadow-md cursor-pointer hover:shadow-lg transition-shadow p-5 ${issue.status === 'open' ? 'card-open' : 'card-closed'}">
            <div class="flex justify-between items-start mb-2">
                <span class="badge badge-outline text-[10px] uppercase font-bold">${issue.label}</span>
                <span class="badge ${issue.priority === 'High' ? 'badge-error' : issue.priority === 'Medium' ? 'badge-warning' : 'badge-success'} badge-xs"></span>
            </div>
            <h2 class="font-bold text-sm mb-2 line-clamp-2">${issue.title}</h2>
            <p class="text-xs text-gray-500 mb-4 line-clamp-3">${issue.description}</p>
            <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center text-[10px] text-gray-400">
                <span>By ${issue.author}</span>
                <span>${new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
        </div>
    `).join('');
}

// 4. Filtering & Search 
function filterIssues(status, el){
    //Update Active Tab UI
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('tab-active'));
    el.classList.add('tab-active');
    if(status === 'all') {
        displayIssues(allIssues);

    }else {
        const filtered = allIssues.filter(item => item.status === status);
        displayIssues(filtered);
    }
}

document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    fetchIssues(query);
});

// 5. Modal Functionality
async function openModal(id) {
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const result = await res.json();
    const issue = result.data;

    document.getElementById('modal-title').innerText = issue.title;
    document.getElementById('modal-desc').innerText = issue.description;
    document.getElementById('modal-author').innerText = issue.author;
    document.getElementById('modal-priority').innerText = issue.priority;
    document.getElementById('modal-label').innerText = issue.label;
    document.getElementById('modal-date').innerText = new Date(issue.createdAt).toLocaleString();
    
    const badgeContainer = document.getElementById('modal-badge-container');
    badgeContainer.innerHTML = `<span class="badge ${issue.status === 'open' ? 'badge-success' : 'badge-secondary'} text-white">${issue.status}</span>`;

    issue_modal.showModal();
}