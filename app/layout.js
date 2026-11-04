import "./globals.css";
import FloatingActions from "@/components/layout/FloatingActions";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import { Toaster } from "sonner";

export const metadata = {
  title: "Dr. Design Technology — IT Services, Digital Transformation & Geospatial Solutions",
  description:
    "DR.DESIGN TECH is a premier technology firm specializing in custom IT Services, GIS, and Digital Transformation.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport = {
  themeColor: "#0b4db5",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', function(e) {
                if (e && e.message && /Loading chunk .* failed|Failed to fetch dynamically imported module/i.test(e.message)) {
                  if (!window.__chunkReloaded) {
                    window.__chunkReloaded = true;
                    window.location.reload();
                  }
                }
              });
            `,
          }}
        />
      </head>
      <body>
        <div className="site flex flex-col min-h-screen overflow-x-clip">
          <Navbar />
          <main className="grow flex flex-col overflow-x-clip">
            {children}
          </main>
          <Footer />
          <FloatingActions />
          <Toaster position="bottom-right" richColors closeButton />
        </div>
      </body>
    </html>
  );
}
