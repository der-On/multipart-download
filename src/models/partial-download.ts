import events = require('events');
import request = require('request');

import AcceptRanges from '../models/accept-ranges';

export interface PartialDownloadRange {
    readonly start: number;
    readonly end: number;
}

export default class PartialDownload extends events.EventEmitter {

    public start(url: string, range: PartialDownloadRange): PartialDownload {

        const options: request.CoreOptions = {
                    headers: {
                        Range: `${AcceptRanges.Bytes}=${range.start}-${range.end}`
                    }
                };

        let offset: number = range.start;
        request
            .get(url, options)
            .on('error', (err) => {
                throw err;
            })
            .on('data', (data) => {
                this.emit('data', data, offset);
                offset += data.length;
            })
            .on('end', () => {
                this.emit('end');
            });

        return this;
    }
}
