"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT_MAILTO, GITHUB_URL, PRODUCTS } from "@/lib/site";

// Hardcoded rotations replace the original's Math.random() so SSR markup and
// hydration agree (visually indistinguishable from the random -17..+17deg range).
const FRAG_WORD = "FRAGMENTATION";
const FRAG_ROTATIONS = [-12.4, 8.1, -3.7, 15.2, -8.9, 4.6, -15.8, 11.3, -6.2, 2.8, -10.5, 13.7, -1.9];

const TYPE_SIZES = [12, 14, 16, 18, 20, 24, 28, 32, 40, 48];

const FLOW_STEPS = [
  { art: "/images/flow/step-1.svg", icon: "ri-chat-3-fill", name: "01 相談・ヒアリング", desc: "課題とゴールを整理します" },
  { art: "/images/flow/step-2.svg", icon: "ri-pencil-ruler-2-fill", name: "02 設計", desc: "最適な仕組みと構成をご提案" },
  { art: "/images/flow/step-3.svg", icon: "ri-code-box-fill", name: "03 開発・自動化", desc: "実装し、自動化を組み込みます" },
  { art: "/images/flow/step-4.svg", icon: "ri-line-chart-fill", name: "04 運用・改善", desc: "データを見ながら継続改善" },
];

const SERVICE_AREAS = [
  { icon: "/images/categories/ai-automation.svg", label: "AI自動化" },
  { icon: "/images/categories/web.svg", label: "Web制作" },
  { icon: "/images/categories/lp.svg", label: "LP制作" },
  { icon: "/images/categories/chatbot.svg", label: "チャットボット" },
  { icon: "/images/categories/sns.svg", label: "SNS運用" },
  { icon: "/images/categories/efficiency.svg", label: "業務効率化" },
  { icon: "/images/categories/data.svg", label: "データ分析" },
  { icon: "/images/categories/api.svg", label: "API連携" },
  { icon: "/images/categories/support.svg", label: "運用サポート" },
];

