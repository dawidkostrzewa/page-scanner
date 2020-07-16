export const FILENAME = 'url';


export const emailText = (url) => {
    return `<b>Hi</b><br>Page which you are observing has changed <a href="${url}">${url}</a> . Check it out!`;
}