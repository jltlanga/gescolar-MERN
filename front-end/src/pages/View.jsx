import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import firebaseDB from '../firebase';
import './view.css';

const View = () => {
    const [student, setStudent] = useState({})

    const { id } = useParams()

    useEffect(() => {
        firebaseDB.child(`Estudante/${id}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                setStudent({ ...snapshot.val() })
            } else {
                setStudent({})
            }
        })
    }, [id])

    console.log(student);


    return (
        <div style={{ marginTop: "50px" }}>
            <div className="card">
                <div className="card-header">
                    <p>Detalhes do aluno {student.name}</p>
                </div>
                <div className="container">
                    <strong>ID: </strong>
                    <span>{id}</span>
                    <br />
                    <br />
                    <strong>Nome: </strong>
                    <span>{student.name}</span>
                    <br />
                    <br />
                    <strong>Email: </strong>
                    <span>{student.email}</span>
                    <br />
                    <br />
                    <strong>Contact: </strong>
                    <span>{student.contact}</span>
                    <br />
                    <br />
                    <strong>Primeira Avaliação: </strong>
                    <span>{student.aval1}</span>
                    <br />
                    <br />
                    <strong>Segunda Avaliação: </strong>
                    <span>{student.aval2}</span>
                    <br />
                    <br />
                    <strong>Terceira Avaliação: </strong>
                    <span>{student.aval3}</span>
                    <br />
                    <br />
                    <strong>Média: </strong>
                    <span>{student.media}</span>
                    <br />
                    <br />
                    <strong>Situação: </strong>
                    <span>{student.status}</span>
                    <br />
                    <br />
                </div>

                <Link to='/'>
                    <button className='btn btn-edit'>Voltar</button>
                </Link>
            </div>

        </div>
    )
}

export default View