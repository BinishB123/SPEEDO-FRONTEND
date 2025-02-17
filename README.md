🚀 Speedo Frontend
This is the frontend of the Speedo project, a GPS trip tracking system that allows users to upload and visualize trips on an interactive map.

📌 Features
✅ User authentication & session management
✅ Upload CSV files containing GPS data
✅ Display uploaded trips on a map using Leaflet
✅ Calculate speed based on GPS coordinates and time
✅ Highlight overspeeding areas in cyan
✅ View trip details like distance, duration, stoppages, and idling
✅ Select multiple trips and visualize routes on the map
✅ Data persistence using a backend API

🛠 Tech Stack
React.js – Frontend UI
Tailwind CSS – Styling
Leaflet.js – Map rendering & routing
React Router – Navigation
Context API – State management
Axios – API communication
Vite – Fast build tool
📂 Folder Structure

speedo-frontend/
│── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # Global state management
│   ├── pages/            # Application pages (Home, Upload, Map)
│   ├── hooks/            # Custom React hooks
│   ├── assets/           # Static images/icons
│   ├── App.jsx           # Main app entry
│   ├── main.jsx          # React root render
│── public/               # Static assets
│── .gitignore            # Files to be ignored by Git
│── package.json          # Dependencies & scripts
│── README.md             # Documentation
│── vite.config.js        # Vite configuration
🚀 Getting Started
1️⃣ Clone the Repository
sh
Copy
Edit
git clone https://github.com/BinishB123/SPEEDO-FRONTEND.git
cd SPEEDO-FRONTEND
2️⃣ Install Dependencies
sh
Copy
Edit

