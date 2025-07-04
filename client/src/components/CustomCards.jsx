// src/components/CustomCards.jsx
import './Cards.css';
import cardsData from '../data/cardsData';
import { useNavigate } from 'react-router-dom';

export default function CustomCards() {
  const navigate = useNavigate();

  return (
    <div className="container px-4 py-5" id="custom-cards">
      <h2 className="pb-2 border-bottom text-white text-center">Productos recomendados</h2>

      <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
        {cardsData.map((card, index) => (
          <div className="col" key={index}>
            <div
              className="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow-lg"
              style={{
                backgroundImage: `url(${card.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '300px',
                position: 'relative',
              }}
              onClick={() => navigate(`/producto/${card.id}`)}
            >
              <div className="d-flex flex-column h-100 p-3 text-white text-shadow-1">
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '15px',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                  }}
                >
                  {card.location}
                </div>

                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="btn btn-sm btn-warning fw-bold" disabled>
                    ${card.price}
                  </span>

                  <button
                    className="btn btn-sm btn-outline-light fw-bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/producto/${card.id}`);
                    }}
                  >
                    Ver
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
