import React, { Component } from "react";

class LoadingSpinner extends Component {

    render() {
        var { width, height, borderWidth, className, spinnerClassName } = this.props;
        return (
            <div className={className}>
                <div className={spinnerClassName} style={{ width, height, borderWidth }}></div>
            </div>
        );
    }
}

LoadingSpinner.defaultProps = {
    width: '32px',
    height: '32px',
    borderWidth: '4px',
    fill: 'currentcolor',
    spinnerClassName: 'LoadingSpinner'
};

export default LoadingSpinner
