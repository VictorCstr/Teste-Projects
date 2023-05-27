// import "reflect-metadata";
// import { Transaction, Type } from "../../entities/Transaction";
// import { FakeTransactionsRepository } from "../../repositories/FakeTransactionRepository";
// import { RegisterTransactionUseCase } from "./registerTransactionUseCase";

// let fakeTransactionRepository: FakeTransactionsRepository;
// let registerTransactionUseCase: RegisterTransactionUseCase;

// describe("CreateTransactionUseCase", () => {
//   beforeAll(() => {
//     fakeTransactionRepository = new FakeTransactionsRepository();
//     registerTransactionUseCase = new RegisterTransactionUseCase(
//       fakeTransactionRepository
//     );
//   });
//   it("should be able to create a new transaction", async () => {
//     const transaction = new Transaction({
//       hash: "hash",
//       amount: 1,
//       uid: "wallet",
//       merchantName: "market",
//       merchantAddress: "São Paulo",
//       installments: 1,
//       type: Type.payment,
//       transactionDate: new Date(),
//     });
//     const transactionCreated = await fakeTransactionRepository.save(
//       transaction
//     );
//     expect(transactionCreated).toEqual(transaction);
//   });
// });
