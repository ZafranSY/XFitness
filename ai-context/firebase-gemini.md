
# 🧠 XFitness — Firebase Gemini Context Brain (Expo Mobile)

---

## Project Overview

**Name:** XFitness Mobile App
**Type:** Gym & Fitness Companion (Member-Facing, Expo Go)
**Mode:** UI-First / Mock-Backend (Firebase + AI Gemini)
**Goal:** Enable members to access membership, workouts, attendance, and notifications in a **fast, reliable, UI-first** experience before Supabase backend integration.

> Backend = **Supabase (Phase 2)**
> Firebase / Gemini = **UI dev + emulator + mock data only**

---

## 🔹 Core Tech Stack

| Layer            | Tool / Library                      | Notes                           |
| ---------------- | ----------------------------------- | ------------------------------- |
| Mobile Framework | React Native (Expo SDK 52+)         | Cross-platform                  |
| Navigation       | Expo Router (React Navigation 7)    | File-based, nested stacks       |
| State Mgmt       | Zustand                             | Simple, predictable, mock-first |
| Forms            | react-hook-form + zod               | Validation & schema enforcement |
| Styling          | Tailwind (NativeWind)               | Utility-first + responsive      |
| Charts           | Victory Native / Recharts           | Progress visualization          |
| Auth & Backend   | Supabase (Phase 2)                  | JWT, real-time DB, storage      |
| Payments         | Stripe (FPX)                        | Webhook simulation in dev       |
| Notifications    | Firebase Cloud Messaging + SendGrid | Push / Email mock               |
| Face Access      | ZKTeco (emulated)                   | Logs mocked locally             |
| Testing          | Jest + RNTL                         | Unit + integration              |
| Build & Deploy   | Expo EAS + OTA                      | Fast iteration                  |

---

## 🔹 Design Philosophy

* **Atomic Design:** Atoms → Molecules → Organisms → Screens → Pages
* **Expo-First Thinking:** Managed workflow wherever possible
* **Minimal Dependencies:** Only stable, Expo-compatible packages
* **Offline Resilience:** Cache memberships, workouts, access logs
* **Fast Perceived Performance:** Skeleton screens + lazy loading
* **Human-Centered UX:** Streaks, progress bars, motivating visuals

---

## 🔹 Folder Structure (Expo Managed)

```
/xfitness-app/
│
├── app/                     # Expo Router root
│   ├── (auth)/              # Login, Register, Onboarding
│   ├── (tabs)/              # Home, Membership, Workouts, Notifications, Profile
│   └── (main)/              # Dashboard flows / nested screens
│
├── components/
│   ├── ui/                  # Buttons, Cards, Inputs
│   ├── cards/               # Reusable UI cards
│   └── modals/              # Popups, alerts
│
├── hooks/                   # Custom hooks (mock & real)
│   ├── useMockAuth.ts
│   ├── useMembership.ts
│   ├── useAccessLogs.ts
│
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── stripe.ts            # Payment simulation
│   ├── notifications.ts     # Push/email mocks
│   └── api.ts               # API abstraction layer
│
├── store/                   # Zustand stores
│   ├── useUserStore.ts
│   ├── useWorkoutStore.ts
│
├── assets/
│   ├── fonts/
│   └── images/
│
├── utils/
│   ├── formatDate.ts
│   └── constants.ts
│
└── ai_context/
    ├── claude.md
    ├── firebase-gemini.md   # This file
    ├── requirements.md
    ├── design-system.md
    └── ai-layer.md
```

---

## 🔹 File & Naming Conventions

| Type       | Format          | Example                       |
| ---------- | --------------- | ----------------------------- |
| Components | PascalCase      | MemberCard.tsx                |
| Hooks      | camelCase       | useMembershipStatus.ts        |
| Screens    | PascalCase      | MembershipScreen.tsx          |
| Stores     | use*Store.ts    | useWorkoutStore.ts            |
| API Routes | RESTful, plural | /api/payments, /api/users/:id |
| Folders    | lowercase       | /screens, /hooks, /lib        |

---

## 🔹 Mocking & UI-First Rules

* **Use mock hooks** until Supabase backend is integrated
* **Local state only** for interactions (workouts, memberships, access logs)
* **Firebase / Gemini** = dev emulator / UI mock; do not push production data
* **AI-driven suggestions**: Generate placeholder text, stats, and streaks
* **Maintain 70% code / 30% explanation** for clarity in mock logic

**Example: useMockAuth.ts**

```ts
export const useMockAuth = () => ({
  signInWithGoogle: async () => Promise.resolve({ user: { name: 'Demo User' } }),
  signInWithEmail: async () => Promise.resolve({ user: { name: 'Demo Email User' } }),
  signOut: async () => Promise.resolve(),
  currentUser: { name: 'Demo User' },
});
```

---

## 🔹 AI Behavior Rules

1. **Design Conflicts:** `/ai_context/design-system.md` is authoritative
2. **Architecture Conflicts:** `firebase-gemini.md` wins
3. **Backend Assumption:** Supabase is default for real integration
4. **API Undefined:** Use mock data or fake hooks
5. **New Files:** Include header comment with purpose + dependencies
6. **Maintain Layered Approach:** UI → State → Mock API → AI hints

---

## 🔹 Example Prompt

> “Add a new `/app/(auth)/onboarding` screen introducing XFitness features.
> Use Expo Router and match design-system.md theme.
> Include Google + Email mock auth buttons (useMockAuth).
> Follow firebase-gemini.md architecture.”

---

## 🔹 Future Supabase Integration Notes

* Replace `useMockAuth` → `useSupabaseAuth`
* Replace fake API calls → `lib/api.ts` + Supabase RPC / REST
* Migrate local state → sync with real-time Supabase stores
* Implement payment & access logs webhook handling
* Push notifications → Firebase → real member tokens

---

## 🔹 Coding Standards

* TypeScript only, no `any`
* Functional components + `React.memo` for lists
* zod schemas for API responses
* Expo-compatible packages only
* Always include type + interface for props

---

## 🔹 Testing Convention

* Unit tests → `/__tests__/`
* Test filename = `ComponentName.test.tsx`
* Coverage focus: Auth, memberships, workouts, access logs

---

## 🔹 Version Control & Deployment

* GitHub with Conventional Commits (`feat:`, `fix:`, `chore:`)
* Feature branches: `feature/workout-logging`
* Expo EAS CI → OTA updates for dev & beta
* Preflight: Lint + Typecheck + Tests

---

✅ **Summary**

**Firebase Gemini** = UI-first brain for XFitness Expo Mobile App

* Provides **mock data & AI-driven placeholders**
* Guides **folder structure, naming, hooks, and component usage**
* Ensures **UI-first development** before Supabase backend
* Supports **future-proof integration** with real API endpoints, payments, and notifications

\