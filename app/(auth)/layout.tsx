import { FootCredit } from '@/components/FootCredit';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1">{children}</div>
      <FootCredit variant="light" />
    </div>
  );
}
