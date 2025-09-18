import React from 'react';
import './Projects.css';
import GridBackground from './GridBackground';

const projects = [
    {
        title: "Project One",
        description: "A brief description of the project. Focus on the technology and the outcome.",
        tags: ["React", "Node.js", "CSS-Grid"]
    },
    {
        title: "Project Two",
        description: "Another project description. Explain the challenge and your solution.",
        tags: ["Python", "Flask", "APIs"]
    },
    {
        title: "Project Three",
        description: "A third project. This one could be about data visualization or something creative.",
        tags: ["D3.js", "JavaScript", "HTML5"]
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
