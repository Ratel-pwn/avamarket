import React from "react";
import { Package, LayoutTemplate, ShoppingBag, Sparkles, FileCode2, ChevronRight, Workflow } from "lucide-react";
import "./bentogrid.css";

import difyLogo from "../assets/dify.ai.svg";
import n8nLogo from "../assets/n8n.io.svg";
import cozeLogo from "../assets/coze.svg";

export default function HomeBento() {
  return (
    <section className="page-container">
      <div className="bento-grid">
        {/* 左上大卡（深色背景图 + 3个 logo） */}
        <article className="bento bg-bento-hero col-span-8">
          <div >
            <div className="icon-pill"><Package size={18}/> All-in-one</div>
          </div>
          <h2 className="text-white">Dify Scenario Marketplace</h2>
          <p className="text-white opacity-60 text-sm">
          A dedicated marketplace for Dify platform, offering rich workflow scenarios, app templates, and plugin resources to make your AI application development more efficient.
          </p>

          {/* <div className="hero-logos mb-24">
            <div className="logo-box logo-a"><img src={cozeLogo} alt="React"/></div>
            <div className="logo-box logo-b"><img src={difyLogo} alt="Dify"/></div>
            <div className="logo-box logo-c"><img src={n8nLogo} alt="n8n"/></div>
          </div> */}
        </article>

        {/* 右上 - 冰蓝到杏桃 + dotted 线 + 工作流 SVG */}
        <article className="bento grad-ice-to-peach col-span-4 lock-1x1 text-[var(--primary-font)] text-sm">
          <div >
            <h2><Workflow size={18} />Preview and Download Dify Scenarios</h2>
          </div>
          <p className="pb-40">
          View Dify workflow scenarios with interactive previews. Download and use them directly in your Dify platform for seamless AI application development.
          </p>

          {/* dotted 框 + main 标签 */}
          {/* <div className="dotted-box">
            <span className="roboto-mono-regular">MAIN</span>
            <GitMerge size={16}/>
          </div> */}

          {/* 流程线（SVG） */}
          {/* <div className="flowline">
            <svg width="100%" height="54" viewBox="0 0 600 54" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 28 H120 C160 28 160 6 200 6 H420 C460 6 460 28 500 28 H600"
                    fill="none" stroke="rgba(17,20,45,.55)" strokeWidth="2"
                    strokeDasharray="4 6" />
              { [120, 200, 260, 320, 380, 460, 520].map((x,i)=>(
                <g key={i} transform={`translate(${x},28)`}>
                  <circle r="8" fill="rgba(17,20,45,.85)"/>
                  <circle r="4" fill="#FFFFFF" />
                </g>
              )) }
            </svg>
          </div> */}
        </article>

        {/* 右上 - 柠黄到冰蓝 + 进度条 */}
          <article className="bento grad-sun-to-sky col-span-4 lock-1x1 text-[var(--primary-font)] text-sm">
          <div>
            <h2><ShoppingBag size={18}/> Welcome to Dify Marketplace</h2>
          </div>
          <p>
          Discover rich Dify workflow scenarios, app templates, and plugin resources—a one-stop Dify ecosystem marketplace for smarter AI application development.
          </p>
        </article>

        {/* 右下 - 青绿到冰蓝 + CTA */}
        <article className="bento grad-teal-to-ice col-span-8 text-[var(--primary-font)] text-sm">
          <div >
            <h2><LayoutTemplate size={18}/>Explore Dify Categories</h2>
          </div>
          <p>
          Dify workflow scenarios, app templates, and plugin resources—explore them all to boost your AI application development productivity.
          </p>
        </article>
      </div>
    </section>
  );
}
