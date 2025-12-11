// lecture.ts - Course subjects and lecture data

import { Subject } from '@/types';

// Re-export types for convenience
export type { CourseMaterialType, CourseMaterial, CourseLecture, Subject } from '@/types';

/** The list of subjects with their lectures. */
export const SUBJECTS: Subject[] = [
    {
        id: 1,
        title: 'Програмчлалын үндэс',
        description: 'Introduction to Programming',
        credit: 3,
        teacher: 'Dr. Smith',
        lectures: [
            {
                id: 1,
                title: 'Лекц 1: Оршил',
                description: 'Програмчлалын үндсэн ойлголтууд',
                materials: [
                    { type: 'ppt', name: 'Lecture 1 Presentation.pptx', url: '/uploads/ТСА_Мягмарсүрэн.pptx.pdf.pdf' }
                ]
            },
            {
                id: 2,
                title: 'Лекц 2: Хувьсагч ба өгөгдлийн төрөл',
                description: 'Variables and Data Types',
                materials: [
                    { type: 'pdf', name: 'Variables Guide.pdf', url: '/uploads/ТСА_Мягмарсүрэн.pptx.pdf.pdf' }
                ]
            },
            {
                id: 3,
                title: 'Лекц 3: Нөхцөл ба давталт',
                description: 'Conditions and Loops',
                materials: [
                    { type: 'ppt', name: 'Control Flow.pptx', url: '#' }
                ]
            },
            {
                id: 4,
                title: 'Лекц 4: Функц',
                description: 'Functions and Methods',
                materials: [
                    { type: 'pdf', name: 'Functions.pdf', url: '#' },
                    { type: 'ppt', name: 'Functions Slides.pptx', url: '#' }
                ]
            },
            {
                id: 5,
                title: 'Лекц 5: Массив',
                description: 'Arrays and Collections',
                materials: [
                    { type: 'ppt', name: 'Arrays.pptx', url: '#' }
                ]
            },
            {
                id: 6,
                title: 'Лекц 6: Объект хандлагат програмчлал',
                description: 'Object Oriented Programming basics',
                materials: [
                    { type: 'pdf', name: 'OOP Basics.pdf', url: '#' }
                ]
            },
        ]
    },
    {
        id: 2,
        title: 'Өгөгдлийн бүтэц',
        description: 'Data Structures',
        credit: 3,
        teacher: 'Prof. Johnson',
        lectures: [
            {
                id: 1,
                title: 'Лекц 1: Оршил',
                description: 'Introduction to Data Structures',
                materials: [
                    { type: 'ppt', name: 'DS Introduction.pptx', url: '/uploads/Н.Мягмарсүрэн Алхимич.pptx' }
                ]
            },
            {
                id: 2,
                title: 'Лекц 2: Linked List',
                description: 'Understanding Linked Lists',
                materials: [
                    { type: 'pdf', name: 'LinkedList.pdf', url: '#' }
                ]
            },
            {
                id: 3,
                title: 'Лекц 3: Stack ба Queue',
                description: 'Stack and Queue data structures',
                materials: [
                    { type: 'ppt', name: 'Stack Queue.pptx', url: '#' }
                ]
            },
            {
                id: 4,
                title: 'Лекц 4: Мод',
                description: 'Tree data structures',
                materials: [
                    { type: 'pdf', name: 'Trees.pdf', url: '#' }
                ]
            },
        ]
    },
    {
        id: 3,
        title: 'Веб хөгжүүлэлт',
        description: 'Web Development',
        credit: 4,
        teacher: 'Dr. Brown',
        lectures: [
            {
                id: 1,
                title: 'Лекц 1: HTML үндэс',
                description: 'HTML Fundamentals',
                materials: [
                    { type: 'ppt', name: 'HTML Basics.pptx', url: '#' }
                ]
            },
            {
                id: 2,
                title: 'Лекц 2: CSS',
                description: 'Styling with CSS',
                materials: [
                    { type: 'pdf', name: 'CSS Guide.pdf', url: '#' }
                ]
            },
            {
                id: 3,
                title: 'Лекц 3: JavaScript',
                description: 'JavaScript programming',
                materials: [
                    { type: 'ppt', name: 'JavaScript.pptx', url: '#' }
                ]
            },
        ]
    },
    {
        id: 4,
        title: 'Мэдээллийн сан',
        description: 'Database Systems',
        credit: 3,
        teacher: 'Ms. Davis',
        lectures: [
            {
                id: 1,
                title: 'Лекц 1: SQL үндэс',
                description: 'Introduction to SQL',
                materials: [
                    { type: 'pdf', name: 'SQL Basics.pdf', url: '#' },
                    { type: 'ppt', name: 'SQL Slides.pptx', url: '#' }
                ]
            },
            {
                id: 2,
                title: 'Лекц 2: Хүснэгт үүсгэх',
                description: 'Creating Tables',
                materials: [
                    { type: 'ppt', name: 'Tables.pptx', url: '#' }
                ]
            },
        ]
    },
];