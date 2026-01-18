// AstraForge Chrome Extension Popup
class AstraForgePopup {
  constructor() {
    this.currentRepo = null;
    this.messages = [];
    this.init();
  }

  async init() {
    this.bindElements();
    this.bindEvents();
    await this.loadCurrentRepo();
    this.updateUI();
  }

  bindElements() {
    this.analyzeBtn = document.getElementById('analyzeBtn');
    this.generateBtn = document.getElementById('generateBtn');
    this.reviewBtn = document.getElementById('reviewBtn');
    this.deployBtn = document.getElementById('deployBtn');
    this.messageInput = document.getElementById('messageInput');
    this.sendBtn = document.getElementById('sendBtn');
    this.chatContainer = document.getElementById('chatContainer');
    this.chatMessages = document.getElementById('chatMessages');
    this.repoInfo = document.getElementById('repoInfo');
  }

  bindEvents() {
    this.analyzeBtn.addEventListener('click', () => this.analyzeRepository());
    this.generateBtn.addEventListener('click', () => this.generateFeatures());
    this.reviewBtn.addEventListener('click', () => this.codeReview());
    this.deployBtn.addEventListener('click', () => this.deploy());
    this.sendBtn.addEventListener('click', () => this.sendMessage());
    this.messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
  }

  async loadCurrentRepo() {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab.url && tab.url.includes('github.com')) {
        const urlParts = tab.url.split('/');
        if (urlParts.length >= 5) {
          this.currentRepo = {
            owner: urlParts[3],
            name: urlParts[4],
            fullName: `${urlParts[3]}/${urlParts[4]}`,
            url: tab.url
          };
        }
      }
    } catch (error) {
      console.error('Error loading repo info:', error);
    }
  }

  updateUI() {
    if (this.currentRepo) {
      this.repoInfo.innerHTML = `
        <div class="repo-name">${this.currentRepo.fullName}</div>
        <div class="repo-stats">
          <span>⭐ ${Math.floor(Math.random() * 1000)}</span>
          <span>🍴 ${Math.floor(Math.random() * 500)}</span>
          <span>📦 ${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 10)}.0</span>
        </div>
      `;
    } else {
      this.repoInfo.innerHTML = `
        <div class="repo-name">Not a GitHub repository</div>
        <div class="repo-stats">Navigate to a GitHub repo to use AstraForge</div>
      `;
    }
  }

  showChat() {
    this.chatContainer.style.display = 'flex';
    document.querySelector('.actions').style.display = 'none';
    this.messageInput.focus();
  }

  async analyzeRepository() {
    if (!this.currentRepo) return;

    this.showChat();
    this.addMessage('Analyzing repository structure and codebase...', 'agent', 'architect');

    // Simulate analysis
    setTimeout(() => {
      this.addMessage(`📊 **Repository Analysis Complete**

**${this.currentRepo.fullName}**

**Tech Stack Detected:**
- Primary: JavaScript/TypeScript
- Framework: React, Node.js
- Testing: Jest, Cypress
- CI/CD: GitHub Actions

**Code Quality:**
- Lines of code: ${Math.floor(Math.random() * 50000)}
- Test coverage: ${Math.floor(Math.random() * 30) + 70}%
- Issues: ${Math.floor(Math.random() * 50)}

**Recommendations:**
1. Add TypeScript for better type safety
2. Implement automated testing
3. Set up CI/CD pipeline
4. Add code linting

Ready to help improve this repository!`, 'agent', 'architect');
    }, 2000);
  }

  async generateFeatures() {
    this.showChat();
    this.addMessage('What feature would you like me to generate?', 'agent', 'coder');
  }

  async codeReview() {
    this.showChat();
    this.addMessage('Starting comprehensive code review...', 'agent', 'tester');

    setTimeout(() => {
      this.addMessage(`🔍 **Code Review Complete**

**Issues Found:** ${Math.floor(Math.random() * 20)}

**Critical (3):**
- Security vulnerability in auth handling
- Memory leak in component cleanup
- Race condition in API calls

**Major (7):**
- Missing error handling
- Inconsistent code style
- Performance bottlenecks

**Minor (10):**
- Code duplication
- Missing documentation
- Accessibility issues

**Suggestions:**
1. Implement proper error boundaries
2. Add input validation
3. Optimize bundle size
4. Improve test coverage

Would you like me to fix these issues automatically?`, 'agent', 'tester');
    }, 3000);
  }

  async deploy() {
    this.showChat();
    this.addMessage('Initiating deployment process...', 'agent', 'deployer');

    const steps = [
      'Building application...',
      'Running tests...',
      'Creating production bundle...',
      'Deploying to staging...',
      'Running integration tests...',
      'Deploying to production...',
      'Deployment successful! 🎉'
    ];

    steps.forEach((step, index) => {
      setTimeout(() => {
        this.addMessage(step, 'agent', 'deployer');
      }, (index + 1) * 1000);
    });
  }

  sendMessage() {
    const text = this.messageInput.value.trim();
    if (!text) return;

    this.addMessage(text, 'user');
    this.messageInput.value = '';

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'I understand your request. Let me help you with that.',
        'Great idea! I can generate that feature for you.',
        'Let me analyze your codebase and provide recommendations.',
        'I can help optimize your code and improve performance.',
        'Would you like me to implement automated testing?',
        'I can set up CI/CD pipelines for your project.',
        'Let me review your code for potential improvements.',
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      this.addMessage(randomResponse, 'agent', 'architect');
    }, 1000 + Math.random() * 2000);
  }

  addMessage(text, type = 'user', agent = null) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;

    if (agent) {
      const agentLabel = document.createElement('div');
      agentLabel.className = 'agent-label';
      agentLabel.textContent = agent;
      messageDiv.appendChild(agentLabel);
    }

    const textDiv = document.createElement('div');
    textDiv.textContent = text;
    messageDiv.appendChild(textDiv);

    this.chatMessages.appendChild(messageDiv);
    this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new AstraForgePopup();
});
