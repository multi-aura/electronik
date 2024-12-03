import React, { useState, useEffect,useContext  } from 'react';
import Layout from '../layouts/Layout';
import Sidebar from '../components/Sidebar/Sidebar'
import BannerCarousel from '../components/BannerCarousel/BannerCarousel';
import FlashSale from '../components/FlashSale/FlashSale';
import BestSellingProducts from '../components/BestSellingProducts/BestSellingProducts';
import CategoryGrid from '../components/CategoryGrid/CategoryGrid';
import { fetchAllCategories } from '../services/categoryService';
import { UserContext } from '../contexts/UserContext';
function Home() {
  const userData = { name: 'Alex Korobov' }; 
  const [categories, setCategories] = useState([]);
  // const { user } = useContext(UserContext);
  // console.log("data1",user);
  useEffect(() => {
      const loadCategories = async () => {
          try {
              const categoryData = await fetchAllCategories();

              // Check if the data property is an array
              if (Array.isArray(categoryData.data)) {
                  setCategories(categoryData.data.map(cat => ({
                      label: cat.category.nameVi,
                      imgSrc: cat.category.image,
                      link: `/category/${cat.category._id}`,
                      subcategories: cat.manufacturers,
                  })));
              } else {
                  console.warn('Expected an array, but got:', categoryData.data);
                  setCategories([]);
              }
          } catch (error) {
            
              console.error('Error loading categories:', error);
              setCategories([]); 
          }
      };

      loadCategories();
  }, []);




  const banners = [
    { src: 'https://file.hstatic.net/200000722513/file/banner_web_slider_800x400_laptop_gaming_wukong_d33e1e6762764ec799820bfcc5814047.jpg', alt: 'Banner 1' },
    { src: 'https://file.hstatic.net/200000722513/file/gearvn_800x400_msi_camp.jpg', alt: 'Banner 2' },
    { src: 'https://file.hstatic.net/200000722513/file/banner_web_slider_800x400_xa_kho.jpg', alt: 'Banner 3' },
  ];
  return (
    <Layout userData={userData}>
      <div className="d-flex">
      <Sidebar categories={categories} />
        <main className="p-0 flex-grow-1">
          <BannerCarousel banners={banners} />
        </main>
      </div>
      <FlashSale />
     <CategoryGrid  />

    </Layout>
  );
}

export default Home;
