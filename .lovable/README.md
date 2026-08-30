# 🇮🇳 LOK SEVAK

### Unified Digital Government Service Platform

LOK SEVAK is a prototype web application designed to demonstrate a unified digital gateway for accessing multiple government services through a single citizen profile.

The platform simplifies the government application process by allowing citizens to:

- Maintain a single Citizen Profile
- Discover government services
- Auto-fill application forms
- Reuse verified documents
- Save application drafts
- Preview applications before submission
- Generate application PDF previews
- Submit applications through a simulated integration gateway
- Track applications from multiple departments in one place

> **Note:** This project is a prototype/demo application. Government departments, APIs, citizen data, and integrations are simulated.

---

# 📸 Project Overview

LOK SEVAK demonstrates how different government departments could be connected through a unified digital platform.

```text
Citizen
   │
   ▼
LOK SEVAK Portal
   │
   ├── Citizen Profile
   ├── Service Discovery
   ├── AI Service Navigator
   ├── Application Forms
   ├── Document Management
   │
   ▼
Integration Gateway
   │
   ├── Revenue Department
   ├── Education Department
   ├── Municipal Services
   └── Social Welfare
   ---

# ✨ Features

## 👤 One Citizen Profile

Citizens maintain a single digital profile containing information such as:

- Full Name
- Date of Birth
- Gender
- Mobile Number
- Email
- Address
- District
- State
- PIN Code
- Masked Aadhaar Information
- PAN Information
- Verified Documents

The profile information can automatically populate application forms.

---

## 🏛️ Government Service Discovery

Users can browse services from multiple departments.

### Revenue Department

- Income Certificate
- Caste Certificate
- Domicile Certificate

### Municipal Services

- Birth Certificate
- Death Certificate
- Property Services

### Education Department

- State Scholarship
- Student Certificates
- Education Schemes

### Social Welfare Department

- Pension Schemes
- Disability Benefits
- Welfare Schemes

---

## 📝 Smart Application Forms

The application system includes:

- Multi-step application process
- Auto-filled citizen information
- Application-specific editable fields
- Required field validation
- Modified field tracking
- Form completion progress
- Service eligibility information

Application flow:

```text
1. Applicant Details
        ↓
2. Service Details
        ↓
3. Documents
        ↓
4. Review & Declaration
        ↓
5. Application Preview
        ↓
6. Submit through Integration Gateway