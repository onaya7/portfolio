"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { contact, emailDraft } from "@/content/profile";
import { cn } from "@/lib/utils";
import CopyEmail from "./CopyEmail";

/** CRLF line breaks, as the mailto spec asks for, then URL-encoded. */
const encode = (text: string) => encodeURIComponent(text.replace(/\r?\n/g, "\r\n"));

type Sender = { name: string; email: string; phone: string };
type Field = keyof Sender;

/** Why a field is not ready yet, or null when it is. Messages show only after the field is left. */
const checks: Record<Field, (value: string) => string | null> = {
  name: value => (value.trim().length >= 2 ? null : "Enter your name."),
  email: value => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()) ? null : "Enter a valid email address."),
  phone: value => {
    const digits = value.replace(/\D/g, "").length;
    if (/[^\d\s()+.-]/.test(value)) return "Use digits, spaces, +, - or brackets only.";
    return digits >= 7 && digits <= 15 ? null : "Enter a phone number with its country or area code.";
  },
};

/**
 * The visitor's details go under the message as a signature. A sign-off ending in a comma
 * ("Thanks,") takes the name on the next line; anything else gets a blank line first.
 */
function withSignature(body: string, sender: Sender): string {
  const text = body.trimEnd();
  const gap = text.endsWith(",") ? "\n" : "\n\n";
  return `${text}${gap}${sender.name.trim()}\n${sender.email.trim()}\n${sender.phone.trim()}\n`;
}

const inputClass =
  "h-11 w-full rounded-2xl border bg-bg px-4 text-small text-fg outline-none transition-colors focus:border-accent";

/**
 * The compose dialog behind every "Email me" link.
 *
 * Links opt in with `data-compose` and stay ordinary mailto links, so without JavaScript (or
 * with a modifier-click) they behave exactly as before. With JavaScript, a click opens this
 * dialog with a prefilled subject and message and three required fields for the sender's name,
 * email and phone. Continue stays disabled until all of them are valid, then hands the draft,
 * signed with those details, to the visitor's mail app. Because a mailto link does nothing when
 * no mail app is set up, the dialog then offers Gmail and copy-the-address as fallbacks.
 *
 * The sender's details are kept in memory for the visit only, never stored.
 * On a work page, `[data-compose-topic]` names the product, and the draft mentions it.
 * Mounted once in the root layout.
 */
