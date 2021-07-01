import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { HighlightCard } from '../../Components/HighlightCard';
import { TransactionCard } from '../../Components/TransactionCard';

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transitions,
  Title,
  TransitionsList,
} from './styles';

export function Dashboard() {
  const data = [
    {
      type: 'positive',
      data: '25/10/2021',
      title: 'venda de website',
      amount: 'R$17.400,00',
      category: {
        name: 'teste',
        icon: 'dollar-sign',
      },
    },
    {
      type: 'negative',
      data: '25/10/2021',
      title: 'venda de website',
      amount: 'R$17.400,00',
      category: {
        name: 'teste',
        icon: 'coffee',
      },
    },
    {
      type: 'positive',
      data: '25/10/2021',
      title: 'venda de website',
      amount: 'R$17.400,00',
      category: {
        name: 'teste',
        icon: 'home',
      },
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/53712358?v=4',
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Higor</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última entrada dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlightCards>

      <Transitions>
        <Title>listagem</Title>
        <TransitionsList
          data={data}
          renderItem={({ item, index }) => (
            <TransactionCard key={index.toString()} transaction={item} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: getBottomSpace(),
          }}
        />
      </Transitions>
    </Container>
  );
}
