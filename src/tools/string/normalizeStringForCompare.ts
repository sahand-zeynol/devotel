/**
 * Normalizing string for comparing
 * @param input
 */

export function normalizeStringForCompare(input = ''): string {
  return replaceSpecialCharacters(
    input.replace(
      /[ \f\n\r\t\v\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff,\u2000,\u2001,\u2002,\u2003,\u2004,\u2005,\u2006,\u2007,\u2008,\u2009,\u200a,\u200b,\u200c,\u200d,\u200e,\u200f]/g,
      '',
    ),
  );
}

function replaceSpecialCharacters(input: string): string {
  if (typeof input === 'string') {
    // input = input.replace(/[ئ,ی,ي]/g, 'ی');
    input = input.replace(
      /[\ufbfc,\ufbfd,\ufbfe,\ufbff,\ufbe4,\ufbe5,\ufbe6,\ufbe7,\u06cc,\u06cd,\u06ce,\u06d0,\u0678,\u0649,\u064a,\u0626,\u0600,\u06ff,\u08a8, \u08a9]/g,
      'ی',
    );
    // input = input.replace(/[ک,ك]/g, 'ک');
    input = input.replace(
      /[\u0643,\u06a9,\u06aa,\u06ab,\u06ac,\u06ad,\u06ae,\u0762,\u0763,\u0764,\u077f,\ufb8e,\ufb8f,\ufb90,\ufb91]/g,
      'ک',
    );
    input = input.replace(
      /[\u06af,\u06b0,\u06b1,\u06b2,\u06b3,\u06b4,\u08b0,\ufb92,\ufb93,\ufb94,\ufb95,\ufb96,\ufb97,\ufb98,\ufb99,\ufb9a,\ufb9b,\ufb9c,\ufb9d]/g,
      'گ',
    );
    // input = input.replace(/[ا,آ,إ,أ,أ,إ]/g, 'آ');
    input = input.replace(
      /[\ufe81,\ufe82,\ufe83,\ufe84,\ufe87,\ufe88,\ufe8d,\ufe8e,\u0627,\u0622,\u0623,\u0625]/g,
      'ا',
    );
    // input = input.replace(/[َ,ٕ,ُ,ِ,ٓ,ٰ,ٖ,ً,ّ,ّ,ٌ,ٍ,ٍ,ْ,ٔ]/g, '');
    input = input.replace(
      /[\ufe70,\ufe71,\ufe72,\ufe73,\ufe74,\ufe76,\ufe77,\ufe78,\ufe79,\ufe7a,\ufe7b,\ufe7c,\ufe7d,\ufe7e,\ufe7fٔ]/g,
      '',
    );
  }

  return input;
}
