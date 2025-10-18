# 🧠 XFitness Mobile App — Full Product Requirements Document (PRD)

---

## 🎯 1. Purpose

The **XFitness Mobile App** is the **member-facing** companion to the XFitness Admin Web System.
Its purpose is to let gym members:

* Manage memberships and renewals
* Track workouts and attendance
* Receive notifications and updates
* Access the gym via facial recognition
* Engage with personalized fitness plans and progress

Goal: A seamless, all-in-one mobile experience that connects users with their gym, coach, and data — powered by Expo (React Native) for cross-platform speed and maintainability.

---

## 👥 2. User Roles

| Role                   | Description                                  | Permissions                                                      |
| ---------------------- | -------------------------------------------- | ---------------------------------------------------------------- |
| **Member (User)** | Regular gym-goer with active or expired plan | Access personal dashboard, check-in history, plans, and payments |
| **Trainer (Optional)** | Assigned coach for members                   | View clients’ progress, upload workout routines                  |
| **Guest (Visitor)** | Not yet a member                             | Limited app use (browse plans, contact gym, register)            |

---

## 📱 3. Core App Features

---

### 🧍‍♂️ A. Authentication & Onboarding

**Purpose:** Allow members to register, log in, and connect to the gym system securely.

**Requirements:**

* Login via email/password or phone OTP
* Sign-up via referral code or manual registration
* Forgot password (email/OTP reset)
* Session persistence (JWT token)
* Multi-gym support (future-proof: join multiple gyms)

✅ **Screens:**

* `/login`
* `/register`
* `/forgot-password`
* `/onboarding` (tutorial slides)

---

### 💳 B. Membership Management

**Purpose:** Manage and renew gym subscriptions easily.

**Requirements:**

* Display current membership plan (type, price, start/end date, status)
* Renew membership (FPX/Stripe payment)
* Manual renewal option (e.g., pay at counter → admin approves)
* Purchase new plan if expired
* Payment history list with invoice details

✅ **Screens:**

* `/membership`
* `/membership/renew`
* `/payments`
* `/payment/:id`

---

### 🧠 C. Workout Tracking (Fitness Features)

**Purpose:** Enable users to plan, log, and review workouts.

**Requirements:**

* Daily workout log (exercise name, sets, reps, weight, notes)
* Predefined workout plans by trainers
* Custom routines
* Progress graph (by body part, weight lifted, frequency)
* Optional AI-coach mode (recommend next workout)

✅ **Screens:**

* `/workouts`
* `/workout/:id`
* `/progress`

---

### 🏋️ D. Attendance / Access Logs (via Facial Recognition)

**Purpose:** Show users their check-in history from gym entry logs.

**Requirements:**

* Sync data from Admin’s ZKTeco middleware API
* Show log of date/time of entries
* Filter by week/month
* Show access status (Granted/Denied)
* Optional real-time “last seen” update

✅ **Screens:**

* `/access-logs`

---

### 📅 E. Classes & Bookings (Optional but valuable)

**Purpose:** Let users book gym classes, PT sessions, or workshops.

**Requirements:**

* View available classes by date/time
* Book or cancel spots
* Show trainer, duration, price (if any)
* Sync bookings to calendar

✅ **Screens:**

* `/classes`
* `/classes/:id`
* `/bookings`

---

### 💬 F. Notifications & Announcements

**Purpose:** Keep members informed about promos, updates, and reminders.

**Requirements:**

* Push notifications (Firebase Cloud Messaging)
* Email fallback (SendGrid)
* Notification inbox in-app
* Categories: Promotions, Expiry Alerts, Gym Updates

✅ **Screens:**

* `/notifications`
* `/notifications/:id`

---

### 🧾 G. Profile & Settings

**Purpose:** Manage personal data and preferences.

**Requirements:**

* View/edit name, email, phone, avatar
* Manage password
* Upload facial recognition photo (for access system)
* Set notification preferences (push/email toggle)
* Logout

✅ **Screens:**

* `/profile`
* `/settings`

---

### 📈 H. Dashboard / Home Overview

**Purpose:** Quick overview of user’s current gym status and actions.

**Contents:**

* Greeting + membership status (Active / Expired / Pending)
* Quick buttons: Renew Membership, Log Workout, View Progress
* Recent notifications
* Attendance summary

✅ **Screens:**

* `/home` (Assuming this maps to `app/(main)/dashboard.tsx` or similar)

---

## 🌐 4. Integrations

| Function                | Integration                       | Notes                                    |
| ----------------------- | --------------------------------- | ---------------------------------------- |
| **Auth & Database** | Supabase                          | Secure member data storage               |
| **Payments** | Stripe (FPX)                      | Webhook → syncs membership automatically |
| **Facial Recognition** | ZKTeco via Cams Biometric Web API | Syncs access logs                        |
| **Push Notifications** | Firebase Cloud Messaging          | For all app alerts                       |
| **Email Notifications** | SendGrid                          | For receipts & promotions                |
| **Analytics** | PostHog or Amplitude              | User behavior insights                   |