function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // No bundled hero.mp4 yet, so the video sits paused on its poster; the play icon
  // is derived from the element's real state instead of assuming autoplay ran.
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  return (
    <section id="home" className="pb-10">
      <p className="inline-block rounded-full border border-[var(--pink-border)] bg-[var(--pink-tint)] px-4 py-1.5 text-[13px] tracking-wide text-[var(--pilot-pink)] font-semibold mb-4">
        AI × 自動化で <span className="font-bold">5つのプロダクト</span> を開発・運営中
      </p>
      <h1 className="text-[28px] sm:text-[34px] md:text-[52px] leading-[1.15] font-bold max-w-3xl mb-8">
        <span className="text-[var(--ink)]">
          AIで、社会を<i className="ri-shape-2-fill inline-block align-middle" style={{ color: "#FF6B9D", fontSize: "0.75em" }}></i>スマートに。
        </span>
        <span className="text-[var(--muted)]"> 自動化で、</span>
        <span className="text-[var(--muted)]"> 人とサービスを </span>
        <span className="bg-[linear-gradient(135deg,#B366FF_0%,#FF6B9D_48%,#FF8A65_100%)] bg-clip-text text-transparent">つなぐ。</span>
      </h1>
      <div className="flex flex-wrap gap-3 mb-10">
        <a href={CONTACT_MAILTO} className="pill-btn pill-dark">
          <i className="ri-mail-line"></i> お問い合わせ
        </a>
        <Link href="/products" className="pill-btn pill-light">
          <i className="ri-folder-open-line"></i> プロダクトを見る
        </Link>
      </div>

      <div className="rounded-[28px] bg-[#F5F5F5] border border-[#E5E7EB] p-2 max-w-4xl shadow-[0_18px_50px_rgba(40,40,60,0.08)] reveal" id="hero-video-wrap">
        <div className="relative rounded-[22px] overflow-hidden aspect-video">
          <video
            id="hero-video"
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/home/hero-poster.svg"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="flex items-center justify-between gap-2 px-2 py-3">
          <button
            id="video-play-btn"
            className="video-ctrl w-12 h-12 !p-0 rounded-full flex items-center justify-center"
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              if (v.paused) v.play().catch(() => {});
              else v.pause();
            }}
          >
            <i id="video-play-icon" className={`${playing ? "ri-pause-fill" : "ri-play-fill"} text-lg`}></i>
          </button>
          <button
            id="video-mute-btn"
            className="video-ctrl md:w-[122px] px-5 md:px-0 py-3.5 rounded-full flex items-center justify-center gap-1.5"
            onClick={() => {
              const v = videoRef.current;
              if (!v) return;
              v.muted = !v.muted;
              setMuted(v.muted);
            }}
          >
            <i id="video-mute-icon" className={muted ? "ri-volume-mute-line" : "ri-volume-up-line"}></i>
            <span id="video-mute-label">{muted ? "ミュート" : "ミュート解除"}</span>
          </button>
          <button
            id="video-fs-btn"
            className="video-ctrl max-md:hidden w-[167px] py-4 rounded-full flex items-center justify-center gap-2 ml-auto"
            onClick={() => {
              const v = videoRef.current;
              if (v?.requestFullscreen) v.requestFullscreen().catch(() => {});
            }}
          >
            <i className="ri-fullscreen-line"></i>
            <span>フルスクリーン</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="py-10 sm:py-16 max-w-3xl reveal">
      <p className="text-lg md:text-xl leading-relaxed text-[var(--ink-2)]">
        私たちも、プロダクトをつくる過程が大好きです……ひとつのアイデア、ラフなスケッチ、「これは形になるかもしれない」という予感{" "}
        <i className="ri-smartphone-line"></i>
      </p>
      <p className="text-lg md:text-xl leading-relaxed text-[var(--ink-2)] mt-6">
        でもその先に、いつも同じ壁がありました…… <span className="highlight font-semibold">「終わらない手作業」</span>
      </p>
      <p className="text-lg md:text-xl leading-relaxed text-[var(--muted-2)] mt-6">
        毎日、同じ入力を何度も何度も繰り返す……
        <br />
        ツールAからツールBへコピー&ペースト、
        <br />
        あちこちに散らばっていく情報、
        <br />
        確認して、待って、また確認して……
      </p>
      <p className="text-lg md:text-xl leading-relaxed text-[var(--muted-2)] mt-6">
        気づけば、本当にやりたかったことに使う時間が残っていない。でもそれは、あなたのせいでも、ツールのせいでもありません。
      </p>

      <p className="text-sm tracking-wide text-[var(--pilot-pink)] font-semibold mt-14 mb-4">本当の課題は、何か?</p>
      <div className="flex items-center gap-1 md:gap-1.5 flex-wrap mb-8">
        <span className="text-lg font-semibold text-[var(--ink)] mr-2">それは──</span>
        <div className="frag-tiles flex gap-1 md:gap-1.5 flex-wrap">
          {FRAG_WORD.split("").map((letter, i) => (
            <div key={i} className="frag-tile" style={{ "--r": `${FRAG_ROTATIONS[i]}deg` } as React.CSSProperties}>
              <span className="font-bold text-[var(--ink)] text-lg md:text-xl">{letter}</span>
            </div>
          ))}
        </div>
      </div>
      <ul className="text-lg text-[var(--muted-2)] space-y-2">
        <li>— 手作業が多すぎる</li>
        <li>— ツールが多すぎる</li>
        <li>— 分断が多すぎる</li>
      </ul>

      <p className="text-2xl md:text-3xl font-semibold mt-14 leading-snug">
        仕事は、つぎはぎするものじゃない。<span className="highlight">ひとつの流れ</span>として動くべきだ。
      </p>
    </section>
  );
}

