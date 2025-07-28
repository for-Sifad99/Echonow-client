import React from 'react';
import BannerSlider from '../BannerSlider/BannerSlider';
import QuickCelebrity from '../QuickCelebrity/QuickCelebrity';
import Fashion from '../Fashion/Fashion';

const Home = () => {
  return (
    <section>
      <BannerSlider />
      <QuickCelebrity />
      <Fashion />
    </section>
  );
};

export default Home;