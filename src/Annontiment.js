import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useItem } from './ItemContext'; // Импортируем контекст для item
import axios from 'axios'; // Импортируем axios
import { db } from './firebase'; // Импортируем объект db из файла firebase.js
import { getDoc, doc } from 'firebase/firestore';


const Annontiment = () => {
  const { item } = useItem(); // Получаем item из контекста
  const [rejectReason, setRejectReason] = useState(''); // Состояние для хранения причины отклонения

  const sendTokenAndNotificationToServer = async (title, body, token) => {
    try {
      const url = 'http://localhost:4000/notification';
      const response = await axios.post(url, {
        token: token,
        title: title,
        body: body
      });
      console.log('Response from server:', response.data);
    } catch (error) {
      console.error('Error sending token and notification:', error);
    }
  };

  const handlePublish = async () => {
    var title = "Объявление одобрено!";
    var body = "body3";
    if (item) {
      const uid = item.uid;
      console.log('uid =', uid);
      const docRef = doc(db, 'users', uid); // Заменено на 'users'
      const docSnapshot = await getDoc(docRef); // Заменено на getDoc
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const token = userData.token;
        sendTokenAndNotificationToServer(title, body, token);
        console.log('Publish clicked');
      } else {
        console.log('No such document!');
      }
    }
  };

  const handleReject = async () => {
    var title = "Объявление отклонено!";
    var body = rejectReason;
    if (item) {
      const uid = item.uid;
      console.log('uid =', uid);
      const docRef = doc(db, 'users', uid); // Заменено на 'users'
      const docSnapshot = await getDoc(docRef); // Заменено на getDoc
      if (docSnapshot.exists()) {
        const userData = docSnapshot.data();
        const token = userData.token;
        sendTokenAndNotificationToServer(title, body, token);
        console.log('Reject clicked. Reason:', rejectReason);
      } else {
        console.log('No such document!');
      }
    }
  };

  if (!item) {
    return <p>No item found</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '400px', height: '400px' }}>
          <Slider {...settings}>
            <div>
              <img src={item.mainImage} alt="Image 1" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
            <div>
              <img src={item.image2} alt="Image 2" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
            <div>
              <img src={item.image3} alt="Image 3" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </div>
          </Slider>
        </div>
        <div style={{ marginLeft: '20px' }}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <input
          type="text"
          placeholder="Введите причину отклонения"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handlePublish}>ОПУБЛИКОВАТЬ</button>
        <button onClick={handleReject}>ОТКЛОНИТЬ</button>
      </div>
    </div>
  );
};

export default Annontiment;
