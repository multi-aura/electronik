import React from 'react';
import Layout from '../layouts/Layout';
import Sidebar from '../components/Sidebar/Sidebar'
import BannerCarousel from '../components/BannerCarousel/BannerCarousel';
import FlashSale from '../components/FlashSale/FlashSale';
import BestSellingProducts from '../components/BestSellingProducts/BestSellingProducts';
function Home() {
  const userData = { name: 'Alex Korobov' }; 
  const banners = [
    { src: 'https://file.hstatic.net/200000722513/file/banner_web_slider_800x400_laptop_gaming_wukong_d33e1e6762764ec799820bfcc5814047.jpg', alt: 'Banner 1' },
    { src: 'https://file.hstatic.net/200000722513/file/gearvn_800x400_msi_camp.jpg', alt: 'Banner 2' },
    { src: 'https://file.hstatic.net/200000722513/file/banner_web_slider_800x400_xa_kho.jpg', alt: 'Banner 3' },
  ];
  return (
    <Layout userData={userData}>
      <div className="d-flex">
        <Sidebar />
        <main className="p-0 flex-grow-1">
          <BannerCarousel banners={banners} />
        </main>
      </div>
      <FlashSale />
      <BestSellingProducts />
    </Layout>
  );
}

export default Home;
