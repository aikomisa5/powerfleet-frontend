import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function FullscreenModal({ images, initialIndex, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <Swiper
          modules={[Navigation]}
          navigation
          initialSlide={initialIndex}
          spaceBetween={10}
          slidesPerView={1}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="modal-slide">
                <img src={img.base64} alt={`img-${index}`} className="modal-img" />
                <p className="modal-description">{img.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>
    </div>
  );
}
