import React from 'react';
import { RU } from 'helpers/ramda';

const { getEnv } = RU;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    this.setState({
      ...this.state,
      error,
      errorInfo,
    });
  }

  render() {
    const { hasError, error, errorInfo } = this.state;

    if (hasError && getEnv() === 'localhost') {
      // You can render any custom fallback UI
      return (
        <h3 style={{ padding: '10px', color: 'red' }}>
          에러가 발생했습니다. (localhost 에서만 메세지 보임 -> 비동기-권한 동작예외로 인함.)
          <br />이 메세지가 보인 후 부터는 react-hot-loader 가 적용 되지 않으니, 에러를 수정 후 직접 페이지를 갱신해
          주시기 바랍니다. <br />
          <br />
          <pre>{JSON.stringify(error)}</pre>
          <pre>{errorInfo && errorInfo.componentStack}</pre>
        </h3>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
