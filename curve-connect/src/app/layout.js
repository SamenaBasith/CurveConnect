import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export const metadata = {
  title: "CurveConnect",
  description: "Send virtual cards to colleagues",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex-col">
          <Header />
          <Hero />
          <main className="w-full pb-30 bg-blue-100 text-blue-900">{children}</main>
          <div className="fixed bottom-0 left-0 w-full">
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
