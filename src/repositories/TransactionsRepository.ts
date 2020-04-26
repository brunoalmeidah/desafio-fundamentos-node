import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { value: income } = this.transactions.reduce(
      ({ value: previousValue }, { type, value: currentValue }) => {
        const value =
          type === 'outcome' ? previousValue + currentValue : previousValue + 0;

        return new Transaction({ title: '', value, type: 'income' });
      },
    );

    const { value: outcome } = this.transactions.reduce(
      ({ value: previousValue }, { type, value: currentValue }) => {
        const value =
          type === 'outcome' ? previousValue + currentValue : previousValue + 0;

        return new Transaction({ title: '', value, type: 'outcome' });
      },
    );

    const total = income - outcome;

    return {
      income,
      outcome,
      total,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
