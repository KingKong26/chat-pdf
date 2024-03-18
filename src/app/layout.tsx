import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./global.css";
import { ClerkProvider } from "@clerk/nextjs";
import Provider from "@/components/Provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatPDF",
  description:
    "Your PDF AI - like ChatGPT but for PDFs. Summarize and answer questions for free.",
  icons: "favicon.ico",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <Provider>
        <html>
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </html>
      </Provider>
    </ClerkProvider>
  );
}
