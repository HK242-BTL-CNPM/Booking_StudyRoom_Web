# Booking StudyRoom Website

A web application designed to streamline the process of booking study rooms. Users can check room availability, view booking history, and report issues easily.

---

## Tech Stack

- **Front-end:** React.js, Tailwind CSS, Axios  
- **Back-end:** FastAPI (Python)  
- **Database:** SQL (e.g., PostgreSQL, MySQL)  
- **Tools:** Figma, Postman  

---

## Prerequisites

Before running the project, ensure the following are installed:

- [Node.js](https://nodejs.org/) (v16 or higher) for the front-end  
- [Python](https://www.python.org/) (v3.8 or higher) for the back-end  
- `pip` for Python package management  
- A SQL database (PostgreSQL, MySQL, etc.) configured for the back-end  

---

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/HK242-BTL-CNPM/Booking_StudyRoom_Web
cd Booking_StudyRoom_Web
```

### 2. Back-end Setup (FastAPI)

```bash
cd BE_CNPM
pip install -r requirements.txt
uvicorn app.main:app --reload
```

This starts the FastAPI server at [http://localhost:8000](http://localhost:8000) with auto-reload enabled.  
Make sure your SQL database is properly configured in `app/main.py` or via a `.env` file.

### 3. Front-end Setup (React.js)

```bash
cd FE
npm install
npm run dev
```

This starts the React development server, usually at [http://localhost:5173](http://localhost:5173)

---

## Project Structure

```
Booking_StudyRoom_Web/
├── BE_CNPM/               # FastAPI back-end
│   └── app/
│       └── main.py        # Main application file
├── FE/                    # React front-end
│   └── src/               # Components, styles, and API integration
```

---

## Usage

- Visit the front-end at [http://localhost:5173](http://localhost:5173)
- Use [Postman](https://www.postman.com/) to test API endpoints at [http://localhost:8000](http://localhost:8000)
  - (Refer to API documentation inside the `BE_CNPM` folder, if available.)

### Key Features

- Book study rooms
- Check room availability
- View booking history
- Report issues

---

## Contributions

- **UI/UX Design:** Created mockups and prototypes using Figma  
- **Front-end Development:** Built admin pages with React.js and Tailwind CSS  
- **API Integration:** Tested and connected RESTful APIs using Postman and Axios  

**Team Size:** 7 members


