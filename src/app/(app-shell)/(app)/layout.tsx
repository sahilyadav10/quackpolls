import Sidebar from "@/components/generic/Sidebar";

export default function AppRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar />
      <div className="w-full md:mx-auto my-8 md:max-w-4xl xl:max-w-5xl px-8">
        {children}
      </div>
    </div>
  );
}
