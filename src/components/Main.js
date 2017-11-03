import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import Drawer from 'react-native-drawer';
import Prompt from 'react-native-prompt';
import { Content, Container, Header, Left, Right, Button, Icon, Body, Title } from 'native-base';

import Styles from '../styles/Styles';
import MainMenu from '../components/MainMenu';

import menuIcon from '../images/menu.png';
import messagesIcon from '../images/messages.png';
import holonsIcon from '../images/holons.png';
import background from '../images/blue_background.png';

function Main(props) {  
  return (
    <Container>
      <Drawer
        open={props.isDrawerOpen}
        content={
          <MainMenu
            onClosed={() => props.onClosed()}
            onItemClicked={screen => props.onItemClicked(screen)}
          />
        }
      >
        <Image
          source={background}
          style={{
            flex: 1,
            width: null,
            height: null,
          }}
        >
          <Header style={{ backgroundColor: 'transparent' }}>
            <Left>
              <Button transparent onPress={() => props.onOpen()}>
                <Icon style={{ color: '#2973AB' }} name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>Bitnation</Title>
            </Body>
            <Right>
              <Image
                resizeMode="contain"
                resizeMethod="resize"
                source={messagesIcon}
                style={Styles.chatButton}
                onPress={() => props.onOpen()}
              />
              <Image
                resizeMode="contain"
                resizeMethod="resize"
                source={holonsIcon}
                style={Styles.holonsButton}
                onPress={() => props.onOpen()}
              />
            </Right>
          </Header>
          <Content>
            <Prompt
              title="Encryption password prompt"
              placeholder="Enter password to decrypt"
              onCancel={() => props.onAuthPromptSubmit()}
              onSubmit={(value) => props.onAuthPromptSubmit(value)}
              onChangeText={(value) => console.log('value', value)}
              visible={props.isAuthPromptOpen}
              textInputProps={{ secureTextEntry: true }}
            />
            {props.children}
          </Content>
        </Image>
      </Drawer>
    </Container>
  );
}

Main.propTypes = {
  onOpen: PropTypes.func.isRequired,
  onClosed: PropTypes.func.isRequired,
  onItemClicked: PropTypes.func.isRequired,
  isDrawerOpen: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  isAuthPromptOpen: PropTypes.bool,
  onAuthPromptSubmit: PropTypes.func.isRequired,
};

Main.defaultProps = {
  isAuthPromptOpen: false,
};

export default Main;
