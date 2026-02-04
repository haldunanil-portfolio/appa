import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Countdown to Appa!!!",
  description: "Counting down to Appa day! Best viewed in Netscape Navigator.",
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
