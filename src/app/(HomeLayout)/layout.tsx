import CustomCursor from "@/components/custom-cursor";
import ParticleBackground from "@/components/particle-background";
import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
     
      <main className="min-h-screen">
        <Navbar />
        {children}
        <Footer/>
        </main>
    </div>
  );
};

export default layout;
