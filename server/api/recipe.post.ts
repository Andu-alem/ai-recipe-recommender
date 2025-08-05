const mockRecipes = [
    {
        name: "Mediterranean Chickpea Salad",
        cookTime: "15 min",
        servings: 4,
        tags: ["Vegan", "Gluten-Free", "Healthy"],
        ingredients: ["Chickpeas", "Cucumber", "Tomatoes", "Red onion", "Olive oil", "Lemon juice", "Parsley"],
        instructions: [
            "Drain and rinse chickpeas",
            "Dice cucumber, tomatoes, and red onion",
            "Mix all vegetables with chickpeas",
            "Whisk olive oil and lemon juice",
            "Toss salad with dressing and parsley",
        ]
    },
    {
        name: "Creamy Mushroom Pasta",
        cookTime: "25 min",
        servings: 2,
        tags: ["Vegetarian", "Comfort Food"],
        ingredients: ["Pasta", "Mushrooms", "Heavy cream", "Garlic", "Parmesan", "Butter"],
        instructions: [
            "Cook pasta according to package directions",
            "Sauté mushrooms and garlic in butter",
            "Add cream and simmer",
            "Toss with pasta and parmesan",
            "Season and serve hot",
        ]
    },
    {
        name: "Asian Stir-Fry Bowl",
        cookTime: "20 min",
        servings: 3,
        tags: ["Healthy", "Quick", "Gluten-Free"],
        ingredients: ["Rice", "Broccoli", "Carrots", "Soy sauce", "Ginger", "Sesame oil"],
        instructions: [
            "Cook rice in rice cooker",
            "Heat oil in wok or large pan",
            "Stir-fry vegetables until tender-crisp",
            "Add sauce and toss",
            "Serve over rice",
        ]
    },
]

export default defineEventHandler(async (event) => {
    // accept preferences
    // make llm call using preferences
    // accept a structure response from llm
    // respond back the llm response to the user
    const body = await readBody(event) // preferences

    console.log("user preferences are ---- ", body)

    return mockRecipes
})