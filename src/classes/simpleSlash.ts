import { ChannelType } from '..';
import { CommandType, OptionsLength } from '../types';

export default class SimpleSlash {
    name: string;
    description: string;
    options: any[];
    type?: CommandType;
    constructor(name: string, description: string, type?: CommandType) {
        this.name = name;
        this.description = description;
        this.options = [];
        this.type = type;
    }

    Subcommand(name: string, description: string, cb?: (builder: SimpleSlash) => void) {
        const command = new SimpleSlash(name, description, CommandType.Subcommand);
        this.options.push(command);
        if (cb) cb(command);
        return this;
    }

    SubcommandGroup(name: string, description: string, cb: (builder: SimpleSlash) => void) {
        const command = new SimpleSlash(name, description, CommandType.SubcommandGroup);
        this.options.push(command);
        cb(command);
        return this;
    }

    StringOption(
        name: string,
        description: string,
        required = false,
        autocomplete = false,
        choices?: OptionsLength<string, 2, 25>,
        min_length?: number,
        max_length?: number,
    ) {
        const choice_options = [];
        if (choices?.length) {
            if (choices?.length < 2) throw new Error('Choices must be an array of at least 2 strings');
            if (choices?.length > 25) throw new Error('Choices must be an array of no more than 25 strings');
            for (const choice of choices) {
                choice_options.push({
                    name: choice,
                    value: choice.replace(/ /g, '_').toLowerCase(),
                });
            }
        }
        this.options.push({
            type: CommandType.String,
            name,
            description,
            required,
            autocomplete,
            choices: choice_options,
            min_length,
            max_length,
        });
        return this;
    }

    IntegerOption(
        name: string,
        description: string,
        required = false,
        autocomplete = false,
        min_value?: number,
        max_value?: number,
        choices?: OptionsLength<number, 2, 25>,
    ) {
        const choice_options = [];
        if (choices?.length) {
            if (choices?.length < 2) throw new Error('Choices must be an array of at least 2 numbers');
            if (choices?.length > 25) throw new Error('Choices must be an array of no more than 25 numbers');
            for (const choice of choices) {
                choice_options.push({
                    name: choice,
                    value: choice,
                });
            }
        }
        this.options.push({
            type: CommandType.Integer,
            name,
            description,
            required,
            autocomplete,
            min_value,
            max_value,
            choices: choice_options,
        });
        return this;
    }

    BooleanOption(name: string, description: string, required = false) {
        this.options.push({
            type: CommandType.Boolean,
            name,
            description,
            required,
        });
        return this;
    }

    UserOption(name: string, description: string, required = false) {
        this.options.push({
            type: CommandType.User,
            name,
            description,
            required,
        });
        return this;
    }

    ChannelOption(name: string, description: string, channelType: ChannelType[], required = false) {
        this.options.push({
            type: CommandType.Channel,
            channel_types: channelType,
            name,
            description,
            required,
        });
        return this;
    }

    RoleOption(name: string, description: string, required = false) {
        this.options.push({
            type: CommandType.Role,
            name,
            description,
            required,
        });
        return this;
    }

    MentionableOption(name: string, description: string, required = false) {
        this.options.push({
            type: CommandType.Mentionable,
            name,
            description,
            required,
        });
        return this;
    }

    NumberOption(
        name: string,
        description: string,
        required = false,
        autocomplete = false,
        min_value?: number,
        max_value?: number,
        choices?: OptionsLength<number, 2, 25>,
    ) {
        const choice_options = [];
        if (choices?.length) {
            if (choices?.length < 2) throw new Error('Choices must be an array of at least 2 numbers');
            if (choices?.length > 25) throw new Error('Choices must be an array of no more than 25 numbers');
            for (const choice of choices) {
                choice_options.push({
                    name: choice,
                    value: choice,
                });
            }
        }
        this.options.push({
            type: CommandType.Number,
            name,
            description,
            required,
            autocomplete,
            min_value,
            max_value,
            choices: choice_options,
        });
        return this;
    }

    AttachmentOption(name: string, description: string, required = false) {
        this.options.push({
            type: CommandType.Attachment,
            name,
            description,
            required,
        });
        return this;
    }
}
