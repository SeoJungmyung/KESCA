import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import TopBar from '../components/common/TopBar';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Loading from '../components/common/Loading';

const { Content } = Layout;

const HomePage = lazy(() => import('../pages/Home/HomePage'));
const AboutPage = lazy(() => import('../pages/About/AboutPage'));
const StandardsPage = lazy(() => import('../pages/Standards/StandardsPage'));
const FindAProPage = lazy(() => import('../pages/FindAPro/FindAProPage'));
const CertificationPage = lazy(() => import('../pages/Certification/CertificationPage'));
const EducationPage = lazy(() => import('../pages/Education/EducationPage'));
const EventsPage = lazy(() => import('../pages/Events/EventsPage'));
const GalleryPage = lazy(() => import('../pages/Gallery/GalleryPage'));
const InquiryPage = lazy(() => import('../pages/Inquiry/InquiryPage'));
const ContactPage = lazy(() => import('../pages/Contact/ContactPage'));
const VerifyPage = lazy(() => import('../pages/Verify/VerifyPage'));
const AdminLoginPage = lazy(() => import('../pages/Admin/AdminLoginPage'));
const AdminPage = lazy(() => import('../pages/Admin/AdminPage'));

function PublicLayout({ children }) {
  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <TopBar />
      <Header />
      <Content>{children}</Content>
      <Footer />
    </Layout>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Admin routes — no public layout */}
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminPage />} />

        {/* Public routes */}
        <Route
          path="/*"
          element={
            <PublicLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/standards" element={<StandardsPage />} />
                <Route path="/find-a-pro" element={<FindAProPage />} />
                <Route path="/certification" element={<CertificationPage />} />
                <Route path="/education" element={<EducationPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/inquiry" element={<InquiryPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/verify" element={<VerifyPage />} />
              </Routes>
            </PublicLayout>
          }
        />
      </Routes>
    </Suspense>
  );
}
