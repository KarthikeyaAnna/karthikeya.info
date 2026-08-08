import React from 'react';
import './App.css';

const projects = [
  {
    title: "Qwen2-VL DPO-LoRA: Vision-Language Preference Alignment",
    description: "Fine-tuned Qwen2-VL-2B using Direct Preference Optimization (DPO) and LoRA (r=16, α=32) on the HA-DPO dataset to eliminate visual hallucinations. Configured SDPA attention and targeted LoRA adapters across language projections (q, k, v, o, gate, up, down) while freezing vision towers, leveraging bfloat16 mixed-precision and Paged-AdamW-8bit optimization. Boosted accuracy to 89.5% and F1-score to 88.1% on POPE benchmark, reducing hallucination rate to <8.0% (from 24.5%). Published adapter weights on HuggingFace.",
    tags: ["PyTorch", "Transformers", "DPO", "LoRA", "PEFT", "TRL", "Vision-Language", "HuggingFace"],
    url: "https://github.com/KarthikeyaAnna/Qwen-LoRa",
    github: "https://github.com/KarthikeyaAnna/Qwen-LoRa",
    huggingface: "https://huggingface.co/srianna/Qwen2-VL-2B-DPO-LoRA"
  },
  {
    title: "Dog GAN",
    description: "Engineered a custom high-capacity GAN architecture integrating Spectral Normalization, multi-scale Self-Attention, and EMA to generate high-fidelity AFHQ animal faces. Improved training stability using R1 Gradient Penalty, DiffAugment, and Global Average Pooling. Optimized with Automatic Mixed Precision (AMP), reducing GPU memory consumption by 30%+.",
    tags: ["Python", "PyTorch", "HuggingFace", "GAN", "Computer Vision"],
    url: "https://github.com/KarthikeyaAnna/Dog-Gan",
    github: "https://github.com/KarthikeyaAnna/Dog-Gan"
  },
  {
    title: "Custom Database Server",
    description: "Architected a multithreaded TCP network server with a dynamically-sized thread pool and mutex synchronization, enabling concurrent client connections via reader-writer locking. Engineered a disk-backed storage engine with a B+ tree index and an LRU buffer pool manager, benchmarking 11,200+ reads/sec (~0.09ms latency) under concurrent load.",
    tags: ["C++17", "TCP Networking", "Multithreading", "B+ Tree", "LRU Buffer"],
    url: "https://github.com/KarthikeyaAnna/DatabaseEngine",
    github: "https://github.com/KarthikeyaAnna/DatabaseEngine"
  },
  {
    title: "Linux Sampling Profiler (Hardware Counters)",
    description: "Developed a high-performance systems tool using the Linux perf_event_open API to capture hardware instruction pointers at high frequency. Engineered a zero-copy ring buffer via mmap-shared memory and implemented ELF symbol resolution to map raw memory addresses to function-level execution percentages.",
    tags: ["C", "Linux Systems Programming", "perf_events", "Memory Management"],
    url: "https://github.com/KarthikeyaAnna/SamplingProfiler",
    github: "https://github.com/KarthikeyaAnna/SamplingProfiler"
  },
  {
    title: "RISC-V Assembler and Functional Simulator",
    description: "Engineered a Python-based toolchain to assemble RISC-V assembly into machine code and simulate its execution. The assembler supports standard R, I, S, B, and J-type instructions with custom ISA extensions, while the simulator emulates a 32-bit CPU pipeline.",
    tags: ["Python", "RISC-V", "Computer Architecture", "ISA"],
    url: "https://github.com/KarthikeyaAnna/RISC-V-Assembler-Simulator",
    github: "https://github.com/KarthikeyaAnna/RISC-V-Assembler-Simulator"
  },
  {
    title: "Academic ERP System",
    description: "Developed a desktop-based ERP system with role-based access control (Admin, Student, Faculty). Implemented modular components for enrollment, attendance, and grading, with persistent storage via JDBC and a modern Swing UI.",
    tags: ["Java", "Swing", "FlatLaf", "MigLayout", "JDBC", "MySQL"],
    url: "https://github.com/KarthikeyaAnna/ERP",
    github: "https://github.com/KarthikeyaAnna/ERP"
  },
  {
    title: "AI Patient Simulation Chatbot",
    description: "Built a Flask-based API where an AI agent simulates patient behavior using LangChain and LangGraph. Modeled conversations as a stateful graph and implemented strict session isolation to support multiple concurrent users without context leakage.",
    tags: ["Python", "Flask", "LangGraph", "LangChain", "Agentic AI"],
    url: "https://github.com/KarthikeyaAnna/Ai-Patient-Bot",
    github: "https://github.com/KarthikeyaAnna/Ai-Patient-Bot"
  }
];

const ArrowUpRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-arrow">
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

const App = () => {
  return (
    <div className="App">
      <div className="portfolio-wrapper">
        
        {/* TOP HEADER & NAVIGATION */}
        <header className="header-nav">
          <div className="brand-title">Sri Karthikeya</div>
          <nav className="nav-links">
            <a href="https://github.com/KarthikeyaAnna" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://leetcode.com/u/SigmaBoiiii/" target="_blank" rel="noopener noreferrer">LeetCode</a>
            <a href="mailto:karthikeyaannavarjula@gmail.com">Email</a>
          </nav>
        </header>

        {/* HERO INTRO */}
        <section className="hero-section">
          <h1 className="hero-name">Sri Karthikeya Annavarjula</h1>
          <p className="hero-bio">
            Undergraduate Researcher & CS Student at <strong>IIIT-Delhi</strong>.<br />
            Specializing in Deep Learning, Vision-Language Models, and Systems Architecture.
          </p>
        </section>

        {/* RESEARCH & EXPERIENCE */}
        <section className="content-section">
          <h2 className="section-title">Research & Experience</h2>
          
          <div className="timeline-list">
            
            {/* ITEM 1: CAI RESEARCH */}
            <div className="timeline-row">
              <div className="timeline-date">Aug 2026 – Present</div>
              <div className="timeline-body">
                <h3 className="role-title">Undergraduate Researcher</h3>
                <div className="org-name">Infosys Centre for Artificial Intelligence (CAI) · IIIT-Delhi</div>
                
                <div className="labs-grid">
                  <div className="lab-entry">
                    <div className="lab-head">
                      <span className="lab-tag">MIDAS Lab</span>
                      <span className="lab-sub">Multimodal Digital Media Analysis Lab</span>
                    </div>
                    <p className="lab-text">
                      Researching multimodal deep learning, vision-language preference alignment (DPO), and visual hallucination reduction.
                    </p>
                  </div>

                  <div className="lab-entry">
                    <div className="lab-head">
                      <span className="lab-tag">SBI Lab</span>
                      <span className="lab-sub">Systems & Biomedical Informatics Lab</span>
                    </div>
                    <p className="lab-text">
                      Focusing on healthcare AI modeling, spatiotemporal feature engineering, and clinical decision support systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ITEM 2: EDUCATION */}
            <div className="timeline-row">
              <div className="timeline-date">2024 – Present</div>
              <div className="timeline-body">
                <h3 className="role-title">B.Tech in Computer Science & Engineering</h3>
                <div className="org-name">Indraprastha Institute of Information Technology (IIIT-Delhi)</div>
                <p className="role-desc">
                  Core coursework in Deep Learning, Systems Programming, Database Systems, Computer Architecture, DSA, and OS.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="content-section">
          <h2 className="section-title">Featured Projects</h2>
          
          <div className="projects-list">
            {projects.map((project, index) => (
              <article className="project-row" key={index}>
                <div className="project-header-line">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-heading">
                    {project.title} <ArrowUpRight />
                  </a>
                  
                  <div className="project-quick-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-link">code</a>
                    )}
                    {project.huggingface && (
                      <a href={project.huggingface} target="_blank" rel="noopener noreferrer" className="text-link">model</a>
                    )}
                  </div>
                </div>

                <p className="project-summary">{project.description}</p>
                
                <div className="project-tag-row">
                  {project.tags.map((tag, i) => (
                    <span className="inline-tag" key={i}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="site-footer">
          <span>Sri Karthikeya Annavarjula</span>
          <span className="footer-dot">•</span>
          <a href="mailto:karthikeyaannavarjula@gmail.com">karthikeyaannavarjula@gmail.com</a>
        </footer>

      </div>
    </div>
  );
};

export default App;
