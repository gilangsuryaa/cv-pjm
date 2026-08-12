import Image from "next/image";

export default function Portfolio() {
  const projects = [
    {
      image: "/images/Portofolio 1.jpeg",
      title: "Instalasi AC",
      category: "AC & Refrigeration",
    },
    {
      image: "/images/Portofolio (2).jpeg",
      title: "Instalasi Kelistrikan",
      category: "Electrical",
    },
    {
      image: "/images/Portofolio 3.jpeg",
      title: "Maintenance AC",
      category: "Maintenance",
    },
  ];

  return (
    <section id="portfolio" className="bg-[#FFF8E8] py-14">
      <div className="mx-auto max-w-[1200px] px-8">

        <div className="text-center">
          <h2 className="text-[24px] font-bold text-[#0788D1]">
            Portfolio
          </h2>

          <p className="mt-2 text-[11px] text-[#666]">
            Beberapa pekerjaan yang telah kami kerjakan.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.title}
              className="overflow-hidden border border-[#dddddd] bg-white"
            >
              <div className="relative h-[210px] w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5">
                <p className="text-[9px] font-semibold uppercase tracking-wide text-[#D91E05]">
                  {project.category}
                </p>

                <h3 className="mt-2 text-[14px] font-bold text-[#222]">
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