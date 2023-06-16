import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useStateValue } from "../../Context/StateProvider";
import "./dashboard.css";
import { financialData, profileData } from "./Data";
import {
  HouseOutlined,
  Logout,
  People,
  Person,
  PersonPinCircleOutlined,
  MenuOutlined,
} from "@mui/icons-material";

export default function Dashboard() {
  // protected routes so can't access otherwise
  const [state, dispatch] = useStateValue();
  const [open, setOpen] = React.useState(false);

  function handleClick() {
    setOpen(prev => !prev);
  }

  function signOut() {
    if (state.user) {
      auth.signOut();
    }
  }
  return (
    <div className="container">
      <div className={open?"navigation":"navigation active"}>
        <ul>
          <li>
            <Link to="#" className="link">
              <span className="Icon">
                <Person className="icon" />
              </span>
              <span className="title" style={{ fontSize: "11px" }}>
                {state.user ? state.user.email : "Guest"}
              </span>
            </Link>
          </li>
          <li>
            <Link to="#" className="link">
              <span className="Icon">
                <HouseOutlined className="icon" />
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/" onClick={signOut} className="link">
              <span className="Icon">
                <Logout className="icon" />
              </span>
              <span className="title">Sign Out</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className={open? "main" : "main active"}>
        <div className="topbar">
          <div className="toggle">
            <MenuOutlined style={{cursor: "pointer"}} onClick={handleClick} />
          </div>
        </div>
        <div className="cardBox">
          <div className="card">
            <div>
              <div className="numbers">1000</div>
              <div className="cardName">Normal Users</div>
            </div>

            <div className="iconBx">
              <Person />
            </div>
          </div>

          <div className="card">
            <div>
              <div className="numbers">2000 </div>
              <div className="cardName">Agents</div>
            </div>

            <div className="iconBx">
              <PersonPinCircleOutlined />
            </div>
          </div>

          <div className="card">
            <div>
              <div className="numbers">3000</div>
              <div className="cardName">All properties</div>
            </div>

            <div className="iconBx">
              <HouseOutlined />
            </div>
          </div>

          <div className="card">
            <div>
              <div className="numbers">4000</div>
              <div className="cardName">Property Owners</div>
            </div>

            <div className="iconBx">
              <People  />
            </div>
          </div>
        </div>

        <div className="details">
          <div className="usersStats">
            <div class="cardHeader">
              <h2>Dummy Data</h2>
              <button className="btn">button</button>
            </div>
            <table>
              <thead>
                {Array(10)
                  .fill()
                  .map((_, index) => (
                    <th key={index}>Column {index + 1}</th>
                  ))}
              </thead>
              <tbody>
                {financialData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {row.map((value, colIndex) => (
                      <td key={colIndex}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="recentUsers">
            <div className="cardHeader">
              <h2>All Users on the system</h2>
            </div>
            <table>
              <tbody>
                {profileData.map((row, rowIndex) => (
                  <>
                    <tr key={rowIndex}>
                      <td className="imgBx">
                        <div className="img">{row[0][0].toUpperCase()}</div>
                      </td>
                      <td>{row[0]}</td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
