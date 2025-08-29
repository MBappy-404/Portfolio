
import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import { ReactLenis, useLenis } from 'lenis/react'
const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div>
     <ReactLenis  root> 
      <main className="min-h-screen">
        <Navbar />
        {children}
        <Footer/>
        </main>
      </ReactLenis>
    </div>
  );
};

export default layout;
