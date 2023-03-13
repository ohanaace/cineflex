import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import Seat from "./Seat"

export default function SeatsPage() {
    const [seat, setSeat] = useState({ id: "", name: "", day: { id: "", weekday: "", date: "" }, movie: { id: "", overview: "", posterURL: "", title: "" }, seats: [] })
    const { idSessao } = useParams()
    const navigate = useNavigate()
    const [selectedSeatsNames, setSelectedSeatsNames] = useState([])
    const [name, setName] = useState("") //armazena o nome do comprador
    const [cpf, setCpf] = useState("") //armazena o CPF do comprador
    const [ids, setIds] = useState([]) //armazena os IDs dos assentos reservados
    
    useEffect(() => {
        async function fetchSeatsData() {
            const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
            const promise = await axios.get(URL)
            try {
                setSeat(promise.data)
            } catch (error) {
                console.log(error)
                alert("Ocorreu um erro ao buscar os assentos para essa sessão :( Tente novamente")
                window.location.reload()
            }
        }
        fetchSeatsData()
    }, [])

    async function submitData() {
        try {
            const body = { ids, name, cpf }
            const info = {name, cpf, selectedSeatsNames, seat}
            const url = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
            await axios.post(url, body)
            navigate("/sucesso", {state: info})
        } catch (error) {
            alert("Ops! Parece que ocorreu um erro na reserva dos assentos :(")
            console.log(error)
        }
    }
    function handleInputChange(e) {
        if (e.target.name === name) {
            setName(e.target.value)
        } else {
            setCpf(e.target.value)
        }
    }
    function validateData(e) {
        e.preventDefault()
        const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
        const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        const chars = [".", "-"]
        const splitCpf = cpf.split("")
        const invalidCpfChars = splitCpf.some(el => chars.includes(el))
        const notANumberCpf = splitCpf.some(el => alphabet.includes(el))
        if (cpf.length !== 11 || notANumberCpf || invalidCpfChars) {
            alert("CPF inválido! Digite seu CPF no seguinte formato: 00000000000")
            return
        }
        const splitName = name.split("")
        const invalidName = splitName.some(el => numbers.includes(el))
        if (invalidName) {
            alert("Nome inválido! Verifique se o nome foi digitado corretamente")
            return
        }
        if (ids.length === 0) {
            alert("Escolha pelo menos um assento.")
            return
        }
        submitData()
    }
    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {seat.seats.map((sit) =>
                    <Seat
                        key={sit.id}
                        isAvailable={sit.isAvailable}
                        id={sit.id}
                        name={sit.name}
                        selectedSeatsNames={selectedSeatsNames}
                        setSelectedSeatsNames={setSelectedSeatsNames}
                        ids={ids}
                        setIds={setIds}
                    >
                        {sit.name}
                    </Seat>)}

            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle backgroundColor={"#1AAE9E"} borderColor={"#0E7D71"} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle backgroundColor={"#C3CFD9"} borderColor={"#7B8B99"} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle backgroundColor={"#FBE192"} borderColor={"#F7C52B"} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={validateData}>
                <label htmlFor="name">Nome do Comprador:</label>
                <input
                    id="name"
                    placeholder="Digite seu nome..."
                    name={name}
                    value={name}
                    onChange={handleInputChange}
                    data-test="client-name"
                    required />

                <label htmlFor="cpf">CPF do Comprador:</label>
                <input
                    id="cpf"
                    placeholder="Digite seu CPF..."
                    name={cpf}
                    value={cpf}
                    onChange={handleInputChange}
                    data-test="client-cpf"
                    required />

                <button type="submit" data-test="book-seat-btn"> Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={seat.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{seat.movie.title}</p>
                    <p>{seat.day.weekday} - {seat.name}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => props.borderColor};
    background-color: ${props => props.backgroundColor};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
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