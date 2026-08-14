"use client";

import React from "react";
import { trackPhoneClick } from "@/lib/analytics";

const PHONE_NUMBER = "+46108085625";
const PHONE_HREF = `tel:${PHONE_NUMBER}`;

type PhoneLinkProps = {
  children: React.ReactNode;
  className?: string;
  location: string;
  ariaLabel?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

/**
 * A tracked phone-number link.
 * Wraps a plain tel: anchor and pushes a `click_phone` event to the GTM dataLayer
 * before the browser follows the link. Use location to identify where the click happened
 * (e.g. "nav", "kontakt", "thanks").
 */
export function PhoneLink({
  children,
  className,
  location,
  ariaLabel,
  ...rest
}: PhoneLinkProps) {
  return (
    <a
      href={PHONE_HREF}
      className={className}
      aria-label={ariaLabel}
      onClick={() => trackPhoneClick(location)}
      {...rest}
    >
      {children}
    </a>
  );
}

/**
 * Convenience component for the desktop header / button-style CTA that currently
 * uses a Button wrapping an `<a href="tel:...">`.
 */
export function TrackedPhoneButton({
  children,
  className,
  location,
}: {
  children: React.ReactNode;
  className?: string;
  location: string;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        trackPhoneClick(location);
        window.location.href = PHONE_HREF;
      }}
    >
      {children}
    </button>
  );
}
