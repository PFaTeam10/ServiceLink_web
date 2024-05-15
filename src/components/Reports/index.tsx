import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import TableThree from "../Tables/Helpers/TableThree";

const Calendar = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Calendar" />

      {/* <!-- ====== Calendar Section Start ====== --> */}
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <TableThree/>
      </div>
      {/* <!-- ====== Calendar Section End ====== --> */}
    </div>
  );
};

export default Calendar;
