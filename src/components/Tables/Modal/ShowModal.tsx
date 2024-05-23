import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // styles for the carousel
import './ShowModal.css';
import { updateReclamation } from '@/api/Reclamations/Services';
import { Status } from '@/enum/enum';
import { toast,ToastContainer  } from 'react-toastify';


interface ModalProps {
  reclamation: IReclamation;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ reclamation, onClose }) => {
  if (!reclamation.citizen) return <>Loading...</>;

  const [status, setStatus] = useState(reclamation.status);

  const handleChangeStatus = async (value:any) => {
        try {
          reclamation.status = parseInt(value);
          setStatus(value)
          await updateReclamation(reclamation)
          toast.success('Status updated successfully');
        } catch(error:any) {
          console.log(error)
          toast.error('Failed to update status');
        }
  }
  return (
    <>
    <div className="modal-overlay fixed top-0 left-0  w-full flex justify-center items-center bg-amber-300-900 bg-opacity-50 z-50">
      <div className="bg-white  rounded-lg p-8 max-w-lg w-full relative">
        {reclamation.media && reclamation.media.length > 0 && (
          <Carousel className="mb-4" showThumbs={false} infiniteLoop useKeyboardArrows autoPlay>
            {reclamation.media.map((uri: any, index: number) => (
              <div key={index}>
                <img className="carousel-image" src={uri} alt={`Media ${index + 1}`} />
              </div>
            ))}
          </Carousel>
        )}
        <div className="flex items-center mb-4">
          <h2 className="text-2xl font-bold">{reclamation.citizen.firstName} {reclamation.citizen.lastName}</h2>
        </div>
        <p className="mb-2"><strong>Email:</strong> {reclamation.citizen.email}</p>
        <p className="mb-4"><strong>Téléphone:</strong> {reclamation.citizen.phoneNumber}</p>
        <p className="mb-4"><strong>Description de la réclamation:</strong></p>
        <p>{reclamation.description}</p>
        <div className="mt-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">Statut</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => handleChangeStatus(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value={Status.pending}>En attente</option>
            <option value={Status.finish}>Terminé</option>
            <option value={Status.close}>Refusé</option>
          </select>
        </div>

        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          <svg className="fill-current w-6 h-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default Modal;
