export const generateNPSTemplate01 = (
  questionText: string,
  surveyUrl: string
) => {
  const options = [...Array(11).keys()].map((index) => {
    const formattedindex = index.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    return `
    <td style="padding: 0px 8px">
    <a target="_blank" href="${surveyUrl}${surveyUrl.endsWith('?') ? '' : '&'}primaryQuestionAnswer=${index}">
        <img
            height="48"
            width="48"
            src="https://surveyx.s3.us-east-1.amazonaws.com/options/NPS${formattedindex}.png"
            alt="Answer NPS ${formattedindex}"
        >
    </a>
  </td>
`;
  });

  return `  <center>

  <h1 style="font-family: Helvetica, Arial; font-weight: 400; color: #4b5563; font-size: 22px;margin-bottom: 16px">[QUESTION_TEXT]</h1>

  <table width="704px" cellspacing="0" cellpadding="4" border="0">
      <tbody>
          <tr>

          ${options.join('')}

          </tr>
      </tbody>
  </table>
</center>`
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace('[QUESTION_TEXT]', questionText);
};

export const generateLIKETemplate01 = (
  questionText: string,
  surveyUrl: string
) => {
  const options = ['👎', '👍'].map((emoji, index) => {
    const formattedindex = index.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    return `
    <td style="padding: 0px 8px">
    <a target="_blank" href="${surveyUrl}${surveyUrl.endsWith('?') ? '' : '&'}primaryQuestionAnswer=${index}">
        <img
            height="48"
            width="48"
            src="https://surveyx.s3.us-east-1.amazonaws.com/options/LIKE${formattedindex}.png"
            alt="Answer ${index === 0 ? 'like' : 'dislike'}"
        >
    </a>
  </td>
`;
  });

  return `  <center>

  <h1 style="font-family: Helvetica, Arial; font-weight: 400; color: #4b5563; font-size: 22px; margin-bottom: 16px">[QUESTION_TEXT]</h1>

  <table width="128px" cellspacing="0" cellpadding="4" border="0">
      <tbody>
          <tr>

          ${options.join('')}

          </tr>
      </tbody>
  </table>
</center>`
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace('[QUESTION_TEXT]', questionText)
    .replace(/\s+/g, ' ');
};

export const generateCSATTemplate01 = (
  questionText: string,
  surveyUrl: string
) => {
  const options = ['😡', '😕', '😐', '😊', '😍'].map((emoji, index) => {
    const formattedindex = (index + 1).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });

    return `
    <td style="padding: 0px 8px">
    <a target="_blank" href="${surveyUrl}${surveyUrl.endsWith('?') ? '' : '&'}primaryQuestionAnswer=${index}">
        <img
            height="48"
            width="48"
            src="https://surveyx.s3.us-east-1.amazonaws.com/options/CSAT${formattedindex}.png"
            alt="Answer ${formattedindex}"
        >
    </a>
  </td>
`;
  });

  return `  <center>

  <h1 style="font-family: Helvetica, Arial; font-weight: 400; color: #4b5563; font-size: 22px; margin-bottom: 16px">[QUESTION_TEXT]</h1>

  <table width="320px" cellspacing="0" cellpadding="4" border="0">
      <tbody>
          <tr>

          ${options.join('')}

          </tr>
      </tbody>
  </table>
</center>`
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace('[QUESTION_TEXT]', questionText);
};

// Template 02

export const generateNPSTemplate02 = (
  questionText: string,
  surveyUrl: string
) => {
  const options = [...Array(11).keys()].map((index) => {
    return `<a target="_blank" href="${surveyUrl}${surveyUrl.endsWith('?') ? '' : '&'}primaryQuestionAnswer=${index}">${index}</a>`;
  });

  return `<p><strong>[QUESTION_TEXT]</strong></p><p>${options.join(' - ')}</p>`
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace('[QUESTION_TEXT]', questionText)
    .replace(/\s+/g, ' ');
};

export const generateLIKETemplate02 = (
  questionText: string,
  surveyUrl: string
) => {
  const options = ['👎', '👍'].map((emoji, index) => {
    return `<li><a target="_blank" href="${surveyUrl}${surveyUrl.endsWith('?') ? '' : '&'}primaryQuestionAnswer=${index}">${emoji} - ${
      index === 0 ? 'Like' : 'Dislike'
    }</a></li>`;
  });

  return `<p><strong>[QUESTION_TEXT]</strong></p>
  <ul>${options.join('')}</ul>
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace('[QUESTION_TEXT]', questionText)
    .replace(/\s+/g, ' ');
};

export const generateCSATTemplate02 = (
  questionText: string,
  surveyUrl: string
) => {
  const options = [
    { label: 'Very Dissatisfied', emoji: '😡' },
    { label: 'Dissatisfied', emoji: '😕' },
    { label: 'Neutral', emoji: '😐' },
    { label: 'Satisfied', emoji: '😊' },
    { label: 'Very Satisfied', emoji: '😍' },
  ].map((value, index) => {

    return `<li><a target="_blank" href="${surveyUrl}${surveyUrl.endsWith('?') ? '' : '&'}primaryQuestionAnswer=${index}">${value.emoji} - ${value.label}</a></li>`;
  });

  return `<p><strong>[QUESTION_TEXT]</strong></p>
  <ul>${options.join('')}</ul>
  `
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace('[QUESTION_TEXT]', questionText)
    .replace(/\s+/g, ' ');
};
