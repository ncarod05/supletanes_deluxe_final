import React from 'react';
import CarouselBanner from './CarouselBanner';
import TopProducts from './TopProducts';
import TrustedBrands from './TrustedBrands';

function HomePage() {
  return (
    <>
      <CarouselBanner />
      <main>
        <TopProducts />
        <TrustedBrands />
      </main>
    </>
  );
}

export default HomePage;