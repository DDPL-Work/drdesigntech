import "./globals.css";
import FloatingActions from "@/components/layout/FloatingActions";
import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import { Toaster } from "sonner";

export const metadata = {
  metadataBase: new URL("https://drdesigntech.com"),
  title: {
    default: "Dr. Design Technology - Website Design, App Development & Digital Marketing Agency",
    template: "%s | Dr. Design Technology",
  },
  description:
    "Dr. Design Technology (DDPL) is an ISO-certified IT services firm in Dehradun & Delhi offering custom web design, mobile app development, SEO, performance marketing, AI chatbots, and GIS solutions across India.",
  keywords: [
    "website design company dehradun",
    "mobile app development company",
    "digital marketing agency dehradun",
    "web development services india",
    "custom software development",
    "seo services india",
    "erp crm development",
    "ai chatbots",
    "gis geospatial solutions",
    "dr design technology",
    "ddpl",
  ],
  authors: [{ name: "Dr. Design Technology", url: "https://drdesigntech.com" }],
  creator: "Dr. Design Technology",
  publisher: "Dr. Design Technology",
  openGraph: {
    title: "Dr. Design Technology - Website Design, App Development & Digital Marketing Agency",
    description:
      "Empowering businesses with custom web design, iOS/Android mobile apps, enterprise ERPs, and data-driven digital marketing.",
    url: "https://drdesigntech.com",
    siteName: "Dr. Design Technology",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Design Technology - Website Design, App Development & Digital Marketing Agency",
    description:
      "Custom web development, mobile apps, enterprise ERPs, and performance marketing.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
