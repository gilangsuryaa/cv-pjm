type FadeInSectionProps = {
  id?: string;
  className?: string;
  children: React.ReactNode;
};

// Section dengan efek fade-in saat pertama kali tampil.
// Efeknya murni CSS supaya section-nya tetap bisa jadi server component
// yang mengambil data dari Supabase.
export default function FadeInSection({
  id,
  className = "",
  children,
}: FadeInSectionProps) {
  return (
    <section id={id} className={`${className} animate-fade-in`}>
      {children}
    </section>
  );
}
