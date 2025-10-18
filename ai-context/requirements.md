
# 🧠 XFitness Mobile App — Full Product Requirements Document (PRD)

---

## 🎯 1. Purpose

The **XFitness Mobile App** is the **member-facing companion** to the XFitness ecosystem.
It lets gym members:

* Manage and renew memberships
* Track workouts and attendance
* Receive updates and notifications
* Access the gym via facial recognition or QR
* Engage with personalized training and progress insights

Goal: Deliver a **seamless, data-synchronized** experience that connects users with their gym, trainer, and performance — built using **Expo (React Native)** for iOS + Android parity.

---

## 👥 2. User Roles

| Role                 | Description                      | Permissions                                               |
| -------------------- | -------------------------------- | --------------------------------------------------------- |
| **Member**           | Active or expired gym member     | Access dashboard, renew plans, log workouts, view history |
| **Trainer (Future)** | Personal coach linked to members | View assigned clients, upload routines                    |
| **Guest**            | Non-member visitor               | Browse plans, contact gym, sign up                        |

---

## 📱 3. Core App Features

---

### 🧍‍♂️ A. Authentication & Onboarding

**Purpose:** Secure access and smooth first-time experience.

**Requirements**

* Login via email + password (Supabase Auth)
* Sign-up with referral or manual registration
* Forgot password via Supabase `resetPasswordForEmail`
* JWT-based session persistence (`expo-secure-store`)
* Basic onboarding tutorial (3-4 slides)
* Future-proof for multi-gym membership

✅ **Screens**

* `/login`
* `/register`
* `/forgot-password`
* `/onboarding`

---

### 💳 B. Membership Management

**Purpose:** Central control for subscription lifecycle.

**Requirements**

* View active plan: name, price, duration, start + end date
* Renew via integrated payment (FPX / Stripe)
* Manual renewal request (status = pending)
* View invoices and payment history
* Auto-update member status when webhook confirms success

✅ **Screens**

* `/membership`
* `/membership/renew`
* `/payments`
* `/payment/:id`

---

### 🧠 C. Workout Tracking

**Purpose:** Track and visualize training performance.

**Requirements**

* Log workouts (exercise, sets, reps, weight, notes)
* View trainer-assigned or template plans
* Custom personal routines
* Progress graphs (weekly frequency, volume, or muscle group)
* AI coach (Phase 2): suggest next workout

✅ **Screens**

* `/workouts`
* `/workout/:id`
* `/progress`

---

### 🏋️ D. Attendance / Access Logs

**Purpose:** Display gym entry history from the door system.

**Requirements**

* Fetch from Supabase `access_logs`
* Show date/time, device, status (Granted / Denied)
* Filter by date range
* Show “last access” indicator on home screen
* Realtime sync via Supabase subscriptions

✅ **Screens**

* `/access-logs`

---

### 📅 E. Classes & Bookings (Phase 2)

**Purpose:** Enable booking of classes and sessions.

**Requirements**

* View upcoming classes (name, trainer, capacity)
* Book/cancel attendance
* Sync with calendar (optional)
* Prevent overbooking (capacity check in `class_enrollments`)

✅ **Screens**

* `/classes`
* `/classes/:id`
* `/bookings`

---

### 💬 F. Notifications & Announcements

**Purpose:** Keep members updated and engaged.

**Requirements**

* Push via **Firebase Cloud Messaging**
* Email fallback via SendGrid
* Notification inbox in-app
* Categories: Promotions / Renewal Alerts / Updates
* Device token registration stored in `device_tokens`

✅ **Screens**

* `/notifications`
* `/notifications/:id`

---

### 🧾 G. Profile & Settings

**Purpose:** Manage identity and preferences.

**Requirements**

* Edit name, avatar, phone, email
* Change password
* Upload face photo (for access)
* Notification toggle (push/email)
* Logout / delete account

✅ **Screens**

* `/profile`
* `/settings`

---

### 📈 H. Dashboard / Home

**Purpose:** Snapshot of fitness & membership state.

**Content**

* Greeting + membership status badge
* Renewal countdown
* Quick actions (Renew / Log Workout / Progress)
* Recent notifications
* Attendance streak summary

✅ **Screens**

* `/home` → primary route inside `(main)` stack

---

## 🌐 4. Integrations

| Function          | Service                       | Description                            |
| ----------------- | ----------------------------- | -------------------------------------- |
| **Auth & DB**     | Supabase                      | User, membership, and workout storage  |
| **Payments**      | Stripe / FPX                  | Secure checkout + webhook confirmation |
| **Facial Access** | ZKTeco → `/api/access/verify` | Door verification                      |
| **Notifications** | Firebase Cloud Messaging      | Push delivery                          |
| **Email**         | SendGrid                      | Transactional + promo emails           |
| **Analytics**     | PostHog / Amplitude           | Engagement tracking                    |

---

## 🧱 5. Backend API (Supabase Endpoints)

| Action           | Endpoint                  | Method | Description       |
| ---------------- | ------------------------- | ------ | ----------------- |
| Login            | `/api/auth/login`         | POST   | Authenticate user |
| Register         | `/api/auth/register`      | POST   | Create account    |
| Get Membership   | `/api/membership/:userId` | GET    | Fetch plan        |
| Renew Membership | `/api/membership/renew`   | POST   | Payment trigger   |
| Get Workouts     | `/api/workouts`           | GET    | Fetch logs        |
| Log Workout      | `/api/workouts`           | POST   | Create log        |
| Access Logs      | `/api/access/logs/:id`    | GET    | Member entries    |
| Notifications    | `/api/notifications`      | GET    | Fetch inbox       |
| Update Profile   | `/api/users/:id`          | PUT    | Edit profile      |