function Services() {
  return (
    <section className="py-10 sm:py-16 reveal">
      <p className="text-sm tracking-wide text-[var(--pilot-pink)] font-semibold mb-4">私たちの答え</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-12 flex items-center flex-wrap gap-2">
        だから、<img src="/images/logo-mark.svg" alt="" className="h-6 inline" /> <span>Social Smart</span> をつくりました
      </h2>

      <div className="grid grid-cols-3 gap-3 sm:gap-6 md:gap-10 max-w-4xl">
        {/* Col 1: SMARTGRAM (tall) + anima.js (short) */}
        <div className="flex flex-col gap-3 sm:gap-6 md:gap-10">
          <div className="polaroid -rotate-3">
            <i className="ri-pushpin-2-fill pin pin-red" style={{ top: "-16px", right: "14px", transform: "rotate(20deg)" }}></i>
            <img src="/images/slides/smartgram.png" alt="SMARTGRAM" className="w-full h-24 sm:h-52 md:h-64 object-cover rounded" />
            <p className="caption">SMARTGRAM</p>
            <div className="tape" style={{ left: "-20px", bottom: "36px", transform: "rotate(-40deg)" }}></div>
          </div>
          <div className="polaroid rotate-2">
            <img src="/images/slides/anima-js.png" alt="anima.js" className="w-full h-14 sm:h-20 object-cover rounded" />
            <p className="caption">anima.js</p>
          </div>
        </div>

        {/* Col 2: Minoru-AI (top) + SocialGoodWorld (bottom) */}
        <div className="flex flex-col gap-3 sm:gap-6 md:gap-10">
          <div className="polaroid rotate-3">
            <i className="ri-attachment-2 clip" style={{ top: "-14px", left: "8px", transform: "rotate(-25deg)" }}></i>
            <img src="/images/slides/minoru-ai.png" alt="Minoru-AI" className="w-full h-16 sm:h-32 object-cover rounded" />
            <p className="caption">Minoru-AI</p>
          </div>
          <div className="polaroid -rotate-2">
            <i className="ri-attachment-2 clip" style={{ top: "-14px", right: "10px", transform: "rotate(35deg)" }}></i>
            <i className="ri-pencil-fill doodle" style={{ bottom: "24px", left: "-10px", transform: "rotate(-35deg)" }}></i>
            <img src="/images/slides/socialgoodworld.png" alt="SocialGoodWorld" className="w-full h-16 sm:h-32 object-cover rounded" />
            <p className="caption">SocialGoodWorld</p>
          </div>
        </div>

        {/* Col 3: SMM Smart (top) + 5 products (bottom) */}
        <div className="flex flex-col gap-3 sm:gap-6 md:gap-10">
          <div className="polaroid -rotate-2">
            <i className="ri-pushpin-2-fill pin pin-green" style={{ top: "-16px", left: "50%", transform: "translateX(-50%) rotate(-10deg)" }}></i>
            <img src="/images/slides/smm-smart.png" alt="SMM Smart" className="w-full h-16 sm:h-32 object-cover rounded" />
            <p className="caption">SMM Smart</p>
          </div>
          <div className="polaroid rotate-3">
            <i className="ri-attachment-2 clip" style={{ top: "-14px", right: "10px", transform: "rotate(30deg)" }}></i>
            <img src="/images/home/five.svg" alt="5 products" className="w-full h-16 sm:h-32 object-cover rounded" />
            <p className="caption">5 products :)</p>
          </div>
        </div>
      </div>

      <p className="text-2xl md:text-3xl font-semibold mt-16 max-w-2xl leading-snug">
        単発のツールの寄せ集めとしてではなく。人の仕事を置き換えるためでもなく……<span className="highlight">全体をひとつの流れ</span>として設計する、プロダクト群として。
      </p>
    </section>
  );
}

function WhySocialSmart() {
  const [size, setSize] = useState(24);

  return (
    <section className="py-10 sm:py-16 reveal">
      <p className="text-sm tracking-wide text-[var(--pilot-pink)] font-semibold mb-4">ABOUT SOCIAL SMART</p>
      <p className="text-2xl md:text-3xl font-semibold max-w-2xl leading-snug mb-10">
        私たちのロゴが <img src="/images/logo-mark.svg" alt="" className="h-6 inline mx-1" /> シンプルな結び目なのには、理由があります。象徴しているのは、ただひとつ:
      </p>

      <div className="type-specimen-card border border-dashed border-gray-300 rounded-2xl p-6 md:p-8 mb-10">
        <div className="flex items-center gap-6 flex-wrap mb-6">
          <span id="type-specimen" className="font-extrabold leading-none transition-all duration-300" style={{ fontSize: `${size}px` }}>
            Aa
          </span>
          <div>
            <p className="font-semibold">Satoshi</p>
            <p className="text-gray-400 text-sm">Regular</p>
          </div>
        </div>
        <div id="size-picker" className="flex items-end gap-1.5 flex-wrap">
          {TYPE_SIZES.map((sz) => (
            <button
              key={sz}
              type="button"
              className={`size-btn text-sm px-2 py-1 rounded-md text-gray-400 hover:text-[var(--ink)] transition-colors${sz === size ? " active" : ""}`}
              onClick={() => setSize(sz)}
            >
              {sz}px
            </button>
          ))}
        </div>
      </div>

      <h3 className="text-3xl md:text-4xl font-bold mb-6">つながり</h3>
      <p className="text-lg text-[var(--muted-2)] max-w-2xl leading-relaxed mb-2">
        それが、私たちのものづくりの姿勢です。ひとつの「正解の型」にすべてを押し込むことはしません……
      </p>
      <p className="text-lg text-[var(--muted-2)] max-w-2xl leading-relaxed mb-2">異なる課題。異なるユーザー。異なる最適解。</p>
      <p className="text-lg text-[var(--ink-2)] font-medium max-w-2xl leading-relaxed">それでも、細部へのこだわりは同じ。実際に見てみてください :)</p>
    </section>
  );
}

