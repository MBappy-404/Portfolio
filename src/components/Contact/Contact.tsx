"use client";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAddMessageMutation } from "../redux/features/contact/contactApi";
import { Orbitron } from "next/font/google";

// 1. Configure Orbitron font
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

type FormValues = {
  name: string;
  email: string;
  message: string;
  subject: string;
};

const ContactPage = () => {
  const { theme } = useTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [addMessage] = useAddMessageMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // API Call preserved
      await addMessage(data).unwrap();

      reset();
      setSubmitSuccess(true);
      toast.success("Message transmitted successfully!", {
        description: "I will process your data within 24 hours.",
      });

      // Hide success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      setSubmitError("Transmission failed.");
      toast.error("Message failed to send", {
        description: "Signal lost. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Theme Constants for easier reading
  const isDark = theme === "dark";
  const bgColors = isDark ? "bg-[#0B0B14]" : "bg-gray-50";
  const cardBg = isDark ? "bg-[#151520]/80" : "bg-white/90";
  const borderColor = isDark ? "border-[#2D2D40]" : "border-gray-200";
  const inputBg = isDark ? "bg-[#1E1E2A]" : "bg-gray-100";
  const textColor = isDark ? "text-gray-100" : "text-gray-800";
  const labelColor = isDark ? "text-gray-400" : "text-gray-500";
  const accentColor = "text-purple-500";
  const shadowGlow = isDark
    ? "shadow-[0_0_30px_rgba(147,51,234,0.15)]"
    : "shadow-xl";

  return (
    <div
      className={`min-h-screen pt-32 pb-20 transition-colors duration-300 ${bgColors} ${orbitron.variable} font-sans overflow-hidden`}
    >
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className={`absolute top-0 -left-20 w-96 h-96 rounded-full blur-[100px] ${isDark ? "bg-purple-900/20" : "bg-purple-200/40"}`}
        />
        <div
          className={`absolute bottom-0 -right-20 w-96 h-96 rounded-full blur-[100px] ${isDark ? "bg-blue-900/20" : "bg-blue-200/40"}`}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2
            className={`text-4xl md:text-6xl font-black mb-4 tracking-wider uppercase ${orbitron.className} ${textColor}`}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Contact
            </span>{" "}
            Protocol
          </h2>
          <p className={`text-lg ${labelColor} font-light tracking-wide`}>
            Initialize communication. Drop a message below.
          </p>
        </motion.div>

        {/* Form Container */}
        <motion.form
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className={`max-w-3xl mx-auto p-8 md:p-10 rounded-2xl border backdrop-blur-md ${borderColor} ${cardBg} ${shadowGlow}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Name */}
            <div className="space-y-2 group">
              <label
                htmlFor="name"
                className={`text-xs font-bold uppercase tracking-widest ${orbitron.className} ${labelColor} group-focus-within:${accentColor} transition-colors`}
              >
                // User Identity
              </label>
              <input
                id="name"
                {...register("name", { required: "Identity required" })}
                className={`w-full px-5 py-3 rounded-lg border ${borderColor} ${inputBg} ${textColor} focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all`}
                placeholder="ENTER NAME"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  :: {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2 group">
              <label
                htmlFor="email"
                className={`text-xs font-bold uppercase tracking-widest ${orbitron.className} ${labelColor} group-focus-within:${accentColor} transition-colors`}
              >
                // Communication Link
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid format",
                  },
                })}
                className={`w-full px-5 py-3 rounded-lg border ${borderColor} ${inputBg} ${textColor} focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all`}
                placeholder="NAME@EXAMPLE.COM"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  :: {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Subject */}
          <div className="space-y-2 mb-6 group">
            <label
              htmlFor="subject"
              className={`text-xs font-bold uppercase tracking-widest ${orbitron.className} ${labelColor} group-focus-within:${accentColor} transition-colors`}
            >
              // Directive Subject
            </label>
            <input
              id="subject"
              type="text"
              {...register("subject", { required: "Subject required" })}
              className={`w-full px-5 py-3 rounded-lg border ${borderColor} ${inputBg} ${textColor} focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all`}
              placeholder="PROJECT INQUIRY"
            />
            {errors.subject && (
              <p className="text-xs text-red-500 mt-1">
                :: {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2 mb-8 group">
            <label
              htmlFor="message"
              className={`text-xs font-bold uppercase tracking-widest ${orbitron.className} ${labelColor} group-focus-within:${accentColor} transition-colors`}
            >
              // Data Packet Content
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message", {
                required: "Content required",
                minLength: {
                  value: 20,
                  message: "Packet too small (min 20 chars)",
                },
              })}
              className={`w-full px-5 py-3 rounded-lg border ${borderColor} ${inputBg} ${textColor} focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none`}
              placeholder="TYPE YOUR MESSAGE..."
            ></textarea>
            {errors.message && (
              <p className="text-xs text-red-500 mt-1">
                :: {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="relative">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest ${orbitron.className} text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                "INITIATE TRANSMISSION"
              )}
            </button>

            {/* Inline Status Messages */}
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded text-center"
              >
                <p
                  className={`text-green-500 text-xs font-bold ${orbitron.className}`}
                >
                  ✓ DATA RECEIVED SUCCESSFULLY
                </p>
              </motion.div>
            )}

            {submitError && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-center"
              >
                <p
                  className={`text-red-500 text-xs font-bold ${orbitron.className}`}
                >
                  ⚠ CONNECTION ERROR
                </p>
              </motion.div>
            )}
          </div>
        </motion.form>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 flex justify-center gap-8"
        >
          <SocialLink
            href="https://github.com"
            icon={<GithubIcon />}
            label="GITHUB"
            isDark={isDark}
          />
          <SocialLink
            href="https://linkedin.com"
            icon={<LinkedInIcon />}
            label="LINKEDIN"
            isDark={isDark}
          />
        </motion.div>
      </div>
    </div>
  );
};

// Helper Components
const SocialLink = ({
  href,
  icon,
  label,
  isDark,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isDark: boolean;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`group flex flex-col items-center gap-2 ${isDark ? "text-gray-500 hover:text-white" : "text-gray-400 hover:text-black"} transition-colors`}
  >
    <div
      className={`p-4 rounded-xl transition-transform group-hover:scale-110 ${isDark ? "bg-[#1E1E2A]" : "bg-white shadow-sm"}`}
    >
      {icon}
    </div>
    <span
      className={`text-[10px] font-bold tracking-widest ${orbitron.className} opacity-0 group-hover:opacity-100 transition-opacity`}
    >
      {label}
    </span>
  </a>
);

// Icons
const GithubIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.07.63-1.32-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export default ContactPage;
