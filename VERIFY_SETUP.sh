#!/bin/bash
# Quick verification script for Task Manager setup

echo "================================"
echo "Task Manager Setup Verification"
echo "================================"
echo ""

# Check if .env.local exists
if [ -f ".env.local" ]; then
    echo "✅ .env.local file exists"
    
    # Check for required environment variables
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        echo "✅ NEXT_PUBLIC_SUPABASE_URL is set"
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_URL is missing"
    fi
    
    if grep -q "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY" .env.local; then
        echo "✅ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is set"
    else
        echo "❌ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is missing"
    fi
else
    echo "❌ .env.local file not found - Please create it with Supabase credentials"
fi

echo ""
echo "File Structure Check:"
echo "====================="

# Check key files
files=(
    "components/task-list.tsx"
    "components/task-form.tsx"
    "components/ui/select.tsx"
    "components/login-form.tsx"
    "components/sign-up-form.tsx"
    "components/logout-button.tsx"
    "app/page.tsx"
    "app/protected/page.tsx"
    "lib/supabase/client.ts"
    "lib/supabase/server.ts"
    "package.json"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING"
    fi
done

echo ""
echo "Dependencies Check:"
echo "==================="

if grep -q "@radix-ui/react-select" package.json; then
    echo "✅ @radix-ui/react-select is in package.json"
else
    echo "❌ @radix-ui/react-select is missing - Run: npm install @radix-ui/react-select"
fi

if grep -q "@supabase/supabase-js" package.json; then
    echo "✅ @supabase/supabase-js is installed"
else
    echo "❌ @supabase/supabase-js is missing"
fi

echo ""
echo "Database Check:"
echo "==============="
echo ""
echo "Make sure your Supabase database has a 'tasks' table with:"
echo "  - id (UUID, primary key)"
echo "  - user_id (UUID, foreign key to auth.users)"
echo "  - title (TEXT, required)"
echo "  - description (TEXT, optional)"
echo "  - status (TEXT, default: 'pending')"
echo "  - due_date (TIMESTAMP, optional)"
echo "  - created_at (TIMESTAMP, default: NOW())"
echo ""

echo "Setup Steps:"
echo "============"
echo ""
echo "1. Install dependencies:"
echo "   npm install"
echo ""
echo "2. Start development server:"
echo "   npm run dev"
echo ""
echo "3. Open browser:"
echo "   http://localhost:3000"
echo ""
echo "4. Try signing up or logging in with test credentials"
echo ""
echo "================================"
echo "✨ Ready to go!"
echo "================================"
