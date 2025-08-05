npm install react-bootstrap bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

function MyComponent() {
  return <Button variant="primary">Click me!</Button>;
}
// Import Bootstrap CSS — must be done once in your project
import 'bootstrap/dist/css/bootstrap.min.css';

// Example usage in a React component:
import React from 'react';

function BootstrapDemo() {
  return (
    <div className="container mt-5">
      <h1 className="text-primary">Hello, Bootstrap!</h1>
      <button className="btn btn-success">Bootstrap Button</button>
    </div>
  );
}

export default BootstrapDemo;
