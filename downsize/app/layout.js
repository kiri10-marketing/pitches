import '@fontsource-variable/figtree';
import './globals.css';

export const metadata = {
  title: 'Level | The downsizing exchange for New Zealand',
  description:
    'List your address, see single-level homes near you, and move once. Every decision is yours. We do the leg work.',
  robots: { index: false, follow: false },
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#EEF5EC' };

export default function RootLayout({ children }) {
  return (
    <html lang="en-NZ">
      <body>{children}</body>
    </html>
  );
}
