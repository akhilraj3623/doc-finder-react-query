# 🩺 Doctor Listing App

A fully client-side React application that allows users to search, filter, and sort a list of doctors using an API dataset. Built as part of a UI/UX and frontend functionality challenge.

## 🚀 Live Demo
<!-- Add your live deployment link here if available -->
[View Live App](https://your-deployment-link.com)

---

## 📌 Features

### 🔍 Autocomplete Search
- Search doctors by name (case-insensitive).
- Shows top 3 matching suggestions.
- Clicking a suggestion or pressing Enter filters the list.

### 🧪 Filters (Fully Client-side)
- **Consultation Type** (Radio): Video Consult / In Clinic
- **Specialties** (Checkbox): Multiple specialties from dataset.
- **Sorting**:
  - Fees (Ascending)
  - Experience (Descending)

### 🧑‍⚕️ Doctor Cards
Each card displays:
- Name
- Specialties
- Experience
- Fees

### 🌐 URL Sync
- Filters and search reflected in query parameters.
- Supports browser navigation (Back/Forward) retaining filters.

---

## 🧪 Test Automation Support

All interactive elements use specific `data-testid` attributes for test automation support (as required).  
Examples:
- `autocomplete-input`
- `filter-video-consult`, `filter-specialty-Dentist`, etc.
- `doctor-card`, `doctor-name`, etc.

---

## 📦 API Used

Data fetched from:
