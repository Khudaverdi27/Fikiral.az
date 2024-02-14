export const DropNotifications = () => {
  const arr = [
    "postunuza rəy bildirdi. Baxmaq üçün toxunun.",
    "postunuza rəy bildirdi. Baxmaq üçün toxunun.",
    "postunuza rəy bildirdi. Baxmaq üçün toxunun.",
  ];
  const notifications = [
    {
      name: "Bildirşlər",
      title: "",
    },
    {
      title: (
        <>
          {arr.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center space-x-2 mb-5 pb-2  border-b  hover:border-primaryGray"
            >
              <figure className="size-11 rounded-full shrink-0 ">
                <img
                  className="img-cover"
                  src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
                  alt=""
                />
              </figure>
              <span className="text-sm text-black line-clamp-1">
                <span className="font-bold">Rüfət Ə.</span> {item}
              </span>
            </div>
          ))}
        </>
      ),
    },
  ];

  return [notifications, arr];
};
