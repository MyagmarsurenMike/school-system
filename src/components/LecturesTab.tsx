import React, { useState } from 'react';
import { Modal } from 'antd';
import { FilePdfOutlined, FilePptOutlined, ArrowLeftOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import { Language } from '@/types';
// Import the LECTURES data and Lecture/Material types
import { LECTURES, Lecture, Material } from '../constants/lecture'; // Adjust path as necessary

interface LecturesTabProps {
    language?: Language;
}

const LecturesTab: React.FC<LecturesTabProps> = ({ language = 'mn' }) => {
    // Use the imported Lecture type
    const [selectedLecture, setSelectedLecture] = useState<Lecture | null>(null);
    const [previewOpen, setPreviewOpen] = useState(false);
    // Use the imported Material type
    const [previewMaterial, setPreviewMaterial] = useState<Material | null>(null);

    // Use Material type for the argument
    const handlePreview = (material: Material) => {
        setPreviewMaterial(material);
        setPreviewOpen(true);
    };

    // Use the imported constant data
    const lectures = LECTURES; 

    if (selectedLecture) {
        return (
            <div className="p-5 font-sans">
                <button 
                    onClick={() => setSelectedLecture(null)}
                    className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                    <ArrowLeftOutlined className="mr-2" />
                    {language === 'mn' ? 'Буцах' : 'Back'}
                </button>

                <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
                    <div className="border-b border-gray-200 pb-6 mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedLecture.title}</h2>
                        <p className="text-gray-600 text-lg">{selectedLecture.description}</p>
                        <div className="flex items-center mt-4 text-sm text-gray-500">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-4">
                                {selectedLecture.teacher}
                            </span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                Credit: {selectedLecture.credit}
                            </span>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        {language === 'mn' ? 'Хичээлийн материал' : 'Course Materials'}
                    </h3>
                    
                    <div className="w-full">
                        {selectedLecture.materials.map((material: Material, index: number) => (
                            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center">
                                    <div className={`p-3 rounded-lg mr-4 ${material.type === 'pdf' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'}`}>
                                        {material.type === 'pdf'||'ppt'  ? <FilePdfOutlined className="text-xl" /> : <FilePptOutlined className="text-xl" />}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{material.name}</p>
                                        <p className="text-xs text-gray-500 uppercase">{material.type}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => handlePreview(material)}
                                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                        title={language === 'mn' ? 'Харах' : 'Preview'}
                                    >
                                        <EyeOutlined className="text-lg" />
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

    return (
        <div className="p-5 font-sans">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {lectures.map((lecture) => (
                    <div
                        key={lecture.id}
                        onClick={() => setSelectedLecture(lecture)}
                        className="cursor-pointer border border-gray-300 rounded-lg p-5 shadow-md bg-white transform transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <h3 className="mb-2 text-lg font-semibold text-blue-600">{lecture.title}</h3>
                        <p className="text-gray-600">{lecture.description}</p>
                        <div className="mt-4 border-t border-gray-300"></div>
                        <div className='flex justify-between'>
                            <p className="mt-2 px-2 bg-green-400 rounded-2xl text-sm text-white">КР: {lecture.credit}</p>
                            <p className="mt-2 text-sm px-2">{lecture.teacher}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LecturesTab;