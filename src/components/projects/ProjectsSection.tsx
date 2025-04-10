'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'

// Define project types
interface Project {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'personal';
  description: string;
  imageUrl: string;
  year: number;
  location?: string;
  fullDescription?: string;
  additionalImages?: string[];
}

const ProjectsSection = () => {
  const { t, language } = useLanguage()
  const [filter, setFilter] = useState<'all' | 'professional' | 'personal'>('all')
  const [projects, setProjects] = useState<Project[]>([])
  
  // Fetch projects from JSON file based on language
  useEffect(() => {
    const projectsPath = language === 'sv' ? '/data/sv/projects.json' : '/data/projects.json';
    
    fetch(projectsPath)
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => {
        console.error('Error loading projects:', error);
        // Fallback to empty array if fetch fails
        setProjects([]);
      });
  }, [language])
  
  // Filter projects based on selected filter
  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true
    if (filter === 'professional') return project.category !== 'personal'
    if (filter === 'personal') return project.category === 'personal'
    return true
  })
  
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">{t('projects.title')}</h2>
        <p className="text-muted-foreground mb-8">{t('projects.subtitle')}</p>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
            onClick={() => setFilter('all')}
          >
            {t('projects.filter.all')}
          </button>
          <button
            className={`px-4 py-2 rounded-md ${filter === 'professional' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
            onClick={() => setFilter('professional')}
          >
            {t('projects.filter.professional')}
          </button>
          <button
            className={`px-4 py-2 rounded-md ${filter === 'personal' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}`}
            onClick={() => setFilter('personal')}
          >
            {t('projects.filter.personal')}
          </button>
        </div>
        
        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card group">
              <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div>
                    <span className="text-xs font-medium px-2 py-1 bg-primary text-primary-foreground rounded-full">
                      {project.category === 'residential' ? t('projects.category.residential') : 
                       project.category === 'commercial' ? t('projects.category.commercial') : 
                       t('projects.category.personal')}
                    </span>
                    {project.location && (
                      <span className="ml-2 text-xs font-medium px-2 py-1 bg-secondary text-secondary-foreground rounded-full">
                        {project.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-medium mb-1">{project.title}</h3>
              <p className="text-muted-foreground mb-2">{project.year}</p>
              <p>{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
