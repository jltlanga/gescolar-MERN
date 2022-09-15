import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import firebaseDB from '../firebase';
import './search.css'

const Search = () => {
    const [data, setData] = useState({})

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    let search = query.get('contact');
    console.log(search);


    const searchData = (search) => {
        firebaseDB.child('Estudante').orderByChild('contact').equalTo(search).on('value', (snapshot) => {
            if (snapshot.val()) {
                setData(snapshot.val());
            }
        })

    }

    useEffect(() => {
        searchData(search)
    },[search]);

    return (
        <>
            <div style={{ marginTop: '50px' }}>
                {/* cria estrutura da tabela para renderizar os dados trazidos de bd */}
                <h1>Histórico escolar do aluno</h1>

                <Link to='/'>
                    <button className='btn btn-edit'>Voltar</button>
                </Link>

                {Object.keys(data).length === 0 ? (
                    <h2>Resultado de busca não encontrado</h2>
                ) :
                    (
                        <table className="table-stayled">
                            <thead>
                                <tr>
                                    <th style={{ textAlign: 'center' }}>ID</th>
                                    <th style={{ textAlign: 'center' }}>Nome</th>
                                    <th style={{ textAlign: 'center' }}>Email</th>
                                    <th style={{ textAlign: 'center' }}>Matrícula</th>
                                    <th style={{ textAlign: 'center' }}>Aval-1</th>
                                    <th style={{ textAlign: 'center' }}>Aval-2</th>
                                    <th style={{ textAlign: 'center' }}>Aval-3</th>
                                    <th style={{ textAlign: 'center' }}>Média</th>
                                    <th style={{ textAlign: 'center' }}>Situação</th>
                                    {/* <th style={{ textAlign: 'center' }}>Ouvidoria</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {/* mapping de dados um/um e adiciona-os na tabela de acordo */}
                                {Object.keys(data).map((id, index) => {
                                    return (
                                        <tr key={id}>
                                            <th>{index + 1}</th>
                                            <td>{data[id].name}</td>
                                            <td>{data[id].email}</td>
                                            <td>{id}</td>
                                            <td>{data[id].avai1}</td>
                                            <td>{data[id].aval2}</td>
                                            <td>{data[id].aval3}</td>
                                            <td>{data[id].media}</td>
                                            <td>{data[id].status}</td>
                                            {/* <td>{data[id].status}</td> */}
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>

                    )
                }

            </div>

        </>
    )
}

export default Search