import type { Metadata } from "next";
import { Inter, Noto_Serif_JP, DM_Sans, Rozha_One } from "next/font/google"; // Added DM Sans for modern feel
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const serif = Noto_Serif_JP({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-serif',
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans", // Use this for clean UI text
});
const rozhaOne = Rozha_One({
  weight: ['400'],
  subsets: ['devanagari', 'latin'],
  variable: '--font-rozha',
});

export const metadata: Metadata = {
  title: "MATON | Premium Matcha",
  description: "Experience the finest ceremonial grade matcha from Uji, Japan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${serif.variable} ${dmSans.variable} ${rozhaOne.variable}`} suppressHydrationWarning>
        <Providers>
          <Header />
          <main>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
