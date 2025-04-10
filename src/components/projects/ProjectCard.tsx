'use client'

import { useState } from 'react'
import { Dialog } from '@/components/ui/dialog'
import ProjectDetail from './ProjectDetail'

interface Project {
  id: string
  title: string
  category: 'personal' | 'residential' | 'commercial'
  description: string
  imageUrl: string
  year: number
  fullDescription?: string
  additionalImages?: string[]
}

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <div 
        className="group cursor-pointer" 
        onClick={() => setIsOpen(true)}
      >
        <div className="relative aspect-[4/3] bg-muted mb-4 overflow-hidden">
          <div className="w-full h-full bg-neutral-200 group-hover:scale-105 transition-transform duration-300" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
        <h3 className="text-xl font-medium mb-1">{project.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">
          {project.category === 'personal' ? 'Personal Project' : 
           project.category === 'residential' ? 'Residential' : 'Commercial'} · {project.year}
        </p>
        <p className="text-sm">{project.description}</p>
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <ProjectDetail project={project} />
      </Dialog>
    </>
  )
}

export default ProjectCard
