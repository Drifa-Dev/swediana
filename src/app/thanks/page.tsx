"use client";

import React, { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, CalendarDays, Mail, Phone, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  trackBookingComplete,
  trackPhoneClick,
  hasTrackedBooking,
  markBookingTracked,
} from "@/lib/analytics";

function formatDate(input?: string | null) {
  if (!input) return "–";
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Separate the component that uses useSearchParams
//Test
function ThanksContent() {
  const params = useSearchParams();

  // Support both ?order= and ?bookingId=
  const order = params.get("order") || params.get("bookingId") || "–";
  const service = params.get("service") || "Bokning";
  const date = formatDate(params.get("date"));
  const name = params.get("name") || "Kund";
  const email = "info@swediana.se";
  const phone = "+46 10 808 56 25";
  const rawValue = params.get("value");
  const value = rawValue ? Number(rawValue) : undefined;

  // Fire the primary Google Ads conversion once per booking ID.
  // sessionStorage prevents double firing on refresh or repeated button clicks.
  useEffect(() => {
    if (order && order !== "–" && !hasTrackedBooking(order)) {
      trackBookingComplete(service, order, value);
      markBookingTracked(order);
    }
  }, [order, service, value]);

  return (
    <div className="min-h-screen w-full bg-background pt-16">
      <div className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <div className="text-center mt-10 mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className="inline-flex items-center justify-center"
          >
            <CheckCircle2 className="h-16 w-16 text-green-500" aria-hidden />
          </motion.div>

          <motion.h1
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-4xl font-semibold text-primary-foreground"
          >
            Tack för din bokning!
          </motion.h1>

          <p className="mt-2 text-foreground/80">
            {name}, vi har tagit emot din förfrågan. En bekräftelse kommer att
            skickas{email ? ` till ${email}.` : "."}
          </p>
        </div>

        {/* Centered single-column content */}
        <div className="mx-auto max-w-2xl space-y-6">
          <Card className="rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Bokningsöversikt
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-muted/30">
                  <p className="text-xs text-foreground/60">Tjänst</p>
                  <p className="text-lg font-medium text-primary-foreground">
                    {service}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30">
                  <p className="text-xs text-foreground/60">Datum</p>
                  <p className="text-lg font-medium text-primary-foreground">
                    {date}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30">
                  <p className="text-xs text-foreground/60">Bokningsnummer</p>
                  <p className="text-lg font-medium text-primary-foreground">
                    #{order}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-muted/30">
                  <p className="text-xs text-foreground/60">Kund</p>
                  <p className="text-lg font-medium text-primary-foreground">
                    {name}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Next steps */}
              <div className="space-y-3">
                <h3 className="font-semibold text-primary-foreground">
                  Nästa steg
                </h3>
                <ul className="space-y-2 text-sm text-foreground/90">
                  <li className="flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5" />
                    Du kan svara på bekräftelsemailet om du vill ändra något.
                  </li>
                  <li className="flex items-start gap-2">
                    <Mail className="h-4 w-4 mt-0.5" />
                    Kontrollera skräpposten om du inte hittar mailet.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Helpful info */}
          <Alert className="rounded-2xl">
            <AlertTitle>Behöver du hjälp?</AlertTitle>
            <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <span>Vårt team svarar vanligtvis inom några timmar.</span>
              <div className="flex gap-2">
                {email && (
                  <Button
                    variant="secondary"
                    className="rounded-full"
                    onClick={() => (window.location.href = `mailto:${email}`)}
                  >
                    <Mail className="h-4 w-4 mr-2" /> Svara på mailet
                  </Button>
                )}
                {phone && (
                  <Button
                    variant="secondary"
                    className="rounded-full"
                    onClick={() => {
                      trackPhoneClick("thanks");
                      window.location.href = `tel:${phone.replace(/\s/g, "")}`;
                    }}
                  >
                    <Phone className="h-4 w-4 mr-2" /> Ring oss
                  </Button>
                )}
              </div>
            </AlertDescription>
          </Alert>
        </div>

        {/* Spacer so the confetti glows don't overlap the footer */}
        <div className="min-h-[40vh]" />

        {/* Decorative glow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          aria-hidden
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute -top-10 left-1/4 h-40 w-40 rounded-full blur-3xl opacity-20 bg-green-400" />
          <div className="absolute top-1/3 -right-10 h-40 w-40 rounded-full blur-3xl opacity-20 bg-emerald-400" />
        </motion.div>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function ThanksForBookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-background pt-16 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-foreground/60">Laddar...</p>
          </div>
        </div>
      }
    >
      <ThanksContent />
    </Suspense>
  );
}
