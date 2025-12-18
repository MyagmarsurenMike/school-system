import React, { useState } from 'react';
import { Modal, Pagination } from 'antd';
import { FilePdfOutlined, FilePptOutlined, ArrowLeftOutlined, EyeOutlined, BookOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Subject, CourseLecture, CourseMaterial } from '@/types';
import { SUBJECTS } from '@/constants/lecture';

interface LecturesTabProps {}

const LecturesTab: React.FC<LecturesTabProps> = () => {
    // State for navigation: null = subjects grid, subject = lectures list, lecture = detail view
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
    const [selectedLecture, setSelectedLecture] = useState<CourseLecture | null>(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewMaterial, setPreviewMaterial] = useState<CourseMaterial | null>(null);
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const handlePreview = (material: CourseMaterial) => {
        setPreviewMaterial(material);
        setPreviewOpen(true);
    };

    const handleBackToSubjects = () => {
        setSelectedSubject(null);
        setSelectedLecture(null);
        setCurrentPage(1);
    };

    const handleBackToLectures = () => {
        setSelectedLecture(null);
    };

    const handleSelectSubject = (subject: Subject) => {
        setSelectedSubject(subject);
        setCurrentPage(1);
    };

    const handleSelectLecture = (lecture: CourseLecture) => {
        setSelectedLecture(lecture);
    };

    // Get paginated lectures
    const getPaginatedLectures = () => {
        if (!selectedSubject) return [];
        const startIndex = (currentPage - 1) * pageSize;
        return selectedSubject.lectures.slice(startIndex, startIndex + pageSize);
    };

    // View 3: Lecture Detail View (watching lesson)
    if (selectedSubject && selectedLecture) {
        return (
            <div className="p-5 font-sans">
                <button 
                    onClick={handleBackToLectures}
                    className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <ArrowLeftOutlined className="mr-2" />
                    Лекц жагсаалт руу буцах
                </button>

                <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                    <div className="border-b border-gray-200 pb-6 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                                {selectedSubject.title}
                            </span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                {selectedSubject.teacher}
                            </span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedLecture.title}</h2>
                        <p className="text-gray-600 text-lg">{selectedLecture.description}</p>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Хичээлийн материал
                    </h3>
                    
                    <div className="w-full space-y-3">
                        {selectedLecture.materials.map((material: CourseMaterial, index: number) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center">
                                    <div className={`p-3 rounded-lg mr-4 ${material.type === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                        {material.type === 'pdf' ? <FilePdfOutlined className="text-xl" /> : <FilePptOutlined className="text-xl" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{material.name}</p>
                                        <p className="text-xs text-gray-500 uppercase">{material.type}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handlePreview(material)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        title="Харах"
                                    >
                                        <EyeOutlined className="text-lg" />
                                        Үзэх
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Modal
                    title={previewMaterial?.name}
                    open={previewOpen}
                    onCancel={() => setPreviewOpen(false)}
                    footer={null}
                    width="80%"
                    style={{ top: 20 }}
                    destroyOnHidden={true}
                >
                    <div className="h-[75vh] w-full">
                        {previewMaterial && (
                            <iframe
                                src={previewMaterial.url}
                                className="w-full h-full rounded border-none"
                                title="Slide Preview"
                            />
                        )}
                    </div>
                </Modal>
            </div>
        );
    }

    // View 2: Lectures List with Pagination
    if (selectedSubject) {
        const paginatedLectures = getPaginatedLectures();
        const totalLectures = selectedSubject.lectures.length;

        return (
            <div className="p-5 font-sans">
                <button 
                    onClick={handleBackToSubjects}
                    className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <ArrowLeftOutlined className="mr-2" />
                    Хичээлүүд рүү буцах
                </button>

                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedSubject.title}</h2>
                            <p className="text-gray-600">{selectedSubject.description}</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                {selectedSubject.teacher}
                            </span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                                Кредит: {selectedSubject.credit}
                            </span>
                        </div>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Лекцүүд ({totalLectures})
                </h3>

                <div className="space-y-3">
                    {paginatedLectures.map((lecture, index) => (
                        <div
                            key={lecture.id}
                            onClick={() => handleSelectLecture(lecture)}
                            className="cursor-pointer flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                                    {(currentPage - 1) * pageSize + index + 1}
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-800">{lecture.title}</h4>
                                    <p className="text-sm text-gray-500">{lecture.description}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-400">
                                    {lecture.materials.length} материал
                                </span>
                                <PlayCircleOutlined className="text-2xl text-blue-500" />
                            </div>
                        </div>
                    ))}
                </div>

                {totalLectures > pageSize && (
                    <div className="flex justify-center mt-6">
                        <Pagination
                            current={currentPage}
                            total={totalLectures}
                            pageSize={pageSize}
                            onChange={(page) => setCurrentPage(page)}
                            showSizeChanger={false}
                        />
                    </div>
                )}
            </div>
        );
    }

    // View 1: Subjects Grid
    return (
        <div className="p-5 font-sans">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Хичээлүүд
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {SUBJECTS.map((subject) => (
                    <div
                        key={subject.id}
                        onClick={() => handleSelectSubject(subject)}
                        className="cursor-pointer border border-gray-300 rounded-lg p-5 shadow-md bg-white transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                                <BookOutlined className="text-xl" />
                            </div>
                            <h3 className="text-lg font-semibold text-blue-600">{subject.title}</h3>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{subject.description}</p>
                        <div className="border-t border-gray-200 pt-3">
                            <div className="flex justify-between items-center">
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                                    КР: {subject.credit}
                                </span>
                                <span className="text-xs text-gray-500">
                                    {subject.lectures.length} лекц
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{subject.teacher}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LecturesTab;