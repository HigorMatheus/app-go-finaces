import React from 'react';
import { categories } from '../../utils/categories';
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

export interface TransactionCardProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  data: string;
}
interface CardPropsData {
  transaction: TransactionCardProps;
}

export function TransactionCard({ transaction }: CardPropsData) {
  const category = categories.filter(
    item => item.key === transaction.category,
  )[0];
  return (
    <Container>
      <Title>{transaction.name}</Title>
      <Amount type={transaction.type}>
        {transaction.type === 'negative' && '- '}
        {transaction.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>
        <Date>{transaction.data}</Date>
      </Footer>
    </Container>
  );
}
