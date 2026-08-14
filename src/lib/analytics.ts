"use client";

// Reusable Google Tag Manager / dataLayer helper.
// All custom events should be pushed through here so that GTM can map them to
// Google Ads, GA4, or other tags without scattering dataLayer calls around the app.

export type GtmEvent =
  | { event: "booking_start"; service: string }
  | {
      event: "booking_complete";
      service: string;
      order: string;
      value?: number;
      currency: "SEK";
    }
  | { event: "click_phone"; location: string }
  | { event: "contact_form_submit"; form_name: string };

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

/**
 * Push an event object to the GTM dataLayer safely.
 * No-op on server renders or when GTM is not present.
 */
export function pushDataLayer(event: GtmEvent) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/** Fire when the user successfully completes the first "Fortsätt" step. */
export function trackBookingStart(service: string) {
  pushDataLayer({ event: "booking_start", service });
}

/**
 * Fire when a booking is actually completed (primary conversion).
 * Deduplication should be handled by the caller using a unique booking ID.
 */
export function trackBookingComplete(
  service: string,
  order: string,
  value?: number,
) {
  pushDataLayer({
    event: "booking_complete",
    service,
    order,
    value,
    currency: "SEK",
  });
}

/** Fire when a user clicks/taps a phone number. */
export function trackPhoneClick(location: string) {
  pushDataLayer({ event: "click_phone", location });
}

/**
 * Record that a conversion has been fired for a given booking/order ID.
 * Returns true if the ID was already recorded (i.e. do not fire again).
 */
export function hasTrackedBooking(orderId: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const tracked = JSON.parse(
      sessionStorage.getItem("gtm_bookings_tracked") || "[]",
    ) as string[];
    return tracked.includes(orderId);
  } catch {
    return false;
  }
}

export function markBookingTracked(orderId: string) {
  if (typeof window === "undefined") return;
  try {
    const tracked = JSON.parse(
      sessionStorage.getItem("gtm_bookings_tracked") || "[]",
    ) as string[];
    if (!tracked.includes(orderId)) {
      tracked.push(orderId);
      sessionStorage.setItem(
        "gtm_bookings_tracked",
        JSON.stringify(tracked),
      );
    }
  } catch {
    // ignore storage errors
  }
}
