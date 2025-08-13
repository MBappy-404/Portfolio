"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useAllBlogsQuery } from "@/components/redux/features/blogs/blogsApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import parse from 'html-react-parser';

const BlogsPage = () => {
  const { theme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 3]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.02]);

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
          {isLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
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
          ) : (
            blogsData?.data?.map((blog: any, index: number) => (
              <motion.div
                key={`${blog.id}-${pathname}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`group rounded-2xl p-6 ${
                  theme === "dark"
                    ? "bg-[#1A1A24] hover:bg-[#24242F]"
                    : "bg-white hover:bg-gray-50"
                } shadow-lg hover:shadow-xl transition-all`}
              >
                {/* Blog Content */}
                <div className="relative overflow-hidden rounded-xl mb-6 h-48">
                  <Image
                    src={blog?.blogImage}
                    alt={blog?.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40" />
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      theme === "dark"
                        ? "bg-[#6c2bd9]/20 text-[#B18AFF]"
                        : "bg-[#6c2bd9]/10 text-[#6c2bd9]"
                    }`}
                  >
                    {blog?.category}
                  </span>
                </div>

                <h3
                  className={`text-xl font-semibold mb-2 ${
                    theme === "dark" ? "text-white" : "text-[#1A1A24]"
                  }`}
                >
                  {blog?.title}
                </h3>

                <div
                  className={`flex items-center justify-between text-sm mb-4 ${
                    theme === "dark" ? "text-[#A0A0B0]" : "text-[#6A6A7A]"
                  }`}
                >
                  <span>{blog.createdAt?.split("T")[0]}</span>
                </div>

                <p
                  className={`mb-6 text-base 2xl:text-lg ${
                    theme === "dark" ? "text-[#A0A0B0]" : "text-[#6A6A7A]"
                  }`}
                >
                  {parse(blog?.description?.slice(0, 150))}...
                </p>

                <Link
                  href={`/blogs/${blog?._id}`}
                  className={`flex items-center gap-2 ${
                    theme === "dark" ? "text-[#B18AFF]" : "text-[#6c2bd9]"
                  }`}
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
              </motion.div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;