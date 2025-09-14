class TaskManager {
    constructor() {
        this.tasks = [];
        this.currentEditingId = null;
        this.init();
    }

    init() {
        this.loadTasks();
        this.bindEvents();
        this.initTheme();
        this.renderTasks();
        this.updateStats();
    }

    // Local Storage Methods
    loadTasks() {
        const savedTasks = localStorage.getItem('taskManager_tasks');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        }
    }

    saveTasks() {
        localStorage.setItem('taskManager_tasks', JSON.stringify(this.tasks));
    }

    // Theme Management
    initTheme() {
        const savedTheme = localStorage.getItem('taskManager_theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('taskManager_theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // Event Binding
    bindEvents() {
        // Form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTask();
        });

        // Edit form submission
        document.getElementById('editTaskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveEditedTask();
        });

        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.filterTasks();
        });

        // Filter functionality
        document.getElementById('statusFilter').addEventListener('change', () => {
            this.filterTasks();
        });

        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.filterTasks();
        });

        // Modal events
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeEditModal();
        });

        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.closeEditModal();
        });

        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('editModal')) {
                this.closeEditModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    // Task CRUD Operations
    addTask() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const dueDate = document.getElementById('taskDueDate').value;
        const category = document.getElementById('taskCategory').value;

        if (!title) {
            this.showNotification('Please enter a task title', 'error');
            return;
        }

        const task = {
            id: Date.now().toString(),
            title,
            description,
            dueDate,
            category,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        this.clearForm();
        this.showNotification('Task added successfully!', 'success');
    }

    editTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        this.currentEditingId = id;
        
        // Populate edit form
        document.getElementById('editTaskTitle').value = task.title;
        document.getElementById('editTaskDescription').value = task.description || '';
        document.getElementById('editTaskDueDate').value = task.dueDate || '';
        document.getElementById('editTaskCategory').value = task.category || '';
        
        this.openEditModal();
    }

    saveEditedTask() {
        const taskIndex = this.tasks.findIndex(t => t.id === this.currentEditingId);
        if (taskIndex === -1) return;

        const title = document.getElementById('editTaskTitle').value.trim();
        if (!title) {
            this.showNotification('Please enter a task title', 'error');
            return;
        }

        this.tasks[taskIndex] = {
            ...this.tasks[taskIndex],
            title,
            description: document.getElementById('editTaskDescription').value.trim(),
            dueDate: document.getElementById('editTaskDueDate').value,
            category: document.getElementById('editTaskCategory').value,
            updatedAt: new Date().toISOString()
        };

        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        this.closeEditModal();
        this.showNotification('Task updated successfully!', 'success');
    }

    deleteTask(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showNotification('Task deleted successfully!', 'success');
        }
    }

    toggleTaskComplete(id) {
        const taskIndex = this.tasks.findIndex(t => t.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
            this.tasks[taskIndex].completedAt = this.tasks[taskIndex].completed 
                ? new Date().toISOString() 
                : null;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }

    // Modal Management
    openEditModal() {
        const modal = document.getElementById('editModal');
        modal.classList.add('active');
        document.getElementById('editTaskTitle').focus();
        document.body.style.overflow = 'hidden';
    }

    closeEditModal() {
        const modal = document.getElementById('editModal');
        modal.classList.remove('active');
        this.currentEditingId = null;
        document.body.style.overflow = '';
    }

    // Rendering Methods
    renderTasks() {
        const taskList = document.getElementById('taskList');
        const emptyState = document.getElementById('emptyState');
        
        const filteredTasks = this.getFilteredTasks();
        
        if (filteredTasks.length === 0) {
            emptyState.style.display = 'block';
            taskList.innerHTML = '';
            return;
        }

        emptyState.style.display = 'none';
        taskList.innerHTML = filteredTasks.map(task => this.createTaskHTML(task)).join('');
        
        // Bind task-specific events
        this.bindTaskEvents();
    }

    createTaskHTML(task) {
        const isOverdue = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();
        const isDueSoon = task.dueDate && !task.completed && 
            new Date(task.dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000);
        
        const dueDateClass = isOverdue ? 'overdue' : (isDueSoon ? 'due-soon' : '');
        const taskClass = `task-item ${task.completed ? 'completed' : ''} ${isOverdue ? 'overdue' : ''}`;
        
        const dueDateText = task.dueDate ? this.formatDueDate(task.dueDate) : '';
        const categoryHTML = task.category ? 
            `<span class="task-category">${this.capitalizeFirst(task.category)}</span>` : '';

        return `
            <li class="${taskClass}" data-task-id="${task.id}">
                <input 
                    type="checkbox" 
                    class="task-checkbox" 
                    ${task.completed ? 'checked' : ''}
                    data-task-id="${task.id}"
                >
                
                <div class="task-content">
                    <div class="task-header">
                        <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                    </div>
                    
                    ${task.description ? 
                        `<p class="task-description">${this.escapeHtml(task.description)}</p>` 
                        : ''
                    }
                    
                    <div class="task-meta">
                        ${categoryHTML}
                        ${dueDateText ? 
                            `<span class="task-due-date ${dueDateClass}">${dueDateText}</span>` 
                            : ''
                        }
                    </div>
                </div>
                
                <div class="task-actions">
                    <button 
                        class="task-action-btn edit" 
                        data-task-id="${task.id}" 
                        title="Edit task"
                        aria-label="Edit task"
                    >
                        ✏️
                    </button>
                    <button 
                        class="task-action-btn delete" 
                        data-task-id="${task.id}" 
                        title="Delete task"
                        aria-label="Delete task"
                    >
                        🗑️
                    </button>
                </div>
            </li>
        `;
    }

    bindTaskEvents() {
        // Checkbox events
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleTaskComplete(e.target.dataset.taskId);
            });
        });

        // Edit button events
        document.querySelectorAll('.task-action-btn.edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.editTask(e.target.dataset.taskId);
            });
        });

        // Delete button events
        document.querySelectorAll('.task-action-btn.delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteTask(e.target.dataset.taskId);
            });
        });
    }

    // Filtering and Search
    getFilteredTasks() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        const statusFilter = document.getElementById('statusFilter').value;
        const categoryFilter = document.getElementById('categoryFilter').value;

        return this.tasks.filter(task => {
            // Search filter
            const matchesSearch = !searchTerm || 
                task.title.toLowerCase().includes(searchTerm) ||
                (task.description && task.description.toLowerCase().includes(searchTerm));

            // Status filter
            let matchesStatus = true;
            if (statusFilter === 'completed') {
                matchesStatus = task.completed;
            } else if (statusFilter === 'pending') {
                matchesStatus = !task.completed;
            } else if (statusFilter === 'overdue') {
                matchesStatus = task.dueDate && !task.completed && new Date(task.dueDate) < new Date();
            }

            // Category filter
            const matchesCategory = categoryFilter === 'all' || task.category === categoryFilter;

            return matchesSearch && matchesStatus && matchesCategory;
        });
    }

    filterTasks() {
        this.renderTasks();
    }

    // Statistics
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;

        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('pendingTasks').textContent = pending;
    }

    // Keyboard Navigation
    handleKeyboardNavigation(e) {
        // Escape key to close modal
        if (e.key === 'Escape' && document.getElementById('editModal').classList.contains('active')) {
            this.closeEditModal();
        }

        // Ctrl/Cmd + N for new task
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            document.getElementById('taskTitle').focus();
        }

        // Ctrl/Cmd + F for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }

        // Ctrl/Cmd + D for theme toggle
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            this.toggleTheme();
        }
    }

    // Utility Methods
    formatDueDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return 'Due today';
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return 'Due tomorrow';
        } else if (date < today) {
            const daysOverdue = Math.floor((today - date) / (1000 * 60 * 60 * 24));
            return `${daysOverdue} day${daysOverdue === 1 ? '' : 's'} overdue`;
        } else {
            const options = { month: 'short', day: 'numeric' };
            if (date.getFullYear() !== today.getFullYear()) {
                options.year = 'numeric';
            }
            return `Due ${date.toLocaleDateString('en-US', options)}`;
        }
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    clearForm() {
        document.getElementById('taskForm').reset();
        document.getElementById('taskTitle').focus();
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            background: var(--${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'accent-primary'});
            color: white;
            font-weight: 500;
            z-index: 1001;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: var(--shadow-lg);
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Public API Methods
    exportTasks() {
        const dataStr = JSON.stringify(this.tasks, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `tasks_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('Tasks exported successfully!', 'success');
    }

    importTasks(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedTasks = JSON.parse(e.target.result);
                if (Array.isArray(importedTasks)) {
                    this.tasks = [...this.tasks, ...importedTasks];
                    this.saveTasks();
                    this.renderTasks();
                    this.updateStats();
                    this.showNotification(`Imported ${importedTasks.length} tasks!`, 'success');
                } else {
                    throw new Error('Invalid format');
                }
            } catch (error) {
                this.showNotification('Failed to import tasks. Please check the file format.', 'error');
            }
        };
        reader.readAsText(file);
    }

    clearAllTasks() {
        if (confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
            this.tasks = [];
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
            this.showNotification('All tasks cleared!', 'success');
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.taskManager = new TaskManager();
    
    // Add keyboard shortcut hints
    console.log('🚀 Task Manager loaded!');
    console.log('Keyboard shortcuts:');
    console.log('  Ctrl/Cmd + N: New task');
    console.log('  Ctrl/Cmd + F: Search');
    console.log('  Ctrl/Cmd + D: Toggle theme');
    console.log('  Escape: Close modal');
});