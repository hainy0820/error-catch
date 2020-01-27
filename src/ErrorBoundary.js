import React, { Component } from 'react';
import * as Sentry from '@sentry/browser';

//클래스형 컴포넌트
class ErrorBoundary extends Component {
    state = {
        error: false
    };

    componentDidCatch(error, info) { //error: 에러에 대한 정보, info: 에러가 어디서 발생했는지에 대한 정보
        console.log('에러가 발생했습니다.');
        console.log({
            error,
            info
        });
        this.setState({
            error: true
        })

        if(process.env.NODE_ENV === 'production') {
            Sentry.captureException(error, { extro: info });
        }
    }

    render() {
        if(this.state.error) {
            return <h1>에러 발생!</h1>
        }
        return this.props.children;
    }
}

/*
    <ErrorBoundary>
        <User />
    </ErrorBoundary>
*/
export default ErrorBoundary;