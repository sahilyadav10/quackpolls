export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col bg-primary/5">
      <div className="flex-1 w-full md:mx-auto md:max-w-4xl xl:max-w-5xl">
        {children}
      </div>
    </div>
  );
}
