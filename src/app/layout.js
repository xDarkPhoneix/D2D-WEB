import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "D2D Social Studio",
    template: "%s | D2D Social Studio",
  },
  description:
    "D2D Social Studio is a creative digital agency specializing in social media marketing, branding, content creation, and growth strategies.",
  keywords: [
    "D2D Social Studio",
    "Social Media Marketing",
    "Digital Marketing Agency",
    "Branding",
    "Content Creation",
    "Influencer Marketing",
  ],
  authors: [{ name: "D2D Social Studio" }],
  creator: "D2D Social Studio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
