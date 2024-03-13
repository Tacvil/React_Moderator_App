import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useItem } from './ItemContext'; // Импортируем контекст для item

const Annontiment = () => {
  const { item } = useItem(); // Получаем item из контекста

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
      </div>
    </div>
  );
};

export default Annontiment;
