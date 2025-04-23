import Navbar from "@/components/generic/Navbar";
import Footer from "@/components/app/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="min-h-screen flex flex-col">
      <div className="flex-1 w-full md:mx-auto my-5 md:max-w-4xl xl:max-w-5xl pt-16">
        <Navbar />
        {children}
      </div>
      <Footer />
    </body>
  );
}
