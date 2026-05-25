# 🏗️ Task Manager - System Architecture & Data Flow

## Overall System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         BROWSER / CLIENT                           │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────────────────────────────────────────────────────┐ │
│  │                    NEXT.JS APP (Client)                     │ │
│  ├──────────────────────────────────────────────────────────────┤ │
│  │                                                              │ │
│  │  Page: /                                                     │ │
│  │  ├─ Unauthenticated: Show login/signup                      │ │
│  │  └─ Authenticated: Show dashboard link                      │ │
│  │                                                              │ │
│  │  Page: /auth/login                                           │ │
│  │  └─ LoginForm Component                                     │ │
│  │     ├─ Email input                                          │ │
│  │     ├─ Password input                                       │ │
│  │     └─ Supabase signInWithPassword()                        │ │
│  │                                                              │ │
│  │  Page: /auth/sign-up                                         │ │
│  │  └─ SignUpForm Component                                    │ │
│  │     ├─ Email input                                          │ │
│  │     ├─ Password input                                       │ │
│  │     └─ Supabase signUp()                                    │ │
│  │                                                              │ │
│  │  Page: /protected (Protected Route)                         │ │
│  │  ├─ Server auth check (redirect if not logged in)          │ │
│  │  ├─ Show user email & logout button                        │ │
│  │  └─ TaskList Component ──────────┐                         │ │
│  │                                   │                         │ │
│  └───────────────────────────────────┼─────────────────────────┘ │
│                                       │                           │
│  ┌────────────────────────────────────▼─────────────────────────┐ │
│  │            COMPONENT LAYER (Client Components)              │ │
│  ├─────────────────────────────────────────────────────────────┤ │
│  │                                                             │ │
│  │  ┌─────────────────────────────────────────────────────┐  │ │
│  │  │ TaskList Component (Main)                           │  │ │
│  │  ├─ State: tasks[], loading, error, filter            │  │ │
│  │  ├─ fetchTasks() → Query user's tasks                 │  │ │
│  │  ├─ deleteTask(id) → Delete from Supabase            │  │ │
│  │  ├─ handleFormClose() → Close modal                  │  │ │
│  │  ├─ Status Filter Dropdown                            │  │ │
│  │  │  ├─ All Tasks                                      │  │ │
│  │  │  ├─ Pending                                        │  │ │
│  │  │  ├─ In Progress                                    │  │ │
│  │  │  └─ Completed                                      │  │ │
│  │  ├─ Task Cards (forEach task)                         │  │ │
│  │  │  ├─ Title (bold)                                   │  │ │
│  │  │  ├─ Status Badge (color-coded)                     │  │ │
│  │  │  ├─ Description (gray text)                        │  │ │
│  │  │  ├─ Due Date (if set)                              │  │ │
│  │  │  ├─ Edit Button (✏️ icon)                          │  │ │
│  │  │  └─ Delete Button (🗑️ icon)                        │  │ │
│  │  └─ Create Task Button                                │  │ │
│  │                                                        │  │ │
│  │  ┌─────────────────────────────────────────────────┐  │  │ │
│  │  │ TaskForm Component (Modal)                      │  │  │ │
│  │  ├─ State: title, description, status, dueDate    │  │  │ │
│  │  ├─ Mode: Create (empty) or Edit (pre-filled)     │  │  │ │
│  │  ├─ Form Fields:                                   │  │  │ │
│  │  │  ├─ Title Input (required)                      │  │  │ │
│  │  │  ├─ Description Textarea (optional)             │  │  │ │
│  │  │  ├─ Status Select Dropdown                      │  │  │ │
│  │  │  └─ Due Date Input (optional)                   │  │  │ │
│  │  ├─ Validation: Check required fields              │  │  │ │
│  │  ├─ handleSubmit() → Insert or Update              │  │  │ │
│  │  └─ Close Button (X icon)                          │  │  │ │
│  │                                                        │  │ │
│  │  ┌─────────────────────────────────────────────────┐  │  │ │
│  │  │ UI Components (Radix UI + Tailwind)             │  │  │ │
│  │  ├─ Button, Input, Card, Select, Label             │  │  │ │
│  │  └─ Icons from Lucide React                        │  │  │ │
│  │                                                        │  │ │
│  └────────────────────────────────────────────────────┘  │ │
│                          │                               │ │
│                          ▼                               │ │
│  ┌─────────────────────────────────────────────────────┐ │ │
│  │     SUPABASE CLIENT (Browser SDK)                  │ │ │
│  ├─────────────────────────────────────────────────────┤ │ │
│  │                                                     │ │ │
│  │  Authentication:                                   │ │ │
│  │  ├─ signUp(email, password)                        │ │ │
│  │  ├─ signInWithPassword(email, password)            │ │ │
│  │  ├─ signOut()                                      │ │ │
│  │  └─ getSession()                                   │ │ │
│  │                                                     │ │ │
│  │  Database:                                         │ │ │
│  │  ├─ from('tasks').select(*)                        │ │ │
│  │  ├─ from('tasks').insert(taskData)                 │ │ │
│  │  ├─ from('tasks').update(taskData).eq('id', id)   │ │ │
│  │  └─ from('tasks').delete().eq('id', id)           │ │ │
│  │                                                     │ │ │
│  └────────────────────────────────┬────────────────────┘ │ │
│                                   │                      │ │
└───────────────────────────────────┼──────────────────────┘ │
                                    │
                    ┌───────────────▼────────────────┐
                    │  HTTPS / REST API CALLS       │
                    │  (Supabase REST Endpoints)    │
                    └───────────────┬────────────────┘
                                    │
                    ┌───────────────▼────────────────────────┐
                    │      SUPABASE BACKEND (Server)        │
                    ├────────────────────────────────────────┤
                    │                                        │
                    │  ┌──────────────────────────────────┐ │
                    │  │ Authentication Service            │ │
                    │  ├─ JWT token generation            │ │
                    │  ├─ Password hashing (bcrypt)       │ │
                    │  └─ Session management              │ │
                    │                                      │ │
                    │  ┌──────────────────────────────────┐ │
                    │  │ API Gateway / REST API            │ │
                    │  ├─ Parse requests                  │ │
                    │  ├─ Route to PostgreSQL             │ │
                    │  └─ Return JSON responses           │ │
                    │                                      │ │
                    │  ┌──────────────────────────────────┐ │
                    │  │ Row Level Security (RLS)          │ │
                    │  ├─ Enforce user_id filtering      │ │
                    │  ├─ Prevent cross-user access      │ │
                    │  └─ Validate permissions            │ │
                    │                                      │ │
                    └────────────────┬───────────────────┘ │
                                    │
                    ┌───────────────▼──────────────────────┐
                    │   PostgreSQL DATABASE (Supabase)    │
                    ├────────────────────────────────────┤
                    │                                    │
                    │  ┌──────────────────────────────┐ │
                    │  │ auth.users (Supabase Auth)   │ │
                    │  ├─ id (UUID)                   │ │
                    │  ├─ email                       │ │
                    │  ├─ encrypted_password          │ │
                    │  └─ ...metadata...              │ │
                    │                                  │
                    │  ┌──────────────────────────────┐ │
                    │  │ public.tasks (Your Table)    │ │
                    │  ├─ id (UUID)                   │ │
                    │  ├─ user_id (FK to auth.users) │ │
                    │  ├─ title                       │ │
                    │  ├─ description                 │ │
                    │  ├─ status                      │ │
                    │  ├─ due_date                    │ │
                    │  ├─ created_at                  │ │
                    │  └─ Indexes: user_id, status   │ │
                    │                                  │
                    └──────────────────────────────────┘
