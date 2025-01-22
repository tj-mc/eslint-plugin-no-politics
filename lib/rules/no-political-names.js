const defaultBannedNames = [
    // United States
    "Donald Trump", "Trump",
    "Joe Biden", "Biden",
    "Barack Obama", "Obama",
    "George Bush", "Bush",
    "Hillary Clinton", "Clinton",
    "Bill Clinton", "Clinton",
    "Richard Nixon", "Nixon",

    // Russia
    "Vladimir Putin", "Putin",
    "Joseph Stalin", "Stalin",

    // China
    "Xi Jinping",
    "Mao Zedong", "Mao",

    // Germany (Historical)
    "Adolf Hitler", "Hitler",
    "Angela Merkel", "Merkel",

    // United Kingdom
    "Margaret Thatcher", "Thatcher",
    "Winston Churchill", "Churchill",
    "Tony Blair", "Blair",
    "Boris Johnson", "Johnson",

    // North Korea
    "Kim Jong-un",
    "Kim Jong-il",

    // Italy (Historical)
    "Benito Mussolini", "Mussolini",

    // France
    "Emmanuel Macron", "Macron",
    "Napoleon Bonaparte", "Napoleon",

    // Australia
    "Scott Morrison", "Morrison",
    "Anthony Albanese", "Albanese",
    "Tony Abbott", "Abbott",
    "Paul Keating", "Keating",
    "John Howard", "Howard",
    "Gough Whitlam", "Whitlam",
    "Bob Hawke", "Hawke",
    "Julia Gillard", "Gillard",
    "Kevin Rudd", "Rudd",

    // Others
    "Fidel Castro", "Castro",
    "Che Guevara", "Guevara",
    "Jair Bolsonaro", "Bolsonaro",
].map(name => name.toLowerCase());


module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Disallow certain political names in string literals",
            category: "Best Practices",
            recommended: false,
        },
        schema: [
            {
                type: "object",
                properties: {
                    bannedNames: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                        minItems: 1, // Require at least one banned name
                    },
                    allowedNames: {
                        type: "array",
                        items: {
                            type: "string",
                        },
                    },
                },
                additionalProperties: false,
            },
        ],
        messages: {
            bannedName: 'The name "{{name}}" is prohibited in string literals.',
        },
    },
    create(context) {
        // Get the user-provided configuration
        const options = context.options[0] || {};
        const bannedNames = options?.bannedNames ? [...defaultBannedNames, ...options.bannedNames] : defaultBannedNames; // Default names
        const allowedNames = (options.allowedNames || []).map((name) =>
            name.toLowerCase()
        );

        return {
            Literal(node) {
                if (typeof node.value === "string") {
                    const value = node.value.toLowerCase();

                    // Skip if the name is in the allowed list
                    if (allowedNames.includes(value)) {
                        return;
                    }

                    // Report if the name is in the banned list
                    if (bannedNames.includes(value)) {
                        context.report({
                            node,
                            messageId: "bannedName",
                            data: {name: node.value},
                        });
                    }
                }
            },
        }
    }
};
