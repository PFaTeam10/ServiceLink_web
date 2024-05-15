"use client"
import React from 'react';
import './ShowModal.css'

interface ClientData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  complaint: string;
}

interface ModalProps {
  client: ClientData;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ client, onClose }:any) => {
  return (
    <div className="modal-overlay fixed top-0 left-0 w-full h-full flex justify-center items-center bg-amber-300-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <div className="flex items-center mb-4">
          <img className="w-12 h-12 rounded-full mr-4" src={client.image} alt="Client" />
          <h2 className="text-2xl font-bold">{client.firstName} {client.lastName}</h2>
        </div>
        <p className="mb-2"><strong>Email:</strong> {client.email}</p>
        <p className="mb-4"><strong>Téléphone:</strong> {client.phone}</p>
        <p className="mb-4"><strong>Description de la réclamation:</strong></p>
        <p>{client.complaint}</p>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
          <svg className="fill-current w-6 h-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Modal;
