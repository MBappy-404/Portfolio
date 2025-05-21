"use client";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAddMessageMutation } from "../redux/features/contact/contactApi";

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
    console.log(data);

    setIsSubmitting(true);

    try {
      // Simulate API call
      await addMessage(data);

      reset();
      toast.success("Message sent successfully!", {
        description: "I'll get back to you within 24 hours",
      });
    } catch (error) {
      toast.error("Message failed to send", {
        description: "Please try again or contact me directly via email",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen pt-36 transition-colors focus:outline-none duration-300`}>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
          <p
            className={`text-lg ${
              theme === "dark" ? "text-[#A0A0B0]" : "text-[#6A6A7A]"
            }`}
          >
            Have a question or want to work together? Drop me a message!
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-[#E0E0E0]" : "text-[#1A1A24]"
                }`}
              >
                Name
              </label>
              <input
                id="name"
                {...register("name", { required: "Name is required" })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === "dark"
                    ? "bg-[#1A1A24] border-[#2D2D3A] focus:border-[#6c2bd9]"
                    : "bg-white border-gray-200 focus:border-[#6c2bd9]"
                } transition-colors focus:outline-none`}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className={`block text-sm font-medium ${
                  theme === "dark" ? "text-[#E0E0E0]" : "text-[#1A1A24]"
                }`}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  theme === "dark"
                    ? "bg-[#1A1A24] border-[#2D2D3A] focus:border-[#6c2bd9]"
                    : "bg-white border-gray-200 focus:border-[#6c2bd9]"
                } transition-colors focus:outline-none`}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="space-y-2 mt-5">
            <label
              htmlFor="subject"
              className={`block text-sm font-medium ${
                theme === "dark" ? "text-[#E0E0E0]" : "text-[#1A1A24]"
              }`}
            >
              Subject
            </label>
            <input
              id="subject"
              type="text"
              {...register("subject", {
                required: "Subject is required",
              })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === "dark"
                  ? "bg-[#1A1A24] border-[#2D2D3A] focus:border-[#6c2bd9]"
                  : "bg-white border-gray-200 focus:border-[#6c2bd9]"
              } transition-colors focus:outline-none`}
            />
            {errors.subject && (
              <p className="text-sm text-red-500">{errors.subject.message}</p>
            )}
          </div>

          {/* Message Input */}
          <div className="mt-6 space-y-2">
            <label
              htmlFor="message"
              className={`block text-sm font-medium ${
                theme === "dark" ? "text-[#E0E0E0]" : "text-[#1A1A24]"
              }`}
            >
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 20,
                  message: "Message must be at least 20 characters",
                },
              })}
              className={`w-full px-4 py-3 rounded-lg border ${
                theme === "dark"
                  ? "bg-[#1A1A24] border-[#2D2D3A] focus:border-[#6c2bd9]"
                  : "bg-white border-gray-200 focus:border-[#6c2bd9]"
              } transition-colors focus:outline-none`}
            ></textarea>
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors focus:outline-none flex items-center justify-center gap-2 ${
                theme === "dark"
                  ? "bg-[#6c2bd9] hover:bg-[#5a24b8] text-white"
                  : "bg-[#6c2bd9] hover:bg-[#5a24b8] text-white"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>

            {/* Status Messages */}
            {submitSuccess && (
              <p className="mt-4 text-center text-green-500">
                Message sent successfully!
              </p>
            )}
            {submitError && (
              <p className="mt-4 text-center text-red-500">{submitError}</p>
            )}
          </div>
        </motion.form>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3
            className={`text-lg font-medium ${
              theme === "dark" ? "text-[#E0E0E0]" : "text-[#1A1A24]"
            }`}
          >
            Or connect with me on
          </h3>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors focus:outline-none ${
                theme === "dark"
                  ? "text-[#A0A0B0] hover:text-[#B18AFF]"
                  : "text-[#6A6A7A] hover:text-[#6c2bd9]"
              }`}
            >
              <GithubIcon className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-full transition-colors focus:outline-none ${
                theme === "dark"
                  ? "text-[#A0A0B0] hover:text-[#B18AFF]"
                  : "text-[#6A6A7A] hover:text-[#6c2bd9]"
              }`}
            >
              <LinkedInIcon className="h-6 w-6" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// SVG Icons
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.07.63-1.32-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export default ContactPage;
