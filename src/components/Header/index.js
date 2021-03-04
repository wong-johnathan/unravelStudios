import React, { useEffect, useState } from "react";
import { Navbar, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse, NavbarToggler } from "reactstrap";
import logo from "assets/logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import loggedIn from "./loggedIn.json";
import loggedOut from "./loggedOut.json";
// import menu from "./menu.json";
const Header = () => {
  const auth = useSelector(({ auth }) => auth);
  const [isOpen, setOpen] = useState(false);
  const [links, setLinks] = useState(loggedOut);
  const height = "70px";
  useEffect(() => {
    if (!auth.token) setLinks(loggedOut);
    else setLinks(loggedIn);
  }, [auth]);

  const renderMenu = (menu) => (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret className='text-white'>
        {menu.text}
      </DropdownToggle>
      <DropdownMenu right>
        {menu.items.map((item, index) => (
          <React.Fragment key={item.text + index}>{renderMenuItem({ ...item, isDropdown: true })}</React.Fragment>
        ))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );

  const renderMenuItem = (item) => {
    if (item.type === "menu") return renderMenu(item);
    else if (item.isDropdown)
      return (
        <DropdownItem className='p-0'>
          <Link to={item.link}>
            <div className='px-3 py-1'>{item.text}</div>
          </Link>
        </DropdownItem>
      );
    else
      return (
        <div style={{ padding: "8px" }} className='rootItemLink'>
          <Link to={item.link} className='text-white align-self-center'>
            {item.text}
          </Link>
        </div>
      );
  };

  return (
    <>
      <div className='fixed-top bg-primary shadow'>
        <Navbar color='primary' style={{ height, maxWidth: "800px" }} className='mx-auto px-4 py-2' expand='lg' dark>
          <Link to='/' className='h-100'>
            <img src={logo} alt='3DCerts' className='p-0 h-100' style={{ filter: "brightness(10)" }} />
          </Link>
          <NavbarToggler onClick={() => setOpen(!isOpen)} />
          <Collapse isOpen={isOpen} navbar className='px-3' style={{ margin: "0 -1.5rem" }}>
            <Nav navbar className='ml-auto'>
              {links.map((link, index) => {
                switch (link.type) {
                  case "menu":
                    return <React.Fragment key={index + link.text}>{renderMenu(link)}</React.Fragment>;
                  default:
                    return <React.Fragment key={index + link.text}>{renderMenuItem(link)}</React.Fragment>;
                }
              })}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
      <div style={{ height }} className='mb-4' />
    </>
  );
};

export default Header;
