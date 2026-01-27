#!/bin/bash

# AstraForge Environment Setup Script
# This script helps you configure environment variables for AstraForge

echo "🌟 AstraForge Environment Setup"
echo "================================"

# Check if .env.local already exists
if [ -f ".env.local" ]; then
    echo "⚠️  .env.local already exists. Do you want to overwrite it? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "Setup cancelled."
        exit 0
    fi
fi

# Copy example file
if [ -f "env.local.example" ]; then
    cp env.local.example .env.local
    echo "✅ Created .env.local from env.local.example"
else
    echo "❌ env.local.example not found!"
    exit 1
fi

echo ""
echo "📝 Please edit .env.local and fill in your values:"
echo "   - OPENAI_API_KEY (required)"
echo "   - DATABASE_URL"
echo "   - Other optional variables"
echo ""
echo "🔗 Useful links:"
echo "   - OpenAI API: https://platform.openai.com/api-keys"
echo "   - Neon Database: https://neon.tech"
echo "   - Clerk Auth: https://clerk.com"
echo "   - Stripe: https://stripe.com"
echo ""
echo "🚀 After configuration, run: npm run dev"
