'use client';

import React, { useState } from 'react';
import { Card, Select, Upload, Button, message, Table, Tag, Modal, Input, Typography, Empty, Tooltip } from 'antd';
import { 
  UploadOutlined, 
  FilePdfOutlined, 
  FileWordOutlined, 
  FilePptOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  CloudUploadOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import type { UploadFile } from 'antd/es/upload/interface';
import { Course, Lecture } from '@/types';
import { mockTeacherLectures } from '@/data/mockData';
import type { ColumnsType } from 'antd/es/table';

const { Dragger } = Upload;

interface TeacherLectureUploadProps {
  courses: Course[];
}

const translations = {
  mn: {
    selectCourse: 'Хичээл сонгох',
    uploadLecture: 'Хичээл байршуулах',
    title: 'Гарчиг',
    description: 'Тайлбар',
    uploadedLectures: 'Байршуулсан хичээлүүд',
    fileName: 'Файлын нэр',
    fileType: 'Төрөл',
    fileSize: 'Хэмжээ',
    uploadDate: 'Огноо',
    actions: 'Үйлдэл',
    delete: 'Устгах',
    view: 'Харах',
    upload: 'Байршуулах',
    uploadSuccess: 'Файл амжилттай байршлаа',
    deleteSuccess: 'Файл амжилттай устгагдлаа',
    selectFile: 'Файл сонгох',
    dragHere: 'Эсвэл энд чирж оруулна уу',
    supportedFormats: 'Дэмжигдэх формат: PDF, PPTX, DOCX',
    enterTitle: 'Гарчиг оруулна уу',
    enterDescription: 'Тайлбар оруулна уу (заавал биш)',
  },
};

const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case 'pdf':
      return <FilePdfOutlined className="text-red-500 text-2xl" />;
    case 'pptx':
      return <FilePptOutlined className="text-orange-500 text-2xl" />;
    case 'docx':
      return <FileWordOutlined className="text-blue-500 text-2xl" />;
    default:
      return <FileTextOutlined className="text-gray-500 text-2xl" />;
  }
};

