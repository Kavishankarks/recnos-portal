"use client";

import { useState } from "react";
import { FaWhatsapp, FaTimes } from "react-icons/fa";

export default function WhatsAppFloat() {
    const [isOpen, setIsOpen] = useState(false);
    const [projectType, setProjectType] = useState("Web App");
    const [requirements, setRequirements] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const phoneNumber = "919876543210"; // Placeholder number
        const message = `Hi, I'm interested in a ${projectType} project.\n\nRequirements:\n${requirements}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, "_blank");
        setIsOpen(false);
    };

    return (
        <>
            {/* Mobile Backdrop Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className="fixed bottom-6 right-6 z-[10000] flex flex-col items-end font-sans">
                {isOpen && (
                    <>
                        {/* Desktop Popup */}
                        <div className="mb-4 hidden w-[350px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl transition-all animate-in fade-in slide-in-from-bottom-4 dark:border-white/10 dark:bg-[#0a0a0a] md:block">
                            {/* Header */}
                            <div className="relative bg-gradient-to-r from-[#4ade80] to-[#22c55e] p-6 text-white">
                                <h3 className="mb-1 text-xl font-bold">Chat with us</h3>
                                <p className="text-sm opacity-90">
                                    To help us serve you better, please let us know what you&apos;re looking for.
                                </p>
                                {/* Decorative Circle/Icon placeholder */}
                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white opacity-10"></div>
                                <div className="absolute bottom-4 right-4 text-4xl opacity-20">
                                    <FaWhatsapp />
                                </div>
                            </div>

                            {/* Form */}
                            <div className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative">
                                        <select
                                            value={projectType}
                                            onChange={(e) => setProjectType(e.target.value)}
                                            className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] cursor-pointer dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:focus:border-[#22c55e]"
                                        >
                                            <option value="Software">Software</option>
                                            <option value="Web App">Web App</option>
                                            <option value="Mobile Android/iOS App">Mobile App</option>
                                            <option value="Website">Website</option>
                                            <option value="AI/ML Solution">AI/ML Solution</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                        </div>
                                    </div>

                                    <textarea
                                        value={requirements}
                                        onChange={(e) => setRequirements(e.target.value)}
                                        placeholder="Tell us about your requirements..."
                                        required
                                        className="h-32 w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-[#22c55e]"
                                    />

                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#22c55e] py-3 font-semibold text-white shadow-lg transition-all hover:bg-[#16a34a] active:scale-[0.98]"
                                    >
                                        <FaWhatsapp className="text-xl" />
                                        Start Chat
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Mobile Bottom Sheet */}
                        <div className="fixed bottom-0 left-0 right-0 z-[9999] max-h-[70vh] overflow-hidden rounded-t-3xl border-t border-gray-200 bg-white shadow-2xl transition-all animate-in slide-in-from-bottom dark:border-white/10 dark:bg-[#0a0a0a] md:hidden">
                            {/* Header */}
                            <div className="relative bg-gradient-to-r from-[#4ade80] to-[#22c55e] p-6 pb-8 text-white">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-xl font-bold">Chat with us</h3>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
                                        aria-label="Close"
                                    >
                                        <FaTimes className="text-sm" />
                                    </button>
                                </div>
                                <p className="text-sm opacity-90">
                                    To help us serve you better, please let us know what you&apos;re looking for.
                                </p>
                                {/* Decorative Circle */}
                                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white opacity-10"></div>
                                <div className="absolute bottom-4 right-4 text-4xl opacity-20">
                                    <FaWhatsapp />
                                </div>
                            </div>

                            {/* Form */}
                            <div className="max-h-[calc(70vh-140px)] overflow-y-auto p-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative">
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Project Type
                                        </label>
                                        <select
                                            value={projectType}
                                            onChange={(e) => setProjectType(e.target.value)}
                                            className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] cursor-pointer dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:focus:border-[#22c55e]"
                                        >
                                            <option value="Software">Software</option>
                                            <option value="Web App">Web App</option>
                                            <option value="Mobile Android/iOS App">Mobile App</option>
                                            <option value="Website">Website</option>
                                            <option value="AI/ML Solution">AI/ML Solution</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <div className="pointer-events-none absolute right-4 top-[44px] -translate-y-1/2 text-gray-400 dark:text-gray-500">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Your Requirements
                                        </label>
                                        <textarea
                                            value={requirements}
                                            onChange={(e) => setRequirements(e.target.value)}
                                            placeholder="Tell us about your requirements..."
                                            required
                                            className="h-32 w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#22c55e] focus:ring-1 focus:ring-[#22c55e] dark:border-white/10 dark:bg-white/5 dark:text-gray-200 dark:placeholder:text-gray-500 dark:focus:border-[#22c55e]"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#22c55e] py-4 font-semibold text-white shadow-lg transition-all hover:bg-[#16a34a] active:scale-[0.98]"
                                    >
                                        <FaWhatsapp className="text-xl" />
                                        Start Chat on WhatsApp
                                    </button>
                                </form>
                            </div>
                        </div>
                    </>
                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-[#22c55e] text-white shadow-[0_4px_12px_rgba(34,197,94,0.4)] transition-all hover:scale-110 hover:shadow-[0_6px_16px_rgba(34,197,94,0.5)]"
                    aria-label="Chat on WhatsApp"
                >
                    {/* Pulse effect - Fixed flickering */}
                    <span className="pointer-events-none absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-75"></span>

                    <div className="relative z-10">
                        {isOpen ? (
                            <FaTimes className="text-xl" />
                        ) : (
                            <FaWhatsapp className="text-3xl" />
                        )}
                    </div>
                </button>
            </div>
        </>
    );
}
