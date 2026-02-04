import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Countdown to Appa!!!",
  description: "Counting down to Appa day! Best viewed in Netscape Navigator.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Countdown to Appa!!!",
    description: "Counting down to Appa day! Best viewed in Netscape Navigator.",
    images: [
      {
        url: "/appa.png",
        width: 1200,
        height: 630,
        alt: "Appa the puppy",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Countdown to Appa!!!",
    description: "Counting down to Appa day! Best viewed in Netscape Navigator.",
    images: ["/appa.png"],
  },
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
