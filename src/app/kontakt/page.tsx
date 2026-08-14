// app/kontakt/page.tsx
"use client";

declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
  }
}

import Image from "next/image";
import { Instagram, Facebook, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

import { kontaktSchema } from "../schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useContactStore } from "@/stores/contactStore";
import { PhoneLink } from "@/components/PhoneLink";
import {
  trackBookingComplete,
  trackPhoneClick,
  hasTrackedBooking,
  markBookingTracked,
} from "@/lib/analytics";
export default function Page() {
  type KontaktFormValues = z.infer<typeof kontaktSchema>;
  const { isSubmitting, submitContact } = useContactStore();
  const form = useForm<KontaktFormValues>({
    resolver: zodResolver(kontaktSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

const onSubmit = async (data: KontaktFormValues) => {
  try {
    await submitContact(data);

    // Trigger till Google Tag Manager
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "contact_form_submit",
        form_name: "kontakt",
      });
    }

    form.reset();
  } catch (error) {
    console.error("Form submission error:", error);
  }
};
  return (
    <main className="bg-gradient-to-b from-slate-50 to-white">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#0c8a84] to-[#0a6f6a] overflow-hidden mb-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <h1 className="mx-auto max-w-3xl text-center text-3xl sm:text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
            Ta kontakt med vårt
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-teal-100">
              team
            </span>
          </h1>
          
        </div>

        {/* Decorative elements */}
        <div className="pointer-events-none absolute right-2 sm:right-6 top-4 sm:top-6 w-80 h-80 md:w-[600px] md:h-[600px] opacity-20">
          <Image
            src="/illusion/circle.svg"
            alt=""
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c8a84]/20 to-transparent" />
      </section>

      {/* MAIN CONTENT CARD */}
      <section className="-mt-16 md:-mt-20 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="shadow-2xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* FORM AREA */}
                <div className="lg:col-span-2 p-8 md:p-12 bg-white">
                  <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                      Kontakta Oss
                    </h2>
                    <p className="text-slate-600">
                      Fyll i formuläret nedan så hör vi av oss
                    </p>
                  </div>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-medium text-sm">
                                Namn *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Ditt namn"
                                  className="h-11 bg-white border-slate-300 focus:border-[#0c8a84] focus:ring-[#0c8a84]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-medium text-sm">
                                E-post *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="din@email.se"
                                  className="h-11 bg-white border-slate-300 focus:border-[#0c8a84] focus:ring-[#0c8a84]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-medium text-sm">
                                Ämne *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Vad gäller det?"
                                  className="h-11 bg-white border-slate-300 focus:border-[#0c8a84] focus:ring-[#0c8a84]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-slate-700 font-medium text-sm">
                                Telefon *
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="+46 70 123 45 67"
                                  className="h-11 bg-white border-slate-300 focus:border-[#0c8a84] focus:ring-[#0c8a84]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-slate-700 font-medium text-sm">
                              Meddelande *
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                rows={5}
                                placeholder="Berätta mer om ditt ärende..."
                                className="resize-y bg-white border-slate-300 focus:border-[#0c8a84] focus:ring-[#0c8a84]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full md:w-auto px-12 h-12 bg-[#0c8a84] hover:bg-[#0a6f6a] text-white font-semibold text-base shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          {isSubmitting ? "Skickar..." : "Skicka meddelande"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>

                {/* SIDEBAR */}
                <aside className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-12 text-white flex flex-col justify-between">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-8 text-white">
                        Kontaktinformation
                      </h3>
                    </div>

                    <div className="space-y-8">
                      <div className="space-y-2">
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                          Besök oss
                        </p>
                        <p className="text-white font-medium leading-relaxed">
                          Emil Sjögrens väg 16A
                          <br />
                          74143 Knivsta
                        </p>
                      </div>

                      <div className="space-y-2">
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                          Prata med oss
                        </p>
                        <div className="space-y-2">
                          <p className="font-medium">
                            <a
                              href="tel:+46108085625"
                              className="text-white hover:text-[#0c8a84] transition-colors duration-200"
                            >
                              +46 10 808 56 25
                            </a>
                          </p>
                          <p className="font-medium">
                            <a
                              href="mailto:info@swediana.se"
                              className="text-white hover:text-[#0c8a84] transition-colors duration-200"
                            >
                              info@swediana.se
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                          Öppettider
                        </p>
                        <p className="text-white font-medium leading-relaxed">
                          Mån-Fre: 09:00 - 17:00
                          <br />
                          Lör-Sön: Stängt
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Links */}
                  <div className="mt-12 pt-8 border-t border-slate-700">
                    <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-4">
                      Följ oss
                    </p>
                    <div className="flex items-center gap-4">
                      <a
                        aria-label="Instagram"
                        href="https://instagram.com"
                        className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#0c8a84] flex items-center justify-center transition-all duration-200 hover:scale-110"
                      >
                        <Instagram size={20} />
                      </a>
                      <a
                        aria-label="Facebook"
                        href="https://facebook.com"
                        className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#0c8a84] flex items-center justify-center transition-all duration-200 hover:scale-110"
                      >
                        <Facebook size={20} />
                      </a>
                      <a
                        aria-label="TikTok"
                        href="https://tiktok.com"
                        className="w-10 h-10 rounded-full bg-slate-800 hover:bg-[#0c8a84] flex items-center justify-center transition-all duration-200 hover:scale-110"
                      >
                        <Music2 size={20} />
                      </a>
                    </div>
                  </div>
                </aside>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
