const parseMention = (str) => {
    let regex = /@\[.+?\]\(.+?\)/gm;
    let displayRegex = /@\[.+?\]/g;
    let idRegex = /\(.+?\)/g;
    let matches = str.match(regex);
    let arr = [];
    matches &&
        matches.forEach((m) => {
            let id = m.match(idRegex)[0].replace("(", "").replace(")", "");
            let display = m
                .match(displayRegex)[0]
                .replace("@[", "")
                .replace("]", "");
            arr.push({ id: +id, display: display });
        });
    let newComment = str.split(regex);
    let output = "";
    for (let i = 0; i < newComment.length; i++) {
        const c = newComment[i];
        if (i === newComment.length - 1) output += c;
        else
            output +=
                c +
                `<a class="mentioned user" href="/profile/${arr[i].display}">${arr[i].display}</a>`;
    }
    return { output, mentionedUsers: arr };
};

export default parseMention;
