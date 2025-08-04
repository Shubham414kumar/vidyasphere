// JavaScript functionality
let subjects = [];

function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Close mobile menu
    document.getElementById('mobile-menu').classList.add('hidden');
    
    // Load page specific content
    if (pageId === 'batches') {
        loadBatches();
    }
}

function loadBatches() {
    const batchesContainer = document.querySelector('#batches .grid');
    const batches = [
        {
            name: "BEU Semester 1",
            description: "Complete syllabus coverage for first semester engineering",
            price: "₹999",
            duration: "3 months",
            subjects: ["Engineering Mathematics", "Physics", "Chemistry", "Programming"]
        },
        {
            name: "BEU Semester 2", 
            description: "Advanced engineering concepts for second semester",
            price: "₹1199",
            duration: "3 months",
            subjects: ["Advanced Math", "Engineering Graphics", "Electronics", "Mechanics"]
        },
        {
            name: "Class 12th Physics",
            description: "Complete Physics preparation for board exams",
            price: "₹799",
            duration: "6 months",
            subjects: ["Mechanics", "Thermodynamics", "Electromagnetism", "Modern Physics"]
        },
        {
            name: "Class 12th Chemistry",
            description: "Comprehensive chemistry course for boards",
            price: "₹799",
            duration: "6 months",
            subjects: ["Organic", "Inorganic", "Physical Chemistry", "Practicals"]
        },
        {
            name: "Class 12th Math",
            description: "Advanced mathematics for class 12",
            price: "₹899",
            duration: "6 months",
            subjects: ["Calculus", "Algebra", "Coordinate Geometry", "Statistics"]
        },
        {
            name: "Class 10th Math",
            description: "Mathematics mastery for class 10 board exam",
            price: "₹699",
            duration: "4 months",
            subjects: ["Algebra", "Geometry", "Trigonometry", "Statistics"]
        },
        {
            name: "Class 10th Science",
            description: "Complete science preparation for board exams",
            price: "₹699",
            duration: "4 months",
            subjects: ["Physics", "Chemistry", "Biology", "Practicals"]
        },
        {
            name: "JEE Preparation",
            description: "Intensive JEE Main and Advanced preparation",
            price: "₹1999",
            duration: "12 months",
            subjects: ["Physics", "Chemistry", "Mathematics", "Mock Tests"]
        },
        {
            name: "NEET Preparation",
            description: "Complete NEET preparation course",
            price: "₹1899",
            duration: "12 months",
            subjects: ["Physics", "Chemistry", "Biology", "Mock Tests"]
        }
    ];
    
    batchesContainer.innerHTML = batches.map(batch => `
        <div class="bg-white border rounded-lg p-6 card-shadow">
            <h3 class="text-xl font-semibold mb-3">${batch.name}</h3>
            <p class="text-gray-600 mb-4">${batch.description}</p>
            <div class="mb-4">
                <p class="text-sm text-gray-500 mb-2">Subjects covered:</p>
                <div class="flex flex-wrap gap-1">
                    ${batch.subjects.map(subject => `
                        <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">${subject}</span>
                    `).join('')}
                </div>
            </div>
            <div class="flex justify-between items-center mb-4">
                <span class="text-2xl font-bold text-blue-600">${batch.price}</span>
                <span class="text-sm text-gray-500">${batch.duration}</span>
            </div>
            <button class="btn-primary w-full">Enroll Now</button>
        </div>
    `).join('');
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
});

// Attendance functionality
function addSubject() {
    const subjectInput = document.getElementById('subject-name');
    const subjectName = subjectInput.value.trim();
    
    if (subjectName) {
        const subject = {
            name: subjectName,
            totalClasses: 0,
            attendedClasses: 0
        };
        
        subjects.push(subject);
        subjectInput.value = '';
        renderSubjects();
    }
}

function markAttendance(index, attended) {
    subjects[index].totalClasses++;
    if (attended) {
        subjects[index].attendedClasses++;
    }
    renderSubjects();
}

function removeSubject(index) {
    subjects.splice(index, 1);
    renderSubjects();
}

function renderSubjects() {
    const subjectsList = document.getElementById('subjects-list');
    
    if (subjects.length === 0) {
        subjectsList.innerHTML = '<p class="text-gray-500 text-center">No subjects added yet.</p>';
        return;
    }
    
    subjectsList.innerHTML = subjects.map((subject, index) => {
        const percentage = subject.totalClasses > 0 ? 
            Math.round((subject.attendedClasses / subject.totalClasses) * 100) : 0;
        
        const percentageColor = percentage >= 75 ? 'text-green-600' : 
                               percentage >= 50 ? 'text-yellow-600' : 'text-red-600';
        
        return `
            <div class="bg-white rounded-lg p-6 card-shadow">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-xl font-semibold">${subject.name}</h3>
                    <button onclick="removeSubject(${index})" class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="grid grid-cols-3 gap-4 mb-4">
                    <div class="text-center">
                        <p class="text-sm text-gray-500">Total Classes</p>
                        <p class="text-2xl font-bold">${subject.totalClasses}</p>
                    </div>
                    <div class="text-center">
                        <p class="text-sm text-gray-500">Attended</p>
                        <p class="text-2xl font-bold text-green-600">${subject.attendedClasses}</p>
                    </div>
                    <div class="text-center">
                        <p class="text-sm text-gray-500">Percentage</p>
                        <p class="text-2xl font-bold ${percentageColor}">${percentage}%</p>
                    </div>
                </div>
                <div class="flex gap-2">
                    <button onclick="markAttendance(${index}, true)" 
                            class="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                        Mark Present
                    </button>
                    <button onclick="markAttendance(${index}, false)" 
                            class="flex-1 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                        Mark Absent
                    </button>
                </div>
            </div>
        `;
    }).join('');
}