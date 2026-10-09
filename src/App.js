import React, { Suspense, useState } from "react";

// Dynamically import the App component from the mfs2 remote
const RemoteApp = React.lazy(() => import("app2/App"));

const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div style={{
            margin: "0",
            padding: "20px",
            fontFamily: "Inter, sans-serif",
            minHeight: "100vh",
            backgroundColor: "#f4f7f6"
        }}>
            <div style={{ 
                maxWidth: "800px", 
                margin: "40px auto", 
                backgroundColor: "white", 
                padding: "30px", 
                borderRadius: "12px", 
                boxShadow: "0 4px 15px rgba(0,0,0,0.05)" 
            }}>
                <h1 style={{ color: "#2c3e50", marginTop: 0 }}>Host Application (mfs1)</h1>
                <p style={{ color: "#555", lineHeight: 1.6, fontSize: "1.1rem" }}>
                    This is the main host application. It controls the overall layout and state. 
                    Click the button below to open the Cart Sidebar which is dynamically loaded from the remote application (mfs2).
                </p>
                
                <button 
                    onClick={() => setIsSidebarOpen(true)}
                    style={{
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        padding: "14px 28px",
                        fontSize: "1.1rem",
                        borderRadius: "8px",
                        cursor: "pointer",
                        marginTop: "20px",
                        fontWeight: "600",
                        boxShadow: "0 4px 6px rgba(0,123,255,0.2)",
                        transition: "all 0.2s ease"
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.background = "#0056b3";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,123,255,0.3)";
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.background = "#007bff";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0,123,255,0.2)";
                    }}
                    onMouseDown={(e) => {
                        e.currentTarget.style.transform = "translateY(0) scale(0.98)";
                    }}
                    onMouseUp={(e) => {
                        e.currentTarget.style.transform = "translateY(-2px) scale(1)";
                    }}
                >
                    Open Cart Sidebar
                </button>

                <div>
                    {/* The RemoteApp is always rendered but handles its own visibility based on isOpen */}
                    <Suspense fallback={<div style={{marginTop: '20px', color: '#666'}}>Loading Remote App from mfs2...</div>}>
                        <RemoteApp isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}

export default App;