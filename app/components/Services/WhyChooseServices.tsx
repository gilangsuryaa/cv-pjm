import {
  Shield,
  Factory,
  Gauge,
} from "lucide-react";

export default function WhyChooseServices() {
  const items = [
    {
      icon: Shield,
      title: "Unwavering Trust",
      description:
        "Transparent pricing, detailed reporting, and a commitment to honest technical assessments on every job.",
    },
    {
      icon: Factory,
      title: "Engineered Professionalism",
      description:
        "Certified technicians utilizing industry-standard tools and adhering strictly to safety protocols.",
    },
    {
      icon: Gauge,
      title: "Rapid Response",
      description:
        "Optimized logistics and dispatch ensuring minimal downtime for your critical infrastructure.",
    },
  ];

  return (
    <section className="border-t border-[#e5cfc8] bg-white">
      <div className="mx-auto max-w-[1200px] px-8 py-12">

        <h2 className="text-center text-[28px] font-bold text-[#171717]">
          Why Choose PJM
        </h2>

        <div className="mt-8 grid grid-cols-3 gap-12">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.title} className="text-center">
                <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-[#e5cfc8] bg-[#faf5f4]">
                  <Icon
                    size={23}
                    strokeWidth={1.7}
                    className="text-[#78150f]"
                  />
                </div>

                <h3 className="mt-4 text-[19px] font-medium text-[#222]">
                  {item.title}
                </h3>

                <p className="mx-auto mt-2 max-w-[290px] text-[12px] leading-5 text-[#604f4b]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}