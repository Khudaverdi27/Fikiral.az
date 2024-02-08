import { useState } from "react";

export const Categories = () => {
  const categories = [
    {
      name: "Kateqoriyalar",
      title: (
        <>
          <label className="cursor-pointer w-full" htmlFor="check">
            hamisi
          </label>
          <span className="container">
            <input type="checkbox" id="check" />
            <span className="checkmark"></span>
          </span>
        </>
      ),
    },
    {
      title: (
        <>
          <label className="cursor-pointer w-full" htmlFor="check1">
            name2
          </label>
          <span className="container">
            <input type="checkbox" id="check1" />
            <span className="checkmark"></span>
          </span>
        </>
      ),
    },
  ];

  return categories;
};

export const notifcations = [
  {
    name: "Bildirişlər",
    title: (
      <div className="flex justify-between items-center space-x-2  border-b pb-3 hover:border-[#858585]">
        <figure className="size-9 rounded-full shrink-0">
          <img
            className="img-cover"
            src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
            alt=""
          />
        </figure>
        <span className="text-sm text-black line-clamp-1">
          <span className="font-bold">Rüfət Ə.</span> postunuza rəy bildirdi.
          Baxmaq üçün toxunun.
        </span>
      </div>
    ),
  },
  {
    title: (
      <div className="flex justify-between items-center space-x-2  border-b pb-3 hover:border-[#858585]">
        <figure className="size-9 rounded-full shrink-0">
          <img
            className="img-cover"
            src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
            alt=""
          />
        </figure>
        <span className="text-sm text-black line-clamp-1">
          <span className="font-bold">Rüfət Ə.</span> postunuza rəy bildirdi.
          Baxmaq üçün toxunun.
        </span>
      </div>
    ),
  },
  {
    title: (
      <div className="flex justify-between items-center space-x-2  border-b pb-3 hover:border-[#858585]">
        <figure className="size-9 rounded-full shrink-0">
          <img
            className="img-cover"
            src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
            alt=""
          />
        </figure>
        <span className="text-sm text-black line-clamp-1">
          <span className="font-bold">Rüfət Ə.</span> postunuza rəy bildirdi.
          Baxmaq üçün toxunun.
        </span>
      </div>
    ),
  },
];
