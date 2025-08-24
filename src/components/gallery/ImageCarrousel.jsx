import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import FullscreenModal from './FullscreenModal';
import './carousel.css';

export default function ImageCarousel({ images }) {
  const [modalIndex, setModalIndex] = useState(null);

  return (
    <>
      <Swiper spaceBetween={10} slidesPerView={1}>
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="slide-container" onClick={() => setModalIndex(index)}>
              <img src={img.base64} alt={`img-${index}`} className="carousel-img" />
              <p className="img-description">{img.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {modalIndex !== null && (
        <FullscreenModal
          images={images}
          initialIndex={modalIndex}
          onClose={() => setModalIndex(null)}
        />
      )}
    </>
  );
}
