# ✅ Application Testing & Verification Guide

## Pre-Launch Checklist

Before running the application, ensure:

- [ ] Node.js 18+ installed
- [ ] npm working correctly
- [ ] .env.local file created with Supabase credentials
- [ ] Supabase project is active
- [ ] Tasks table exists in Supabase database

---

## Step-by-Step Testing Guide

### Phase 1: Startup & Home Page (5 minutes)

**Goal**: Verify the app starts and home page displays

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser to http://localhost:3000
```

**Expected Results**:
- ✅ No errors in terminal
- ✅ "compiled successfully" message
- ✅ Home page loads
- ✅ Shows "Task Manager" title
- ✅ Shows "Sign Up" and "Login" buttons (if not logged in)

**If Issues**:
1. Check terminal for TypeScript errors
2. Verify .env.local has correct credentials
3. Check browser console (F12) for errors
4. Try hard refresh (Ctrl+F5)

---

### Phase 2: Authentication (10 minutes)

#### Test 2.1: Sign Up Page
```
1. Click "Sign Up" button on home page
2. You should see sign-up form
```

**Expected Results**:
- ✅ Sign-up form displays
- ✅ Email field is present
- ✅ Password field is present
- ✅ Repeat password field is present
- ✅ "Sign up" button is present
- ✅ "Login" link is present

**If Issue**: Check console for component errors

#### Test 2.2: Sign Up with Invalid Data
```
1. Click "Sign Up"
2. Leave email empty
3. Click "Sign up" button
```

**Expected Results**:
- ✅ Browser shows validation error (required field)
- ✅ Form doesn't submit

#### Test 2.3: Sign Up with Mismatched Passwords
```
1. Enter email: test@example.com
2. Enter password: Test123456
3. Enter repeat password: Test123457 (different)
4. Click "Sign up"
```

**Expected Results**:
- ✅ Error message: "Passwords do not match"
- ✅ User is not created

#### Test 2.4: Successful Sign Up ⭐
```
1. Enter email: unique-test-email@example.com (use unique email)
2. Enter password: Test123456
3. Repeat password: Test123456
4. Click "Sign up"
```

**Expected Results**:
- ✅ Page redirects to /auth/sign-up-success
- ✅ Shows "Thank you for signing up!" message
- ✅ Shows email confirmation notice
- ✅ Shows "Go to Login" button
- ✅ No error message

**If You See "Site Can't Be Reached"**:
1. This is a browser caching issue
2. Hard refresh: Ctrl+F5
3. Or open incognito window
4. Or try different browser
5. See TROUBLESHOOTING.md for detailed fixes

#### Test 2.5: Login Page
```
1. Click "Go to Login" on sign-up-success page
OR
1. Go to home page
2. Click "Login"
```

**Expected Results**:
- ✅ Login form displays
- ✅ Email field present
- ✅ Password field present
- ✅ "Login" button present
- ✅ "Sign up" link present
- ✅ "Forgot your password?" link present

#### Test 2.6: Login with Wrong Password
```
1. Enter email: test@example.com
2. Enter password: WrongPassword
3. Click "Login"
```

**Expected Results**:
- ✅ Error message displayed
- ✅ User not logged in
- ✅ Still on login page

#### Test 2.7: Successful Login ⭐
```
1. Enter email: [the email you just signed up with]
2. Enter password: Test123456
3. Click "Login"
```

**Expected Results**:
- ✅ Page redirects to /protected (task dashboard)
- ✅ Shows "Task Manager" header
- ✅ Shows your email address
- ✅ Shows "Logout" button
- ✅ Shows "Create Task" button
- ✅ Shows empty state message or task list

---

### Phase 3: Dashboard (10 minutes)

**Goal**: Verify dashboard displays correctly

**Expected Results**:
- ✅ Header with "Task Manager" title
- ✅ Your email shown in header
- ✅ "Logout" button visible
- ✅ "Create Task" button visible
- ✅ Status filter dropdown visible
- ✅ Empty state message (if no tasks)

---

### Phase 4: Task Management (20 minutes)

#### Test 4.1: Create Task
```
1. Click "Create Task" button
2. Form modal opens
```

**Expected Results**:
- ✅ Modal shows "Create New Task" title
- ✅ Title field (required) visible
- ✅ Description field (optional) visible
- ✅ Status dropdown visible (with pending, in progress, completed)
- ✅ Due date field (optional) visible
- ✅ "Save Task" button visible
- ✅ "Cancel" button visible
- ✅ X button to close visible

#### Test 4.2: Create Task with Required Field Only
```
1. Click "Create Task"
2. Enter title: "Buy groceries"
3. Leave other fields empty
4. Click "Save Task"
```

**Expected Results**:
- ✅ Task is created and appears in list
- ✅ Modal closes
- ✅ Task shows in task list with:
  - Title: "Buy groceries"
  - Status badge: yellow "pending"
  - No description shown
  - No due date shown

#### Test 4.3: Create Task with All Fields
```
1. Click "Create Task"
2. Enter title: "Complete project"
3. Enter description: "Finish the task manager app"
4. Select status: "in_progress"
5. Select due date: 2 days from today
6. Click "Save Task"
```

**Expected Results**:
- ✅ Task created with all fields
- ✅ Appears in list with:
  - Title: "Complete project"
  - Status badge: blue "in progress"
  - Description visible: "Finish the task manager app"
  - Due date visible: formatted date
  - Edit and delete icons visible

#### Test 4.4: Filter by Status
```
1. You should have at least 2 tasks with different statuses
2. Click "Filter by status" dropdown
3. Select "pending"
```

**Expected Results**:
- ✅ Only pending tasks show
- ✅ Other tasks hidden

```
4. Select "in_progress"
```

**Expected Results**:
- ✅ Only in_progress tasks show

```
5. Select "All Tasks"
```

**Expected Results**:
- ✅ All tasks show again

#### Test 4.5: Edit Task
```
1. Click edit icon (✏️) on any task
2. Modal opens with "Edit Task" title
3. All fields pre-filled with current values
4. Change title to: "Updated task title"
5. Change status to: "completed"
6. Click "Save Task"
```

**Expected Results**:
- ✅ Task updated in list
- ✅ Title shows: "Updated task title"
- ✅ Status badge: green "completed"
- ✅ Modal closes

#### Test 4.6: Delete Task
```
1. Click delete icon (🗑️) on any task
```

**Expected Results**:
- ✅ Task immediately removed from list
- ✅ No confirmation dialog (instant delete)

#### Test 4.7: Task Sorting
```
1. Create 3 tasks at different times
2. Verify they appear newest first in list
```

**Expected Results**:
- ✅ Most recent task appears at top
- ✅ Oldest task appears at bottom

---

### Phase 5: Responsive Design (5 minutes)

**Goal**: Verify app works on different screen sizes

#### Desktop View
```
1. Open app in normal browser window
```

**Expected Results**:
- ✅ Two-column grid for form fields works
- ✅ Layout looks professional
- ✅ No horizontal scrolling needed
- ✅ Buttons properly sized

#### Mobile View
```
1. Press F12 to open DevTools
2. Click device toggle (phone icon) or press Ctrl+Shift+M
3. Select "iPhone 12" preset
```

**Expected Results**:
- ✅ Layout adapts to phone width
- ✅ Single-column form layout
- ✅ Buttons stack vertically
- ✅ No horizontal scroll
- ✅ All content visible
- ✅ Touch targets large enough

#### Tablet View
```
1. In DevTools, select "iPad" preset
```

**Expected Results**:
- ✅ Adapts between mobile and desktop
- ✅ Still readable and usable
- ✅ No layout broken

---

### Phase 6: Logout (5 minutes)

#### Test 6.1: Logout
```
1. Click "Logout" button in top right
```

**Expected Results**:
- ✅ Redirects to login page
- ✅ Session cleared
- ✅ Task list not accessible

#### Test 6.2: Access Protected Route After Logout
```
1. After logout, try going to http://localhost:3000/protected directly
2. Via URL bar
```

**Expected Results**:
- ✅ Redirects to login page
- ✅ Cannot access dashboard without login

---

### Phase 7: Error Handling (10 minutes)

#### Test 7.1: Network Error Simulation
```
1. Open DevTools (F12)
2. Go to Network tab
3. Check "Offline" checkbox
4. Try to create a task on dashboard
```

**Expected Results**:
- ✅ Error message displays
- ✅ Graceful error handling
- ✅ App doesn't crash

#### Test 7.2: Session Expired
```
1. Login to dashboard
2. Open browser DevTools (F12)
3. Go to Application → Cookies
4. Delete Supabase auth cookies
5. Try to create a task
```

**Expected Results**:
- ✅ Error message about authentication
- ✅ Can login again

---

### Phase 8: Full User Journey (5 minutes)

**Complete Flow**:
```
1. Home page (not logged in)
   ↓
