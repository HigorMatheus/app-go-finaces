import React from 'react';
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

type Category = {
  icon: string;
  name: string;
};
export interface TransactionCardProps {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: Category;
  data: string;
}
interface CardPropsData {
  transaction: TransactionCardProps;
}

export function TransactionCard({ transaction }: CardPropsData) {
  return (
    <Container>
      <Title>{transaction.title}</Title>
      <Amount type={transaction.type}>
        {transaction.type === 'negative' && '- '}
        {transaction.amount}
      </Amount>
      <Footer>
        <Category>
          <Icon name={transaction.category.icon} />
          <CategoryName>{transaction.category.name}</CategoryName>
        </Category>
        <Date>{transaction.data}</Date>
      </Footer>
    </Container>
  );
}
