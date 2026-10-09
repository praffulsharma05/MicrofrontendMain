import React, { Suspense, useState } from "react";
import "./App.css";

// Dynamically import the App component from the mfs2 remote
const RemoteApp = React.lazy(() => import("app2/App"));

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [customText, setCustomText] = useState("");

    return (
        <div className="app-container">
            <div className="content-box">
                <h1 className="title">Host Application (mfs1)</h1>
                <p className="description">
                    This is the main host application. It controls the overall layout and state. 
                    Click the button below to open the Cart Sidebar which is dynamically loaded from the remote application (mfs2).
                </p>
                
                <div className="input-group">
                    <input 
                        type="text" 
                        placeholder="Type something here..." 
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        className="custom-input"
                    />
                </div>

                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    className="open-btn"
                >
                    Open Cart Sidebar
                </button>

                <div>
                    {/* The RemoteApp is always rendered but handles its own visibility based on isOpen */}
                    <Suspense fallback={<div className="loading">Loading Remote App from mfs2...</div>}>
                        <RemoteApp isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} customText={customText} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default App;