import { GachaProvider } from '../context/gacha-context';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-[#431164]">
        <GachaProvider>{children}</GachaProvider>
      </body>
    </html>
  );
}
