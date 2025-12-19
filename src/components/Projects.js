import React from 'react';
import './Projects.css';
import GridBackground from './GridBackground';

const projects = [
    {
        title: "Custom Database Engine (Paging + B+ Tree)",
        description: "Designed and implemented a lightweight database engine with a page-based disk storage model. Built a B+ tree indexing layer to map keys to page numbers, separating in-memory index structures from on-disk data pages to minimize disk I/O and improve lookup efficiency.",
        tags: ["Database Internals", "Paging", "B+ Tree", "Systems"]
    },
    {
        title: "Academic ERP System",
        description: "Developed a desktop-based ERP system with role-based access control (Admin, Student, Faculty). Implemented modular components for enrollment, attendance, and grading, with persistent storage via JDBC and a modern Swing UI.",
        tags: ["Java", "Swing", "FlatLaf", "MigLayout", "JDBC", "MySQL"]
    },
    {
        title: "AI Patient Simulation Chatbot",
        description: "Built a Flask-based API where an AI agent simulates patient behavior using LangChain and LangGraph. Modeled conversations as a stateful graph and implemented strict session isolation to support multiple concurrent users without context leakage.",
        tags: ["Python", "Flask", "LangGraph", "LangChain", "Agentic AI", "Vercel"]
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
                    <div className="project-card" key={index}>
                        <GridBackground />
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
                ))}
            </div>
        </section>
    );
}

export default Projects;
