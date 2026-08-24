import Image from "next/image";

export default function Portfolio() {
  const projects = [
    {
      image: "/images/Portofolio(1).png",
      title: "Instalasi AC",
      category: "AC & Refrigeration",
    },
    {
      image: "/images/portofolio(2).png",
      title: "Instalasi Kelistrikan",
      category: "Electrical",
    },
    {
      image: "/images/Portofolio(3).png",
      title: "Maintenance AC",
      category: "Maintenance",
    },
  ];

  return (
    <section id="portfolio" className="bg-[#F3FAFF] py-14">
      <div className="mx-auto max-w-[1200px] px-8">

        <div className="text-center">
          <h2 className="text-[24px] font-bold text-[#0F4C75]">
            Portfolio
          </h2>

          <p className="mt-2 text-[11px] text-[#64748B]">
            Beberapa pekerjaan yang telah kami kerjakan.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className="overflow-hidden rounded-xl border border-[#DCEAF3] bg-white shadow-[0_6px_20px_rgba(15,76,117,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(15,76,117,0.12)]"
            >
              <div className="relative h-[210px] w-full overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-[center_35%] transition duration-300 hover:scale-105"
                />
              </div>

              <div className="p-5">
                <p className="text-[9px] font-semibold uppercase tracking-wide text-[#D91E05]">
                  {project.category}
                </p>

                <h3 className="mt-2 text-[14px] font-bold text-[#0F4C75]">
                  {project.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}