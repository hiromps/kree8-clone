"use client";

import { useState } from "react";
import { CONTACT_MAILTO } from "@/lib/site";

const TABS = [
  { key: "hp", label: "HP制作" },
  { key: "lp", label: "LP制作" },
  { key: "ai", label: "AI自動化開発" },
  { key: "sns", label: "SNS運用" },
];

const RETAINER_CHIPS = ["HP制作", "LP制作", "AI自動化", "チャットボット", "SNS運用", "データ分析", "保守・運用"];

// Same 3D tilt as the original's [data-tilt] mousemove handler.
function tiltMove(e: React.MouseEvent<HTMLDivElement>) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - 0.5;
  const y = (e.clientY - rect.top) / rect.height - 0.5;
  card.style.transform = `perspective(600px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
}

function tiltLeave(e: React.MouseEvent<HTMLDivElement>) {
  e.currentTarget.style.transform = "perspective(600px) rotateY(0deg) rotateX(0deg) scale(1)";
}

export default function PricingView() {
  const [activeTab, setActiveTab] = useState("hp");
  const [devOn, setDevOn] = useState(false);
  const [qty, setQty] = useState(1);

  return (
    <section className="py-6">
      <p className="text-sm tracking-wide text-gray-400 font-semibold mb-4">PRICING</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-2">料金プラン</h2>
      <p className="text-gray-500 max-w-lg mb-10">
        一括プランと、月額サポートプランの2種類をご用意しています。プロジェクトに合わせてお選びください。
      </p>

      <div className="flex gap-2.5 flex-wrap mb-10" id="pricing-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn${activeTab === tab.key ? " active" : ""}`}
            data-tab={tab.key}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center gap-7 w-full">
        {/* One-time card */}
        <div className="pricing-card p-4 md:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <p className="font-extrabold text-lg">HP制作パッケージ</p>
                <span className="flex items-center gap-1 text-xs text-gray-400 border border-gray-200 rounded-full px-2.5 py-1">
                  <i className="ri-time-line"></i> 20〜30日
                </span>
              </div>

              <button
                type="button"
                id="add-dev-toggle"
                className="row-box flex items-start justify-between text-left w-full"
                onClick={() => setDevOn((on) => !on)}
              >
                <span>
                  <span className="flex items-center gap-2 text-[15px] font-medium text-[#304F67]">
                    AIチャットボットを追加
                    <img src="/images/pricing/icons/nextjs.svg" alt="Next.js" className="h-4" />
                    <img src="/images/pricing/icons/vercel.svg" alt="Vercel" className="h-4" />
                    <img src="/images/pricing/icons/tailwind.svg" alt="Tailwind CSS" className="h-4" />
                  </span>
                  <span className="block text-sm text-gray-400 mt-1">+¥100,000</span>
                </span>
                <span className={`toggle-switch${devOn ? " on" : ""}`} id="add-dev-switch"></span>
              </button>

              <div className="row-box flex items-center justify-between">
                <span className="text-[15px] font-medium text-[#304F67]">追加ページ</span>
                <span className="text-sm text-gray-400">
                  +¥20,000<span className="text-[var(--ink)] font-semibold">/ページ</span>
                </span>
              </div>

              <div className="row-box flex items-center justify-between">
                <span className="text-[15px] font-medium text-[#304F67]">アニメーション追加</span>
                <span className="text-sm text-gray-400">
                  +¥15,000<span className="text-[var(--ink)] font-semibold">/箇所</span>
                </span>
              </div>

              <ul className="flex flex-col gap-3 mt-1">
                {["オリジナルデザイン設計", "PC・タブレット・スマホ対応", "お問い合わせフォーム設置", "修正回数無制限", "48時間ごとに進捗共有"].map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2 text-[15px] font-medium text-[#304F67]">
                      <i className="ri-checkbox-circle-line text-gray-400"></i> {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <div
                className="price-card price-card-blue h-[237px] p-5 flex flex-col justify-between"
                data-tilt
                onMouseMove={tiltMove}
                onMouseLeave={tiltLeave}
              >
                <p className="font-extrabold text-xl text-white/50 relative z-10">SOCIAL SMART</p>
                <div className="relative z-10">
                  <p className="text-xs tracking-widest text-[#0a3a63]/70 font-semibold mb-1">WEBSITE PACKAGE</p>
                  <p className="price-font text-[30px] sm:text-[40px] leading-[40px]" style={{ color: "#007BE5" }}>
                    ¥300,000
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <a href={CONTACT_MAILTO} className="pill-btn pill-dark flex-1 justify-center">
                  <i className="ri-mail-send-line"></i> メールで相談
                </a>
                <a href={CONTACT_MAILTO} className="pill-btn pill-light flex-1 justify-center">
                  <i className="ri-mail-line"></i> お問い合わせ
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Retainer card */}
        <div className="glow-wrap w-full flex justify-center">
          <div className="pricing-card p-4 md:p-7">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <p className="font-extrabold text-lg mb-1">月額サポートプラン</p>

                <div className="row-box flex items-center gap-3">
                  <i className="ri-checkbox-circle-fill text-green-600"></i>
                  <span className="qty-pill">
                    <button type="button" id="qty-minus" onClick={() => setQty((q) => Math.max(q - 1, 1))}>
                      <i className="ri-subtract-line"></i>
                    </button>
                    <span className="font-semibold text-sm w-4 text-center" id="qty-value">
                      {qty}
                    </span>
                    <button type="button" id="qty-plus" onClick={() => setQty((q) => Math.min(q + 1, 20))}>
                      <i className="ri-add-line"></i>
                    </button>
                  </span>
                  <span className="text-[15px] font-medium text-[#304F67]">進行中タスク</span>
                </div>

                <ul className="flex flex-col gap-3">
                  {["HP・LPの修正/更新対応", "AI自動化の保守・改善", "修正回数無制限", "月次レポート", "下記すべてのサービスに対応"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[15px] font-medium text-[#304F67]">
                      <i className="ri-checkbox-circle-line text-gray-400"></i> {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1">
                  {RETAINER_CHIPS.map((chip) => (
                    <span key={chip} className="bg-gray-100 rounded-full px-3 py-1.5">
                      {chip}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div
                  className="price-card price-card-green h-[237px] p-5 flex flex-col justify-between"
                  data-tilt
                  onMouseMove={tiltMove}
                  onMouseLeave={tiltLeave}
                >
                  <p className="font-extrabold text-xl text-white/50 relative z-10">SOCIAL SMART</p>
                  <div className="relative z-10">
                    <p className="text-xs tracking-widest text-[#0a3a1e]/70 font-semibold mb-1">MONTHLY SUPPORT</p>
                    <p className="price-font text-[30px] sm:text-[40px] leading-[40px]" style={{ color: "#237F00" }}>
                      ¥50,000<span className="text-base font-semibold" style={{ fontFamily: "var(--font-inter),var(--font-noto-jp),sans-serif" }}>/月</span>
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <a href={CONTACT_MAILTO} className="pill-btn pill-dark flex-1 justify-center">
                    <i className="ri-mail-send-line"></i> メールで相談
                  </a>
                  <a href={CONTACT_MAILTO} className="pill-btn pill-light flex-1 justify-center">
                    <i className="ri-mail-line"></i> お問い合わせ
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-lg text-[var(--muted-2)] max-w-xl mt-14 leading-relaxed">
        今日の数クリックで、明日には最初のご提案が届きます。あなたのサイトや業務が、少しずつ形になっていくのを実感してください。
      </p>
    </section>
  );
}
