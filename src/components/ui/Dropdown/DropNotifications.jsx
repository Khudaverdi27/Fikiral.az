import { useModalActions } from "../../../context/LoginModalProvider";

export const DropNotifications = () => {
  const { notify } = useModalActions();
  const notifications = [
    {
      name: "Bildirşlər",
      title: "",
    },
    {
      title: (
        <>
          {notify?.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center space-x-2 mb-5 pb-2   "
            >
              <figure className="size-11  shrink-0 ">
                <img
                  className="img-cover rounded-full"
                  src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1427"
                  alt=""
                />
              </figure>
              <div className="text-sm text-black dark:text-white space-x-5 flex justify-between">
                <span className=" whitespace-nowrap ">rüfət_16</span>
                <p className="line-clamp-1 "> {item}</p>
              </div>
            </div>
          ))}
        </>
      ),
    },
  ];

  return [notifications, notify];
};
