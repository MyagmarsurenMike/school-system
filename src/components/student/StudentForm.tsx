import React, { useState, useEffect } from "react";
import {
    Form,
    Input,
    InputNumber,
    Select,
    Button,
    Upload,
    Avatar,
    App,
} from "antd";
import {
    UserOutlined,
    IdcardOutlined,
    MailOutlined,
    PhoneOutlined,
    CameraOutlined,
    LoadingOutlined,
} from "@ant-design/icons";
import type { UploadProps } from "antd";

// Define the Student interface here to be used by both components
export interface Student {
    id: string;
    registerId: string;
    name: string;
    surname?: string;
    major: string;
    year: number;
    age: number;
    email: string;
    phone: string;
    profileImage?: string;
}

interface StudentFormProps {
    initialValues?: Student | null;
    onSubmit: (values: Omit<Student, "id" | "profileImage">, imageUrl?: string) => void;
    onCancel: () => void;
    isMobile: boolean;
    editingStudent: boolean;
}

const majorOptions = [
    { value: "Програм хангамж", label: "Програм хангамж" },
    { value: "Компьютерийн шинжлэх ухаан", label: "Компьютерийн шинжлэх ухаан" },
    { value: "Мэдээллийн систем", label: "Мэдээллийн систем" },
    { value: "Кибер аюулгүй байдал", label: "Кибер аюулгүй байдал" },
    { value: "Өгөгдлийн шинжлэх ухаан", label: "Өгөгдлийн шинжлэх ухаан" },
];

const yearOptions = [
    { value: 1, label: "1-р курс" },
    { value: 2, label: "2-р курс" },
    { value: 3, label: "3-р курс" },
    { value: 4, label: "4-р курс" },
];

const StudentForm: React.FC<StudentFormProps> = ({
    initialValues,
    onSubmit,
    onCancel,
    isMobile,
    editingStudent,
}) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState<string>();
    const [uploading, setUploading] = useState(false);
    const { message } = App.useApp();

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
            setImageUrl(initialValues.profileImage);
        } else {
            form.resetFields();
            setImageUrl(undefined);
        }
    }, [initialValues, form]);

    const handleImageUpload: UploadProps["customRequest"] = (options) => {
        const { file, onSuccess, onError } = options;
        setUploading(true);

        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result as string);
            setUploading(false);
            onSuccess?.("ok");
            message.success("Зураг амжилттай хуулагдлаа");
        };
        reader.onerror = () => {
            setUploading(false);
            onError?.(new Error("Upload failed"));
            message.error("Зураг хуулахад алдаа гарлаа");
        };
        reader.readAsDataURL(file as Blob);
    };

    const onFinish = (values: any) => {
        onSubmit(values, imageUrl);
    };

    const uploadButton = (
        <div className="flex flex-col items-center justify-center">
            {uploading ? <LoadingOutlined /> : <CameraOutlined className="text-2xl" />}
        </div>
    );

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="mt-4"
        >
            {/* Profile Image Upload */}
            <div className="flex justify-center mb-6">
                <Upload
                    name="avatar"
                    listType="picture-circle"
                    showUploadList={false}
                    customRequest={handleImageUpload}
                    accept="image/*"
                >
                    {imageUrl ? (
                        <Avatar
                            size={isMobile ? 80 : 100}
                            src={imageUrl}
                            className="cursor-pointer"
                        />
                    ) : (
                        uploadButton
                    )}
                </Upload>
            </div>

            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                <Form.Item
                    name="name"
                    label="Нэр"
                    rules={[{ required: true, message: "Нэр оруулна уу" }]}
                >
                    <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="Оюутны нэр"
                        size={isMobile ? "middle" : "large"}
                    />
                </Form.Item>

                <Form.Item
                    name="surname"
                    label="Овог"
                    rules={[{ required: true, message: "Овог оруулна уу" }]}
                >
                    <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="Оюутны овог"
                        size={isMobile ? "middle" : "large"}
                    />
                </Form.Item>
            </div>

            <div className={`grid grid-cols-12 gap-4`}>
                <Form.Item
                    name="registerId"
                    label="Регистрийн дугаар"
                    className="col-span-8"
                    rules={[
                        { required: true, message: "Регистрийн дугаар оруулна уу" },
                        {
                            pattern: /^[А-Яа-яӨөҮү]{2}\d{8}$/,
                            message: "Зөв регистрийн дугаар оруулна уу (жишээ: УБ12345678)"
                        },
                    ]}
                >
                    <Input
                        prefix={<IdcardOutlined className="text-gray-400" />}
                        placeholder="УБ12345678"
                        size={isMobile ? "middle" : "large"}
                    />
                </Form.Item>
                
                <Form.Item
                    name="age"
                    label="Нас"
                    className="flex w-full col-span-4"
                    rules={[
                        { required: true, message: "Нас оруулна уу" },
                        { type: "number", min: 17, max: 100, message: "Нас 16-100 хооронд байх ёстой" },
                    ]}
                >
                    <InputNumber
                        placeholder="Нас"
                        size={isMobile ? "middle" : "large"}
                        className="w-full"
                        min={16}
                        max={100}
                    />
                </Form.Item>
            </div>

            

            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                <Form.Item
                    name="major"
                    label="Мэргэжил"
                    rules={[{ required: true, message: "Мэргэжил сонгоно уу" }]}
                >
                    <Select
                        placeholder="Мэргэжил сонгох"
                        options={majorOptions}
                        size={isMobile ? "middle" : "large"}
                    />
                </Form.Item>

                <Form.Item
                    name="year"
                    label="Курс"
                    rules={[{ required: true, message: "Курс сонгоно уу" }]}
                >
                    <Select
                        placeholder="Курс сонгох"
                        options={yearOptions}
                        size={isMobile ? "middle" : "large"}
                    />
                </Form.Item>
            </div>



            <Form.Item
                name="email"
                label="И-мэйл"
                rules={[
                    { required: true, message: "И-мэйл оруулна уу" },
                    { type: "email", message: "Зөв и-мэйл хаяг оруулна уу" },
                ]}
            >
                <Input
                    prefix={<MailOutlined className="text-gray-400" />}
                    placeholder="email@example.com"
                    size={isMobile ? "middle" : "large"}
                />
            </Form.Item>

            <Form.Item
                name="phone"
                label="Утасны дугаар"
                rules={[
                    { required: true, message: "Утасны дугаар оруулна уу" },
                    { pattern: /^\d{8}$/, message: "8 оронтой дугаар оруулна уу" },
                ]}
            >
                <Input
                    prefix={<PhoneOutlined className="text-gray-400" />}
                    placeholder="99112233"
                    size={isMobile ? "middle" : "large"}
                    maxLength={8}
                />
            </Form.Item>

            <div className={`flex ${isMobile ? 'flex-col' : 'flex-row justify-end'} gap-2 mt-6 pt-4`}>
                <Button
                    size={isMobile ? "middle" : "large"}
                    onClick={onCancel}
                    className={isMobile ? "w-full" : ""}
                >
                    Цуцлах
                </Button>
                <Button
                    type="primary"
                    htmlType="submit"
                    size={isMobile ? "middle" : "large"}
                    className={`bg-blue-500 hover:bg-blue-600 ${isMobile ? "w-full" : ""}`}
                >
                    {editingStudent ? "Хадгалах" : "Нэмэх"}
                </Button>
            </div>
        </Form>
    );
};

export default StudentForm;
