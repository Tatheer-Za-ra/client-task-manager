# Task Manager App

A modern, responsive task management application built with **Next.js**, **Supabase**, and **Tailwind CSS**. Users can create an account, manage their tasks securely, and stay organized with status filtering and due date tracking.

## 🎯 Features

### Authentication
- ✅ **Sign Up**: Create a new account with email and password
- ✅ **Login**: Secure login with email and password
- ✅ **Logout**: Sign out from the dashboard
- ✅ **Protected Routes**: Dashboard only accessible to authenticated users
- ✅ **User Isolation**: Each user only sees their own tasks

### Task Management
- ✅ **Create Task**: Add new tasks with title, description, and due date
- ✅ **Edit Task**: Update existing tasks
- ✅ **Delete Task**: Remove tasks from the list
- ✅ **Status Tracking**: Mark tasks as Pending, In Progress, or Completed
- ✅ **Filter by Status**: View all tasks or filter by status
- ✅ **Due Date**: Set and view task due dates
- ✅ **Clean UI**: Professional, intuitive interface with Tailwind CSS

## 🏗️ Project Structure

```
client-task-manager/
├── app/
│   ├── auth/                    # Authentication pages
│   │   ├── login/page.tsx
│   │   ├── sign-up/page.tsx
│   │   └── ...
│   ├── protected/               # Task dashboard (protected route)
│   │   └── page.tsx
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css
├── components/
│   ├── task-list.tsx            # Main task list component
│   ├── task-form.tsx            # Create/Edit task form
│   ├── ui/                       # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   └── ...
│   ├── login-form.tsx
│   ├── sign-up-form.tsx
│   ├── logout-button.tsx
│   └── ...
├── lib/
│   ├── supabase/
│   │   ├── client.ts            # Client-side Supabase instance
│   │   └── server.ts            # Server-side Supabase instance
│   └── utils.ts
├── package.json
└── tailwind.config.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase project with `tasks` table created

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   
   Create a `.env.local` file (or update the existing one):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   ```

3. **Set up Supabase Table:**

   Create a `tasks` table in Supabase with the following schema:
   ```sql
   CREATE TABLE tasks (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     title TEXT NOT NULL,
     description TEXT,
     status TEXT NOT NULL DEFAULT 'pending',
     due_date TIMESTAMP,
     created_at TIMESTAMP NOT NULL DEFAULT NOW(),
     CONSTRAINT valid_status CHECK (status IN ('pending', 'in_progress', 'completed'))
   );

   CREATE INDEX tasks_user_id ON tasks(user_id);
   CREATE INDEX tasks_status ON tasks(status);
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### 1. **Sign Up**
   - Navigate to the home page
   - Click "Sign Up"
   - Enter your email and password
   - Create your account

### 2. **Login**
   - Enter your credentials on the login page
   - You'll be redirected to the task dashboard

### 3. **Create a Task**
   - Click the "Create Task" button
   - Fill in the task details:
     - **Title** (required)
     - **Description** (optional)
     - **Status** (Pending, In Progress, Completed)
     - **Due Date** (optional)
   - Click "Save Task"

### 4. **Edit a Task**
   - Click the edit icon (✏️) on any task
   - Modify the details
   - Click "Save Task"

### 5. **Delete a Task**
   - Click the delete icon (🗑️) on any task
   - Task is immediately removed

### 6. **Filter Tasks**
   - Use the "Filter by status" dropdown
   - Select: All Tasks, Pending, In Progress, or Completed
   - List updates automatically

### 7. **Logout**
   - Click the "Logout" button in the top right
   - You'll be redirected to the login page

## 🔒 Security Features

- **Supabase Row Level Security (RLS)**: Tasks are filtered by user_id
- **Protected Routes**: Dashboard requires authentication
- **Secure Authentication**: Passwords hashed with bcrypt by Supabase
- **Client & Server Clients**: Appropriate Supabase clients for each context

## 🎨 Component Details

### TaskList Component (`task-list.tsx`)
- Fetches user's tasks from Supabase
- Displays tasks in a card layout
- Handles task deletion
- Supports status filtering
- Shows task metadata (due date, status)

### TaskForm Component (`task-form.tsx`)
- Modal form for creating/editing tasks
- Form validation
- Status selection dropdown
- Due date picker
- Error handling and display

### UI Components (`components/ui/`)
- Built with Radix UI primitives
- Styled with Tailwind CSS
- Consistent design system
- Responsive and accessible

## 🔄 Data Flow

```
1. User logs in → Session created in Supabase
2. Navigate to /protected → Auth check via server component
3. TaskList loads → Fetches tasks for current user
4. User creates task → Task inserted with user_id
5. Supabase RLS ensures user can only see their tasks
6. Filter/Edit/Delete → Update reflected immediately
```

## 📱 Responsive Design

- Mobile-first approach with Tailwind CSS
- Touch-friendly buttons and forms
- Responsive grid layouts
- Readable on all screen sizes

## 🛠️ Built With

- **Next.js 15**: React framework with server components
- **Supabase**: Backend as a Service with PostgreSQL
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Headless UI components
- **Lucide React**: Icon library

## 📝 Notes

- Tasks are automatically sorted by creation date (newest first)
- Due dates are optional but recommended for task organization
- Status badges use color coding for quick identification
- All timestamps are stored in UTC

## 🐛 Troubleshooting

### Can't login?
- Verify email and password are correct
- Check that Supabase is configured with correct credentials
- Check `.env.local` has the correct values

### Tasks not showing?
- Ensure you're logged in
- Check that tasks table exists in Supabase
- Verify RLS policies are set up correctly

### Form won't submit?
- Ensure all required fields are filled
- Check browser console for error messages
- Verify Supabase credentials and table permissions

## 📄 License

Built as a task manager demonstration with Next.js and Supabase.
