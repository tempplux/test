# Minimal Task Management Web App

A clean, minimalistic, and user-friendly task management web application built with vanilla HTML, CSS, and JavaScript. Features a responsive design with dark mode support and comprehensive task management functionality.

## 🚀 Features

### Core Functionality
- ✅ **Add Tasks** - Simple interface to create tasks with title, description, and due date
- ✏️ **Edit Tasks** - Easily update task details with inline editing
- 🗑️ **Delete Tasks** - Remove tasks with confirmation prompt
- ✓ **Toggle Completion** - Mark tasks as complete/incomplete
- 🏷️ **Categories/Tags** - Organize tasks with predefined categories
- ⏰ **Due Date Reminders** - Visual cues for overdue and upcoming tasks
- 🔍 **Search & Filter** - Filter by status, category, or search keywords
- 📱 **Responsive Design** - Fully usable on desktop, tablet, and mobile
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 💾 **Local Storage** - Automatic saving and persistence

### Advanced Features
- ⌨️ **Keyboard Navigation** - Shortcuts for power users
- 📊 **Task Statistics** - Real-time counters for task status
- 🎨 **Clean UI** - Minimal, distraction-free interface
- 🔔 **Notifications** - Success/error feedback for actions
- 📤 **Export/Import** - Backup and restore functionality (via developer console)

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3 (Custom CSS with CSS Variables), Vanilla JavaScript
- **Storage**: LocalStorage API
- **Fonts**: Inter (Google Fonts)
- **Icons**: Unicode Emoji
- **Architecture**: ES6+ Classes, Modular Design

## 📁 Project Structure

```
task-manager/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── style.css       # Complete styling with CSS variables
│   └── js/
│       └── app.js          # Task management logic
└── README.md               # This file
```

## 🚀 Getting Started

1. **Clone or Download** the project files
2. **Open** `index.html` in a modern web browser
3. **Start managing** your tasks immediately!

No build process, dependencies, or server required - it's a pure client-side application.

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + N` - Focus on new task input
- `Ctrl/Cmd + F` - Focus on search input  
- `Ctrl/Cmd + D` - Toggle dark/light theme
- `Escape` - Close modal/dialog

## 🎨 Design Philosophy

### Minimalism
- Clean, uncluttered interface
- Soft color palette with high contrast text
- Minimal buttons and visual elements
- Focus on content over decoration

### Usability
- Intuitive navigation and interactions
- Clear visual hierarchy
- Accessible design patterns
- Mobile-first responsive design

### Performance
- Lightweight vanilla JavaScript (no frameworks)
- Efficient DOM manipulation
- Local storage for instant loading
- Smooth animations and transitions

## 📱 Responsive Breakpoints

- **Desktop**: 768px and above
- **Tablet**: 480px - 768px  
- **Mobile**: Below 480px

The app uses CSS Grid and Flexbox for flexible, responsive layouts that work seamlessly across all device sizes.

## 🌓 Theme System

### Light Theme (Default)
- White/light gray backgrounds
- Dark text for high contrast
- Blue accent color
- Subtle shadows and borders

### Dark Theme
- Dark blue/slate backgrounds  
- Light text for comfortable reading
- Adjusted accent colors for dark mode
- Consistent visual hierarchy

Theme preference is saved to localStorage and persists across sessions.

## 💾 Data Storage

### Local Storage Schema
```javascript
{
  "taskManager_tasks": [
    {
      "id": "1634567890123",
      "title": "Task title",
      "description": "Optional description",
      "dueDate": "2024-12-31",
      "category": "work",
      "completed": false,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T11:00:00.000Z"
    }
  ],
  "taskManager_theme": "dark"
}
```

## 🔧 Advanced Usage

### Developer Console Commands

Open browser developer console and use these commands:

```javascript
// Export all tasks to JSON file
taskManager.exportTasks();

// Clear all tasks (with confirmation)
taskManager.clearAllTasks();

// Access task data directly
console.log(taskManager.tasks);

// Programmatically add a task
taskManager.tasks.push({
  id: Date.now().toString(),
  title: "New task",
  description: "Added via console",
  completed: false,
  createdAt: new Date().toISOString()
});
taskManager.saveTasks();
taskManager.renderTasks();
```

## 🎯 Task Categories

Predefined categories include:
- **Work** - Professional tasks and projects
- **Personal** - Personal errands and activities  
- **Shopping** - Shopping lists and purchases
- **Health** - Health-related activities and appointments
- **Learning** - Educational and skill development tasks

Categories can be easily modified in the HTML select options.

## 📊 Visual Indicators

### Task Status
- ✅ **Completed** - Grayed out with strikethrough
- ⏰ **Due Today** - "Due today" label
- 🔶 **Due Soon** - Orange "Due tomorrow" label  
- 🔴 **Overdue** - Red border and "X days overdue" label

### Statistics
Real-time counters display:
- Total task count
- Pending tasks
- Completed tasks

## 🔍 Search and Filtering

### Search Functionality
- Searches task titles and descriptions
- Case-insensitive matching
- Real-time filtering as you type

### Filter Options
- **Status**: All, Pending, Completed, Overdue
- **Category**: All categories, or specific category
- **Combined**: Search + filters work together

## 🌟 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+  
- ✅ Safari 12+
- ✅ Edge 79+

Uses modern JavaScript features (ES6+) and CSS Grid/Flexbox.

## 🚀 Future Enhancements

Potential improvements for future versions:
- Drag and drop task reordering
- Task priorities and urgency levels
- Recurring tasks and templates
- Multiple lists/projects
- Collaboration features
- Cloud sync capabilities
- Progressive Web App (PWA) support

## 📝 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).

## 🤝 Contributing

Feel free to fork, modify, and enhance this project! Some areas for contribution:
- Additional themes and customization
- New task categories or fields
- Accessibility improvements  
- Performance optimizations
- Mobile app versions

---

**Built with ❤️ for productivity and simplicity**