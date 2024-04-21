import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getDocs, collection, where, query } from 'firebase/firestore';
import { db } from './firebase';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useItem } from './ItemContext'; // Импортируем хук для использования контекста
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import noImage from './no-image.jpg';

var counter = 0;

const Home = () => {
  const { isLoggedIn } = useAuth(); // Получаем статус аутентификации из контекста
  const { setItem } = useItem(); // Получаем функцию для установки данных item

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Создаем запрос к коллекции "main" с фильтром по полю "published"
        const q = query(collection(db, 'main'), where('published', '==', false));
        
        // Получаем документы, соответствующие запросу
        const querySnapshot = await getDocs(q);
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

  useEffect(() => {
    console.log('Компонент отрендерился');
  }); 

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
      {data.map((item, index) => {
        const images = [item.mainImage, item.image2, item.image3]
          .filter(image => image && image.trim() !== '' && image.startsWith('http'));
        const hasImages = images.length > 0;

        // Заполняем массив изображений до трех элементов, если их меньше
        const filledImages = [...images, ...Array(3 - images.length).fill(noImage)];

        counter = counter + 1;
        console.log(counter);
        return (
          <div key={index} style={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
            {hasImages ? (
              <Slider {...settings} style={sliderStyle}>
                {filledImages.map((image, imageIndex) => (
                  <div key={`${item.key}_${imageIndex}`}>
                    {console.log(image)};
                    {image && image.startsWith('http') ? (
                      <img src={image} alt={`Image ${imageIndex + 1}`} style={imageStyle} />
                    ) : (
                      <img src={noImage} alt={`No Image`} style={imageStyle} />
                    )}
                  </div>
                ))}
              </Slider>
            ) : (
              <div style={sliderStyle}>
                <img src={noImage} alt={`No Image`} style={imageStyle} />
              </div>
            )}

            <div style={{ flex: '1', marginLeft: '10px' }}>
              <TextField
                label="Title"
                value={item.title}
                InputLabelProps={{ shrink: true }}
                fullWidth
                readOnly
                multiline // Разрешаем многострочный ввод
                InputProps={{
                  style: {
                    whiteSpace: 'pre-wrap' // Разрешаем переносы строк
                  }
                }}
              />
              <TextField
                label="Category"
                value={item.category}
                InputLabelProps={{ shrink: true }}
                fullWidth
                readOnly
                multiline // Разрешаем многострочный ввод
                sx={{ marginTop: '10px' }}
                InputProps={{
                  style: {
                    whiteSpace: 'pre-wrap' // Разрешаем переносы строк
                  }
                }}
              />
              <TextField
                label="Time"
                value={new Date(parseInt(item.time)).toLocaleString()}
                InputLabelProps={{ shrink: true }}
                fullWidth
                readOnly
                multiline
                sx={{ marginTop: '10px' }}
                InputProps={{
                  style: {
                    whiteSpace: 'pre-wrap'
                  }
                }}
              />
              <TextField
                label="Address"
                value={`${item.country}, ${item.city}, ${item.index}`}
                InputLabelProps={{ shrink: true }}
                fullWidth
                readOnly
                multiline
                sx={{ marginTop: '10px' }}
                InputProps={{
                  style: {
                    whiteSpace: 'pre-wrap'
                  }
                }}
              />
              <Link to={`/annontiment/${item.uid}`} onClick={() => setItem(item)}>
                <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '10px', width: '100%' }}>
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;