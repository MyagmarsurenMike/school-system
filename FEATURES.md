# HIS-WEB Features Documentation

## Overview
This application has three main user roles:
1. **Student** - View grades, schedules, lectures, and payments
2. **Teacher** - Manage student grades and upload course materials
3. **Finance** - Manage student payments and grade viewing permissions

---

## 🎓 Student Portal
**URL:** `/dashboard`

### Features:
- View personal information and GPA
- Access course schedules
- View grades and academic performance
- Access course lectures and materials
- Check payment status
- Download student certificate

---

## 👨‍🏫 Teacher Portal
**URL:** `/teacher`

### Features:

#### 1. Grade Management
- Select course from dropdown
- View all enrolled students in a table
- Input grades with easy-to-use interface:
  - Attendance percentage (0-100%)
  - Midterm score (0-100)
  - Final exam score (0-100)
  - Letter grade (A, A-, B+, B, etc.)
  - Grade point (auto-calculated based on letter grade)
- Save individual student grades or save all at once
- Real-time grade point calculation

#### 2. Lecture Upload
- Select course to upload materials
- Add title and description for each lecture
- Upload files (PDF, PPTX, DOCX)
- Drag-and-drop file upload
- View all uploaded lectures
- Delete lectures
- Preview/Download lectures

---

## 💰 Finance Portal
**URL:** `/finance`

### Features:

#### 1. Payment Management
- **Statistics Dashboard:**
  - Total students
  - Students who paid
  - Students with pending payments
  - Total revenue collected

- **Payment Table:**
  - View all student payment records
  - See total amount, paid amount, and remaining balance
  - Payment status (Paid/Pending/Overdue)
  - Search students by ID or name
  - Edit payment amounts
  - Auto-update payment status based on amount paid

#### 2. Grade View Permission Control
- **Permission Management:**
  - Control which students can view their grades
  - Toggle grade viewing permission with switch
  - See payment status alongside permissions
  - Warning when granting permission to students who haven't paid

- **Statistics:**
  - Students with grade view permission
  - Students without permission
  - Students with permission but haven't paid (flagged)

- **Smart Features:**
  - Automatic permission update when payment is completed
  - Visual highlighting of students with permission but unpaid
  - Search functionality
  - Bulk permission management

---

## 🔧 Technical Implementation

### Technologies Used:
- **Framework:** Next.js 16 with React 19
- **UI Library:** Ant Design 6
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript 5

### Key Components:

#### Teacher Components:
- `TeacherGradeManagement.tsx` - Grade input table with validation
- `TeacherLectureUpload.tsx` - File upload and lecture management

#### Finance Components:
- `FinancePaymentManagement.tsx` - Payment tracking and editing
- `FinanceGradePermission.tsx` - Permission control system

#### Shared Components:
- `TopNavigation.tsx` - Role-based navigation header
- Various data display components

### Data Models:
- `Student` - Extended with payment status and grade permission
- `Teacher` - Teacher profile information
- `Course` - Course details
- `StudentGradeInput` - Grade entry with multiple components
- `Lecture` - Uploaded course materials
- `StudentPaymentPermission` - Payment and permission tracking

---

## 🚀 Getting Started

### Access the Portals:

1. **Student Portal:**
   ```
   http://localhost:3000/dashboard
   ```

2. **Teacher Portal:**
   ```
   http://localhost:3000/teacher
   ```

3. **Finance Portal:**
   ```
   http://localhost:3000/finance
   ```

### Run the Development Server:
```bash
npm run dev
```

---

## 📝 Usage Guide

### For Teachers:
1. Navigate to `/teacher`
2. Go to "Үнэлгээ оруулах" (Grade Management) tab
3. Select your course from the dropdown
4. Enter grades for each student
5. Click "Хадгалах" (Save) for individual or "Бүгдийг хадгалах" (Save All)

### For Finance Staff:
1. Navigate to `/finance`
2. **To update payments:**
   - Go to "Төлбөрийн удирдлага" (Payment Management)
   - Click "Засах" (Edit) on any student
   - Update the paid amount
   - Click "Хадгалах" (Save)
   
3. **To manage grade permissions:**
   - Go to "Үнэлгээ харах эрх" (Grade View Permission)
   - Toggle the switch to enable/disable grade viewing
   - System warns if student hasn't paid fully

---

## 🔒 Business Logic

### Grade Permission Rules:
1. By default, students who paid in full can view grades
2. Finance can manually override this for special cases
3. System warns when granting permission to unpaid students
4. Highlighted in orange when permission granted but not paid

### Payment Status:
- **Paid:** Full amount paid (Green)
- **Pending:** Partial payment made (Orange)
- **Overdue:** No payment or past due (Red)

### Grade Calculation:
- Letter grades map to grade points (A=4.0, A-=3.7, etc.)
- System auto-calculates grade point when letter grade selected
- Teachers can track attendance, midterm, and final scores

---

## 🌐 Bilingual Support
All interfaces support:
- 🇲🇳 Mongolian (Монгол)
- 🇺🇸 English

Toggle language using the dropdown in the top navigation bar.

---

## 📊 Mock Data
The application includes comprehensive mock data for:
- 4 sample students with varying payment statuses
- 2 courses (Data Structures, Web Programming)
- Sample grades and lecture materials
- Payment records

This allows full testing of all features without a backend.
