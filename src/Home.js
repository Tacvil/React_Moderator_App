import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useItem } from './ItemContext'; // Импортируем хук для использования контекста

const Home = () => {
  const { isLoggedIn } = useAuth(); // Получаем статус аутентификации из контекста
  const { setItem } = useItem(); // Получаем функцию для установки данных item

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'main'));
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push(doc.data());
        });
        setData(items);
      } catch (error) {
        console.error('Ошибка получения данных из Firestore:', error.message);
      }
    };

    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliderStyle = {
    width: '400px',
    maxWidth: '100%',
    marginLeft: '20px'
  };

  const imageStyle = {
    width: '100%',
    height: 'auto',
    maxHeight: '400px',
    objectFit: 'cover',
  };

  // Если пользователь не аутентифицирован, перенаправляем его на страницу входа
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div style={{ margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2>Successfully</h2>

      {data.map((item, index) => {
        const images = [item.mainImage, item.image2, item.image3].filter(image => image && image.trim() !== '');

        return (
          <div key={index} style={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
            <Slider {...settings} style={sliderStyle}>
              {images.length > 0 ? (
                images.map((image, imageIndex) => (
                  <div key={imageIndex}>
                    <img src={image} alt={`Image ${imageIndex + 1}`} style={imageStyle} />
                  </div>
                ))
              ) : (
                <div>
                  <p>No image available</p>
                </div>
              )}
            </Slider>

            <div style={{ flex: '1', marginLeft: '10px' }}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <Link 
                to={{ pathname: `/annontiment/${item.uid}` }}
                onClick={() => setItem(item)} // Устанавливаем данные item через контекст
              >
                View Details
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
