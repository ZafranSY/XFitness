# XFitness AI Context & Architecture (claude.md)

## Project Overview

-   **Name:** XFitness
-   **Type:** Gym & Fitness Management Ecosystem (Admin Web + Member Mobile)
-   **Tech Focus:** React Native + Expo SDK 54 (Mobile), Next.js + Supabase (Admin Web)
-   **Goal:** Simplify gym operations, automate memberships, payments, attendance, and notifications with real-time sync.

## 🔹 1. Core Tech Stack (Mobile App)

| Layer                  | Tool / Library                    | Notes                      |
| :--------------------- | :-------------------------------- | :------------------------- |
| Mobile App Framework | **React Native (Expo SDK 52+)** | Cross-platform             |
| Navigation             | **Expo Router (v3)** | File-based routing         |
| State Mgmt             | **Zustand** | Simple, predictable state  |
| Forms                  | **react-hook-form + zod** | Validation layer           |
| Styling                | **Tailwind (via NativeWind)** | Utility-first consistency  |
| Charts                 | **Victory Native / Recharts** | Progress visualization     |
| Auth & Backend         | **Supabase** | JWT auth, DB, Storage      |
| Payments               | **Stripe (FPX)** | Webhook integration        |
| Notifications          | **Firebase Cloud Messaging** | Push Notifications         |
| Email Notifications    | **SendGrid** | Email Fallback             |
| Face Access Sync       | ZKTeco via Cams Biometric Web API | Door entry integration     |
| Testing                | Jest + RNTL                       | Unit + integration         |
| Build & Deploy         | **Expo EAS + OTA updates** | Continuous delivery        |

*Note: Firebase is used for Push Notifications (FCM) but Supabase is the primary backend.*

## 🔹 2. Design Philosophy

-   **Atomic Design:** Build UI from small atoms to complex pages.
-   **Minimal Dependencies:** Prioritize Expo-compatible & maintained libraries.
-   **Expo-First:** Use managed workflow features where possible.
-   **Offline Resilience:** Cache essential data locally.
-   **Fast Perceived Performance:** Use loading states effectively.
-   **Human-Centered UX:** Emphasize progress and clarity.

## 🔹 3. Common Expo Patterns & Fixes

-   **Reanimated Issues:** Ensure `react-native-reanimated` version matches SDK compatibility. Check Babel plugin setup (`plugins: ['react-native-reanimated/plugin']` in `babel.config.js`).
-   **Slow Bundler:** Use `EXPO_USE_METRO_WORKSPACE=1` if needed.
-   **Permissions:** Always request permissions asynchronously (`await ...PermissionsAsync()`).
-   **Push Notifications:** Double-check `app.json` config against FCM setup. Use `expo-notifications`.
-   **Font Loading:** Use `useFonts` hook from `expo-font` and conditional rendering.

## 🔹 4. Naming Conventions

| Type         | Format        | Example                   |
| :----------- | :------------ | :------------------------ |
| Components   | `PascalCase`  | `MemberCard.tsx`          |
| Hooks        | `useCamelCase`| `useMembershipStatus.ts`  |
| Files        | `kebab-case`  | `payment-summary.tsx`     |
| Screens      | `PascalCase`  | `MembershipScreen.tsx` (or folder index) |
| State Stores | suffix `Store`| `useUserStore.ts`         |
| API Routes   | RESTful       | `/api/payments`           |
| Folders      | `lowercase`   | `/screens`, `/hooks`      |

## 🔹 5. Folder Structure (Expo Managed)
xfitness-app/ 
│ ├── app/ # Expo Router root (Primary Focus)
│ ├── (auth)/ # Authentication screens 
│ ├── (main)/ # Main app screens (Tabs/Stack) 
│ ├── _layout.tsx # Root layout 
│ └── index.tsx # Initial loading/redirect screen 
│ ├── components/ # Reusable UI components (atoms, molecules) 
│ ├── ui/ # Basic UI elements (Button, Input) 
│ └── specific/ # Feature-specific components (WorkoutCard) 
│ ├── hooks/ # Custom React hooks 
│ ├── lib/ # Core logic, API clients, utils 
│ ├── supabase.ts # Supabase client setup 
│ ├── api.ts # API interaction functions 
│ └── utils.ts # General utility functions 
│ ├── store/ # Zustand state stores 
│ ├── assets/ # Static assets (fonts, images) 
│ ├── constants/ # Theme, styles, constant values 
│ └── types/ # Global TypeScript types └── global.ts


## 🔹 6. Coding Standards

-   **TypeScript:** Mandatory for all code. Use strict mode.
-   **API Types:** Define types/interfaces for all API data. Consider Zod for validation.
-   **No `any`:** Avoid using the `any` type.
-   **Functional Components:** Use function components and hooks exclusively.
-   **Performance:** Use `React.memo`, `useCallback`, `useMemo` where appropriate, especially in lists.
-   **Expo Compatibility:** Ensure all added packages work within the Expo ecosystem.

## 🔹 7. Testing Convention

-   **Location:** Place test files adjacent to the component/hook (`Component.test.tsx`) or in a `__tests__` directory.
-   **Tools:** Jest and React Native Testing Library.
-   **Focus:** Core logic (auth, payments, state changes), UI rendering, and navigation.

## 🔹 8. AI Collaboration Mode

-   **UI-First:** Focus on building screens and UI flows using mock data initially.
-   **Backend Later:** Supabase integration will replace mocks in a subsequent phase.
-   **Context:** Refer to `design-system.md` for styling and `requirements.md` for features.