import { useState } from "react"
import styled from "styled-components"


export default function Seat(props) {
    const [background, setBackground] = useState("#C3CFD9")
    const [border, setBorder] = useState("#7B8B99")
    const [selectedIds, setSelectedIds] = useState([])
    const { id, ids, setIds, name, isAvailable, selectedSeatsNames, setSelectedSeatsNames } = props

    return (
        <SeatItem selectedIds={selectedIds} setSelectedIds={setSelectedIds} isAvailable={isAvailable} onClick={() => selectSeat(isAvailable, id, name)} background={background} border={border}>
            {name}
        </SeatItem>
    )
function organizeIds(a, b){
    return a - b
}

    function selectSeat(available, id, name) {
        if(!available){
            alert("Esse assento não está disponível")
            console.log(ids)
        }
        
        else {
            if (selectedSeatsNames.includes(name)) {
                const removedSeats = selectedSeatsNames.filter((s) => s !== name)
                removedSeats.forEach((r) => setBackground("#C3CFD9") && setBorder("#7B8B99"))
                setSelectedSeatsNames(removedSeats)
                const removedIds = ids.filter((ids) => ids !== id)
                setIds(removedIds)
                console.log(removedSeats)
                
                
                return
            } else {
                const mySeats = [...selectedSeatsNames, name].sort(organizeIds)
                setSelectedSeatsNames(mySeats)
                console.log(mySeats)
                const reservedSeats = [...ids, id].sort(organizeIds)
               setIds(reservedSeats)
                mySeats.forEach((s) => setBackground("#1AAE9E") && setBorder("#0E7D71"))
            }
        }

    }

}

const SeatItem = styled.div`
    border: 1px solid ${props => props.isAvailable ? props.border : "#F7C52B"};         // Essa cor deve mudar
    background-color: ${props => props.isAvailable ? props.background : "#FBE192"};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;`