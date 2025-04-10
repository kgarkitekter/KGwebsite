'use client'

import Image from 'next/image'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useState } from 'react'

interface ProjectDetailProps {
  project: {
    id: string
    title: string
    category: 'personal' | 'residential' | 'commercial'
    description: string
    imageUrl: string
    year: number
    fullDescription?: string
    additionalImages?: string[]
  }
}

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle>{project.title}</DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          {project.category} · {project.year}
        </DialogDescription>
      </DialogHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-[4/3] bg-muted relative">
          <div className="w-full h-full bg-neutral-200" />
        </div>
        
        <div>
          <p className="mb-4">{project.fullDescription || project.description}</p>
          
          <div className="space-y-2">
            <h4 className="font-medium">Project Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Type</p>
                <p>{project.category}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Year</p>
                <p>{project.year}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {project.additionalImages && project.additionalImages.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-4">Gallery</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {project.additionalImages.map((img, index) => (
              <div key={index} className="aspect-[4/3] bg-muted">
                <div className="w-full h-full bg-neutral-300" />
              </div>
            ))}
          </div>
        </div>
      )}
    </DialogContent>
  )
}

export default ProjectDetail
