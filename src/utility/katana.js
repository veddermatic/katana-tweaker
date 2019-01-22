import { ampsById } from '../constants/katanaData';

const AMP_MODEL_PARAM = 'preamp_a_type';

/**
 * Gets the 'GT-100' name for a given amp ID.
 *
 * @param {number} ampId - A GT-100 "sneaky amp" ID 
 * @returns {string} - The GT-100 name for the ID or 'unknown' if there is none.
 */
export const ampNameForId = ampId => {
    const amp = ampsById[ ampId ];
    return amp.gt100 || 'unknown';
}

/**
 * What does the bright setting do for this amp ID?
 *
 * @param {number} ampId - A GT-100 "sneaky amp" ID 
 * @returns {string} - Description of how the `bright` setting affects this amp.
 */
export const brightEffectById = ampId => {
    const amp = ampsById[ ampId ];
    if (!amp) {
        return 'Unkown'
    }
    switch( amp.bright ) {
        case 0:
            return 'None';
        case 1:
            return 'Moderate';
        case 2:
            return 'Large';
        default:
            return 'Unkown'; 
    }
}

/**
 * What does the bright setting do for this patch?
 *
 * @param {object} patch - A Katana liveset patch
 * @returns {string} - Description of how the `bright` setting affects this amp.
 */
export const brightEffect = patch => {
    const ampId = patch.params[ AMP_MODEL_PARAM ];
    return brightEffectById( ampId );
}


/**
 * Gets the 'GT-100' name for a given patch.
 *
 * @param {object} patch - A Katana liveset patch
 * @returns {string} - The GT-100 name for the patch or 'unknown' if there is none.
 */
export const ampName = patch => {
    const ampId = patch.params[ AMP_MODEL_PARAM ];
    return ampNameForId( ampId );
}

/**
 * Gets the 'Modeled Amp' info for a given patch. Gives the real-world details
 * about the amp that is modeled since the GT-100 can't use them for legal reasons.
 *
 * @param {object} patch - A Katana liveset patch
 * @returns {string} - The modeling info for the patch or 'unknown' if there is none.
 */
export const ampModel = patch => {
    const ampId = patch.params[ AMP_MODEL_PARAM ];
    const amp = ampsById[ ampId ];
    return amp.modeled || 'unknown';
}

/**
 * Gets which  LED will light up on the Katana if you use this patch.
 *
 * @param {object} patch - A Katana liveset patch
 * @returns {string} - The lable of the LED that will be lit
 */
export const ampLED = patch => {
    const ampId = patch.params[ AMP_MODEL_PARAM ];
    const amp = ampsById[ ampId ];
    return amp.katana || '---';
}