export default function TeacherLectureUpload({ courses }: TeacherLectureUploadProps) {
  const t = translations['mn'];
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [lectures, setLectures] = useState<Lecture[]>(mockTeacherLectures);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleUpload = () => {
    if (!selectedCourse || !title || fileList.length === 0) {
      message.warning('Бүх шаардлагатай мэдээллийг оруулна уу');
      return;
    }

    const file = fileList[0];
    const fileExtension = file.name.split('.').pop() as 'pdf' | 'pptx' | 'docx';
    
    const newLecture: Lecture = {
      id: `L${Date.now()}`,
      courseId: selectedCourse,
      title: title,
      titleEn: title,
      description: description,
      uploadDate: new Date().toISOString().split('T')[0],
      fileUrl: `/uploads/${file.name}`,
      fileType: fileExtension,
      fileSize: `${(file.size! / 1024 / 1024).toFixed(2)} MB`,
    };

    setLectures([newLecture, ...lectures]);
    message.success(t.uploadSuccess);
    
    // Reset form
    setFileList([]);
    setTitle('');
    setDescription('');
  };

  const handleDelete = (lectureId: string) => {
    Modal.confirm({
      title: 'Устгах уу?',
      content: 'Та энэ хичээлийг устгахдаа итгэлтэй байна уу?',
      okText: 'Тийм',
      cancelText: 'Үгүй',
      onOk: () => {
        setLectures(lectures.filter((l) => l.id !== lectureId));
        message.success(t.deleteSuccess);
      },
    });
  };

  const columns: ColumnsType<Lecture> = [
    {
      title: t.fileType,
      dataIndex: 'fileType',
      key: 'fileType',
      width: 80,
      align: 'center',
      render: (fileType: string) => getFileIcon(fileType),
    },
    {
      title: t.title,
      dataIndex: 'title',
      key: 'title',
      render: (title: string, record: Lecture) => (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900 text-base">{title}</span>
          {record.description && (
            <span className="text-sm text-gray-500 line-clamp-1">{record.description}</span>
          )}
        </div>
      ),
    },
    {
      title: t.fileSize,
      dataIndex: 'fileSize',
      key: 'fileSize',
      width: 120,
      render: (size: string) => <Tag color="default">{size}</Tag>,
    },
    {
      title: t.uploadDate,
      dataIndex: 'uploadDate',
      key: 'uploadDate',
      width: 150,
      render: (date: string) => <span className="text-gray-500">{date}</span>,
    },
    {
      title: t.actions,
      key: 'actions',
      width: 120,
      align: 'center',
      render: (_, record: Lecture) => (
        <div className="flex gap-2 justify-center">
          {/* <Tooltip title={t.view}>
            <Button
              type="text"
              icon={<EyeOutlined />}
              className="text-blue-600 hover:bg-blue-50"
              onClick={() => window.open(record.fileUrl, '_blank')}
            />
          </Tooltip> */}
          <Tooltip title={t.delete}>
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              className="hover:bg-red-50"
              onClick={() => handleDelete(record.id)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  const courseOptions = courses.map((course) => ({
    value: course.id,
    label: `${course.courseCode} - ${course.courseName}`,
  }));

  const filteredLectures = selectedCourse
    ? lectures.filter((l) => l.courseId === selectedCourse)
    : lectures;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Upload Form */}
      <div className="lg:col-span-1">
        <Card 
          className="shadow-sm border-gray-200 h-full"
          title={<span className="font-semibold text-lg">{t.uploadLecture}</span>}
        >
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.selectCourse} <span className="text-red-500">*</span></label>
              <Select
                value={selectedCourse}
                onChange={setSelectedCourse}
                options={courseOptions}
                placeholder={t.selectCourse}
                className="w-full"
                size="large"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.title} <span className="text-red-500">*</span></label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.enterTitle}
                size="large"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t.description}</label>
              <Input.TextArea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t.enterDescription}
                rows={3}
                className="resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Файл <span className="text-red-500">*</span>
              </label>
              <Dragger
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
                beforeUpload={() => false}
                maxCount={1}
                accept=".pdf,.pptx,.docx"
                className="bg-gray-50 border-dashed border-2 border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
                height={150}
              >
                <p className="ant-upload-drag-icon">
                  <CloudUploadOutlined className="text-4xl text-blue-500" />
                </p>
                <p className="ant-upload-text font-medium text-gray-700">{t.selectFile}</p>
                <p className="ant-upload-hint text-gray-500 text-sm px-4">{t.dragHere}</p>
                <p className="ant-upload-hint text-xs text-gray-400 mt-2">{t.supportedFormats}</p>
              </Dragger>
            </div>

            <Button
              type="primary"
              size="large"
              icon={<UploadOutlined />}
              onClick={handleUpload}
              disabled={!selectedCourse || !title || fileList.length === 0}
              className="w-full h-10 font-medium"
            >
              {t.upload}
            </Button>
          </div>
        </Card>
      </div>

      {/* Uploaded Lectures List */}
      <div className="lg:col-span-2">
        <Card 
          className="shadow-sm border-gray-200 h-full"
          title={
            <div className="flex justify-between items-center">
              <span className="font-semibold text-lg">{t.uploadedLectures}</span>
              <Tag color="blue">{filteredLectures.length} файл</Tag>
            </div>
          }
          styles={{ body: { padding: 0 } }}
        >
          {filteredLectures.length > 0 ? (
            <Table
              columns={columns}
              dataSource={filteredLectures}
              rowKey="id"
              pagination={{
                pageSize: 8,
                showTotal: (total) => `Нийт: ${total}`,
                className: "p-4"
              }}
            />
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span className="text-gray-500">
                  {selectedCourse 
                    ? 'Энэ хичээлд файл байхгүй байна'
                    : 'Хичээл сонгож файлуудыг харна уу'}
                </span>
              }
              className="py-12"
            />
          )}
        </Card>
      </div>
    </div>
  );
}
