import LeftSide from "./leftSide";
import RighSide from "./RightSide/rightSide";

function AdminPage() {
  return (
    <div className="flex">
      <LeftSide />
      <RighSide />
    </div>
  );
}

export default AdminPage;
