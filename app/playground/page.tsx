import type { Metadata } from "next";
import PlaygroundView from "@/components/playground/PlaygroundView";

export const metadata: Metadata = {
  title: "プレイグラウンド | Social Smart",
};

export default function PlaygroundPage() {
  return <PlaygroundView />;
}
