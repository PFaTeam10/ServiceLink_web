"use client";
import React, { useState } from 'react';
import ShowModal from '../Modal/ShowModal';
import { DeleteReclamation, getReclamationsAccepted } from '@/api/Reclamations/Services';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Status } from '@/enum/enum';
import { IReclamation } from '@/app/interfaces/interface';
import { useDataFetching } from '@/components/Utils/util';

const TableThree = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRec, setSelectedRec] = useState<IReclamation | null>(null);
  const { data: DataReclamation, error , setData } = useDataFetching<IReclamation[]>(getReclamationsAccepted);

  const handleOpenModal = (reclamation: IReclamation) => {
    setSelectedRec(reclamation);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRec(null);
  };


  function formatDate(date: any): string {
    if (date instanceof Date) {
      return date.toISOString().split('T')[0];
    } else if (typeof date === 'string') {
      return new Date(date).toISOString().split('T')[0];
    } else {
      throw new Error('Invalid date format');
    }
  }
  if (error) return <div>Error loading data</div>;
  if (!DataReclamation) return <div>Loading...</div>;

  const handleDeleteRow = async (id: string) => {
    try {
      const newData = DataReclamation.filter((item) => item.id !== id)
      setData(newData)
      await DeleteReclamation(id);
      toast.success('Reclamation deleted successfully');
    } catch (error) {
      toast.error('Failed to delete reclamation');
    }
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Reports
              </th>
              <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {DataReclamation.length > 0 ? (
              DataReclamation.map((item: IReclamation) => (
                <tr key={item.id}>
                  <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {item.title}
                    </h5>
                    <p className="text-sm">{item.description}</p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {formatDate(item.date)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                        item.status === Status.finish
                          ? "bg-success text-success"
                          : item.status === Status.close
                          ? "bg-danger text-danger"
                          : item.status === Status.pending &&  "bg-warning text-warning"
                      }`}
                    >
                      {item.status === Status.finish
                        ? "Terminée"
                        : item.status === Status.close
                        ? "Refusé"
                        : item.status === Status.pending && "En attente"}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary" onClick={() => handleOpenModal(item)}>
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                            fill=""
                          />
                          <path
                            d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                            fill=""
                          />
                        </svg>
                      </button>
                      <button className="hover:text-primary" onClick={() => handleDeleteRow(item.id)}>
                        <svg
                          className="fill-current"
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.67852V1.9969ZM13.2785 4.78752C13.2785 4.92815 13.166 5.04065 13.0254 5.04065H4.94727C4.80664 5.04065 4.69414 4.92815 4.69414 4.78752V3.94377C4.69414 3.80315 4.80664 3.69065 4.94727 3.69065H13.0191C13.1598 3.69065 13.2723 3.80315 13.2723 3.94377V4.78752H13.2785ZM12.0379 15.4313C12.016 15.8844 11.6785 16.1969 11.2254 16.1969H6.26914C5.81602 16.1969 5.47852 15.8844 5.45664 15.4313L4.97852 6.1594H12.5098L12.0379 15.4313Z"
                            fill=""
                          />
                          <path
                            d="M8.9972 14.5282C9.24658 14.5282 9.4472 14.3345 9.4472 14.0963V7.93445C9.4472 7.69632 9.24658 7.50257 8.9972 7.50257C8.74783 7.50257 8.5472 7.69632 8.5472 7.93445V14.0963C8.5472 14.3345 8.74783 14.5282 8.9972 14.5282Z"
                            fill=""
                          />
                          <path
                            d="M6.75352 14.5282C7.00289 14.5282 7.20352 14.3345 7.20352 14.0963V7.93445C7.20352 7.69632 7.00289 7.50257 6.75352 7.50257C6.50414 7.50257 6.30352 7.69632 6.30352 7.93445V14.0963C6.30352 14.3345 6.50414 14.5282 6.75352 14.5282Z"
                            fill=""
                          />
                          <path
                            d="M11.2408 14.5282C11.4902 14.5282 11.6908 14.3345 11.6908 14.0963V7.93445C11.6908 7.69632 11.4902 7.50257 11.2408 7.50257C10.9914 7.50257 10.7908 7.69632 10.7908 7.93445V14.0963C10.7908 14.3345 10.9914 14.5282 11.2408 14.5282Z"
                            fill=""
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-5">
                  No reclamations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />
      {showModal && selectedRec && (
        <ShowModal reclamation={selectedRec} onClose={handleCloseModal}   />
      )}
    </div>
  );
};

export default TableThree;
