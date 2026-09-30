const IAGO_DIGITAL_URL = 'https://www.iagodigital.com';

type FootCreditProps = {
  variant?: 'dark' | 'light';
};

export function FootCredit({ variant = 'dark' }: FootCreditProps) {
  return (
    <div className={`foot-credit${variant === 'light' ? ' foot-credit--light' : ''}`}>
      Desarrollado por{' '}
      <a href={IAGO_DIGITAL_URL} target="_blank" rel="noopener noreferrer">
        IAGO Digital
      </a>
    </div>
  );
}
