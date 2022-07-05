import logo from './logo.svg';
import './Page.css';

function Page() {
    return (
        <div className="Page">
            <header className="Page-header">
                <img src={logo} className="Page-logo" alt="logo"/>
                <p>
                    Edit <code>src/Page.js</code> and save to reload.
                </p>
                <a
                    className="Page-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default Page;