2. Click "Sign Up"
   ↓
3. Create account with new email
   ↓
4. See sign-up-success page
   ↓
5. Click "Go to Login"
   ↓
6. Login with created credentials
   ↓
7. See dashboard (empty state)
   ↓
8. Create 3 tasks with different statuses
   ↓
9. Filter by status and verify filtering works
   ↓
10. Edit a task
   ↓
11. Delete a task
   ↓
12. Logout
   ↓
13. Try accessing dashboard (should redirect to login)
   ↓
14. Login again
   ↓
15. Verify tasks are still there
   ↓
16. Logout
```

**Expected Results**: All steps work without errors ✅

---

## Success Criteria

The application is working correctly when:

- [x] Home page loads without errors
- [x] Sign up process works end-to-end
- [x] Sign-up-success page displays
- [x] Login works with correct credentials
- [x] Dashboard displays after login
- [x] Can create tasks
- [x] Can edit tasks
- [x] Can delete tasks
- [x] Can filter by status
- [x] Can logout
- [x] Protected route redirects to login when not authenticated
- [x] All forms validate correctly
- [x] Error messages display clearly
- [x] Mobile responsive design works
- [x] No console errors
- [x] Smooth transitions and interactions

---

## Debugging Tips

### Check Console Errors
```
Press F12 → Console tab
Look for red error messages
```

### Check Network Requests
```
Press F12 → Network tab
Look for failed requests (red)
Check response for error messages
```

### Check Application State
```
Press F12 → Application tab
Look at Cookies → Supabase auth token
```

### Check Terminal Output
```
Look at terminal running npm run dev
Check for TypeScript errors
Check for API errors
```

---

## Performance Metrics

Good performance indicators:
- ✅ Page loads in < 2 seconds
- ✅ Task creation < 1 second
- ✅ Filter changes < 500ms
- ✅ Editing task < 1 second
- ✅ Deletion instant

---

## Browser Compatibility

Tested & Works On:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

---

## Final Checklist

Before declaring "working seamlessly":

- [ ] All signup/login flows work
- [ ] Dashboard displays correctly
- [ ] All CRUD operations work
- [ ] Filtering works
- [ ] Logout works
- [ ] Protected routes work
- [ ] Responsive design works
- [ ] No console errors
- [ ] No network errors
- [ ] User isolation works (can't see other users' tasks)
- [ ] Data persists after refresh
- [ ] Data persists after logout/login

---

## Common Issues & Fixes During Testing

| Issue | Solution |
|-------|----------|
| "Site can't be reached" | Hard refresh (Ctrl+F5) or clear cache |
| Page won't load | Check console for errors (F12) |
| Tasks not showing | Verify Supabase credentials, check database |
| Buttons not responding | Check network tab for failed requests |
| Logout not working | Check cookies are being cleared |
| Mobile layout broken | Reload page with DevTools responsive mode |

---

**Following this guide ensures the application runs seamlessly without errors!** ✨
