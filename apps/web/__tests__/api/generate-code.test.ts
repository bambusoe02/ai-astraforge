import { POST } from '../../app/api/generate-code/route'
import { NextRequest } from 'next/server'

// Mock Anthropic SDK
jest.mock('@anthropic-ai/sdk', () => ({
  default: jest.fn().mockImplementation(() => ({
    messages: {
      create: jest.fn().mockResolvedValue({
        content: [
          {
            type: 'text',
            text: '```typescript\nconst Component = () => {\n  return <div>Test</div>\n}\n```',
          },
        ],
      }),
    },
  })),
}))

describe('/api/generate-code', () => {
  beforeEach(() => {
    process.env.ANTHROPIC_API_KEY = 'test-key'
  })

  afterEach(() => {
    delete process.env.ANTHROPIC_API_KEY
  })

  it('should return error when platform is missing', async () => {
    const request = new NextRequest(new URL('http://localhost:3000/api/generate-code'), {
      method: 'POST',
      body: JSON.stringify({}),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe('Platform is required')
  })

  it('should return error when API key is not configured', async () => {
    delete process.env.ANTHROPIC_API_KEY

    const request = new NextRequest(new URL('http://localhost:3000/api/generate-code'), {
      method: 'POST',
      body: JSON.stringify({ platform: 'nextjs' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.error).toBe('API key not configured')
  })

  it('should generate code for Next.js platform', async () => {
    const request = new NextRequest(new URL('http://localhost:3000/api/generate-code'), {
      method: 'POST',
      body: JSON.stringify({ platform: 'nextjs' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('code')
    expect(data).toHaveProperty('language')
    expect(data.language).toBe('typescript')
  })
})

