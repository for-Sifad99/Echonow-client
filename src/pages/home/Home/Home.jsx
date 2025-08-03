import React, { useEffect, useState } from "react";
import PageHelmet from '../../shared/PageTitle/PageHelmet';
import BannerSlider from "../BannerSlider/BannerSlider";
import QuickCelebrity from "../QuickCelebrity/QuickCelebrity";
import Fashion from "../Fashion/Fashion";
import AllPublishers from "../AllPublishers/AllPublishers";
import PlanSection from "../PlanSection/PlanSection";
import UserSummaryCards  from '../UserSummaryCards/UserSummaryCards';
import SubscribeModal from "../SubscribeModal/SubscribeModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <Fashion />
      <AllPublishers />
      <PlanSection />
      <UserSummaryCards />

      {/* Subscribe Modal */}
      <SubscribeModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Home;
