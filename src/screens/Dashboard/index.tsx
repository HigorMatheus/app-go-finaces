import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
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
  LoadContainer,
} from './styles';

export interface TransactionProps extends TransactionCardProps {
  id: string;
}
interface IHighlightProps {
  amount: string;
}
interface IHighlightDataProps {
  entries: IHighlightProps;
  expensive: IHighlightProps;
  total: IHighlightProps;
}

export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightDataProps>(
    {} as IHighlightDataProps,
  );
  const theme = useTheme();
  const dataKey = '@goFinances:transactions';

  async function loadInfo(): Promise<void> {
    // await AsyncStorage.removeItem(dataKey);
    const response = await AsyncStorage.getItem(dataKey);
    const transactionsData = response ? JSON.parse(response) : [];
    let entriesTotal = 0;
    let expensiveTotal = 0;
    const transactionFormatted: TransactionProps[] = transactionsData.map(
      (item: TransactionProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }
        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRl',
        });

        const dataFormatted = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.data));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          data: dataFormatted,
        };
      },
    );
    const totalValue = entriesTotal - expensiveTotal;
    setTransactions(transactionFormatted);

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRl',
        }),
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRl',
        }),
      },
      total: {
        amount: totalValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRl',
        }),
      },
    });
    setIsLoading(false);
  }
  useFocusEffect(
    useCallback(() => {
      loadInfo();
    }, []),
  );
  useEffect(() => {
    loadInfo();
  }, []);

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
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
              <LogoutButton
                onPress={() => {
                  console.log(' teste');
                }}
              >
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction="Última entrada dia 13 de abril"
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highlightData.expensive.amount}
              lastTransaction="Última entrada dia 03 de abril"
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction="01 à 16 de abril"
            />
          </HighlightCards>
          <Transitions>
            <Title>listagem</Title>
            <TransitionsList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard transaction={item} />}
            />
          </Transitions>
        </>
      )}
    </Container>
  );
};
