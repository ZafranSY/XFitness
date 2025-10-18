Project Overview

Name: XFitness
Type: Gym & Fitness Management Ecosystem (Admin Web + Member Mobile)
Tech Focus: React Native + Expo SDK 52 (Mobile), Next.js + Supabase (Admin Web)
Goal: Simplify gym operations, automate memberships, payments, attendance, and notifications with real-time sync between hardware (facial recognition), web admin, and mobile apps.

🔹 Core Tech Stack
Layer	Tool / Library	Notes
Mobile App Framework	React Native (Expo SDK 52+)	Cross-platform
Navigation	Expo Router (React Navigation 7)	File-based routing
State Mgmt	Zustand	Simple, predictable state
Forms	react-hook-form + zod	Validation layer
Styling	Tailwind (NativeWind)	Utility-first consistency
Charts	Victory Native / Recharts	Progress visualization
Auth & Backend	Supabase	JWT auth, Realtime DB, Storage
Payments	Stripe (FPX)	Webhook integration
Notifications	Firebase Cloud Messaging + SendGrid	Push & Email
Face Access Sync	ZKTeco via Cams Biometric Web API	Door entry integration
Testing	Jest + React Native Testing Library	Unit + integration
Build & Deploy	Expo EAS + OTA updates	Continuous delivery
🔹 Design Philosophy

Atomic Design (Brad Frost, 2016): Build components as atoms → molecules → organisms → templates → pages.

Minimal Dependencies: Only add libraries with long-term support and Expo compatibility.

Expo-First Thinking: Prefer managed workflow unless native modules are unavoidable.

Offline Resilience: Local caching for memberships, access logs, and workouts.

Fast Perceived Performance: Skeleton screens + lazy loading over spinners.

Human-Centered UX: Progress visibility (streaks, stats) over raw data.

🔹 Common Expo Fixes & Workarounds

Expo Go crashing on Reanimated: Lock react-native-reanimated version to SDK’s supported minor version.

Slow bundler on Windows: Use EXPO_USE_METRO_WORKSPACE=1.

Image picker permissions: Always wrap in await ImagePicker.requestMediaLibraryPermissionsAsync().

Push Notifications not delivered: Ensure expo-notifications config matches Firebase sender ID in app.json.

Font loading issues: Use useFonts() hook and wait for font load before rendering app root.

🔹 Naming Conventions
Type	Format	Example
Components	PascalCase	MemberCard.tsx
Hooks	camelCase	useMembershipStatus.ts
Files	kebab-case	payment-summary.tsx
Screens	PascalCase	MembershipScreen.tsx
State Stores	suffix Store	useUserStore.ts
API Routes	RESTful, plural	/api/payments, /api/users/:id
Folders	lowercase	/screens, /hooks, /lib, /components
🔹 Folder Structure (Expo Managed)
/xfitness-app/
│
├── app/                      # Expo Router root
│   ├── (auth)/login.tsx
│   ├── (auth)/register.tsx
│   ├── (tabs)/home.tsx
│   ├── (tabs)/membership.tsx
│   ├── (tabs)/workouts.tsx
│   ├── (tabs)/notifications.tsx
│   └── (tabs)/profile.tsx
│
├── components/
│   ├── ui/
│   ├── cards/
│   └── modals/
│
├── hooks/
│   ├── useAuth.ts
│   ├── useMembership.ts
│   ├── useAccessLogs.ts
│
├── lib/
│   ├── supabase.ts
│   ├── stripe.ts
│   ├── notifications.ts
│   └── api.ts
│
├── store/
│   ├── useUserStore.ts
│   ├── useWorkoutStore.ts
│
├── assets/
│   ├── fonts/
│   ├── images/
│
├── utils/
│   ├── formatDate.ts
│   └── constants.ts
│
└── ai_context/
    ├── claude.md
    ├── requirements.md
    ├── readme-ai.md
    └── context.pdf

🔹 Coding Standards

Use TypeScript everywhere.

Always type API responses with zod schemas.

Avoid any types.

Functional components only; no class components.

Use React.memo for heavy lists (FlatList).

Stick to Expo-compatible packages (no raw native modules).

🔹 Testing Convention

Unit tests in /__tests__/

Filename pattern: ComponentName.test.tsx

Coverage for auth, payments, and access sync.

🔹 Version Control

Use GitHub + Conventional Commits (feat:, fix:, chore:).

Use feature branches (feature/workout-logging).

Auto-deploy with Expo EAS + CI.

XFitness — Firebase Gemini Context Brain

## Project Mode
> UI-First Mode: Focus on complete user-facing screens and navigation before backend integration.

Backend = **Supabase (Phase 2)**
Firebase = **Dev environment for UI testing** only (mock storage, emulator UI, etc.)

---

## 1. Tech Stack

- React Native + Expo SDK 52  
- TypeScript  
- Expo Router for navigation  
- Zustand for state management  
- React Hook Form for input handling  
- Tailwind (via NativeWind) for styling  
- Design system from `/ai_context/design-system.md`

---

## 2. Folder Structure

app/
(auth)/ → Login, Register, Onboarding
(main)/ → Dashboard, Profile, etc.
components/ → Reusable UI components
hooks/ → Custom hooks (e.g., useMockAuth)
lib/ → Utilities (theme, config)
store/ → Zustand stores
styles/ → Tailwind + theme integration
ai_context/
firebase-gemini.md → Core architecture & AI brain
design-system.md → Theme, color tokens
requirements.md → Functional spec
ai-layer.md → Behavior rules & conflict resolution

yaml
Copy code

---

## 3. File Naming & Conventions

- Components → `PascalCase`
- Hooks → `useCamelCase`
- Screens → `index.tsx` inside folders (Expo Router style)
- Zustand stores → end with `Store.ts`
- Types → in `/types/` folder, suffixed with `.d.ts`
- Mock data files → `_mock.ts` prefix

---

## 4. Design Rules

- Follow `/ai_context/design-system.md` for colors, radius, and spacing.
- Use `ThemeProvider` to sync dark/light mode.
- Reuse UI components (e.g., Button, Card, Input) consistently.
- Animations via `react-native-reanimated` and `moti`.

---

## 5. Mocking Logic (UI-Only Mode)

Use temporary placeholders for all backend interactions.

```ts
// hooks/useMockAuth.ts
export const useMockAuth = () => ({
  signInWithGoogle: async () => Promise.resolve({ user: { name: 'Demo User' } }),
  signInWithEmail: async () => Promise.resolve({ user: { name: 'Demo Email User' } }),
  signOut: async () => Promise.resolve(),
  currentUser: { name: 'Demo User' },
});
6. AI Behavior Rules
If claude.md is missing, treat firebase-gemini.md as primary context.

When conflicts arise:

Design → design-system.md is the truth.

Architecture → firebase-gemini.md wins.

Backend → always assume Supabase unless told otherwise.

Use mock data or fake hooks when API endpoints are undefined.

Maintain 70% code / 30% explanation ratio.

When creating new files, include a header comment with purpose and dependencies.

7. Example Prompt You Can Give
“Add a new /app/(auth)/onboarding screen that introduces XFitness features.
Use Expo Router and match theme from design-system.md.
Include Google + Email mock auth buttons (useMockAuth).
Follow firebase-gemini.md architecture.”

8. Future Integration Notes (Supabase Phase)
When backend integration starts:

Replace useMockAuth with real useSupabaseAuth.

Replace mock state with @supabase/supabase-js client hooks.

Migrate all fake API calls to lib/api/ directory.

