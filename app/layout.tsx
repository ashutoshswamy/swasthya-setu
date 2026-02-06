import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "स्वास्थ्य सेतु | Swasthya Setu - Solapur Municipal Corporation",
  description: "A Centralized Health Management System for Solapur City - Report incidents, check hospital bed availability, and view disease trends.",
  keywords: ["health", "solapur", "municipal", "hospital", "beds", "disease", "tracking", "swasthya setu"],
  authors: [{ name: "Solapur Municipal Corporation" }],
  openGraph: {
    title: "स्वास्थ्य सेतु | Swasthya Setu",
    description: "Centralized Health Management System for Solapur City",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins antialiased">
        {children}
      </body>
    </html>
  );
}
