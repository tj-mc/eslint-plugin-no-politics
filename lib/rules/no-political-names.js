module.exports = {
    meta: {
        type: "problem",
        docs: {
            description: "Disallow certain political names in string literals",
            category: "Best Practices",
            recommended: false,
        },
        schema: [],
        messages: {
            bannedName: 'The name "{{name}}" is prohibited in string literals.',
        },
    },
    create(context) {
        const bannedNames = ["Trump", "Biden", "Obama", "Bush", "Clinton"]; // Add more names if needed

        return {
            Literal(node) {
                if (typeof node.value === "string" && bannedNames.includes(node.value)) {
                    context.report({
                        node,
                        messageId: "bannedName",
                        data: { name: node.value },
                    });
                }
            },
        };
    },
};
