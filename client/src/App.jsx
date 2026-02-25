import GetInTouch from "./sections/get-in-touch";
import OurTestimonials from "./sections/our-testimonials";
import SubscribeNewsletter from "./sections/subscribe-newsletter";
import TrustedCompanies from "./sections/trusted-companies";
import Footer from "./components/footer";
import LenisScroll from "./components/lenis-scroll";
import Navbar from "./components/navbar";
import AboutOurApps from "./sections/about-our-apps";
import HeroSection from "./sections/hero-section";
import OurLatestCreation from "./sections/our-latest-creation";
import { Routes, Route } from "react-router-dom";
import Generate from "./pages/Generate";
import MyGeneration from "./pages/MyGeneration";
import YtPreview from "./pages/YtPreview";
import Login from "./components/login";
import Signup from "./components/signup";
import BackgroundEffect from "./components/background";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

export default function Page() {
  return (
    <AuthProvider>
      <>
        <Toaster position="top-right" />
        <LenisScroll />
        <Routes>
          {/* Pages with Navbar */}
          <Route
            path="/"
            element={
              <BackgroundEffect>
                <Navbar />
                <main className="px-6 md:px-16 lg:px-24 xl:px-32">
                  <HeroSection />
                  <OurLatestCreation />
                  <AboutOurApps />
                  {/* <OurTestimonials />
                  <TrustedCompanies />
                  <GetInTouch />
                  <SubscribeNewsletter /> */}
                  <Footer />
                </main>
              </BackgroundEffect>
            }
          />
          <Route
            path="/generate"
            element={
              <>
                <BackgroundEffect>
                  <Navbar />
                </BackgroundEffect>
                <ProtectedRoute>
                  <Generate />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/generate/:id"
            element={
              <>
                <BackgroundEffect>
                  <Navbar />
                </BackgroundEffect>
                <ProtectedRoute>
                  <Generate />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/my-generations"
            element={
              <>
                <BackgroundEffect>
                  <Navbar />
                </BackgroundEffect>
                <ProtectedRoute>
                  <MyGeneration />
                </ProtectedRoute>
              </>
            }
          />
          <Route
            path="/preview"
            element={
              <>
                <BackgroundEffect>
                  <Navbar />
                </BackgroundEffect>
                <ProtectedRoute>
                  <YtPreview />
                </ProtectedRoute>
              </>
            }
          />

          {/* Auth Pages - No Navbar */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </>
    </AuthProvider>
  );
}
