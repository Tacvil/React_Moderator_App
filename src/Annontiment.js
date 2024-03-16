import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useItem } from './ItemContext'; // Импортируем контекст для item


// Функция для получения токена доступа
async function getAccessToken(serviceAccount) {
  try {

  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

const Annontiment = () => {
  const { item } = useItem(); // Получаем item из контекста
  const [serviceAccount, setServiceAccount] = useState(null); // Состояние для хранения содержимого файла JSON
  const [accessToken, setAccessToken] = useState(null); // Состояние для хранения токена доступа

  // Функция для чтения файла JSON и получения токена доступа
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function(event) {
        const content = event.target.result;
        const parsedContent = JSON.parse(content);
        setServiceAccount(parsedContent);
        try {
          const token = await getAccessToken(parsedContent);
          setAccessToken(token);
        } catch (error) {
          console.error('Error getting access token:', error);
        }
      }
      reader.readAsText(file);
    }
  };

  // Проверяем, есть ли данные в item
  if (!item) {
    return <p>No item found</p>;
  }

  // Настройки карусели
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div style={{ display: 'flex' }}> {/* Обертка для размещения названия и описания справа */}
      <div style={{ width: '400px', height: '400px' }}> {/* Пример фиксированных размеров */}
        <Slider {...settings}>
          <div>
            <img src={item.mainImage} alt="Image 1" style={{ maxWidth: '100%', maxHeight: '100%' }} /> {/* Устанавливаем максимальные размеры */}
          </div>
          <div>
            <img src={item.image2} alt="Image 2" style={{ maxWidth: '100%', maxHeight: '100%' }} /> {/* Устанавливаем максимальные размеры */}
          </div>
          <div>
            <img src={item.image3} alt="Image 3" style={{ maxWidth: '100%', maxHeight: '100%' }} /> {/* Устанавливаем максимальные размеры */}
          </div>
        </Slider>
      </div>
      <div style={{ marginLeft: '20px' }}> {/* Отступ слева для размещения справа от слайдера */}
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        
        {/* Поле для загрузки файла */}
        <input type="file" onChange={handleFileChange} accept=".json" />

        {/* Отображение содержимого файла и токена доступа */}
        {serviceAccount && (
          <div>
            <h4>Service Account Key:</h4>
            <pre>{JSON.stringify(serviceAccount, null, 2)}</pre>
          </div>
        )}
        {accessToken && (
          <div>
            <h4>Access Token:</h4>
            <pre>{accessToken}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Annontiment;
