// SME Data Insights & HR Assistant - Main JavaScript
// Interactive functionality for data visualization and HR tools

// Global variables
let currentChart = null;
let sampleData = null;
let candidates = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeScrollAnimations();
    initializeDemoData();
    initializeMobileMenu();
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Particle background animation using p5.js
function initializeParticles() {
    new p5(function(p) {
        let particles = [];
        const numParticles = 50;
        
        p.setup = function() {
            const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.parent('particles-canvas');
            
            // Create particles
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(2, 6),
                    opacity: p.random(0.3, 0.8)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(255, 255, 255, particle.opacity * 255);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
                
                // Draw connections
                particles.forEach(other => {
                    const distance = p.dist(particle.x, particle.y, other.x, other.y);
                    if (distance < 100) {
                        p.stroke(255, 255, 255, (1 - distance / 100) * 50);
                        p.strokeWeight(0.5);
                        p.line(particle.x, particle.y, other.x, other.y);
                    }
                });
            });
        };
        
        p.windowResized = function() {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    });
}



// Initialize scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Initialize demo data
function initializeDemoData() {
    // Sample business data for visualization
    sampleData = {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        revenue: [45000, 52000, 48000, 61000, 55000, 67000, 72000, 69000, 75000, 78000, 82000, 85000],
        expenses: [35000, 42000, 38000, 45000, 41000, 48000, 52000, 49000, 53000, 55000, 58000, 60000],
        customers: [120, 135, 128, 155, 142, 168, 175, 162, 185, 192, 205, 218],
        departments: ['Sales', 'Marketing', 'Development', 'Support', 'HR'],
        departmentBudget: [35000, 25000, 45000, 20000, 15000]
    };
    
    // Sample candidates for HR demo
    candidates = [
        {
            name: 'Alex Johnson',
            role: 'Senior Developer',
            experience: '5 years',
            skills: ['JavaScript', 'React', 'Node.js', 'Python'],
            matchScore: 0,
            avatar: '👨‍💻'
        },
        {
            name: 'Maria Garcia',
            role: 'Full Stack Developer',
            experience: '4 years',
            skills: ['JavaScript', 'React', 'MongoDB', 'Express'],
            matchScore: 0,
            avatar: '👩‍💻'
        },
        {
            name: 'David Kim',
            role: 'Frontend Developer',
            experience: '3 years',
            skills: ['JavaScript', 'Vue.js', 'CSS', 'HTML'],
            matchScore: 0,
            avatar: '👨‍💻'
        },
        {
            name: 'Sarah Williams',
            role: 'Backend Developer',
            experience: '6 years',
            skills: ['Node.js', 'Python', 'PostgreSQL', 'Docker'],
            matchScore: 0,
            avatar: '👩‍💻'
        },
        {
            name: 'James Chen',
            role: 'DevOps Engineer',
            experience: '4 years',
            skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
            matchScore: 0,
            avatar: '👨‍💻'
        }
    ];
    
    // Initialize chart with line chart
    setTimeout(() => {
        createChart('line');
        displayCandidates();
    }, 1000);
}

// Chart creation and management
function createChart(type) {
    const chartDom = document.getElementById('main-chart');
    if (currentChart) {
        currentChart.dispose();
    }
    currentChart = echarts.init(chartDom);
    
    let option = {};
    
    switch(type) {
        case 'line':
            option = {
                title: {
                    text: 'Monthly Revenue & Expenses',
                    textStyle: { color: '#2d3748', fontSize: 18, fontWeight: 'bold' }
                },
                tooltip: { trigger: 'axis' },
                legend: {
                    data: ['Revenue', 'Expenses'],
                    textStyle: { color: '#4a5568' }
                },
                xAxis: {
                    type: 'category',
                    data: sampleData.months,
                    axisLine: { lineStyle: { color: '#cbd5e0' } },
                    axisLabel: { color: '#4a5568' }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { lineStyle: { color: '#cbd5e0' } },
                    axisLabel: { color: '#4a5568' },
                    splitLine: { lineStyle: { color: '#e2e8f0' } }
                },
                series: [
                    {
                        name: 'Revenue',
                        type: 'line',
                        data: sampleData.revenue,
                        smooth: true,
                        lineStyle: { color: '#1e3a5f', width: 3 },
                        itemStyle: { color: '#1e3a5f' },
                        areaStyle: { color: 'rgba(30, 58, 95, 0.1)' }
                    },
                    {
                        name: 'Expenses',
                        type: 'line',
                        data: sampleData.expenses,
                        smooth: true,
                        lineStyle: { color: '#c17b5a', width: 3 },
                        itemStyle: { color: '#c17b5a' },
                        areaStyle: { color: 'rgba(193, 123, 90, 0.1)' }
                    }
                ]
            };
            break;
            
        case 'bar':
            option = {
                title: {
                    text: 'Department Budget Allocation',
                    textStyle: { color: '#2d3748', fontSize: 18, fontWeight: 'bold' }
                },
                tooltip: { trigger: 'axis' },
                xAxis: {
                    type: 'category',
                    data: sampleData.departments,
                    axisLine: { lineStyle: { color: '#cbd5e0' } },
                    axisLabel: { color: '#4a5568' }
                },
                yAxis: {
                    type: 'value',
                    axisLine: { lineStyle: { color: '#cbd5e0' } },
                    axisLabel: { color: '#4a5568' },
                    splitLine: { lineStyle: { color: '#e2e8f0' } }
                },
                series: [{
                    type: 'bar',
                    data: sampleData.departmentBudget,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: '#7a9b8e' },
                            { offset: 1, color: '#8fb3a6' }
                        ])
                    },
                    barWidth: '60%'
                }]
            };
            break;
            
        case 'pie':
            option = {
                title: {
                    text: 'Customer Growth Distribution',
                    textStyle: { color: '#2d3748', fontSize: 18, fontWeight: 'bold' },
                    left: 'center'
                },
                tooltip: { trigger: 'item' },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    textStyle: { color: '#4a5568' }
                },
                series: [{
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: 35, name: 'New Customers', itemStyle: { color: '#1e3a5f' } },
                        { value: 25, name: 'Returning Customers', itemStyle: { color: '#c17b5a' } },
                        { value: 20, name: 'Referrals', itemStyle: { color: '#7a9b8e' } },
                        { value: 20, name: 'Organic Growth', itemStyle: { color: '#8fb3a6' } }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            };
            break;
    }
    
    currentChart.setOption(option);
    
    // Add resize listener
    window.addEventListener('resize', () => {
        if (currentChart) {
            currentChart.resize();
        }
    });
}

