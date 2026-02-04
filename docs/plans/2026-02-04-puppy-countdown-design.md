# Puppy Countdown App Design

A one-page countdown clock to receiving a puppy, featuring full Geocities aesthetic chaos.

## Overview

Single-page Next.js app displaying a countdown timer to a configurable date, with a DVD-screensaver-style bouncing/spinning puppy photo and authentic 1990s Geocities visual design.

## Configuration

- **`NEXT_PUBLIC_PUPPY_DATE`**: ISO timestamp string (e.g., `2025-03-15T10:00:00`) for countdown target
- **`public/puppy.png`**: User-provided puppy image file

## Component Architecture

### Server Components

**`app/page.tsx`** - Main layout and static decorations:
- Full viewport layout structure
- CSS starfield background (layered radial gradients, dark blue/black base `#000033`)
- HTML `<marquee>` with scrolling welcome message
- Broadway-style lightbulb marquee heading ("Puppy Countdown!!!")
- "Under Construction" GIF
- Fake hit counter ("You are visitor #xxxxx")
- "Sign my Guestbook!" dead link
- Chunky beveled borders (`border-style: outset`)

### Client Components

**`app/components/Countdown.tsx`**:
- Reads `NEXT_PUBLIC_PUPPY_DATE` env var
- Displays days, hours, minutes, seconds - all updating live
- Uses `setInterval` for 1-second updates
- Comic Sans font, yellow/lime green numbers, text shadows

**`app/components/BouncingPuppy.tsx`**:
- DVD screensaver physics: straight-line movement, angle reflection on wall collision
- Continuous spin via CSS animation (`animation: spin 1s linear infinite`)
- Position updates via `requestAnimationFrame`
- Random initial position and velocity angle
- Renders puppy image from `public/puppy.png`

## File Structure

```
app/
  page.tsx                 # Server component - layout & decorations
  globals.css              # Starfield background, Geocities styles
  components/
    Countdown.tsx          # Client component
    BouncingPuppy.tsx      # Client component
public/
  puppy.png                # User-provided puppy image
```

## Visual Design

### Background
- Pure CSS starfield: dark blue/black base with layered `radial-gradient` for scattered white dots
- Optional subtle twinkle animation

### Typography
- Comic Sans MS (with `cursive` fallback) for all text
- Broadway lightbulb marquee effect on main heading (animated border dots cycling on/off)
- Yellow or lime green countdown numbers
- Chunky text shadows/outlines

### Decorations
- `<marquee>` scrolling welcome text at top
- "Under Construction" GIF (classic style)
- Fake hit counter with large arbitrary number
- "Sign my Guestbook!" link pointing to `#`
- Beveled outset borders on containers

### Puppy Animation
- Constant rotation: `animation: spin 1s linear infinite`
- Movement: `requestAnimationFrame` loop updating x/y position
- Bounce: negate velocity component when hitting viewport edge

## Edge Cases

### Countdown
- **Missing env var**: Display "Set NEXT_PUBLIC_PUPPY_DATE to start countdown!"
- **Date has passed**: Display "PUPPY TIME IS HERE!!!" with flashing effect
- **Invalid date format**: Same as missing - show setup message

### Bouncing Puppy
- **Initial state**: Random position within viewport, random angle, fixed speed
- **Window resize**: Clamp position to stay within new viewport bounds

## Out of Scope

- Actual backend functionality (hit counter is decorative, guestbook is non-functional)
- Mobile-specific responsive styling
- Automated tests
