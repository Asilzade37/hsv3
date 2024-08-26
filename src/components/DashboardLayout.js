import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';
import { FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi';
import { Link, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import SatisYap from '../pages/SatisYap';
import UrunListesi from '../pages/UrunListesi';
import UrunEkle from '../pages/UrunEkle';
import 'react-pro-sidebar/dist/css/styles.css';
import '../styles/DashboardLayout.scss';

const DashboardLayout = () => {
  const [menuCollapse, setMenuCollapse] = useState(false);

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <div className="dashboard-layout">
      <ProSidebar collapsed={menuCollapse}>
        <SidebarHeader>
          <div className="logotext">
            <p>{menuCollapse ? "Logo" : "Hızlı Satış"}</p>
          </div>
          <div className="closemenu" onClick={menuIconClick}>
            {menuCollapse ? (
              <FiArrowRightCircle/>
            ) : (
              <FiArrowLeftCircle/>
            )}
          </div>
        </SidebarHeader>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem active={true} icon={<FaTachometerAlt />}>
              Dashboard
              <Link to="/dashboard" />
            </MenuItem>
            <MenuItem icon={<FaGem />}>
              Satış Yap
              <Link to="/dashboard/satis" />
            </MenuItem>
            <SubMenu title="Ürünler" icon={<FaList />}>
              <MenuItem>
                Ürün Listesi
                <Link to="/dashboard/urunler" />
              </MenuItem>
              <MenuItem>
                Ürün Ekle
                <Link to="/dashboard/urun-ekle" />
              </MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape="square">
            <MenuItem icon={<FiLogOut />}>Çıkış Yap</MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/satis" element={<SatisYap />} />
          <Route path="/urunler" element={<UrunListesi />} />
          <Route path="/urun-ekle" element={<UrunEkle />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardLayout;