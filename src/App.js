import React from 'react';
import './App.css';

const projects = [
  {
    title: "Dog GAN",
    description: "Engineered a custom high-capacity GAN architecture integrating Spectral Normalization, multi-scale Self-Attention, and EMA to generate high-fidelity AFHQ animal faces. Improved training stability by mitigating mode collapse and checkerboard artifacts using R1 Gradient Penalty, DiffAugment, and Global Average Pooling. Optimized training with Automatic Mixed Precision (AMP), reducing GPU memory consumption by 30%+.",
    tags: ["Python", "PyTorch", "HuggingFace", "GAN", "Computer Vision"],
    url: "https://github.com/KarthikeyaAnna/Dog-Gan",
    github: "https://github.com/KarthikeyaAnna/Dog-Gan"
  },
  {
    title: "Custom Database Server",
    description: "Architected a multithreaded TCP network server with a dynamically-sized thread pool and mutex synchronization, enabling concurrent client connections via reader-writer locking. Engineered a disk-backed storage engine with a B+ tree index and an LRU-based buffer pool manager, minimizing expensive disk I/O bottlenecks by caching frequently accessed 4KB pages in memory. Benchmarked 11,200+ reads/sec (~0.09ms latency) and 3,600+ writes/sec (~0.28ms latency) under concurrent multi-client TCP load, validating scalability and reliability at production scale.",
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

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);


const App = () => {
  return (
    <div className="App">
      <div className="portfolio-container">
        
        <header className="header-section">
          <h1>Sri Karthikeya</h1>
          <p className="subtitle">
            Computer Science student at IIIT-Delhi.<br/>
            Specializing in Deep Learning, Large Scale Database Management, and Automation.
          </p>
        </header>

        <main className="projects-section">
          {projects.map((project, index) => (
            <article className="project-item" key={index}>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-title">
                {project.title}
              </a>
              <p className="project-desc">{project.description}</p>
              
              <div className="project-meta">
                <div className="project-links">
                  {project.github && (
                    <a href={project.github} className="icon-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                      <GithubIcon />
                    </a>
                  )}

                </div>
                
                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span className="tag" key={i}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </main>

      </div>
    </div>
  );
};

export default App;
