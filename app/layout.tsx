import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

export const metadata: Metadata = {
  title: "proPAL AI - Voice AI for Indian Businesses",
  description:
    "Revolutionize customer interactions with multilingual voice agents that speak naturally in Indian languages and dialects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
