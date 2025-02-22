import { style, keyframes } from "@vanilla-extract/css"

const glow = keyframes({
  "0%": {
    boxShadow: "0 0 5px rgba(196, 138, 237, 0.5), 0 0 10px rgba(196, 138, 237, 0.5)",
  },
  "50%": {
    boxShadow: "0 0 10px rgba(196, 138, 237, 0.7), 0 0 20px rgba(196, 138, 237, 0.7)",
  },
  "100%": {
    boxShadow: "0 0 5px rgba(196, 138, 237, 0.5), 0 0 10px rgba(196, 138, 237, 0.5)",
  },
})

export const glowStyle = style({
  ":hover": {
    animation: `${glow} 1.5s ease-in-out infinite`,
  },
})

