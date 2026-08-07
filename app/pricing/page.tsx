import type { Metadata } from "next";
import PricingView from "@/components/pricing/PricingView";

export const metadata: Metadata = {
  title: "料金プラン | Social Smart",
};

export default function PricingPage() {
  return (
    <div className="card p-6 md:p-14 w-full max-w-[1040px]" id="view-pricing">
      <PricingView />
    </div>
  );
}
