/* eslint-disable no-shadow */
import React, { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';

import { useFocusEffect } from '@react-navigation/native';

import { RFValue } from 'react-native-responsive-fontsize';
import { HistoryCard } from '../../components/HistoryCard';

import { Container, Header, Title, Content, ChartContainer } from './styles';

import { categories } from '../../utils/categories';
import theme from '../../global/styles/theme';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: number;
  category: string;
  data: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    [],
  );

  async function loadData() {
    const dataKey = '@goFinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensive: TransactionData[] = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === 'negative',
    );

    const expensiveTotal = expensive.reduce(
      (accumulator: number, category: TransactionData) => {
        return accumulator + Number(category.amount);
      },
      0,
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensive.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        const percent = ((categorySum / expensiveTotal) * 100).toFixed(0);

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent: `${percent}%`,
        });
      }
    });

    setTotalByCategories(totalByCategory);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      <Content>
        <ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percent"
            y="total"
            colorScale={totalByCategories.map(category => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape,
              },
            }}
            labelRadius={50}
          />
        </ChartContainer>
        {totalByCategories.map(item => (
          <HistoryCard
            key={item.key}
            title={item.name}
            amount={item.totalFormatted}
            color={item.color}
          />
        ))}
      </Content>
    </Container>
  );
}
