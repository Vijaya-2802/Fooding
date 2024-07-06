import React, { PureComponent } from 'react';
export default class Footer extends PureComponent {
  render() {
    return (
      <div>
        <footer className="py-3 my-4 border-top">
          <div className="text-center">
            <span className="mb-3 mb-md-0 text-muted">© 2024 Fooding, Inc</span>
          </div>
        </footer>
      </div>
    )
  }
}
