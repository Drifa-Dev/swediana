
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Våra värderingar",
};

type BlockProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  indent?: boolean;
};

function TextBlock({ title, children, className = "", indent }: BlockProps) {
  return (
    <section className={`max-w-[42ch] ${className}`}>
      <h2 className="text-[34px] md:text-[38px] font-semibold text-gray-800 tracking-tight">
        {title}
      </h2>
      <p
        className={`mt-4 text-[17px] leading-7 text-gray-600 ${
          indent ? "pl-4" : ""
        }`}
      >
        {children}
      </p>
    </section>
  );
}

export default function Page() {
  return (
    <main className=" px-5 md:px-8 lg:px-20 pt-16 md:pt-20 lg:pt-25 pb-24">
      {/* Staggered grid with big airy gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 md:gap-y-20 lg:gap-y-28 lg:gap-x-16">

        {/* Left / top (Kvalité) */}
        <div className="lg:col-span-4 lg:col-start-1 lg:row-start-1">
          <TextBlock title="Kvalité">
            Arbetar ständigt med att kunna erbjuda våra kunder hög kvalité på
            våra tjänster. Det gör vi genom snabb kundservice som har en smidig
            och förtroendefull dialog med våra kunder, att vi kontinuerligt
            utbildar vår personal och har engagerade kvalitetschefer ute på
            fältet som ständigt kontrollerar att kvalitén upprätthålls hos våra
            kunder.
          </TextBlock>
        </div>

        {/* Center / middle, slightly lower (Ansvar) */}
        <div className="lg:col-span-4 lg:col-start-5 lg:row-start-2">
          <TextBlock title="Ansvar" className="lg:mt-2">
            medarbetarna har bra villkor och goda förutsättningar att trivas
            med sitt arbete. Detta gör att många medarbetare stannar länge hos
           Swediana som i sin tur gör att vi har nöjda kunder.
          </TextBlock>
        </div>

        {/* Right / bottom, clearly lower & indented paragraph (Hållbarhet & miljö) */}
        <div className="lg:col-span-4 lg:col-start-9 lg:row-start-3">
          <TextBlock title="Hållbarhet & miljö" indent>
            Personal åker kollektivtrafik till kunderna vilket gör att vi
            undviker cirka 250 ton koldioxidutsläpp per år.
          </TextBlock>
        </div>
      </div>
    </main>
  );
}
