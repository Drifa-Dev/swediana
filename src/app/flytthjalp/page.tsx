"use client";
import React, { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ExtraServices from "@/components/ExtraServices";
import BookingDetails from "@/components/BookingDetails";
import SummaryCard from "@/components/SummaryCard";
import AddressSection from "@/components/AddressSection";
import { useBookingStore } from "@/stores/bookingStore";
import { initialBookingSchema } from "../schema/schema";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { trackBookingStart } from "@/lib/analytics";

const Page = () => {
  const {
    from,
    to,
    setFrom,
    setTo,
    sizeValue,
    setSize,
    extra,
    setExtra,
    cleaningExtra,
    setCleaningExtra,
    fetchPrices,
    postPhoneNumber,
  } = useBookingStore();

  const sizeRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const onclick = async () => {
    // Clear previous errors
    setErrors({});

    // Get current values
    const sz = Number(sizeRef.current?.value || 0);
    const fromPostcode = from.postcode || "";
    const toPostcode = to.postcode || "";
    const phone = phoneRef.current?.value || "";

    // Validate
    const result = initialBookingSchema.safeParse({
      size: sz,
      fromPostcode,
      toPostcode,
    });

    if (!result.success) {
      // Extract errors
      const validationErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string;
        validationErrors[field] = err.message;
      });
      setErrors(validationErrors);
      return;
    }

    // Validate phone number (basic validation)
    if (!phone || phone.trim() === "") {
      setErrors({ phone: "Telefonnummer krävs" });
      return;
    }

    // Basic phone validation (Swedish format)
    const phoneRegex = /^[\d\s\-\+\(\)]{8,}$/;
    if (!phoneRegex.test(phone)) {
      setErrors({ phone: "Ogiltigt telefonnummer" });
      return;
    }

    // All valid - proceed
    setIsLoading(true);
    try {
      setSize(sz);

      // Call postPhoneNumber first
      await postPhoneNumber(phone, process.env.NEXT_PUBLIC_API_KEY!);

      // Then fetch prices
      await fetchPrices(process.env.NEXT_PUBLIC_API_KEY!);
      trackBookingStart("Flytthjälp");
    } catch (error) {
      console.error("Failed to process request:", error);
      setErrors({ general: "Kunde inte hämta priser. Försök igen." });
    } finally {
      setIsLoading(false);
      setVisible(true);
    }
  };

  return (
    <div className="pt-12 sm:pt-16 mt-20">
      {/* Header Section - Responsive padding and text sizes */}
      <header className="w-full lg:w-4/5 mx-auto px-4 sm:px-6 flex flex-col items-center mt-6 sm:mt-12 text-center">
        <h1 className="pb-3 sm:pb-4 text-2xl sm:text-3xl md:text-4xl text-primary-foreground leading-tight">
          Boka <span className="font-bold text-primary">Flytthjälp</span>
        </h1>
        <p className="text-foreground pb-3 sm:pb-4 text-base sm:text-lg md:text-xl max-w-2xl">
          
        </p>
      </header>

      {/* Input Section - Responsive grid and spacing */}
      <div className="w-full lg:w-4/5 mx-auto px-4 sm:px-6 flex flex-col items-center gap-4 sm:gap-6">
        <div className="w-full grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="space-y-1">
            <Input
              ref={sizeRef}
              defaultValue={sizeValue || ""}
              type="number"
              placeholder="Storlek (m²)"
              className={`w-full h-10 sm:h-11 text-sm sm:text-base ${
                errors.size ? "border-red-500" : ""
              }`}
            />
            {errors.size && (
              <p className="text-xs sm:text-sm text-red-500">{errors.size}</p>
            )}
          </div>

          <div className="space-y-1">
            <Input
              type="text"
              placeholder="Postnummer (från)"
              className={`w-full h-10 sm:h-11 text-sm sm:text-base ${
                errors.fromPostcode ? "border-red-500" : ""
              }`}
              value={from.postcode ?? ""}
              onChange={(e) => {
                setFrom({ postcode: e.target.value });
                if (errors.fromPostcode) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.fromPostcode;
                    return next;
                  });
                }
              }}
            />
            {errors.fromPostcode && (
              <p className="text-xs sm:text-sm text-red-500">
                {errors.fromPostcode}
              </p>
            )}
          </div>

          <div className="space-y-1 sm:col-span-2 md:col-span-1">
            <Input
              type="text"
              placeholder="Postnummer (till)"
              className={`w-full h-10 sm:h-11 text-sm sm:text-base ${
                errors.toPostcode ? "border-red-500" : ""
              }`}
              value={to.postcode ?? ""}
              onChange={(e) => {
                setTo({ postcode: e.target.value });
                if (errors.toPostcode) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.toPostcode;
                    return next;
                  });
                }
              }}
            />
            {errors.toPostcode && (
              <p className="text-xs sm:text-sm text-red-500">
                {errors.toPostcode}
              </p>
            )}
          </div>

          {/* Phone Number Input */}
          <div className="space-y-1 sm:col-span-2 md:col-span-3">
            <Input
              ref={phoneRef}
              type="tel"
              placeholder="Telefonnummer"
              className={`w-full h-10 sm:h-11 text-sm sm:text-base ${
                errors.phone ? "border-red-500" : ""
              }`}
              onChange={() => {
                if (errors.phone) {
                  setErrors((prev) => {
                    const next = { ...prev };
                    delete next.phone;
                    return next;
                  });
                }
              }}
            />
            {errors.phone && (
              <p className="text-xs sm:text-sm text-red-500">{errors.phone}</p>
            )}
          </div>
        </div>

        {errors.general && (
          <Alert variant="destructive" className="w-full">
            <AlertDescription className="text-sm">
              {errors.general}
            </AlertDescription>
          </Alert>
        )}

        <Button
          onClick={onclick}
          className="text-white w-full sm:w-auto px-8 h-10 sm:h-11 text-sm sm:text-base"
          disabled={isLoading}
        >
          {isLoading ? "Laddar..." : "Fortsätt"}
        </Button>
      </div>

      {/* Main Content - Responsive layout */}
      <main className="w-full lg:w-4/5 mx-auto px-4 sm:px-6 mt-8 sm:mt-12 mb-16 sm:mb-24">
        {visible && (
          <div className="grid gap-6 sm:gap-8 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_370px] max-w-full">
            {/* Left Column - Form sections */}
            <div className="space-y-6 sm:space-y-8 md:space-y-10 w-full min-w-0 pb-8">
              <AddressSection
                title="Nuvarande adress"
                value={from}
                onChange={(v) => setFrom(v)}
              />
              <AddressSection
                title="Ny adress"
                value={to}
                onChange={(v) => setTo(v)}
                showDistance={false}
              />
              <section>
                <ExtraServices
                  value={extra}
                  onChange={(v) => setExtra(v)}
                  cleaningValue={cleaningExtra}
                  onCleaningChange={(v) => setCleaningExtra(v)}
                />
              </section>

              {/* Summary Card - Shows here on mobile */}
              <div className="lg:hidden w-full max-w-full space-y-6">
                <SummaryCard />
                <div className="flex items-center gap-4">
                  <Separator className="flex-1" />
                  <span className="text-sm text-muted-foreground font-medium">
                    Bokningsdetaljer
                  </span>
                  <Separator className="flex-1" />
                </div>
              </div>

              <section>
                <BookingDetails />
              </section>
            </div>

            {/* Right Column - Summary Card (sidebar on desktop only) */}
            <div className="hidden lg:block">
              <div className="sticky top-24">
                <SummaryCard />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
