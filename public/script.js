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
    
    showPage('home');
});