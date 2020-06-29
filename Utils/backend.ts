import { User } from "./user.ts";
import { ErrorMGD } from "./error.ts";

export class BackEnd {
  users: User[] = [];
  orders?: number[];

  // MARK: Auth

  register(email?: string, password?: string): (User | ErrorMGD) {
    if (email && password) {
      let user = new User(email, password, this.getNewUUID());
      this.users.push(user);
      return user;
    }
    return new ErrorMGD(8, "no user was added");
  }

  signIn(email: string, password: string): (User | ErrorMGD) {
    let userFound = this.users.find((user) => user.email == email);
    if (!userFound) {
      return new ErrorMGD(0, "User was not found");
    }
    if (userFound.password != password) {
      return new ErrorMGD(1, "Password did not match");
    }
    return userFound;
  }

  generateOrder(seed: number): number[] {
    console.log("Generate Order started");
    let numberOfUser = this.getNumberOfUsers();
    // let numberOfUser = 20;
    console.log("Number of user " + numberOfUser);
    let orderUnshuffled = Array.from(Array(numberOfUser).keys());
    console.log("Unshuffled order " + orderUnshuffled);
    let shuffledOrder = this.deterministicShuffle(orderUnshuffled, seed);
    console.log("Shuffled order " + orderUnshuffled);
    this.orders = shuffledOrder;
    return shuffledOrder;
  }

  getMatchs(): Match[] {
    let match: Match[] = [];
    for (let user of this.users) {
      let conterpart = this.getMatchWithID(user.id);
      match.push({ id: user.id, match: conterpart });
    }
    return match;
  }

  getMatchWithID(id: number): (number | ErrorMGD) {
    if (this.orders != null) {
      let userOrder = this.orders[id];
      console.log("id: " + id + " userOrder: " + userOrder);
      if (userOrder != null) {
        let matchID = this.getMatchWithOrder(userOrder);
        if (matchID != null) {
          return matchID;
        }
        return new ErrorMGD(4, "no match for order");
      }
      return new ErrorMGD(3, "no order for id");
    }
    return new ErrorMGD(2, "no order set");
  }

  private getMatchWithOrder(order: number): (number | ErrorMGD) {
    let numberOfUser = this.getNumberOfUsers();
    // let numberOfUser = 20;
    if (numberOfUser % 2 == 0) {
      console.log("pair");
      let half = (numberOfUser / 2);
      let distanceToHalf = half - order;
      let matchOrder = order + (2 * distanceToHalf) - 1;
      return this.getIDWithOrder(matchOrder);
    } else {
      console.log("odd");
      let half = ((numberOfUser - 1) / 2);
      let distanceToHalf = half - order;
      let matchOrder = order + (2 * distanceToHalf);
      if (order == (half)) {
        return new ErrorMGD(5, "no match for this user this week");
      }
      return this.getIDWithOrder(matchOrder);
    }
  }

  private getIDWithOrder(matchOrder: number): (number | ErrorMGD) {
    if (this.orders) {
      let index: number = 0;
      let orders = this.orders;
      for (let i of orders) {
        if (matchOrder == i) {
          return index;
        }
        index++;
      }
    }
    return new ErrorMGD(6, "not ID for Order");
  }

  private getNewUUID(): number {
    return this.users.length;
  }

  private getNumberOfUsers(): number {
    return this.users.length;
  }

  private shuffle(array: number[]): number[] {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  private deterministicShuffle(array: number[], seed: number): number[] {
    let currentIndex = array.length, temporaryValue, randomIndex;
    seed = seed || 1;
    let random = function () {
      var x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}

interface Match {
  id: number;
  match: (number | ErrorMGD);
}
