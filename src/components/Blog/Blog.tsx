"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useAllBlogsQuery } from "@/components/redux/features/blogs/blogsApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import parse from "html-react-parser";
import { Clock } from "lucide-react";

const BlogsPage = () => {
  const { theme } = useTheme();
  const pathname = usePathname();

  const ref = useRef(null);

  const { data: blogsData, isLoading } = useAllBlogsQuery([]);

  const [isMounted, setIsMounted] = useState(false);

  // Fix for initial mount animations
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Reset animations on route change

  return (
    <div
      className={`min-h-screen overflow-hidden pt-36 transition-colors duration-300 ${
        theme === "dark" ? "bg-[#0F0F15]" : "bg-[#F9F9FB]"
      }`}
    >
      {/* Blog Banner */}
      <motion.div
        key={`banner-${pathname}`}
        initial={{ opacity: 0, y: 50 }}
        animate={isMounted ? { opacity: 1, y: 0 } : {}}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="flex flex-col gap-2 items-center text-center mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold">My Blogs</h2>
        <div className="w-16 h-1 bg-[#6c2bd9]/50 rounded-full mt-4" />
      </motion.div>

      {/* Blog Posts Grid */}
      <section className="container mx-auto px-4 py-5 pb-16">
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {isLoading
            ? Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={`skeleton-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`rounded-2xl p-6 ${
                    theme === "dark" ? "bg-[#1A1A24]" : "bg-white"
                  } shadow-lg`}
                >
                  <div className="relative overflow-hidden rounded-xl mb-6  h-80">
                    <div
                      className={`w-full h-full ${
                        theme === "dark" ? "bg-[#2D2D3A]" : "bg-gray-100"
                      } animate-pulse`}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <div
                      className={`h-6 w-1/3 rounded-full ${
                        theme === "dark" ? "bg-[#2D2D3A]" : "bg-gray-100"
                      }`}
                    />
                    <div
                      className={`h-5 w-full rounded ${
                        theme === "dark" ? "bg-[#2D2D3A]" : "bg-gray-100"
                      }`}
                    />
                    <div
                      className={`h-4 w-2/3 rounded ${
                        theme === "dark" ? "bg-[#2D2D3A]" : "bg-gray-100"
                      }`}
                    />
                    <div className="flex justify-between mt-4">
                      <div
                        className={`h-4 w-1/4 rounded ${
                          theme === "dark" ? "bg-[#2D2D3A]" : "bg-gray-100"
                        }`}
                      />
                      <div
                        className={`h-4 w-1/4 rounded ${
                          theme === "dark" ? "bg-[#2D2D3A]" : "bg-gray-100"
                        }`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))
            : blogsData?.data
                ?.slice()
                ?.reverse()
                ?.map((blog: any, index: number) => (
                  <motion.div
                    key={`${blog.id}-${pathname}`}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className={`group  flex flex-col justify-between relative overflow-hidden rounded-3xl p-5 md:p-6 border border-[#e5e7eb] dark:border-[#232336] bg-gradient-to-br from-[#f3f4f6] via-[#fff] to-[#e9d5ff] dark:from-[#181825] dark:via-[#232336] dark:to-[#6c2bd9]/10 shadow-2xl hover:shadow-3xl transition-all duration-300`}
                    style={{ boxShadow: "0 8px 32px 0 rgba(108,43,217,0.12)" }}
                  >
                    {/* Blog Content */}
                    <div className="relative overflow-hidden rounded-2xl mb-6 h-56 border border-[#e5e7eb] dark:border-[#232336] shadow-lg">
                      <Image
                        src={blog?.blogImage}
                        alt={blog?.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-300"
                        style={{ borderRadius: "1rem" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#6c2bd9]/30 via-transparent to-transparent" />
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`px-4 capitalize py-1 rounded-full text-sm font-semibold tracking-wide shadow bg-[#6c2bd9]/10 text-[#6c2bd9] dark:bg-[#6c2bd9]/20 dark:text-[#B18AFF]`}
                      >
                        {blog?.category}
                      </span>
                    </div>

                    <h3
                      className={`text-2xl font-bold mb-2 leading-tight ${
                        theme === "dark" ? "text-white" : "text-[#1A1A24]"
                      }`}
                    >
                      {blog?.title}
                    </h3>

                    <div
                      className={`flex items-center justify-start gap-x-1 text-sm  ${
                        theme === "dark" ? "text-[#A0A0B0]" : "text-[#6A6A7A]"
                      }`}
                    >
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="font-medium">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      {/* <span className="font-semibold text-sm text-[#6c2bd9] dark:text-[#B18AFF]">{blog.author}</span> */}
                    </div>

                    {/* <p
                      className={`mb-6 prose text-base 2xl:text-lg ${
                        theme === "dark" ? "text-[#A0A0B0]" : "text-[#6A6A7A]"
                      }`}
                    >
                      {parse(
                        blog?.description?.length > 150
                          ? blog?.description?.slice(0, 150) + '...'
                          : blog?.description
                      )}
                    </p> */}
                    <div
                      className="prose max-w-none leading-7 text-[#232336] dark:prose-invert dark:text-[#E0E0E0] mb-3 flex-1 flex items-center"
                      style={{
                        minHeight: "120px",
                        maxHeight: "140px",
                        overflowY: "auto",
                      }}
                    >
                      <div className="text-gray-700 2xl:text-lg text-base dark:text-gray-300 w-full">
                        {parse(
                          blog?.description?.length > 150
                            ? blog?.description?.slice(0, 150) + "...."
                            : blog?.description || "No description available"
                        )}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Link
                        href={`/blogs/${blog?._id}`}
                        className={`inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold bg-[#6c2bd9] text-white shadow hover:bg-[#8857dc] transition-colors duration-200 w-auto`}
                        style={{
                          boxShadow: "0 2px 8px 0 rgba(108,43,217,0.10)",
                        }}
                      >
                        Read More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 transition-transform group-hover:translate-x-1"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
                        </svg>
                      </Link>
                    </div>
                  </motion.div>
                ))}
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
