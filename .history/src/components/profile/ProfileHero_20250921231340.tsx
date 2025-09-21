"use client";
// components/profile/ProfileHero.tsx
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

type Props = {
  name: string;
  title: string;              // e.g., "Systems Analyst & Developer; Product Builder (AI Platforms)"
  location?: string;          // e.g., "Dublin, IE"
  bio?: string;               // one-sentence/short paragraph
  headshotSrc?: string;       // default: "/James2025Profile.png"
  headshotPosition?: string;  // CSS object-position value, default: "center 38%"
  email?: string;             // "mailto:" will be added automatically
  linkedinHref?: string;      // full URL
};

export default function ProfileHero({
  name,
  title,
  location,
  bio,
  headshotSrc = "/James2025Profile.png",
  headshotPosition = "center 38%",
  email,
  linkedinHref,
}: Props) {
  return (
    <section className="hero" aria-label={`${name} profile header`}>
      <div className="media">
        <div className="avatar" aria-hidden="true">
          <Image
            src={headshotSrc}
            alt={`${name} headshot`}
            width={260}
            height={260}
            sizes="(max-width: 720px) 160px, 220px"
            priority
            style={{ objectPosition: headshotPosition }}
          />
        </div>
      </div>

      <div className="copy">
        <h1 className="name">{name}</h1>
        <p className="title">
          {title}
          {location ? (
            <>
              {` · `}
              <span className="location">{location}</span>
            </>
          ) : null}
        </p>

        {bio ? <p className="bio">{bio}</p> : null}

        {(email || linkedinHref) && (
          <ul className="actions" aria-label="Contact">
            {email && (
              <li>
                <Link href={`mailto:${email}`} className="chip" aria-label="Contact">
                  <MailIcon />
                  <span>Contact</span>
                </Link>
              </li>
            )}
            {linkedinHref && (
              <li>
                <Link href={linkedinHref} className="chip" aria-label="LinkedIn">
                  <LinkedInIcon />
                  <span>LinkedIn</span>
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>

      <style jsx>{`
        .hero {
          --gap: 2rem;
          --avatar-size: clamp(140px, 22vw, 220px);
          background: var(--surface, #f8fafc);
          border-radius: 14px;
          padding: clamp(1.25rem, 3vw, 2rem);
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          gap: var(--gap);
        }
        @media (min-width: 780px) {
          .hero {
            grid-template-columns: auto 1fr;
          }
        }

        .media {
          display: grid;
          place-items: center;
        }
        .avatar {
          width: var(--avatar-size);
          height: var(--avatar-size);
          border-radius: 50%;
          overflow: hidden;
          box-shadow: 0 0 0 6px #fff, 0 2px 30px rgba(0, 0, 0, 0.08);
        }
        :global(img) {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .copy {
          max-width: 72ch;
        }
        .name {
          font-size: clamp(2rem, 4vw, 3rem);
          line-height: 1.05;
          margin: 0 0 0.25rem 0;
          font-weight: 800;
          letter-spacing: 0.2px;
          color: #0a0a0a;
        }
        .title {
          margin: 0;
          font-size: clamp(1rem, 2vw, 1.125rem);
          color: #334155;
        }
        .location {
          color: #2563eb; /* subtle accent similar to McK link */
        }
        .bio {
          margin: 0.9rem 0 0 0;
          font-size: 1.05rem;
          line-height: 1.6;
          color: #1f2937;
        }

        .actions {
          margin-top: 1.1rem;
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          padding: 0;
          list-style: none;
        }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.55rem 0.8rem;
          border-radius: 999px;
          background: #111;
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: transform 160ms ease, opacity 160ms ease;
        }
        .chip:hover { transform: translateY(-1px); opacity: 0.95; }

        /* Force light surface in dark theme for contrast */
        @media (prefers-color-scheme: dark) {
          .hero { --surface: #f8fafc; }
          .title, .bio { color: #1f2937; }
          .chip { background: #111; }
          .location { color: #2563eb; }
          .avatar { box-shadow: 0 0 0 6px #f8fafc, 0 2px 30px rgba(0,0,0,0.15); }
        }
      `}</style>
    </section>
  );
}

/* --- Icons (inline, no dependencies) --- */
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...props}>
      <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
      <path d="m22 8-10 6L2 8" />
    </svg>
  );
}
function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.07c.67-1.2 2.3-2.47 4.73-2.47C21.6 7.73 24 10 24 14.26V24h-5v-8.6c0-2.05-.73-3.46-2.56-3.46-1.39 0-2.22.94-2.58 1.85-.13.32-.16.77-.16 1.22V24H8V8z" />
    </svg>
  );
}