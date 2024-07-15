// function qui va transformer en object la grosse chaine de charactére a chaque fois qu"elle trouve /n

type ParsedMessage = { [key: string]: string };

const parseMessage = (message: string): ParsedMessage => {
  if (!message) {
    throw new Error('Message is undefined or empty 2');
  }

  const lines = message.split('\n');
  const result: ParsedMessage = {};

  lines.forEach((line) => {
    const [key, value] = line.split(': ');
    if (key && value) {
      result[key] = value;
    }
  });

  return result;
};

export { parseMessage, ParsedMessage };
