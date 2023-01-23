from abc import ABC, abstractmethod
from typing import List


class Strategy(ABC):
    @abstractmethod
    def get_data(self, source_data: List[int]) -> List[int]:
        return source_data


# first strategy
class DataFilter(Strategy):
    def __init__(self, more_than: int = 10):
        self.__more_than = more_than

    def get_data(self, source_data: List[int]) -> List[int]:
        output = list()
        for line in source_data:
            if line > self.__more_than:
                output.append(line)
        return output


# second strategy
class DataRaw(Strategy):
    def get_data(self, source_data: List[int]) -> List[int]:
        return source_data


class Context:
    def __init__(self, strategy: Strategy, filename: str):
        self.__strategy = strategy
        self.__filename = filename

    def __get_limited_data(self) -> List[int]:
        lines = 100
        with open(self.__filename, 'r') as file:
            file_data = [int(next(file)) for x in range(lines)]
        return file_data

    @property
    def strategy(self):
        return self.__strategy

    @strategy.setter
    def strategy(self, strategy: Strategy):
        self.__strategy = strategy

    def print_data(self):
        return print(self.__strategy.get_data(self.__get_limited_data()))


if __name__ == '__main__':
    context = Context(DataFilter(), 'input.txt')
    print('Filter strategy')
    context.print_data()

    context.strategy = DataRaw()
    print('No filter strategy')
    context.print_data()
