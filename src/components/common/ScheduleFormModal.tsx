'use client';

import React from 'react';
import { Modal, Form, Input, Select, TimePicker, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Schedule, Language } from '@/types';
import { 
  scheduleTranslations, 
  getCourseSelectOptions, 
  getTypeSelectOptions,
  COURSE_OPTIONS 
} from '@/constants/schedule';
import dayjs, { Dayjs } from 'dayjs';

export interface ScheduleFormValues {
  courseCode: string;
  courseName?: string;
  courseNameEn?: string;
  teacher: string;
  room: string;
  startTime: Dayjs;
  endTime: Dayjs;
  type: 'lecture' | 'lab' | 'tutorial';
}

export interface ScheduleFormModalProps {
  /** Whether the modal is open */
  open: boolean;
  /** Schedule being edited (null for new schedule) */
  schedule: Schedule | null;
  /** Selected cell info */
  selectedCell: { day: number; time: string } | null;
  /** Current language */
  language: Language;
  /** Close handler */
  onClose: () => void;
  /** Save handler */
  onSave: (values: ScheduleFormValues, isEdit: boolean) => void;
  /** Delete handler */
  onDelete?: (schedule: Schedule) => void;
}

/**
 * Reusable modal for adding/editing schedule items
 */
export const ScheduleFormModal: React.FC<ScheduleFormModalProps> = ({
  open,
  schedule,
  selectedCell,
  language,
  onClose,
  onSave,
  onDelete,
}) => {
  const [form] = Form.useForm<ScheduleFormValues>();
  const t = scheduleTranslations[language];
  const isEdit = !!schedule;

  // Reset form when modal opens/closes or schedule changes
  React.useEffect(() => {
    if (open) {
      if (schedule) {
        form.setFieldsValue({
          courseCode: schedule.courseCode,
          courseName: schedule.courseName,
          courseNameEn: schedule.courseNameEn,
          teacher: schedule.teacher,
          room: schedule.room,
          type: schedule.type,
          startTime: dayjs(schedule.startTime, 'HH:mm'),
          endTime: dayjs(schedule.endTime, 'HH:mm'),
        });
      } else {
        form.resetFields();
        if (selectedCell) {
          form.setFieldsValue({
            startTime: dayjs(selectedCell.time, 'HH:mm'),
            endTime: dayjs(selectedCell.time, 'HH:mm').add(80, 'minute'),
          });
        }
      }
    }
  }, [open, schedule, selectedCell, form]);

  const handleFinish = (values: ScheduleFormValues) => {
    onSave(values, isEdit);
    form.resetFields();
  };

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleDelete = () => {
    if (schedule && onDelete) {
      Modal.confirm({
        title: t.deleteConfirmTitle,
        content: t.deleteConfirmContent,
        okText: language === 'mn' ? 'Тийм' : 'Yes',
        cancelText: language === 'mn' ? 'Үгүй' : 'No',
        okButtonProps: { danger: true },
        onOk: () => {
          onDelete(schedule);
          form.resetFields();
        },
      });
    }
  };

  return (
    <Modal
      title={isEdit ? t.editSchedule : t.addSchedule}
      open={open}
      onCancel={handleClose}
      footer={null}
      width={500}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="mt-4"
      >
        <Form.Item
          name="courseCode"
          label={t.courseName}
          rules={[{ required: true, message: `${t.courseName} ${language === 'mn' ? 'сонгоно уу' : 'is required'}` }]}
        >
          <Select 
            options={getCourseSelectOptions(language)} 
            placeholder={t.selectCourse} 
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="teacher"
            label={t.teacher}
            rules={[{ required: true, message: `${t.teacher} ${language === 'mn' ? 'оруулна уу' : 'is required'}` }]}
          >
            <Input placeholder={language === 'mn' ? 'Доктор Б.Эрдэнэ' : 'Dr. B. Erdene'} />
          </Form.Item>
          <Form.Item
            name="room"
            label={t.room}
            rules={[{ required: true, message: `${t.room} ${language === 'mn' ? 'оруулна уу' : 'is required'}` }]}
          >
            <Input placeholder="301" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="startTime"
            label={t.startTime}
            rules={[{ required: true, message: `${t.startTime} ${language === 'mn' ? 'оруулна уу' : 'is required'}` }]}
          >
            <TimePicker format="HH:mm" className="w-full" />
          </Form.Item>
          <Form.Item
            name="endTime"
            label={t.endTime}
            rules={[{ required: true, message: `${t.endTime} ${language === 'mn' ? 'оруулна уу' : 'is required'}` }]}
          >
            <TimePicker format="HH:mm" className="w-full" />
          </Form.Item>
        </div>

        <Form.Item
          name="type"
          label={t.type}
          rules={[{ required: true, message: `${t.type} ${language === 'mn' ? 'сонгоно уу' : 'is required'}` }]}
        >
          <Select 
            options={getTypeSelectOptions(language)} 
            placeholder={t.selectType} 
          />
        </Form.Item>

        <div className="flex justify-between mt-6">
          <div>
            {isEdit && onDelete && (
              <Button danger onClick={handleDelete} icon={<DeleteOutlined />}>
                {t.deleteSchedule}
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleClose}>
              {language === 'mn' ? 'Цуцлах' : 'Cancel'}
            </Button>
            <Button type="primary" htmlType="submit">
              {language === 'mn' ? 'Хадгалах' : 'Save'}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ScheduleFormModal;
