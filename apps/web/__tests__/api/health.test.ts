import { GET } from '../../app/api/health/route'

describe('/api/health', () => {
  it('should return healthy status', async () => {
    const response = await GET()
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.status).toBe('healthy')
    expect(data).toHaveProperty('timestamp')
    expect(data).toHaveProperty('version')
    expect(data).toHaveProperty('services')
    expect(data).toHaveProperty('uptime')
  })

  it('should check Anthropic API key configuration', async () => {
    // Set API key for test
    process.env.ANTHROPIC_API_KEY = 'test-key'
    
    const response = await GET()
    const data = await response.json()

    expect(data.services.anthropic).toBe('configured')
    
    // Cleanup
    delete process.env.ANTHROPIC_API_KEY
  })

  it('should report not_configured when API key is missing', async () => {
    // Ensure API key is not set
    delete process.env.ANTHROPIC_API_KEY
    
    const response = await GET()
    const data = await response.json()

    expect(data.services.anthropic).toBe('not_configured')
  })
})

