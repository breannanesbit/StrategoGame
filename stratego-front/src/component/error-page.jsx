import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      {error ? (
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      ) : (
        <p>
          <i>No error information available.</i>
        </p>
      )}
    </div>
  );
}

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

   componentDidCatch() {
     // Example "componentStack":
     //   in ComponentThatThrows (created by App)
     //   in ErrorBoundary (created by App)
     //   in div (created by App)
     //   in App
    }
    
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <ErrorPage/>
    }

    return this.props.children;
  }
}