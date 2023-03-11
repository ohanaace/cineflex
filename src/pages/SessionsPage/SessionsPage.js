import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"


export default function SessionsPage() {
    const [session, setSession] = useState({days: [] ,id: "", posterURL: "", overview: "", releaseDate: "", title:""})
    const {idFilme} = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchSessionsData(){
            try {
                const URL = `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`
                const promise = await axios.get(URL)
                setSession(promise.data)        
            } catch (error) {
                console.log(error)
                alert("Ocorreu um erro ao buscar as sessões para esse filme :(")
                window.location.reload()
            }
        }
        
        fetchSessionsData()
    }, [])
    return (
        <PageContainer>
            Selecione o horário
            <div>
                {session.days.map((sesday) => 
                        <SessionContainer key={sesday.id} >
                          <span>  {sesday.weekday} - {sesday.date} </span>
                        <ButtonsContainer>
                            {sesday.showtimes.map((hour) => <button key={hour.id} onClick={() => navigate(`/assentos/${hour.id}`)}> {hour.name} </button>)}
                        </ButtonsContainer>
                    </SessionContainer>
                )}
            </div>

            <FooterContainer>
                <div>
                    <img src={session.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{session.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`