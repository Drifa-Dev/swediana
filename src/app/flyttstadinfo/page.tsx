// app/your-page/page.tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

import SafetyGuarantee from "@/components/SafetyGuarantee";
import { faqItemsFlyttstad } from "../util/items";
import FAQTilesCollapsing from "@/components/FAQTiles";
import ChecklistSectionStad from "@/components/ChecklistSectionStad";

export default function Page() {
  const saftyTitle = "Vår nöjdhetsgaranti för flyttstädning";
  const subtitleSafty =
    "Din tillfredsställelse är vår prioritet. Alla våra flyttstädningar kommer med en 24-timmars nöjdhetsgaranti. Om något inte lever upp till dina förväntningar inom denna tid, hör av dig så åtgärdar vi det omgående.";

  return (
    <div className="overflow-x-hidden">
      {/* Header Section */}
      <div className="relative flex items-center h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[100vh]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/vase.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-white font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight">
              Flyttstädning
            </h1>
            <Link
              href="/flyttstad"
              className="group mt-6 sm:mt-8 inline-flex items-center justify-center gap-2 sm:gap-3 bg-[#28ebde] text-gray-900 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base lg:text-lg hover:gap-3 sm:hover:gap-5 hover:px-8 sm:hover:px-10 lg:hover:px-12 transition-all duration-300 shadow-lg shadow-[#28ebde]/50 hover:shadow-xl hover:shadow-[#28ebde]/70 hover:scale-105 active:scale-95 touch-manipulation w-full sm:w-auto max-w-md sm:max-w-none"
            >
              <span className="whitespace-nowrap">Boka flyttstädning</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </div>

      {/* CURVED BACKGROUND SECTION */}
      <section className="relative overflow-hidden mt-8 sm:mt-12 md:mt-16 lg:mt-20 py-8 sm:py-12 md:py-16 lg:py-20">
        <div
          aria-hidden
          className="absolute -left-[50vw] -top-[50vw] h-[150vw] w-[150vw] rounded-full bg-[#95fff8] -z-10
                     sm:-left-[40vw] sm:-top-[40vw] sm:h-[130vw] sm:w-[130vw]
                     md:-left-[30vw] md:-top-[30vw] md:h-[100vw] md:w-[100vw]
                     lg:-left-[28vw] lg:-top-[28vw] lg:h-[95vw] lg:w-[95vw]"
        />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold max-w-4xl mx-auto leading-tight px-2">
            Professionell flyttstädning för en perfekt överlämning
          </h2>
          <p className="mt-4 sm:mt-6 lg:mt-8 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed px-2">
            Slipp stressen med flyttstädningen. Vi erbjuder noggrann och
            professionell flyttstädning som uppfyller alla krav från mäklare och
            nya ägare. Lita på oss för ett prickfritt resultat.
          </p>
          
        </div>
      </section>

      {/* NEW SECTION: Price, Checklist & Guarantee */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
          Flyttstädning – Pris, Checklista & Garanti för Problemfri Flytt
        </h2>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6">
          Att flytta är stressigt nog. Låt oss ta hand om det sista, men viktigaste, steget: Flyttstädningen. När du väljer en professionell partner säkerställer du att städningen blir godkänd direkt, undviker dyra tvister och får mer tid att fokusera på ditt nya hem.
        </p>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed mb-8 sm:mb-10">
          Vi på Swediana AB erbjuder en omfattande och garanti-godkänd flyttstädningstjänst för både lägenheter och villor över hela Uppsala och Stockholm.
        </p>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">
          Flyttstädning Checklista: Vad Ingår?
        </h3>
        <p className="mb-4 sm:mb-6 text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl">
          Vår flyttstädning är total och följer en strikt checklista som uppfyller hyresvärdars, bostadsrättsföreningars och mäklares höga krav. Vi garanterar att varje vrå blir skinande ren.
        </p>

        {/* Table - Mobilanpassad */}
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle px-4 sm:px-0">
            <table className="min-w-full border border-gray-300 text-left text-xs sm:text-sm lg:text-base">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-2 sm:p-3 font-semibold min-w-[80px] sm:min-w-[100px]">
                    Område
                  </th>
                  <th className="border p-2 sm:p-3 font-semibold min-w-[150px] sm:min-w-[200px]">
                    Vad ingår
                  </th>
                  <th className="border p-2 sm:p-3 font-semibold min-w-[150px] sm:min-w-[200px]">
                    Vad ingår inte (Tilläggstjänster)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 sm:p-3 font-bold align-top">Kök</td>
                  <td className="border p-2 sm:p-3 align-top">
                    Rengöring in- och utvändigt av vitvaror, skåp och lådor.
                  </td>
                  <td className="border p-2 sm:p-3 align-top">
                    Grovrengöring av ugn/spis vid kraftig nedsmutsning. Ej tömda vitvaror.
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 sm:p-3 font-bold align-top">Badrum/WC</td>
                  <td className="border p-2 sm:p-3 align-top">
                    Kalkborttagning, rengöring av toalett, dusch/badkar och golvbrunnar.
                  </td>
                  <td className="border p-2 sm:p-3 align-top">
                    Borttagning av silikonfog, klistermärken m.m.
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 sm:p-3 font-bold align-top">Bostadsrum</td>
                  <td className="border p-2 sm:p-3 align-top">
                    Dammsugning, våttorkning, torkning av lister, dörrar och element.
                  </td>
                  <td className="border p-2 sm:p-3 align-top">
                    Tömning av förråd/garage/vind.
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 sm:p-3 font-bold align-top">Övrigt</td>
                  <td className="border p-2 sm:p-3 align-top">
                    Fönsterputs (samtliga sidor).
                  </td>
                  <td className="border p-2 sm:p-3 align-top">
                    Balkong- och altanstädning.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="text-lg sm:text-xl md:text-2xl font-bold mt-8 sm:mt-10 mb-3 sm:mb-4">
          Vad gäller vid Flyttstädning?
        </h3>
        <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-4xl">
          Det viktigaste är att städningen är komplett och godkänd. Detta innebär att varje yta ska vara rengjord enligt branschstandard så att nästa boende kan flytta in utan anmärkningar. Genom att anlita oss får du en städfirma med garanti, vilket tar bort all oro.
        </p>
      </section>

      <div className="w-full">
        {/* TEAL PROMO STRIP */}
        <section className="relative overflow-hidden bg-[#007a7b] text-white py-10 sm:py-14 md:py-16 lg:py-20">
          {/* DESKTOP + TABLET (≥ 640px) */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none hidden sm:block"
            style={{
              backgroundImage: "url('/procent.svg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "70%",
            }}
          ></div>

          {/* MOBILE (≤ 639px) */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none sm:hidden"
            style={{
              backgroundImage: "url('/procent.mob.svg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "90%",
            }}
          ></div>

          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-10 max-w-7xl mx-auto">
              {/* VÄNSTER TEXT */}
              <div className="w-full md:w-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                  Så förbereder du inför vår flyttstädning en enkel checklista!
                </h2>

                <ul className="mt-8 sm:mt-12 md:mt-16 lg:mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-10 text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                  {[
                    "Informera om speciella behov",
                    "Töm bostaden helt",
                    "Frosta av frysen",
                    "Säkerställ el och vatten",
                    "Kontrollera nycklar",
                    "Dubbelkolla allt en extra gång",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 sm:gap-4">
                      <svg
                        className="mt-0.5 sm:mt-1 h-5 w-5 sm:h-6 sm:w-6 flex-none rounded border border-white/40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="4" />
                        <path d="m8 12 3 3 5-7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* HÖGER CIRKEL */}
              <div className="w-full md:w-auto flex justify-center md:justify-end overflow-visible">
                <div className="relative rounded-full bg-[#95fff8] text-[#3f3f3f] w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[380px] md:h-[380px] lg:w-[420px] lg:h-[420px] flex items-center justify-center p-6 sm:p-8 md:p-10 text-center md:mr-0 lg:mr-[-60px] xl:mr-[-100px]">
                  <div>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold leading-relaxed">
                      Förenkla din flytt! När du
                      <br />
                      bokar både flyttstädning
                      <br />
                      och flytthjälp hos oss, får
                      <br />
                      du <span className="font-extrabold">15% rabatt</span> på
                      din
                      <br />
                      flyttstädning
                    </p>

                    <Link
                      href="/flytthjalp"
                      className="mt-4 sm:mt-6 inline-block text-sm sm:text-base lg:text-lg font-semibold text-[#3f3f3f] underline underline-offset-4 hover:text-[#1e1e1e] transition"
                    >
                      Boka nu
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRYGGHETSBLOCK */}
        <section className="bg-[#e6f7f5]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* VÄNSTER: BILD */}
            <div className="relative h-[220px] sm:h-[280px] md:h-[400px] lg:h-[500px] w-full">
              <Image
                src="/Orange_Chair.png"
                alt="Orange stol"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* HÖGER: TEXT + DEKOR-LINJER */}
            <div className="relative px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-10 md:py-12 flex items-center">
              {/* Dekorativa linjer bakom texten */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-4 sm:-top-6 md:-top-10 left-4 sm:left-6 md:left-10 w-32 sm:w-40 md:w-56 h-24 sm:h-32 md:h-40 border-4 sm:border-6 md:border-8 border-teal-500/70 rounded-[999px] rotate-[-10deg]"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute top-6 sm:top-10 md:top-16 left-20 sm:left-24 md:left-36 w-32 sm:w-40 md:w-56 h-24 sm:h-32 md:h-40 border-4 sm:border-6 md:border-8 border-teal-500/50 rounded-[999px] rotate-[8deg]"
              />

              <div className="relative z-10 max-w-xl">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                  Vår nöjdhetsgaranti <br />
                  för flyttstädning
                </h3>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed">
                  Din tillfredsställelse är vår prioritet. Alla våra
                  flyttstädningar kommer med en 24-timmars nöjdhetsgaranti. Om
                  något inte lever upp till dina förväntningar inom denna tid,
                  hör av dig så åtgärdar vi det omgående.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14 md:py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
          {/* Left title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            Pris & Kostnader: Svar på Dina Frågor
            <span className="block text-teal-700">flyttstädning</span>
          </h2>

          {/* Right text */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-sm sm:text-base lg:text-lg max-w-md font-bold">
              Den vanligaste frågan vid flytt är: Hur mycket kostar flyttstädning?
            </p>
          </div>
        </div>

        {/* FAQ tiles */}
        <div className="mt-6 sm:mt-8 md:mt-10">
          <FAQTilesCollapsing
            items={faqItemsFlyttstad}
            collapsed={180}
            expanded={350}
            height={400}
            gap={15}
          />
        </div>
      </section>
    </div>
  );
}