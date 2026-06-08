# ConvictConnect Foundation Build (Features 1–5 + Bootstrap/Tailwind Hybrid)

This build implements:

1. Core Layout
2. Resource System
3. AI Assistant
4. Analytics Dashboard
5. Firebase Integration

Stack:
- Next.js 15
- React 19
- Tailwind CSS
- Bootstrap 5
- TypeScript
- Firebase
- Recharts
- shadcn/ui

---

# Install Bootstrap

```bash
npm install bootstrap react-bootstrap
```

---

# Update globals.css

File:

```plaintext
src/app/globals.css
```

Add:

```css
@import 'bootstrap/dist/css/bootstrap.min.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary: #2563eb;
  --accent: #14b8a6;
  --background: #f8fafc;
  --dark: #0f172a;
}

body {
  background: var(--background);
  color: #111827;
  overflow-x: hidden;
}

.glass-card {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(14px);
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.3);
  box-shadow: 0 10px 40px rgba(0,0,0,0.08);
}

.sidebar-gradient {
  background: linear-gradient(180deg,#0f172a,#1e293b);
}
```

---

# Create Layout

File:

```plaintext
src/app/layout.tsx
```

```tsx
import './globals.css'
import Sidebar from '@/components/navigation/Sidebar'
import Topbar from '@/components/navigation/Topbar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="d-flex min-vh-100">
          <Sidebar />

          <main className="flex-grow-1">
            <Topbar />

            <div className="container-fluid p-4">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}
```

---

# Create Homepage

File:

```plaintext
src/app/page.tsx
```

```tsx
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container py-5">
      <div className="glass-card p-5 text-center">
        <h1 className="display-4 fw-bold mb-4">
          Reconnect. Rebuild. Rise.
        </h1>

        <p className="lead mb-4">
          Find support resources, housing assistance,
          legal aid, employment opportunities,
          and community guidance.
        </p>

        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <Link href="/resources" className="btn btn-primary btn-lg">
            Explore Resources
          </Link>

          <Link href="/dashboard" className="btn btn-dark btn-lg">
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
```

---

# Create Sidebar

File:

```plaintext
src/components/navigation/Sidebar.tsx
```

```tsx
'use client'

import Link from 'next/link'

export default function Sidebar() {
  return (
    <aside
      className="sidebar-gradient text-white p-4"
      style={{ width: '280px' }}
    >
      <h2 className="fw-bold mb-5">ConvictConnect</h2>

      <nav className="d-flex flex-column gap-3">
        <Link href="/" className="btn btn-outline-light text-start">
          Home
        </Link>

        <Link href="/dashboard" className="btn btn-outline-light text-start">
          Dashboard
        </Link>

        <Link href="/resources" className="btn btn-outline-light text-start">
          Resources
        </Link>

        <Link href="/chatbot" className="btn btn-outline-light text-start">
          AI Assistant
        </Link>
      </nav>
    </aside>
  )
}
```

---

# Create Topbar

File:

```plaintext
src/components/navigation/Topbar.tsx
```

```tsx
export default function Topbar() {
  return (
    <div className="bg-white border-bottom p-3 d-flex justify-content-between align-items-center">
      <input
        type="text"
        className="form-control w-50"
        placeholder="Search resources, users, support..."
      />

      <div className="d-flex gap-3 align-items-center">
        <button className="btn btn-outline-primary">
          Notifications
        </button>

        <div className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center"
             style={{ width: 40, height: 40 }}>
          U
        </div>
      </div>
    </div>
  )
}
```

---

# Create Dashboard

File:

```plaintext
src/app/dashboard/page.tsx
```

```tsx
'use client'

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jan', users: 120 },
  { month: 'Feb', users: 180 },
  { month: 'Mar', users: 240 },
  { month: 'Apr', users: 350 },
  { month: 'May', users: 500 },
]

export default function DashboardPage() {
  return (
    <div>
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="glass-card p-4">
            <h2>1,248</h2>
            <p>People Helped</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4">
            <h2>328</h2>
            <p>Jobs Found</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4">
            <h2>196</h2>
            <p>Housing Placements</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="glass-card p-4">
            <h2>89%</h2>
            <p>Success Rate</p>
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <h3 className="mb-4">Community Growth</h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <Line type="monotone" dataKey="users" stroke="#2563eb" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
```

---

# Create Resource Search System

File:

```plaintext
src/app/resources/page.tsx
```

```tsx
'use client'

import { useState } from 'react'

const resources = [
  {
    name: 'Second Chance Housing',
    category: 'Housing',
    city: 'Denver',
  },
  {
    name: 'Fresh Start Employment',
    category: 'Jobs',
    city: 'Aurora',
  },
  {
    name: 'Community Legal Support',
    category: 'Legal Aid',
    city: 'Lakewood',
  },
]

export default function ResourcesPage() {
  const [query, setQuery] = useState('')

  const filtered = resources.filter((resource) =>
    resource.name.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div>
      <div className="glass-card p-4 mb-4">
        <h2 className="mb-4">Find Resources</h2>

        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search resources..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="row g-4">
        {filtered.map((resource, index) => (
          <div className="col-md-4" key={index}>
            <div className="glass-card p-4 h-100">
              <h4>{resource.name}</h4>
              <p>{resource.category}</p>
              <p>{resource.city}</p>

              <button className="btn btn-primary w-100">
                Get Help
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

# Create AI Assistant

File:

```plaintext
src/app/chatbot/page.tsx
```

```tsx
'use client'

import { useState } from 'react'

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'Hello. How can I help you today?',
    },
  ])

  const [input, setInput] = useState('')

  const sendMessage = () => {
    if (!input) return

    setMessages([
      ...messages,
      {
        role: 'user',
        text: input,
      },
      {
        role: 'assistant',
        text: 'I can help connect you with resources and support programs.',
      },
    ])

    setInput('')
  }

  return (
    <div className="glass-card p-4">
      <h2 className="mb-4">AI Support Assistant</h2>

      <div className="border rounded p-3 mb-3"
           style={{ height: 400, overflowY: 'auto' }}>

        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-3 ${
              message.role === 'user'
                ? 'text-end'
                : 'text-start'
            }`}
          >
            <div
              className={`d-inline-block p-3 rounded ${
                message.role === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-light'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex gap-2">
        <input
          type="text"
          className="form-control"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for help..."
        />

        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  )
}
```

---

# Firebase Integration

Install:

```bash
npm install firebase
```

---

# Create Firebase Config

File:

```plaintext
src/lib/firebase.ts
```

```ts
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
```

---

# Update .env.local

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

# Recommended Next Builds

1. Authentication System
2. User Profiles
3. Saved Resources
4. Resource Submission Portal
5. Real AI API Integration
6. Notifications
7. Interactive Maps
8. Admin Panel
9. Dark Mode
10. Mobile Navigation Drawer

---

# Run Project

```bash
npm run dev
```

Open:

```plaintext
http://localhost:3000
```

