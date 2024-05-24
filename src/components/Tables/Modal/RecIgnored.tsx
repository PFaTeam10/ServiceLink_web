import React from 'react';
import './ShowModal.css';
import { getReclamationsIgnored, updateReclamation } from '@/api/Reclamations/Services';
import { Status } from '@/enum/enum';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IReclamation } from '@/interface/interface';
import { useDataFetching } from '@/components/Utils/util';

interface ModalProps {
  setClose: () => void;
}

const RecIgnored: React.FC<ModalProps> = ({ setClose }) => {
  const { data } = useDataFetching(getReclamationsIgnored);

  if (!data) return <></>;

  const handleAccept = async(item:IReclamation) => {
    try {
        item.status = 0;
        await updateReclamation(item)
        toast.success('Status updated successfully');
      } catch(error:any) {
        console.log(error)
        toast.error('Failed to update status');
      }
  };

  const handleReject = async(item:IReclamation) => {
     try {
        item.status = 1;
        await updateReclamation(item)
        toast.success('Status updated successfully');
      } catch(error:any) {
        console.log(error)
        toast.error('Failed to update status');
      }
  };

  return (
    <>
      <div className="modal-overlay fixed top-0 left-0 w-full flex justify-center items-center bg-amber-300-900 bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-8 max-w-lg w-full relative">
          <div className="card-stack">
            {data.length > 0 ? data.map((reclamation: IReclamation) => (
              <div key={reclamation.id} className="card">
                <div className="card-content">
                  <h3>Reclamation N° {reclamation.id} : </h3>
                  <p>{reclamation.title}</p>
                  <div className="card-actions">
                    <button onClick={() => handleAccept(reclamation)} className="btn btn-accept">Accept</button>
                    <button onClick={() => handleReject(reclamation)} className="btn btn-reject">Reject</button>
                  </div>
                </div>
              </div>
            )) : <>No data is in queue</>}
          </div>
          <button onClick={setClose} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
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

export default RecIgnored;
