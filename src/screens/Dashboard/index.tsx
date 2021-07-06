import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCardProps,
  TransactionCard,
} from '../../components/TransactionCard';

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
  LogoutButton,
} from './styles';

export interface TransactionProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: TransactionProps[] = [
    {
      id: String(new Date().getSeconds()),
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
      id: String(new Date().getSeconds()),
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
      id: String(new Date().getSeconds()),
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
          <LogoutButton onPress={() => {}}>
            <Icon name="power" />
          </LogoutButton>
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
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard transaction={item} />}
        />
      </Transitions>
    </Container>
  );
}
