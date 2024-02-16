// import React from "react";
import "../assets/styles/footer.css";
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";
import { AppContext } from '../App';
import React, { useContext } from 'react';

const Footer = () => {
    const { userName } = useContext(AppContext);
    return (
        <>
            <footer>
                <div className="footer">
                    <div className="footer-links">
                        <h3>Links</h3>
                        <ul>
                            <li>
                                <NavLink to={"/"}>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to={`/my-appointments/${userName}`}>Appointments</NavLink>
                            </li>
                            <li>
                                <NavLink to={"/notifications"}>Notifications</NavLink>
                            </li>
                            <li>
                                <HashLink to={"/#contact"}>Contact Us</HashLink>
                            </li>
                            <li>
                                <NavLink to={`/profile/${userName}`}>Profile</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="social">
                        <h3>Social links</h3>
                        <ul>
                            <li className="facebook">
                                <a
                                    href="https://www.facebook.com/"
                                    target={"_blank"}
                                    rel="noreferrer"
                                >
                                    <FacebookOutlinedIcon />
                                </a>
                            </li>
                            <li className="youtube">
                                <a
                                    href="https://www.youtube.com/"
                                    target={"_blank"}
                                    rel="noreferrer"
                                >
                                    <YouTubeIcon />
                                </a>
                            </li>
                            <li className="instagram">
                                <a
                                    href="https://www.instagram.com/"
                                    target={"_blank"}
                                    rel="noreferrer"
                                >
                                    <InstagramIcon />
                                </a>
                            </li>
                            <li className="twitter">
                                <a
                                    href="https://www.instagram.com/"
                                    target={"_blank"}
                                    rel="noreferrer"
                                >
                                    <XIcon />
                                </a>
                            </li>
                            <li className="linkedin">
                                <a
                                    href="https://www.instagram.com/"
                                    target={"_blank"}
                                    rel="noreferrer"
                                >
                                    <LinkedInIcon />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    Made by{" "}
                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        MTM Brothers
                    </a>{" "}
                    © {new Date().getFullYear()}
                </div>
            </footer>
        </>
    );
};

export default Footer;
