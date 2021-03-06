import path = require('path');

export default class PathFormatter {
    public static format(directory: string, filename: string): string {
        const fullPath: string = `${directory}${path.sep}${filename}`;

        return fullPath;
    }
}