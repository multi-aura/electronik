import React from 'react';
import Layout from '../layouts/Layout';
import Sidebar from '../components/Sidebar/Sidebar'
function Home() {
  const userData = { name: 'Alex Korobov' }; 
  return (
    <Layout userData={userData}>
      <div className="d-flex">
        <Sidebar />
        <main className="p-4 flex-grow-1">
          Hi
        </main>
      </div>
    </Layout>
  );
}

export default Home;
