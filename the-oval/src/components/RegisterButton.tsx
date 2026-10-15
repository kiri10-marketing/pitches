"use client";
export default function RegisterButton({ interest, children, className = "btn-primary" }: { interest?: string; children: React.ReactNode; className?: string }) {
  return (
    <a
      href="#register"
      className={className}
      onClick={() => { if (interest) window.dispatchEvent(new CustomEvent("prefill-interest", { detail: interest })); }}
    >
      {children}
    </a>
  );
}
