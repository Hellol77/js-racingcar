import { CAR } from "../src/constants/car";
import { CAR_RACE } from "../src/constants/carRace";
import { CONSOLE_MESSAGES } from "../src/constants/messages";
import { Car } from "../src/domains/Car";
import { CarRace } from "../src/domains/CarRace";
import { output } from "../src/view/output";

describe("출력 테스트", () => {
  let logSpy;

  beforeEach(() => {
    logSpy = jest.spyOn(console, "log");
  });

  test("전진하는 자동차를 출력할 때 자동차 이름을 같이 출력한다.", () => {
    const car = new Car("a");

    car.move();
    output.carPosition(car);

    expect(logSpy).toHaveBeenCalledWith(
      "a : " + CAR_RACE.POSITION_SYMBOL.repeat(CAR.MOVE_UNIT),
    );
  });

  test("우승자가 여러 명인 경우 쉼표로 구분하여 출력한다.", () => {
    const carNames = ["a", "b", "c"];
    const carInstance = carNames.map(carName => new Car(carName));
    carInstance.map(car => car.move());
    const carRace = new CarRace(carInstance);

    const winner = carRace.getWinner();
    output.winner(winner);

    expect(logSpy).toHaveBeenCalledWith(
      CONSOLE_MESSAGES.WINNER(["a", "b", "c"].join(", ")),
    );
  });
});