export default function EmailComposer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const continueButton = useRef<HTMLButtonElement>(null);
  const gmailLink = useRef<HTMLAnchorElement>(null);
  /** Where the last press started, so a text selection dragged onto the backdrop does not close. */
  const pressedBackdrop = useRef(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sender, setSender] = useState<Sender>({ name: "", email: "", phone: "" });
  const [touched, setTouched] = useState<Record<Field, boolean>>({ name: false, email: false, phone: false });
  const [handedOff, setHandedOff] = useState(false);
  const id = useId();

  const errors = {
    name: checks.name(sender.name),
    email: checks.email(sender.email),
    phone: checks.phone(sender.phone),
  };
  const missing = (Object.keys(errors) as Field[]).filter(field => errors[field]);
  const ready = missing.length === 0 && subject.trim() !== "" && body.trim() !== "";

  // Kept current for the click handler, which is registered once.
  const senderRef = useRef(sender);
  useEffect(() => {
    senderRef.current = sender;
  }, [sender]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element | null)?.closest?.("a[data-compose]");
      if (!link || !dialog.current) return;

      event.preventDefault();
      const topic = document.querySelector<HTMLElement>("[data-compose-topic]")?.dataset.composeTopic;
      const draft = emailDraft(topic);
      setSubject(draft.subject);
      setBody(draft.body);
      setHandedOff(false);
      dialog.current.showModal();
      // Details filled on an earlier open are kept, so focus Continue; otherwise start at Name.
      const filled = (Object.keys(checks) as Field[]).every(field => !checks[field](senderRef.current[field]));
      requestAnimationFrame(() => (filled ? continueButton.current : nameInput.current)?.focus());
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // The form, and the focused Continue button with it, is replaced by the fallbacks.
  useEffect(() => {
    if (handedOff) gmailLink.current?.focus();
  }, [handedOff]);

  const signed = withSignature(body, sender);
  const mailto = `mailto:${contact.email}?subject=${encode(subject)}&body=${encode(signed)}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${contact.email}&su=${encode(subject)}&body=${encode(signed)}`;

  function close() {
    dialog.current?.close();
  }

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!ready) {
      setTouched({ name: true, email: true, phone: true });
      return;
    }
    window.location.href = mailto;
    setHandedOff(true);
  }

  function field(key: Field, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) {
    const error = touched[key] ? errors[key] : null;
    const inputId = `${id}-${key}`;
    return (
      <div className="grid gap-2">
        <label htmlFor={inputId} className="label text-muted">
          {label}
        </label>
        <input
          {...props}
          ref={key === "name" ? nameInput : undefined}
          id={inputId}
          name={key}
          required
          value={sender[key]}
          onChange={event => setSender(current => ({ ...current, [key]: event.target.value }))}
          onBlur={() => setTouched(current => ({ ...current, [key]: true }))}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(inputClass, error ? "border-accent" : "border-line-strong")}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-small text-accent">
            {error}
          </p>
        )}
      </div>
    );
  }

  const hint =
    missing.length > 0
      ? `Add your ${missing
          .map(field => (field === "phone" ? "phone number" : field))
          .join(", ")
          .replace(/, ([^,]*)$/, " and $1")} to continue.`
      : !ready
        ? "Add a subject and a message to continue."
        : null;

  return (
    <dialog
      ref={dialog}
      aria-labelledby={`${id}-title`}
      // A click on the backdrop lands on the dialog element itself. Close only when the press
      // started there too.
      onMouseDown={event => (pressedBackdrop.current = event.target === event.currentTarget)}
      onClick={event => event.target === event.currentTarget && pressedBackdrop.current && close()}
      className="compose m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-card border border-line bg-surface p-0 text-fg shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)] backdrop:bg-bg/75 backdrop:backdrop-blur-sm"
    >
      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id={`${id}-title`} className="text-h3 font-normal">
              {handedOff ? "Check your email app" : "Send me an email"}
            </h2>
            <p className="mt-1 text-small text-muted">
              {handedOff ? (
                "Your draft should be open and ready to send. If nothing opened, use one of these instead."
              ) : (
                <>
                  To <span className="text-fg">{contact.email}</span>. Add your details; the message is ready to go.
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="-mr-2 -mt-1 grid size-10 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-fg/[0.06] hover:text-fg"
          >
            <X aria-hidden strokeWidth={1.75} className="size-5" />
          </button>
        </div>

        {handedOff ? (
          <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
            <a
              ref={gmailLink}
              href={gmail}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-5 text-small font-medium text-accent-ink transition duration-200 hover:brightness-110 active:scale-[0.98]"
            >
              Open in Gmail
              <ArrowUpRight aria-hidden strokeWidth={2} className="size-4" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            <CopyEmail email={contact.email} className="justify-center" />
            <button
              type="button"
              onClick={close}
              className="inline-flex h-11 items-center justify-center rounded-full px-5 text-small font-medium text-muted transition-colors hover:text-fg sm:ml-auto"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="mt-7 grid gap-5">
            {field("name", "Your name", { type: "text", autoComplete: "name" })}
            <div className="grid gap-5 sm:grid-cols-2">
              {field("email", "Your email", { type: "email", autoComplete: "email", inputMode: "email" })}
              {field("phone", "Your phone", { type: "tel", autoComplete: "tel", inputMode: "tel" })}
            </div>

            <div className="grid gap-2">
              <label htmlFor={`${id}-subject`} className="label text-muted">
                Subject
              </label>
              <input
                id={`${id}-subject`}
                value={subject}
                onChange={event => setSubject(event.target.value)}
                className={cn(inputClass, "border-line-strong")}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor={`${id}-body`} className="label text-muted">
                Message
              </label>
              <textarea
                id={`${id}-body`}
                value={body}
                onChange={event => setBody(event.target.value)}
                rows={6}
                aria-describedby={`${id}-signature`}
                className="resize-y rounded-2xl border border-line-strong bg-bg px-4 py-3 text-small leading-relaxed text-fg outline-none transition-colors focus:border-accent"
              />
              <p id={`${id}-signature`} className="text-small text-subtle">
                Your name, email and phone are added under the message.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 pt-1">
              <p aria-live="polite" className="mr-auto text-small text-muted">
                {hint}
              </p>
              <button
                type="button"
                onClick={close}
                className="inline-flex h-11 items-center rounded-full px-5 text-small font-medium text-muted transition-colors hover:text-fg"
              >
                Cancel
              </button>
              <button
                ref={continueButton}
                type="submit"
                disabled={!ready}
                className="group inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-accent px-6 text-small font-medium text-accent-ink transition duration-200 hover:brightness-110 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-raised disabled:text-subtle disabled:hover:brightness-100 disabled:active:scale-100"
              >
                Continue
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={2}
                  className="size-4 transition-transform duration-200 group-enabled:group-hover:-translate-y-0.5 group-enabled:group-hover:translate-x-0.5"
                />
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
