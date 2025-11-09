"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();
    const [code, setCode] = useState("");
    const [aiFeedback, setAiFeedback] = useState("");
    const [aiSuggestedCode, setAiSuggestedCode] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGeminiCheck = async () => {
        setLoading(true);
        setAiFeedback("");
        setAiSuggestedCode("");

        const prompt = `
You are a senior software engineer reviewing the following code.
Give a short, clear review covering:
1. Major logic or syntax issues
2. Readability or structure improvements
3. Optimization suggestions

Then provide a clean, corrected version of the code below labeled as:
Updated Code:
(Do not include explanations, markdown, or styling)

Code:
${code}
        `;

        try {
            const res = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                    }),
                }
            );

            const data = await res.json();
            const text =
                data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response received from AI.";

            // Split feedback and updated code if present
            const [feedbackPart, codePart] = text.split("Updated Code:");
            setAiFeedback(feedbackPart?.trim() || "No feedback found.");
            setAiSuggestedCode(codePart?.trim() || "");
        } catch (error) {
            setAiFeedback("Error fetching response. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        localStorage.setItem("submittedCode", code);
        localStorage.setItem("submittedBy", "user");
        alert("Code submitted for manager review.");
        router.push("/login");
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(to bottom right, #f9fafb, #f3f4f6)",
                padding: "2rem",
                fontFamily: "Segoe UI, sans-serif",
            }}
        >
            <div
                style={{
                    maxWidth: "900px",
                    margin: "0 auto",
                    backgroundColor: "white",
                    borderRadius: "16px",
                    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                    padding: "2rem",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1.5rem",
                        borderBottom: "1px solid #e5e7eb",
                        paddingBottom: "0.75rem",
                    }}
                >
                    <div>
                        <h1
                            style={{
                                fontSize: "28px",
                                fontWeight: 700,
                                color: "#1d4ed8",
                                margin: 0,
                            }}
                        >
                            CodeReviewX
                        </h1>
                        <p style={{ color: "#6b7280", fontSize: "13px", marginTop: "4px" }}>
                            User Dashboard – Quality at Every Stage
                        </p>
                    </div>
                </div>

                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Paste or write your code here..."
                    style={{
                        width: "100%",
                        height: "250px",
                        padding: "12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontFamily: "Consolas, monospace",
                        fontSize: "14px",
                        outline: "none",
                        resize: "vertical",
                        marginBottom: "20px",
                    }}
                />

                <div style={{ display: "flex", gap: "10px", marginBottom: "24px" }}>
                    <button
                        onClick={handleGeminiCheck}
                        disabled={loading}
                        style={{
                            backgroundColor: loading ? "#93c5fd" : "#2563eb",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            cursor: loading ? "not-allowed" : "pointer",
                            fontWeight: 500,
                        }}
                    >
                        {loading ? "Analyzing..." : "Run AI Review"}
                    </button>

                    <button
                        onClick={handleSubmit}
                        style={{
                            backgroundColor: "#16a34a",
                            color: "white",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: 500,
                        }}
                    >
                        Submit for Manager
                    </button>
                </div>

                {loading && (
                    <div style={{ textAlign: "center", color: "#2563eb", marginBottom: "16px" }}>
                        <div
                            style={{
                                display: "inline-block",
                                width: "24px",
                                height: "24px",
                                border: "3px solid #93c5fd",
                                borderTop: "3px solid #2563eb",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                            }}
                        />
                        <style>{`
                            @keyframes spin {
                                0% { transform: rotate(0deg); }
                                100% { transform: rotate(360deg); }
                            }
                        `}</style>
                    </div>
                )}

                {aiFeedback && (
                    <div
                        style={{
                            backgroundColor: "#f9fafb",
                            border: "1px solid #e5e7eb",
                            borderRadius: "10px",
                            padding: "16px",
                        }}
                    >
                        <h2
                            style={{
                                fontSize: "18px",
                                fontWeight: 600,
                                color: "#111827",
                                marginBottom: "8px",
                            }}
                        >
                            AI Review Feedback
                        </h2>
                        <pre
                            style={{
                                whiteSpace: "pre-wrap",
                                fontSize: "14px",
                                color: "#374151",
                                marginBottom: "10px",
                            }}
                        >
                            {aiFeedback}
                        </pre>

                     
                    </div>
                )}
            </div>
        </div>
    );
}
