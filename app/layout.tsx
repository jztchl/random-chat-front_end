import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Random Room Chats",
  description: "Random Room Chats",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
