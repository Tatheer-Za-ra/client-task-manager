@echo off
REM Quick verification script for Task Manager setup (Windows)

echo.
echo ================================
echo Task Manager Setup Verification
echo ================================
echo.

REM Check if .env.local exists
if exist ".env.local" (
    echo [OK] .env.local file exists
    
    findstr "NEXT_PUBLIC_SUPABASE_URL" .env.local >nul
    if %errorlevel% equ 0 (
        echo [OK] NEXT_PUBLIC_SUPABASE_URL is set
    ) else (
        echo [ERROR] NEXT_PUBLIC_SUPABASE_URL is missing
    )
    
    findstr "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY" .env.local >nul
    if %errorlevel% equ 0 (
        echo [OK] NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is set
    ) else (
        echo [ERROR] NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY is missing
    )
) else (
    echo [ERROR] .env.local file not found - Please create it with Supabase credentials
)

echo.
echo File Structure Check:
echo =====================

REM Check key files
set files=^
    "components\task-list.tsx" ^
    "components\task-form.tsx" ^
    "components\ui\select.tsx" ^
    "components\login-form.tsx" ^
    "components\sign-up-form.tsx" ^
    "components\logout-button.tsx" ^
    "app\page.tsx" ^
    "app\protected\page.tsx" ^
    "lib\supabase\client.ts" ^
    "lib\supabase\server.ts" ^
    "package.json"

for %%F in (%files%) do (
    if exist "%%F" (
        echo [OK] %%F
    ) else (
        echo [ERROR] %%F - MISSING
    )
)

echo.
echo Dependencies Check:
echo ===================

findstr "@radix-ui/react-select" package.json >nul
if %errorlevel% equ 0 (
    echo [OK] @radix-ui/react-select is in package.json
) else (
    echo [ERROR] @radix-ui/react-select is missing - Run: npm install @radix-ui/react-select
)

findstr "@supabase/supabase-js" package.json >nul
if %errorlevel% equ 0 (
    echo [OK] @supabase/supabase-js is installed
) else (
    echo [ERROR] @supabase/supabase-js is missing
)

echo.
echo Database Check:
echo ===============
echo.
echo Make sure your Supabase database has a 'tasks' table with:
echo   - id (UUID, primary key)
echo   - user_id (UUID, foreign key to auth.users)
echo   - title (TEXT, required)
echo   - description (TEXT, optional)
echo   - status (TEXT, default: 'pending')
echo   - due_date (TIMESTAMP, optional)
echo   - created_at (TIMESTAMP, default: NOW())
echo.

echo Setup Steps:
echo ============
echo.
echo 1. Install dependencies:
echo    npm install
echo.
echo 2. Start development server:
echo    npm run dev
echo.
echo 3. Open browser:
echo    http://localhost:3000
echo.
echo 4. Try signing up or logging in with test credentials
echo.
echo ================================
echo [SUCCESS] Ready to go!
echo ================================
echo.

pause
