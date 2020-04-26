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
    if (this.transactions.length > 0) {
      const { value: income } = this.transactions.reduce(
        (previous, current) => {
          if (previous.type === 'income') {
            const value =
              current.type === 'income'
                ? previous.value + current.value
                : previous.value + 0;

            return new Transaction({ title: '', value, type: 'income' });
          }
          return new Transaction({ title: '', value: 0, type: 'income' });
        },
      );

      const { value: outcome } = this.transactions.reduce(
        (previous, current) => {
          if (previous.type === 'outcome') {
            const value =
              current.type === 'outcome'
                ? previous.value + current.value
                : previous.value + 0;

            return new Transaction({ title: '', value, type: 'outcome' });
          }
          return new Transaction({ title: '', value: 0, type: 'outcome' });
        },
      );
      const total = income - outcome;
      return {
        income,
        outcome,
        total,
      };
    }
    return {
      income: 0,
      outcome: 0,
      total: 0,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
