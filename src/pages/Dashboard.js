import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hoş geldiniz! Bu, sistemin özet bilgilerinin gösterileceği dashboard sayfasıdır.</p>
      <p>Burada şunları görebilirsiniz:</p>
      <ul>
        <li>Son 30 günde yapılan toplam satış</li>
        <li>Elde edilen toplam gelir</li>
        <li>En çok satılan ürünler</li>
      </ul>
    </div>
  );
};

export default Dashboard;