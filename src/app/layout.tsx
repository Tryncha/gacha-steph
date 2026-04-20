import { Metadata } from 'next';
import { GachaProvider } from '../context/gacha-context';
import CursorOverlay from '../components/cursor-overlay';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bunny Hunter Fantasy • stephaniaayalag'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es">
      <body className="bg-[#431164]">
        <CursorOverlay />
        <GachaProvider>{children}</GachaProvider>
      </body>
    </html>
  );
};

export default RootLayout;
