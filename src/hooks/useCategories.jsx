import classNames from "classnames";
import React, { useEffect, useState } from "react";

export const useCategories = (allSelect = true, type, classes = false) => {
  const arr = [
    { slug: "car", name: "Avtomobil", id: 19871 },
    { slug: "cleaning", name: "Təmizlik", id: 19870 },
    { slug: "others", name: "Digər", id: 19869 },
    { slug: "informationetech", name: "İnformasiya və texnologiya", id: 19868 },
    { slug: "ecology", name: "Ekoloji", id: 19867 },
    { slug: "energetic", name: "Energetika", id: 19866 },
    { slug: "cateringservice", name: "İaşə və ödənişli xidmət", id: 19864 },
    { slug: "culture", name: "İncəsənət", id: 19863 },
    {
      slug: "agriculture",
      name: "Kənd və meşə təsərrüfatı, balıqçılıq",
      id: 19862,
    },
    { slug: "bank", name: "Maliyyə və bank", id: 19861 },
    { slug: "moda", name: "Moda və Dizayn", id: 19860 },
    { slug: "transport", name: "Nəqliyyat və logistika", id: 19859 },
    { slug: "gaming", name: "Oyun və əyləncə mərkəzi", id: 19858 },
    { slug: "programing", name: "Proqramlaşdırma", id: 19857 },
    { slug: "restoran", name: "Restoranlar və otellər", id: 19856 },
    { slug: "beauty", name: "Sağlamlıq və gözəllik ", id: 19855 },
    { slug: "healthy", name: "Səhiyyə və farmoseptika", id: 19854 },
    { slug: "industry", name: "Sənaye", id: 19853 },
    { slug: "social", name: "Sosial", id: 19852 },
    { slug: "building", name: "Təmir və tikinti", id: 19851 },
    { slug: "trade", name: "Ticarət", id: 19850 },
    { slug: "tourism", name: "Turizm və səyahət", id: 19849 },
    { slug: "charity", name: "Xeyriyyə", id: 19848 },
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
        acc.push({ category: arr[i] });
      }
      return acc;
    }, []);

    //console.log(updatedContent);
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
          {arr.map((item, index) => (
            <div
              className={classNames(
                classes && "checkboxforRegister cursor-pointer",
                !classes && "checkboxGroup ",
                { "!bg-[#373994] text-white": classes && checkboxStates[index] }
              )}
              key={item.id}
            >
              <label
                className="cursor-pointer w-full whitespace-nowrap"
                htmlFor={`check-${item.id}`}
              >
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
          ))}
        </>
      ),
    },
  ];

  return [category, checkboxStates, arr];
};
