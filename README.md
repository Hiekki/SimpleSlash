# About

`simple-slash` is a utility package for building the Discord Slash Commands JSON simply.

# Installation

**This was built with Node.js v18.12.1.**

```cmd
    npm install simple-slash
```

# Links

-   [Support](https://discord.gg/elenora)
-   [Documentation](https://github.com/Elenora-Group/SimpleSlash#readme)

# Examples

## Base Command

```ts
    import SimpleSlash from 'simple-slash';

    // Create the definition for the command
    const definition = new SimpleSlash('ping', 'Pings the bot.');

    // value of definition
    SimpleSlash {
        name: 'ping',
        description: 'Pings the bot.',
        options: [],
        type: undefined
    }
```

## Arguments

### StringOption

**Parameters**

```ts
    StringOption(
        name: string,
        description: string,
        required = false,
        autocomplete = false,
        choices?: (string | { name: string, value: string })[], //Optional; Length must be between 1 and 25.
        min_length?: number, //Optional; Min number of characters to be passed in
        max_length?: number, //Optional; Max number of characters to be passed in
    )
```

**Base StringOption**

```ts
    import SimpleSlash from 'simple-slash';

    // Create the definition for the command
    const definition = new SimpleSlash('stats', "Look up someone's stats").StringOption('name', "Who's stats would you like to see?");

    // value of definition
    SimpleSlash {
      name: 'stats',
      description: "Look up someone's stats",
      options: [
        {
          name: 'name',
          description: "Who's stats would you like to see?",
          type: 3,
          choices: [],
          required: false,
          autocomplete: false,
          min_length: undefined,
          max_length: undefined
        }
      ],
      type: undefined
    }
```

**StringOption with Choices** - Choices are automatically lowercased and all spaces replaced with `_` for the value.

```ts
    import SimpleSlash from 'simple-slash';

    // Create the definition for the command
    const definition = new SimpleSlash('stats', "Look up someone's stats")
        .StringOption('name', "Who's stats would you like to see?", true, false, ['Timmy', 'Peter', 'Jimmy John', { name: 'SUSIE', value: 'susie' }]);

    // value of definition
    SimpleSlash {
      name: 'stats',
      description: "Look up someone's stats",
      options: [
        {
          name: 'name',
          description: "Who's stats would you like to see?",
          type: 3,
          choices: [
            {
                name: 'Timmy',
                value: 'timmy'
            },
            {
                name: 'Peter',
                value: 'peter'
            },
            {
                name: 'Jimmy John',
                value: 'jimmy_john'
            },
            {
                name: 'SUSIE',
                value: 'susie'
            },
          ],
          required: true,
          autocomplete: false,
          min_length: undefined,
          max_length: undefined
        }
      ],
      type: undefined
    }
```

### IntegerOption | NumberOption

**Parameters**

```ts
    IntegerOption(
        name: string,
        description: string,
        required = false,
        autocomplete = false,
        choices?: (number | { name: string, value: number })[], //Optional; Length must be between 1 and 25.
        min_value?: number, //Optional; Min value of the number to be passed in
        max_value?: number, //Optional; Max value of the number to be passed in
    )
```

**Base IntegerOption | NumberOption**

```ts
    import SimpleSlash from 'simple-slash';

    // Create the definition for the command
    const definition = new SimpleSlash('puppies', 'See puppies.').IntegerOption('amount', 'How many puppies would you like to see?');

    // value of definition
    SimpleSlash {
      name: 'puppies',
      description: 'See puppies.',
      options: [
        {
          name: 'amount',
          description: 'How many puppies would you like to see?',
          type: 4, //NumberOption would return `10` here.
          required: false,
          min_value: undefined,
          max_value: undefined
          choices: []
        }
      ],
      type: undefined
    }
```

### ChannelOption

**Parameters**

```ts
    ChannelOption(
        name: string,
        description: string,
        channelType: ChannelType[], //Will need to import ChannelTypes
        required = false
    )
```

**Base ChannelOption**

```ts
    import SimpleSlash, { ChannelTypes } from 'simple-slash';

    // Create the definition for the command
    const definition = new SimpleSlash('set_channel', 'Set a channel for posts.')
        .ChannelOption('channel_name', 'What channel would you like to set?', [ChannelType.GUILD_TEXT, ChannelType.GUILD_ANNOUNCEMENT]);

    // value of definition
    SimpleSlash {
      name: 'set_channel',
      description: 'Set a channel for posts.',
         options: [
           {
             name: 'channel_name',
             description: 'What channel would you like to set?',
             type: 7,
             channel_types: [0, 5], //Only allows the command to display announcement and text channels
             required: false
           }
      ],
      type: undefined
    }
```

### BooleanOption | UserOption | RoleOption | MentionableOption | AttachmentOption

**Parameters**

```ts
    UserOption(
        name: string,
        description: string,
        required = false
    )
```

**Base BooleanOption | UserOption | RoleOption | MentionableOption | AttachmentOption**

```ts
    import SimpleSlash from 'simple-slash';

    // Create the definition for the command
    const definition = new SimpleSlash('profile', "See someone's profile.").UserOption('user', "Who's profile would you like to see?");

    // value of definition
    SimpleSlash {
      name: 'profile',
      description: "See someone's profile.",
         options: [
           {
             name: 'user',
             description: "Who's profile would you like to see?",
             type: 6, //Boolean: 5, Role: 8, Mentionable: 9, Attachment: 11
             required: false
           }
      ],
      type: undefined
    }
```

### Subcommand | SubcommandGroup

**Parameters**

```ts
    Subcommand(
        name: string,
        description: string,
        cb?: (builder: SimpleSlash) => void
    )
```

**Base Subcommand | SubcommandGroup**

```ts
    import SimpleSlash from 'simple-slash';

    // Create the definition for the command
    const definition = new SimpleSlash('boxes', 'Do things with boxes.').Subcommand('list', 'List all current boxes.')

    // value of definition
    SimpleSlash {
      name: 'boxes',
      description: 'Do things with boxes.',
      options: [
        SimpleSlash {
            name: 'list',
            description: 'List all current boxes.',
            options: [],
            type: 1
        }
      ],
      type: undefined
    }
```

### Nested Command

```ts
import SimpleSlash from 'simple-slash';

const definition = new SimpleSlash('purchase', 'Buy things')
    .SubcommandGroup('bottoms', 'Pants, shorts, etc.', (command) =>
        command
            .Subcommand('pants', 'Buy pants', (command) =>
                command
                    .StringOption('type', 'What type of pants would you like to buy?', true, false, ['jeans', 'sweats', 'joggers'])
                    .StringOption('size', 'What size would you like to buy?', true, false, ['small', 'medium', 'large'])
                    .StringOption('color', 'What color would you like to buy?', true, false, ['black', 'blue', 'white'])
                    .IntegerOption('quantity', 'How many would you like to buy?', true, 1, 10),
            )
            .Subcommand('shorts', 'Buy shorts', (command) =>
                command
                    .StringOption('type', 'What type of shorts would you like to buy?', true, false, ['jeans', 'sweats', 'cargo'])
                    .StringOption('size', 'What size would you like to buy?', true, false, ['small', 'medium', 'large'])
                    .StringOption('color', 'What color would you like to buy?', true, false, ['black', 'blue', 'white'])
                    .IntegerOption('quantity', 'How many would you like to buy?', true, 1, 10),
            ),
    )
    .SubcommandGroup('tops', 'Shirts, jackets, etc.', (command) =>
        command
            .Subcommand('shirts', 'Buy shirts', (command) =>
                command
                    .StringOption('type', 'What type of shirt would you like to buy?', true, false, ['t-shirt', 'long-sleeve'])
                    .StringOption('size', 'What size would you like to buy?', true, false, ['small', 'medium', 'large'])
                    .StringOption('color', 'What color would you like to buy?', true, false, ['black', 'blue', 'white'])
                    .IntegerOption('quantity', 'How many would you like to buy?', true, 1, 10),
            )
            .Subcommand('jackets', 'Buy jackets', (command) =>
                command
                    .StringOption('type', 'What type of jacket would you like to buy?', true, false, ['raincoat', 'puffer', 'parka'])
                    .StringOption('size', 'What size would you like to buy?', true, false, ['small', 'medium', 'large'])
                    .StringOption('color', 'What color would you like to buy?', true, false, ['black', 'blue', 'white'])
                    .IntegerOption('quantity', 'How many would you like to buy?', true, 1, 10),
            ),
    );
```
