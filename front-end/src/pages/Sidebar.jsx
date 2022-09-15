import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './sidebar.css'
// import {AiFillHome} from 'react-icons/ai';

const Sidebar = () => {
    const [show, setShow] = useState(false);
    return (
        <main className={show ? 'space-toggle' : null}>
            <header className={`header ${show ? 'space-toggle' : null}`}>
                <div className='header-toggle' onClick={() => setShow(!show)}>
                    <i className={`fas fa-bars ${show ? 'fa-solid fa-xmark' : null}`}></i>
                </div>
            </header>
            <aside className={`sidebar ${show ? 'show' : null}`}>
                <div className="brand-name">
                    {/* <h1>GESTÃO ESCOLAR</h1> */}
                </div>
                <nav className='nav'>
                    {/* Links para as routas */}
                    <div>
                        <Link to='/' className='nav-logo'><span></span></Link>
                        <Link to='/perfil' className='nav-link active'><img src="imgs/image 2.svg" alt="" /><span></span> </Link>
                        <Link to='/turmas' className='nav-link'><img src="imgs/image 3.svg" alt="" /><span></span> </Link>
                        <Link to='/aluno/:id' className='nav-link'><img src="imgs/image 4.svg" alt="" /><span></span> </Link>
                        <Link to='/professor' className='nav-link'><img src="imgs/pngwing 1.svg" alt="" />&nbsp;<span></span> </Link>
                        <Link to='/about' className='nav-link'><img src="imgs/info.png" alt="" />&nbsp; &nbsp;<span></span></Link>
                    </div>
                    <Link to='/logout' className='nav-link'><img src="imgs/image 9.svg" alt="" />&nbsp;<span></span> </Link>
                </nav>
            </aside>
            {/* <h1>Content</h1> */}
        </main>
    )
}

export default Sidebar;