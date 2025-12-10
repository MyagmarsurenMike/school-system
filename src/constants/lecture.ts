// contant.ts

// --- TYPE DEFINITIONS ---

/** Defines the types of course materials (e.g., PDF, PPT) */
export type MaterialType = 'pdf' | 'ppt';

/** Represents a single course material file. */
export interface Material {
    type: MaterialType;
    name: string;
    url: string;
}

/** Represents a single lecture item. */
export interface Lecture {
    id: number;
    title: string;
    description: string;
    credit: number;
    teacher: string;
    materials: Material[];
}

// --- CONSTANT DATA ---

/** The hardcoded list of lectures used for the component. */
export const LECTURES: Lecture[] = [
    { 
        id: 1, 
        title: 'Lecture 1', 
        description: 'Introduction to the course', 
        credit: 1, 
        teacher: 'Dr. Smith',
        materials: [
            { type: 'ppt', name: 'Lecture 1 Presentation.pptx', url: '/uploads/ТСА_Мягмарсүрэн.pptx.pdf.pdf' }
        ]
    },
    { 
        id: 2, 
        title: 'Lecture 2', 
        description: 'Advanced topics', 
        credit: 1, 
        teacher: 'Prof. Johnson',
        materials: [
            { type: 'ppt', name: 'Advanced Topics.pdf', url: '/uploads/Н.Мягмарсүрэн Алхимич.pptx' },
        ]
    },
    { 
        id: 3, 
        title: 'Lecture 3', 
        description: 'Practical examples', 
        credit: 1, 
        teacher: 'Dr. Brown',
        materials: [
            { type: 'ppt', name: 'Practical Examples.pptx', url: '#' }
        ]
    },
    { 
        id: 4, 
        title: 'Lecture 4', 
        description: 'Q&A session', 
        credit: 1, 
        teacher: 'Ms. Davis',
        materials: [
            { type: 'pdf', name: 'Q&A Summary.pdf', url: '#' },
            { type: 'ppt', name: 'Q&A Slides.pptx', url: '#' }
        ]
    },
];