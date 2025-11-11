import React, { useEffect, useState } from "react";
import PageHelmet from '../../shared/PageTitle/PageHelmet';
import SubscribeModal from "../SubModal/SubModal";
import BannerSlider from "../BannerSlider/BannerSlider";
import QuickCelebrity from "../Celebrity/Celebrity";
import Sponsored from "../Sponsored/Sponsored";
import Fashion from "../Fashion/Fashion";
import AllPublishers from "../AllPublishers/AllPublishers";
import PlanSection from "../Plans/Plans";
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Setup modal in useEffect
  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenSubscribeModal");

    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
        localStorage.setItem("hasSeenSubscribeModal", "true");
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
    {/* Page Title */}
      <PageHelmet
        title="Best Articles For You"
        description="EchoNow – Your trusted digital hub for breaking news, trending topics, and real stories from around the world."
      />

    {/* Content */}
      <BannerSlider />
      <QuickCelebrity />
      <Sponsored />
      <Fashion />
      <AllPublishers />
      <PlanSection />
      <Testimonial />

      {/* Subscribe Modal */}
      <SubscribeModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Home;