All APIs communicate through Supabase RPC or REST and must log activities for audit.

---

## 🔐 6. Security

* Supabase Auth (JWT) for all routes
* `expo-secure-store` for local tokens
* HTTPS + strict CORS
* RLS (Row-Level Security) → users modify only their data
* Encrypted storage for biometric templates
* Session timeout after inactivity

---

## 📊 7. User Dashboard Metrics

* Membership renewal countdown
* Attendance streak (e.g., “5 days in a row”)
* Weekly workout frequency
* Revenue contribution / points (gamified)
* Optional: calorie tracking / class rank

---

## 🎨 8. UX & Design Principles

* Atomic component design
* Consistent typography + spacing (Tailwind tokens)
* ≤ 3 taps to reach any core action
* Light / dark mode support
* Minimal forms; contextual actions
* Streaks + badges for motivation
* Optimistic UI updates (e.g., workout log saved instantly)

---

## 🧮 9. Data Model Overview

| Table               | Key Fields                                     | Purpose                  |
| ------------------- | ---------------------------------------------- | ------------------------ |
| `profiles`          | id, full_name, avatar_url                      | Member profile           |
| `members`           | user_id, plan_id, status, start_date, end_date | Membership state         |
| `membership_plans`  | id, name, price, duration                      | Subscription definitions |
| `payments`          | id, user_id, plan_id, amount, status           | Transactions             |
| `workouts`          | id, user_id, data(json), created_at            | Logged workouts          |
| `access_logs`       | id, user_id, timestamp, status                 | Entry records            |
| `notifications`     | id, title, body, type, created_at              | Messages                 |
| `device_tokens`     | user_id, token                                 | Push delivery            |
| `class_enrollments` | class_id, member_id                            | Bookings (Phase 2)       |

---

## ⚙️ 10. State Management Structure

```text
/store
  auth.ts        → user session + token
  profile.ts     → profile data
  membership.ts  → current plan + status
  workouts.ts    → logs + progress
  notifications.ts → inbox state
  ui.ts          → theme, modals
```

* **Zustand** for local stores
* **React Query** for server sync + caching
* Offline queue (future): store unsent workout logs

---

## 🧪 11. Testing & QA

* **Unit Tests** → components + hooks (Jest / React Native Testing Library)
* **Integration Tests** → auth & payment flow
* **Manual QA** → navigation, dark-mode, push notifications
* **Beta Testing** → Expo EAS / TestFlight / Play Store Beta

Acceptance Criteria:

1. User can register → purchase → enter gym.
2. Admin edits reflect in mobile within < 3 sec.
3. App stable under offline reconnection.

---

## 🧰 12. Tech Stack

| Layer         | Library                        | Notes               |
| ------------- | ------------------------------ | ------------------- |
| Framework     | **React Native (Expo SDK 52)** | Cross-platform core |
| Navigation    | **Expo Router v3**             | File-based          |
| State Mgmt    | **Zustand + React Query**      | Local + async sync  |
| Forms         | **react-hook-form + zod**      | Validation          |
| UI Library    | **NativeWind / Tailwind**      | Styling             |
| Charts        | **Victory Native / Recharts**  | Progress graphs     |
| Backend       | **Supabase**                   | Auth / DB / Storage |
| Payments      | **Stripe (FPX)**               | Secure renewals     |
| Notifications | **Firebase Cloud Messaging**   | Push service        |

---

## 📶 13. Offline & Performance Handling

* Cache last known data with React Query persistor
* Show skeleton loaders on cold start
* Background sync (EAS Task Manager) for workouts / logs
* Lazy-load non-critical screens
* Optimize images (Supabase Storage resizing)

---

## 🚀 14. Future Expansion

| Feature           | Description                      |
| ----------------- | -------------------------------- |
| In-App Chat       | Trainer ↔ Member messaging       |
| AI Coach          | Personalized recommendations     |
| Smart Watch Sync  | Apple Health / Google Fit import |
| Referral System   | Invite friends → points          |
| Social Feed       | Share progress publicly          |
| Multi-Gym Support | Switch between branches          |
| Streak Challenges | Weekly or monthly leaderboards   |

---

## ✅ 15. Success Metrics

| KPI                         | Target  |
| --------------------------- | ------- |
| Signup → Active Conversion  | ≥ 70 %  |
| Renewal Rate                | ≥ 60 %  |
| Avg Session Duration        | ≥ 5 min |
| Crash Rate                  | < 1 %   |
| Support Tickets / 100 Users | < 3     |

---

## 📖 16. Example User Journey

> **Aina** opens the XFitness App.
> Home shows: *“Membership expires in 5 days.”*
> She taps **Renew Now**, pays via FPX, and instantly sees status → **Active**.
> The same day she enters the gym; ZKTeco verifies her face and logs it.
> In the app, she checks her streak: 9 days active 🔥
> A push notification congratulates her — keeping her motivated and retained.

---

## 🧩 17. Summary

**XFitness App = Member Companion + Payment Portal + Progress Tracker**

**Core Flows:**
Auth → Membership → Payment → Access → Workout → Notifications

**Integrations:** Supabase / Stripe / Firebase / ZKTeco

**Phase 1 Goal:**
Functional parity with Admin Web + member self-service

**Phase 2 Goal:**
Full fitness + class ecosystem with AI guidance

---

This file is now ready to live at:

```
/ai_context/requirements.md
```

and can be fed directly to your AI build agents or used by human devs for implementation.
