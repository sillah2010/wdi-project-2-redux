import React, { Component } from 'react';
import CharacterCard from './CharacterCard'
import EditTeam from './EditTeam'
import styled from 'styled-components'
import axios from 'axios'
import RaisedButton from 'material-ui/RaisedButton';

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

class TeamCard extends Component {

    state = {
        editToggle: false
    }

    changeEditToggle = () => {
        this.setState({ editToggle: !this.state.editToggle })
    }

    deleteTeam = async () => {
        try {
            await axios.delete(`/api/${this.props.player._id}/teams/${this.props.team._id}/delete`)
            this.props.updatingTeams()
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <TeamContainer>
                <TitleStyle>
                    <h2>{this.props.team.nickname}</h2>
                </TitleStyle>
                <TeamStyle>
                    <CharacterCard character={this.props.team.characterOne[0]} />
                    <CharacterCard character={this.props.team.characterTwo[0]} />
                    <CharacterCard character={this.props.team.characterThree[0]} />
                </TeamStyle>
                <ul>
                    {this.state.editToggle ? <li><RaisedButton label="Cancel" onClick={this.changeEditToggle} /></li> :
                        <li><RaisedButton label="Edit Team" onClick={this.changeEditToggle} /></li>}
                    <li><RaisedButton label="Remove Team" onClick={this.deleteTeam} /></li>
                </ul>
                <div className="editTeamForm">
                    {this.state.editToggle ? <EditTeam
                        player={this.props.player}
                        characters={this.props.characters}
                        team={this.props.team}
                        updatingTeams={this.props.updatingTeams}
                        changeEditToggle={this.changeEditToggle} /> : null}
                </div>
            </TeamContainer>
        );
    }
}

export default TeamCard;

