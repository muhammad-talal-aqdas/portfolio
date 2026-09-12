export type ContactIconName =
  | "gmail"
  | "apple-mail"
  | "whatsapp"
  | "linkedin"
  | "github"
  | "instagram"
  | "facebook"
  | "slack";

function IconShell({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function ContactIcon({ name }: { name: ContactIconName }) {
  switch (name) {
    case "gmail":
      return (
        <IconShell color="#ff5b5b">
          <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
          <path d="m3 6 9 7 9-7" />
        </IconShell>
      );
    case "apple-mail":
      return (
        <IconShell color="#00c2ff">
          <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
          <path d="m3 6 9 7 9-7" />
        </IconShell>
      );
    case "whatsapp":
      return (
        <IconShell color="#25d366">
          <path d="M6.5 17.5 4 20l2.6-.7A8 8 0 1 0 4 12a7.9 7.9 0 0 0 1.1 4.1Z" />
          <path d="M9 9.6c0 3 2.4 5.4 5.4 5.4.6 0 1-.5.9-1.1l-.2-.9a.9.9 0 0 0-1-.7l-.9.2a5 5 0 0 1-2.7-2.7l.2-.9a.9.9 0 0 0-.7-1l-.9-.2c-.6-.1-1.1.3-1.1.9Z" />
        </IconShell>
      );
    case "linkedin":
      return (
        <IconShell color="#00a0e0">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="7.5" y1="10" x2="7.5" y2="17" />
          <circle cx="7.5" cy="6.7" r="0.9" fill="#00a0e0" stroke="none" />
          <path d="M11.5 17v-4.2c0-1.5 1-2.3 2.2-2.3 1.2 0 2.1.8 2.1 2.3V17" />
        </IconShell>
      );
    case "github":
      return (
        <IconShell color="#e8faff">
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.4 9.4 0 0 1 5 0c1.9-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.85-2.34 4.7-4.57 4.94.36.32.68.94.68 1.9v2.82c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />
        </IconShell>
      );
    case "instagram":
      return (
        <IconShell color="#e1306c">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="0.9" fill="#e1306c" stroke="none" />
        </IconShell>
      );
    case "facebook":
      return (
        <IconShell color="#1877f2">
          <path d="M14 21v-7h2.5l.5-3H14V9c0-.9.3-1.5 1.6-1.5H17V4.9C16.7 4.9 15.8 4.8 14.7 4.8c-2.2 0-3.7 1.3-3.7 3.8V11H8.5v3H11v7Z" />
        </IconShell>
      );
    case "slack":
      return (
        <IconShell color="#e01e5a">
          <rect x="9" y="2.5" width="3" height="8" rx="1.5" />
          <rect x="9" y="13.5" width="3" height="8" rx="1.5" />
          <rect x="2.5" y="9" width="8" height="3" rx="1.5" />
          <rect x="13.5" y="9" width="8" height="3" rx="1.5" />
        </IconShell>
      );
    default:
      return null;
  }
}
