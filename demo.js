// Demo script for Task Manager
// Run this in the browser console after the app loads to see sample data

const demoTasks = [
    {
        id: "demo1",
        title: "Complete project proposal",
        description: "Finalize the Q4 project proposal and submit to the team",
        dueDate: new Date().toISOString().split('T')[0], // Today
        category: "work",
        completed: false,
        createdAt: new Date().toISOString()
    },
    {
        id: "demo2", 
        title: "Buy groceries",
        description: "Milk, bread, eggs, and vegetables for the week",
        dueDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
        category: "shopping",
        completed: false,
        createdAt: new Date().toISOString()
    },
    {
        id: "demo3",
        title: "Morning workout",
        description: "30-minute cardio session and strength training",
        dueDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // Yesterday (overdue)
        category: "health", 
        completed: false,
        createdAt: new Date().toISOString()
    },
    {
        id: "demo4",
        title: "Read JavaScript book",
        description: "Continue reading 'You Don't Know JS' series",
        dueDate: "",
        category: "learning",
        completed: true,
        createdAt: new Date().toISOString()
    },
    {
        id: "demo5",
        title: "Plan weekend trip",
        description: "Research destinations and book accommodations",
        dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0], // Next week
        category: "personal",
        completed: false,
        createdAt: new Date().toISOString()
    }
];

// Function to load demo data
function loadDemoData() {
    if (typeof window.taskManager !== 'undefined') {
        window.taskManager.tasks = [...demoTasks];
        window.taskManager.saveTasks();
        window.taskManager.renderTasks();
        window.taskManager.updateStats();
        window.taskManager.showNotification('Demo data loaded! Try the features now.', 'success');
        console.log('✅ Demo data loaded successfully!');
        console.log('📝 Try these features:');
        console.log('  • Add new tasks using the form');
        console.log('  • Search for "workout" or "book"');
        console.log('  • Filter by category (work, shopping, etc.)');
        console.log('  • Toggle task completion');
        console.log('  • Edit tasks by clicking the edit button');
        console.log('  • Try dark mode toggle');
        console.log('  • Use keyboard shortcuts (Ctrl+N, Ctrl+F, Ctrl+D)');
    } else {
        console.error('❌ Task Manager not found. Make sure the app is loaded.');
    }
}

// Auto-load demo data if no tasks exist
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(() => {
            if (window.taskManager && window.taskManager.tasks.length === 0) {
                loadDemoData();
            }
        }, 1000);
    });
}

// Export for manual use
if (typeof window !== 'undefined') {
    window.loadDemoData = loadDemoData;
}