import React from 'react'
import { Container, Content, List, ListItem, Text } from 'native-base'
import * as Colors from '../constants/Colors'

const StatisticsScreen = (props) => {
    return (<>
    <Container style={{ backgroundColor: Colors.SURFACE }}>
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>A</Text>
            </ListItem>
            <ListItem>
              <Text>Aaron Bennet</Text>
            </ListItem>
            <ListItem>
              <Text>Ali Connors</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>B</Text>
            </ListItem>
            <ListItem>
              <Text>Bradley Horowitz</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    </>)
}

export default StatisticsScreen