```

---

## Request Flow Diagrams

### 1. Sign Up Flow

```
User fills signup form
         │
         ▼
handleSignUp() in SignUpForm
         │
         ▼
supabase.auth.signUp({
  email,
  password,
  options: { emailRedirectTo: "/protected" }
})
         │
         ▼
HTTPS POST to Supabase API
         │
         ▼
Supabase:
  - Validate email
  - Hash password with bcrypt
  - Create user record
  - Send confirmation email
         │
         ▼
Response: { user, session } or error
         │
         ▼
Navigate to /auth/sign-up-success
```

### 2. Login Flow

```
User fills login form
         │
         ▼
handleLogin() in LoginForm
         │
         ▼
supabase.auth.signInWithPassword({
  email,
  password
})
         │
         ▼
HTTPS POST to Supabase API
         │
         ▼
Supabase:
  - Find user by email
  - Compare password with hash
  - Generate JWT token
  - Create session
         │
         ▼
Response: { user, session } or error
         │
         ▼
Store session cookie
         │
         ▼
Navigate to /protected
```

### 3. Fetch Tasks Flow

```
User navigates to /protected
         │
         ▼
TaskDashboard (Server Component):
  - Check auth via getClaims()
  - If not auth → redirect to /auth/login
  - If auth → render TaskList
         │
         ▼
