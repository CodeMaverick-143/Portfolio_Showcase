// DOM Elements
const mainContainer = document.getElementById('main-container');
const searchBar = document.getElementById('search-bar');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');

// Pagination Variables
let currentPage = 1; // Start with the first page
const itemsPerPage = 10; // Show 10 items per page
let allUsers = []; // This will hold the fetched user data

// Fetch Users from JSON
const fetchUsers = async () => {
    try {
        const response = await fetch('students_full.json'); // Adjust the path as necessary
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        allUsers = await response.json();
        renderUsers(allUsers, currentPage); // Render the fetched users
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};

// Render Users for a Specific Page
const renderUsers = (users, page = 1) => {
    mainContainer.innerHTML = ''; // Clear previous users
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = users.slice(startIndex, endIndex); // Get only the users for the current page

    paginatedUsers.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.innerHTML = `
            <img src="${user.img}" alt="${user.name}">
            <div class="name">${user.name}</div>
            <div class="github">GitHub: 
                <a href="${user.github}" target="_blank">${user.github_username}</a>
            </div>
            <div class="portfolio">Portfolio: 
                <a href="${user.portfolio}" target="_blank">View Portfolio</a>
            </div>
        `;
        mainContainer.appendChild(userCard);
    });

    updatePaginationControls(users.length, page);
};

// Update Pagination Controls
const updatePaginationControls = (totalItems, page) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
    pageInfo.textContent = `Page ${page} of ${totalPages}`;
};

// Change Page
const changePage = (direction) => {
    const totalPages = Math.ceil(allUsers.length / itemsPerPage);
    currentPage = Math.min(Math.max(currentPage + direction, 1), totalPages);
    renderUsers(allUsers, currentPage);
};

// Search Functionality
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = allUsers.filter(user => user.name.toLowerCase().includes(searchTerm));
    currentPage = 1; // Reset to the first page
    renderUsers(filteredUsers, currentPage);
});

// Pagination Button Event Listeners
prevBtn.addEventListener('click', () => changePage(-1));
nextBtn.addEventListener('click', () => changePage(1));

// Initial Setup
fetchUsers(); // Fetch users on initial load
