import React from 'react';
import BannerSlider from '../BannerSlider/BannerSlider';
import QuickCelebrity from '../QuickCelebrity/QuickCelebrity';
import Fashion from '../Fashion/Fashion';
import AllPublishers from '../AllPublishers/AllPublishers';

const Home = () => {
  return (
    <section>
      <BannerSlider />
      <QuickCelebrity />
      <Fashion />
      <AllPublishers />
    </section>
  );
};

export default Home;