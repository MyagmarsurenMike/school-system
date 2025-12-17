'use client';

import React, { useState, useEffect } from "react";
import {
    Card,
    Table,
    Button,
    Modal,
    Input,
    message,
    Tag,
    Space,
    Tooltip,
    Empty,
    Avatar,
    Drawer,
    Grid,
} from "antd";
import {
    PlusOutlined,
    UserOutlined,
    DeleteOutlined,
    EditOutlined,
    MailOutlined,
    PhoneOutlined,
    SearchOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import StudentForm, { Student } from "./StudentForm";

const { useBreakpoint } = Grid;

const generateStudentId = (): string => {
    const year = new Date().getFullYear().toString().slice(-2);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, "0");
    return `ST${year}${random}`;
};

const StudentEdit: React.FC = () => {
    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const isTablet = screens.md && !screens.lg;
    
    const [students, setStudents] = useState<Student[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    
    // Search state
    const [searchText, setSearchText] = useState("");
    const [debouncedSearchText, setDebouncedSearchText] = useState("");

    // Load from LocalStorage on mount
    useEffect(() => {
        const savedStudents = localStorage.getItem("students");
        if (savedStudents) {
            try {
                setStudents(JSON.parse(savedStudents));
            } catch (e) {
                console.error("Failed to parse students from local storage", e);
            }
        }
    }, []);

    // Save to LocalStorage whenever students change
    useEffect(() => {
        localStorage.setItem("students", JSON.stringify(students));
    }, [students]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchText(searchText);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchText]);

    const handleOpenModal = (student?: Student) => {
        if (student) {
            setEditingStudent(student);
        } else {
            setEditingStudent(null);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingStudent(null);
    };

    const handleSubmit = (values: Omit<Student, "id" | "profileImage">, imageUrl?: string) => {
        if (editingStudent) {
            setStudents(
                students.map((s) =>
                    s.id === editingStudent.id
                        ? { ...values, id: editingStudent.id, profileImage: imageUrl }
                        : s
                )
            );
            message.success("Оюутны мэдээлэл амжилттай шинэчлэгдлээ");
        } else {
            const newStudent: Student = {
                ...values,
                id: generateStudentId(),
                profileImage: imageUrl,
            };
            setStudents([...students, newStudent]);
            message.success("Оюутан амжилттай нэмэгдлээ");
        }
        handleCloseModal();
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Устгах уу?",
            content: "Та энэ оюутныг устгахдаа итгэлтэй байна уу?",
            okText: "Тийм",
            cancelText: "Үгүй",
            okButtonProps: { danger: true },
            onOk: () => {
                setStudents(students.filter((s) => s.id !== id));
                message.success("Оюутан амжилттай устгагдлаа");
            },
        });
    };

    const getYearColor = (year: number) => {
        const colors = ["blue", "green", "orange", "purple"];
        return colors[year - 1] || "default";
    };

    // Filter students based on search text
    const filteredStudents = students.filter((student) => 
        student.name.toLowerCase().includes(debouncedSearchText.toLowerCase())
    );

    // Mobile columns - simplified view
    const mobileColumns: ColumnsType<Student> = [
        {
            title: "Оюутан",
            key: "student",
            render: (_, record) => (
                <div className="flex items-start gap-3 py-1">
                    <Avatar
                        size={48}
                        src={record.profileImage}
                        icon={!record.profileImage && <UserOutlined />}
                        className="bg-blue-100 text-blue-600 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-800 truncate">{record.name}</div>
                        <div className="text-xs text-gray-500">{record.id}</div>
                        <div className="text-xs text-gray-500 truncate">{record.major}</div>
                        <div className="flex items-center gap-2 mt-1">
                            <Tag color={getYearColor(record.year)} className="text-xs">
                                {record.year}-р курс
                            </Tag>
                            <span className="text-xs text-gray-500">Нас: {record.age}</span>
                        </div>
                    </div>
                    <Space direction="vertical" size={0}>
                        <Button
                            type="text"
                            size="small"
                            icon={<EditOutlined />}
                            className="text-blue-500"
                            onClick={() => handleOpenModal(record)}
                        />
                        <Button
                            type="text"
                            size="small"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.id)}
                        />
                    </Space>
                </div>
            ),
        },
    ];

    // Tablet columns - medium view
    const tabletColumns: ColumnsType<Student> = [
        {
            title: "Оюутан",
            key: "student",
            width: 200,
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <Avatar
                        size={40}
                        src={record.profileImage}
                        icon={!record.profileImage && <UserOutlined />}
                        className="bg-blue-100 text-blue-600 shrink-0"
                    />
                    <div className="min-w-0">
                        <div className="font-medium text-gray-800 truncate">{record.name}</div>
                        <div className="text-xs text-gray-500">{record.id}</div>
                    </div>
                </div>
            ),
        },
        {
            title: "Мэргэжил",
            dataIndex: "major",
            key: "major",
            width: 150,
            ellipsis: true,
        },
        {
            title: "Курс",
            dataIndex: "year",
            key: "year",
            width: 90,
            align: "center",
            render: (year: number) => (
                <Tag color={getYearColor(year)}>{year}-р курс</Tag>
            ),
        },
        {
            title: "Холбоо барих",
            key: "contact",
            width: 180,
            render: (_, record) => (
                <div className="text-sm">
                    <div className="flex items-center gap-1 text-gray-600 truncate">
                        <PhoneOutlined className="text-gray-400 shrink-0" />
                        {record.phone}
                    </div>
                </div>
            ),
        },
        {
            title: "",
            key: "actions",
            width: 80,
            align: "center",
            render: (_, record) => (
                <Space>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        className="text-blue-500"
                        onClick={() => handleOpenModal(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            ),
        },
    ];

    // Desktop columns - full view
    const desktopColumns: ColumnsType<Student> = [
        {
            title: "Оюутан",
            key: "student",
            width: 280,
            render: (_, record) => (
                <div className="flex items-center gap-3">
                    <Avatar
                        size={40}
                        src={record.profileImage}
                        icon={!record.profileImage && <UserOutlined />}
                        className="bg-blue-100 text-blue-600 shrink-0"
                    />
                    <div>
                        <div className="font-medium text-gray-800">{record.name}</div>
                        <div className="text-xs text-gray-500">{record.id}</div>
                    </div>
                </div>
            ),
        },
        {
            title: "Регистрийн дугаар",
            dataIndex: "registerId",
            key: "registerId",
            width: 140,
            render: (id: string) => (
                <span className="font-mono text-gray-600">{id}</span>
            ),
        },
        {
            title: "Мэргэжил",
            dataIndex: "major",
            key: "major",
            width: 180,
            ellipsis: true,
        },
        {
            title: "Курс",
            dataIndex: "year",
            key: "year",
            width: 100,
            align: "center",
            render: (year: number) => (
                <Tag color={getYearColor(year)}>{year}-р курс</Tag>
            ),
        },
        {
            title: "Нас",
            dataIndex: "age",
            key: "age",
            width: 70,
            align: "center",
        },
        {
            title: "Холбоо барих",
            key: "contact",
            width: 200,
            render: (_, record) => (
                <div className="text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                        <MailOutlined className="text-gray-400" />
                        <span className="truncate">{record.email}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500">
                        <PhoneOutlined className="text-gray-400" />
                        {record.phone}
                    </div>
                </div>
            ),
        },
        {
            title: "Үйлдэл",
            key: "actions",
            width: 100,
            align: "center",
            render: (_, record) => (
                <Space>
                    <Tooltip title="Засах">
                        <Button
                            type="text"
                            icon={<EditOutlined />}
                            className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                            onClick={() => handleOpenModal(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Устгах">
                        <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => handleDelete(record.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const getColumns = () => {
        if (isMobile) return mobileColumns;
        if (isTablet) return tabletColumns;
        return desktopColumns;
    };

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Header Card with Statistics */}
            <Card className="shadow-sm">
                <div className={`flex ${isMobile ? 'flex-col gap-4' : 'flex-row items-center justify-between'}`}>
                    <div className="flex items-center gap-4">
                        <div className="p-2 md:p-3 bg-blue-100 rounded-lg">
                            <UserOutlined className="text-xl md:text-2xl text-blue-600" />
                        </div>
                        <div>
                            <div className="text-xl md:text-2xl font-bold text-blue-600">
                                {students.length}
                            </div>
                            <div className="text-sm md:text-base text-gray-600">Нийт оюутан</div>
                        </div>
                    </div>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size={isMobile ? "middle" : "large"}
                        onClick={() => handleOpenModal()}
                        className={`bg-blue-500 hover:bg-blue-600 ${isMobile ? 'w-full' : ''}`}
                    >
                        Оюутан нэмэх
                    </Button>
                </div>
            </Card>

            {/* Student Table */}
            <Card 
                title={
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <span className="text-sm md:text-base">Оюутны жагсаалт</span>
                        <Input
                            placeholder="Нэрээр хайх..."
                            prefix={<SearchOutlined className="text-gray-400" />}
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            allowClear
                            className="w-full md:w-64"
                        />
                    </div>
                } 
                className="shadow-sm"
                styles={{ body: { padding: isMobile ? '12px' : '24px' } }}
            >
                <Table
                    columns={getColumns()}
                    dataSource={filteredStudents}
                    rowKey="id"
                    pagination={{
                        pageSize: isMobile ? 5 : 10,
                        showSizeChanger: !isMobile,
                        showTotal: isMobile ? undefined : (total) => `Нийт ${total} оюутан`,
                        size: isMobile ? "small" : "default",
                    }}
                    locale={{
                        emptyText: (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={
                                    debouncedSearchText 
                                        ? "Хайлтад тохирох оюутан олдсонгүй" 
                                        : "Оюутан байхгүй байна"
                                }
                            />
                        ),
                    }}
                    className="grades-table"
                    scroll={isMobile ? undefined : { x: 1000 }}
                    size={isMobile ? "small" : "middle"}
                />
            </Card>

            {/* Mobile: Use Drawer, Desktop: Use Modal */}
            {isMobile ? (
                <Drawer
                    title={
                        <div className="flex items-center gap-2">
                            <UserOutlined className="text-blue-500" />
                            {editingStudent ? "Оюутны мэдээлэл засах" : "Шинэ оюутан нэмэх"}
                        </div>
                    }
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    placement="bottom"
                    height="90%"
                    styles={{ body: { paddingBottom: 80 } }}
                >
                    <StudentForm
                        initialValues={editingStudent}
                        onSubmit={handleSubmit}
                        onCancel={handleCloseModal}
                        isMobile={isMobile}
                        editingStudent={!!editingStudent}
                    />
                </Drawer>
            ) : (
                <Modal
                    title={
                        <div className="flex items-center gap-2 text-lg">
                            <UserOutlined className="text-blue-500" />
                            {editingStudent ? "Оюутны мэдээлэл засах" : "Шинэ оюутан нэмэх"}
                        </div>
                    }
                    open={isModalOpen}
                    onCancel={handleCloseModal}
                    footer={null}
                    destroyOnHidden
                    width={isTablet ? 480 : 560}
                >
                    <StudentForm
                        initialValues={editingStudent}
                        onSubmit={handleSubmit}
                        onCancel={handleCloseModal}
                        isMobile={isMobile}
                        editingStudent={!!editingStudent}
                    />
                </Modal>
            )}
        </div>
    );
};

export default StudentEdit;