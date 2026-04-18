import Link from 'next/link';
import styles from './LinkButton.module.css';

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  target?: '_blank' | '_self';
}

export default function LinkButton({
  href,
  children,
  target,
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      className={styles.btn}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
    >
      {children}
    </Link>
  );
}
