import {expect} from 'chai';

import TestConfig from './test-config';

import AcceptRanges from '../models/accept-ranges';
import PartialRequestQuery from '../models/partial-request-query';

describe('Partial request query', () => {
    it('with Accept-Ranges header', function(done) {
        this.timeout(TestConfig.Timeout);

        const partialRequestQuery: PartialRequestQuery = new PartialRequestQuery();

        partialRequestQuery
            .getMetadata(TestConfig.AcceptRangesSupportedUrl.url)
            .then((metadata) => {
                expect(metadata.acceptRanges).to.equal(AcceptRanges.Bytes);
                expect(metadata.contentLength).to.not.be.NaN;
                done();
            });
    });

    it('without Accept-Ranges header', function(done) {
        this.timeout(TestConfig.Timeout);

        const partialRequestQuery: PartialRequestQuery = new PartialRequestQuery();

        partialRequestQuery
            .getMetadata(TestConfig.AcceptRangesUnsupportedUrl.url)
            .then((metadata) => {
                expect(metadata.acceptRanges).to.not.exist;
                expect(metadata.contentLength).to.not.be.NaN;
                done();
            });
    });
});