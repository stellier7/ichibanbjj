type FootCreditProps = {
  variant?: 'dark' | 'light';
};

export function FootCredit({ variant = 'dark' }: FootCreditProps) {
  return (
    <div className={`foot-credit${variant === 'light' ? ' foot-credit--light' : ''}`}>
      Desarrollado por{' '}
      <a
        href="https://iagodigital.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
      >
        IAGO Digital
      </a>
    </div>
  );
}
