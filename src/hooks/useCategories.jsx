import classNames from "classnames";
import React, { useEffect, useState } from "react";

export const useCategories = (allSelect = true, type, classes = false) => {
  const arr = [
    "Avtomobil",
    "Təmizlik",
    "Digər",
    "İnformasiya və texnologiya",
    "Ekoloji",
    "Energetika",
    "İaşə və ödənişli xidmət",
    "İncəsənət",
    "Elm və təhsil",
    "Kənd və meşə təsərrüfatı, balıqçılıq",
    "Maliyyə və bank",
    "Moda və dizayn",
    "Nəqliyyat və logistika",
    "Oyun və əyləncə mərkəzi",
    "Proqramlaşdırma",
    "Restoranlar və otellər",
    "Sağlamlıq və gözəllik ",
    "Səhiyyə və farmoseptika",
    "Sənaye",
    "Sosial",
    "Təmir və tikinti",
    "Ticarət",
    "Turizm və səyahət",
    "Xeyriyyə",
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
    if (type == "radio") {
      const newCheckboxStates = checkboxStates.map((state, i) =>
        i === index ? !state : false
      );
      setCheckboxStates(newCheckboxStates);
    } else {
      setCheckboxStates(
        checkboxStates.map((state, i) => (i === index ? !state : state))
      );

      setAllChecked(false);
    }
  };

  useEffect(() => {
    const updatedContent = checkboxStates.reduce((acc, state, i) => {
      if (state === true) {
        acc.push({ category: arr[i], id: i });
      }
      return acc;
    }, []);

    // console.log(updatedContent);
  }, [checkboxStates]);

  const categories = [
    {
      name: "Kateqoriyalar",
      title: allSelect && (
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
            <div
              className={classNames(
                classes && "checkboxforRegister cursor-pointer",
                !classes && "checkboxGroup ",
                { "!bg-[#373994] text-white": classes && checkboxStates[index] }
              )}
              key={item}
            >
              <label
                className="cursor-pointer w-full whitespace-nowrap"
                htmlFor={`check-${item}`}
              >
                {item}
              </label>
              <span className={`${classes ? "" : "container"} `}>
                <input
                  className=""
                  onChange={() => selectOne(index, type)}
                  checked={checkboxStates[index]}
                  type={type}
                  id={`check-${item}`}
                />
                <span className={`checkmark`}></span>
              </span>
            </div>
          ))}
        </>
      ),
    },
  ];

  return [categories, checkboxStates, arr];
};
