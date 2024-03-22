import { Spin } from "antd";
import { getStorage } from "../../utils/helpers";
function AuthWait() {
  const token = getStorage("token");
  return (
    <>
      {token.length == 0 && (
        <div className="font-mono">
          Zəhmət olmasa gözləyin ana səhifəyə yönləndirlirsiniz...
          <Spin size="small" />
        </div>
      )}
    </>
  );
}

export default AuthWait;
