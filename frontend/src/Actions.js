import React from "react";
import { Container, Menu, Grid, Icon, Button } from "semantic-ui-react";

class Actions extends React.Component {
    constructor(props) {
        super();
        this.state = {
            liked: false,
            played: false,
            backlog: false,
        }
    }

    onClick = (e) => {
        if (e==='played'){
            this.setState(prevState => ({
                played: !prevState.played
            }))
        }
    }

    render() {
        const {played } = this.state;
        return (
            <Container>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Menu vertical inverted fluid>
                                <Menu.Item name="a">
                                    <Icon.Group size='big'>
                                        <Icon 
                                            link 
                                            color={played ? 'green' : ''}
                                            onClick={e => this.onClick('played')} 
                                            fluid
                                            name={played ? 'check circle' : 'check circle outline'} />
                                    </Icon.Group>
                                    <Icon.Group size='big'>
                                        <Icon link fluid name='heart outline' />
                                    </Icon.Group>
                                    <Icon.Group size='big'>
                                        <Icon link fluid name='folder open outline ' />
                                    </Icon.Group>
                                </Menu.Item>
                                <Menu.Item name='Review or log' link />
                                <Menu.Item name='Add to a list' link />
                            </Menu>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}

export default Actions;