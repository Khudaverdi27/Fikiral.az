import React, { useState } from "react";

export const Categories = () => {
  const arr = [
    "Elm",
    "Medeniyyet",
    "Meiset",
    "Texnologiya",
    "Muhit",
    "Siyaset",
    "Olke",
    "Diger",
  ];
  const [allChecked, setAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState(
    Array.from({ length: arr.length }, () => false)
  );

  const selectAll = () => {
    setAllChecked((prevState) => !prevState);
    setCheckboxStates(checkboxStates.map(() => !allChecked));
  };

  const selectOne = (index) => {
    setCheckboxStates(
      checkboxStates.map((state, i) => (i === index ? !state : state))
    );
    setAllChecked(false);
  };

  const categories = [
    {
      name: "Kateqoriyalar",
      title: (
        <div className="categoryTitle">
          <label className="cursor-pointer w-full" htmlFor="check">
            Hamısı
          </label>
          <span className="container">
            <input
              checked={allChecked}
              onChange={selectAll}
              type="checkbox"
              id="check"
            />
            <span className="checkmark"></span>
          </span>
        </div>
      ),
    },
    {
      title: (
        <>
          {arr.map((item, index) => (
            <div className="checkboxGroup" key={item}>
              <label
                className="cursor-pointer w-full"
                htmlFor={`check-${item}`}
              >
                {item}
              </label>
              <span className="container">
                <input
                  onChange={() => selectOne(index)}
                  checked={checkboxStates[index]}
                  type="checkbox"
                  id={`check-${item}`}
                />
                <span className="checkmark"></span>
              </span>
            </div>
          ))}
        </>
      ),
    },
  ];

  return categories;
};
