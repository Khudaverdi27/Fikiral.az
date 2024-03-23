import { Button, Result } from "antd";
const ErrorPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Bir şeylər tərs getdi"
    extra={
      <Button href="/" className="bg-indigo-500 text-white" type="link">
        Ana səhifəyə qayıt
      </Button>
    }
  />
);
export default ErrorPage;
