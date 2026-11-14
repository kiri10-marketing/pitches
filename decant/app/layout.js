import '@fontsource-variable/inter-tight';
import './globals.css';

export const metadata = {
  title: 'Decant | Downsizing made clear and simple',
  description:
    'A downsizing concierge for Christchurch. We find your next home first, sell yours quietly, and put $3,000 towards your move. Every decision is yours.',
  robots: { index: false, follow: false },
};

export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#f4f5f0' };

export default function RootLayout({ children }) {
  return (
    <html lang="en-NZ">
      <body>{children}</body>
    </html>
  );
}
