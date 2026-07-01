import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ProgressProvider } from "@/components/providers/progress-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AiMentor } from "@/components/mentor/ai-mentor";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "ML Academy — Learn Machine Learning & Deep Learning the fun way",
  description:
    "An interactive platform to learn Machine Learning and Deep Learning from absolute zero to industry expert. Stories, animations, live code, projects, and an AI mentor.",
  keywords: ["machine learning", "deep learning", "AI course", "learn ML", "interactive"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ProgressProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <AiMentor />
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
