import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { TbCalendarEvent } from "react-icons/tb";
import DatePicker from "react-datepicker";
import az from "date-fns/locale/az";
import "react-datepicker/dist/react-datepicker.css";
import { useClickAway } from "@uidotdev/usehooks";

function CalendarPicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [selectedStart, setSelectedStart] = useState("22.03.2024");
  const [selectedEnd, setSelectedEnd] = useState("23.03.2024");

  const calendarRef = useClickAway(() => {
    setIsOpen(false);
  });
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
    <div ref={calendarRef} className="relative bg-white rounded-md p-1 ">
      <div className="flex items-center space-x-4 text-black">
        <span>{selectedStart}</span>
        <FaArrowRightLong />
        <span>{selectedEnd}</span>

        <button onClick={() => setIsOpen(!isOpen)}>
          <TbCalendarEvent className="size-6" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 right-0 top-2">
          <DatePicker
            locale={az}
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </div>
      )}
    </div>
  );
}

export default CalendarPicker;
