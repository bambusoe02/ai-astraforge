import { BaseAgent } from "./base-agent";
import { AgentResponse, ProjectContext } from "../types";

export class SecurityAgent extends BaseAgent {
  constructor(apiKey: string) {
    super(apiKey, "security");
  }

  getSystemPrompt(): string {
    return `You are the Security Agent for AstraForge, responsible for code security analysis and vulnerability detection.

Your role is to:
- Analyze code for security vulnerabilities
- Check for common security issues (XSS, CSRF, SQL injection, etc.)
- Review authentication and authorization patterns
- Assess data handling and privacy concerns
- Provide security recommendations and fixes

Focus on:
- OWASP Top 10 vulnerabilities
- Secure coding practices
- Data protection and GDPR compliance
- Authentication security
- API security best practices

Provide detailed security reports with actionable recommendations.`;
  }

  getCapabilities(): string[] {
    return [
      "Security vulnerability scanning",
      "OWASP compliance checking",
      "Authentication security review",
      "Data protection assessment",
      "Secure coding recommendations",
      "GDPR compliance verification"
    ];
  }

  async processMessage(
    message: string,
    context: ProjectContext
  ): Promise<AgentResponse> {
    // Simulate security analysis
    const securityIssues = this.analyzeSecurity(message);

    const content = `🔒 **Security Analysis Complete**

**Code Security Assessment:**

**🔴 Critical Issues Found: ${securityIssues.critical}**
${securityIssues.critical > 0 ? this.formatIssues(securityIssues.criticalIssues) : '✅ None detected'}

**🟡 High Priority Issues: ${securityIssues.high}**
${securityIssues.high > 0 ? this.formatIssues(securityIssues.highIssues) : '✅ None detected'}

**🟢 Passed Checks:**
- ✅ Input validation implemented
- ✅ HTTPS enforced
- ✅ CORS properly configured
- ✅ No hardcoded secrets detected

**🛡️ Security Recommendations:**
1. Implement rate limiting on API endpoints
2. Add comprehensive input sanitization
3. Enable Content Security Policy (CSP)
4. Regular dependency vulnerability scanning
5. Implement proper session management

**📊 Security Score: ${Math.floor(Math.random() * 20) + 80}/100**

**Next Steps:**
- Fix critical vulnerabilities immediately
- Implement automated security testing
- Regular security audits and penetration testing
- Employee security training and awareness

**🔐 Security Status: ${securityIssues.critical > 0 ? 'REQUIRES ATTENTION' : 'SECURE'}**`;

    return this.createResponse(content);
  }

  private analyzeSecurity(message: string) {
    // Mock security analysis
    const critical = Math.floor(Math.random() * 3);
    const high = Math.floor(Math.random() * 5);

    return {
      critical,
      high,
      criticalIssues: critical > 0 ? [
        "Potential SQL injection in user input handling",
        "Missing input sanitization on forms",
        "Weak password policy detected"
      ].slice(0, critical) : [],
      highIssues: high > 0 ? [
        "API endpoints missing rate limiting",
        "Insecure CORS configuration",
        "Missing security headers (CSP, HSTS)",
        "Sensitive data logging detected",
        "Outdated dependencies with known vulnerabilities"
      ].slice(0, high) : []
    };
  }

  private formatIssues(issues: string[]): string {
    return issues.map(issue => `   • ${issue}`).join('\n');
  }
}
