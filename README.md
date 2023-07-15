# About

`@elenoragroup/simple-slash` is a utility package for building the Discord Slash Commands JSON simply.

# Installation

**This was built with Node.js v18.12.1.**

```cmd
    npm install @elenoragroup/simple-slash
```

# Links

-   [Elenora Support](https://discord.gg/elenora)
-   Documentation: None made yet, you may refer to Examples above.

# Examples

## Base Command

```ts
    import SimpleSlash from '@elenoragroup/simple-slash';

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

**Parameters of the StringOption**

```ts
    StringOption(
        name: string,
        description: string,
        required = false,
        autocomplete = false,
        choices?: string[], //Optional; Length must be between 2 and 25.
        min_length?: number, //Optional; Min number of characters to be passed in
        max_length?: number, //Optional; Max number of characters to be passed in
    )
```

**Base StringOption**

```ts
    import SimpleSlash from '@elenoragroup/simple-slash';

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
          autocomplete: false
        }
      ],
      type: undefined
    }
```

**StringOption with Choices** - Choices are automatically lowercased and all spaces replaced with `_` for the value.

```ts
    import SimpleSlash from '@elenoragroup/simple-slash';

    // Create the definition for the command
    const definition = new SimpleSlash('stats', "Look up someone's stats")
        .StringOption('name', "Who's stats would you like to see?", true, false, ['Timmy', 'Peter', 'Jimmy John']);

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
          ],
          required: true,
          autocomplete: false
        }
      ],
      type: undefined
    }
```

### IntegerOption | NumberOption

**Parameters of the IntegerOption | NumberOption**

```ts
    IntegerOption(
        name: string,
        description: string,
        required = false,
        autocomplete = false,
        min_value?: number, //Optional; Min number of the number to be passed in
        max_value?: number, //Optional; Max number of the number to be passed in
        choices?: number[], //Optional; Length must be between 2 and 25.
    )
```

**Base IntegerOption | NumberOption**

```ts
    import SimpleSlash from '@elenoragroup/simple-slash';

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
          choices: [],
          required: false,
          autocomplete: false
        }
      ],
      type: undefined
    }
```

### ChannelOption

**Parameters of the ChannelOption**

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
    import SimpleSlash, { ChannelTypes } from '@elenoragroup/simple-slash';

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

**Parameters of the BooleanOption | UserOption | RoleOption | MentionableOption | AttachmentOption**

```ts
    UserOption(
        name: string,
        description: string,
        required = false
    )
```

**Base BooleanOption | UserOption | RoleOption | MentionableOption | AttachmentOption**

```ts
    import SimpleSlash from '@elenoragroup/simple-slash';

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

**Parameters of the Subcommand | SubcommandGroup**

```ts
    Subcommand(
        name: string,
        description: string,
        cb?: (builder: SimpleSlash) => void
    )
```

**Base Subcommand | SubcommandGroup**

```ts
    import SimpleSlash from '@elenoragroup/simple-slash';

    // Create the definition for the command
    const definition = new SimpleSlash('boxes', 'Do things with boxes.')
        .Subcommand('add', 'Add a new box.', command =>
            command.StringOption('name', 'What do you want to name this box?')
        )
        .Subcommand('remove', 'Remove a box.', command =>
            command.StringOption('name', 'What box would you like to remove?')
        )
        .Subcommand('list', 'List all current boxes.')

    // value of definition
    SimpleSlash {
      name: 'boxes',
      description: 'Do things with boxes.',
      options: [
        SimpleSlash {
            name: 'add',
            description: 'Add a box.',
            options: [
                {
                  name: 'name',
                  description: 'What do you want to name this box?',
                  type: 3,
                  choices: [],
                  required: false,
                  autocomplete: false
                }
            ],
            type: 1
        },
        SimpleSlash {
            name: 'remove',
            description: 'Remove a box.',
            options: [
                {
                  name: 'name',
                  description: 'What box would you like to remove?',
                  type: 3,
                  choices: [],
                  required: false,
                  autocomplete: false
                }
            ],
            type: 1
        },
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