TaskList Component mounts
         │
         ▼
useEffect → fetchTasks()
         │
         ▼
getSession() → get current user ID
         │
         ▼
supabase.from('tasks')
  .select('*')
  .eq('user_id', currentUserId)
  .eq('status', statusFilter)  // if filtered
  .order('created_at', { ascending: false })
         │
         ▼
HTTPS GET to Supabase API
         │
         ▼
Supabase RLS Policies:
  - Check user_id matches authenticated user
  - Only return tasks matching criteria
         │
         ▼
PostgreSQL executes query:
  SELECT * FROM tasks
  WHERE user_id = 'current-user-id'
  AND status = 'status_filter'  // if filtered
  ORDER BY created_at DESC
         │
         ▼
Response: Array of task objects
         │
         ▼
setTasks(data) → Update state
         │
         ▼
Component re-renders with tasks
         │
         ▼
Display task cards with colors/formatting
```

### 4. Create Task Flow

```
User clicks "Create Task"
         │
         ▼
setIsFormOpen(true)
         │
         ▼
TaskForm renders (modal)
         │
         ▼
User fills form and clicks "Save Task"
         │
         ▼
handleSubmit() in TaskForm
         │
         ▼
Validate: title required
         │
         ▼
Get current user ID:
  getSession() → user.id
         │
         ▼
Prepare taskData:
  {
    user_id: currentUserId,
    title: user input,
    description: user input,
    status: user selection,
    due_date: user input or null
  }
         │
         ▼
supabase.from('tasks').insert([taskData])
         │
         ▼
HTTPS POST to Supabase API
         │
         ▼
Supabase:
  - Insert record with user_id
  - Generate UUID for id
  - Set created_at to NOW()
         │
         ▼
PostgreSQL:
  INSERT INTO tasks (...)
  VALUES (...)
         │
         ▼
Success response
         │
         ▼
onSaved() → Close form + re-fetch tasks
         │
         ▼
fetchTasks() → Query updated list
         │
         ▼
Display new task in list
```

### 5. Edit Task Flow

```
User clicks edit icon (✏️)
         │
         ▼
setSelectedTask(task)
setIsFormOpen(true)
         │
         ▼
TaskForm renders (modal, pre-filled)
         │
         ▼
User modifies fields
         │
         ▼
handleSubmit() in TaskForm
         │
         ▼
Validate & prepare updated taskData
         │
         ▼
supabase.from('tasks')
  .update(taskData)
  .eq('id', taskId)
         │
         ▼
HTTPS PATCH to Supabase API
         │
         ▼
Supabase RLS:
  - Verify task.user_id === auth.user.id
         │
         ▼
