export const theme = {
  color: {
    emerald: "#0F766E",
    emeraldDark: "#0B5A54",
    emeraldSoft: "#E6F2F1",
    navy: "#1E3A5F",
    navySoft: "#E9EEF3",
    gold: "#D4AF37",
    goldSoft: "#FBF3DC",
    bg: "#F8F9FA",
    card: "#FFFFFF",
    success: "#16A34A",
    successSoft: "#E9F8EF",
    warning: "#F59E0B",
    warningSoft: "#FEF3E1",
    error: "#DC2626",
    errorSoft: "#FCEAEA",
    text: "#1F2937",
    textMuted: "#6B7280",
    textFaint: "#9CA3AF",
    border: "#E5E7EB",
  },
  radius: { sm: "8px", md: "12px", lg: "16px" },
} as const;

export type ThemeColor = keyof typeof theme.color;
