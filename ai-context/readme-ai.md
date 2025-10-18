# AI Collaboration Guide for XFitness Mobile App

This document outlines how to effectively collaborate with AI assistants (like Gemini, Claude, Cursor AI) for developing the XFitness mobile application using Expo SDK 52.

## 🎯 Primary Goal

Leverage AI to accelerate development while ensuring code quality, consistency, and adherence to the project's architecture and design system.

## 📚 Core Context Files

AI assistants should primarily rely on these files within the `/ai_context/` directory:

1.  **`claude.md` (or `firebase-gemini.md`):** Defines the **core architecture**, tech stack (Expo SDK 52, Zustand, Supabase, Expo Router, etc.), folder structure, naming conventions, and common Expo patterns/fixes. **This is the foundational document.**
2.  **`design-system.md`:** Specifies the **visual guidelines**, color tokens (light/dark modes derived from the Admin Web App's CSS), spacing, typography, component styles, and accessibility rules. Mapped from the web `globals.css`.
3.  **`requirements.md`:** Outlines the **functional requirements** of the app (Authentication, Membership Management, Workout Tracking, Access Logs, Notifications, etc.). Defines *what* the app should do.
4.  **`project_audit.md`:** A snapshot summary of the project's current state, including diagnosed issues, fixes applied, dependency status, and configuration notes. (This file can be periodically updated).
5.  **`readme-ai.md` (This file):** Explains how to interact with the AI, the expected workflow, and how context files are prioritized.

## ⚙️ AI Workflow & Prompting Strategy

1.  **Provide Context:** Always start prompts by instructing the AI to adhere to the rules defined in the `/ai_context/` files, especially `claude.md` and `design-system.md`.
    * *Example:* "Using the context from `/ai_context/claude.md` and `/ai_context/design-system.md`, create a new screen..."
2.  **Specify the Goal:** Clearly state the task, mentioning the target file path and the specific feature from `requirements.md` being implemented.
    * *Example:* "...create the Membership Renewal screen at `app/(main)/membership/renew.tsx`. It should allow users to select a plan and proceed to payment (mock payment for now), as per section 3.B in `requirements.md`."
3.  **Mention UI-First Mode (if applicable):** Remind the AI that backend integration (Supabase) is deferred. Request mock data, handlers, or hooks (`useMockAuth`, etc.) for UI development.
    * *Example:* "Implement this screen in UI-First mode. Use mock data for membership plans and a simple `Alert.alert` for the payment action."
4.  **Iterative Development:** Break down complex features into smaller, manageable screens or components. Prompt for one piece at a time.
5.  **Code Review:** After generation, review the code for:
    * **Correct Imports:** Ensure all imports resolve.
    * **Expo SDK 52 Compatibility:** Check for deprecated APIs or patterns.
    * **Style Adherence:** Verify usage of design tokens and Tailwind classes from `design-system.md`.
    * **Naming Conventions:** Confirm file, component, and hook names follow `claude.md`.
    * **Functionality:** Does it meet the specified requirement?
6.  **Refinement:** Provide feedback to the AI for corrections or improvements based on the review. Be specific about what needs changing and reference the context files.
    * *Example:* "The button color doesn't match `design-system.md`. It should use the `bg-primary` token. Please update the code."

## ⚠️ Context Priority & Conflict Resolution

-   **Architecture/Structure:** `claude.md` (or `firebase-gemini.md`) is the highest authority.
-   **Visuals/Styling:** `design-system.md` is the source of truth.
-   **Functionality:** `requirements.md` defines the features.
-   **Current State:** `project_audit.md` provides recent context on issues/fixes.

If the AI produces code conflicting with these documents, correct it by referencing the specific rule or token from the relevant `.md` file.

## ✨ Tips for Better AI Collaboration

-   **Be Explicit:** Clearly state assumptions (e.g., "Assume user is logged in," "Use mock data").
-   **Reference Specific Files:** Mention exact file paths (`app/(main)/_layout.tsx`) when asking for modifications.
-   **Provide Code Snippets:** Include existing code snippets if asking the AI to modify or build upon them.
-   **Request Explanations:** Ask the AI *why* it chose a particular approach if needed.
-   **Keep Prompts Focused:** Avoid asking for too many unrelated things in a single prompt.