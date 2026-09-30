import type { Metadata } from "next";
import ProductsView from "@/components/products/ProductsView";

export const metadata: Metadata = {
  title: "プロダクト | Social Smart",
};

export default function ProductsPage() {
  return (
    <div className="card p-6 md:p-10 w-full max-w-[1180px]" id="view-projects">
      <ProductsView />
    </div>
  );
}
