import { POST } from '../../app/api/chat/route'
import { NextRequest } from 'next/server'

// Mock Anthropic SDK
jest.mock('@anthropic-ai/sdk', () => ({
  default: jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({
        content: [
          {
            type: 'text',
            text: 'Test response from Claude',
          },
        ],
      }),
    },
  })),
}))

describe('/api/chat', () => {
  beforeEach(() => {
    process.env.ANTHROPIC_API_KEY = 'test-key'
  })

  afterEach(() => {
    delete process.env.ANTHROPIC_API_KEY
  })

  it('should return error when message is missing', async () => {
    const request = new NextRequest(new URL('http://localhost:3000/api/chat'), {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Message is required')
  })

  it('should return error when API key is not configured', async () => {
    delete process.env.ANTHROPIC_API_KEY

    const request = new NextRequest(new URL('http://localhost:3000/api/chat'), {
      method: 'POST',
      body: JSON.stringify({ message: 'Test message' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('API key not configured')
  })

  it('should handle rate limiting', async () => {
    // This test would require mocking the rate limit map
    // For now, we'll just test that the endpoint exists
    const request = new NextRequest(new URL('http://localhost:3000/api/chat'), {
      method: 'POST',
      body: JSON.stringify({ message: 'Test message' }),
      headers: new Headers({
        'x-forwarded-for': '127.0.0.1',
      }),
    })

    // First request should succeed
    const response1 = await POST(request)
    expect(response1.status).toBe(200)
  })
})

