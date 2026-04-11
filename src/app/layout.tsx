import { StarsProvider } from '../context/stars-context';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <StarsProvider>{children}</StarsProvider>
      </body>
    </html>
  );
}
