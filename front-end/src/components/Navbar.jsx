import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './navbar.css'

const Navbar = () => {
  const [activeTab, setactiveTab] = useState("Home")
  const [search, setSearch] = useState('')
  const loction = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if (loction.pathname === '/') {
      setactiveTab('Home');
    }
    else if (loction.pathname === '/add') {
      setactiveTab('Add');
    }
    else if (loction.pathname === '/about') {
      setactiveTab('About');
    }

  }, [loction])

  const handleSubmit = ((e) => {
    e.preventDefault();
    navigate(`/search?contact=${search}`)
    setSearch("")
  })


  return (
    <div className='header'>
      <Link to='/'>
        {/* <p className="logo" >Area do aluno</p> */}
        <p className="logo">GESTÃO ESCOLAR</p>
      </Link>

      <div className="header-right">

        <form onSubmit={handleSubmit} style={{ display: 'inline' }}>
          <input type="text"
            className="inputfield"
            placeholder='Pesquisar contato...'
            onChange={(e) => setSearch(e.target.value)}
            value={search} />
        </form>

        <Link to='/'>
          <p className={`${activeTab === "Home" ? 'active' : ""}`}
            onClick={() => setactiveTab('Home')}>Home</p>
        </Link>


        <Link to='/add'>
          <p className={`${activeTab === "AddStudent" ? 'active' : ""}`}
            onClick={() => setactiveTab('AddStudent')}> Adicionar </p>
        </Link>

        <Link to='/about'>
          <p className={`${activeTab === "About" ? 'active' : ""}`}
            onClick={() => setactiveTab('About')}>Sobre </p>
        </Link>

      </div>

    </div>

  )
}

export default Navbar