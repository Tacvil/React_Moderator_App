import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useItem } from './ItemContext'; // Импортируем контекст для item
import axios from 'axios'; // Импортируем axios
import { db } from './firebase'; // Импортируем объект db из файла firebase.js
import { getDoc, doc } from 'firebase/firestore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import noImage from './no-image.jpg';



const Annontiment = () => {
  const { item } = useItem(); // Получаем item из контекста
  const [rejectReason, setRejectReason] = useState(''); // Состояние для хранения причины отклонения

  const sendTokenAndNotificationToServer = async (title, body, token) => {
    try {
      const url = 'http://bulletin-board.online/notification';
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

  const formatCurrency = (amount) => {
    // Функция для форматирования числа как валюты
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(amount);
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
          <TextField
            label="Telephone number"
            value={item.tel}
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
            label="Email address"
            value={item.email}
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
            label="Description"
            value={item.description}
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
            label="Price"
            value={formatCurrency(item.price)}
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
        </div>
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {/* <input
          type="text"
          placeholder="Введите причину отклонения"
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
        /> */}
        <TextField
          label="Reason for rejection"
          type="text"
          placeholder="Enter the reason for rejection if needed"
          InputLabelProps={{ shrink: true }}
          value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}
          fullWidth
          required
          sx={{ marginTop: '10px' }}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type="submit" variant="contained" color="primary" sx={{ width: '100%' }} onClick={handlePublish}>PUBLISH</Button>
        <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '10px', width: '100%' }} onClick={handleReject}>REJECT</Button>
      </div>
    </div>
  );
};

export default Annontiment;
