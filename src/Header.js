import './Header.css'
import logo from './react-icon.png'

export default function Header() {
    return (
      <div className="Header">
        <div className="logo">
            <img src={logo} width="80px"></img>
        </div>
        <div className="navigation">
            <ul>
                <li>Home</li>
                <li>About</li>
                <li>Impressum</li>
            </ul>
        </div>
      </div>
    );
  }