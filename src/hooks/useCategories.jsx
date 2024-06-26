import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useFetchAllCategoryList } from "./useFetch";
import { getStorage, saveStorage } from "../utils/helpers";
import { useModalActions } from "../context/LoginModalProvider";
import _ from "lodash";

export const useCategories = (
  allSelect = true,
  type,
  classes = false,
  defaultSelect = false
) => {
  const [allCategories, apiCategoryFetch, loading] = useFetchAllCategoryList();
  useEffect(() => {
    apiCategoryFetch();
  }, []);

  const { setSelectCategory, selectCategory, userByIdData } = useModalActions();
  const [allChecked, setAllChecked] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState(
    Array.from({ length: 27 }, () => false) // 27 because all categories is empty at the beginning
  );

  //edit page default selected
  useEffect(() => {
    userByIdData?.categoryIds?.forEach((categoryId) => {
      const index = allCategories.findIndex((c) => c.id === categoryId);
      if (index !== -1 && defaultSelect) {
        setCheckboxStates((prevStates) => {
          const updatedStates = [...prevStates];
          updatedStates[index] = true;
          return updatedStates;
        });
      }
    });
  }, [allCategories]);

  const selectAll = () => {
    if (type !== "radio") {
      setSelectCategory(!selectCategory);
      setAllChecked((prevState) => !prevState);
      setCheckboxStates(_.map(checkboxStates, () => !allChecked));
      if (!allChecked) {
        saveStorage(
          "selectedCategories",
          _.map(allCategories, (item) => item.id)
        );
      } else {
        saveStorage("selectedCategories", []);
      }
    }
  };
  const [selectedIds, setSelectedIds] = useState([]);

  const selectOne = (index, id) => {
    if (type == "radio") {
      const newCheckboxStates = _.map(
        checkboxStates,
        (state, i) => i === index
      );
      setCheckboxStates(newCheckboxStates);
    } else {
      const storeData = getStorage("selectedCategories");
      setSelectCategory(!selectCategory);
      setCheckboxStates(
        _.map(checkboxStates, (state, i) => (i === index ? !state : state))
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
            className="cursor-pointer w-full dark:text-white font-fransisco"
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
          {_.map(allCategories, (item, index) => {
            return (
              <div
                className={classNames(
                  classes && "checkboxforRegister cursor-pointer ",
                  !classes && "checkboxGroup",
                  {
                    "!bg-[#373994] text-white":
                      classes && checkboxStates[index],
                  }
                )}
                key={item.id}
              >
                <label
                  className="cursor-pointer dark:text-white font-fransisco"
                  htmlFor={`check-${item.id}`}
                >
                  {_.split(item?.name, " ").length > 4
                    ? _.slice(_.split(item?.name, " "), 0, 5).join(" ") + "..."
                    : item?.name}
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
