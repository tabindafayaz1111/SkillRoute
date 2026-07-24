import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ProgressProvider } from "@/components/providers/progress-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AiMentor } from "@/components/mentor/ai-mentor";
import { LoginModal } from "@/components/auth/login-modal";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "SkillRoute — Learn to code, analyze data & build with AI",
  description:
    "An interactive platform to learn programming, web development, data analytics, and AI from absolute zero to job-ready. Stories, animations, live code, projects, and an AI mentor. 21 courses, free forever.",
  keywords: [
    "learn to code",
    "programming courses",
    "data analytics",
    "machine learning",
    "web development",
    "interactive learning",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <ProgressProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <AiMentor />
              <LoginModal />
            </ProgressProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
