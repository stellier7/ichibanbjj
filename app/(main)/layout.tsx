import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      {/* Add top padding to account for fixed nav on non-home pages */}
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}
