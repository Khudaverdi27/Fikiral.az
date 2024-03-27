import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: error };
  }

  // componentDidCatch(error, errorInfo) {
  //   // You can also log the error to an error reporting service
  //   logErrorToMyService(error, errorInfo);
  // }
  handleClick() {
    this.setState({ hasError: false });
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
      location.reload();
    }, 1000);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="w-full text-center p-5 border bg-[#F5F5F5] border-red-300 mb-2 rounded-md space-y-5">
          <h1 className="font-mono">Bu bölmə yüklənərkən xəta baş verdi 😥</h1>
          <button
            onClick={this.handleClick}
            className="border font-roboto font-[400] bg-indigo-500 rounded-lg py-2 px-3 text-white relative"
          >
            {this.state.loading ? "Yoxlanılır..." : "Təkrar yoxlayın"}
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