PostgreSQL:
  UPDATE tasks SET ...
  WHERE id = 'task-id'
         │
         ▼
Success response
         │
         ▼
onSaved() → Close form + re-fetch
         │
         ▼
Display updated task
```

### 6. Delete Task Flow

```
User clicks delete icon (🗑️)
         │
         ▼
deleteTask(taskId)
         │
         ▼
supabase.from('tasks')
  .delete()
  .eq('id', taskId)
         │
         ▼
HTTPS DELETE to Supabase API
         │
         ▼
Supabase RLS:
  - Verify task.user_id === auth.user.id
         │
         ▼
PostgreSQL:
  DELETE FROM tasks
  WHERE id = 'task-id'
         │
         ▼
Success response
         │
         ▼
setTasks(tasks.filter(t => t.id !== id))
         │
         ▼
UI updates immediately
```

### 7. Filter Tasks Flow

```
User selects status from dropdown
         │
         ▼
setStatusFilter(selectedStatus)
         │
         ▼
useEffect dependency detects change
         │
         ▼
fetchTasks() called
         │
         ▼
Build query:
  let query = supabase.from('tasks')
    .select('*')
    .eq('user_id', userId)
         │
         ▼
If statusFilter !== 'all':
  query = query.eq('status', statusFilter)
         │
         ▼
Execute query
         │
         ▼
Get filtered results
         │
         ▼
setTasks(data)
         │
         ▼
Display filtered tasks
```

### 8. Logout Flow

```
User clicks "Logout"
         │
         ▼
logout() in LogoutButton
         │
         ▼
supabase.auth.signOut()
         │
         ▼
HTTPS POST to Supabase API
         │
         ▼
Supabase:
  - Invalidate session
  - Clear cookies
         │
         ▼
router.push("/auth/login")
         │
         ▼
Redirect to login page
         │
         ▼
User sees login form
```

---

## State Management

### TaskList Component State

```
state = {
  tasks: Task[],              // Array of user's tasks
  loading: boolean,           // Fetching status
  error: string | null,       // Error message if any
  isFormOpen: boolean,        // Form modal open/closed
  selectedTask: Task | null,  // Task being edited (null if creating)
  statusFilter: 'pending' | 'in_progress' | 'completed' | 'all'
}
```

### TaskForm Component State

```
state = {
  title: string,
  description: string,
  status: 'pending' | 'in_progress' | 'completed',
  dueDate: string (YYYY-MM-DD),
  loading: boolean,
  error: string | null
}
```

---

## Type Definitions

```typescript
// Task type (from database)
interface Task {
  id: string;                  // UUID
  user_id: string;             // UUID (foreign key)
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  due_date: string | null;     // ISO date string
  created_at: string;          // ISO timestamp
}

// TaskFormProps
interface TaskFormProps {
  task?: Task | null;          // undefined for create, Task for edit
  onClose: () => void;         // Close modal
  onSaved: () => void;         // After successful save
}
```

---

## Database Indexes & Performance

```
Table: tasks
├─ Primary Key: id (UUID)
├─ Foreign Key: user_id → auth.users(id)
├─ Index 1: tasks_user_id
│  └─ Fast queries: WHERE user_id = 'xxx'
│
└─ Index 2: tasks_status
   └─ Fast filtering: WHERE status = 'pending'

Query Pattern 1 (Most Common):
  SELECT * FROM tasks
  WHERE user_id = 'current-user-id'
  ORDER BY created_at DESC
  → Uses: tasks_user_id index

Query Pattern 2 (With Filter):
  SELECT * FROM tasks
  WHERE user_id = 'current-user-id'
  AND status = 'pending'
  ORDER BY created_at DESC
  → Uses: tasks_user_id + tasks_status indexes
```

---

**This architecture ensures:**
- ✅ Fast queries with proper indexing
- ✅ User isolation at database level
- ✅ Secure authentication
- ✅ Real-time updates
- ✅ Scalable design
