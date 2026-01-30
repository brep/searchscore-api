# Documentation
documentation endpoint: /docs

# Structure:
-   routes/
        api/
            artist/
                (artist routes, controller, route tests)
            person/
                (person routes, controller, route tests)
        docs/
            (documentation route)
    stores/
        artist/
        person/
    swagger/
        (OpenAPI documentation)

# Dev env:
- hot reloading via nodemon and ts-node

# Improve:
    - Logging:
        add logging in general
        console.log => use logging library or at least wrap in custom logger
    - If backend queried an actual database, should sanitize user input
    - TODOs

# General Notes:
- AI used in the generation of OpenAPI JSDoc comments and transforming text data set into JSON
- For code generation: no generative AI used, (discounting VS Code autocomplete) nor was AI used in testing or reviewing the code
    - when working typically even if I did not use gen AI, I would have reviewed the code and tests with AI, but for a task of this size felt that was akin to cheating
