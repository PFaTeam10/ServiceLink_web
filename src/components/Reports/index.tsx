'use client'
import { useState } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import TableThree from "../Tables/Helpers/TableThree";
import RecIgnored from "../Tables/Modal/RecIgnored";

const Calendar = () => {
  const [open,setOpen] = useState(false)

  const handleChangeClose = () => 
    {
      setOpen(false)
    }
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Reports" />
      <button onClick={() => setOpen(true)}>Look</button>
      {/* <!-- ====== Calendar Section Start ====== --> */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <TableThree/>
      </div>
      {open && <RecIgnored setClose={handleChangeClose} />}
      {/* <!-- ====== Calendar Section End ====== --> */}
    </div>
  );
};

export default Calendar;
