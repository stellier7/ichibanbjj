#!/bin/bash

# Ichiban Database Setup Script
# This script helps you set up the database for the Ichiban website

echo "🥋 Ichiban Database Setup"
echo "========================"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "❌ .env file not found!"
    echo "Please create .env file first (copy from env.example)"
    exit 1
fi

# Check if DATABASE_URL is set
if ! grep -q "DATABASE_URL=" .env || grep -q "postgresql://postgres:password" .env; then
    echo "⚠️  Please update DATABASE_URL in .env file with your database credentials"
    echo ""
    echo "Example:"
    echo 'DATABASE_URL="postgresql://username:password@localhost:5432/ichiban?schema=public"'
    echo ""
    read -p "Press Enter when you've updated .env file..."
fi

echo "📦 Generating Prisma Client..."
npx prisma generate

echo ""
echo "🗄️  Running database migrations..."
npx prisma migrate dev --name init

echo ""
echo "✅ Database setup complete!"
echo ""
echo "Next steps:"
echo "1. Start the dev server: npm run dev"
echo "2. Open http://localhost:3000 in your browser"
echo ""
echo "Optional: Open Prisma Studio to view your database:"
echo "  npx prisma studio"
