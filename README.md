Booking StudyRoom Website

Overview

Booking StudyRoom is a web application designed to streamline the process of booking study rooms. It allows users to check room availability, view booking history, and report issues. The project was developed by a team of 7, with contributions in front-end development, UI/UX design, and API integration.

Tech Stack





Front-end: React.js, Tailwind CSS, Axios



Back-end: FastAPI (Python)



Database: SQL



Tools: Figma, Postman

Prerequisites

Before running the project, ensure you have the following installed:





Node.js (v16 or higher) for the front-end



Python (v3.8 or higher) for the back-end



pip for Python package management



A SQL database (e.g., PostgreSQL, MySQL) configured for the back-end

Installation and Setup





Clone the repository:

git clone https://github.com/HK242-BTL-CNPM.git](https://github.com/HK242-BTL-CNPM/Booking_StudyRoom_Web)
cd HK242-BTL-CNPM



Back-end Setup:

cd BE_CNPM
pip install -r requirements.txt
uvicorn app.main:app --reload





This starts the FastAPI server at http://localhost:8000 with auto-reload enabled.



Ensure the SQL database is configured in app/main.py or a .env file.



Front-end Setup:

cd FE
npm install
npm run dev





This starts the React development server, typically at http://localhost:5173.

Project Structure





BE_CNPM/: Contains the FastAPI back-end code.





app/main.py: Main application file for FastAPI.



FE/: Contains the React front-end code.





src/: Source files for React components, styles, and API integration.

Usage





Access the front-end at http://localhost:5173 to interact with the application.



Use Postman to test API endpoints at http://localhost:8000 (refer to API documentation in the back-end folder, if available).



Features include:





Booking study rooms



Checking room availability



Viewing booking history



Reporting issues

Contributions





UI/UX Design: Designed mockups and prototypes using Figma.



Front-end Development: Built admin pages with React.js and Tailwind CSS.



API Integration: Tested RESTful APIs with Postman and integrated them using Axios.



Team Size: 7 members.

