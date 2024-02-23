import classNames from "classnames";
import React, { useEffect, useState } from "react";
import {
  useFetchAllCategoryList,
  useFetchSelectedCategories,
} from "./useFetch";

export const useCategories = (
  allSelect = true,
  type,
  classes = false,
  isFetch = false
) => {
  const [allCategories, apiFetch, loading] = useFetchAllCategoryList();
  useEffect(() => {
    apiFetch();
  }, []);
  const [selectedCategories, fetchSelected, selectLoading] =
    useFetchSelectedCategories();
  const [allChecked, setAllChecked] = useState(false);

  const [checkboxStates, setCheckboxStates] = useState(
    Array.from({ length: 28 }, () => false) // 28 beacuse all categories is empty at beginning
  );

  const selectAll = () => {
    if (type !== "radio") {
      setAllChecked((prevState) => !prevState);
      setCheckboxStates(checkboxStates.map(() => !allChecked));
    }
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

  const [newSelections, setNewSelections] = useState([]);

  useEffect(() => {
    const updatedContent = {};
    checkboxStates.reduce((acc, state, i) => {
      if (state === true) {
        acc.push(allCategories[i].id);
        updatedContent.categoryIds = acc;
      }
      return acc;
    }, []);

    if (updatedContent.categoryIds && isFetch) {
      fetchSelected(updatedContent).then(() => {
        setNewSelections([].concat(...selectedCategories));
      });
    }
  }, [checkboxStates]);

  const category = [
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
          {allCategories.map((item, index) => {
            return (
              <div
                className={classNames(
                  classes && "checkboxforRegister cursor-pointer",
                  !classes && "checkboxGroup ",
                  {
                    "!bg-[#373994] text-white":
                      classes && checkboxStates[index],
                  }
                )}
                key={item.id}
              >
                <label className="cursor-pointer" htmlFor={`check-${item.id}`}>
                  {item.name}
                </label>
                <span className={`${classes ? "" : "container"} `}>
                  <input
                    onChange={() => selectOne(index, type)}
                    checked={checkboxStates[index]}
                    type={type}
                    id={`check-${item.id}`}
                  />
                  <span className={`checkmark`}></span>
                </span>
              </div>
            );
          })}
        </>
      ),
    },
  ];

  return { category, checkboxStates, allCategories, loading, newSelections };
};