// Chart type switching
function changeChart(type) {
    createChart(type);
    
    // Animate chart change
    anime({
        targets: '#main-chart',
        scale: [0.9, 1],
        opacity: [0.7, 1],
        duration: 600,
        easing: 'easeOutQuart'
    });
}

// Load sample data for demonstration
function loadSampleData() {
    const uploadZone = document.getElementById('data-upload');
    
    // Animate upload zone
    anime({
        targets: uploadZone,
        backgroundColor: ['rgba(193, 123, 90, 0.1)', 'rgba(122, 155, 142, 0.2)', 'rgba(193, 123, 90, 0.1)'],
        duration: 1500,
        easing: 'easeInOutQuad'
    });
    
    // Show success message
    setTimeout(() => {
        uploadZone.innerHTML = `
            <div class="text-4xl mb-4">✅</div>
            <h4 class="text-white text-lg font-semibold mb-2">Sample Data Loaded!</h4>
            <p class="text-gray-300">Revenue, expenses, and customer data from TechStart Solutions</p>
            <button class="btn-primary mt-4" onclick="initializeDemoData()">Load Different Dataset</button>
        `;
    }, 1000);
    
    // Refresh chart
    createChart('line');
}

// HR Candidate Management
function displayCandidates() {
    const candidateList = document.getElementById('candidate-list');
    if (!candidateList) return;
    
    candidateList.innerHTML = '';
    
    candidates.forEach((candidate, index) => {
        const candidateCard = document.createElement('div');
        candidateCard.className = 'candidate-card';
        candidateCard.innerHTML = `
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <div class="text-2xl mr-3">${candidate.avatar}</div>
                    <div>
                        <h5 class="font-semibold text-gray-800">${candidate.name}</h5>
                        <p class="text-sm text-gray-600">${candidate.role} • ${candidate.experience}</p>
                        <div class="flex flex-wrap gap-1 mt-2">
                            ${candidate.skills.slice(0, 3).map(skill => 
                                `<span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">${skill}</span>`
                            ).join('')}
                            ${candidate.skills.length > 3 ? `<span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">+${candidate.skills.length - 3} more</span>` : ''}
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-2xl font-bold ${candidate.matchScore > 70 ? 'text-green-600' : candidate.matchScore > 40 ? 'text-yellow-600' : 'text-red-600'}">${candidate.matchScore}%</div>
                    <div class="progress-bar mt-2" style="width: 60px;">
                        <div class="progress-fill" style="width: ${candidate.matchScore}%;"></div>
                    </div>
                </div>
            </div>
        `;
        candidateList.appendChild(candidateCard);
    });
}

// Screen candidates based on job keywords
function screenCandidates() {
    const keywordsInput = document.getElementById('job-keywords');
    const keywords = keywordsInput.value.toLowerCase().split(',').map(k => k.trim()).filter(k => k);
    
    if (keywords.length === 0) {
        alert('Please enter some job keywords first!');
        return;
    }
    
    // Calculate match scores
    candidates.forEach(candidate => {
        const matchingSkills = candidate.skills.filter(skill => 
            keywords.some(keyword => skill.toLowerCase().includes(keyword.toLowerCase()))
        );
        candidate.matchScore = Math.round((matchingSkills.length / keywords.length) * 100);
    });
    
    // Sort by match score
    candidates.sort((a, b) => b.matchScore - a.matchScore);
    
    // Animate the update
    anime({
        targets: '.candidate-card',
        translateX: [-20, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        duration: 600,
        easing: 'easeOutQuart',
        complete: () => {
            displayCandidates();
        }
    });
    
    // Show success message
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Candidates Screened! ✓';
    button.style.background = 'linear-gradient(135deg, #7a9b8e 0%, #8fb3a6 100%)';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

// Utility functions for enhanced interactivity
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-24 right-6 z-50 p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        translateX: [300, 0],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutQuart'
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            translateX: [0, 300],
            opacity: [1, 0],
            duration: 500,
            easing: 'easeInQuart',
            complete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 3000);
}

// Initialize mobile menu
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking on a link
        mobileMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Button hover effects
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.05,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
        
        button.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                duration: 200,
                easing: 'easeOutQuart'
            });
        });
    });
    
    // Card hover effects
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                translateY: -8,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                translateY: 0,
                duration: 300,
                easing: 'easeOutQuart'
            });
        });
    });
});

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized resize handler
const optimizedResize = debounce(() => {
    if (currentChart) {
        currentChart.resize();
    }
}, 250);

window.addEventListener('resize', optimizedResize);