class AIAssistant {
    constructor() {
        this.apiKey = 'AIzaSyCbbioSTfpOTFSjtaaDkm3KuTczd3ZaK88';
        this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
        this.conversationHistory = [];
        this.isProcessing = false;
        
        this.initializeElements();
        this.attachEventListeners();
        this.setupAutoResize();
    }

    initializeElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.statusIndicator = document.getElementById('statusIndicator');
        this.statusText = document.getElementById('statusText');
        this.quickButtons = document.querySelectorAll('.quick-btn');
    }

    attachEventListeners() {
        // Send button click
        this.sendButton.addEventListener('click', () => this.sendMessage());
        
        // Enter key to send (Shift+Enter for new line)
        this.messageInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        // Quick action buttons
        this.quickButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const prompt = btn.dataset.prompt;
                this.messageInput.value = prompt;
                this.messageInput.focus();
            });
        });

        // Auto-focus on input
        this.messageInput.focus();
    }

    setupAutoResize() {
        this.messageInput.addEventListener('input', () => {
            this.messageInput.style.height = 'auto';
            this.messageInput.style.height = Math.min(this.messageInput.scrollHeight, 120) + 'px';
        });
    }

    async sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isProcessing) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';

        // Show typing indicator
        this.showTypingIndicator();
        this.setStatus('processing', 'Processing...');

        try {
            // Get AI response
            const response = await this.getAIResponse(message);
            this.addMessage(response, 'bot');
            this.setStatus('ready', 'Ready');
        } catch (error) {
            console.error('Error:', error);
            this.addMessage('Sorry, I encountered an error while processing your request. Please try again.', 'bot');
            this.setStatus('error', 'Error');
            setTimeout(() => this.setStatus('ready', 'Ready'), 3000);
        } finally {
            this.hideTypingIndicator();
            this.isProcessing = false;
            this.messageInput.focus();
        }
    }

    async getAIResponse(message) {
        this.isProcessing = true;

        // Add message to conversation history
        this.conversationHistory.push({
            role: 'user',
            parts: [{ text: message }]
        });

        try {
            // Use local server proxy to avoid CORS issues
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });

            if (!response.ok) {
                let errorMessage = `Server error: ${response.status}`;
                try {
                    const errorData = await response.json();
                    console.error('Server error:', errorData);
                    errorMessage = errorData.error || errorMessage;
                } catch (parseError) {
                    console.error('Could not parse error response:', parseError);
                }
                throw new Error(errorMessage);
            }

            const data = await response.json();
            
            if (data.response) {
                const aiResponse = data.response;
                
                // Add AI response to conversation history
                this.conversationHistory.push({
                    role: 'model',
                    parts: [{ text: aiResponse }]
                });

                return aiResponse;
            } else {
                throw new Error('Invalid response format from server');
            }
        } catch (error) {
            console.error('Error getting AI response:', error);
            
            // Check if it's a network error
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Cannot connect to server. Please make sure the server is running on localhost:3000');
            }
            
            throw error;
        }
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;

        const avatar = document.createElement('div');
        avatar.className = `avatar ${sender}-avatar`;
        avatar.innerHTML = sender === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        // Format the content (handle code blocks, etc.)
        messageContent.innerHTML = this.formatMessage(content);

        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);

        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    formatMessage(text) {
        // Basic markdown-like formatting
        let formatted = text
            // Code blocks
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            // Inline code
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            // Bold text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Italic text
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // Line breaks
            .replace(/\n/g, '<br>');

        // Wrap in paragraph if no HTML tags
        if (!formatted.includes('<')) {
            formatted = `<p>${formatted}</p>`;
        }

        return formatted;
    }

    showTypingIndicator() {
        this.typingIndicator.classList.add('show');
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.typingIndicator.classList.remove('show');
    }

    setStatus(type, text) {
        this.statusIndicator.className = `status-indicator ${type}`;
        this.statusText.textContent = text;
        
        // Update send button state
        if (type === 'processing') {
            this.sendButton.disabled = true;
        } else {
            this.sendButton.disabled = false;
        }
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    // Utility method to clear conversation
    clearConversation() {
        this.conversationHistory = [];
        this.chatMessages.innerHTML = `
            <div class="message bot-message">
                <div class="avatar bot-avatar">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <p>Hello! I'm your AI assistant powered by Google Gemini. I can help you with problem-solving, coding, analysis, and much more. How can I assist you today?</p>
                </div>
            </div>
        `;
    }
}

// Initialize the AI Assistant when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new AIAssistant();
    
    // Add some keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus input
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            window.aiAssistant.messageInput.focus();
        }
        
        // Ctrl/Cmd + L to clear conversation
        if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
            e.preventDefault();
            if (confirm('Are you sure you want to clear the conversation?')) {
                window.aiAssistant.clearConversation();
            }
        }
    });

    // Add error handling for network issues
    window.addEventListener('online', () => {
        window.aiAssistant.setStatus('ready', 'Ready');
    });

    window.addEventListener('offline', () => {
        window.aiAssistant.setStatus('error', 'Offline');
    });
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AIAssistant;
}
