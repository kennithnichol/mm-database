export interface IGuardResult {
    succeded: boolean;
    message?: string;
}

export interface IGuardArgument {
    argument: any;
    argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
    public static combine (guardResults: IGuardResult[]): IGuardResult {
        for (let result of guardResults) {
            if (result.succeded === false) return result;
        }
    }

    public static greaterThan (minValue: number, actualValue: number): IGuardResult {
        return actualValue > minValue
            ? { succeded: true }
            : {
                succeded: false,
                message: `Number given {${actualValue}} is not greater than {${minValue}}.`
        }
    }

    public static againstAtLeast (numChars: number, text: string): IGuardResult {
        return text.length >=  numChars
            ? { succeded: true }
            : {
                succeded: false,
                message: `Text is not at least {${numChars}} chars.`
        }
    }

    public static againstAtMost (numChars: number, text: string): IGuardResult {
        return text.length <=  numChars
            ? { succeded: true }
            : {
                succeded: false,
                message: `Text is greater than {${numChars}} chars.`
        }
    }

    public static againstNullOrUndefined (argument: any, argumentName: string): IGuardResult {
        if (argument === null || argument === undefined) {
            return { succeded: false, message: `${argumentName} is null or undefined` }
        } else {
            return { succeded: true }
        }
    }

    public static againstNullOrUndefinedBulk(args: GuardArgumentCollection): IGuardResult {
        for (let arg of args) {
            const result = this.againstNullOrUndefined(arg.argument, arg.argumentName);
            if (!result.succeded) return result;
        }

        return { succeded: true }
    }

    public static isOneOf (value: any, validValues: any[], argumentName: string): IGuardResult {
        let isValid = false;
        for (let validValue of validValues) {
            if (value === validValue) {
                isValid = true;
            }
        }

        if (isValid) {
            return { succeded: true }
        } else {
            return {
                succeded: false,
                message: `${argumentName} isn't oneOf the correct types in ${JSON.stringify(validValues)}. Got "${value}".`
            }
        }
    }

    public static inRange (num: number, min: number, max: number, argumentName: string): IGuardResult {
        const isInRange = num >= min && num <= max;
        if (!isInRange) {
            return { succeded: false, message: `${argumentName} is not within range ${min} to ${max}.`}
        } else {
            return { succeded: true }
        }
    }

    public static allInRange(numbers: number[], min: number, max: number, argumentName: string): IGuardResult {
        let failingResult: IGuardResult = null;
        for (let num of numbers) {
            const numIsInRangeResult = this.inRange(num, min, max, argumentName);
            if (!numIsInRangeResult.succeded) failingResult = numIsInRangeResult;
        }

        if (failingResult) {
            return { succeded: false, message: `${argumentName} is not within the range.`}
        } else {
            return { succeded: true }
        }
    }
}