'use client';

import React, { useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Switch, Typography, message, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { mockStudentPayments } from '@/data/mockData';
import type { StudentPaymentPermission } from '@/types';


interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: 'number' | 'text'; // Removed 'switch' here as we handle it directly in the column now
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
  const inputNode = inputType === 'number' ? <InputNumber style={{ width: '100%' }} /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please input ${title}!`,
            },
          ]}
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
      const index = newData.findIndex((item) => studentId === item.studentId);

      if (index > -1) {
        const item = newData[index];
        // Merge the edited fields into the data
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
        message.success('Row updated successfully');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // New function to handle the Switch toggle directly
  const handlePermissionToggle = (checked: boolean, record: StudentPaymentPermission) => {
    const newData = data.map((item) => {
      if (item.studentId === record.studentId) {
        return { ...item, canViewGrades: checked };
      }
      return item;
    });

    setData(newData);
    message.success(`${record.name}'s permission set to ${checked ? 'Visible' : 'Hidden'}`);
  };

  type EditableColumnType = (typeof columns)[number] & { editable?: boolean; dataIndex: string };

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
      width: '15%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true, // Still editable via the "Edit" button
      width: '20%',
    },
    {
      title: 'Can View Grades',
      dataIndex: 'canViewGrades',
      key: 'canViewGrades',
      width: '15%',
      render: (checked: boolean, record: StudentPaymentPermission) => (
        <Switch 
          checked={checked}
          disabled={editingKey !== '' && editingKey !== record.studentId}
          onChange={(val) => handlePermissionToggle(val, record)}
        />
      ),
    },
    {
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      editable: true,
      width: '15%',
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: 'Paid Amount',
      dataIndex: 'paidAmount',
      key: 'paidAmount',
      editable: true,
      width: '15%',
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: StudentPaymentPermission) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => save(record.studentId)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns: ColumnsType<StudentPaymentPermission> = (columns as EditableColumnType[]).map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: StudentPaymentPermission) => ({
        record,
        inputType: col.dataIndex === 'totalAmount' || col.dataIndex === 'paidAmount' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className='bg-white p-6 rounded-md shadow-md space-y-6'>
        <Card>
            <Input.Search
              placeholder="Оюутны ID эсвэл нэрээр хайх"
              allowClear
              enterButton="Хайх"
              size="middle"
              onSearch={(value) => {
              const filteredData = mockStudentPayments.filter(
                (student) =>
                  student.studentId.toLowerCase().includes(value.toLowerCase()) ||
                  student.name.toLowerCase().includes(value.toLowerCase())
              );
              setData(filteredData);
                  }}
              /> 
        </Card>


      <div>
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
      </div>
      
    </div>
    
  );
};

export default GradePermisson;