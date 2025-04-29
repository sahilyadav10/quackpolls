import ClientAuth from "@/components/app/ClientAuth";

export default function UserAppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientAuth>{children}</ClientAuth>;
}
