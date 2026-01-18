// AstraForge Chrome Extension Background Script

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('AstraForge extension installed');

    // Set default settings
    chrome.storage.sync.set({
      apiEndpoint: 'https://astraforge.vercel.app/api',
      theme: 'dark',
      notifications: true,
      autoAnalyze: false
    });
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.type) {
    case 'ANALYZE_REPO':
      handleRepoAnalysis(request, sendResponse);
      return true; // Keep message channel open for async response

    case 'GET_REPO_INFO':
      handleGetRepoInfo(request, sendResponse);
      return true;

    case 'SEND_TO_AI':
      handleSendToAI(request, sendResponse);
      return true;

    default:
      sendResponse({ error: 'Unknown message type' });
  }
});

// Handle repository analysis requests
async function handleRepoAnalysis(request, sendResponse) {
  try {
    const { owner, repo } = request;

    // Get repository information from GitHub API
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    const repoData = await repoResponse.json();

    // Analyze repository structure
    const analysis = {
      name: repoData.name,
      description: repoData.description,
      language: repoData.language,
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      issues: repoData.open_issues_count,
      lastCommit: repoData.updated_at,
      size: repoData.size,
      license: repoData.license?.name || 'No license',
      topics: repoData.topics || []
    };

    // Get contributors
    const contributorsResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors?per_page=10`);
    const contributors = await contributorsResponse.json();

    // Get languages
    const languagesResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/languages`);
    const languages = await languagesResponse.json();

    // Analyze codebase with AI
    const aiAnalysis = await analyzeWithAI({
      repo: analysis,
      contributors: contributors.length,
      languages,
      files: [] // Would need to fetch file tree
    });

    sendResponse({
      success: true,
      analysis: {
        ...analysis,
        contributors: contributors.length,
        languages,
        aiInsights: aiAnalysis
      }
    });

  } catch (error) {
    console.error('Repository analysis failed:', error);
    sendResponse({
      success: false,
      error: error.message
    });
  }
}

// Get basic repository information
async function handleGetRepoInfo(request, sendResponse) {
  try {
    const { owner, repo } = request;

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
    const data = await response.json();

    sendResponse({
      success: true,
      repo: {
        name: data.name,
        full_name: data.full_name,
        description: data.description,
        language: data.language,
        stars: data.stargazers_count,
        forks: data.forks_count,
        issues: data.open_issues_count,
        url: data.html_url
      }
    });

  } catch (error) {
    sendResponse({
      success: false,
      error: error.message
    });
  }
}

// Send request to AstraForge AI
async function handleSendToAI(request, sendResponse) {
  try {
    const response = await fetch('https://astraforge.vercel.app/api/agents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: request.message,
        project_id: request.projectId || 1,
        agent_type: request.agentType || 'architect'
      })
    });

    const data = await response.json();
    sendResponse({ success: true, response: data });

  } catch (error) {
    sendResponse({
      success: false,
      error: error.message
    });
  }
}

// Analyze repository with AI insights
async function analyzeWithAI(repoData) {
  // This would call the AstraForge API for AI-powered analysis
  // For now, return mock insights
  return {
    techStack: detectTechStack(repoData.languages),
    quality: {
      score: Math.floor(Math.random() * 40) + 60,
      issues: Math.floor(Math.random() * 20)
    },
    recommendations: [
      'Add TypeScript for better type safety',
      'Implement automated testing',
      'Set up CI/CD pipeline',
      'Add code linting and formatting',
      'Improve documentation'
    ],
    complexity: Math.floor(Math.random() * 50) + 50,
    maintainability: Math.floor(Math.random() * 40) + 60
  };
}

// Detect technology stack from languages
function detectTechStack(languages) {
  const techStack = [];

  if (languages.JavaScript || languages['JavaScript']) {
    techStack.push('JavaScript');
  }
  if (languages.TypeScript || languages['TypeScript']) {
    techStack.push('TypeScript');
  }
  if (languages.Python || languages['Python']) {
    techStack.push('Python');
  }
  if (languages.HTML || languages['HTML']) {
    techStack.push('HTML/CSS');
  }

  return techStack;
}

// Handle tab updates to detect GitHub pages
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url?.includes('github.com')) {
    // Inject content script if needed
    chrome.scripting.executeScript({
      target: { tabId },
      files: ['content.js']
    }).catch(() => {
      // Content script already injected
    });
  }
});

// Context menu integration
chrome.contextMenus.create({
  title: 'Analyze with AstraForge',
  contexts: ['page'],
  documentUrlPatterns: ['https://github.com/*/*'],
  onclick: (info, tab) => {
    chrome.tabs.sendMessage(tab.id, {
      type: 'CONTEXT_MENU_ANALYZE'
    });
  }
});
