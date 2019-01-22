import * as util from '../katana';

const AMP_BRIGHT_ZERO_ID = 3;
const AMP_BRIGHT_ONE_ID = 11;
const AMP_BRIGHT_TWO_ID = 10;


describe('++ katana specific utility functions', () => {

    describe('brightEffectById', () => {
        it('returns the right strings for known values', () => {
            expect( util.brightEffectById( AMP_BRIGHT_ZERO_ID ) ).toBe( 'None' );
            expect( util.brightEffectById( AMP_BRIGHT_ONE_ID ) ).toBe( 'Moderate' );
            expect( util.brightEffectById( AMP_BRIGHT_TWO_ID ) ).toBe( 'Large' );
        });

        it('returns unknown for other things', () => {
            expect( util.brightEffectById( undefined ) ).toBe( 'Unkown' );
        });
    });

});
