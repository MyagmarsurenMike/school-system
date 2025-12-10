'use client';

import React, { useRef } from 'react';
import { Card, Button } from 'antd';
import { useReactToPrint } from 'react-to-print';
import { PrinterOutlined, DownloadOutlined } from '@ant-design/icons';
import { Student, Language } from '@/types';

interface StudentCertificateProps {
  student: Student;
  language: Language;
}

const translations = {
  mn: {
    title: 'Суралцагчийн тодорхойлолт',
    schoolName: 'Шинэ Монгол Эрдмийн Хүрээлэн',
    address: 'Монгол улс, Улаанбаатар хот, Баянзүрх дүүрэг',
    contact: 'Утас/факс: 75777799 | info@nmct.edu.mn',
    certifyText: 'овогтой',
    certifyText2: 'нь',
    certifyText3: 'хөтөлбөрөөр',
    certifyText4: 'дамжаа-д сурдаг нь үнэн болно.',
    englishIntro: 'This is to certify that',
    englishText: 'studies',
    englishText2: 'course,',
    englishText3: 'program of the college.',
    copyright: '© 2025 New Mongol Academy',
    print: 'Хэвлэх',
    download: 'Татах',
  },
  en: {
    title: 'Student Certificate',
    schoolName: 'Shine Mongol Erdmiin Hureeleen',
    address: 'Mongolia, Ulaanbaatar, Bayanzurkh District',
    contact: 'Phone/Fax: 75777799 | info@nmct.edu.mn',
    certifyText: '',
    certifyText2: 'is studying',
    certifyText3: 'program in',
    certifyText4: 'year.',
    englishIntro: 'This is to certify that',
    englishText: 'studies',
    englishText2: 'course,',
    englishText3: 'program of the college.',
    copyright: '© 2025 New Mongol Academy',
    print: 'Print',
    download: 'Download',
  },
};

export default function StudentCertificate({ student, language }: StudentCertificateProps) {
  const t = translations[language];
  const certificateRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: certificateRef,
    documentTitle: t.title,
  });

  const handleDownload = () => {
    // Logic to download as PDF
    alert(language === 'mn' ? 'Тодорхойлолт татаж байна...' : 'Downloading certificate...');
  };

  // Extract last name and first name
  const [lastName, ...firstNameParts] = student.name.split(' ');
  const firstName = firstNameParts.join(' ');
  const [lastNameEn, ...firstNamePartsEn] = student.nameEn.split(' ');
  const firstNameEn = firstNamePartsEn.join(' ');

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4 flex justify-end gap-2 print:hidden">
        <Button icon={<PrinterOutlined />} onClick={handlePrint}>
          {t.print}
        </Button>
        <Button icon={<DownloadOutlined />} type="primary" onClick={handleDownload}>
          {t.download}
        </Button>
      </div>

      <Card ref={certificateRef} className="certificate shadow-lg border-2 border-gray-300 rounded-lg print:shadow-none print:border-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-3xl">О</span>
          </div>
          
          <div className="text-center flex-1 px-4">
            <h1 className="text-xl font-bold text-gray-900 mb-2">{t.schoolName}</h1>
            <p className="text-sm text-gray-600">{t.address}</p>
            <p className="text-sm text-gray-600">{t.contact}</p>
          </div>
          
          <div className="w-20 h-20 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-3xl">М</span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 uppercase border-b-4 border-blue-600 inline-block pb-2">
            {t.title}
          </h2>
        </div>

        {/* Mongolian Certificate Text */}
        <div className="mb-8 text-center">
          <p className="text-lg leading-relaxed text-gray-800">
            <span className="font-semibold uppercase">{lastName}</span> {t.certifyText}{' '}
            <span className="font-semibold uppercase">{firstName}</span> {t.certifyText2}{' '}
            <span className="font-bold text-blue-600 uppercase">{student.major}</span>{' '}
            {t.certifyText3} <span className="font-bold text-indigo-600">{student.year}-р</span>{' '}
            {t.certifyText4}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-dashed border-gray-300 my-8"></div>

        {/* English Certificate Text */}
        <div className="mb-8 text-center">
          <p className="text-base leading-relaxed text-gray-700 italic">
            {t.englishIntro}{' '}
            <span className="font-semibold uppercase not-italic">{firstNameEn} {lastNameEn}</span>{' '}
            {t.englishText} <span className="font-bold not-italic">{student.year}th</span>{' '}
            {t.englishText2}{' '}
            <span className="font-bold text-blue-600 uppercase not-italic">{student.major}</span>{' '}
            {t.englishText3}
          </p>
        </div>

        {/* Certificate Details */}
        <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{language === 'mn' ? 'Оюутны дугаар' : 'Student ID'}:</span>{' '}
              <span className="text-blue-600 font-mono">{student.id}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{language === 'mn' ? 'Голч дүн' : 'GPA'}:</span>{' '}
              <span className="text-green-600 font-bold">{student.gpa.toFixed(2)}</span>
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{language === 'mn' ? 'Улирал' : 'Semester'}:</span>{' '}
              {student.semester}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">{language === 'mn' ? 'Огноо' : 'Date'}:</span>{' '}
              2025-12-05
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t-2 border-gray-200 flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">{t.copyright}</p>
          </div>
          
          <div className="text-right">
            <div className="w-24 h-24 border-2 border-blue-600 rounded-full flex items-center justify-center bg-blue-50">
              <div className="text-center">
                <p className="text-xs font-bold text-blue-600">OFFICIAL</p>
                <p className="text-xs font-bold text-blue-600">STAMP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Line */}
        <div className="mt-8 flex justify-between">
          <div className="text-center">
            <div className="border-t-2 border-gray-400 w-48 mb-2"></div>
            <p className="text-xs text-gray-600">{language === 'mn' ? 'Захирал' : 'Director'}</p>
          </div>
          <div className="text-center">
            <div className="border-t-2 border-gray-400 w-48 mb-2"></div>
            <p className="text-xs text-gray-600">{language === 'mn' ? 'Бүртгэлийн хэлтсийн дарга' : 'Registrar'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
