import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";

export default eventHandler(async (event) => {

    try {



        const { name, email, password } = await readBody(event);

        if (
            typeof name !== "string" ||
            name.length < 3 ||
            name.length > 31 ||
            !/^[a-z0-9_-]+$/.test(name)
        ) {
            return {
                message: "Invalid username!",
                code: 400
            };
        }
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

        if (existingUser) {
            return {
                message: "User already exist",
                code: 400
            };
        }


        const passwordHash = await hash(password, {
            // recommended minimum parameters
            memoryCost: 19456,
            timeCost: 2,
            outputLen: 32,
            parallelism: 1
        });
        const userId = generateIdFromEntropySize(10); // 16 characters long

        // TODO: check if username is already used
        const user = await db.user.create({
            data: {
                name: name,
                email: email,
                password: passwordHash
            }
        });

        const session = await lucia.createSession(user.id, {});
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