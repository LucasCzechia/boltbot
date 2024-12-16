// utils/dashboard-config.js
export const personalityModes = [
  {
    id: 'default',
    name: 'Default',
    icon: '😊',
    description: 'Playful, conversational chatbot'
  },
  {
    id: 'assistant',
    name: 'Assistant',
    icon: '🤖',
    description: 'Professional and helpful'
  },
  {
    id: 'fancy',
    name: 'Fancy',
    icon: '🎩',
    description: 'British gentleman type'
  }
];

export const features = [
  {
    id: 'browse_internet',
    name: 'Browse Internet',
    description: 'Retrieve current information and verify facts',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  },
  {
    id: 'generate_images',
    name: 'Generate AI Images',
    description: 'Create images based on detailed prompts using DALL-E 3',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    )
  },
  {
    id: 'currency_converter',
    name: 'Currency Converter',
    description: 'Convert between different currencies',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    id: 'weather',
    name: 'Weather Updates',
    description: 'Fetch weather information for specified locations',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 16.5a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
        <path d="M16 4v4" />
        <path d="M12 6l4-2 4 2" />
        <path d="M12 2h8v4" />
      </svg>
    )
  },
  {
    id: 'time',
    name: 'Get Current Time',
    description: 'Retrieve the current time for a given location',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    )
  },
  {
    id: 'reactions',
    name: 'React Emojis',
    description: 'Add reactions to messages with various emojis',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    )
  },
  {
    id: 'file_handling',
    name: 'Create Files',
    description: 'Generate text-based files with specified content',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="12" y1="18" x2="12" y2="12" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    )
  },
  {
    id: 'python_code',
    name: 'Run Python Code',
    description: 'Execute Python code snippets in a secure environment',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    )
  },
  {
    id: 'image_search',
    name: 'Google Images Search',
    description: 'Perform advanced searches for images on Google',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M8 11V8h7" />
        <path d="M8 8v7" />
      </svg>
    )
  },
  {
    id: 'image_recognition',
    name: 'Image Recognition',
    description: 'Analyze and describe images shared by users',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
        <path d="M8 21l4-4 4 4" />
      </svg>
    )
  }
];

export const logTypes = {
  info: {
    color: 'var(--info)',
    shadow: 'rgba(52, 152, 219, 0.1)'
  },
  success: {
    color: 'var(--success)',
    shadow: 'rgba(46, 204, 113, 0.1)'
  },
  warning: {
    color: 'var(--warning)',
    shadow: 'rgba(241, 196, 15, 0.1)'
  },
  error: {
    color: 'var(--danger)',
    shadow: 'rgba(231, 76, 60, 0.1)'
  }
};
