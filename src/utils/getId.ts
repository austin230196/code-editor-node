type Character = "small letters" | "capital letters" | "numbers";

const getCharacters = (type: Character): string => {
    let start, stop;
    switch(type){
        case "small letters":{
            start = 97;
            stop = start + 26;
            break;
        }

        case "capital letters":{
            start = 65;
            stop = start + 26;
            break;
        }

        default: {
            start = 48;
            stop = start + 10;
            break;
        }
    }
    
    let characters = "";
    for(var i=start; i < stop; i++){
        characters += String.fromCharCode(i);
    }

    return characters;
}

const getId = (len: number=5): string => {
    let id = "";
    const numbers = getCharacters("numbers");
    const smallLetters = getCharacters("small letters");
    const capitalLetters = getCharacters("capital letters");
    const chars = [numbers, capitalLetters, smallLetters];

    for(var i=0; i < len; i++){
        let charSet = chars[Math.floor(Math.random() * chars.length)];
        let randomChar = charSet[Math.floor(Math.random() * charSet.length)];
        id += randomChar;
    }
    return id;
}


export default getId;