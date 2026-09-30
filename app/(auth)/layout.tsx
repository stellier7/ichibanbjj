import { FootCredit } from '@/components/FootCredit';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FootCredit variant="light" />
    </>
  );
}
