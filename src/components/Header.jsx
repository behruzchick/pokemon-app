import React, { useState } from "react"
function Header(){
    const [show, setShow] = useState(false);

    return (
      <header className="header">
        <a className="logo_title" href="#">Behruz</a>
            <div className={!show ? "burger_btn" : "active_btn"} onClick={()=>setShow(!show)} >
                <span></span>
                <span></span>
                <span></span>
            </div>
          <nav className={!show ? null : "active"}>
            <a href="#">Home</a>
            <a href="#">Frelance</a>
            <a href="#">Portfolio</a>
          </nav>
      </header>
    )
  }
  export default Header;