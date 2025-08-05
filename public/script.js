// JavaScript for VidyaSphere Website

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    const navMenu = document.getElementById('nav-menu');
    const authButtons = document.querySelector('.auth-buttons');
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (authButtons) authButtons.classList.remove('active');
    }
    
    window.scrollTo(0, 0);
}

// Filter batches by category
function filterBatches(category) {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const batchCards = document.querySelectorAll('.batch-card');
    
    // Update active filter button
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Show/hide batch cards
    batchCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter notes by subject
function filterNotes(subject) {
    const noteCards = document.querySelectorAll('.note-card');
    
    noteCards.forEach(card => {
        if (subject === 'all' || card.dataset.subject === subject) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Select donation amount
function selectAmount(amount) {
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmount = document.getElementById('customAmount');
    
    // Remove active class from all buttons
    amountBtns.forEach(btn => btn.classList.remove('selected'));
    
    // Add active class to selected button
    event.target.classList.add('selected');
    
    // Clear custom amount if preset amount is selected
    if (customAmount) {
        customAmount.value = '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            if (navMenu) navMenu.classList.toggle('active');
            if (authButtons) authButtons.classList.toggle('active');
        });
    }
    
    // Add form submission handlers
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submitted successfully!');
        });
    });
    
    // Add button click handlers
    const enrollBtns = document.querySelectorAll('.batch-card .btn-primary');
    enrollBtns.forEach(btn => {
        if (btn.textContent === 'Enroll Now') {
            btn.addEventListener('click', function() {
                alert('Enrollment process initiated! Please contact us for more details.');
            });
        }
    });
    
    const downloadBtns = document.querySelectorAll('.note-actions .btn-primary');
    downloadBtns.forEach(btn => {
        if (btn.textContent === 'Download PDF') {
            btn.addEventListener('click', function() {
                alert('PDF download started!');
            });
        }
    });
    
    const viewBtns = document.querySelectorAll('.note-actions .btn-secondary');
    viewBtns.forEach(btn => {
        if (btn.textContent === 'View Online') {
            btn.addEventListener('click', function() {
                alert('Opening online viewer...');
            });
        }
    });
    
    const pyqBtns = document.querySelectorAll('.pyq-category .btn-primary');
    pyqBtns.forEach(btn => {
        if (btn.textContent === 'Access Papers') {
            btn.addEventListener('click', function() {
                alert('Previous year papers access granted!');
            });
        }
    });
    
    const donateBtn = document.querySelector('.donate-btn');
    if (donateBtn) {
        donateBtn.addEventListener('click', function() {
            alert('Thank you for your generous donation! Redirecting to payment gateway...');
        });
    }
    
    showPage('home');
});