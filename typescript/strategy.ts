import * as fs from 'fs';

class Context {
    private strategy: Strategy;
    private filename: string;

    constructor(strategy: Strategy, filename: string) {
        this.strategy = strategy;
        this.filename = filename
    }

    private getLimitedData(): string[] {
        let file = fs.readFileSync(this.filename, 'utf-8');
        let file_rows = file.split("\n");
        return file_rows.slice(0, 100);
    }

    public setStrategy(strategy: Strategy) {
        this.strategy = strategy;
    }

    public printData(): void {
        let dataToOutput = this.strategy.getData(this.getLimitedData());
        console.log(dataToOutput);        
    }

}


interface Strategy {
    getData(sourceData: string[]): string[];
}

// first strategy
class DataFilter implements Strategy {
    private moreThan: number;
    
    /* Numbers exceeding the specified value will be added to the array
    default is 10 */
    constructor(moreThan: number = 10) {
        this.moreThan = moreThan
    }

    public getData(sourceData: string[]): string[] {
        let output: string[] = [];
        
        for (let i = 0; i < sourceData.length; i++) {
            if (+sourceData[i] > this.moreThan) {
                output.push(sourceData[i]);
            }
        }
        return output;
    }
}

// second strategy
class DataRaw implements Strategy {
    public getData(sourceData: string[]): string[] {
        return sourceData
    }
}

const context = new Context(new DataFilter(), './input.txt')
console.log('Filter strategy')
context.printData()

context.setStrategy(new DataRaw())
console.log('No filter strategy')
context.printData()
