import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useFetchAllCategoryList } from "./useFetch";
import { getStorage, saveStorage } from "../utils/helpers";
import { useModalActions } from "../context/LoginModalProvider";

export const useCategories = (allSelect = true, type, classes = false) => {
  const [allCategories, apiFetch, loading] = useFetchAllCategoryList();
  useEffect(() => {
    apiFetch();
  }, []);

  const { setSelectCategory, selectCategory } = useModalActions();
  const [allChecked, setAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState(
    Array.from({ length: 26 }, () => false) // 26 beacuse all categories is empty at beginning
  );

  const selectAll = () => {
    if (type !== "radio") {
      setSelectCategory(!selectCategory);
      setAllChecked((prevState) => !prevState);
      setCheckboxStates(checkboxStates.map(() => !allChecked));
      if (!allChecked) {
        saveStorage(
          "selectedCategories",
          allCategories?.map((item) => item.id)
        );
      } else {
        saveStorage("selectedCategories", []);
      }
    }
  };
  const [selectedIds, setSelectedIds] = useState([]);

  const selectOne = (index, id) => {
    if (type == "radio") {
      const newCheckboxStates = checkboxStates.map((state, i) => i === index);
      setCheckboxStates(newCheckboxStates);
    } else {
      const storeData = getStorage("selectedCategories");
      setSelectCategory(!selectCategory);
      setCheckboxStates(
        checkboxStates.map((state, i) => (i === index ? !state : state))
      );
      setSelectedIds(() => {
        if (storeData.includes(id)) {
          // Eger id listede varsa, sil
          const updatedArr = storeData.filter((itemId) => itemId !== id);
          if (!classes) {
            saveStorage("selectedCategories", updatedArr);
          }

          return updatedArr;
        }

        // Eger id listede yoxdursa, elave et
        const updatedArr = [...storeData, id];
        if (!classes) {
          saveStorage("selectedCategories", updatedArr);
        }

        return updatedArr;
      });

      setAllChecked(false);
    }
  };

  const category = [
    {
      name: "Kateqoriyalar",
      title: allSelect && (
        <div className="categoryTitle">
          <label
            className="cursor-pointer w-full dark:text-white"
            htmlFor="check"
          >
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
          {allCategories?.map((item, index) => {
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
                <label
                  className="cursor-pointer dark:text-white"
                  htmlFor={`check-${item.id}`}
                >
                  {item.name}
                </label>
                <span className={`${classes ? "" : "container"} `}>
                  <input
                    onChange={() => selectOne(index, item.id)}
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

  return { category, checkboxStates, allCategories, loading, selectedIds };
};
