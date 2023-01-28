import { useState,useEffect ,useMemo} from 'react';
import MaterialReactTable from 'material-react-table';
import {useLoaderData} from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer/index';
import MenuLeft from '../components/MenuLeft';
import ProfileInput from '../components/Profile/ProfileInput';

function Profile() {
  const data = useLoaderData();
  console.log("HOme",data);
  return  <body className="sb-nav-fixed">
  <Header/>
  <div id="layoutSidenav">
      <div id="layoutSidenav_nav">
          <MenuLeft/>
      </div>
      <div id="layoutSidenav_content">
          <main>
              <div className="container-fluid px-4">
                  <h1 className="mt-4">Thông tin cá nhân</h1>
                  <ol className="breadcrumb mb-4">
                      <li className="breadcrumb-item active">Thông tin cá nhân</li>
                  </ol>
                </div>
              <div className='container'>
                    <ProfileInput props = {data}/>
              </div>
              
          </main>
          <Footer/>
      </div>
  </div>
</body>
}

export default Profile;