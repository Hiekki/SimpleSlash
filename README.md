# About

`simple-slash` is a utility package for building the Discord Slash Commands JSON simply.

# Installation

**This was built with Node.js v20.11.0**

```cmd
npm install @elenoragroup/simple-slash
```

# Links

-   [Support](https://discord.gg/elenora)
-   [Documentation](https://github.com/Elenora-Group/SimpleSlash#readme)

# Examples

## Base Command

```ts
// Import SimpleSlash and Constants
import SimpleSlash, { Constants } from '@elenoragroup/simple-slash';

// Create the definition for the command and set a Command Type
const definition = new SimpleSlash('ping', 'pong').setCommandType(Constants.ApplicationCommandType.ChatInput);
```

## Arguments

### addStringOption

**Parameters**

```ts
addStringOption({
    name: string;
    description: string;
    required?: boolean;
    autocomplete?: boolean;
    choices?: Array<string | {
        name: string;
        value: string;
    }>;
    min_length?: number;
    max_length?: number;
})
```

**Base addStringOption**

```ts
import SimpleSlash, { Constants } from '@elenoragroup/simple-slash';

// Create the definition for the command
const definition = new SimpleSlash('stats', "Look up someone's stats")
    .setCommandType(Constants.ApplicationCommandType.ChatInput)
    .addStringOption({ name: 'name', description: 'The name of the person to look up' });
```

**addStringOption with Choices** - Choices are automatically lowercased and all spaces replaced with `_` for the value, unless an object is passed in.

```ts
import SimpleSlash, { Constants } from '@elenoragroup/simple-slash';

// Create the definition for the command
const definition = new SimpleSlash('stats', "Look up someone's stats")
    .setCommandType(Constants.ApplicationCommandType.ChatInput)
    .addStringOption({
        name: 'name',
        description: "Who's stats would you like to see?",
        required: true,
        choices: ['Timmy', 'Peter', 'Jimmy John', { name: 'SUSIE', value: 'susie' }],
    });
```

### addIntegerOption | addNumberOption

**Parameters**

```ts
addIntegerOption({
    name: string;
    description: string;
    required?: boolean;
    autocomplete?: boolean;
    choices?: Array<{
        name: string;
        value: number;
    }>;
    min_value?: number;
    max_value?: number;
})
```

**Base addIntegerOption | addNumberOption**

```ts
import SimpleSlash, { Constants } from '@elenoragroup/simple-slash';

// Create the definition for the command
const definition = new SimpleSlash('stats', "Look up someone's stats")
    .setCommandType(Constants.ApplicationCommandType.ChatInput)
    .addIntegerOption({ name: 'amount', description: 'How many puppies would you like to see?' });
```

### addChannelOption

**Parameters**

```ts
addChannelOption(
    name: string,
    description: string,
    required?: boolean,
    types?: Array<Exclude<Constants.ChannelType, Constants.ChannelType.DM | Constants.ChannelType.GroupDM>>
)
```

**Base addChannelOption**

```ts
import SimpleSlash, { Constants } from '@elenoragroup/simple-slash';

// Create the definition for the command
const definition = new SimpleSlash('stats', "Look up someone's stats")
    .setCommandType(Constants.ApplicationCommandType.ChatInput)
    .addChannelOption('channel_name', 'What channel would you like to set?', true, [Constants.ChannelType.GuildText]);
```

### addBooleanOption | addUserOption | addRoleOption | addMentionableOption | addAttachmentOption

**Parameters**

```ts
addUserOption(
    name: string,
    description: string,
    required = false
)
```

**Base addBooleanOption | addUserOption | addRoleOption | addMentionableOption | addAttachmentOption**

```ts
import SimpleSlash, { Constants } from '@elenoragroup/simple-slash';

// Create the definition for the command
const definition = new SimpleSlash('stats', "Look up someone's stats")
    .setCommandType(Constants.ApplicationCommandType.ChatInput)
    .addUserOption('user', "Who's profile would you like to see?");
```

### addSubcommand | addSubcommandGroup

**Parameters**

```ts
addSubcommand(
    name: string,
    description: string,
    cb?: (builder: SimpleSlash) => void
)
```

**Base addSubcommand | addSubcommandGroup**

```ts
import SimpleSlash, { Constants } from '@elenoragroup/simple-slash';

// Create the definition for the command
const definition = new SimpleSlash('stats', "Look up someone's stats")
    .setCommandType(Constants.ApplicationCommandType.ChatInput)
    .addSubcommand('lookup', "Look up someone's stats", (sub) => {
        sub.addStringOption({ name: 'name', description: 'The name of the person to look up', required: true });
    });
```