---

## 🧱 5. Backend API (Key Endpoints - Conceptual)

*These represent interactions with the Supabase backend, to be implemented later.*

| Function          | Endpoint                   | Method | Description           |
| ----------------- | -------------------------- | ------ | --------------------- |
| Login             | `/api/auth/login`          | POST   | Member login          |
| Register          | `/api/auth/register`       | POST   | New member signup     |
| Get Membership    | `/api/membership/:id`      | GET    | Fetch plan details    |
| Renew Membership  | `/api/membership/renew`    | POST   | FPX/Stripe payment    |
| Get Workouts      | `/api/workouts`            | GET    | Fetch user workouts   |
| Add Workout Log   | `/api/workouts/log`        | POST   | Log completed workout |
| Get Access Logs   | `/api/access/logs/:userId` | GET    | Fetch gym entries     |
| Get Notifications | `/api/notifications`       | GET    | Pull messages         |
| Update Profile    | `/api/users/:id`           | PUT    | Edit personal info    |

---

## 🔐 6. Security Requirements

* JWT authentication for all Supabase interactions.
* Secure local storage for tokens (e.g., `expo-secure-store`).
* OTP/email verification for registration via Supabase Auth.
* Row Level Security (RLS) policies in Supabase for data access.
* Encrypted API communication (HTTPS).
* Protect sensitive data like facial recognition vectors.

---

## 📊 7. Dashboard Metrics (User-Facing)

* Membership status timeline (renewal countdown).
* Attendance streaks.
* Workout frequency/streak graph.
* Optional: Calories burned (if integrated).
* Optional: Class attendance leaderboard.

---

## 🧩 8. UX Principles

* Fast, frictionless interactions.
* Minimal navigation depth (≤3 taps to core actions).
* Dark/light mode support (use `useColorScheme` and theme constants).
* Focus on **progress visibility**.
* Subtle gamification (streaks, milestones).

---

## 🧪 9. Testing & QA

* Unit tests (Jest + RNTL) for components, hooks, utils.
* Integration tests for auth flow, payment simulation.
* Manual testing for UI/UX, navigation, platform consistency.
* Beta testing via Expo EAS (TestFlight / Play Store Beta).

---

## 🧰 10. Tech Stack (Reiteration)

| Layer         | Choice                          | Notes                  |
| ------------- | ------------------------------- | ---------------------- |
| Frontend      | **React Native (Expo SDK 52+)** | Cross-platform build   |
| State Mgmt    | **Zustand** | Lightweight            |
| Navigation    | **Expo Router** | File-based             |
| Forms         | **react-hook-form + zod** | Validation             |
| Backend       | **Supabase** | Auth, DB, Storage      |
| Payments      | **Stripe (FPX)** | Webhook integration    |
| Notifications | **Firebase Cloud Messaging** | Push delivery          |
| Charts        | **Victory Native / Recharts** | Progress visualization |

---

## 🚀 11. Future Expansion

| Feature           | Description                           |
| ----------------- | ------------------------------------- |
| In-App Chat       | Trainer ↔ Member messaging            |
| AI Coach          | Suggest workouts based on past logs   |
| Smart Watch Sync  | Apple Health / Google Fit data import |
| Referral System   | Invite friends → reward points        |
| Social Feed       | Members share workouts / milestones   |
| Multi-Gym Support | Switch between partner gyms           |

---

## ✅ 12. Success Metrics

| Metric                              | Target     |
| ----------------------------------- | ---------- |
| Onboarding → Active User Conversion | ≥ 70%      |
| Membership Renewal Rate             | ≥ 60%      |
| Average Session Duration            | 5+ minutes |
| App Crash Rate                      | < 1%       |
| Support Tickets / 100 Users         | < 3        |

---

### 💡 Real-World Example

> A member named Aina opens the XFitness app.
> The home screen shows her membership expires in 5 days, workout streak (8 days), and “Renew Now” button.
> She taps “Renew”, pays via FPX, gets instant confirmation, and receives a push + email receipt.
> Later that day, she enters the gym — her face scan logs automatically sync to `/access-logs` in the app.
> She views her streak growing and feels rewarded → higher retention.

---

## 🧩 Summary

**XFitness App** = Member Companion + Payment Portal + Progress Tracker
**Core Flows:** Auth → Membership → Payment → Access → Progress → Notifications
**Integrations:** Supabase + Stripe + Firebase (FCM) + ZKTeco
**Goal:** Empower members, automate renewals, connect data seamlessly.

---