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
import { useAuth } from '../../hooks/auth';

export interface TransactionProps extends TransactionCardProps {
  id: string;
}
interface IHighlightProps {
  amount: string;
  date: string;
}
interface IHighlightDataProps {
  entries: IHighlightProps;
  expensive: IHighlightProps;
  total: IHighlightProps;
}

interface GetLastTransactionDateProps {
  collection: TransactionProps[];
  type: 'positive' | 'negative';
}
export const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightDataProps>(
    {} as IHighlightDataProps,
  );
  const theme = useTheme();
  const { signOut, user } = useAuth();
  const dataKey = `@goFinances:transactions_user:${user.id}`;

  function getLastTransactionDate({
    collection,
    type,
  }: GetLastTransactionDateProps) {
    const collectionFlittered = collection.filter(
      transaction => transaction.type === type,
    );

    if (collectionFlittered.length === 0) {
      return 0;
    }
    const lastTransaction = Math.max.apply(
      Math,
      collectionFlittered.map(transaction =>
        new Date(transaction.data).getTime(),
      ),
    );

    const dateTransaction = new Date(lastTransaction);

    const lastTransactionFormat = dateTransaction.toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'long',
    });
    return lastTransactionFormat;
  }

  async function loadInfo(): Promise<void> {
    // await AsyncStorage.removeItem(dataKey);
    const response = await AsyncStorage.getItem(dataKey);
    const transactionsData = response ? JSON.parse(response) : [];
    let entriesTotal = 0;
    let expensiveTotal = 0;
    console.log(transactionsData);

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

    const lastTransactionEntries = getLastTransactionDate({
      collection: transactionsData,
      type: 'positive',
    });
    const lastTransactionExpensive = getLastTransactionDate({
      collection: transactionsData,
      type: 'negative',
    });
    const totalInterval =
      lastTransactionExpensive === 0
        ? 'N??o h?? transa????es'
        : `01 ?? ${lastTransactionExpensive}`;

    setHighlightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRl',
        }),
        date:
          lastTransactionEntries === 0
            ? 'N??o h?? transa????es'
            : `??ltima entrada dia ${lastTransactionEntries}`,
      },
      expensive: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRl',
        }),
        date:
          lastTransactionExpensive === 0
            ? 'N??o h?? transa????es'
            : `??ltima sa??da dia ${lastTransactionExpensive}`,
      },
      total: {
        amount: totalValue.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRl',
        }),
        date: totalInterval,
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
                    uri: user.photo,
                  }}
                />
                <User>
                  <UserGreeting>Ol??, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highlightData.entries.amount}
              lastTransaction={highlightData.entries.date}
            />
            <HighlightCard
              type="down"
              title="Sa??das"
              amount={highlightData.expensive.amount}
              lastTransaction={highlightData.expensive.date}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.date}
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
