'use client';

import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Switch, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { mockStudentPayments } from '@/data/mockData';
import type { StudentPaymentPermission } from '@/types';

interface EditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'number' | 'text' | 'switch';
  record: StudentPaymentPermission;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode;
  switch (inputType) {
    case 'number':
      inputNode = <InputNumber style={{ width: '100%' }} />;
      break;
    case 'switch':
      inputNode = <Switch checked={record[dataIndex as keyof StudentPaymentPermission] as boolean} />;
      break;
    default:
      inputNode = <Input />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          valuePropName={inputType === 'switch' ? 'checked' : 'value'}
          rules={[{ required: true, message: `Please input ${title}!` }]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const GradePermisson: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<StudentPaymentPermission[]>(mockStudentPayments);
  const [editingKey, setEditingKey] = useState<string>('');

  const isEditing = (record: StudentPaymentPermission) => record.studentId === editingKey;

  const edit = (record: StudentPaymentPermission) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.studentId);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (studentId: string) => {
    try {
      const row = (await form.validateFields()) as StudentPaymentPermission;
      const newData = [...data];
      const index = newData.findIndex(item => studentId === item.studentId);
      if (index > -1) {
        newData[index] = { ...newData[index], ...row };
        setData(newData);
        setEditingKey('');
        message.success('Updated successfully');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns: ColumnsType<StudentPaymentPermission> = [
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: 'Payment Status',
      dataIndex: 'paymentStatus',
      key: 'paymentStatus',
      editable: true,
    },
    {
      title: 'Can View Grades',
      dataIndex: 'canViewGrades',
      key: 'canViewGrades',
      editable: true,
      render: (_, record) => record.canViewGrades ? 'Yes' : 'No',
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      editable: true,
      render: (amount: number) => amount.toLocaleString(),
    },
    {
      title: 'Paid Amount',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
      editable: true,
      render: (amount: number) => amount.toLocaleString(),
    },
    {
      title: 'Semester',
      dataIndex: 'semester',
      key: 'semester',
      editable: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a onClick={() => save(record.studentId)} style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];

  const mergedColumns = columns.map(col => {
    if (!col.editable) return col;

    return {
      ...col,
      onCell: (record: StudentPaymentPermission) => ({
        record,
        inputType: col.dataIndex === 'canViewGrades' ? 'switch' : (col.dataIndex === 'totalAmount' || col.dataIndex === 'paidAmount' ? 'number' : 'text'),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowKey="studentId"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

export default GradePermisson;
