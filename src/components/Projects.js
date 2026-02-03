import React from 'react';
import './Projects.css';

const projects = [
    {
        title: "Custom Database Engine in C++ (Paging + B+ Tree)",
        description: "Designed and implemented a lightweight database engine with a page-based disk storage model. Built a B+ tree indexing layer to map keys to page numbers, separating in-memory index structures from on-disk data pages to minimize disk I/O and improve lookup efficiency.",
        tags: ["C++", "Database Internals", "Paging", "B+ Tree", "Systems"],
        url: "https://github.com/KarthikeyaAnna/DatabaseEngine"
    },
    {
        title: "Linux Sampling Profiler (Hardware Counters)",
        description: "Developed a high-performance systems tool using the Linux perf_event_open API to capture hardware instruction pointers at high frequency. Engineered a zero-copy ring buffer via mmap-shared memory and implemented ELF symbol resolution to map raw memory addresses to function-level execution percentages.",
        tags: ["C", "Linux Systems Programming", "perf_events", "Memory Management", "Systems"],
        url: "https://github.com/KarthikeyaAnna/SamplingProfiler"
    },
    {
        title: "RISC-V Assembler and Functional Simulator",
        description: "Engineered a Python-based toolchain to assemble RISC-V assembly into machine code and simulate its execution. The assembler supports standard R, I, S, B, and J-type instructions with custom ISA extensions, while the simulator emulates a 32-bit CPU pipeline including register file management, memory-mapped I/O, and program counter logic.",
        tags: ["Python", "RISC-V", "Computer Architecture", "ISA", "Systems"],
        url: "https://github.com/KarthikeyaAnna/RISC-V-Assembler-Simulator"
    },
    {
        title: "Academic ERP System",
        description: "Developed a desktop-based ERP system with role-based access control (Admin, Student, Faculty). Implemented modular components for enrollment, attendance, and grading, with persistent storage via JDBC and a modern Swing UI.",
        tags: ["Java", "Swing", "FlatLaf", "MigLayout", "JDBC", "MySQL"],
        url: "https://github.com/KarthikeyaAnna/ERP"
    },
    {
        title: "AI Patient Simulation Chatbot",
        description: "Built a Flask-based API where an AI agent simulates patient behavior using LangChain and LangGraph. Modeled conversations as a stateful graph and implemented strict session isolation to support multiple concurrent users without context leakage.",
        tags: ["Python", "Flask", "LangGraph", "LangChain", "Agentic AI", "Vercel"],
        url: "https://github.com/KarthikeyaAnna/Ai-Patient-Bot"
    }
];


const Projects = () => {
    return (
        <section id="projects" className="projects-section">
            <div className="section-title">
                <h2>02. Projects</h2>
                <div className="title-line"></div>
            </div>
            <div className="project-grid">
                {projects.map((project, index) => (
                    <a href={project.url} key={index} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <div className="project-card">
                            <div className="card-header">
                                <div className="card-icon">[X]</div>
                                <h3>{project.title}</h3>
                            </div>
                            <p>{project.description}</p>
                            <div className="project-tags">
                                {project.tags.map((tag, i) => (
                                    <span key={i}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}

export default React.memo(Projects);
