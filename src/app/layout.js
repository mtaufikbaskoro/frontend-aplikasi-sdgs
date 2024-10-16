import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'

config.autoAddCss = false

export const metadata = {
  title: "SDGs Pemerintah Kota Medan",
  description: "Aplikasi untuk monitoring dan evaluasi SGDs Pemerintah Kota Medan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
