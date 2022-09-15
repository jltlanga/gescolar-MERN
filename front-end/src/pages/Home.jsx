import React, { useEffect, useState } from 'react'
import firebaseDB from '../firebase';
import { Link } from 'react-router-dom';
import './home.css';
import { toast } from 'react-toastify';
import { BsTrash, BsHouse } from "react-icons/bs";
import { ImEyePlus } from "react-icons/im";
import { FaEdit } from "react-icons/fa";

const Home = () => {
  const [data, setData] = useState({})
  const [sort, setSort] = useState(false)
  const [sortedData, setSortedData] = useState([])

  useEffect(() => {
    // Pega dados do bd
    firebaseDB.child('Estudante').on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setData({ ...snapshot.val() })
      } else {
        setData({})
      }
    })
    return () => {
      setData({})
    }
  }, [])

  const onDelete = (id) => {
    if (window.confirm(`Tem certeza que deseja remover os dados do aluno?`)) {
      //remove dados do bd
      firebaseDB.child(`Estudante/${id}`).remove((err) => {
        if (err) {
          toast.error(err)
        } else {
          toast.success(`Dados do aluno foram removidos com sucesso!`)
        }
      });
    }
  };

  //Ordena os dados de acordo com os campos disponiveis
  const handleChange = (e) => {
    setSort(true)
    firebaseDB.child('Estudante').orderByChild(`${e.target.value}`).on('value', (snapshot) => {
      let shortedData = [];
      snapshot.forEach((snap) => {
        shortedData.push(snap.val());
      })
      setSortedData(shortedData)
    })
  }
  //Valida o btn redefinir a page Home
  const handleReset = () => {
    setSort(false);
    firebaseDB.child('Estudante').on('value', (snapshot) => {
      if (snapshot.val() != null) {
        setData({ ...snapshot.val() })
      } else {
        setData({})
      }
    })

    return () => {
      setData({})
    }
  }

  //filtra a situação dos alunos no bd
  const filterData = (value) => {
    firebaseDB.child('Estudante').orderByChild('status').equalTo(value).on('value', (snapshot) => {
      if (snapshot.val()) {
        setData(snapshot.val());
      }
    })
  }

  return (
    <div style={{ marginTop: '50px' }}>
      {/* cria estrutura da tabela para renderizar os dados trazidos de bd */}
      <h1>Àrea do Professor</h1>
      <label htmlFor='sort'>Ordernar por:</label>
      <select name='colValue' id='' className='dropdown' onChange={handleChange}>
        <option value=''>Selecione a opção</option>
        <option value='name'>Nome</option>
        <option value='email'>Email</option>
        <option value='contact'>Contato</option>
        {/* <option value='contact'>Avaliações</option> */}
        <option value='fees'>Média</option>
        {/* <option value='status'>situação</option> */}
      </select>

      <label htmlFor="">Ordenar por situação:</label>
      <button className='btn btn-active' onClick={() => filterData('Aprovado')}>Aprovado</button>
      <button className='btn btn-inactive' onClick={() => filterData('Reprovado')}>Reprovado</button>
      <button className="btn btn-reset" onClick={handleReset}><BsHouse /></button>

      <table className="table-stayled">
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>ID</th>
            <th style={{ textAlign: 'center' }}>Nome</th>
            <th style={{ textAlign: 'center' }}>Email</th>
            <th style={{ textAlign: 'center' }}>Contato</th>
            <th style={{ textAlign: 'center' }}>Aval-3</th>
            <th style={{ textAlign: 'center' }}>Aval-1</th>
            <th style={{ textAlign: 'center' }}>Aval-2</th>
            <th style={{ textAlign: 'center' }}>Média</th>
            <th style={{ textAlign: 'center' }}>Situação</th>
            {/* <th style={{ textAlign: 'center' }}>Action</th> */}
            {!sort && <th style={{ textAlign: 'center' }}>Ação</th>}
          </tr>
        </thead>

        {!sort && (
          <tbody>
            {/* mapping de dados um/um e adiciona-os na tabela de acordo */}
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th>{index + 1}</th>
                  <td>{data[id].name}</td>
                  <td>{data[id].email}</td>
                  <td>{data[id].contact}</td>
                  <td>{data[id].aval1}</td>
                  <td>{data[id].aval2}</td>
                  <td>{data[id].aval3}</td>
                  <td>{data[id].media}</td>
                  <td>{data[id].status}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className='btn btn-edit'><FaEdit /></button>
                    </Link>
                    <Link to={`/view/${id}`}>
                      <button className='btn btn-view'><ImEyePlus /></button>
                    </Link>

                    <button className='btn btn-delete'
                      onClick={() => onDelete(id)}><BsTrash /></button>

                  </td>
                </tr>
              )
            })}

          </tbody>
        )}

        {sort && (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.contact}</td>
                  <td>{item.aval1}</td>
                  <td>{item.aval2}</td>
                  <td>{item.aval3}</td>
                  <td>{item.media}</td>
                  <td>{item.status}</td>
                </tr>
              )

            })}
          </tbody>
        )}
      </table>

    </div>
  )
}

export default Home