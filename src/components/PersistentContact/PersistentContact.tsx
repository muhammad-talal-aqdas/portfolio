"use client";

import { usePathname, useRouter } from "next/navigation";
import "./persistent-contact.css";

export default function PersistentContact() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/contact") return null;

  return (
    <button type="button" className="persistent-contact" onClick={() => router.push("/contact")}>
      <span className="persistent-contact__dot" />
      <span>Contact</span>
    </button>
  );
}
