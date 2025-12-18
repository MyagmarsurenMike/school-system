'use client';

import React from 'react';
import { Modal, Form, Input, Select, TimePicker, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Schedule } from '@/types';
import { SCHEDULE_LABELS, COURSES, SCHEDULE_TYPES } from '@/constants/schedule';
import { COMMON_LABELS } from '@/constants';
import dayjs, { Dayjs } from 'dayjs';

export interface ScheduleFormValues {
  courseCode: string;
  courseName?: string;
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
  onClose,
  onSave,
  onDelete,
}) => {
  const [form] = Form.useForm<ScheduleFormValues>();
  const isEdit = !!schedule;

  // Reset form when modal opens/closes or schedule changes
  React.useEffect(() => {
    if (open) {
      if (schedule) {
        form.setFieldsValue({
          courseCode: schedule.courseCode,
          courseName: schedule.courseName,
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
        title: SCHEDULE_LABELS.deleteConfirmTitle,
        content: SCHEDULE_LABELS.deleteConfirmContent,
        okText: COMMON_LABELS.yes,
        cancelText: COMMON_LABELS.no,
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
      title={isEdit ? SCHEDULE_LABELS.editSchedule : SCHEDULE_LABELS.addSchedule}
      open={open}
      onCancel={handleClose}
      footer={null}
      width={500}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        className="mt-4"
      >
        <Form.Item
          name="courseCode"
          label={SCHEDULE_LABELS.courseName}
          rules={[{ required: true, message: `${SCHEDULE_LABELS.courseName} сонгоно уу` }]}
        >
          <Select 
            options={COURSES} 
            placeholder={SCHEDULE_LABELS.selectCourse} 
          />
        </Form.Item>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="teacher"
            label={SCHEDULE_LABELS.teacher}
            rules={[{ required: true, message: `${SCHEDULE_LABELS.teacher} оруулна уу` }]}
          >
            <Input placeholder="Доктор Б.Эрдэнэ" />
          </Form.Item>
          <Form.Item
            name="room"
            label={SCHEDULE_LABELS.room}
            rules={[{ required: true, message: `${SCHEDULE_LABELS.room} оруулна уу` }]}
          >
            <Input placeholder="301" />
          </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Form.Item
            name="startTime"
            label={SCHEDULE_LABELS.startTime}
            rules={[{ required: true, message: `${SCHEDULE_LABELS.startTime} оруулна уу` }]}
          >
            <TimePicker format="HH:mm" className="w-full" />
          </Form.Item>
          <Form.Item
            name="endTime"
            label={SCHEDULE_LABELS.endTime}
            rules={[{ required: true, message: `${SCHEDULE_LABELS.endTime} оруулна уу` }]}
          >
            <TimePicker format="HH:mm" className="w-full" />
          </Form.Item>
        </div>

        <Form.Item
          name="type"
          label={SCHEDULE_LABELS.type}
          rules={[{ required: true, message: `${SCHEDULE_LABELS.type} сонгоно уу` }]}
        >
          <Select 
            options={SCHEDULE_TYPES} 
            placeholder={SCHEDULE_LABELS.selectType} 
          />
        </Form.Item>

        <div className="flex justify-between mt-6">
          <div>
            {isEdit && onDelete && (
              <Button danger onClick={handleDelete} icon={<DeleteOutlined />}>
                {SCHEDULE_LABELS.deleteSchedule}
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleClose}>
              {COMMON_LABELS.cancel}
            </Button>
            <Button type="primary" htmlType="submit">
              {COMMON_LABELS.save}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default ScheduleFormModal;
