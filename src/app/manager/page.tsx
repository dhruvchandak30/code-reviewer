"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function ManagerDashboard() {
  const router = useRouter();
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [submittedBy, setSubmittedBy] = useState<string | null>(null);
  const [decision, setDecision] = useState("");

  useEffect(() => {
    setSubmittedCode(localStorage.getItem("submittedCode"));
    setSubmittedBy(localStorage.getItem("submittedBy"));
  }, []);

  const handleDecision = (type: "approve" | "reject") => {
    setDecision(type);
    if (type === "approve") {
      alert("Approved ✅\nPipeline triggered for CI/CD.\nCode will be deployed soon!");
    } else {
      alert("Rejected ❌\nDeveloper notified to recheck code.");
    }
    localStorage.removeItem("submittedCode");
    localStorage.removeItem("submittedBy");
    router.push("/login");
  };


  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "1.5rem",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h1 style={{ fontSize: "24px", fontWeight: 600, color: "#111827" }}>
          Manager Dashboard
        </h1>

      </div>

      {!submittedCode ? (
        <div style={{ color: "#4b5563", fontSize: "15px" }}>
          No code submissions available.
        </div>
      ) : (
        <div
          style={{
            background: "#fff",
            padding: "1.5rem",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
          }}
        >
          <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "8px" }}>
            Submitted by:{" "}
            <span style={{ fontWeight: 600, color: "#111827" }}>
              {submittedBy}
            </span>
          </p>
          <pre
            style={{
              background: "#f9fafb",
              padding: "10px",
              borderRadius: "6px",
              fontSize: "13px",
              fontFamily: "Consolas, monospace",
              color: "#1f2937",
              marginBottom: "1rem",
              whiteSpace: "pre-wrap",
            }}
          >
            {submittedCode}
          </pre>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => handleDecision("approve")}
              style={{
                backgroundColor: "#16a34a",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#15803d")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#16a34a")}
            >
              Approve
            </button>
            <button
              onClick={() => handleDecision("reject")}
              style={{
                backgroundColor: "#dc2626",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
              }}
              onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#b91c1c")}
              onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#dc2626")}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
