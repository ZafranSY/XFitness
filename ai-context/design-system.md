Purpose

To ensure that all AI-generated UI code for the XFitness Mobile App (Expo) follows the visual system and theme logic of the Admin Web App — preserving brand parity, tone, and usability.

This file acts as your AI-readable style guide for mobile builds.

🔹 1. Core Philosophy

System Parity: Mobile and Web share the same brand DNA — spacing, colors, motion, and tone.

Expo Native = Web Parity: When the AI builds a new screen, it uses Expo + Tailwind RN with color tokens and spacing from this CSS spec.

Design Minimalism: Prefer clarity and calm whitespace over decoration.

Responsive Mindset: Use padding, rounded corners, and consistent spacing rather than arbitrary pixel values.

🔹 2. Mobile Design Tokens (Mapped from Admin CSS)
🎨 Color Tokens (Light Mode)
Token	Mobile Usage	Source
bg-background	App background	--background
text-foreground	Default text	--foreground
bg-card	Card surfaces	--card
text-card-foreground	Card text	--card-foreground
bg-primary	Buttons, CTAs	--primary
text-primary-foreground	CTA text	--primary-foreground
bg-secondary	Secondary buttons	--secondary
text-secondary-foreground	Secondary text	--secondary-foreground
border-border	Borders & dividers	--border
ring-ring	Focus outlines	--ring
bg-destructive	Error states	--destructive
🌒 Dark Mode Equivalents

AI should apply .dark variant mapping automatically:

Background → oklch(0.145 0 0)

Foreground → oklch(0.985 0 0)

Primary → oklch(0.985 0 0)

Border/Input → oklch(0.269 0 0)

Use Tailwind’s dark: syntax or Zustand theme switcher for React Native.

🔹 3. Layout + Spacing Rules
Element	Rule
Screen Padding	p-4 (mobile)
Card Padding	p-3 md:p-4
Spacing Unit	4px baseline grid
Corner Radius	use rounded-lg (≈ --radius-md)
Shadows	soft ambient: shadow-md or shadow-sm
Component Gap	gap-2 to gap-4 (depending on density)
🔹 4. Typography Rules
Text Type	Tailwind Class	Use Case
Title	text-xl font-bold	Screen headers
Subtitle	text-base text-muted-foreground	Section labels
Body	text-sm text-foreground	Default text
Caption	text-xs text-muted-foreground	Meta info
Button	text-sm font-semibold text-primary-foreground	Buttons

Font Family:

--font-sans: var(--font-geist-sans);
--font-mono: var(--font-geist-mono);


In Expo:

const fonts = {
  regular: 'Geist-Regular',
  bold: 'Geist-Bold',
};

🔹 5. Motion + Animation Rules

Use tw-animate-css classes or Reanimated 3 equivalents.

Motion Type	Usage	Example
Fade In	Screen entry	animate-fadeIn
Slide Up	Modals	animate-slideInUp
Scale	Button tap feedback	Reanimated scale transform
Duration	200–300ms	Keep consistent timing
🔹 6. Component Style Conventions
🧱 Buttons
<Button className="bg-primary text-primary-foreground rounded-lg p-3 active:opacity-80">
  Confirm
</Button>


Variants:

variant="secondary" → bg-secondary text-secondary-foreground

variant="destructive" → bg-destructive text-destructive-foreground

🪟 Cards
<View className="bg-card rounded-lg p-4 shadow-sm border border-border">
  <Text className="text-card-foreground text-sm">Member Info</Text>
</View>

📊 Charts

Use recharts or victory-native.
Apply --chart-1 to --chart-5 for datasets:

{
  stroke: 'var(--chart-1)',
  fill: 'var(--chart-1)',
}

🕶️ Modals
<View className="bg-popover rounded-xl p-4 shadow-lg">
  <Text className="text-popover-foreground">Change Plan</Text>
</View>

🔹 7. Accessibility Checklist

Minimum color contrast ratio 4.5:1

Touch target ≥ 44x44px

Use aria-label equivalents via accessibilityLabel in React Native

Support dark/light mode toggling

Support dynamic text sizing (fontScale)

🔹 8. Figma / Penpot Notes

Components should be mirrored 1:1 across web and mobile (structure parity > pixel parity).

Figma frames named by route: /login, /dashboard, /users, etc.

Use oklch color references directly in Figma styles.

🔹 9. AI Prompt Add-On (Design Context Injection)

Whenever prompting AI to build UI, include:

Use design rules from /ai_context/design-system.md.
Follow Tailwind color tokens defined in admin global.css.
Adopt dark/light mode variants automatically.
Use minimalistic, accessible design with clean whitespace.


Example:

“Build a Dashboard screen using Expo Router and Zustand, styled per /ai_context/design-system.md. Use bg-background, text-foreground, and chart colors from tokens.”

🔹 10. Visual Sync Workflow (Cross-Platform Consistency)
Step	Action	Tool
1	Claude reads /ai_context/design-system.md + /ai_context/claude.md	Claude
2	Cursor generates Expo screen	Cursor
3	Gemini checks visual parity with admin web CSS	Gemini Pro
4	Claude updates Figma component map	Claude
✅ Takeaways

AI always respects admin site’s theme system for consistent brand feel.

Mobile UIs use Expo + Tailwind RN + color tokens from your global CSS.

Animations follow the tw-animate-css library with Reanimated parity.

This ensures vibe continuity — the admin and mobile app look like siblings, not strangers.


# 🎨 XFitness Design System (Shared Web & Mobile)

## 1. Base Theme Source
Imported from: `/web/styles/globals.css`

```css

@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}