export default function AboutHero() {
  return (
    <section
      className="relative flex h-[340px] items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/about-hero.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white/65" />

      <div className="relative z-10 max-w-[700px] px-6 text-center">
        <h1 className="text-[34px] font-bold leading-tight text-[#D91E05]">
          Engineering Trust. Delivering
          <br />
          Excellence.
        </h1>

        <p className="mt-4 text-[13px] leading-6 text-[#555]">
          Your reliable partner for technical maintenance, AC systems,
          and industrial electronics in Cirebon.
        </p>
      </div>
    </section>
  );
}