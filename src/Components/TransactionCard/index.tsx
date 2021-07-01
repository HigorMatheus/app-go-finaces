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
interface Transaction {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: Category;
  data: string;
}
interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
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
