import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { TbCalendarEvent } from "react-icons/tb";
import DatePicker from "react-datepicker";
import az from "date-fns/locale/az";
import "react-datepicker/dist/react-datepicker.css";

function CalendarPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [selectedStart, setSelectedStart] = useState("");
  const [selectedEnd, setSelectedEnd] = useState("");
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start) {
      const startDateFormatted = formatDate(start);
      setSelectedStart(startDateFormatted);
    }
    if (end) {
      const endDateFormatted = formatDate(end);
      setSelectedEnd(endDateFormatted);
    }
  };

  const formatDate = (date) => {
    const padZero = (val) => (val < 10 ? `0${val}` : val);
    const day = padZero(date.getDate());
    const month = padZero(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <div className="relative shadow-sm rounded-md p-1">
      <div className="flex items-center space-x-4">
        {endDate && (
          <>
            <span>{selectedStart}</span>
            <FaArrowRightLong />
            <span>{selectedEnd}</span>
          </>
        )}
        <button onClick={() => setIsOpen(!isOpen)}>
          <TbCalendarEvent className="size-6" />
        </button>
      </div>

      {isOpen && (
        <DatePicker
          locale={az}
          selected={startDate}
          onChange={onChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      )}
    </div>
  );
}

export default CalendarPicker;
