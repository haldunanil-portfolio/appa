import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Countdown to Appa!!!",
  description: "Counting down to Appa day! Best viewed in Netscape Navigator.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
