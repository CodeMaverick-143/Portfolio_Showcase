// DOM Elements
const mainContainer = document.getElementById('main-container');
const searchBar = document.getElementById('search-bar');
// Pagination Variables
let currentPage = 1; // Start with the first page
const itemsPerPage = 10; // Show 10 items per page

// Generate Mock Users
const generateUsers = (count) => {
    const users = [];
    for (let i = 1; i <= count; i++) {
        users.push({
            id: i,
            name: `User ${i}`,
            github: `https://github.com/User${i}`,
            portfolio: `https://portfolio.com/User${i}`,
            img: `https://via.placeholder.com/100?text=User+${i}`, // Placeholder image
        });
    }
    return users;
};

const allUsers = generateUsers(320);       // Fixed 320 users

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
            <div class="github">GitHub: <a href="${user.github}" target="_blank">${user.github}</a></div>
            <div class="portfolio">Portfolio: <a href="${user.portfolio}" target="_blank">View Portfolio</a></div>
        `;
        mainContainer.appendChild(userCard);
    });

    // Update page navigation
    updatePaginationControls(users.length, page);
};

// Create Pagination Controls
const createPaginationControls = () => {
    const paginationControls = document.createElement('div');
    paginationControls.id = 'pagination-controls';
    paginationControls.innerHTML = `
        <button id="prev-btn" disabled>Previous</button>
        <span id="page-info"></span>
        <button id="next-btn">Next</button>
    `;
    document.body.appendChild(paginationControls);

    // Add Event Listeners for Buttons
    document.getElementById('prev-btn').addEventListener('click', () => changePage(-1));
    document.getElementById('next-btn').addEventListener('click', () => changePage(1));
};

// Update Pagination Controls
const updatePaginationControls = (totalItems, page) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    document.getElementById('prev-btn').disabled = page === 1;
    document.getElementById('next-btn').disabled = page === totalPages;
    document.getElementById('page-info').textContent = `Page ${page} of ${totalPages}`;
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

// Initial Setup
createPaginationControls();
renderUsers(allUsers, currentPage);
