import React, { useEffect, useState } from "react";
import BannerSlider from "../BannerSlider/BannerSlider";
import QuickCelebrity from "../QuickCelebrity/QuickCelebrity";
import Fashion from "../Fashion/Fashion";
import AllPublishers from "../AllPublishers/AllPublishers";
import PlanSection from "../PlanSection/PlanSection";
import UserSummaryCards  from '../UserSummaryCards/UserSummaryCards';
import SubscribeModal from "../../shared/SubscribeModal/SubscribeModal";

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
    <section>
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
    </section>
  );
};

export default Home;
