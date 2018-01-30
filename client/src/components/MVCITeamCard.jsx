import React, { Component } from 'react';
import MVCICharacterCard from './MVCICharacterCard'
import MVCIEditTeam from './MVCIEditTeam'
import styled from 'styled-components'
import axios from 'axios'

const TeamStyle = styled.div`
    display: flex;
    justify-content: space-around;
`

const TitleStyle = styled.div`
    text-align: center
`

const TeamContainer = styled.div`
    border-style: solid;
    ul {
        list-style: none;
        display: flex;
        justify-content: space-around;
    }
`

class MVCITeamCard extends Component {

    state = {
        editToggle: false
    }

    changeEditToggle = () => {
        this.setState({ editToggle: !this.state.editToggle })
    }

    deleteTeam = async () => {
        try {
            await axios.delete(`/api/${this.props.player._id}/mvciteams/${this.props.team._id}/delete`)
            this.props.updatingTeams()
        } catch (error) {
            console.log(error)
        }
    }

    infinityStonePicture = (stone) => {
        if (stone === "Reality Stone") {
            return <img className="stonePic" src="https://vignette.wikia.nocookie.net/marvelvscapcom/images/7/73/RealityStone.png/revision/latest?cb=20170912201248" alt={stone}/>
        } else if (stone === "Power Stone") {
            return <img className="stonePic" src="https://vignette.wikia.nocookie.net/marvelvscapcom/images/2/20/PowerStone.png/revision/latest?cb=20170912202830" alt={stone}/>
        } else if (stone === "Space Stone") {
            return <img className="stonePic" src="https://vignette.wikia.nocookie.net/marvelvscapcom/images/8/86/SpaceStone.png/revision/latest?cb=20170912202905" alt={stone}/>
        } else if (stone === "Time Stone") {
            return <img className="stonePic" src="https://vignette.wikia.nocookie.net/marvelvscapcom/images/8/8f/TimeStone.png/revision/latest?cb=20170912202846" alt={stone}/>
        } else if (stone === "Mind Stone") {
            return <img className="stonePic" src="https://vignette.wikia.nocookie.net/marvelvscapcom/images/8/82/MindStone.png/revision/latest?cb=20170912202947" alt={stone}/>
        } else if (stone === "Soul Stone") {
            return <img className="stonePic" src="https://vignette.wikia.nocookie.net/marvelvscapcom/images/8/80/SoulStone.png/revision/latest?cb=20170912202924" alt={stone}/>
        }
    }

    render() {
        return (
            <TeamContainer>
                <TitleStyle>
                    <h4>{this.props.team.nickname}</h4>
                </TitleStyle>
                <TeamStyle>
                    <MVCICharacterCard character={this.props.team.characterOne[0]} />
                    <MVCICharacterCard character={this.props.team.characterTwo[0]} />
                    <span>{this.infinityStonePicture(this.props.team.infinityStone)}</span>
                </TeamStyle>
                <ul>
                    {this.state.editToggle ? <li><button onClick={this.changeEditToggle}>Cancel</button></li> : <li><button onClick={this.changeEditToggle}>Edit Team</button></li>}
                    <li><button onClick={this.deleteTeam}>Delete Team</button></li>
                </ul>
                {this.state.editToggle ? <MVCIEditTeam
                    player={this.props.player}
                    mvciCharacters={this.props.mvciCharacters}
                    team={this.props.team}
                    updatingTeams={this.props.updatingTeams}
                    changeEditToggle={this.changeEditToggle} /> : null}
            </TeamContainer>
        );
    }
}

export default MVCITeamCard;