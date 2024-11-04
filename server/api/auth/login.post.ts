import { hash, verify } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";

export default eventHandler(async (event) => {

    try {

        const { email, password } = await readBody(event);


        if (
            typeof email !== "string" ||
            email.length < 3 ||
            email.length > 31 ||
            !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
        ) {
            return {
                message: "Invalid email!",
                code: 400
            };
        }
        if (typeof password !== "string" || password.length < 6 || password.length > 255) {
            return {
                message: "Invalid Password!",
                code: 400
            };
        }

        const existingUser = await db.user.findUnique({
            where: {
                email
            }
        })

        if (!existingUser) {
            throw createError({
                message: "Incorrect email",
                statusCode: 400
            });
        }


        const validPassword = await verify(existingUser.password || "", password, {
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        if (!validPassword) {
            throw createError({
                message: "Incorrect password",
                statusCode: 400
            });
        }

        const session = await lucia.createSession(existingUser.id, {});
        appendHeader(event, "Set-Cookie", lucia.createSessionCookie(session.id).serialize());

        return {
            message: "User created successfully!",
            code: 200
        };

    } catch (error) {
        return {
            message: error,
            code: 400
        };
    }
});