function ProductSlider() {
  const [idx, setIdx] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % PRODUCTS.length);
    }, 4000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, []);

  // Original quirk preserved: hovering kills the autoplay for good (no restart on leave).
  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  return (
    <section className="pb-10 reveal">
      <div
        id="project-slider"
        className="relative w-full rounded-2xl overflow-hidden aspect-[1036/742] shadow-lg"
        onMouseEnter={stopAutoplay}
      >
        {PRODUCTS.map((p, i) => (
          <img
            key={p.key}
            data-slide
            src={`/images/slides/${p.key}.png`}
            alt={p.name}
            className="slide-img absolute inset-0 w-full h-full object-cover"
            style={{ opacity: i === idx ? 1 : 0 }}
          />
        ))}
        <button
          id="slider-next"
          className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/35 flex items-center justify-center cursor-pointer absolute right-5 top-1/2 -translate-y-1/2 z-10 transition-colors"
          onClick={() => setIdx((i) => (i + 1) % PRODUCTS.length)}
        >
          <i className="ri-arrow-right-s-line text-white text-2xl"></i>
        </button>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10" id="slider-dots">
          {PRODUCTS.map((p, i) => (
            <span key={p.key} className={`slider-dot${i === idx ? " active" : ""}`} onClick={() => setIdx(i)}></span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceAreas() {
  return (
    <section className="py-10 sm:py-16 reveal">
      <div className="max-w-[700px] mx-auto w-full grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-y-7">
        {SERVICE_AREAS.map((area) => (
          <div key={area.label} className="group flex flex-col items-center justify-center cursor-pointer">
            <img
              src={area.icon}
              alt=""
              className="w-[56px] h-[56px] sm:w-[76px] sm:h-[76px] transition-transform duration-300 ease-out group-hover:scale-110"
            />
            <span className="text-[var(--muted-2)] text-base font-normal">{area.label}</span>
          </div>
        ))}
        <Link
          href="/products"
          className="flex flex-col items-center h-[118px] justify-center hover:bg-[var(--pink-tint)] transition-colors duration-150 rounded-3xl"
        >
          <i className="ri-folder-open-fill text-[var(--pilot-pink)] mb-1" style={{ fontSize: "44px" }}></i>
          <span className="text-[var(--muted-2)] text-base font-normal">すべてのプロダクト</span>
        </Link>
      </div>

      <p className="text-2xl md:text-3xl font-semibold mt-16 max-w-xl leading-snug">
        ここまで見ていただければ、きっと伝わったはずです。プロダクトには一貫した思想があり、体験はシンプルで、導入に大げさな準備はいりません。
      </p>
    </section>
  );
}

function Flow() {
  return (
    <section className="py-10 sm:py-16 reveal">
      <p className="text-sm tracking-wide text-[var(--pilot-pink)] font-semibold mb-2">進め方は?</p>
      <h2 className="text-2xl md:text-3xl font-bold mb-10">ご依頼の流れ</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {FLOW_STEPS.map((step) => (
          <div key={step.name}>
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] bg-black">
              <img src={step.art} alt="" className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 flex items-center justify-center text-white text-4xl">
                <i className={step.icon}></i>
              </div>
            </div>
            <p className="text-sm font-semibold mt-2">{step.name}</p>
            <p className="text-xs text-gray-400">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Vision() {
  return (
    <section className="py-10 sm:py-16 reveal">
      <p className="text-sm tracking-wide text-[var(--pilot-pink)] font-semibold mb-2">VISION</p>
      <p className="text-2xl md:text-3xl font-semibold mb-10">AIが、電気やインターネットのように&quot;当たり前&quot;になる社会へ。</p>

      <div className="grid md:grid-cols-2 gap-6 mb-14">
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-[0_18px_50px_rgba(40,40,60,0.08)]">
          <div className="flex items-center gap-3 mb-2">
            <img src="/images/avatars/hiromps.png" alt="hiromps" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">hiromps</p>
              <a href={GITHUB_URL} className="text-xs text-gray-400">
                @hiromps
              </a>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-[#E5E7EB] shadow-[0_18px_50px_rgba(40,40,60,0.08)]">
          <div className="flex items-center gap-3 mb-2">
            <img src="/images/logo-mark.svg" alt="Social Smart" className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-semibold">Social Smart</p>
              <a href={CONTACT_MAILTO} className="text-xs text-gray-400">
                socialsmart.jp@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="text-lg text-[var(--ink-2)] font-medium mb-2">開発者ファースト。でも、届けたいのは&quot;人の時間&quot;。</p>
      <p className="text-lg text-[var(--muted-2)] max-w-xl mb-14 leading-relaxed">
        Social Smart は、hiromps がひとりで企画・デザイン・開発・運用まで手がける個人開発プロジェクトです。小さいからこそ判断は速く、思想は一貫しています。AIは目的ではなく、人がより価値あることに集中するための手段──その信念で、すべてのプロダクトをつくっています。
      </p>

      <div className="marquee-mask overflow-hidden w-full">
        <div className="team-track flex gap-6 w-max animate-marquee">
          {/* Rendered twice: the -50% marquee keyframe needs the duplicate for a seamless loop. */}
          {[...PRODUCTS, ...PRODUCTS].map((p, i) => (
            <div
              key={`${p.key}-${i}`}
              className="w-[220px] md:w-[260px] shrink-0 rounded-[2rem] overflow-hidden relative shadow-[0_2.6px_6.5px_rgba(40,40,60,.10),0_20px_16px_rgba(40,40,60,.07)]"
            >
              <img src={`/images/team/${p.key}.png`} alt={p.name} className="w-full aspect-[3/4] object-cover" />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white text-sm font-semibold">{p.name}</p>
                <p className="text-white/70 text-xs">{p.tagline}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalNote() {
  return (
    <section className="py-10 sm:py-16 reveal">
      <p className="text-sm tracking-wide text-[var(--pilot-pink)] font-semibold mb-6">最後に</p>
      <p className="text-2xl md:text-3xl font-semibold max-w-2xl leading-snug mb-6">
        Social Smart は、&quot;AIを使うこと&quot;そのものが目的ではありません。人がより価値あることに集中できる<span className="highlight">時間をつくる</span>ためのプロジェクトです。
      </p>
      <p className="text-lg text-[var(--muted-2)] max-w-xl mb-10 leading-relaxed">
        無駄な作業を減らしたい。人と企業とサービスを、もっと自然につなぎたい。そう感じたら、いつでも気軽にご連絡ください。
      </p>
      <p className="text-lg text-[var(--muted-2)] max-w-xl mb-10 leading-relaxed">
        たくさんのツールはいりません。難しく考える必要もありません。必要なのは <span className="highlight">Social Smart</span> だけ。
      </p>

      <div className="flex flex-wrap gap-6 sm:gap-10 mb-12">
        <div>
          <p className="script text-3xl">hiromps</p>
          <p className="text-xs text-gray-400">開発・運営</p>
        </div>
        <div>
          <p className="script text-3xl">Social Smart</p>
          <p className="text-xs text-gray-400">プロジェクト</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <a href={CONTACT_MAILTO} className="pill-btn pill-dark">
          <i className="ri-mail-line"></i> お問い合わせ
        </a>
        <Link href="/products" className="pill-btn pill-light">
          <i className="ri-folder-open-line"></i> プロダクトを見る
        </Link>
      </div>
    </section>
  );
}

function HomeFooter() {
  return (
    <footer className="pt-10 pb-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4 text-sm text-gray-500">
      <div className="flex gap-6">
        <Link href="/pricing" className="hover:text-[var(--ink)]">
          料金
        </Link>
        <Link href="/products" className="hover:text-[var(--ink)]">
          プロダクト
        </Link>
        <a href={GITHUB_URL} className="hover:text-[var(--ink)]">
          GitHub
        </a>
      </div>
      <p>© 2026 Social Smart | All rights reserved</p>
    </footer>
  );
}

export default function HomeView() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      document.querySelectorAll(".reveal").forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    });

    // Trigger positions are measured against fallback-font layout; re-measure once
    // the webfonts (and everything else) have actually loaded.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <Hero />
      <Mission />
      <Services />
      <WhySocialSmart />
      <ProductSlider />
      <ServiceAreas />
      <Flow />
      <Vision />
      <FinalNote />
      <HomeFooter />
    </>
  );
}
