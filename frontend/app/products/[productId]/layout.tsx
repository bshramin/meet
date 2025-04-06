import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Details",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
